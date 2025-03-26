import React from "react";

function OrderHistory() {
    const data = [
        { name: "Anom", total: "Male" },
        { name: "Megha", total: "Female" },
        { name: "Subham", total: "Male" },
    ];

    return (
        <div className="OrderHistory">
            <h2>Order History</h2>
            <p>Total Items: {data.length}</p>

            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;
