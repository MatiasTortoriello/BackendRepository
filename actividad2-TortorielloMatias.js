const fs=require("fs");
const { title } = require("process");

class ProductManager {

    constructor(path) {

      this.products = [];
      this.path=path;

    }
  
    async addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {

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

      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

        console.log("Producto agregado correctamente!");
      } catch(e) {
        console.error("Error al crear el producto\n", e);
      }

    }
  
    getProducts() {
      return this.products;
    }

    async sendProducts(){
        
      try {
          const products = await fs.promises.readFile(this.path, "utf-8");
          
          return JSON.parse(products);
      } catch (error) {
          console.error(error);
          
          return this.products;
      }
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        throw Error(`Product with ID ${id} not found`);
      }
    }

    updateProduct(changeId, changeKey, newValue){

        const findProduct =  this.products.find(prod=>prod.id === changeId);

        const findProp = Object.keys(findProduct).find(key=>key == changeKey);
      
        findProduct[findProp]=  newValue;

    }

    async deletProduct(id){

      const dataProds= await this.sendProducts();
  
      const productForDelete=dataProds.findIndex(prod=>prod.id == id);
  
    if(productForDelete == -1) {
      return console.error("Not found");
    }
  
    const findedProduct= await dataProds[productForDelete];
  
    dataProds.splice(productForDelete,1);
  }

}

  //------------------------------------
  
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