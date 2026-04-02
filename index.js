const Snap = require("./lib/snap.js");
const SecondApiVersion = require("./lib/secondApiVersion.js");
const FirstApiVersion = require("./lib/firstApiVersion.js");
const EndpointUtils = require("./lib/endpointUtils.js");

const Nicepay = {
  Snap,
  SecondApiVersion,
  FirstApiVersion,
  EndpointUtils,
};

module.exports = Nicepay;
