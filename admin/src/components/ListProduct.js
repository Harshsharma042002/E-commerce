import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TbXboxX } from "react-icons/tb";

const ListProduct = () => {
    const [allProduct, setAllProduct] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products/getProduct');
            setAllProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/products/deleteProduct/${id}`);
            console.log(response.data); 
            await fetchInfo(); 
            response.data.success ? alert('product is removed') : alert("product is nod removed");  
        } 
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='m-4'>
            <h1 className='flex justify-center items-center text-4xl font-bold text-green-700'>ALL PRODUCTS</h1>
            <div className='flex flex-row justify-between mt-4 font-medium text-2xl'>
                <p className='flex-1 text-center'>Image</p>
                <p className='flex-1 text-center'>Title</p>
                <p className='flex-1 text-center'>Price</p>
                <p className='flex-1 text-center'>Category</p>
                <p className='flex-1 text-center'>Remove</p>
            </div>
            <hr className='my-2'/>
            {allProduct.map((product, index) => (
                <div key={index} className='flex flex-row items-center justify-between border-b py-2'>
                    <div className='flex flex-col items-center flex-1'>
                        <img src={product.image} alt={product.name} className='h-28 w-28 object-cover' />
                    </div>
                    <div className='flex flex-col items-center flex-1 font-medium '>
                        <p>{product.name}</p>
                    </div>
                    <div className='flex flex-col items-center flex-1 font-medium'>
                        <p>₹{product.price}</p>
                    </div>
                    <div className='flex flex-col items-center flex-1 font-medium'>
                        <p>{product.category}</p>
                    </div>
                    <div className='flex flex-col items-center flex-1 cursor-pointer hover:text-red-600'>
                        <TbXboxX 
                            onClick={() => removeProduct(product.id)} 
                            style={{ fontSize: 26 }} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListProduct;
