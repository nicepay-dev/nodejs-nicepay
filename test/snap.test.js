"use strict";
const Snap = require("./../lib/snap.js");
const cons = require("./sharedConfig");

const config = {
  isProduction: false,
  privateKey: cons.privateKey,
  clientSecret: cons.clientSecret,
  clientId: cons.clientId,
  isCloudServer: false,
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
      vacctValidDt:"20250516",
      vacctValidTm:"141830"
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
    virtualAccountNo: "7001400002011964",
    inquiryRequestId: "tXid202402111402271707638094",
    additionalInfo: {
      totalAmount: {
        value: "10000.00",
        currency: "IDR",
      },
      trxId: "order1747294537533",
      tXidVA: "TNICEVA02302202505151435390022",
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
    virtualAccountNo: "7001400002011988",
    trxId: "order1747379846806",
    additionalInfo: {
      totalAmount: {
        value: "10000.00",
        currency: "IDR",
      },
      tXidVA: "TNICEVA02302202505161417292010",
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
    });
  });

  it("able to request SNAP API", () => {
    let snap = new Snap(config);
    let endPoint = `/api/v1.0/transfer-va/create-va`;
    return snap
      .requestSnapTransaction(parameter, endPoint, accessToken, "POST")
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2002700");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
        virtualAccountNo = res.virtualAccountData.virtualAccountNo;
        tXidVA = res.virtualAccountData.additionalInfo.tXidVA;
      });
  });

  it("able to check status va SNAP API", () => {
    let snap = new Snap(config);
    let endPoint = `/api/v1.0/transfer-va/status`;
    paramCheckStatus.body.virtualAccountNo = virtualAccountNo;
    paramCheckStatus.body.additionalInfo.tXidVA = tXidVA;
    return snap
      .requestSnapTransaction(paramCheckStatus, endPoint, accessToken, "POST")
      .then((res) => {
        expect(res.responseCode).toEqual(expect.any(String));
        expect(res.responseCode).toBe("2002600");
        expect(res.responseMessage).toEqual(expect.any(String));
        expect(res.responseMessage).toBe("Successful");
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
      })
  });
});
