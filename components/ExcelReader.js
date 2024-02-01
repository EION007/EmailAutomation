const ExcelJS = require("exceljs");

// Function to read data from Excel file
async function readExcel(filePath) {
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

module.exports = {
  readExcel,
};
