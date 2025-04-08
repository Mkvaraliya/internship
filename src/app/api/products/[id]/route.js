import DbConnection from '@/lib/db';
import {Product} from '@/app/models/productModel';
import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function GET(request, { params }) {
    try {
        await DbConnection();
        const { id } = params;
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Product not found",
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Product fetched successfully",
            status: 200,
            product: product
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


export async function PUT(request, { params }) {
    try {
      await DbConnection();
      const { id } = params;
  
      const formData = await request.formData();
  
      const title = formData.get("title");
      const description = formData.get("description");
      const price = formData.get("price");
      const stock = formData.get("stock");
      const imageFile = formData.get("image");
  
      if (!title || !description || !price || !stock) {
        return NextResponse.json({
          success: false,
          message: "All fields are required",
          status: 400,
        });
      }
  
      let imageUrl;
  
      if (imageFile && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
  
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
  
          stream.end(buffer);
        });
  
        imageUrl = result.secure_url;
      }
  
      // Prepare update object
      const updateData = {
        title,
        description,
        price,
        stock,
      };
  
      if (imageUrl) {
        updateData.image = imageUrl;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedProduct) {
        return NextResponse.json({
          success: false,
          message: "Product not found",
          status: 404,
        });
      }
  
      return NextResponse.json({
        success: true,
        message: "Product updated successfully",
        status: 200,
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({
        success: false,
        message: "Internal Server Error",
        status: 500,
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
