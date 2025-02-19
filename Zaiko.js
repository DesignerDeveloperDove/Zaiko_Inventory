console.log("The JS sheet is Connected");
// The Goal is to create an object that displays on the left hand side as a side bar that has key value pairs in it



// im trying to make a function that creates an object
// this object should take perameter 
// those peraneter should be data 

// This function is a function that creates a single object 
function Objectifier(ProdName, Location, Qty){

    return{
        ProductName: ProdName,
        ProductLocation: Location,
        Quantitiy: Qty,
    };

}

// this makes a new object
//let Product = Objectifier("Patty","Walk-In",25)

/*
let Product = Objectifier(form.Location)
console.log(Product);

//this displays the object
function display(Name){
    
    document.getElementById("Data").innerHTML = 
    Product.ProductName + " <br> " + Product.ProductLocation + " <br> " + Product.Quantitiy;
    
}
display(Product)
// creates an array that holds the Objects
let Walk_In=[Product];
console.log(Walk_In);


// WANT TO CREATE A FUNCTION THAT CREATES A NEW OBJECT 

//document.getElementById("Data").innerHTML = Product;

// the goal is to creat a function that takes any argument as a name and creates an object from it and spits it back at 

/* This doesnt work, the reason is because you need to create a function that creates a new object using the objectefier object

i recommend using a loop of some sort*/

// now try to create a form that saves inputs as variables  


//FORM WORK
// Create a form that inputs as an object 
document.getElementById("FORM").addEventListener("submit",function(event){
    event.preventDefault();// prevents page from refreshing
    let Info = document.getElementById("Product").value;
    console.log(Info);
});