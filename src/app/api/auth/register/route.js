import DbConnection from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/userModel';

export async function POST(request) {
    try{
        await DbConnection();
        const { name, email, password } = await request.json();

        if(!name || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "All Fields Required",
            },
            { 
                status: 400 
            });
        };
        
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return NextResponse.json({
                success: false,
                message: "Email already in use"
            },
            { 
                status: 400 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        return NextResponse.json({
            success: true,
            message: "User Registered Successfully",
            user: newUser
        },
        { 
            status: 201 
        });
        
    } catch(error) {
        console.error("Registration Error:", error); // Log the error

        return NextResponse.json({
            success: false,
            message: "Server Error",
        },
        { 
            status: 500 
        });
    }
    
};

