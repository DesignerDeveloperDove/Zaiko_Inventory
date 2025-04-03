import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import DataInfo from "./Data";

function Los({ items }) {
    const [products, setProducts] = useState([]);
    const [walkInProducts, setWalkInProducts] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const options = ["Option 1", "Option 2", "Option 3"]; // Replace with actual filter options

    useEffect(() => {
        fetch("http://developerdove.com/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
            })
            .catch(() => alert("No products have been grabbed"));
    }, []);

    const productCounts = products.reduce((acc, product) => {
        acc[product.location] = (acc[product.location] || 0) + 1;
        return acc;
    }, {});

    const Tabcolors = ["#D0DDF5", "#F3B5B5", "#CAE2C3", "#FCE7CA", "#F7D9FF"];

    useEffect(() => {
        const locations = products
            .map((product) => product.location)
            .filter((value, index, self) => self.indexOf(value) === index);
        setLocationList(locations);
    }, [products]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionChange = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleFilter = () => {
        console.log("Applying filters: ", selectedOptions);
        // Add filtering logic here
    };

    return (
        <>
            <div className="dropdown">
                <button onClick={toggleDropdown}>
                    Select Filters {isOpen ? '▲' : '▼'}
                </button>
                {isOpen && (
                    <div className="dropdown-list">
                        {options.map((option) => (
                            <label key={option}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                        <button onClick={handleFilter}>Apply Filters</button>
                    </div>
                )}
            </div>
            <div className="LocationNav">
            </div>

            <div className="LocationTabs">
                <ul>
                    {locationList.length > 0 ? (
                        locationList.map((location, index) => (
                            <div key={index} className="LocationSquares"
                                style={{ backgroundColor: Tabcolors[index % Tabcolors.length] }}>
                                <Link to={`/location/${encodeURIComponent(location)}`}>
                                    <button>
                                        <strong>{location}</strong>
                                    </button>
                                </Link>
                                <div className="NumOfItems">
                                    <p>{productCounts[location]} items</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No locations found.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Los;
