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
  // console.log(data);
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "maximo35@ethereal.email",
  //     pass: "NV6Pev2y5WTnSxZVAv",
  //   },
  // });

  // Construct HTML table using provided data
  let htmlContent = `
    <h2>Data Table</h2>
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
    }</style>
    <h6>Attention: PLEASE DO NOT REPLY TO THIS EMAIL</h6>
    <p> Dear SAP Solution Extension Partner,</p>
    <p>Please confirm delivery via SAP Resource of the following cloud fulfillment request</p>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Customer Name</th>
        <th>Cloud Full Req</th>
        <th>Tenant ID</th>
        <th>Entitlement Set</th>
        <th>Service Start Date</th>
        <th>License Code</th>
        <th>License Description</th>
        <th>Partner Name</th>
        <th>Status</th>
        <th>FR Request</th>
      </tr>
  `;
  // Append each data item as a row in the table
  data.forEach(item => {
    htmlContent += `
    <tr>
      <td>${item.id}</td>
      <td>${item.customer_name}</td>
      <td>${item.cloud_full_req}</td>
      <td>${item.tenant_id}</td>
      <td>${item.entitlement_set}</td>
      <td>${item.service_start_date}</td>
      <td>${item.license_code}</td>
      <td>${item.license_desc}</td>
      <td>${item.partner_name}</td>
      <td>${item.status}</td>
      <td>${item.fr_request}</td>
    </tr>
  `;
  });
  htmlContent += `</table>`;
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
