import React from "react";
import Footer from "./Components/Footer";
import DataInfo from "./Components/Data";
import { Link } from "react-router";
function Home(){
    return(
        <>
        <h2>Locations</h2>
        <div className="main column">
            <div className="row">
                <Link to={"/Walk-In"}>
                <button className="LocationBox">
                    <h3>Walk-In</h3>
                    <p>10 Items</p>
                    </button>
                    </Link>
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
        < DataInfo />
        
        <Footer />
        </>
    )
}
export default Home;