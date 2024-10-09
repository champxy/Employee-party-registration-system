<nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4 py-3">
        <!-- Navbar Title -->
        <div class="text-left text-2xl font-bold text-gray-800">
            ระบบลงทะเบียนงานเลี้ยงสังสรรค์พนักงาน ประจำปี 2566
        </div>

        <!-- Menu Items -->
        <div class="flex justify-between items-center mt-4">
            <ul class="flex space-x-6">
                <li>
                    <a href="dashboard.php" class="<?php echo ($current_page == 'home') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'; ?> text-sm transition-colors duration-300">
                        หน้าหลัก
                    </a>
                </li>
                <li>
                    <a href="reserve.php" class="<?php echo ($current_page == 'reserve') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'; ?> text-sm transition-colors duration-300">
                        ลงทะเบียนเข้าร่วมงาน
                    </a>
                </li>
                <li>
                    <a href="report.php" class="<?php echo ($current_page == 'report') ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'; ?> text-sm transition-colors duration-300">
                        รายงานผู้ลงทะเบียนเข้าร่วมงาน
                    </a>
                </li>
            </ul>

            <ul class="flex">
                <li>
                    <a href="logout.php" class="text-gray-700 hover:text-blue-600 text-sm transition-colors duration-300">
                        ออกจากระบบ
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
