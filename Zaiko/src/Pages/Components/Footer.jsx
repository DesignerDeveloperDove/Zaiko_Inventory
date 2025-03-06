import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer id="Footer">
            <div>
                <Link to="/home"></Link>
            </div>
        </footer>
    )
}

export default Footer;