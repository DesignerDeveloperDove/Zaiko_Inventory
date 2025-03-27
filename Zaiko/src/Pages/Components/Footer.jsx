import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer id="Footer">
            <div>
                <div className="FooterContent">
                <Link to="/OrderHistory.jsx" id="Option"><img   src="../src/assets/inventory icon.svg" alt=""/>  </Link>
                <img id="Option" src="../src/assets/reports icon.svg" alt="" />
                <img id="Option" src="../src/assets/profile icon.svg" alt="" />

                </div>
                
            </div>
        </footer>
    )
}

export default Footer;