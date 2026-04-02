module.exports = Object.freeze({
  V1: {
    PROFESSIONAL_REGISTRATION_ENDPOINT: "/api/orderRegist.do",

    ENTERPRISE_ONE_PASS: "/api/onePass.do",
    ENTERPRISE_EWALLET_TRANS: "/api/ewalletTrans.do",
    ENTERPRISE_CARD_TOKEN_REQUEST: "/api/onePassToken.do",
    ENTERPRISE_CARD_RECURRING_ISSUE: "/api/recurringToken.do",
    ENTERPRISE_CARD_RECURRING_PAYMENT: "/api/recurringTrans.do",
    ENTERPRISE_CARD_RECURRING_TOKENIZED_CARD: "/api/tokenize.do",
    ENTERPRISE_CARD_RECURRING_CHECK_TOKEN: "/api/checkToken.do",
    ENTERPRISE_CARD_RECURRING_REMOVE_TOKEN: "/api/removeToken.do",
    ENTERPRISE_CARD_PRE_AUTH_CAPTURE: "/api/captureTrans.do",

    STATUS_INQUIRY: "/api/onePassStatus.do",
    CANCEL_TRANSACTION: "/api/onePassAllCancel.do",
  },
  V2: {
    REDIRECT_REGISTRATION: "/redirect/v2/registration",
    DIRECT_REGISTRATION: "/direct/v2/registration",
    STATUS_INQUIRY: "/direct/v2/inquiry",
    CANCEL_TRANSACTION: "/direct/v2/cancel",

    PAYOUT_REGISTRATION: "/api/direct/v2/requestPayout",
    PAYOUT_CHECK_BALANCE: "/api/direct/v2/balanceInquiry",
    PAYOUT_APPROVE: "/api/direct/v2/approvePayout",
    PAYOUT_REJECT: "/api/direct/v2/rejectPayout",
    PAYOUT_STATUS_INQUIRY: "/api/direct/v2/inquiryPayout",
    PAYOUT_CANCEL: "/api/direct/v2/cancelPayout",
  },
  SNAP: {
    ACCESS_TOKEN: "/v1.0/access-token/b2b",

    VA_CREATE: "/api/v1.0/transfer-va/create-va",
    VA_STATUS: "/api/v1.0/transfer-va/status",
    VA_CANCEL: "/api/v1.0/transfer-va/delete-va",

    EWALLET_PAYMENT: "/api/v1.0/debit/payment-host-to-host",
    EWALLET_STATUS: "/api/v1.0/debit/status",
    EWALLET_REFUND: "/api/v1.0/debit/refund",

    QRIS_GENERATE: "/api/v1.0/qr/qr-mpm-generate",
    QRIS_STATUS: "/api/v1.0/qr/qr-mpm-query",
    QRIS_REFUND: "/api/v1.0/qr/qr-mpm-refund",

    PAYOUT_REGISTRATION: "/api/v1.0/transfer/registration",
    PAYOUT_APPROVE: "/api/v1.0/transfer/approve",
    PAYOUT_STATUS_INQUIRY: "/api/v1.0/transfer/inquiry",
    PAYOUT_CANCEL: "/api/v1.0/transfer/cancel",
    PAYOUT_CHECK_BALANCE: "/api/v1.0/balance-inquiry",
    PAYOUT_REJECT: "/api/v1.0/transfer/reject",
  },
});
