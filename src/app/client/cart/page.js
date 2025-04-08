"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CartPage = () => {
  const { isLoggedIn, checkAuth } = useAuth();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (authChecked && isLoggedIn === false) {
      router.push("/client/auth/login");
    }
  }, [authChecked, isLoggedIn]);

  useEffect(() => {
    if (authChecked && isLoggedIn) {
      const fetchCart = async () => {
        try {
          const res = await axios.get("/api/cart", { withCredentials: true });
          setCartItems(res.data.items);
        } catch (error) {
          console.log("Error Fetching cart:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCart();
    }
  }, [authChecked, isLoggedIn]);

  if (!authChecked || isLoading) {
    return <p className="text-center mt-10">Loading Cart...</p>;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const gst = +(subtotal * 0.28).toFixed(2);
  const shipping = 200;
  const grandTotal = subtotal + gst + shipping;

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen">
      {/* Left: Cart Details */}
      <div className="w-full lg:w-[70%] bg-white px-6 py-8">
        <div className="flex justify-between items-center text-2xl font-bold mb-6">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items</p>
        </div>

        <div className="border-t border-red-400 mb-4"></div>

        <div className="grid grid-cols-4 gap-4 text-gray-700 font-medium text-base mb-3">
          <p className="col-span-2">Product Details</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 items-center border-b py-4"
          >
            {/* Product Info */}
            <div className="col-span-2 flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold">{item.product.title}</h2>
                <p className="text-sm text-red-500">{item.product.description}</p>
                <button className="text-sm text-gray-500 hover:underline mt-2">
                  Remove
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button className="text-lg px-2">-</button>
              <span>{item.quantity}</span>
              <button className="text-lg px-2">+</button>
            </div>

            {/* Total */}
            <div>
              Rs {item.product.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-[30%] bg-pink-50 px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="border-t border-red-400 mb-4"></div>

        <div className="flex justify-between py-2 text-gray-700">
          <span>Subtotal</span>
          <span>Rs {subtotal}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>GST (28%)</span>
          <span>Rs {gst}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>Shipping</span>
          <span>Rs {shipping}</span>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>Rs {grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
