const Product = require("../models/productmodel");

const Addproduct = async (req, res) => {
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else{
        id=1;
    }
    try {
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            available:req.body.available
        });
        console.log(product);
        await product.save(); 
        console.log('Product saved'); 
        res.status(201).json({ 
            message: "Product is created",
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error in adding product:", error);
        res.status(500).json({
            message: "Server error while adding product",
            success: false,
        });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; 
        const deletedProduct = await Product.findOneAndDelete({ id: productId });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        console.log("Product removed");
        res.status(200).json({
            message: "Product is removed",
            success: true,
            name: deletedProduct.name,
        });
    } catch (error) {
        console.error("Error in deleting product:", error);
        res.status(500).json({
            message: "Server error while deleting product",
            success: false,
        });
    }
};



const getProuct=async(req,res)=>{
    try {
        const products=await Product.find({})
        console.log("all products have been fetched");
        res.send(products)
    } catch (error) {
        console.log(error);
    }
}


module.exports = { Addproduct,deleteProduct , getProuct};
