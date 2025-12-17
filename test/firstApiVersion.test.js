"use strict";
const FirstApiVersion = require("../lib/firstApiVersion.js");
const EndpointUtils = require("../lib/endpointUtils.js");
const cons = require("./sharedConfig.js");

const config = {
  isProduction: false,
  privateKey: cons.privateKey,
  clientSecret: cons.clientSecret,
  clientId: cons.clientId,
  isCloudServer: false,
  merchantKey: cons.merchantKey,
};

const parameter = {
  payMethod: "02",
  currency: "IDR",
  amt: "10000",
  referenceNo: "ord12320250409170492",
  goodsNm: "Test Transaction Nicepay",
  billingNm: "Arya Widya",
  billingPhone: "082168349939",
  billingEmail: "aryawdy16@gmail.com",
  billingAddr: "Jalan Cempaka Putih Barat XI",
  billingCity: "Jakarta",
  billingState: "DKI Jakarta",
  billingPostCd: "10520",
  billingCountry: "Indonesia",
  description: "test cc",
  deliveryNm: "John Doe",
  deliveryPhone: "0851731575341",
  deliveryAddr: "Jalan Cempaka Putih Barat XI",
  deliveryCity: "Jakarta",
  deliveryState: "DKI Jakarta",
  deliveryPostCd: "10520",
  deliveryCountry: "Indonesia",
  dbProcessUrl:
    "https://httpdump.app/dumps/fa101255-f007-43f6-9ce2-b581c2b645a3",
  userIP: "127.0.0.1",
  cartData:
    '{"count":3,"item":[{"goods_id":30,"goods_name":"Beanie","goods_type":"Accessories","goods_amt":1000,"goods_sellers_id":"NICEPAY-NamaMerchant","goods_sellers_name":"NICEPAYSHOP","goods_quantity":1,"goods_url":"http://www.nicestore.com/product/beanie/"},{"goods_id":31,"goods_name":"Belt","goods_type":"Accessories","goods_amt":5000,"goods_sellers_id":"NICEPAY-NamaMerchant","goods_sellers_name":"NICEPAYSHOP","goods_quantity":1,"goods_url":"http://www.nicestore.store/product/belt/"},{"img_url":"http://www.jamgora.com/media/avatar/noimage.png","goods_name":"Shipping Fee","goods_id":"Shipping for Ref. No. 278","goods_detail":"Flat rate","goods_type":"Shipping with Flat rate","goods_amt":"4000","goods_sellers_id":"NICEPAY-NamaMerchant","goods_sellers_name":"NICEPAYSHOP","goods_quantity":"1","goods_url":"https://wwww.nicestore.store"}]}',
  sellers:
    '[{"sellersId":"NICEPAY-NamaMerchant","sellersNm":"NICEPAYSHOP","sellersUrl":"http://nicestore.store/product/beanie/","sellersEmail":"Nicepay@nicepay.co.id","sellersAddress":{"sellerNm":"NICEPAYSHOP","sellerLastNm":"NICEPAYSHOP","sellerAddr":"Jln. Kasablanka Kav 88","sellerCity":"Jakarta","sellerPostCd":"14350","sellerPhone":"082111111111","sellerCountry":"ID"}}]',
  bankCd: "CENA",
  userAgent: "Mozilla",
  mitraCd: "",
  instmntMon: "1",
  instmntType: "1",
  shopId: "",
};

let parameterRegistPayout = {
  msId: "",
  accountNo: "5345000060",
  benefNm: "PT IONPAY NETWORKS",
  benefStatus: "1",
  benefType: "1",
  bankCd: "BDIN",
  amt: "10000",
  referenceNo: "ORD12345",
  reservedDt: "",
  reservedTm: "",
  benefPhone: "082111111111",
  description: "This is test request",
  payoutMethod: "",
};

let parameterBalanceInquiry = {};

