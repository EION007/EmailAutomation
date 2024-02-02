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
    const response = await axios.get(`${REST_API_BASE_URL}?status=open`);
    return response.data;
  } catch (error) {
    throw new Error(`Error in getting open tenants data: ${error.message}`);
  }
};

module.exports = {
  getAllTenantsData,
  getOpenStatusData,
};
