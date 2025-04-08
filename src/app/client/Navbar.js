"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      router.push("/client/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      console.log("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          E-Commerce
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link className="hover:text-gray-300" href="/client/products/">
            Products
          </Link>
          <Link className="hover:text-gray-300" href="/">
            About Us
          </Link>
          <Link className="hover:text-gray-300" href="/">
            Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/client/cart/"
            className="bg-red-600 hover:bg-red-500 px-4 py-1 rounded text-lg"
          >
            Cart
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-600 hover:bg-yellow-500 px-4 py-1 rounded text-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/client/auth/login"
                className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded text-lg"
              >
                Login
              </Link>
              <Link
                href="/client/auth/register"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1 rounded text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 text-white px-4 py-4 space-y-4">
          <Link
            className="block hover:text-gray-300"
            href="/client/products/"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link className="block hover:text-gray-300" href="/" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link className="block hover:text-gray-300" href="/" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
          <Link
            href="/client/cart/"
            className="block bg-red-600 hover:bg-red-500 px-4 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block bg-yellow-600 hover:bg-yellow-500 w-full text-left px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/client/auth/login"
                className="block bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/client/auth/register"
                className="block bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
