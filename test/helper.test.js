"use strict";
const Helper = require("./../lib/helper");
const cons = require("./sharedConfig");
//this is just for testing, better keep your private key on Key Management System when use cloud or on Server in file format. 
const privateKeyString = `-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAInJe1G22R2fMchIE6BjtYRqyMj6lurP/zq6vy79WaiGKt0Fxs4q3Ab4ifmOXd97ynS5f0JRfIqakXDcV/e2rx9bFdsS2HORY7o5At7D5E3tkyNM9smI/7dk8d3O0fyeZyrmPMySghzgkR3oMEDW1TCD5q63Hh/oq0LKZ/4Jjcb9AgMBAAECgYA4Boz2NPsjaE+9uFECrohoR2NNFVe4Msr8/mIuoSWLuMJFDMxBmHvO+dBggNr6vEMeIy7zsF6LnT32PiImv0mFRY5fRD5iLAAlIdh8ux9NXDIHgyera/PW4nyMaz2uC67MRm7uhCTKfDAJK7LXqrNVDlIBFdweH5uzmrPBn77foQJBAMPCnCzR9vIfqbk7gQaA0hVnXL3qBQPMmHaeIk0BMAfXTVq37PUfryo+80XXgEP1mN/e7f10GDUPFiVw6Wfwz38CQQC0L+xoxraftGnwFcVN1cK/MwqGS+DYNXnddo7Hu3+RShUjCz5E5NzVWH5yHu0E0Zt3sdYD2t7u7HSr9wn96OeDAkEApzB6eb0JD1kDd3PeilNTGXyhtIE9rzT5sbT0zpeJEelL44LaGa/pxkblNm0K2v/ShMC8uY6Bbi9oVqnMbj04uQJAJDIgTmfkla5bPZRR/zG6nkf1jEa/0w7i/R7szaiXlqsIFfMTPimvRtgxBmG6ASbOETxTHpEgCWTMhyLoCe54WwJATmPDSXk4APUQNvX5rr5OSfGWEOo67cKBvp5Wst+tpvc6AbIJeiRFlKF4fXYTb6HtiuulgwQNePuvlzlt2Q8hqQ==
-----END PRIVATE KEY-----`;

describe("helper.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able sign data with string rivate key", () => {
    let helper = new Helper();
    const signature = helper.getSignatureAccessToken(privateKeyString, `IONPAYTEST|2023-02-22T14:43:27+07:00`)
    expect(signature).toEqual(expect.any(String));
    expect(signature).toBe("H0SI/1ArKnqoNdKeeO0KD+3RVuhoE7/xvQ6uBWksAqf033vAIQIrXIjVRfCEqSHzSWjRkUYeaYhJ12YEQvG3zjaF6jQZEYEdTeFSw/RTEdwXCnjfZMN+MyTEPoB3UE51dVAMRFUSwhVEHirn/ucND2OKiPCj7qy7CQa8DWNq3/M=");
  });

  it("able generate hmac sha512 for payload", () => {
    let helper = new Helper();
    let requestBody = {
        merchantId: 'IONPAYTEST',
        originalPartnerReferenceNo: 'order1677048512514',
        originalReferenceNo: 'IONPAYTEST07202302221348332909'
      }
    const encodePayload = helper.getEncodePayload(requestBody)
    expect(encodePayload).toEqual(expect.any(String));
    expect(encodePayload).toBe("14cfc0aa062edc5154e97839b97840208a20c4d25a1fc2d3dc5e4053c39d091a");
  });

  it("able create hash and signature base64", () => {
    let helper = new Helper();
    let stringToSign = 'POST:/api/v1.0/transfer/registration:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJT05QQVlURVNUIiwiaXNzIjoiTklDRVBBWSIsIm5hbWUiOiJCQkJBIiwiZXhwIjoiMjAyMy0wMi0yMlQxMDo0MDowNloifQ==.nlrGKpV0lvwmUDTC94Y5KGnrACV1zdfSx7GrsrNruh8=:ec055a063eca97d1eb53e1ebc38cb8dfed4ce9f874b47c8214fb30250cfa9d44:2023-02-22T17:25:04+07:00'
    const signature = helper.getRegistSignature(stringToSign, cons.clientSecret)
    expect(signature).toEqual(expect.any(String));
    expect(signature).toBe("i1cr9QK4IbAB4IK1DGmc60HxVqQMPNCQEDMeWIsJgXPOKP5VFjNDSTxWc7C72Yx7lD2+nCdO1dHChiVcIXcYIQ==");
  });

  it("able to get time now with snap format", () => {
    let helper = new Helper();
    const formattedDate = helper.getFormattedDate();
    const date = new Date();
    const snapFormat =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      "T" +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0") +
      "+07:00";
    expect(formattedDate).toEqual(expect.any(String));
    expect(formattedDate).toBe(snapFormat);
  });

  it("able create hash and signature base64", () => {
    let helper = new Helper();
    let timeStamp = '20230220120000';
    const convertDate = helper.getConvertFormatedDate(timeStamp)
    expect(convertDate).toEqual(expect.any(String));
    expect(convertDate).toBe("2023-02-20T12:00:00+07:00");
  });
});