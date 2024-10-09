<?php
session_start();
include_once('data.php');

?>
<?php
$cp = new check_party();

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $name_regis     = $input['name'] ?? '';
    $pass_regis = $input['password'] ?? '';
    $otp = ['name_regis' => $name_regis, 'pass_regis' => $pass_regis];
    if ($cp->checkregis($otp) == true) {
        $_SESSION['user_id'] = $name_regis;
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }
} else if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    if (isset($_GET['emp_name']) || isset($_GET['fcucode'])) {

        $emp_name = $_GET['emp_name'] ?? '';
        $fcucode = $_GET['fcucode'] ?? '';
        $otp = ['emp_name' => $emp_name, 'fcucode' => $fcucode];
        $result = $cp->checkuserorid($otp);

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


?>