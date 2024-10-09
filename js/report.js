
let currentPage = 1;
const rowsPerPage = 12;

async function fetchEmployeeData() {
  try {
    const response = await fetch('../connect/employeeData.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.status === 'success') {
      console.log('Data:', data.data);
      populateEmployeeTable(data.data);
    } else {
      console.error('Error fetching data:', data.message);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function populateEmployeeTable(employees) {
  const tableBody = document.getElementById('employee-table-body');
  const totalRows = employees.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);


  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;


  const currentEmployees = employees.slice(startIndex, endIndex);

  tableBody.innerHTML = '';
  currentEmployees.forEach((employee, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="py-2 px-4 border-b">${startIndex + index + 1}</td>
      <td class="py-2 px-4 border-b">${employee.fcucode}</td>
      <td class="py-2 px-4 border-b">${employee.emp_name}</td>
      <td class="py-2 px-4 border-b">${employee.emp_dev}</td>
      <td class="py-2 px-4 border-b">${employee.emp_fac}</td>
    `;
    tableBody.appendChild(row);
  });

  updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) {
  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;


  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchEmployeeData();
    }
  };

  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchEmployeeData();
    }
  };
}




function showTab(tabId, button) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.add('hidden');
  });


  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.remove('hidden');

    if (tabId === 'tab2') {
      fetchEmployeeData();
    }
  }


  const buttons = document.querySelectorAll('.tab-item');
  buttons.forEach(btn => {
    btn.classList.remove('active-tab');
  });
  button.classList.add('active-tab');
}


document.addEventListener('DOMContentLoaded', () => {
  showTab('tab1', document.querySelectorAll('.tab-item')[0]);
});

document.addEventListener('DOMContentLoaded', () => {
  fetchEmployeeData();
});

async function fetchEmployeeCount() {
  // console.log('Fetching employee count...');
  await fetch('../connect/countrest.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data);
      if (data.error) {
        console.error('Error:', data.error);
        document.getElementById('employee-invitation-count').innerHTML =
          `จำนวนพนักงานที่ได้รับบัตรเชิญ <span class="text-black-500">${data.error}</span>`;
        document.getElementById('employee-registered-count').innerHTML =
          `จำนวนพนักงานที่ลงทะเบียน <span class="text-black-500">${data.error}</span>`;
      } else {
        document.getElementById('employee-invitation-count').innerHTML =
          `จำนวนพนักงานที่ได้รับบัตรเชิญ <span class="text-green-500">${data.invitationCount}</span>`;
        document.getElementById('employee-registered-count').innerHTML =
          `จำนวนพนักงานที่ลงทะเบียน <span class="text-red-500">${data.registeredCount}</span>`;

      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      document.getElementById('employee-invitation-count').innerHTML =
        `จำนวนพนักงานที่ได้รับบัตรเชิญ <span class="text-black-500">[เกิดข้อผิดพลาดในการเชื่อมต่อ]</span>`;
      document.getElementById('employee-registered-count').innerHTML =
        `จำนวนพนักงานที่ลงทะเบียน <span class="text-black-500">[เกิดข้อผิดพลาดในการเชื่อมต่อ]</span>`;
    });
}


function showTab(tabId, button) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.add('hidden');
  });

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.remove('hidden');
  }

  const buttons = document.querySelectorAll('.tab-item');
  buttons.forEach(btn => {
    btn.classList.remove('active-tab');
  });
  button.classList.add('active-tab');
}

document.addEventListener('DOMContentLoaded', () => {
  showTab('tab1', document.querySelectorAll('.tab-item')[0]);
  fetchEmployeeCount();
});
