import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import DataInfo from "./Data";

function Los({ options, onSelect }) {
    const [products, setProducts] = useState([]); // State for all products
    const [locationList, setLocationList] = useState([]); // This stores a list of unique locations
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const filterOverlayRef = useRef(null); // Ref for Filter Overlay

    // fetch products from backend
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

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // this should nly close if the click is outside both the dropdown and the FilterOverLay
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

    return (
        <>
            <div className="LocationNav">
                <div>
                    <div className="dropdown" ref={dropdownRef}>
                        <button onClick={toggleDropdown}>
                            <img className="FilterIcon" src="../src/assets/filter button icon.svg" alt="" />
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
                                    /> 
                                    <h2>FOH Locations</h2>
                                </div>
                                <div>
                                    <input 
                                        type="checkbox" 
                                    /> 
                                    <h2>BOH Locations</h2>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <h1 className="Header">Locations</h1>
                <div className="ArrowIcon">
                    <img src="../src/assets/arrow icon.svg" alt="" />
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
                            <img src="ZaikoLogo.jpg" alt="" />.
                        </p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default Los;
