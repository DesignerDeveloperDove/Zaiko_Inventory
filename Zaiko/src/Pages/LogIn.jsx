import React from "react";
import ZaikoLogo from './assets/ZaikoLogo.png'
import UserLogIn from "./Components/LogInField";
function LogIn(){
    return(
        <>
        <div>
      <img src={ZaikoLogo} alt="description" />
    </div>
        <h1>Log in here</h1>


        <div className="LogInField">
            < UserLogIn />
        </div>



        </>

    );



}
export default LogIn