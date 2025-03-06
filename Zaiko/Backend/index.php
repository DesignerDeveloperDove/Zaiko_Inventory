<?php



header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "192.64.150.136";
$username = "further2_User1";
$password = "001011992Nd!";
$database = "further2_ZaikoDB";

$conn = new mysqli($servername, $username, $password, $database);
$conn->set_charset("utf8mb4"); // Ensure UTF-8 encoding

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$Data = ["users" => [], "products" => []];

// Fetch Users
$sqlUsers = "SELECT * FROM Users";
$resultUsers = $conn->query($sqlUsers);

if ($resultUsers && $resultUsers->num_rows > 0) {
    while ($row = $resultUsers->fetch_assoc()) {
        $Data["users"][] = [
            "id" => $row["id"] ?? null,
            "username" => $row["Username"] ?? null,
            "email" => $row["email"] ?? null
        ];
    }
}

// Fetch Products
$sqlProducts = "SELECT * FROM Products";
$resultProducts = $conn->query($sqlProducts);

if ($resultProducts && $resultProducts->num_rows > 0) {
    while ($row = $resultProducts->fetch_assoc()) {
        $Data["products"][] = [
            "id" => intval($row["ProdId"]), // Convert to integer for consistency
            "name" => $row["ProdName"] ?? null,
            "location" => $row["Location"] ?? null,
            "quantity" => intval($row["Quantity"]) // Convert quantity to integer
        ];
    }
}

$conn->close();

