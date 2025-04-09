import React, { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import { Link } from "react-router";

function ProfilePage() {
    const [logs, setLogs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [employee, setEmployee] = useState({ EmpID: "", FirstName: "", LastName: "", EmpPosition: "", StoreNum: "" });

    useEffect(() => {
        fetch("http://developerdove.com/Zaiko/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                const filteredLogs = data.InventoryLog.filter(log => log.EmpID === "2");
                setLogs(filteredLogs);
                const emp = data.Employee.find(emp => emp.EmpID === "2") || {};
                setEmployee(emp);
            })
    }, []);
    return (
        <>
        <div className="productList">
                <div className="ProfileHeader">
                <div className="PFP">
                        <p></p>
                    </div>
                    <div id="PFHInfo">
                        <h1>{employee.FirstName} {employee.LastName}</h1>
                        <h3>{employee.EmpPosition}</h3>
                        <h3>Employee ID: {employee.EmpID}</h3>  
                        <h4>Store Number: {employee.StoreNum}</h4>
                                     
                    </div>

                </div>
            

            <div className="dropdown2">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <div className="BtnInfo">
                    <h2>My Count History</h2>  <h1>{isOpen ? '▲' : '▼'}</h1>
                    </div>
                </button>
                </div>

                {isOpen && (
                    <div className="OrderHistoryTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Log Number</th>
                                    <th>Employee ID</th>
                                    <th>Store Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length ? logs.map((log, index) => (
                                    <tr key={index}>
                                        <td>{log.LogNum}</td>
                                        <td>{log.EmpID}</td>
                                        <td>{log.StoreNum}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                <p><img src="../ZaikoLogo.jpg" alt="" />.</p>
                        </tr>
                                )}
                            </tbody>
                        </table>


                    </div>
                    
                )}
            <Footer />
        </div>


        <div className="SaveBtnContainer">
               <Link to="/"> 
                    <button className="LogOut"  style={{ display: isOpen ? "none" : "block" }}>
                        <h1>Log Out</h1>
                    </button>   
                </Link>
            </div>
        </>
        

    );
}

export default ProfilePage;
