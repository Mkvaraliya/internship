"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const { push } = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        const product = res.data.product;

        setTitle(product.title);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
      } catch (err) {
        setError("Error fetching product details.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !stock || !description) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const res = await axios.put(`/api/products/${id}`, {
        title,
        price,
        stock,
        description,
      });

      if (res.data.success) {
        setSuccess("Product updated successfully!");
        push("/admin/products"); // Redirect after update
      } else {
        setError(res.data.message || "Failed to update product.");
      }
    } catch (err) {
      setError("An error occurred while updating the product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price (INR)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium">Stock Quantity</label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
