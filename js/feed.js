let globalData = [];
async function fetchEmployeeData() {
  try {
    const response = await fetch('../connect/employeeData.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.status === 'success') {
      console.log('Data:', data.data);
      globalData = data.data;
      // populateEmployeeTable(data.data);
    } else {
      console.error('Error fetching data:', data.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  fetchEmployeeData();
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById('loginForm');
  const searchForm = document.getElementById('searchForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (searchForm) {
    searchForm.addEventListener('submit', handleSearchSubmit);
  }
});

async function reseve(fcucode) {
  console.log("reseve", fcucode);
  const res = await fetch('../connect/restgetdata.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fcucode: fcucode,
    }),
  });

  const data = await res.json();
  console.log(data);

  if (data.status === 'success') {
    Swal.fire({
      icon: 'success',
      title: 'ลงทะเบียนสำเร็จ',
      text: 'รอสักครู่...กำลังโหลดข้อมูลใหม่',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      GetEmptotable(fcucode);
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'ลงทะเบียนไม่สำเร็จ',
      text: 'มีบางอย่างผิดพลาด',
      confirmButtonText: 'Try Again'
    });
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  fetch('../connect/rest.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          text: 'กำลังเปลี่ยนหน้า...',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.href = '../pages/reserve.php';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          confirmButtonText: 'Try Again'
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while logging in.',
        confirmButtonText: 'OK'
      });
    });
}

let currentPage = 1;
const itemsPerPage = 10;
let filteredData = []; // เก็บข้อมูลที่ถูกกรอง

