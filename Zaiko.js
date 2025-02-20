/*
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

*/
/*
let Walk_In = [];

// This function creates a product object
function Objectifier(ProdName, Location, Qty) {
    return {
        ProductName: ProdName,
        ProductLocation: Location,
        Quantity: Qty,
    };
}

// This function displays the products in the "Data" div
function displayWalkIn() {
    let displayArea = document.getElementById("Data"); // Select the display area
    displayArea.innerHTML = ""; // Clear existing content

    Walk_In.forEach((item, index) => {
        displayArea.innerHTML += `<p><strong>${index + 1}.</strong> ${item.ProductName} - ${item.ProductLocation} - Quantity: ${item.Quantity}</p>`;
    });
}

function FormInfo() {
    document.getElementById("FORM").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        let a = document.getElementById("Product").value.trim();
        let b = document.getElementById("Location").value.trim();
        let c = document.getElementById("QTY").value.trim();

        if (!a || !b || !c) {
            alert("Please fill out all fields!");
            return;
        }

        let existingIndex = Walk_In.findIndex(item => item.ProductName.toLowerCase() === a.toLowerCase());

        if (existingIndex !== -1) {
            // If product exists, update it
            Walk_In[existingIndex].ProductLocation = b;
            Walk_In[existingIndex].Quantity = c;
            console.log(`Updated: ${a} at index ${existingIndex}`);
        } else {
            // If new product, add it
            let newProduct = Objectifier(a, b, c);
            Walk_In.push(newProduct);
            console.log("APPEND COMPLETE");
        }

        console.log(Walk_In);
        displayWalkIn(); // Update display
    });

    document.getElementById("Delete").addEventListener("click", DeleteMe);

    function DeleteMe() {
        let productName = prompt("Enter the name of the product you want to delete:");
    
        let index = Walk_In.findIndex(item => item.ProductName === productName);
    
        if (index !== -1) {
            Walk_In.splice(index, ); // Remove 1 item at the found index
            console.log("Product deleted.");
            displayWalkIn(); // Refresh display
        } else {
            console.log("Product not found.");
        }
    }
}    


FormInfo()
*/
let Walk_In = [];

// Function to create a product object
function Objectifier(ProdName, Location, Qty) {
    return {
        ProductName: ProdName,
        ProductLocation: Location,
        Quantity: Qty,
        
    };
}
document.getElementById("stepValue").addEventListener("input", function() {
    let stepInput = parseFloat(document.getElementById("stepValue").value);
    
    if (stepInput <= 0) {
        alert("Step value must be greater than 0!");
        document.getElementById("stepValue").value = 1; // Reset to 1 if invalid
    }
});
// Function to display products in the "Data" div
function displayWalkIn() {
    let displayArea = document.getElementById("Data");
    displayArea.innerHTML = ""; // Clear existing content

    Walk_In.forEach((item, index) => {
        let productEntry = document.createElement("p");
        let stepInput = document.getElementById("stepValue").value;
        productEntry.innerHTML = `<strong>${index + 1}.</strong> ${item.ProductName} - ${item.ProductLocation} - Quantity: ${item.Quantity * stepInput}  `;
        
        // Create Delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            removeProduct(index);
        };

        productEntry.appendChild(deleteBtn);
        displayArea.appendChild(productEntry);
    });
}

// Function to remove a product from the list
function removeProduct(index) {
    Walk_In.splice(index, 1); // Remove item at the given index
    displayWalkIn(); // Refresh the display
}

// Function to handle form submission (adding/updating products)
function FormInfo() {
    document.getElementById("FORM").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        let a = document.getElementById("Product").value.trim();
        let b = document.getElementById("Location").value.trim();
        let c = document.getElementById("QTY").value.trim();
        let step = parseInt(document.getElementById("stepValue").value.trim(),10) || 1;

        if (!a || !b || !c) {
            alert("Please fill out all fields!");
            return;
        }

        let existingIndex = Walk_In.findIndex(item => item.ProductName.toLowerCase() === a.toLowerCase());

        if (existingIndex !== -1) {
            // Update existing product
            Walk_In[existingIndex].ProductLocation = b;
            Walk_In[existingIndex].Quantity = c;
        } else {
            // Add new product
            let newProduct = Objectifier(a, b, c);
            Walk_In.push(newProduct);
        }

        displayWalkIn(); 
    });

    
}

let finalArray = [];

document.getElementById("Save").addEventListener("click", SaveMe);

function SaveMe() {
    let stepInput = parseFloat(document.getElementById("stepValue").value) || 1; 
    finalArray = [...Walk_In];
//this function should displayt
    document.getElementById("FinalBox").innerHTML = finalArray.map((item, index) => 
        `<p><strong>${index + 1}.</strong> ${item.ProductName} - ${item.ProductLocation} - Quantity: ${item.Quantity * stepInput}</p>`
    ).join(""); 

    console.log("Saved!", finalArray);
}


FormInfo();

