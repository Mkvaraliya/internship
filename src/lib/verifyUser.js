import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("JWT_SECRET"); 

export const getUserFromToken = async (token) => {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
};
