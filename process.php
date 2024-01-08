<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user responses from the POST data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    // Save user responses to the database
    saveUserResponses($name, $email, $phone);

    // Send a response back to the client
    echo "Thank you for providing your information!";
} else {
    // If the request method is not POST, return an error
    http_response_code(400);
    echo "Invalid request method";
}

function saveUserResponses($name, $email, $phone) {
    // Connect to the database (replace these values with your database credentials)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "chatbot";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert user responses into the database
    $sql = "INSERT INTO chatbotnew (name, email, phone) VALUES ('$name', '$email', '$phone')";
    $conn->query($sql);

    // Close the database connection
    $conn->close();
}
?>