import React from 'react';
import Sidebar from '../components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from '../components/AddProduct';
import ListProduct from '../components/ListProduct';

const Admin = () => {
  return (
    <div className="flex"> 
      <Sidebar />
      <div className="flex-grow ml-5"> 
        <Routes>
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/getProduct' element={<ListProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
