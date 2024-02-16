const express = require("express");
const readline = require("readline");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const runApp = require("./src/service/service");
const { tenantData, inProTomData } = require("./src/controller/tenantData");
const {
  getOpenStatusData,
  getPartnerNames,
  getDataTPT,
} = require("./src/context/apiData");
const sendEmail = require("./src/service/email/SendEmail");
const {
  ExcelReader,
  analyzeDataPath,
} = require("./src/service/excel/ExcelConfig");
// Use CORS middleware
app.use(cors());
runApp();

app.get("/api/tenant/data", tenantData);
app.get("/api/tenant/inprogress/tomorrow", inProTomData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const getData = async () => {
//   try {
//     const statusData = await getOpenStatusData();
//     const data = await getPartnerNames(statusData);
//     await sendEmail(data);
//   } catch (error) {
//     console.log(error, "error");
//   }
// };
// getData();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayMenu = () => {
  console.log("1. Get and display open status data using API");
  console.log("2. Get partner names excel");
  console.log("3. Send email");
  console.log("4. Get Analyze Data from excel");
  console.log("5. Exit");
  rl.question("Select an option: ", async option => {
    switch (option) {
      case "1":
        try {
          const statusData = await getOpenStatusData();
          console.log("Open status data:", statusData);
        } catch (error) {
          console.log("Error fetching open status data:", error);
        }
        displayMenu();
        break;
      case "2":
        try {
          const statusData = await getOpenStatusData();
          const partnerNames = await getPartnerNames(statusData);
          console.log("Partner names:", partnerNames);
        } catch (error) {
          console.log("Error fetching partner names:", error);
        }
        displayMenu();
        break;
      case "3":
        try {
          const statusData = await getOpenStatusData();
          const data = await getPartnerNames(statusData);
          await sendEmail(data);
          console.log("Email sent successfully");
        } catch (error) {
          console.log("Error sending email:", error);
        }
        displayMenu();
        break;
      case "4":
        try {
          const statusData = await ExcelReader.analyzeData(analyzeDataPath);
          const data = await getDataTPT(statusData);
          await sendEmail(data);
          console.log(data);
        } catch (error) {
          console.log("Error sending email:", error);
        }
        displayMenu();
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("Invalid option. Please select again.");
        displayMenu();
        break;
    }
  });
};

displayMenu();
