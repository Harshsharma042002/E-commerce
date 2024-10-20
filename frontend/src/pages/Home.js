import React, { useState, useEffect } from 'react';
import homeimg from '../assests/home.jpg';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assests/slide.jpg';
import img2 from '../assests/slide2.jpg';
import img3 from '../assests/slide3.jpg';
import img4 from '../assests/slide4.jpg';
import img5 from '../assests/slide5.jpg';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const slide = [img, img2, img3, img4, img5];
  const [currIndex, setCurrIndex] = useState(0);
  const [products, setProducts] = useState([]);

  const prevSlide = () => {
    const isFirstSlide = currIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currIndex - 1;
    setCurrIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currIndex + 1;
    setCurrIndex(newIndex);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/getProduct');
      const allProducts = response.data;
      
      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
      setProducts(shuffledProducts.slice(0, 6)); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative flex flex-row h-[40rem] items-center justify-between border-2 border-black mt-4 rounded-lg shadow-lg m-1.5">
        <div className='w-full h-full bg-cover' style={{ backgroundImage: `url(${homeimg})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className='relative z-10 flex flex-col items-center justify-center h-full'>
            <h1 className='text-6xl font-bold mb-6 absolute top-5 text-white'>WELCOME to our E-COM</h1>
            <button 
              onClick={() => navigate('/product')} 
              className='text-white bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer absolute top-5 left-[85%]'>
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className='border-2 border-black m-2 h-[38rem] relative'>
        <div style={{ backgroundImage: `url(${slide[currIndex]})` }} className='m-2 w-auto h-[35rem] bg-cover bg-center rounded-3xl'>
        </div>
        <div className='absolute top-[50%] left-5 -translate-y-1/2 text-2xl text-white cursor-pointer'>
          <ArrowCircleLeftIcon fontSize='large' onClick={prevSlide} />
        </div>
        <div className='absolute top-[50%] right-5 -translate-y-1/2 text-2xl text-white cursor-pointer'>
          <ArrowCircleRightIcon fontSize='large' onClick={nextSlide} />
        </div>
      </div>

      <div className='bg-pink-300 m-3 p-3'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='bg-white p-4 rounded-lg shadow-md'>
              <img src={product.image} alt={product.name} className='h-40 w-full object-cover mb-2 rounded-lg' />
              <h2 className='text-xl font-bold'>{product.name}</h2>
              <p className='text-lg font-medium'>${product.price}</p>
              <button 
                onClick={() => navigate(`/product/${product.id}`)} 
                className='mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-gray-800 text-white p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Column 1: Quick Links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
            <ul>
              <li className='mb-2'>
                <Link to='/' className='hover:text-gray-400'>Home</Link>
              </li>
              <li className='mb-2'>
                <Link to='/about' className='hover:text-gray-400'>About Us</Link>
              </li>
              <li className='mb-2'>
                <Link to='/product' className='hover:text-gray-400'>Products</Link>
              </li>
              <li className='mb-2'>
                <Link to='/cart' className='hover:text-gray-400'>Cart</Link>
              </li>
              <li className='mb-2'>
                <Link to='/signup' className='hover:text-gray-400'>Signup</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Contact Us</h3>
            <p>Phone: 9500007608</p>
            <p>Email: harshu042002@gmail.com</p>
            <p className='mt-4'>
              <Link to='/contact' className='hover:text-gray-400'>Contact Page</Link>
            </p>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Follow Us</h3>
            <ul className='flex space-x-4'>
              <li>
                <a href="https://www.linkedin.com/in/harshsharma04" target='_blank' rel='noreferrer' className='hover:text-gray-400'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/Harshsharma042002" target='_blank' rel='noreferrer' className='hover:text-gray-400'>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target='_blank' rel='noreferrer' className='hover:text-gray-400'>
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='text-center mt-8'>
          <p>&copy; 2024 E-Commerce. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
