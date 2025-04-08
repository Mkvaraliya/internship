export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import DbConnection from "@/lib/db";
import { Cart } from "@/app/models/cartModel";
import { Product }  from "@/app/models/productModel";
import { getUserFromToken } from "@/lib/verifyUser";
import { cookies } from "next/headers";
import mongoose from "mongoose";

// ✅ POST: Add Product to Cart
export async function POST(req) {
  await DbConnection();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = await getUserFromToken(token);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();
  const productObjectId = new mongoose.Types.ObjectId(productId);

  try {
    const product = await Product.findById(productObjectId);
    if (!product) {
      return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
    }

    const userId = new mongoose.Types.ObjectId(user.id);

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            product: productObjectId,
            quantity: 1,
          },
        ],
      });
    } else {
      const existingItem = cart.products.find(
        (p) => p.product.toString() === productObjectId.toString()
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.products.push({
          product: productObjectId,
          quantity: 1,
        });
      }
    }

    await cart.save();

    return NextResponse.json({ message: "Added to Cart", cart }, { status: 200 });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ GET: Fetch Cart
export async function GET(req) {
  await DbConnection();

  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const user = await getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = new mongoose.Types.ObjectId(user.id);
    console.log("Searching cart with userId:", userId);

    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    console.log("Cart from DB:", cart);

    return NextResponse.json({ items: cart?.products || [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
