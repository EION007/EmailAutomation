const {
  ExcelReader,
  partnerExcelPath,
  tenantExcelPath,
} = require("./excel/ExcelConfig");

const { displayPartners, displayTenants } = require("./excel/ExcelDisplay");
const { getAllTenantsData, getOpenStatusData } = require("../context/apiData");
const { updateExcelFile } = require("./excel/ExcelUpdate");
const sendEmail = require("./email/SendEmail");
async function runApp() {
  try {
    const data = await getAllTenantsData();
    // console.log("All Data:", data[0]);
    // console.log("Fetched Data:", data);

    const openStatus = await getOpenStatusData();
    // console.log("open status data :", openStatus);

    // updateExcelFile(openStatus);

    const partnerData = await ExcelReader.readPartnerTPT(partnerExcelPath);
    // displayPartners(partnerData);

    const tenantData = await ExcelReader.readTracker(tenantExcelPath);
    // displayTenants(tenantData);

    // const result = await sendEmail(openStatus);
    // console.log(openStatus);
    // console.log("email sent successfully ", result);
  } catch (error) {
    console.error("Error in running the application", error.message);
  }
}

module.exports = runApp;
