import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("JWT_SECRET");

async function verifyJWT(token) {
    try{
        const { payload } = await jwtVerify(token, secretKey);
        return payload; //Returns decoded user data if token is valid
    }catch(error){
        return null;
    }
};

export async function middleware(request) {
    const token = request.cookies.get("auth_token")?.value;
    
    if (!token || !(await verifyJWT(token))) {
        const loginUrl = new URL("/admin/auth/login", request.url);
        loginUrl.searchParams.set("message", "You must be logged in to access this page");
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next(); //Allow request if token is valid
}

//protect API routes that require authentication
export const config = {
    matcher: ["/admin/products/:path*"], //Protects all route inside /api/products
};