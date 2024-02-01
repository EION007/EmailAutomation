// DisplayLogic.js
async function displayPartners(data) {
  data.forEach(({ id, partner, tpt }) => {
    console.log(`ID: ${id}, Partner: ${partner}, TPT: ${tpt}`);
  });
}

module.exports = {
  displayPartners,
};
