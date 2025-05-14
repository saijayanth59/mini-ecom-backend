class Product {
    constructor(id, name, price, description, imageUrl, createdAt) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl;
      this.createdAt = createdAt;
    }
  
    static fromDb(dbRow) {
      return new Product(
        dbRow.id,
        dbRow.name,
        dbRow.price,
        dbRow.description,
        dbRow.image_url,
        dbRow.created_at
      );
    }
  }
  
  module.exports = Product;