import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  let token = jwt.sign({ data }, '@Dminhagia547', { algorithm: 'HS256' });

  return token;
};

export const checkToken = () => {};

export const decodeToken = () => {};
