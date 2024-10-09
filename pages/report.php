<?php
$current_page = 'report';
session_start();

if (!isset($_SESSION['user_id'])) {
  header('Location: index.php'); // ถ้ายังไม่ได้ล็อกอินให้ไปหน้า login
  exit();
}
?>
<!DOCTYPE html>
<html lang="th">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;700&display=swap" rel="stylesheet">
  <title>รายงานผู้ลงทะเบียนเข้าร่วมงาน</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
    }

    .active-tab {
      color: #3b82f6;
      /* Blue color for the active tab */
      border-bottom: 2px solid #3b82f6;
      /* Blue border */
    }
  </style>
</head>

<body class="bg-gray-100">
  <?php include_once('nav.php') ?>
  <main class="container mx-auto">

    <div class="flex justify-around bg-white shadow-md rounded-bl-lg rounded-br-lg p-2 mb-6">
      <button onclick="showTab('tab1', this)" class="tab-item text-center p-2 text-gray-700 hover:text-blue-500">รายงานจำนวนผู้ลงทะเบียนเข้าร่วมงาน</button>
      <button onclick="showTab('tab2', this)" class="tab-item text-center p-2 text-gray-700 hover:text-blue-500">ส่งออกรายงานผู้ลงทะเบียน</button>
    </div>

    <div id="tab1" class="tab-content hidden flex justify-center items-center">
      <div class="w-1/2 max-w-2xl bg-white shadow-md rounded-lg p-8 flex flex-col items-center text-center"> <!-- Increased width and padding -->
        <h2 id="employee-invitation-count" class="text-4xl font-semibold mb-5">จำนวนพนักงานที่ได้รับบัตรเชิญ</h2>
        <h2 id="employee-registered-count" class="text-4xl font-semibold ">จำนวนพนักงานที่ลงทะเบียน</h2>
      </div>
    </div>


    <div id="tab2" class="tab-content hidden flex justify-center items-center">
      <div class="w-2/3 max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
        <h2 class="text-2xl font-semibold">ข้อมูลพนักงาน</h2>
       
        <div id="empdatatable" class="w-full overflow-x-auto">
          <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b bg-blue-500 text-white">ลำดับพนักงาน</th>
                <th class="py-2 px-4 border-b bg-blue-500 text-white">หมายเลขพนักงาน</th>
                <th class="py-2 px-4 border-b bg-blue-500 text-white">ชื่อ</th>
                <th class="py-2 px-4 border-b bg-blue-500 text-white">แผนก</th>
                <th class="py-2 px-4 border-b bg-blue-500 text-white">บริษัท</th>
              </tr>
            </thead>
            <tbody id="employee-table-body">
              <!-- Employee rows will be inserted here -->
            </tbody>
          </table>
          <div id="pagination" class="mt-4 flex justify-center items-center">
            <button id="prevPage" class="px-4 py-2 bg-blue-500 text-white rounded-md">Previous</button>
            <span id="pageInfo" class="mx-4"></span>
            <button id="nextPage" class="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>



    </div>
  </main>




</body>
<script src="../js/report.js"></script>

</html>