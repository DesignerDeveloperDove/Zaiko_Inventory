import React from "react";
import UserLogIn from "./Components/LogInField";
function LogIn(){
    return(
        <>
        <div className="LogoImg">
      <img  src= 'src/assets/ZaikoTrans2.png' alt="description" />
    </div>


        <div className="LogInField">
            < UserLogIn />
        </div>



        </>

    );



}
export default LogIn