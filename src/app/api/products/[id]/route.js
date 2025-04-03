import DbConnection from '@/app/lib/db';
import Product from '@/app/models/productModel';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        await DbConnection();
        const { id } = params;        
        const { title, description, price, stock } =  await request.json();

        if (!title || !description || !price || !stock) {
            return NextResponse.json({
                success: false,
                message: "All fields are required",
                status: 400
            });
        }

        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { title, description, price, stock }, 
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
            status: 200,
            product: updatedProduct
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500
        });
    }
}   


export async function DELETE(request, { params }) {
    try {
        await DbConnection();
        const { id } = params;        

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Product Deleted successfully",
            status: 200,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500
        });
    }
}   
