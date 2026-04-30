import crypto from "crypto";

export const generateOTP = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
};

export const cryptoToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
