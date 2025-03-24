// === CSV Upload and Parsing ===
document.getElementById('csvFile').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      console.log("CSV Headers:", Object.keys(results.data[0])); // DEBUG
      populateDropdown(results.data);
    }
  });
});

// === Populate dropdown with products ===
function populateDropdown(data) {
  const select = document.getElementById('productSelect');
  select.innerHTML = '<option disabled selected>Select a product...</option>';

  data.forEach(product => {
    const code = product["Product Code"];
    const name = product["Product Name"];
    const option = document.createElement('option');
    option.value = code;
    option.textContent = `${code} - ${name}`;
    select.appendChild(option);
  });
}

// === Show form when a product is selected ===
const productSelect = document.getElementById('productSelect');
const formSection = document.getElementById('logisticFormSection');
const form = document.getElementById('logisticForm');
const completedSheets = [];

productSelect.addEventListener('change', function () {
  formSection.style.display = 'block';
});

// === Handle form submission ===
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const sheet = {
    productCode: productSelect.value,
    productName: productSelect.options[productSelect.selectedIndex].text.split(" - ")[1],
    unitsPerBox: formData.get('unitsPerBox'),
    unitsPerPallet: formData.get('unitsPerPallet'),
    boxLength: formData.get('boxLength'),
    boxWidth: formData.get('boxWidth'),
    boxHeight: formData.get('boxHeight'),
    grossWeightBox: formData.get('grossWeightBox'),
    netWeightBox: formData.get('netWeightBox'),
    palletLayers: formData.get('palletLayers'),
    palletHeight: formData.get('palletHeight')
  };

  completedSheets.push(sheet);
  alert('Logistic sheet created successfully!');
  form.reset();
  productSelect.selectedIndex = 0;
  formSection.style.display = 'none';
  updateTable();
});

// === Update table with completed sheets ===
const tableBody = document.querySelector('#logisticTable tbody');
const completedListSection = document.getElementById('completedListSection');
const exportBtn = document.getElementById('exportBtn');

function updateTable() {
  tableBody.innerHTML = '';
  completedSheets.forEach(sheet => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sheet.productCode}</td>
      <td>${sheet.productName}</td>
      <td>${sheet.unitsPerBox}</td>
      <td>${sheet.unitsPerPallet}</td>
      <td>${sheet.boxLength}×${sheet.boxWidth}×${sheet.boxHeight}</td>
      <td>${sheet.grossWeightBox}</td>
      <td>${sheet.netWeightBox}</td>
      <td>${sheet.palletLayers}</td>
      <td>${sheet.palletHeight}</td>
    `;
    tableBody.appendChild(row);
  });
  completedListSection.style.display = 'block';
}

// === Export CSV ===
exportBtn.addEventListener('click', function () {
  const csvRows = [];

  // Header
  csvRows.push([
    "Product Code", "Product Name", "Units/Box", "Units/Pallet",
    "Box Length (cm)", "Box Width (cm)", "Box Height (cm)",
    "Gross Weight (kg)", "Net Weight (kg)",
    "Pallet Layers", "Pallet Height (cm)"
  ].join(','));

  // Rows
  completedSheets.forEach(sheet => {
    csvRows.push([
      sheet.productCode,
      sheet.productName,
      sheet.unitsPerBox,
      sheet.unitsPerPallet,
      sheet.boxLength,
      sheet.boxWidth,
      sheet.boxHeight,
      sheet.grossWeightBox,
      sheet.netWeightBox,
      sheet.palletLayers,
      sheet.palletHeight
    ].join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const today = new Date().toISOString().split('T')[0];
  const filename = `logistic_sheet_${today}.csv`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
});

// === Avertizare la părăsirea paginii ===
window.addEventListener("beforeunload", function (e) {
  if (completedSheets.length > 0) {
    const message = "You have unsaved logistic sheets. Do you want to export them before leaving?";
    e.preventDefault(); // Pentru unele browsere
    e.returnValue = message; // Pentru majoritatea
    return message;
  }
});



  