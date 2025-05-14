const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts() {
    return await productRepository.getAllProducts();
  }

  async getProductById(id) {
    return await productRepository.getProductById(id);
  }

  async createProduct(productData) {
    this.validateProductData(productData);
    

    productData.price = parseFloat(productData.price);
    
    return await productRepository.createProduct(productData);
  }

  async searchProducts(term) {
    if (!term || typeof term !== 'string') {
      throw new Error('Search term must be a non-empty string');
    }
    
    return await productRepository.searchProducts(term);
  }

  validateProductData(productData) {
    const { name, price, description } = productData;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Product name is required');
    }
    
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      throw new Error('Product price must be a positive number');
    }
    
    if (!description || typeof description !== 'string' || description.trim() === '') {
      throw new Error('Product description is required');
    }
  }
}

module.exports = new ProductService();