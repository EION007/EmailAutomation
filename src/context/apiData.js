const axios = require("axios");

const REST_API_BASE_URL = "http://localhost:3001/data";

const getAllTenantsData = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error in getting data: ${error.message}`);
  }
};

const getOpenStatusData = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}?status=inprogress`);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const openTenants = response.data.filter(
      ({ status, service_start_date }) => {
        const startDate = new Date(
          service_start_date.split("-").reverse().join("-")
        );
        startDate.setHours(0, 0, 0, 0);

        return (
          status === "inprogress" && startDate.getTime() === tomorrow.getTime()
        );
      }
    );

    return openTenants;
  } catch (error) {
    throw new Error(`Error fetching open tenants data: ${error.message}`);
  }
};

module.exports = {
  getAllTenantsData,
  getOpenStatusData,
};
