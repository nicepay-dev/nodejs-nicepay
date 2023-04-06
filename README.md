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

- [Snap](#22A-snap) - Customizable payment popup will appear on **your web/app** (no redirection). 



### 2.2 Client Initialization and Configuration

Get your clientSecret from [Nicepay Dashboard](https://bo.nicepay.co.id/)

Create API client object

```javascript
const nicepayClient = require("nodejs-nicepay");
// Create Snap API instance
let snap = new nicepayClient.Snap({
  isProduction: false,
  privateKey: "YOUR_PRIVATE_KEY",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
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
});

// You don't have to re-set using all the options,
// i.e. set privateKey only
snap.apiConfig.set({ privateKey: "YOUR_PRIVATE_KEY" });
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
```

### 2.2.A Snap

Available methods for `Snap` class

```javascript
// return Snap API /transaction response as Promise of Object
requestSnapTransaction(parameter, endPoint, accessToken);

// return Snap API /transaction token as Promise of String
requestSnapAccessToken(parameter);

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
    CHANNEL_ID: "IONPAYTEST01",
  }
};
let parameterToken = {
  grantType: "client_credentials",
  additionalInfo: {},
}

let endPoint = '/api/v1.0/transfer-va/create-va'
snap.requestAccessToken(parameterToken)
.then({res} => {
  let token = res.accessToken
  return snap.requestSnapTransaction(parameter, endPoint, token)
})
.then((transaction) => {
  console.log(transaction);
}); 
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
  clientSecret:"YOUR_CLIENT_SECRET"
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
