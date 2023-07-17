class ProductManager {

    constructor() {

      this.products = [];

    }
  
    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {

      let newId;
  
      if (this.products.length === 0) {

        newId = 1;

      } else {

        newId = this.products[this.products.length - 1].id + 1;
        
      }
  
      const codeExists = this.products.some((product) => product.code === newCode);
      if (codeExists) {
        console.log(`${newCode} already exists! Try another code`);
      } else {

        this.products.push({
          id: newId,
          title: newTitle,
          description: newDescription,
          price: newPrice,
          thumbnail: newThumbnail,
          code: newCode,
          stock: newStock,
        });
      }
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        throw Error(`Product with ID ${id} not found`);
      }
    }
  }
  
  let title = "Product1";
  let description = "Test product";
  let price = 200;
  let thumbnail = "noImage";
  let code = "ABC123";
  let stock = true;
  
  const productManager1 = new ProductManager();
  
  productManager1.addProduct(title, description, price, thumbnail, code, stock);
  
  const allProducts = productManager1.getProducts();
  console.log(allProducts);