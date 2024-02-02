const ExcelJS = require("exceljs");
const path = require("path");

const updateExcelFile = async data => {
  try {
    // Specify the path to your Excel file
    const excelFilePath = path.join(
      __dirname,
      "../../../public/Data/tracker - Copy.xlsx"
    );

    // Load the existing workbook
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    // Assuming the data is in the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Update the worksheet with the provided data
    data.forEach(item => {
      const currentDate = new Date().toLocaleDateString();

      // Append a new row with the provided data
      worksheet.addRow([
        item.id,
        currentDate, // date
        item.service_start_date, // current_start_date
        item.tpt, // tpt
        "", // Replace with the actual value for 'no_fr'
        item.fr_request, // fulfilment_request
        "", // Replace with the actual value for 'notification_email'
        "", // Replace with the actual value for 'overdue_email'
        "", // Replace with the actual value for 'third_follow'
        "", // Replace with the actual value for 'scription'
        item.status, // status
      ]);
    });

    // Commit the workbook changes
    await workbook.xlsx.writeBuffer();

    // Save the workbook
    await workbook.xlsx.writeFile(excelFilePath);
  } catch (error) {
    console.error("Error updating Excel file:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

module.exports = { updateExcelFile };
