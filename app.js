// app.js
const { excelFilePath, ExcelReader } = require("./components/ExcelConfig");
const { displayPartners } = require("./components/ExcelDisplay");

async function runApp() {
  try {
    const data = await ExcelReader.readExcel(excelFilePath);
    displayPartners(data);
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
  }
}

runApp();
