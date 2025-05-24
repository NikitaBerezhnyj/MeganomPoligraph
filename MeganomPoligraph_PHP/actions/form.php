<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/mail.php';

$inputData = json_decode(file_get_contents('php://input'), true);

if (isset($inputData['name'], $inputData['mail'], $inputData['phone'], $inputData['message'])) {
    sendUserEmail($inputData['name'], $inputData['phone'], $inputData['mail'], $inputData['message']);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields'
    ]);
    exit;
}
?>
