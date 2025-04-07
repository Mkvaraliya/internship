"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {push} = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !price || !stock || !description) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      //create FormData and append fields
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("description", description);
      formData.append("image", image);

      // Send POST request to your API endpoint
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (res.data.success) {
        setSuccess("Product created successfully!");
        // Clear form fields
        setTitle("");
        setPrice("");
        setStock("");
        setDescription("");
        setImage(null);
        push("/admin/products");
      } else {
        setError(res.data.message || "Failed to create product.");
      }

    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Product</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
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

        {/* File Input For Image */}
        <div>
          <label className="block text-gray-700 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></input>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
