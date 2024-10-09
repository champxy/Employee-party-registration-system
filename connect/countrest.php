<?php

include_once('data.php');
session_start();
$cp = new check_party();

// Set content type to JSON
header('Content-Type: application/json');

// Initialize the response array
$response = [
    'invitationCount' => 0,
    'registeredCount' => 0,
    'error' => null
];

// Simulated logic to fetch counts; replace with your actual database logic
try {
    // Assume these methods fetch counts from your database
    $response['invitationCount'] = $cp->getInvitationCount(); // Replace with your method
    $response['registeredCount'] = $cp->getRegisteredCount(); // Replace with your method
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

// Send the response as JSON
echo json_encode($response);
