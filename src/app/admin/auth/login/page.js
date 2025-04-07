"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const {setIsLoggedIn} = useAuth();
    const router = useRouter();
    // const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // useEffect(() => {
    //     const msg = searchParams.get("message");
    //     if(msg) {
    //         setError(msg);
    //     }
    // }, [searchParams]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("/api/auth/login", formData,{withCredentials: true});

            if (res.data.success) {
                setIsLoggedIn(true);
                setSuccess("Login successfully! Redirecting... ");
                // router.push("/admin/products");
                console.log("i am redirecting to products");
                setTimeout(() => {

                  router.push("/admin/products");
                },700)
            } else {
                setError(res.data.message || "Failed to Register User");
            }

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }finally {
            setLoading(false);
        }
        
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login Page</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
                
                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {loading ? "Logging..." : "Login"}
                </button>
            </form>
            <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link href="/admin/auth/register" className="text-blue-500 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
