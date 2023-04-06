"use strict";
const Config = require("./../lib/config");
const cons = require("./sharedConfig");

describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to store config", () => {
    let configObj = new Config(generateConfig());
    expect(configObj.getConfiguration().isProduction).toBe(false);
    expect(configObj.getConfiguration().privateKey).toEqual(expect.any(String));
    expect(configObj.getConfiguration().clientId).toEqual(expect.any(String));
    expect(configObj.getConfiguration().clientSecret).toEqual(expect.any(String));
    expect(configObj.getConfiguration().privateKey).toBe(cons.privateKey);
    expect(configObj.getConfiguration().clientId).toBe(cons.clientId);
    expect(configObj.getConfiguration().clientSecret).toBe(cons.clientSecret);
  });

  it("able to set config", () => {
    let configObj = new Config();
    configObj.setConfiguration(generateConfig() );
    expect(configObj.getConfiguration().isProduction).toBe(false);
    expect(configObj.getConfiguration().privateKey).toEqual(expect.any(String));
    expect(configObj.getConfiguration().clientId).toEqual(expect.any(String));
    expect(configObj.getConfiguration().clientSecret).toEqual(expect.any(String));
    expect(configObj.getConfiguration().privateKey).toBe(cons.privateKey);
    expect(configObj.getConfiguration().clientId).toBe(cons.clientId);
    expect(configObj.getConfiguration().clientSecret).toBe(cons.clientSecret);
  });

  it("able to get correct API url environtment for Snap", () => {
    let configObj = new Config();
    configObj.setConfiguration({ isProduction: false });
    expect(configObj.getSnapApiBaseUrl()).toBe(cons.SNAP_DEV_BASE_URL);
    configObj.setConfiguration({ isProduction: true });
    expect(configObj.getSnapApiBaseUrl()).toBe(cons.SNAP_PROD_BASE_URL);
  });
});

function generateConfig() {
  return {
    isProduction: false,
    privateKey: cons.privateKey,
    clientSecret: cons.clientSecret,
    clientId: cons.clientId,
  };
}