let parameterApproveBalance = {
  tXid: "IONPAYTEST07202505191401339529",
};
let parameterInquiryPayout = {
  tXid: "IONPAYTEST07202505191401339529",
  accountNo: "5345000060",
};
let parameterCancel = {
  tXid: "TNICEVA02302202505191431551086",
  payMethod: "02",
  amt: "10000",
  cancelType: "1",
  cancelMsg: "Testing Cancel Of Virtual Account",
  cancelUserId: "",
  cancelUserIp: "127.0.0.1",
  cancelServerIp: "127.0.0.1",
  cancelUserInfo: "",
  cancelRetryCnt: "",
  worker: "",
};

let registResponse = {};

let vaResponse = {};

let cardTokn = "";

let recurringToken = "";

let preauthToken = "";

describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to request Register API V1 Professional", () => {
    let firstVersion = new FirstApiVersion(config);
    parameter.callBackUrl =
      cons.SNAP_DEV_BASE_URL + "/IONPAY_CLIENT/paymentResult.jsp";
    return firstVersion
      .requestAPI(
        parameter,
        EndpointUtils.V1.PROFESSIONAL_REGISTRATION_ENDPOINT
      )
      .then((res) => {
        console.log("Response V1 Professional:");
        console.log(res);
        expect(res.data.resultCd).toEqual(expect.any(String));
        expect(res.data.resultCd).toBe("0000");
        expect(res.data.resultMsg).toEqual(expect.any(String));
        registResponse = res;
      });
  });

  it("able to generate payment url for V1 Professional", () => {
    let firstVersion = new FirstApiVersion(config);

    url = firstVersion.generatePaymentUrl(
      registResponse.data.requestURL,
      registResponse.data.tXid,
      false,
      true
    );

    console.log("URL : " + url);
    expect(url).toEqual(expect.any(String));
    expect(url).toMatch(/^http/);
  });

  it("able to request API V1 Enterprise Register  VA", () => {
    let firstVersion = new FirstApiVersion(config);

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_ONE_PASS)
      .then((res) => {
        console.log("Response Register VA:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
        expect(res.bankVacctNo).toEqual(expect.any(String));
        vaResponse = res;
      });
  });

  it("able to request API V1 Enterprise Register  CVS", () => {
    let firstVersion = new FirstApiVersion(config);
    parameter.payMethod = "03";
    parameter.mitraCd = "ALMA";

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_ONE_PASS)
      .then((res) => {
        console.log("Response Register CVS:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
        expect(res.payNo).toEqual(expect.any(String));
        // registResponse = res;
      });
  });

  it("able to request API V1 Enterprise Register  QRIS", () => {
    let firstVersion = new FirstApiVersion(config);
    parameter.payMethod = "08";
    parameter.mitraCd = "QSHP";
    parameter.shopId = "NICEPAY";

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_ONE_PASS)
      .then((res) => {
        console.log("Response Register QRIS:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
        // registResponse = res;
      });
  });

  it("able to request API V1 Enterprise Register  E-wallet", () => {
    let firstVersion = new FirstApiVersion(config);
    parameter.payMethod = "05";
    parameter.mitraCd = "ESHP";
    parameter.returnJsonFormat = "1";
    parameter.shopId = "";
    parameter.cartData =
      '{"count":"2","item":[{"img_url":"http://www.merchant.com/image_goods1.jpg","goods_name":"Item 1 Name","goods_detail":"Item 1 Detail","goods_amt":"' +
      parameter.amt +
      '","goods_quantity":"1"},{"img_url":"http://www.merchant.com/image_goods2.jpg","goods_name":"Item 2 Name","goods_detail":"Item 2 Detail","goods_amt":"0","goods_quantity":"1"}]}';

    console.log("endpoint :" + EndpointUtils.V1.ENTERPRISE_EWALLET_TRANS);
    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_EWALLET_TRANS)
      .then((res) => {
        console.log("Response Register Ewallet:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Register  Credit Card - Request Token", () => {
    let firstVersion = new FirstApiVersion(config);

    const paramCard = {
      referenceNo: "MerchantReferenceNumber001",
      amt: "10000",
      cardHolderNm: "John Doe",
      cardHolderEmail: "johndoe@gmail.com",
      cardNo: "5123450000000008",
      cardExpYymm: "3901",
      instmntType: "1",
      instmntMon: "1",
    };

    return firstVersion
      .requestAPI(paramCard, EndpointUtils.V1.ENTERPRISE_CARD_TOKEN_REQUEST)
      .then((res) => {
        console.log("Response Request Token:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));

        cardTokn = res.cardToken;
      });
  });

  it("able to request API V1 Enterprise Register  Credit Card - Request Payment", () => {
    let firstVersion = new FirstApiVersion(config);

    console.log("cardToken : " + cardTokn);
    parameter.payMethod = "01";
    parameter.onePassToken = cardTokn;
    parameter.cardCvv = "100";
    parameter.instmntMon = "1";
    parameter.instmntMon = "1";
    parameter.referenceNo = "MerchantReferenceNumber001";

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_ONE_PASS)
      .then((res) => {
        console.log("Response CC Request Payment:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Recurring Issue", async () => {
    config.clientId = "RECURRTEST";
    let firstVersion = new FirstApiVersion(config);

    // #1 Request card token
    const paramCard = {
      referenceNo: "referenceRecurr01",
      amt: "10000",
      cardHolderNm: "John Doe",
      cardHolderEmail: "johndoe@gmail.com",
      cardNo: "5123450000000008",
      cardExpYymm: "3901",
      instmntType: "1",
      instmntMon: "1",
    };

    const tokenRes = await firstVersion.requestAPI(
      paramCard,
      EndpointUtils.V1.ENTERPRISE_CARD_TOKEN_REQUEST
    );

    expect(tokenRes.resultCd).toBe("0000");
    const cardTokn = tokenRes.cardToken;

    // #2 Request Payment using card token to get recurring token

    parameter.onePassToken = cardTokn;
    parameter.referenceNo = "referenceRecurr01";
    parameter.recurrOpt = "";

    const registResponse = await firstVersion.requestAPI(
      parameter,
      EndpointUtils.V1.ENTERPRISE_ONE_PASS
    );
    expect(tokenRes.resultCd).toBe("0000");
    recurringToken = registResponse.recurringToken;
    console.log("recurring regist response :");
    console.log(registResponse);

    // #3 Request recurring token issue

    const paramRecurr = {
      referenceNo: "referenceRecurr02",
      recurringToken: recurringToken,
      amt: "10000",
      instmntType: "1",
      instmntMon: "1",
      cardHolderNm: "John Doe",
      cardHolderEmail: "johndoe@gmail.com",
    };

    return firstVersion
      .requestAPI(paramRecurr, EndpointUtils.V1.ENTERPRISE_CARD_RECURRING_ISSUE)
      .then((res) => {
        console.log("Response Recurring Issue:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Recurring Payment", () => {
    config.clientId = "RECURRTEST";
    let firstVersion = new FirstApiVersion(config);

    parameter.cardToken = "";
    parameter.recurringToken = recurringToken;
    parameter.referenceNo = "referenceRecurr03";

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_CARD_RECURRING_PAYMENT)
      .then((res) => {
        console.log("Response Recurring Payment:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Generate Recurring Token Without First Payment", () => {
    config.clientId = "RECURRTEST";
    let firstVersion = new FirstApiVersion(config);

    const paramTokenizedCard = {
      cardNo: "5123450000000008",
      cardExpYymm: "2901",
      cardHolderNm: "John Doe",
      cardHolderEmail: "johndoe@gmail.com",
      billingNm: "John Doe",
    };

    return firstVersion
      .requestAPI(
        paramTokenizedCard,
        EndpointUtils.V1.ENTERPRISE_CARD_RECURRING_TOKENIZED_CARD
      )
      .then((res) => {
        console.log("Response Recurring With Tokenized Card:");
        console.log(res);
        expect(res.resultCode).toEqual(expect.any(String));
        expect(res.resultCode).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Check recurring token", () => {
    config.clientId = "RECURRTEST";
    let firstVersion = new FirstApiVersion(config);

    const paramCheckToken = {
      recurringToken: recurringToken,
    };

    return firstVersion
      .requestAPI(
        paramCheckToken,
        EndpointUtils.V1.ENTERPRISE_CARD_RECURRING_CHECK_TOKEN
      )
      .then((res) => {
        console.log("Response Check Recurring Token:");
        console.log(res);
        expect(res.resultCode).toEqual(expect.any(String));
        expect(res.resultCode).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Remove recurring token", () => {
    config.clientId = "RECURRTEST";
    let firstVersion = new FirstApiVersion(config);

    const paramCheckToken = {
      recurringToken: recurringToken,
    };

    return firstVersion
      .requestAPI(
        paramCheckToken,
        EndpointUtils.V1.ENTERPRISE_CARD_RECURRING_REMOVE_TOKEN
      )
      .then((res) => {
        console.log("Response Remove Recurring Token:");
        console.log(res);
        expect(res.resultCode).toEqual(expect.any(String));
        expect(res.resultCode).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise Credit Card - Regist Pre Auth Token", async () => {
    config.clientId = "PACTEST001";
    let firstVersion = new FirstApiVersion(config);

    // #1 Request card token
    const paramCard = {
      referenceNo: "referencePAC01",
      amt: "10000",
      cardHolderNm: "John Doe",
      cardHolderEmail: "johndoe@gmail.com",
      cardNo: "5123450000000008",
      cardExpYymm: "3901",
      instmntType: "1",
      instmntMon: "1",
    };

    const tokenRes = await firstVersion.requestAPI(
      paramCard,
      EndpointUtils.V1.ENTERPRISE_CARD_TOKEN_REQUEST
    );

    expect(tokenRes.resultCd).toBe("0000");
    const cardTokn = tokenRes.cardToken;

    // #2 Request PAC token

    parameter.onePassToken = cardTokn;
    parameter.referenceNo = "referencePAC01";
    parameter.recurringToken = "";
    parameter.recurrOpt = "";

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_ONE_PASS)
      .then((res) => {
        console.log("Response Regist PAC Token:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
        preauthToken = res.preauthToken;
      });
  });

  it("able to request API V1 Enterprise Credit Card - Capture Pre Auth Transaction", () => {
    config.clientId = "PACTEST001";
    let firstVersion = new FirstApiVersion(config);

    parameter.onePassToken = "";
    parameter.referenceNo = "referencePAC02";
    parameter.preauthToken = preauthToken;

    return firstVersion
      .requestAPI(parameter, EndpointUtils.V1.ENTERPRISE_CARD_PRE_AUTH_CAPTURE)
      .then((res) => {
        console.log("Response Capture Trans:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise - Inquiry Status", () => {
    config.clientId = cons.clientId;
    let firstVersion = new FirstApiVersion(config);

    const paramInquiry = {
      tXid: vaResponse.tXid,
      referenceNo: vaResponse.referenceNo,
      amt: vaResponse.amount,
    };

    return firstVersion
      .requestAPI(paramInquiry, EndpointUtils.V1.STATUS_INQUIRY)
      .then((res) => {
        console.log("Response Inquiry Status:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

  it("able to request API V1 Enterprise - Cancel Transaction", () => {
    config.clientId = cons.clientId;
    let firstVersion = new FirstApiVersion(config);

    const parameterCancel = {
      tXid: vaResponse.tXid,
      referenceNo: vaResponse.referenceNo,
      amt: vaResponse.amount,
      cancelMsg: "Test Cancel Nicepay NodeJs",
      cancelType: "1",
      payMethod: "02",
    };

    return firstVersion
      .requestAPI(parameterCancel, EndpointUtils.V1.CANCEL_TRANSACTION)
      .then((res) => {
        console.log("Response Cancel Transaction:");
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });
});
