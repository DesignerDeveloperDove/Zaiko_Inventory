import React from "react";
import DataInfo from "./Components/Data";

function Home(){
    return(
        <>
        <h2>Locations</h2>
        <div className="main column">
            <div className="row">
                <div className="LocationBox"><h3>Walk-In</h3></div>
                <div className="LocationBox"><h3>Freezer</h3></div>
                
            </div>
            <div className="row">
                <div className="LocationBox"><h3>Dry Storage</h3></div>
                <div className="LocationBox"><h3></h3></div>
            </div>
        </div>
        

        <DataInfo />
        </>
    )
}
export default Home;