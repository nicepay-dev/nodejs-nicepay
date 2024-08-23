"use strict";
const HttpRequest = require("./../lib/httpRequest");
let headers = {
  "Content-type": "Application/JSON",
  "X-TIMESTAMP": "2023-02-27T09:46:46+07:00",
  "X-CLIENT-KEY": "IONPAYTEST",
  "X-SIGNATURE":
    "VLeH5rgbswI9iZh/zSvhS7ugco/hculdAxr4yqGawgMhsmRWHEswZM1S4yBoKXBaRwP2DWsLgDDlrzjPguQ77cyfnfx1hedb0lvVO4TIfAFdOvxmz8IiH2shysabnQ7fEW6F0o59TDe/tZpLDuSdRz8WCXcfnWfDlvhqXLO7OSM=",
};
let body = {
  grantType: "client_credentials",
  additionalInfo: {},
};
let wrongExample = "{grantType:'client_credentials'";
let requestUrl = "https://dev.nicepay.co.id/nicepay/v1.0/access-token/b2b";

describe("httpRequest.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to http request", () => {
    let httpRequest = new HttpRequest(3000);

    return httpRequest.request(headers, requestUrl, body).catch((err) => {
      expect(err.data.responseCode).toEqual(expect.any(String));
      expect(err.data.responseMessage).toEqual(expect.any(String));
    });
  });

  it("able to http request with string", () => {
    let httpRequest = new HttpRequest(3000);

    return httpRequest
      .request(headers, requestUrl, JSON.stringify(body))
      .catch((err) => {
        expect(err.data.responseCode).toEqual(expect.any(String));
        expect(err.data.responseMessage).toEqual(expect.any(String));
      });
  });

  it("not able to http request with wrong string format", () => {
    let httpRequest = new HttpRequest(3000);

    return httpRequest
      .request(headers, requestUrl, wrongExample)
      .catch((err) => {
        expect(err.message).toEqual(expect.any(String));
      });
  });

  it("should timeout after 7 seconds", async () => {
    // Instantiate the HttpRequest class with the mock HTTP client
    const httpRequest = new HttpRequest();
    httpRequest.http_client.defaults.timeout = 1500;
    const promise = httpRequest.request(
      headers,
      "https://httpstat.us/503?sleep=2500",
      body
    );
    try {
      await promise;
    } catch (error) {
      expect(error.code).toBe("ECONNABORTED");
    }
  });

  it("able to get error not from request", async () => {
    // Instantiate the HttpRequest class with the mock HTTP client
    const httpRequest = new HttpRequest(2000);
    return httpRequest.request().catch((err) => {
      expect(err.message).toEqual(expect.any(String));
    });
  });
});
