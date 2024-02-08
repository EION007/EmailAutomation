const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const runApp = require("./src/service/service");
const { tenantData, inProTomData } = require("./src/controller/tenantData");
const { getOpenStatusData } = require("./src/context/apiData");
const sendEmail = require("./src/service/email/SendEmail");
// Use CORS middleware
app.use(cors());
runApp();

app.get("/api/tenant/data", tenantData);
app.get("/api/tenant/inprogress/tomorrow", inProTomData);

const getData = async () => {
  try {
    const data = await getOpenStatusData();
    const emailResult = await sendEmail(data);
    // console.log(data);
    console.log(emailResult);
  } catch (error) {
    console.log(error, "error");
  }
};
getData();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
