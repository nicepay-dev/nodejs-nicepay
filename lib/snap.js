"use strict";
const Config = require("./config");
const HttpRequest = require("./httpRequest");
const Helper = require("./helper");

/**
 * Snap object used to do request to Nicepay SNAP API
 */
class Snap {
  constructor(
    options = {
      isProduction: false,  
      privateKey: "",
      clientSecret: "",
      clientId: "",
    }
  ) {
    this.apiConfig = new Config(options);
    this.httpClient = new HttpRequest();
    this.helper = new Helper();
  }

  /**
   * Do transaction API request to Snap API
   * @param  {Object} parameter - object of body and headers, body for Core API JSON body and headers for Core API JSON headers.
   * @param  {String} endPoint - endpoint of url used.
   * @param  {String} accessToken - valid access token from requestSnapAccessToken.
   * @param  {String} httpMethod - Http method used.
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  requestSnapTransaction(parameter = {}, endPoint, accessToken, httpMethod) {
    const formattedDate = this.helper.getFormattedDate();
    let url = this.apiConfig.getSnapApiBaseUrl() + endPoint;

    const hexPayload = this.helper.getEncodePayload(parameter.body);
    const stringToSign = `${httpMethod}:${endPoint}:${accessToken}:${hexPayload}:${formattedDate}`;
    const signature = this.helper.getRegistSignature(
      stringToSign,
      this.apiConfig.getConfiguration().clientSecret
    );
    let headers = {
      "Content-type": "Application/JSON",
      "X-TIMESTAMP": formattedDate,
      "X-SIGNATURE": signature,
      Authorization: `Bearer ${accessToken}`,
      "X-PARTNER-ID": this.apiConfig.getConfiguration().clientId,
      "X-EXTERNAL-ID": parameter.headers.X_EXTERNAL_ID,
      "CHANNEL-ID": parameter.headers.CHANNEL_ID,
    };

    let responsePromise = this.httpClient.request(headers, url, parameter.body, httpMethod);
    return responsePromise;
  }

  /**
   * Do refund transaction API request to Snap API
   * @param  {Object} parameter - object of Core API JSON body as parameter, if string will be converted to JSON.
   * @return {Promise} - Promise contains Object from JSON decoded response
   */
  requestSnapAccessToken(parameter = {}) {
    const formattedDate = this.helper.getFormattedDate();
    let url = this.apiConfig.getSnapApiBaseUrl() + "/v1.0/access-token/b2b";
    const stringToSign =
      this.apiConfig.getConfiguration().clientId + "|" + formattedDate;

    let signature = this.helper.getSignatureAccessToken(
      this.apiConfig.getConfiguration().privateKey,
      stringToSign
    );

    let headers = {
      "Content-type": "Application/JSON",
      "X-TIMESTAMP": formattedDate,
      "X-CLIENT-KEY": this.apiConfig.getConfiguration().clientId,
      "X-SIGNATURE": signature,
    };
    let responsePromise = this.httpClient.request(headers, url, parameter, "post");
    return responsePromise;
  }
}

module.exports = Snap;
