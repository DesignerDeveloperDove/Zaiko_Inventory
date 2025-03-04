import React from "react";
import Footer from "./Components/Footer";
import DataInfo from "./Components/Data";
function Home(){
    return(
        <>
        <h2>Locations</h2>
        <div className="main column">
            <div className="row">
                <div className="LocationBox">
                    <h3>Walk-In</h3>
                    <p>10 Items</p>
                    </div>
                <div className="LocationBox">
                    <h3>Freezer</h3>
                    <p>10 Items</p>
                    </div>
            </div>
            <div className="row">
                <div className="LocationBox">
                    <h3>Dry Storage</h3>
                    <p>10 Items</p>
                    </div>
                <div className="LocationBox">
                    <h3>Chemical</h3>
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