"use strict";
const Snap = require("./../lib/snap.js");
const cons = require("./sharedConfig");

const config = {
    isProduction: false,
    privateKey: cons.privateKey,
    clientSecret: cons.clientSecret,
    clientId: cons.clientId,
}
const parameter = {
    body: {
      partnerServiceId: "",
      customerNo: "",
      virtualAccountNo: "",
      virtualAccountName: "NodeJS Test",
      trxId: "order" + new Date().getTime(),
      totalAmount: {
        value: "10000.00",
        currency: "IDR",
      },
      additionalInfo: {
        bankCd: "BMRI",
        goodsNm: "Test",
        dbProcessUrl: "https://nicepay.co.id/",
      },
    },
    headers: {
      X_EXTERNAL_ID: Date.now(),
      CHANNEL_ID: "IONPAYTEST01",
    },
}
let endPoint = `/api/v1.0/transfer-va/create-va`;
const tokenBody = { grantType: "client_credentials", additionalInfo: {} }
let accessToken
describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to request token",  () => {
      let snap = new Snap(config);
      return snap.requestSnapAccessToken(tokenBody)
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2007300");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
        accessToken = res.accessToken
      })
  });

  it("able to request SNAP API", () => {
    let snap = new Snap(config);
      return snap.requestSnapTransaction(parameter, endPoint, accessToken)
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2002700");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
        // expect(res.virtualAccountData.virtualAccountNo).toEqual(expect.any(String));
      })
  });

//   it("", () => {
    
//   });

});

