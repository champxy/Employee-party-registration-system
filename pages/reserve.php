<?php
$current_page = 'reserve';
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
  <title>ลงทะเบียนเข้าร่วมงาน</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
    }
  </style>
</head>

<body class="bg-gray-100">
  <?php include_once('nav.php') ?>
  <main class="container mx-auto mt-10">
    <div class="text-center text-gray-600">


        <form id="searchForm" action="#" method="POST" class="flex justify-center items-end space-x-4">
            <div class="flex-1 max-w-xs">
                <label for="emp_name" class="block text-sm font-medium text-gray-700">ชื่อพนักงาน</label>
                <input type="text" id="emp_name" name="emp_name"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" placeholder="กรุณาใส่ชื่อพนักงาน">
            </div>
            <div class="flex items-center text-gray-500">
                <span>หรือ</span>
            </div>
            <div class="flex-1 max-w-xs">
                <label for="fcucode" class="block text-sm font-medium text-gray-700">รหัสพนักงาน</label>
                <input type="text" id="fcucode" name="fcucode"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300" placeholder="กรุณาใส่รหัสพนักงาน">
            </div>
            <div class="flex items-end">
                <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">ค้นหา</button>
            </div>
        </form>

        <div id="tabledatasearch" class="mt-10"></div>
        <div id="resultCard" class="mt-10"></div>
        <div id="tableData" class="mt-10"></div>
      
    </div>
</main>

<script>
   const fcucodeInput = document.getElementById('fcucode');

fcucodeInput.addEventListener('input', function (e) {
  this.value = this.value.replace(/\D/g, '');
});
</script>
</body>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/feed.js"></script>
</html>