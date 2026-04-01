import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createToken = (data: object) => {
  return jwt.sign({ data }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
};

export const checkToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};


