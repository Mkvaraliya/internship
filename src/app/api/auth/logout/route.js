
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully",
        },
        { 
            status: 200 
        });

        response.cookies.set(
            "auth_token", 
            "", 
            {
                httpOnly: true,
                expires: new Date(0)
            }
        );

        return response;
        
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Server Error",
        },
        { 
            status: 500 
        });
    }
    
};

