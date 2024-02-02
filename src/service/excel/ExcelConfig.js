// ExcelConfig.js
const path = require("path");
const ExcelReader = require("./ExcelReader");

// Specify the path to your Excel file
const partnerExcelPath = path.join(
  __dirname,
  "../../../public/Data/partnerTPT.xlsx"
);

const tenantExcelPath = path.join(
  __dirname,
  "../../../public/Data/tracker.xlsx"
);

module.exports = {
  partnerExcelPath,
  tenantExcelPath,
  ExcelReader,
};
