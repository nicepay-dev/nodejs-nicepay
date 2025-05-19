"use strict";
const SecondApiVersion = require("../lib/secondApiVersion.js");
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
  mitraCd: "OVOE",
  instmntMon: "1",
  instmntType: "1",
  shopId: "",
};

let parameterRegistPayout = {
  "msId":         "",
		"accountNo":    "5345000060",
		"benefNm":      "PT IONPAY NETWORKS",
		"benefStatus":  "1",
		"benefType":    "1",
		"bankCd":       "BDIN",
		"amt":          "10000",
		"referenceNo":  "ORD12345",
		"reservedDt":   "",
		"reservedTm":   "",
		"benefPhone":   "082111111111",
		"description":  "This is test request",
		"payoutMethod": ""
}

let parameterBalanceInquiry = {}

let parameterApproveBalance = {
  "tXid": "IONPAYTEST07202505191401339529",
}
let parameterInquiryPayout = {
  "tXid":      "IONPAYTEST07202505191401339529",
	"accountNo": "5345000060",
}
let parameterCancel = {
  "tXid":           "TNICEVA02302202505191431551086",
		"payMethod":      "02",
		"amt":            "10000",
		"cancelType":     "1",
		"cancelMsg":      "Testing Cancel Of Virtual Account",
		"cancelUserId":   "",
		"cancelUserIp":   "127.0.0.1",
		"cancelServerIp": "127.0.0.1",
		"cancelUserInfo": "",
		"cancelRetryCnt": "",
		"worker":         "",
}


describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to request Register API", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestAPI(parameter, "/direct/v2/registration")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

   it("able to request Register API Checkout", () => {
    let secondVersion = new SecondApiVersion(config);
    parameter.callBackUrl='https://nicepay.co.id';
    return secondVersion
      .requestAPI(parameter, "/redirect/v2/registration")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

   it("able to request Inquiry API", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestAPI(parameter, "/direct/v2/inquiry")
      .then((res) => {
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });

   it("able to request Cancel API", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestAPI(parameterCancel, "/direct/v2/cancel")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
      });
  });
  
  it("able to request Payout API Regist", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestPayoutAPI(parameterRegistPayout, "/api/direct/v2/requestPayout")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
  
      });
  });


  it("able to request Payout API Inquiry", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestPayoutAPI(parameterInquiryPayout, "/api/direct/v2/inquiryPayout")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
  
      });
  });

  it("able to request Payout API Check Balance", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestPayoutAPI(parameterBalanceInquiry, "/api/direct/v2/balanceInquiry")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
  
      });
  });

  it("able to request Payout API Approve", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestPayoutAPI(parameterApproveBalance, "/api/direct/v2/approvePayout")
      .then((res) => {
        console.log(res)
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
  
      });
  });

  it("able to request Payment API", () => {
    let secondVersion = new SecondApiVersion(config);
    let parameterPayment = {
      amt: parameter.amt,
      referenceNo: parameter.referenceNo,
      tXid: tXid,
      cardNo: "4516176337289748",
      callBackUrl: "https://dev.nicepay.co.id/IONPAY_CLIENT/paymentResult.jsp",
      cardExpYymm: "2609",
      cardCvv: "123",
      recurringToken: "",
      cardHolderNm: "Arya",
      preauthToken: "",
      cardHolderEmail: "",
    };
    return secondVersion.requestPayment(parameterPayment).then((res) => {
      console.log(res)
    });
  });
});
