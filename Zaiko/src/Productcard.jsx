import { useState } from "react";

const ProductCard = () => {
  const [walkIn, setWalkIn] = useState([]);
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [qty, setQty] = useState("");
  const [stepValue, setStepValue] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product || !location || !qty) {
      alert("Please fill out all fields!");
      return;
    }

    setWalkIn((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.ProductName.toLowerCase() === product.toLowerCase()
      );
      
      if (existingIndex !== -1) {
        const updatedList = [...prev];
        updatedList[existingIndex] = { ...updatedList[existingIndex], ProductLocation: location, Quantity: qty, StepValue: stepValue };
        return updatedList;
      }
      return [...prev, { ProductName: product, ProductLocation: location, Quantity: qty, StepValue: stepValue }];
    });

    setProduct("");
    setLocation("");
    setQty("");
    setStepValue(1);
  };

  const handleDelete = (index) => {
    setWalkIn((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log("Saved!", walkIn);
  };

  return (
    <div>
      <h1>ZAIKO Inventory</h1>
      <div className="body2">
        <div className="SideBar">
          <h1>Data</h1>
          {walkIn.map((item, index) => (
            <p key={index}>
              <strong>{index + 1}.</strong> {item.ProductName} - {item.ProductLocation} - Quantity: {item.Quantity * item.StepValue}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </p>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>

        <div className="DAFORM">
          <form onSubmit={handleSubmit}>
            <h1>Object Maker Form</h1>
            <label>Product Name</label>
            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />

            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

            <label>Individuals Per Case</label>
            <input type="number" value={stepValue} min="1" onChange={(e) => setStepValue(Math.max(1, parseFloat(e.target.value) || 1))} />

            <label>Case Quantity</label>
            <input type="number" value={qty} min="1" onChange={(e) => setQty(e.target.value)} />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
