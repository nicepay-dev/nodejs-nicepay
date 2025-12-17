"use strict";
const Helper = require("./../lib/helper");
const Snap = require("../lib/snap");

const cons = require("./sharedConfig");
//this is just for testing, better keep your private key on Key Management System when use cloud or on Server in file format.
const privateKeyString = cons.privateKey;

describe("helper.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able sign data with string private key", () => {
    let helper = new Helper();
    const signature = helper.getSignatureAccessToken(
      privateKeyString,
      `IONPAYTEST|2023-02-22T14:43:27+07:00`
    );
    expect(signature).toEqual(expect.any(String));
    console.log("Signature :" + signature);
    expect(signature).toBe(
      "X5TttEh3X4wOkp5zsoxptZHewaOQEXvCKdTFVS25h77kCj3njuTlFqG0mLqG9ytTG6mONf9xOXtE0t4hjjHyvnB5647Z/pM7kHwMcXZoxhldWG/IdSAk6iFmE6tGGVn0zrPY64Ck7sCS3XDUJkadZEY5Y2MFQmTYA6j9qn+4x4kqcQNtDxeyQLzfy/c9heW0pNSabOmXU7WdXjwyWGMpR3FCJsB+E+18k20yYpXBUdkJsbIFfSZoR45E6hmnmhmP6d0bQHz3rP9P3ouFU12MFcbxQreIlaMviUQIFAhA1SjQnD8TmHZGgRCmrxzXDKyPoEHCR+baAhzxOYRNRZg7+Q=="
    );
  });

  it("able generate hmac sha512 for payload", () => {
    let helper = new Helper();
    let requestBody = {
      merchantId: cons.merchantId,
      originalPartnerReferenceNo: "order1677048512514",
      originalReferenceNo: "IONPAYTEST07202302221348332909",
    };
    const encodePayload = helper.getEncodePayload(requestBody);
    expect(encodePayload).toEqual(expect.any(String));
    expect(encodePayload).toBe(
      "a657c5a49944032c4b066ca70d872a788c38a13528e2567f8ad952356b90e435"
    );
  });

  it("able create hash and signature base64", () => {
    let helper = new Helper();
    let stringToSign =
      "POST:/api/v1.0/transfer/registration:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJT05QQVlURVNUIiwiaXNzIjoiTklDRVBBWSIsIm5hbWUiOiJCQkJBIiwiZXhwIjoiMjAyMy0wMi0yMlQxMDo0MDowNloifQ==.nlrGKpV0lvwmUDTC94Y5KGnrACV1zdfSx7GrsrNruh8=:ec055a063eca97d1eb53e1ebc38cb8dfed4ce9f874b47c8214fb30250cfa9d44:2023-02-22T17:25:04+07:00";
    const signature = helper.getRegistSignature(
      stringToSign,
      cons.clientSecret
    );
    expect(signature).toEqual(expect.any(String));
    expect(signature).toBe(
      "i1cr9QK4IbAB4IK1DGmc60HxVqQMPNCQEDMeWIsJgXPOKP5VFjNDSTxWc7C72Yx7lD2+nCdO1dHChiVcIXcYIQ=="
    );
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
    let timeStamp = "20230220120000";
    const convertDate = helper.getConvertFormatedDate(timeStamp);
    expect(convertDate).toEqual(expect.any(String));
    expect(convertDate).toBe("2023-02-20T12:00:00+07:00");
  });

  it("is able to verify signature", async () => {
    let snap = new Snap();

    const signatureString =
      "X5TttEh3X4wOkp5zsoxptZHewaOQEXvCKdTFVS25h77kCj3njuTlFqG0mLqG9ytTG6mONf9xOXtE0t4hjjHyvnB5647Z/pM7kHwMcXZoxhldWG/IdSAk6iFmE6tGGVn0zrPY64Ck7sCS3XDUJkadZEY5Y2MFQmTYA6j9qn+4x4kqcQNtDxeyQLzfy/c9heW0pNSabOmXU7WdXjwyWGMpR3FCJsB+E+18k20yYpXBUdkJsbIFfSZoR45E6hmnmhmP6d0bQHz3rP9P3ouFU12MFcbxQreIlaMviUQIFAhA1SjQnD8TmHZGgRCmrxzXDKyPoEHCR+baAhzxOYRNRZg7+Q==";
    const dataString = "IONPAYTEST|2023-02-22T14:43:27+07:00";
    const publicKeyString = cons.publicKey; // string public key

    let isVerified = snap.helper.verifySHA256RSA(
      dataString,
      publicKeyString,
      signatureString
    );

    expect(isVerified).toBe(true);
  });
});
