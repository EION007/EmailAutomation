// app.js
const {
  ExcelReader,
  partnerExcelPath,
  tenantExcelPath,
} = require("./src/service/excel/ExcelConfig");

const {
  displayPartners,
  displayTenants,
} = require("./src/service/excel/ExcelDisplay");
const { getAllTenantsData, getOpenStatusData } = require("./src/API/apiData");

async function runApp() {
  try {
    const data = await getAllTenantsData();
    // console.log("All Data:", data[0]);
    // console.log("Fetched Data:", data);

    const openStatus = await getOpenStatusData();
    console.log("open status data :", openStatus);

    const partnerData = await ExcelReader.readPartnerTPT(partnerExcelPath);
    // displayPartners(partnerData);

    const tenantData = await ExcelReader.readTracker(tenantExcelPath);
    // displayTenants(tenantData);
  } catch (error) {
    console.error("Error in running the application", error.message);
  }
}

runApp();
