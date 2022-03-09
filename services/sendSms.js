const fast2sms = require('fast-two-sms');

const fast2smsToken = process.env.FAST2SMS_API_KEY;

const sendSms = async (message, number) => {
  try {
    const options = {
      authorization: fast2smsToken,
      message: message,
      numbers: [number],
    };
    return await fast2sms.sendMessage(options);
  } catch (error) {
    return error.message;
  }
};

module.exports = sendSms;
