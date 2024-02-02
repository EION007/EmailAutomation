class ExcelRow {
  constructor(
    id,
    partner,
    tpt,
    currentPartnerRecipient,
    partnerDeliveryManager,
    businessDev
  ) {
    this.id = id;
    this.partner = partner;
    this.tpt = tpt;
    this.currentPartnerRecipient = currentPartnerRecipient;
    this.partnerDeliveryManager = partnerDeliveryManager;
    this.businessDev = businessDev;
  }
}

module.exports = ExcelRow;
