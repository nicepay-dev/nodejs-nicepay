# NICPAY - Node JS

NICEPAY ❤️ Node JS!

This is the Official Node JS API client/library for NICEPAY Payment API. Visit [](). More information about the product and see documentation at []() for more technical details.

## 1. Installation

### 1.a Using NPM

```
npm install --save nodejs-nicepay
```

### 1.b Manual Installation

If you are not using NPM, you can clone or [download]() this repository.
Then require from `index.js` file.

```javascript
let nicepayClient = require("./nodejs-nicepay/index.js");
```

## 2. Usage

### 2.1 Choose Product/Method

We have one of payment that you can use:

- [Snap] - Customizable payment popup will appear on **your web/app** (no redirection).
- [API Version 2] - New version of API NICEPAY but doesn't used SNAP (NICEPAY payment page & merchant payment page).

### 2.2 Client Initialization and Configuration

Get your clientSecret from [Nicepay Dashboard](https://bo.nicepay.co.id/)

> **WARNING:** Credentials used here are for testing purposes only.

Create API client object

```javascript
const nicepayClient = require("nodejs-nicepay");
// Create Snap API instance

const privateKeyStr = `-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAInJe1G22R2fMchIE6BjtYRqyMj6lurP/zq6vy79WaiGKt0Fxs4q3Ab4ifmOXd97ynS5f0JRfIqakXDcV/e2rx9bFdsS2HORY7o5At7D5E3tkyNM9smI/7dk8d3O0fyeZyrmPMySghzgkR3oMEDW1TCD5q63Hh/oq0LKZ/4Jjcb9AgMBAAECgYA4Boz2NPsjaE+9uFECrohoR2NNFVe4Msr8/mIuoSWLuMJFDMxBmHvO+dBggNr6vEMeIy7zsF6LnT32PiImv0mFRY5fRD5iLAAlIdh8ux9NXDIHgyera/PW4nyMaz2uC67MRm7uhCTKfDAJK7LXqrNVDlIBFdweH5uzmrPBn77foQJBAMPCnCzR9vIfqbk7gQaA0hVnXL3qBQPMmHaeIk0BMAfXTVq37PUfryo+80XXgEP1mN/e7f10GDUPFiVw6Wfwz38CQQC0L+xoxraftGnwFcVN1cK/MwqGS+DYNXnddo7Hu3+RShUjCz5E5NzVWH5yHu0E0Zt3sdYD2t7u7HSr9wn96OeDAkEApzB6eb0JD1kDd3PeilNTGXyhtIE9rzT5sbT0zpeJEelL44LaGa/pxkblNm0K2v/ShMC8uY6Bbi9oVqnMbj04uQJAJDIgTmfkla5bPZRR/zG6nkf1jEa/0w7i/R7szaiXlqsIFfMTPimvRtgxBmG6ASbOETxTHpEgCWTMhyLoCe54WwJATmPDSXk4APUQNvX5rr5OSfGWEOo67cKBvp5Wst+tpvc6AbIJeiRFlKF4fXYTb6HtiuulgwQNePuvlzlt2Q8hqQ==
  -----END PRIVATE KEY-----`;

let snap = new nicepayClient.Snap({
  isProduction: false,
  privateKey: privateKeyStr,
  clientId: "IONPAYTEST",
  clientSecret:
    "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==",
  isCloudServer: false,
});
```

You can also re-set config using `Snap.apiConfig.set( ... )`
example:

```javascript
const nicepayClient = require("nodejs-nicepay");

// Create Snap API instance, empty config
let snap = new nicepayClient.Snap();
snap.apiConfig.set({
  isProduction: false,
  privateKey: "YOUR_PRIVATE_KEY",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  isCloudServer: false,
});

// You don't have to re-set using all the options,
// i.e. set privateKey only
snap.apiConfig.setConfiguration({ privateKey: "YOUR_PRIVATE_KEY" });
```

You can also set config directly from attribute

```javascript
const nicepayClient = require("nodejs-nicepay");

// Create Snap API instance, empty config
let snap = new nicepayClient.Snap();

snap.apiConfig.isProduction = false;
snap.apiConfig.privateKey = "YOUR_PRIVATE_KEY";
snap.apiConfig.clientId = "YOUR_CLIENT_ID";
snap.apiConfig.clientSecret = "YOUR_CLIENT_SECRET";
snap.apiConfig.isCloudServer = false;
```

### 2.2.A Snap

Available methods for `Snap` class

```javascript
// return Snap API /transaction response as Promise of Object
requestSnapTransaction(parameter, endPoint, accessToken, httpMethod);

// return Snap API /transaction token as Promise of String
requestSnapAccessToken(parameter);

// return verify signature response as boolean
helper.verifySHA256RSA(dataString, publicKeyString, signatureString);
```

`parameter` is Object or String of JSON of [SNAP Parameter]()

#### Get Virtual Account with Snap

```javascript
const nicepayClient = require("nodejs-nicepay");
// Create Snap API instance
let snap = new nicepayClient.Snap({
  isProduction: false,
  privateKey: "YOUR_SERVER_KEY",
  clientId: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_KEY",
  isCloudServer: false
});

let parameter = {
  //request body
  body:{
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
  //request headers
  headers:{
    X_EXTERNAL_ID: Date.now(),
    CHANNEL_ID: "NORMALTEST",
  }
};
let parameterToken = {
  grantType: "client_credentials",
  additionalInfo: {},
}

let endPoint = '/api/v1.0/transfer-va/create-va'
let httpMethod = `POST`
snap.requestAccessToken(parameterToken)
.then({res} => {
  let token = res.accessToken
  return snap.requestSnapTransaction(parameter, endPoint, token, httpMethod)
})
.then((transaction) => {
  console.log(transaction);
});
```

### Cancel / Delete Virtual Account with Snap

```javascript
let parameterDelete = {
  // request body
  body : {
    partnerServiceId : "",
    customerNo: "",
    virtualAccountNo: "",
    trxId : parameter.body.trxId,
    additionalInfo: {
        totalAmount: {
            value: "10000.00",
            currency: "IDR"
        },
        tXidVA: "",
        cancelMessage: "Cancel Virtual Account"
    }
  },
  // request header
  headers: {
    X_EXTERNAL_ID: Date.now(),
    CHANNEL_ID: "NORMALTEST",
  },
}

let parameterToken = {
  grantType: "client_credentials",
  additionalInfo: {},
}

let endPoint = `/api/v1.0/transfer-va/delete-va`;
let httpMethod = `DELETE`
snap.requestAccessToken(parameterToken)
.then({res} => {
  let token = res.accessToken
  return snap.requestSnapTransaction(parameter, endPoint, token, httpMethod)
})
.then((transaction) => {
  console.log(transaction);
});
```

### 2.2.A Snap

Available methods for `SecondApiVersion` class.

```javascript
// return API /transaction response as Promise of Object
requestAPI(parameter, endPoint);

// return API /transaction response as Promise of HTML
requestPayment(parameter);
```

`parameter` is Object or String of JSON of [API Parameter]()

#### Register and Payment Credit Card with API Version 2

```javascript
const nicepayClient = require("nodejs-nicepay");
// Create Snap API instance
let secondVersion = new nicepayClient.SecondApiVersion({
  isProduction: false,
  privateKey: "YOUR_SERVER_KEY",
  clientId: "YOUR_CLIENT_KEY",
  clientSecret: "YOUR_CLIENT_KEY",
  isCloudServer: false,
  merchantKey: "YOUR_MERCHANT_KEY",
});

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

let parameterPayment = {
  amt: "10000",
  referenceNo: "ord12320250409170492",
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

let endPoint = '/direct/v2/registration'
secondVersion.requestAPI(parameter, endPoint)
.then({res} => {
  return secondVersion.requestPayment(parameterPayment)
})
.then((transaction) => {
  console.log(transaction);
});
```

### Verify message / data signature SHA 256 RSA

```javascript
let snap = new Snap();

const signatureString = "YOUR_SIGNATURE_IN STRING "; // Ex : "VoxMPjbcV9pro4YyHGQgoRj4rDVJgYk2Ecxn+95B90w47Wnabtco35BfhGpR7a5RukUNnAdeOEBNczSFk4B9uYyu3jc+ceX+Dvz5OYSgSnw5CiMHtGiVnTAqCM/yHZ2MRpIEqekBc4BWMLVtexSWp0YEJjLyo9dZPrSkSbyLVuD7jkUbvmEpVdvK0uK15xb8jueCcDA6LYVXHkq/OMggS1/5mrLNriBhCGLuR7M7hBUJbhpOXSJJEy7XyfItTBA+3MRC2FLcvUpMDrn/wz1uH1+b9A6FP7mG0bRSBOm2BTLyf+xJR5+cdd88RhF70tNQdQxhqr4okVo3IFqlCz2FFg==";
const dataString = "YOUR_DATA_TO_SIGN"; // Ex: "TNICEVA023|2024-08-19T17:12:40+07:00";
const publicKeyString = "PUBLIC_KEY_PEM"; // Ex : "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApizrKJl/1Legp3Zj8f0oTIjKnUWe2HJCBSoRsVLxtpf0Dr1MI+23y+AMNKKxVXxbvReZq/sD91uN4GFYMUr16LY9oX7nJXh9C1JlI4/Xb/Q9MF30o1XYvogHLATtvTR/KQ8hxrf6Nlj/yuzeqrT+PiQMZt1CaKiE6UMn36kq11DmDq4ocwcNhChKDudNZSZ4YYIFn5IgH05K+VsRjehpa0szbO8qHmvnprXVVcqvk7ZSS+6fYwDynOq0f552aL0LWX0glNhh9F0oJqmTreW4lM0mdhNDq4GhlJZl5IpaUiaGRM2Rz/t6spgwR7nqUhI9aE2kjzaorgP4ZWUGm3wlTwIDAQAB";

let isVerified = snap.helper.verifySHA256RSA(
  dataString,
  publicKeyString,
  signatureString
);
```

## 3. Handling Error / Exception

When using function that result in NICEPAY API call e.g: `core.charge(...)` or `snap.createTransaction(...)`
there's a chance it may throw error (`NicepayError` object), the error object will contains below properties that can be used as information to your error handling logic:

```javascript
snap
  .createTransaction(parameter)
  .then((res) => {})
  .catch((e) => {
    e.message; // basic error message string
    e.httpStatusCode; // HTTP status code e.g: 400, 401, etc.
    e.ApiResponse; // JSON of the API response
    e.rawHttpClientData; // raw Axios response object
  });
```

## 4. Advanced Usage

### Custom Http Client Config

Under the hood this API wrapper is using [Axios](https://github.com/axios/axios) as http client. You can override the default config.

You can set via the value of this `<api-client-instance>.httpClient.http_client.defaults` object, like [described in Axios guide](https://github.com/axios/axios#global-axios-defaults). e.g:

```javascript
// create instance of api client
let snap = new nicepayClient.Snap({
  isProduction: false,
  privateKet: "YOUR_PRIVATE_KEY",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  isCloudServer: false,
});

// set Axios timeout config to 2500
snap.httpClient.http_client.defaults.timeout = 2500;

// set custom HTTP header for every request from this instance
snap.httpClient.http_client.defaults.headers.common["My-Header"] =
  "my-custom-value";
```

### Custom Http Client Interceptor

As Axios [also support interceptor](https://github.com/axios/axios#interceptors), you can also apply it here. e.g:

```javascript
// Add a request interceptor
snap.httpClient.http_client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
```

It can be used for example to customize/manipulate http request's body, header, etc. before it got sent to the destination API url.

## Notes

#### Not Designed for Frontend Usage

This library/package is mainly **NOT FOR FRONTEND** (Browser's javascript) usage, but for backend (Node JS server) usage:

- This is mainly for backend usage, to do **secure server-to-server/backend-to-backend API call**.
- You may/will encounter **CORS issue if you are using** this to do API request **from frontend**.
- Your API **privateKey may also be exposed to public** if you are using this **on frontend**.

## Get help

- [NICEPAY Docs](https://docs.nicepay.co.id/)
- [NICEPAY Dashboard ](https://bo.nicepay.co.id/)
- [SNAP documentation]()
- Can't find answer you looking for? email to [cs@nicepay.co.id](mailto:cs@nicepay.co.id)
