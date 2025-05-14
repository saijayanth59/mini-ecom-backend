const db = require('../config/database');
const Product = require('../models/product');

class ProductRepository {
  async getAllProducts() {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    const { rows } = await db.query(query);
    return rows.map(Product.fromDb);
  }

  async getProductById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows.length ? Product.fromDb(rows[0]) : null;
  }

  async createProduct(productData) {
    const { name, price, description, imageUrl } = productData;
    
    const query = `
      INSERT INTO products (name, price, description, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    
    const values = [name, price, description, imageUrl || null];
    const { rows } = await db.query(query, values);
    
    return Product.fromDb(rows[0]);
  }

  async searchProducts(term) {
    const query = `
      SELECT * FROM products 
      WHERE 
        name ILIKE $1 OR 
        description ILIKE $1
      ORDER BY created_at DESC
    `;
    
    const { rows } = await db.query(query, [`%${term}%`]);
    return rows.map(Product.fromDb);
  }
}

module.exports = new ProductRepository();