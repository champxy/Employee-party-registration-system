<?php
date_default_timezone_set('Asia/Bangkok'); 
include_once('data.php');
session_start();
$cp = new check_party();

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    if (isset($input['fcucode'])) {
        $fcucode = $input['fcucode'] ?? '';
        $date = date('Y-m-d'); 
        $time = date('H:i:s'); 
        $emp_name = $_SESSION['user_id'];
        $card = "ลงทะเบียนพนักงาน";
        $otp = ['fcucode' => $fcucode, 'date' => $date, 'time' => $time, 'emp_name' => $emp_name, 'card' => $card];
        $result = $cp->addreserve($otp);
        

        if (is_array($result) && (!isset($result['status']) || $result['status'] != 'error')) {
            echo json_encode(['status' => 'success', 'data' => $result]);
        } else {
            // กรณีไม่เจอข้อมูล ให้ return error
            echo json_encode(['status' => 'error', 'message' => 'Not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    if (isset($_GET['fcucode'])) {
        $fcucode = $_GET['fcucode'] ?? '';
        // $result = $cp->checkuserorid($otp);
        $result = $cp->getdata($fcucode);

        if (is_array($result) && (!isset($result['status']) || $result['status'] != 'error')) {
            echo json_encode(['status' => 'success', 'data' => $result]);
        } else {
            // กรณีไม่เจอข้อมูล ให้ return error
            echo json_encode(['status' => 'error', 'message' => 'Not found']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
}
