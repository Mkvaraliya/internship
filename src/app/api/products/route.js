import DbConnection from '@/app/lib/db';
import Product from '@/app/models/productModel';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const {title, description, price, stock} = await request.json();
        if(!title || !description || !price || !stock) {
            return NextResponse.json({
                success: false,
                message: "All fields are Required",
                status: 400
            });
        }
        
        await DbConnection();
        
        const newProduct = await Product.create({
            title,
            description,
            price,
            stock
        });
        return NextResponse.json({
            success: true,
            message: "Product Created Successfully",
            status: 201,
            product: newProduct
        });
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500,
        });
    }
    
};

export async function GET(request) {
    try{
        await DbConnection();

        const products = await Product.find();
        return NextResponse.json({
            success: true,
            message: "Product Fetched Successfully",
            status: 200,
            products: products
        });
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500,
        });
    }
    
};