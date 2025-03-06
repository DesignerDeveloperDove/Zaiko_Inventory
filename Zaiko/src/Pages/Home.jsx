import React from "react";
import Footer from "./Components/Footer";
import DataInfo from "./Components/Data";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <h2>Locations</h2>
            <div className="main column">
                <div className="row">
                    <div 
                        className="LocationBox"
                        onClick={() => navigate("/Walk-In")}
                    >
                        <h3>Walk-In</h3>
                        <p>10 Items</p>
                    </div>
                    <div className="LocationBox">
                        <h3>Deep Freezer</h3>
                        <p>10 Items</p>
                    </div>
                </div>
                <div className="row">
                    <div className="LocationBox">
                        <h3>Dry Storage</h3>
                        <p>10 Items</p>
                    </div>
                    <div className="LocationBox">
                        <h3>Sanitary Storage</h3>
                        <p>10 Items</p>
                    </div>
                </div>
            </div>
            <button id="LocationCategorie">Review</button>
            <DataInfo />
            <Footer />
        </>
    );
}

export default Home;
