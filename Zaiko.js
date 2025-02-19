let Walk_In=[];

function Objectifier(ProdName, Location, Qty){

    return{
        ProductName: ProdName,
        ProductLocation: Location,
        Quantity: Qty,
    };

}

function displayWalkIn() {
    let displayArea = document.getElementById("Data");
    displayArea.innerHTML = ""; // Clear existing content

    Walk_In.forEach((item, index) => {
        displayArea.innerHTML += `<p><strong>${index + 1}.</strong> ${item.ProductName} - ${item.ProductLocation} - Quantity: ${item.Quantity}</p>`;
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




// creates an array that holds the Objects


