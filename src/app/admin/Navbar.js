"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, checkAuth } = useAuth();
  const router = useRouter();
  
  const logout = async() => {
    try{
      await axios.post("/api/auth/logout", {}, {withCredentials: true});
      setIsLoggedIn(false); 
      window.location.href = "/admin/products";
      router.push("/admin/auth/login");
    }catch(error){
      console.log("Logout failed:", error.response?.data?.message || error.message);
    }
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <ul className="flex space-x-4">
        <li>
          <Link href="/admin/products" className="hover:text-gray-400">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="hover:text-gray-400">
            Users
          </Link>
        </li>
      </ul>
      <div className="flex gap-3 items-center">
        {
          !isLoggedIn && (
            <>
              <Link href="/admin/auth/register" className="bg-green-500 px-5 py-2 rounded">Register</Link>
              <Link href="/admin/auth/login" className="bg-blue-500 px-5 py-2 rounded">Login</Link>
            </>
          )
        }

        {
          isLoggedIn && (
            <button onClick={logout} className="bg-red-500 px-5 py-2 rounded cursor-pointer ">Logout</button>
          )
        }
        
      </div>
    </nav>
  );
};

export default Navbar;
