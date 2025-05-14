const productService = require("../services/productService");
const { handleErrorResponse } = require("../utils/errorHandler");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const productData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { term } = req.query;
    console.log(term)
    const products = await productService.searchProducts(term);
    res.status(200).json(products);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
