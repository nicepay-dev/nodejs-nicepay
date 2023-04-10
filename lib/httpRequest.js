"use strict";

const axios = require("axios").default;
const NicepayError = require("./nicepayError.js");
/**
 * Wrapper of Axios to do API request to Nicepay API
 * @return {Promise} of API response, or exception during request
 */
class HttpRequest {
  constructor() {
    this.http_client = axios.create();
  }
  /**
   * Wrapper of Axios to do API request to Nicepay API
   * @param headers - 
   * @param requestUrl - 
   * @param requestBody - 
   * @return {Promise} of API response, or exception during request
   */
  request(headers, requestUrl, requestBody) {
    let thisInstance = this;

    return new Promise(function (resolve, reject) {
      // Reject if param is not JSON
      if (typeof requestBody === "string" || requestBody instanceof String) {
        try {
          requestBody = JSON.parse(requestBody);
        } catch (err) {
          reject(
            new NicepayError(
              `fail to parse 'body parameters' string as JSON. Use JSON string or Object as 'body parameters'. with message: ${err}`
            )
          );
        }
      }
      
      thisInstance
        .http_client({
          method: "post",
          headers: headers,
          url: requestUrl,
          data: requestBody,
        })
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          let res = err.response;
          if (err.code === "ECONNABORTED") {
            return thisInstance.http_client({
              method: "post",
              headers: headers,
              url: requestUrl,
              data: requestBody,
            });
          } else {
            if (typeof res === "undefined") {
              reject(err);
            } else {
              reject(res);
            }
          }
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          let res = error.response;
          if (typeof res === "undefined") {
            reject(error);
          } else {
            reject(res);
          }
        });
    });
  }
}

module.exports = HttpRequest;
