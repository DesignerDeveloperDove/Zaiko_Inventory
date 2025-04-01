import React, { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import { Link } from "react-router";
function OrderHistory() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://developerdove.com/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                setLogs(data.InventoryLog); // Set the InventoryLog data to state
            })
            .catch(() => alert("Loading Order History..."));
    }, []);

    return (
        <div className="productList">
            <div className="ProductHeader">
            <h2><Link to="/Home">&lt; Count History</Link></h2>

                <h2>Order History</h2>
                <form>
                    <button>Newest to oldest</button>
                    <button>Oldest to Newest </button>
                    <button>Name</button>

                </form>
            </div>
            

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
                        {logs.length > 0 ? (
                            logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.LogNum}</td>
                                    <td>{log.EmpID}</td>
                                    <td>{log.StoreNum}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5"><p>No logs available.</p></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
}

export default OrderHistory;