async function handleSearchSubmit(event) {
  event.preventDefault();

  const empNameInput = document.getElementById('emp_name').value.trim();
  const fcucodeInput = document.getElementById('fcucode').value.trim();

  if (empNameInput === "" && fcucodeInput === "") {
    Swal.fire({
      title: 'แจ้งเตือน!',
      text: 'กรุณากรอกชื่อพนักงานหรือรหัสพนักงานอย่างใดอย่างหนึ่ง',
      icon: 'warning',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  // กรองข้อมูลพนักงาน
  filteredData = globalData.filter(emp => {
    const nameMatch = empNameInput === "" || emp.emp_name.includes(empNameInput);
    const codeMatch = fcucodeInput === "" || emp.fcucode.includes(fcucodeInput);
    return nameMatch && codeMatch;
  });

  if (filteredData.length === 0) {
    Swal.fire({
      title: 'ไม่พบข้อมูล!',
      text: 'ไม่มีพนักงานที่ตรงกับคำค้นหาของคุณ',
      icon: 'error',
      confirmButtonText: 'ตกลง'
    });
    return;
  }

  currentPage = 1; // รีเซ็ตหน้าปัจจุบันเมื่อค้นหาใหม่
  populateEmployeeTable(filteredData); // แสดงข้อมูลที่ถูกกรอง
}

function populateEmployeeTable(data) {
  const tableContainer = document.getElementById('tabledatasearch');

  // สร้างโครงสร้างของตารางพร้อม TailwindUI
  const tableHTML = `
  <div class="mb-4 w-full">
      <hr class="border-t border-gray-300 mb-5">
      <div class="w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
        <div class="w-full overflow-x-auto">
        <h2 class="text-4xl font-semibold  mb-4 mt-3">รายชื่อพนักงาน</h2>
          <div class="overflow-x-auto shadow-md rounded-lg border border-gray-300 mt-4">
              <table class="min-w-full bg-white rounded-lg">
                <thead class="bg-blue-500">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">รหัสพนักงาน</th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">ชื่อพนักงาน</th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">แผนก</th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">บริษัท</th>
                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"></th>
                  </tr>
                </thead>
            <tbody id="employeeTableBody" class="bg-white divide-y divide-gray-200"></tbody>
          </table>
        </div>
          <div id="pagination" class="flex justify-center mt-4 items-center"></div>
        </div>
      </div>
    </div>
  `;

  // แทรกโครงสร้างของตารางเข้าไปใน div
  tableContainer.innerHTML = tableHTML;

  const tableBody = document.getElementById('employeeTableBody');

  // ล้างข้อมูลเก่าแล้วเพิ่มข้อมูลใหม่
  tableBody.innerHTML = '';

  // คำนวณการแสดงข้อมูลตามหน้า
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  currentData.forEach(employee => {
    const row = `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">${employee.fcucode}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${employee.emp_name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${employee.emp_dev}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">${employee.emp_fac}</td>
        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
          <button onclick="showCard('${employee.fcucode}')" class="text-blue-600 hover:text-blue-900 focus:outline-none">
            ตรวจสอบข้อมูล
          </button>
        </td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });

  // แสดงปุ่มเลื่อนหน้า
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(data.length / itemsPerPage);

  pagination.innerHTML = `
    <div class="flex items-center justify-center">
      <button class="px-4 py-2 bg-blue-500 text-white rounded-lg" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">ก่อนหน้า</button>
      <span class="mx-4">หน้า ${currentPage} จาก ${totalPages}</span>
      <button class="px-4 py-2 bg-blue-500 text-white rounded-lg" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">ถัดไป</button>
    </div>
  `;

  resultCard.innerHTML = ''; 
  tableData.innerHTML = '';
}

function changePage(direction) {
  currentPage += direction;
  populateEmployeeTable(filteredData); 
}


async function showCard(fcucode) {

  const employee = globalData.find(emp => emp.fcucode === fcucode);

  if (employee) {
    const empNameColor = employee.emp_name.length > 10 ? 'text-red-500' : '';
    const fcucodeColor = employee.fcucode.length > 10 ? 'text-red-500' : '';

    const cardHTML = `
        <div class="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">ข้อมูลพนักงาน</div>
                <p class="text-gray-700 text-base text-xl"><strong>ชื่อพนักงาน:</strong> <span class="${empNameColor}">${employee.emp_name}</span></p>
                <p class="text-gray-700 text-base text-xl"><strong>รหัสพนักงาน:</strong> <span class="${fcucodeColor}">${employee.fcucode}</span></p>
                <p class="text-gray-700 text-base"><strong>แผนก:</strong> ${employee.emp_dev}</p>
                <p class="text-gray-700 text-base"><strong>บริษัท:</strong> ${employee.emp_fac}</p>
                <br>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="reseve('${employee.fcucode}')">ลงทะเบียนพนักงาน</button>
            </div>
        </div>
    `;

    // ใส่ HTML ของการ์ดลงใน resultCard
    resultCard.innerHTML = cardHTML;
    tabledatasearch.innerHTML = '';
    GetEmptotable(fcucode);
  } else {
    resultCard.innerHTML = '';
    document.getElementById('tableData').innerHTML = '';
  }
}



async function GetEmptotable(fcucode) {
  console.log("Fetching data for fcucode:", fcucode);

  const res = await fetch(`../connect/restgetdata.php?fcucode=${fcucode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    console.error('HTTP error', res.status);
    document.getElementById('tableData').innerHTML = '<p class="text-red-500">เกิดข้อผิดพลาดในการดึงข้อมูล</p>';
    return;
  }

  const response = await res.json();
  console.log("Response received:", response);

  if (response.status === 'success' && Array.isArray(response.data) && response.data.length > 0) {
    const tableRows = response.data.map((employee, index) =>
      `<tr class="border-t border-gray-200">
              <td class="py-2 px-4">${index + 1}</td>
              <td class="py-2 px-4">${employee.fsucode}</td>
              <td class="py-2 px-4">${employee.date_regis}</td>
              <td class="py-2 px-4">${employee.time_regis}</td>
              <td class="py-2 px-4">${employee.user_regis}</td>
              <td class="py-2 px-4 text-green-600">${employee.card_regis}</td>
          </tr>`
    ).join('');

    const tableHTML = `
          <div class="mb-4 w-full">
              <hr class="border-t border-gray-300 mb-5">
              <div class="w-full bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
                  <h2 class="text-4xl font-semibold mt-4">ข้อมูลการลงทะเบียนของพนักงานรหัส ${fcucode}</h2>
                  <div class="overflow-x-auto shadow-lg rounded-lg border border-gray-300 mt-4">
                      <table class="min-w-full bg-white rounded-lg">
                          <thead>
                              <tr class="bg-blue-500 text-white">
                                  <th class="py-2 px-4">จำนวนครั้งที่ลงทะเบียน</th>
                                  <th class="py-2 px-4">รหัสพนักงาน</th>
                                  <th class="py-2 px-4">วันที่ลงทะเบียน</th>
                                  <th class="py-2 px-4">เวลาที่ลงทะเบียน</th>
                                  <th class="py-2 px-4">ลงทะเบียนโดย</th>
                                  <th class="py-2 px-4">หมายเหตุ</th>
                              </tr>
                          </thead>
                          <tbody>
                              ${tableRows}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
    `;

    // แทรกข้อมูลตารางเข้าไปใน div
    document.getElementById('tableData').innerHTML = tableHTML;
  } else {
    document.getElementById('tableData').innerHTML = '<p class="text-red-500">ไม่พบข้อมูลการลงทะเบียนของพนักงาน</p>';
  }
}

