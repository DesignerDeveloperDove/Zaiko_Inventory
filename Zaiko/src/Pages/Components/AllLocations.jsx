import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import DataInfo from "./Data";

function Los({ options, onSelect }) {
    const [products, setProducts] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(null); // Filter state for FOH/BOH

    const dropdownRef = useRef(null);
    const filterOverlayRef = useRef(null);

    useEffect(() => {
        fetch("https://developerdove.com/Zaiko/ZaikoApp//")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
            })
            .catch(() => alert("No products have been grabbed"));
    }, []);

    useEffect(() => {
        let locations = products
            .filter(product => !filter || product.HouseLocation === filter) // Apply filter
            .map(product => product.location)
            .filter((value, index, self) => self.indexOf(value) === index);
        setLocationList(locations);
    }, [products, filter]);

    const productCounts = products.reduce((acc, product) => {
        if (!filter || product.houseLocation === filter) {
            acc[product.location] = (acc[product.location] || 0) + 1;
        }
        return acc;
    }, {});

    const Tabcolors = ["#D0DDF5", "#F3B5B5", "#CAE2C3", "#FCE7CA", "#F7D9FF"];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                filterOverlayRef.current && !filterOverlayRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFilterChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setFilter(id); // Set filter to FOH or BOH
        } else {
            setFilter(null); // Reset filter
        }
    };

    return (
        <>
            <div className="LocationNav">
                <div>
                    <div className="dropdown" ref={dropdownRef}>
                        <button onClick={toggleDropdown}>
                            <img className="FilterIcon" src="../Zaiko/filter button icon.svg" alt="" />
                        </button>
                    </div>
                    {isOpen && (
                        <div>
                            <ul className="dropdown-menu">
                                {options?.map((option) => (
                                    <li key={option} onClick={() => handleOptionClick(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="FilterOverLay" ref={filterOverlayRef}>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id="FOH"
                                        checked={filter === "FOH"}
                                        onChange={handleFilterChange}
                                    /> 
                                    <h2>FOH Locations</h2>
                                </div>
                                <div>
                                    <input 
                                        type="checkbox" 
                                        id="BOH"
                                        checked={filter === "BOH"}
                                        onChange={handleFilterChange}
                                    /> 
                                    <h2>BOH Locations</h2>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <h1 className="Header">Locations</h1>
                <div className="ArrowIcon">
                    <img src="../Zaiko/arrow icon.svg" alt="" />
                </div>
            </div>

            <div className="LocationTabs">
                <ul>
                    {locationList.length > 0 ? (
                        locationList.map((location, index) => (
                            <div
                                key={index}
                                className="LocationSquares"
                                style={{ backgroundColor: Tabcolors[index % Tabcolors.length] }}
                            >
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
                        <p>
                            <img src="../Zaiko/ZaikoLogo.jpg" alt="" />.
                        </p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Los;
