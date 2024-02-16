const axios = require("axios");
const {
  ExcelReader,
  partnerExcelPath,
} = require("../service/excel/ExcelConfig");

const REST_API_BASE_URL = "http://localhost:3001/data";

const getAllTenantsData = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error in getting data: ${error.message}`);
  }
};

const getPartnerNames = async statusData => {
  try {
    const partnerNameExcel = await ExcelReader.readPartnerTPT(partnerExcelPath);

    const partnerNamesAndEmails = partnerNameExcel.map(item => ({
      partner: item.partner,
      name: item.name,
      email: item.current_partner_recipient,
    }));

    const matchingPartners = statusData.map(item => {
      const partnerInfo = partnerNamesAndEmails.find(
        partner => partner.partner === item.partner_name
      );
      if (partnerInfo) {
        return {
          ...item,
          name: partnerInfo.partner,
          email: partnerInfo.email,
        };
      } else {
        return item; // If no matching partner found, return the original data item
      }
    });
    return matchingPartners;
  } catch (error) {
    // Handle errors gracefully
    console.error("An error occurred while retrieving partner names:", error);
    throw error; // Rethrow the error for the caller to handle or catch
  }
};

const getDataTPT = async statusData => {
  try {
    const partnerNameExcel = await ExcelReader.readPartnerTPT(partnerExcelPath);

    const partnerNamesAndEmails = partnerNameExcel.map(item => ({
      tpt: item.tpt,
      email: item.current_partner_recipient,
    }));

    const matchingPartners = statusData.map(item => {
      const partnerInfo = partnerNamesAndEmails.find(
        partner => partner.tpt === item.tpt
      );
      if (partnerInfo) {
        return {
          ...item,
          email: partnerInfo.email,
        };
      } else {
        return item; // If no matching partner found, return the original data item
      }
    });
    return matchingPartners;
  } catch (error) {
    // Handle errors gracefully
    console.error("An error occurred while retrieving partner names:", error);
    throw error; // Rethrow the error for the caller to handle or catch
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
  getPartnerNames,
  getDataTPT,
};
