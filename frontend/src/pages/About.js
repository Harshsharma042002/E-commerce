import React from 'react';
import img1 from '../assests/about.jpg';
import img2 from '../assests/delivery.jpg';
import img3 from '../assests/team.jpg';
import img4 from '../assests/warehouse.jpg';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div className='border-4 border-black p-8 max-w-6xl mx-auto rounded-lg shadow-lg mt-5'>
      <h1 className='text-4xl font-bold text-center mb-8'>ABOUT US</h1>
      <div>
        <div className='flex flex-col md:flex-row md:items-center mb-8'>
          <img src={img1} alt='About Us' className='h-96 rounded-xl mb-4 md:mb-0 md:mr-5' />
          <p className='font-medium text-lg'>
            Welcome to your trusted destination for high-quality products and exceptional service. Founded with a passion for innovation and customer satisfaction, we pride ourselves on offering a diverse range of carefully curated items that meet the needs of our ever-growing community. At our E-com, we believe that shopping should be seamless, enjoyable, and accessible, which is why we continually strive to enhance your experience through cutting-edge technology, secure transactions, and reliable customer support. Whether you’re here to discover the latest trends or find that perfect product, our mission is to ensure your complete satisfaction with every purchase. Thank you for choosing us as your preferred online shopping partner.
          </p>
        </div>
        <div className='flex flex-col md:flex-row md:items-center mb-8'>
          <p className='font-medium text-lg mb-4 md:mb-0 md:mr-5 hidden md:block'>
            At E-com, we understand that time is of the essence. That’s why we are committed to providing faster delivery options to ensure you receive your orders when you need them. With our extensive network of shipping partners, we proudly serve customers in numerous countries, making it easier than ever for you to shop from anywhere in the world. Our streamlined logistics and efficient processes guarantee quick and reliable service, so you can enjoy a hassle-free shopping experience. Choose [Your Company Name] for not just great products, but also a commitment to swift, dependable service every time you shop with us.
          </p>
          <img src={img2} alt='Delivery Service' className='hidden md:block h-96 rounded-xl' />
        </div>
        <div className='flex flex-col md:flex-row md:items-center mb-8'>
          <img src={img3} alt='Our Team' className='h-96 rounded-xl mb-4 md:mb-0 md:mr-5' />
          <p className='font-medium text-lg'>
            At E-com, we take pride in having the best team dedicated to meeting and exceeding your customer needs. Our commitment to leveraging the latest technology allows us to deliver exceptional service and streamline processes, ensuring a seamless shopping experience for you. We understand that each customer is unique, and our skilled professionals are always available to provide prompt and reliable support, whether you have questions about our products, need assistance with your order, or require tailored recommendations. Our focus on continuous improvement drives us to enhance our services and improve efficiency, making your experience with us not just satisfactory but truly enjoyable. At E-com, your satisfaction is our top priority, and we are here to support you every step of the way.
          </p>
        </div>
        <div className='flex flex-col md:flex-row md:items-center mb-8'>
          <p className='font-medium text-lg mb-4 md:mb-0 md:mr-5 hidden md:block'>
            At E-com, we operate from a spacious warehouse designed to meet the growing demands of our business. Our extensive facility ensures we have the capacity to store a wide variety of products, allowing for seamless scalability as we expand our offerings. We prioritize security, implementing advanced measures to safeguard our inventory and ensure the safety of our operations. Our dedicated team of skilled workers is committed to maintaining high standards of organization and efficiency, enabling us to process orders swiftly and accurately. With our robust warehouse infrastructure, we are well-equipped to handle the complexities of e-commerce logistics, ensuring that you receive your orders on time and in perfect condition.
          </p>
          <img src={img4} alt='Warehouse' className='hidden md:block h-96 rounded-xl' />
        </div>
      </div>

      <div className='text-center'>
        <p className='mb-4 font-bold text-lg'>Check out our latest products by clicking on the button</p>
        <button 
          onClick={() => { navigate('/product'); }} 
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          Our Products
        </button>
      </div>
    </div>
  );
};

export default About;
