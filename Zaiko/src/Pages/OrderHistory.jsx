import React, { useEffect, useState } from "react";
import Footer from "./Components/Footer";
import { Link } from "react-router";

function OrderHistory() {
    const [logs, setLogs] = useState([]);
    const [groupedLogs, setGroupedLogs] = useState([]); // To store grouped data
    const [isGrouped, setIsGrouped] = useState(false); // To track if data is grouped by EmpID

    useEffect(() => {
        fetch("https://developerdove.com/Zaiko/ZaikoApp/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                const sortedLogs = data.InventoryLog.sort((a, b) => a.LogNum - b.LogNum); // Sort by LogNum descending
                setLogs(sortedLogs); // Set the InventoryLog data to state sorted by LogNum
                setGroupedLogs([]); // Clear any previous grouped data
            })
            .catch(() => alert("Loading Order History..."));
    }, []);

    function Descend(e) {
        e.preventDefault();
        // If grouped by EmpID, reset back to logs
        if (isGrouped) {
            setIsGrouped(false);
            setGroupedLogs([]); // Reset grouped logs
        }

        const sortedLogs = [...logs].sort((a, b) => b.LogNum - a.LogNum); // Sort by LogNum in descending order
        setLogs(sortedLogs); // Update the state with the sorted logs
    }

    function Ascend(e) {
        e.preventDefault();
        // If grouped by EmpID, reset back to logs
        if (isGrouped) {
            setIsGrouped(false);
            setGroupedLogs([]); // Reset grouped logs
        }

        const sortedLogs = [...logs].sort((a, b) => a.LogNum - b.LogNum); // Sort by LogNum in ascending order
        setLogs(sortedLogs); // Update the state with the sorted logs
    }

    function Name(e) {
        e.preventDefault();
        // Group logs by EmpID
        const grouped = logs.reduce((acc, log) => {
            if (!acc[log.EmpID]) {
                acc[log.EmpID] = [];
            }
            acc[log.EmpID].push(log);
            return acc;
        }, {});

        // Convert the grouped object into an array for rendering
        const groupedArray = Object.keys(grouped).map(empID => ({
            empID,
            logs: grouped[empID]
        }));

        setGroupedLogs(groupedArray); // Set the grouped logs state
        setIsGrouped(true); // Mark the logs as grouped
    }

    return (
        <div className="productList">
            <div className="ProductHeader">
                <h2><Link to="/Home"> Count History</Link> </h2>
                <form className="formFilterBar">
                    <button className="countFilter" onClick={Descend} type="button" >Newest to oldest</button>
                    <button className="countFilter" onClick={Ascend} type="button">Oldest to Newest</button>
                    <button className="countFilter" onClick={Name} type="button">Name</button>
                </form>
            </div>

            <div className="OrderHistoryTable">
                {isGrouped ? (
                    // Render a table for each employee (grouped by EmpID)
                    groupedLogs.map((group, index) => (
                        <div key={index}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Log Number</th>
                                        <th>Employee ID</th>
                                        <th>Store Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.logs.map((log, index) => (
                                        <tr key={index}>
                                            <td>{log.LogNum}</td>
                                            <td>{log.EmpID}</td>
                                            <td>{log.StoreNum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    // Default table when not grouped by EmpID
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
                                    <td colSpan="3"><p>No logs available.</p></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default OrderHistory;
