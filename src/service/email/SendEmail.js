const nodemailer = require("nodemailer");

const sendEmail = async data => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    auth: {
      user: "rolvinjm@gmail.com",
      pass: "qekg hqlt bcdq upck",
    },
  });
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "name.funk@ethereal.email",
  //     pass: "SARJfHqr8dhFvmbE8q",
  //   },
  // });

  let htmlContent = `
  <h2>Data Tables</h2>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
  <h4>Attention: PLEASE DO NOT REPLY TO THIS EMAIL</h4>
  <p>Dear SAP Solution Extension Partner,</p>
  <p>Please confirm delivery via SAP Resource of the following cloud fulfillment requests:</p>
`;

  // Iterate through the data and create a table for each row
  data.forEach(item => {
    htmlContent += `
    <table border="1">
      <tr>
        <th>Customer Name</th>
        <th>Cloud Full Req</th>
        <th>Tenant ID</th>
        <th>Entitlement Set</th>
        <th>Service Start Date</th>
        <th>License Code</th>
        <th>License Description</th>
        <th>Partner Name</th>
      </tr>
      <tr>
        <td>${item.customer_name}</td>
        <td>${item.cloud_full_req}</td>
        <td>${item.tenant_id}</td>
        <td>${item.entitlement_set}</td>
        <td>${item.service_start_date}</td>
        <td>${item.license_code}</td>
        <td>${item.license_desc}</td>
        <td>${item.partner_name}</td>
      </tr>
    </table>
    <br>
  `;
  });

  htmlContent += ` <p>Please contact your SAP alliance team in case of question</p>
  <p><strong>Best regards</strong><br>
  <strong>Central Monitoring Team - SK</strong></p>`;

  const frNo = 280980712;
  let info = await transporter.sendMail({
    from: "Rolvin  <rolvinjm@gmail.com>",
    to: "romonteiro@deloitte.com",
    subject: `Notice: Unconfirmed Cloud Fulfillment Request ${frNo}`,
    html: htmlContent,
  });

  return info;
};

module.exports = sendEmail;
