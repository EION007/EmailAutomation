const ExcelJS = require("exceljs");

// Function to read data from Excel file with the first column structure
async function readPartnerTPT(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      // Skip the header row
      const rowData = {
        id: row.getCell(1).value,
        partner: row.getCell(2).value,
        tpt: row.getCell(3).value,
        current_partner_recipient: row.getCell(4).value,
        partner_delivery_manager: row.getCell(5).value,
        business_dev: row.getCell(6).value,
      };

      data.push(rowData);
    }
  });

  return data;
}

// Function to read data from Excel file with the second column structure
async function readTracker(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      // Skip the header row
      const rowData = {
        id: row.getCell(1).value,
        date: row.getCell(2).value,
        current_start_date: row.getCell(3).value,
        tpt: row.getCell(4).value,
        no_fr: row.getCell(5).value,
        fulfilment_request: row.getCell(6).value,
        notification_email: row.getCell(7).value,
        overdue_email: row.getCell(8).value,
        third_follow: row.getCell(9).value,
        scription: row.getCell(10).value,
        status: row.getCell(11).value,
      };

      data.push(rowData);
    }
  });

  return data;
}

async function analyzeData(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet

  const data = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      // Skip the header row
      const rowData = {
        id: row.getCell(1).value,
        customer_name: row.getCell(2).value,
        cloud_full_req: row.getCell(3).value,
        tenant_id: row.getCell(4).value,
        entitlement_set: row.getCell(5).value,
        service_start_date: formatDate(row.getCell(6).value), // Format the date
        license_code: row.getCell(7).value,
        license_desc: row.getCell(8).value,
        partner_name: row.getCell(9).value,
        status: row.getCell(10).value,
        fr_request: row.getCell(11).value,
        tpt: row.getCell(12).value,
      };

      data.push(rowData);
    }
  });
  // console.log(data);
  return data;
}
function formatDate(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}-${month}-${year}`;
}
module.exports = {
  readPartnerTPT,
  readTracker,
  analyzeData,
};
