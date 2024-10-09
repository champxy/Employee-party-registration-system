<?php
include_once('data.php'); // Include your database connection or any necessary files
session_start();

header('Content-Type: application/json');

try {
    $cp = new check_party(); // Assuming this class handles your DB operations
    // You might need to implement the `getEmployeeData` method in your class
    $data = $cp->getEmployeeData(); // Fetch employee data
    echo json_encode(['status' => 'success', 'data' => $data]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
