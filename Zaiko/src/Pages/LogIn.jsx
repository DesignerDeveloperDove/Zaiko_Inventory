import React from "react";
import UserLogIn from "./Components/LogInField";
import Languages from "./Components/Languages";
function LogIn(){
    return(
        <>
        <div className="LogoImg">
      <img  src= 'src/assets/ZaikoTrans2.png' alt="description" />
    </div>


        <div className="LogInField">
            < UserLogIn />
        </div>
        <div className="LangCircles">
            <Languages />
        </div>


        </>

    );



}
export default LogIn