<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$servername = "localhost";  // XAMPP default
$username = "root";         // XAMPP default username
$password = "";             // XAMPP default password (empty)
$dbname = "portfolio_hub";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to UTF8
$conn->set_charset("utf8");

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);
    $created_at = date('Y-m-d H:i:s');

    // Basic validation
    $errors = [];

    if (empty($name) || strlen($name) < 2) {
        $errors[] = "Name must be at least 2 characters long";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address";
    }

    if (!empty($phone) && !preg_match('/^[\+]?[\d\s\-\(\)]{10,}$/', $phone)) {
        $errors[] = "Please enter a valid phone number";
    }

    if (empty($subject) || strlen($subject) < 3) {
        $errors[] = "Subject must be at least 3 characters long";
    }

    if (empty($message) || strlen($message) < 10) {
        $errors[] = "Message must be at least 10 characters long";
    }

    // If no errors, insert into database
    if (empty($errors)) {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?)");

        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("ssssss", $name, $email, $phone, $subject, $message, $created_at);

        if ($stmt->execute()) {
            // Success - redirect back to contact page with success message
            echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
            exit();
        } else {
            // Error inserting data
            echo "<script>alert('Database error: " . $conn->error . "'); window.location.href='contact.html';</script>";
            exit();
        }

        $stmt->close();
    } else {
        // Validation errors
        $error_message = implode(", ", $errors);
        echo "<script>alert('Validation errors: " . $error_message . "'); window.location.href='contact.html';</script>";
        exit();
    }
}

$conn->close();
?>