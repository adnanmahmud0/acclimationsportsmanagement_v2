import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string | number
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return jwt.sign(payload, secret, { expiresIn: expireTime as any });
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { createToken, verifyToken };
