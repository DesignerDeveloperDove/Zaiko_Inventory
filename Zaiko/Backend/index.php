<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "192.64.150.136";
$username = "further2_User1";
$password = "001011992Nd!";
$database = "further2_ZaikoDB";

$conn = new mysqli($servername, $username, $password, $database);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Handle OPTIONS request for CORS preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit();
}

// Handle POST request for adding a product
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["name"]) || !isset($data["location"]) || !isset($data["quantity"]) || !isset($data["HouseLocation"])) {
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $name = $conn->real_escape_string($data["name"]);
    $location = $conn->real_escape_string($data["location"]);
    $quantity = intval($data["quantity"]); // Convert to integer for safety
    $HouseLocation = $conn->real_escape_string($data["HouseLocation"]);

    $sql = "INSERT INTO Products (ProdName, Location, Quantity, HouseLocation) VALUES ('$name', '$location', $quantity, '$HouseLocation')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Product added successfully"]);
    } else {
        echo json_encode(["error" => "Failed to add product: " . $conn->error]);
    }
    exit();
}

// Handle PUT request for updating a product
if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    parse_str(file_get_contents("php://input"), $data); // Parse PUT data

    if (!isset($data["id"]) || !isset($data["name"]) || !isset($data["location"]) || !isset($data["quantity"]) || !isset($data["HouseLocation"])) {
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $id = intval($data["id"]);
    $name = $conn->real_escape_string($data["name"]);
    $location = $conn->real_escape_string($data["location"]);
    $quantity = intval($data["quantity"]);
    $HouseLocation = $conn->real_escape_string($data["HouseLocation"]);

    $sql = "UPDATE Products SET ProdName='$name', Location='$location', Quantity=$quantity, HouseLocation='$HouseLocation' WHERE ProdId=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Product updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update product: " . $conn->error]);
    }
    exit();
}

// Handle DELETE request for deleting a product
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    parse_str(file_get_contents("php://input"), $data); // Parse DELETE data

    if (!isset($data["id"])) {
        echo json_encode(["error" => "Product ID is required"]);
        exit();
    }

    $id = intval($data["id"]);

    $sql = "DELETE FROM Products WHERE ProdId=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => "Product deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete product: " . $conn->error]);
    }
    exit();
}

$Data = ["users" => [], "products" => [], "Employee" => [], "InventoryLog" => []];

$sqlProducts = "SELECT * FROM Products";
$resultProducts = $conn->query($sqlProducts);

if ($resultProducts && $resultProducts->num_rows > 0) {
    while ($row = $resultProducts->fetch_assoc()) {
        $Data["products"][] = [
            "id" => intval($row["ProdId"]),
            "name" => $row["ProdName"] ?? null,
            "location" => $row["Location"] ?? null,
            "quantity" => intval($row["Quantity"]),
            "HouseLocation" => $row["HouseLocation"] ?? null
        ];
    }
}

$sqlEmployees = "SELECT * FROM Employee";
$resultEmployees = $conn->query($sqlEmployees);

if ($resultEmployees && $resultEmployees->num_rows > 0) {
    while ($row = $resultEmployees->fetch_assoc()) {
        $Data["Employee"][] = [
            "EmpID" => $row["EmpID"] ?? null,
            "FirstName" => $row["FirstName"] ?? null,
            "LastName" => $row["LastName"] ?? null,
            "EmpPosition" => $row["EmpPosition"] ?? null,
            "StoreNum" => $row["StoreNum"]
        ];
    }
}

$sqlLogs = "SELECT * FROM InventoryLog";
$resultLogs = $conn->query($sqlLogs);

if ($resultLogs && $resultLogs->num_rows > 0) {
    while ($row = $resultLogs->fetch_assoc()) {
        $Data["InventoryLog"][] = [
            "LogNum" => $row["LogNum"] ?? null,
            "EmpID" => $row["EmpID"] ?? null,
            "StoreNum" => $row["StoreNum"]
        ];
    }
}

$conn->close();

// Return JSON response
echo json_encode($Data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit();

?>
