"use strict";
const crypto = require("crypto");
/**
 *  Helper Object that used to do specific logic.
 */
class Helper {
  /**
   * Do sign data with privateKey
   * @param  {String} privateKeyString - private key in string format.
   * @param  {String} stringToSign - data that will sign with private key.
   * @return {String} - signature from data that sign with privateKey
   */
  getSignatureAccessToken(privateKeyString, stringToSign) {
    try {
      const sign = crypto.createSign("RSA-SHA256");
      sign.update(stringToSign);
      sign.end();
      const signature = sign.sign(privateKeyString, "base64");
      return signature;
    } catch (error) {
      return error;
    }
  }

  /**
   * Do encode requestbody
   * @param  {String} requestBody - request body that will be send or use when http request.
   * @return {String} - encode request body
   */
  getEncodePayload(requestBody) {
    const string = JSON.stringify(requestBody);
    const hash = crypto.createHash("sha256");
    hash.update(string);
    const hexEncode = hash.digest("hex");
    return hexEncode;
  }

  /**
   * Do sign data with clientSecret
   * @param  {String} stringToSign - data that will sign with private key.
   * @param  {String} clientSecret - client secret you can get from dashboard back office.
   * @return {String} - signature from data that sign with client secret
   */
  getRegistSignature(stringToSign, clientSecret) {
    const hmac = crypto.createHmac("sha512", clientSecret);
    hmac.update(stringToSign);
    const hmacAsBase64 = hmac.digest("base64");
    return hmacAsBase64;
  }

  /**
   * Do get formated date now
   * @return {String} - signature from data that sign with client secret
   */
  getFormattedDate() {
    const date = new Date();
    const formattedDate =
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
    return formattedDate;
  }

  /**
   * Do get formated date that you request
   * @param  {String} timeStamp - time that want to convert to SNAP format, 20230220120000 to 2023-02-20T12:00:00+07:00.
   * @return {String} - signature from data that sign with client secret
   */
  getConvertFormatedDate(timeStamp) {
    const year = timeStamp.substring(0, 4);
    const month = timeStamp.substring(4, 6);
    const day = timeStamp.substring(6, 8);
    const hour = timeStamp.substring(8, 10);
    const minute = timeStamp.substring(10, 12);
    const second = timeStamp.substring(12, 14);
    const offset = "+07:00";
    const formattedTime = `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`;

    return formattedTime;
  }

  verifySHA256RSA(stringToSign, publicKeyString, signatureString) {
    let isVerified = false;

    try {
      const pemKey = this.formatPemKey(publicKeyString);

      const publicKey = crypto.createPublicKey({
        key: pemKey,
        format: "pem",
        type: "spki",
      });

      const verify = crypto.createVerify("SHA256");
      verify.update(stringToSign);
      verify.end();

      const signatureBuffer = Buffer.from(signatureString, "base64");

      isVerified = verify.verify(publicKey, signatureBuffer);

      console.log(`Signature is ${isVerified ? "valid" : "invalid"}`);
    } catch (e) {
      console.error(`Error verifying signature: ${e.message}`);
    }

    return isVerified;
  }

  formatPemKey(publicKeyString) {
    return `
  -----BEGIN PUBLIC KEY-----
  ${publicKeyString}
  -----END PUBLIC KEY-----
          `.trim();
  }

  generateMerchantToken(stringTosign) {
    const hash = crypto.createHash("sha256").update(stringTosign).digest("hex");
    return hash;
  }

  getTimestampOldFormat() {
    const now = new Date();

    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}

module.exports = Helper;
