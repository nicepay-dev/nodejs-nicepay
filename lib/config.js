"use strict";

const _ = require("lodash");
/**
 *  Config Object that used to store isProduction, serverKey, clientId, clientSecret.
 *  And also API base urls.
 */
class Config {
  /**
   * Initiate with options
   * @param  {Object} options - should have these props:
   * privateKey, clientSecret, isProduction, clientId
   */
  constructor(
    options = {
      isProduction: false,
      privateKey: "",
      clientId: "",
      clientSecret: "",
      isCloudServer: false,
      merchantKey: "",
    }
  ) {
    this.isProduction = false;
    this.privateKey = "";
    this.clientSecret = "";
    this.clientId = "";
    this.isCloudServer = false;
    this.merchantKey = "";

    this.setConfiguration(options);
  }
  /**
   * Return config stored
   * @return {Object} object contains isProduction, privateKey, clientId, clientSecret
   */
  getConfiguration() {
    let currentConfig = {
      isProduction: this.isProduction,
      privateKey: this.privateKey,
      clientSecret: this.clientSecret,
      clientId: this.clientId,
      isCloudServer: this.isCloudServer,
      merchantKey: this.merchantKey,
    };
    return currentConfig;
  }
  /**
   * Set config stored
   * @param {Object} options - object contains isProduction, serverKey, clientId]
   */
  setConfiguration(options) {
    let currentConfig = {
      isProduction: this.isProduction,
      privateKey: this.privateKey,
      clientSecret: this.clientSecret,
      clientId: this.clientId,
      isCloudServer: this.isCloudServer,
      merchantKey: this.merchantKey,
    };
    const parsedOptions = _.pick(options, [
      "isProduction",
      "privateKey",
      "clientSecret",
      "clientId",
      "isCloudServer",
      "merchantKey",
    ]);
    let mergedConfig = _.merge({}, currentConfig, parsedOptions);

    this.isProduction = mergedConfig.isProduction;
    this.privateKey = mergedConfig.privateKey;
    this.clientId = mergedConfig.clientId;
    this.clientSecret = mergedConfig.clientSecret;
    this.isCloudServer = mergedConfig.isCloudServer;
    this.merchantKey = mergedConfig.merchantKey;
  }

  /**
   * @return {String} snap api base url
   */
  getSnapApiBaseUrl() {
    if (this.isCloudServer) {
      return this.isProduction
        ? Config.SNAP_PROD_CLOUD_BASE_URL
        : Config.SNAP_DEV_CLOUD_BASE_URL;
    } else {
      return this.isProduction
        ? Config.SNAP_PROD_BASE_URL
        : Config.SNAP_DEV_BASE_URL;
    }
  }
}

// Static vars
Config.SNAP_DEV_BASE_URL = "https://dev.nicepay.co.id/nicepay";
Config.SNAP_PROD_BASE_URL = "https://www.nicepay.co.id/nicepay";
Config.SNAP_DEV_CLOUD_BASE_URL = "https://dev-services.nicepay.co.id/nicepay";
Config.SNAP_PROD_CLOUD_BASE_URL = "https://services.nicepay.co.id/nicepay";

module.exports = Config;
