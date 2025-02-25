import React from "react";
import UserLogIn from "./Components/LogInField";
function LogIn(){
    return(
        <>
        <div>
      <img  src= 'src/assets/ZaikoLogo.jpg' alt="description" />
    </div>
        <h1>Log in here</h1>


        <div className="LogInField">
            < UserLogIn />
        </div>



        </>

    );



}
export default LogIn