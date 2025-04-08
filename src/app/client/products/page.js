"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const { isLoggedIn, checkAuth } = useAuth();
  const router = useRouter();

  const getData = async () => {
    const request = await axios.get("/api/products");
    const response = request.data;
    setProduct(response.products);
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = async (id) => {
    await checkAuth(); // Ensure latest auth status

    if (!isLoggedIn) {
      toast.error("Please login to add items to cart.");
      router.push("/client/auth/login");
      return;
    }

    try {
      const res = await axios.post("/api/cart", { productId: id });
      if (res.status === 200 || res.status === 201) {
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.log("Add to cart error", error);
      toast.error("Something went wrong while adding to cart.");
    }
  };

  return (
    <div className="w-full bg-slate-100 py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {product.map((products) => (
          <div
            key={products._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:bg-gray-200 transition"
          >
            <img
              className="w-full h-48 object-cover rounded"
              src={products.image}
              alt={products.title}
            />
            <h2 className="mt-3 text-lg font-semibold text-center">
              {products.title}
            </h2>
            <p className="text-gray-600 text-sm mt-1 text-center line-clamp-2">
              {products.description}
            </p>
            <p className="text-red-500 font-bold text-lg mt-2">
              ₹{products.price}
            </p>
            <button
              onClick={() => addToCart(products._id)}
              className="mt-3 bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-md w-full transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
