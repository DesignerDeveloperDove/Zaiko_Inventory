// This section creates a object from a from and deisplays it in the "Data" Div
let Walk_In=[];

//this is the objectifier, it turns inputs into objects 
function Objectifier(ProdName, Location, Qty){

    return{
        ProductName: ProdName,
        ProductLocation: Location,
        Quantity: Qty,
    };

}

// this displays thos objects in the "Data" Div -- his was made using chat
function displayWalkIn() {
    let displayArea = document.getElementById("Data"); // this saves the "Data" div as a var called "displayArea"
    displayArea.innerHTML = ""; // this Clears existing content

    //item represents the current product in the loop.
    //index is the position 
    // for each goes through Each item in the Walkin array anf finds each Item(in our case product objects) and its index in the array
    Walk_In.forEach((item, index) => {
        //displayArea is the element with id="Data", where we’re showing the products.
        //.innerHTML += means "add this new HTML" to whatever is already inside.
        displayArea.innerHTML += `<p><strong>${index + 1}.</strong> Product: ${item.ProductName} - Location:${item.ProductLocation} - Quantity: ${item.Quantity}</p>`;
        
    });
}

  function FormInfo(){
    document.getElementById("FORM").addEventListener("submit",function(event){
      event.preventDefault();// prevents page from refreshing
      let a = document.getElementById("Product").value;
      let b = document.getElementById("Location").value;
      let c = document.getElementById("QTY").value;
        let newproduct = Objectifier(a,b,c)
       //console.log(newproduct)
        Walk_In.push(newproduct);
        console.log("APPEND COMPLETE")
        console.log(Walk_In)
        displayWalkIn();

       //return this.newproduct;
        
  });
  }
  FormInfo()




//Now this next section should edit the objects

// create a function that finds the object your looking for 
//Add fields to enter new values
//Create the EditProduct function that updates the existing object
//Add an event listener to the "Edit" button


function Edit(){
let ProductToUpdate = Walk_In.find(item => item.ProductName === `${item.ProductName}`)
if (ProductToUpdate) {
    ProductToUpdate.quantity = 60; // Updating quantity
    console.log(Walk_In);
} else {
    console.log("Product not found");
}
}
document.getElementById("Edit").addEventListener("click",Edit())

