"use strict";
const Config = require("./config");
const HttpRequest = require("./httpRequest");
const Helper = require("./helper");

/**
 * Snap object used to do request to Nicepay SNAP API
 */
class SecondApiVersion {
  constructor(
    options = {
      isProduction: false,
      privateKey: "",
      clientSecret: "",
      clientId: "",
      isCloudServer: false,
      merchantKey: "",
    }
  ) {
    this.apiConfig = new Config(options);
    this.httpClient = new HttpRequest();
    this.helper = new Helper();
  }

  /**
   * Do transaction API request to API Direct/Redirect V2 (Register, Inquiry, Cancel)
   * @param  {Object} parameter - object of body and headers, body for Core API JSON body and headers for Core API JSON headers.
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  requestAPI(parameter = {}, endPoint) {
    let timeStamp = this.helper.getTimestampOldFormat();
    let amt = parameter.amt;
    let referenceNo = parameter.referenceNo;

    let merchantToken = this.helper.generateMerchantToken(
      timeStamp,
      this.apiConfig.clientId,
      referenceNo,
      amt,
      this.apiConfig.merchantKey
    );

    let requestBody = {
      ...parameter,
      merchantToken,
      timeStamp,
      iMid: this.apiConfig.clientId,
    };

    let url = this.apiConfig.getSnapApiBaseUrl() + endPoint;
    let headers = {
      "Content-Type": "application/json",
    };

    let responsePromise = this.httpClient.request(
      headers,
      url,
      requestBody,
      "post"
    );

    return responsePromise;
  }

  /**
   * DDo transaction API request to API Direct (Payment)
   * @param  {Object} parameter - object of Core API JSON body as parameter, if string will be converted to JSON.
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  requestPayment(parameter = {}) {
    let timeStamp = this.helper.getTimestampOldFormat();
    let amt = parameter.amt;
    let referenceNo = parameter.referenceNo;

    let merchantToken = this.helper.generateMerchantToken(
      timeStamp,
      this.apiConfig.clientId,
      referenceNo,
      amt,
      this.apiConfig.merchantKey
    );

    let requestBody = {
      timeStamp: timeStamp,
      tXid: parameter.tXid,
      callBackUrl: parameter.callBackUrl,
      merchantToken,
      cardNo: parameter.cardNo,
      cardExpYymm: parameter.cardExpYymm,
      cardCvv: parameter.cardCvv,
      recurringToken: parameter.recurringToken,
      cardHolderNm: parameter.cardHolderNm,
      preauthToken: parameter.preauthToken,
      cardHolderEmail: parameter.cardHolderEmail,
    };

    let url = this.apiConfig.getSnapApiBaseUrl() + `/direct/v2/payment`;

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let responsePromise = this.httpClient.request(
      headers,
      url,
      requestBody,
      "post"
    );

    return responsePromise;
  }
}

module.exports = SecondApiVersion;
