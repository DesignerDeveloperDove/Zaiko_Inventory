import React, { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import DataInfo from "./Components/Data";
import { Link } from "react-router-dom";
import { lazy } from "react";
import Los from "./Components/AllLocations";
//import ProductPage from "./Components/ProductsPage";
function Home() {
    

    return (
        <>
        <Los />
        <Footer />
        </>
    );
}

export default Home;
/** 
 * ok bro so this is how this is gonna have to work the walk in page is gonna have to be 1 page , in that page it needs to have
 * a variablized :
 *  List of products
 *  title
 *  all based on whichever location has been pressed
 * 
 * 
 */

