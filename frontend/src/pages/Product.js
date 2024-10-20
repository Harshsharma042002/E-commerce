import React, { useEffect, useState } from 'react';
import img from '../assests/slide2.jpg';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Product = () => {
    const { addToCart } = useCart(); 
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = ['cloth', 'shoes', 'gadgets', 'health', 'personal', 'accessories'];

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/products/getProduct');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category) {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='p-4'>
            <div className='flex flex-col items-center m-2'>
                <h1 className='text-center text-2xl text-red-600 font-bold mb-4'>All the products available right now</h1>
                <img src={img} alt='home' 
                     className='w-full md:w-[80%] lg:w-[90%] h-64 md:h-[28rem] rounded-2xl object-cover' 
                />
            </div>

            <div className='m-4 flex flex-col md:flex-row justify-center gap-4 items-center'>
                <h1 className='text-xl md:text-2xl font-bold'>Order the products by category:</h1>
                <select 
                    value={selectedCategory} 
                    onChange={handleCategoryChange} 
                    className='border border-gray-300 rounded p-2 w-full md:w-auto'
                >
                    <option value=''>All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-4'>
                {filteredProducts.map(product => (
                    <div key={product.id} className='border border-gray-300 rounded p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-4 rounded' />
                        <h2 className='font-bold text-xl md:text-2xl mt-2'>{product.name}</h2>
                        <p className='text-black text-lg md:text-xl font-medium'>Price: ${product.price}</p>
                        <button
                            onClick={() => addToCart(product)} 
                            className='mt-4 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-bold text-sm md:text-lg transition-colors duration-300'
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
