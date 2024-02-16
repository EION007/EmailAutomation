const nodemailer = require("nodemailer");

const sendEmail = async data => {
  let testAccount = await nodemailer.createTestAccount();
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   // port: 587,
  //   auth: {
  //     user: "rolvinjm@gmail.com",
  //     pass: "qekg hqlt bcdq upck",
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "penelope.koepp31@ethereal.email",
      pass: "8acVCVagHfHDRkk9Et",
    },
  });
  const columnNames = {
    "Customer Name": "customer_name",
    "Cloud Full Req": "cloud_full_req",
    "Tenant ID": "tenant_id",
    "Entitlement Set": "entitlement_set",
    "Service Start Date": "service_start_date",
    "License Code": "license_code",
    "License Description": "license_desc",
    "Partner Name": "partner_name",
  };

  // Group data by email address
  const groupedData = {};
  data.forEach(dataset => {
    if (!groupedData[dataset.email]) {
      groupedData[dataset.email] = [];
    }
    groupedData[dataset.email].push(dataset);
  });

  // Send email to each unique email address
  for (const [email, datasets] of Object.entries(groupedData)) {
    let htmlContent = `
      <h2>Data Tables</h2>
      <style>
        table {
          border-collapse: collapse;
          width: 50%;
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

    datasets.forEach(dataset => {
      htmlContent += `<table>`;

      for (const [columnName, key] of Object.entries(columnNames)) {
        htmlContent += `<tr>
          <td>${columnName}</td>
          <td>${dataset[key]}</td>
        </tr>`;
      }

      htmlContent += `</table><br>`;
    });

    htmlContent += `
      <p>Please contact your SAP alliance team in case of question</p>
      <p><strong>Best regards</strong><br>
      <strong>Central Monitoring Team - SK</strong></p>
    `;

    const frNo = 280980712;
    let info = await transporter.sendMail({
      from: "Rolvin  <rolvinjm@gmail.com>",
      to: email,
      subject: `Notice: Unconfirmed Cloud Fulfillment Request ${frNo}`,
      html: htmlContent,
      // Set the email as draft instead of sending it immediately
      //  draft: true,
    });

    console.log("Email sent to:", email);
  }
};

module.exports = sendEmail;
