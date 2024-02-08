const { getAllTenantsData, getOpenStatusData } = require("../context/apiData");

const tenantData = async (req, res) => {
  try {
    const data = await getAllTenantsData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const inProTomData = async (req, res) => {
  try {
    const data = await getOpenStatusData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  tenantData,
  inProTomData,
};
