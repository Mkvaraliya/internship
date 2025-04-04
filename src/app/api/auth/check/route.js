import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("JWT_SECRET"); // same as in middleware

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  const user = await verifyJWT(token);

  if (user) {
    return NextResponse.json({ loggedIn: true });
  } else {
    return NextResponse.json({ loggedIn: false });
  }
}
