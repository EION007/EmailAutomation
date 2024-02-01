// ExcelConfig.js
const path = require("path");
const ExcelReader = require("./ExcelReader");

// Specify the path to your Excel file
const excelFilePath = path.join(__dirname, "../Data/partnerTPT.xlsx");

module.exports = {
  excelFilePath,
  ExcelReader,
};
