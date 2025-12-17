"use strict";
const Config = require("./config");
const HttpRequest = require("./httpRequest");
const Helper = require("./helper");

class FirstApiVersion {
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
   * Do transaction API request to API Direct/Redirect V1 (Register, Inquiry, Cancel)
   * @param  {Object} parameter - object of body.
   * @param  {String} endPoint - endpoint API want to use.
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  requestAPI(parameter = {}, endPoint) {
    let amt = parameter.amt;
    let referenceNo = parameter.referenceNo;

    let stringToSign;

    stringToSign = `${this.apiConfig.clientId}${referenceNo}${amt}${this.apiConfig.merchantKey}`;

    if (endPoint === "/api/tokenize.do") {
      stringToSign = `${this.apiConfig.clientId}${parameter.cardNo}${parameter.cardExpYymm}${this.apiConfig.merchantKey}`;
    } else if (
      endPoint === "/api/checkToken.do" ||
      endPoint === "/api/removeToken.do"
    ) {
      stringToSign = `${this.apiConfig.clientId}${parameter.recurringToken}${this.apiConfig.merchantKey}`;
    } else if (endPoint === "/api/onePassAllCancel.do") {
      stringToSign = `${this.apiConfig.clientId}${parameter.tXid}${parameter.amt}${this.apiConfig.merchantKey}`;
    }

    let merchantToken = this.helper.generateMerchantToken(stringToSign);

    let requestBody = {
      ...parameter,
      merchantToken,
      iMid: this.apiConfig.clientId,
    };

    if (
      endPoint === "/api/onePassToken.do" ||
      endPoint === "/api/recurringToken.do"
    ) {
      requestBody = {
        jsonData: JSON.stringify(requestBody),
      };
    }

    let url = this.apiConfig.getSnapApiBaseUrl() + endPoint;

    let responsePromise = this.httpClient.requestForm(
      [],
      url,
      requestBody,
      "post"
    );

    return responsePromise;
  }

  /**
   * Generate payment URL for redirect API
   * @param {string} paymentUrl - URL payment from response API
   * @param {string} tXid - transaction ID from response API
   * @param {boolean} changeButton - true if want to display change button, false otherwise ; default true
   * @param {boolean} BackLink - true if want to display back link, false otherwise ; default true
   * @returns {string} - generated payment URL
   */
  generatePaymentUrl(
    $paymentUrl,
    $tXid,
    $changeButton = true,
    $BackLink = true
  ) {
    return (
      $paymentUrl +
      "?tXid=" +
      $tXid +
      "&optDisplayCB=" +
      ($changeButton ? "0" : "1") +
      "&optDisplayBL=" +
      ($BackLink ? "0" : "1")
    );
  }
}

module.exports = FirstApiVersion;
