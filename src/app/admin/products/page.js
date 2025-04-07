"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";



const ProductsPage = () => {
    const [product, setProduct] = useState([]);
    const { push } =useRouter()

    const getData = async() => {
        const request = await axios.get("/api/products");
        const response = await request.data;
        console.log(response.products);
        setProduct(response.products);
    }

    useEffect(()=>{
        getData();
    },[]);

    const handleDelete = async (id) => {
        try{
            await axios.delete(`/api/products/${id}`);
            await getData();  
        }catch(error){
            console.error("Error Deleting product:", error);
        }
    }

    const handleEdit = (id) => {
        push(`/admin/products/editProduct/${id}`);
      };

    return (
        <div className=' w-[90%]  mt-10 m-auto rounded shadow  '>
            <div className="flex justify-between items-center p-4 bg-slate-800  text-white shadow-md rounded-t-lg"
            >
                <h2 className="text-xl font-semibold">Product List</h2>
                <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" href="/admin/products/createProduct" >
                    + Create Product
                </Link>
            </div>
            <table className="w-full border-collapse">
                {/* Table Header */}
                <thead className="bg-slate-500 text-white">
                    <tr>
                        <th className="p-4 text-left">#</th>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-left">Description</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-gray-700">
                    {product.map((products, index) => (
                        <tr
                            key={products._id}
                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-gray-200`}
                        >
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">{products.title}</td>
                            <td className="p-4">
                                <img
                                    src={products.image}
                                    alt={products.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </td>
                            <td className="p-4 font-semibold">Rs {products.price}</td>
                            <td className="p-4">{products.stock}</td>
                            <td className="p-4">{products.description}</td>
                            <td className="p-4 flex space-x-2">
                                <button onClick={() => { handleEdit(products._id)}} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button onClick={() => { handleDelete(products._id)}} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsPage
