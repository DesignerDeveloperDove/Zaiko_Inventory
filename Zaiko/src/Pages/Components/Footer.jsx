import React from "react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer id="Footer">
            <div>
                <div className="FooterContent">
                <Link to="/home" id="Option"> <img   src="../inventory icon.svg" alt=""/>  </Link>
                <Link to="/OrderHistory.jsx" id="Option"> <img id="Option" src="../reports icon.svg" alt="" /></Link>
                <Link to="/ProfilePage.jsx" id="Option"> <img  src="../profile icon.svg" alt="" /> </Link>

                </div>
                
            </div>
        </footer>
    )
}

export default Footer;