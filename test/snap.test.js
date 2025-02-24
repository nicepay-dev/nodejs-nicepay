"use strict";
const Snap = require("./../lib/snap.js");
const cons = require("./sharedConfig");

const config = {
  isProduction: false,
  privateKey: cons.privateKey,
  clientSecret: cons.clientSecret,
  clientId: cons.clientId,
  isCloudServer: true,
};

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
    CHANNEL_ID: cons.clientId,
  },
};

let paramCheckStatus = {
  body: {
    partnerServiceId: "",
    customerNo: "",
    virtualAccountNo: "",
    inquiryRequestId: "tXid202402111402271707638094",
    additionalInfo: {
      totalAmount: {
        value: "10000.00",
        currency: "IDR",
      },
      trxId: parameter.body.trxId,
      tXidVA: "",
    },
  },
  headers: {
    X_EXTERNAL_ID: Date.now() + "1",
    CHANNEL_ID: cons.clientId,
  },
};

let parameterDelete = {
  body: {
    partnerServiceId: "",
    customerNo: "",
    virtualAccountNo: "",
    trxId: parameter.body.trxId,
    additionalInfo: {
      totalAmount: {
        value: "10000.00",
        currency: "IDR",
      },
      tXidVA: "",
      cancelMessage: "Cancel Virtual Account",
    },
  },
  headers: {
    X_EXTERNAL_ID: "",
    CHANNEL_ID: cons.clientId,
  },
};

const tokenBody = { grantType: "client_credentials", additionalInfo: {} };
let accessToken;
let virtualAccountNo;
let tXidVA;

describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to request token", () => {
    let snap = new Snap(config);
    return snap.requestSnapAccessToken(tokenBody).then((res) => {
      expect(res.responseCode).toEqual(expect.any(String));
      expect(res.responseCode).toBe("2007300");
      expect(res.responseMessage).toEqual(expect.any(String));
      expect(res.responseMessage).toBe("Successful");
      accessToken = res.accessToken;
      console.log(res);
    });
  });

  it("able to request SNAP API", () => {
    let snap = new Snap(config);
    let endPoint = `/api/v1.0/transfer-va/create-va`;
    // console.log(parameter);
    return snap
      .requestSnapTransaction(parameter, endPoint, accessToken, "POST")
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2002700");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
        virtualAccountNo = res.virtualAccountData.virtualAccountNo;
        tXidVA = res.virtualAccountData.additionalInfo.tXidVA;
        // console.log(res);

        // expect(res.virtualAccountData.virtualAccountNo).toEqual(expect.any(String));
      });
  });

  it("able to check status va SNAP API", () => {
    let snap = new Snap(config);
    let endPoint = `/api/v1.0/transfer-va/status`;
    paramCheckStatus.body.virtualAccountNo = virtualAccountNo;
    paramCheckStatus.body.additionalInfo.tXidVA = tXidVA;
    // console.log(paramCheckStatus);
    return snap
      .requestSnapTransaction(paramCheckStatus, endPoint, accessToken, "POST")
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2002600");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
        // console.log(res);
        // expect(res.virtualAccountData.virtualAccountNo).toEqual(expect.any(String));
      });
  });

  it("able to delete VA SNAP API", () => {
    parameterDelete.headers.X_EXTERNAL_ID = Date.now();
    let endPoint = `/api/v1.0/transfer-va/delete-va`;
    let snap = new Snap(config);
    parameterDelete.body.virtualAccountNo = virtualAccountNo;
    parameterDelete.body.additionalInfo.tXidVA = tXidVA;
    return snap
      .requestSnapTransaction(parameterDelete, endPoint, accessToken, "DELETE")
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2003100");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
      });
  });
});
