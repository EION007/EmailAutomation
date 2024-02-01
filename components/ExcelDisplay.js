// DisplayLogic.js
async function displayPartners(data, index = 0) {
  const { id, partner, tpt } = data[index];
  console.log(`ID: ${id}, Partner: ${partner}, TPT: ${tpt}`);
  // data.forEach(({ id, partner, tpt }) => {
  //   console.log(`ID: ${id}, Partner: ${partner}, TPT: ${tpt}`);
  // });
}

module.exports = {
  displayPartners,
};
