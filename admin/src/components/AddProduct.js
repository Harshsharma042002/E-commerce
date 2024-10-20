import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

const AddProduct = () => {
  const [image, setImage] = useState(null); 
  const [productDetails, setProductDetails] = useState({
    name: "", 
    category: "cloth", 
    price: "", 
    available: false, 
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const availabilityHandler = (e) => {
    setProductDetails({ ...productDetails, available: e.target.checked });
  };

  const AddProduct = async () => {
    console.log(productDetails);

    let formData = new FormData();
    formData.append('product', image);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const responseData = response.data; 

      if (responseData.success) {
        const updatedProduct = {
          ...productDetails,
          image: responseData.image_url
        };
        console.log(updatedProduct); 
        
        try {
          const productResponse = await axios.post(
            'http://localhost:8000/products/addProduct', 
            updatedProduct,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          productResponse.data.success ? alert("Product added") : alert("Product not added");
        } catch (error) {
          console.log("Error adding product:", error);
        }
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='m-5 p-6 bg-slate-200 shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Add Product</h2>
      
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1'>Product Title</label>
        <input 
          value={productDetails.name} 
          onChange={changeHandler}
          type='text' 
          name='name' 
          placeholder='Type here' 
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1'>Product Price</label>
        <input 
          value={productDetails.price} 
          onChange={changeHandler}
          type='number' 
          name='price' 
          placeholder='Type here' 
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1'>Category</label>
        <select 
          value={productDetails.category} 
          onChange={changeHandler}
          name='category' 
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='cloth'>Cloth</option>
          <option value='shoes'>Shoes</option>
          <option value='health'>Health</option>
          <option value='gadgets'>Gadgets</option>
          <option value='personal'>Personal</option>
          <option value='accessories'>Accessories</option>
        </select>
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium mb-1'>Available</label>
        <input 
          type="checkbox" 
          checked={productDetails.available} 
          onChange={availabilityHandler}
        /> Is the product available?
      </div>
      <div className='mb-4'>
        <label htmlFor='file-input' className='flex items-center cursor-pointer'>
          {image ? (
            <img 
              src={URL.createObjectURL(image)} 
              alt='Preview' 
              className='mr-2 w-32 h-32 object-cover border border-gray-300 rounded-lg' 
            />
          ) : (
            <FaCloudUploadAlt className='text-3xl mr-2' />
          )}
          <span className='text-sm font-medium'>Upload Image</span>
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button onClick={AddProduct}
        className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
      >
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
