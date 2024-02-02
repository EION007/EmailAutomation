// DisplayLogic.js
async function displayPartners(data, index = 0) {
  const { id, partner, tpt } = data[index];
  console.log(`PartnerTPT: Data ID: ${id}, Partner: ${partner}, TPT: ${tpt}`);
  // data.forEach(({ id, partner, tpt }) => {
  //   console.log(`ID: ${id}, Partner: ${partner}, TPT: ${tpt}`);
  // });
}

async function displayTenants(data, index = 0) {
  const {
    id,
    date,
    current_start_date,
    tpt,
    fulfilment_request,
    notification_email,
    overdue_email,
    third_follow,
    status,
  } = data[index];

  console.log(`Tracker Data:
    ID: ${id},
    Date: ${date},
    Current Start Date: ${current_start_date},
    TPT: ${tpt},
    Fulfilment Request: ${fulfilment_request},
    Notification Email: ${notification_email},
    Overdue Email: ${overdue_email},
    Third Follow: ${third_follow},
    Status: ${status}
  `);
}

module.exports = {
  displayPartners,
  displayTenants,
};
