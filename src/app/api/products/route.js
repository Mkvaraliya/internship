import DbConnection from '@/app/lib/db';
import Product from '@/app/models/productModel';
import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';
import { resolve } from 'styled-jsx/css';


export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const image = formData.get('image'); // 👈 image is a Blob

    if (!title || !description || !price || !stock || !image) {
      return NextResponse.json({
        success: false,
        message: "All fields including image are required",
        status: 400
      });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer); // 👈 Send buffer to Cloudinary
    });

    await DbConnection();

    const newProduct = await Product.create({
      title,
      description,
      price,
      stock,
      image: uploadResult.secure_url, // 👈 Save Cloudinary URL
    });

    return NextResponse.json({
      success: true,
      message: "Product Created Successfully",
      status: 201,
      product: newProduct
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
    });
  }
}


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