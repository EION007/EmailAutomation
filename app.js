// app.js
const { excelFilePath, ExcelReader } = require("./components/ExcelConfig");
const { displayPartners } = require("./components/ExcelDisplay");
const { fetchData } = require("./API/tenantData");

async function runApp() {
  try {
    const tenantData = await ExcelReader.readExcel(excelFilePath);
    displayPartners(tenantData);
    // console.log("Fetched Data:", tenantData);
    console.log("Fetched Data:", tenantData[0]);

    const data = await fetchData("http://localhost:3001/data");
  } catch (error) {
    console.error("Error reading Excel file:", error.message);
  }
}

runApp();
