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
  payMethod: "01",
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

let tXid;
let referenceNo;

describe("config.js", () => {
  it("able to start test", () => {
    expect(true).toBe(true);
  });

  it("able to request Register API", () => {
    let secondVersion = new SecondApiVersion(config);

    return secondVersion
      .requestAPI(parameter, "/direct/v2/registration")
      .then((res) => {
        console.log(res);
        expect(res.resultCd).toEqual(expect.any(String));
        expect(res.resultCd).toBe("0000");
        expect(res.resultMsg).toEqual(expect.any(String));
        tXid = res.tXid;
        // referenceNo = res.referenceNo;
        //   virtualAccountNo = res.virtualAccountData.virtualAccountNo;
        //   tXidVA = res.virtualAccountData.additionalInfo.tXidVA;
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
      console.log(res);
      console.log(tXid);
    });
  });
});
