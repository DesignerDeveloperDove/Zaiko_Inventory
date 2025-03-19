import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer id="Footer">
            <div>
                <h3>Test</h3>
                <Link to="/home"></Link>
            </div>
        </footer>
    )
}

export default Footer;