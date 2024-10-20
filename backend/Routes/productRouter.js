const express=require('express');
const { Addproduct, deleteProduct, getProuct } = require('../controllers/productcontroller');
const isAuthenticated = require('../middleware/isAuthenticated');
const ProdRouter=express.Router();

ProdRouter.route('/addProduct').post(Addproduct)
ProdRouter.route('/deleteProduct/:id').delete(deleteProduct)
ProdRouter.route('/getProduct').get(getProuct)


module.exports=ProdRouter