// Encode JSON and return it
$FinalData = json_encode($Data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
if ($FinalData === false) {
    echo json_encode(["error" => "JSON encoding failed: " . json_last_error_msg()]);
    exit();
}

echo $FinalData;
exit();






 /*

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");

    echo "PHP is running!<br>"; // Debugging line

    $servername = "192.64.150.136";
    $username = "further2_User1";
    $password = "001011992Nd!";
    $database = "further2_ZaikoDB";

    $conn = new mysqli($servername, $username, $password, $database);
    $conn->set_charset("utf8mb4"); // Force UTF-8 encoding at the database connection level

    if ($conn->connect_error) {
        die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
    }


    error_reporting(E_ALL & ~E_DEPRECATED & ~E_WARNING);
    ini_set('display_errors', 0);

    $Data = ["users" => [], "products" => []];

    // Fetch Users
    $sqlUsers = "SELECT * FROM Users";
    $resultUsers = $conn->query($sqlUsers);

    if ($resultUsers && $resultUsers->num_rows > 0) {
        while ($row = $resultUsers->fetch_assoc()) {
            $row = array_map("utf8_encode", $row); // Ensure UTF-8 encoding
            $Data["users"][] = [
                "id" => $row["id"] ?? null,
                "username" => $row["Username"] ?? null,
                "email" => $row["email"] ?? null
            ];
        }
        echo "Users found: " . $resultUsers->num_rows . "<br>";
    } else {
        echo "No users found.<br>";
    }

    // Fetch Products
    $sqlProducts = "SELECT * FROM Products";
    $resultProducts = $conn->query($sqlProducts);

    if ($resultProducts && $resultProducts->num_rows > 0) {
        while ($row = $resultProducts->fetch_assoc()) {
            $row = array_map("utf8_encode", $row); // Ensure UTF-8 encoding
            $Data["products"][] = [
                "id" => $row["ProdId"] ?? null,
                "name" => $row["ProdName"] ?? null,
                "location" => $row["Location"] ?? null,
                "quantity" => $row["Quantity"] ?? null
            ];
        }
        echo "Products found: " . $resultProducts->num_rows . "<br>";
    } else {
        echo "No products found.<br>";
    }

    // Encode JSON and check for errors
    $FinalData = json_encode($Data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    if ($FinalData === false) {
        die("JSON encoding failed: " . json_last_error_msg());
    }

    echo "<pre>$FinalData</pre>";
    // Ensure it's visible in the browser

    $conn->close();
*/






/*

    php -S localhost:8000
    $servername = "192.64.150.136";
    $username = 'further2_User1';
    $password = '001011992Nd!';
    $database = "further2_ZaikoDB";// this should be the name of your DB


    //create connection like done in class

    $conn = new mysqli ($servername, $username, $password, $database);// i originally thought this was the name of your DB , but mysqli is a built in class that connects to your local host

    //check connection

    if ($conn->connect_error){
        die("connection failed:".$conn->connect_error);
    }
    //echo "connected succesfully!";


    $sql = "SELECT * FROM Users";
    if($conn->query($sql) == TRUE){
        // echo "query succseful bro";
    } else {
        echo "query didnt work bro <br>";
    }


    $result = $conn->query($sql);

    $UNFound = false;
    $EMFound = false;

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            
        
        if ($row["Username"] == $_POST ["Username"]){
            // echo "UserName found! <br>";
            $UNFound = true;
        }
        if ($row["email"] == $_POST ["email"]){
            //echo "Email found! <br>";
            $EMFound = true;
        }
    }
    }else{
        echo "nah bro nothing is in here <br>";
    }

    if ($UNFound && $EMFound){

        echo"<script>
        alert('Welcome ! Loading Your DashBoard Now!');
        window.location.href = 'index.php'; 
            </script>";
        
    }
    else {
        echo "<div id='UserNotFound'>
        <h1>user not found!</h1>
        </div>
        ";
        echo " <div id='CreateUserLink'>
            <a href = 'NewUser.php'> Create User </a>
        </div>
        
        ";
    }

// xtra stuff"

            echo "<tr><td>".$row["ProdId"]."</td><td>".$row["ProdName"]."</td><td>".$row["Location"]."</td><td>".$row["Quantity"]."</td></tr>";

            echo "<tr><td>".$row["id"]."</td><td>".$row["Username"]."</td><td>".$row["email"]."</td></tr>";



    $conn->close();






    
    */

    /*
    <?php
    header("Access-Control-Allow-Origin: *");
    
    $servername = "192.64.150.136";
    $username = "further2_User1";
    $password = "001011992Nd!";
    $database = "further2_ZaikoDB";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
    //    echo "Connected successfully to the database!<br><br>";
    }
    
    //$data=[];
    
    
    // Fetch and display users
    $sqlUsers = "SELECT * FROM Users";
    $resultUsers = $conn->query($sqlUsers);
    
    if ($resultUsers && $resultUsers->num_rows > 0) {
       // header("Content-Type:JSON");
        echo "<h2>Users Table</h2>";
        echo "<table border='1'><tr><th>ID</th><th>Username</th><th>Email</th></tr>";
    
        while($row = $resultUsers->fetch_assoc()) {
            $Data[]= [
                 $row["id"].$row["Username"].$row["email"]
            ];
        }
        echo "</table><br>";
    } else {
        echo "No users found or table does not exist.<br>";
    }
    
    // Fetch and display products
    $sqlProducts = "SELECT * FROM Products";
    $resultProducts = $conn->query($sqlProducts);
    
    
    
    if ($resultProducts && $resultProducts->num_rows > 0) {
           // header("Content-Type:JSON");
           //this is the HTML 
       echo "<h2>Products Table</h2>";
        echo "<table border='1'><tr><th>ID</th><th>Name</th><th>Location</th><th>Quantity</th></tr>";
    
        // this is the reults from the DB 
        while($row = $resultProducts->fetch_assoc()) {
            //echo json_encode($resultProducts);
            
            $Data[] = [
                $row["ProdId"].$row["ProdName"].$row["Location"].$row["Quantity"]
            ];
            
            $jsonData = json_encode($Data);
            echo $jsonData;
    
        }
        echo "</table><br> ";
    } else {
        echo "No products found or table does not exist.<br>";
    }
    
    
    $jsonData = json_encode($Data);
            echo $jsonData;
    
    
    $conn->close();



*/


?>
