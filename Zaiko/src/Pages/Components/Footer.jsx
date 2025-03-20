import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer id="Footer">
            <div>
                <h3>Test</h3>
                <Link to="/home"></Link>
                <img src="../src/assets/inventory icon.svg" alt="" />
                <img src="../src/assets/profile icon.svg" alt="" />
                <img src="../src/assets/reports icon.svg" alt="" />


            </div>
        </footer>
    )
}

export default Footer;