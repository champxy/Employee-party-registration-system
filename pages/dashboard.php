<?php 
$current_page = 'home'; 
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
  <title>ระบบลงทะเบียนงานเลี้ยง</title>
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
      <h1 class="text-3xl font-semibold">ยินดีต้อนรับสู่ระบบลงทะเบียนงานเลี้ยง</h1>
      <p class="mt-4">คุณ Login ด้วย <span class="text-red-600"><?= $_SESSION['user_id']; ?></span></p>
    </div>
  </main>
</body>
</html>
