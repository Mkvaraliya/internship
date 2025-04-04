import DbConnection from '@/app/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/userModel';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try{
        await DbConnection();
        const { email, password } = await request.json();

        if(!email, !password) {
            return NextResponse.json({
                success: false,
                message: "All Fields Required",
            },
            { 
                status: 400 
            });
        };
        
        const user = await User.findOne({ email });
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            },
            { 
                status: 400 
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            },
            { 
                status: 400 
            });
        }
        
        const token = jwt.sign(
            { id: user._id },
            "JWT_SECRET",
            { expiresIn: "1d" }
        );
        
        const response = NextResponse.json({
            success: true,
            message: "Login Succesful",
            user
        },
        { 
            status: 200 
        });
        response.cookies.set(
            "auth_token", 
            token,
            { 
                httpOnly: true,
                secure: true
            }
        )

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

