import fs from 'fs';

class CartManager {

    constructor(path) {
        this.id = 0;
        this.products = [];
        this.path = path;
    }

    async sendCarts() {

        try {
            const carts = await fs.promises.readFile(this.path, "utf-8");

            return JSON.parse(carts);
        } catch (error) {
            console.error(error);

            return [];
        }
    }

//--------------------------------------------------------------------------

    async addCart() {

        const carts = await this.sendCarts();

        const cartsLength = carts.length;

        const newCart = {

            id: cartsLength > 0 ? carts[cartsLength - 1].id + 1 : 1,
            products:[]
        }

        carts.push(newCart);

        this.products = carts;

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));

            console.log("Producto agregado correctamente!");
        } catch (e) {
            console.error("Error al crear el producto\n", e);
        }

    }

//--------------------------------------------------------------------------

    async addProductCart(id,product){

        const carts = await this.sendCarts();

        const cartFilter=carts.findIndex(prod=>prod.id == id);

        const filtrado2=carts[cartFilter].products.findIndex(prod=>prod.prod == product.prod);
        
        if(filtrado2 == -1 || filtrado2== undefined){
            for (let key in carts) {

                if(carts[key].id == id){
                    carts[key].products.push(product);
                }
                    
            };
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
            console.log("Producto Agregado!");
            
        } catch (e) {
            console.error("Error al Agregar el producto\n", e);
        }
        
        if(filtrado2 !== -1){

            carts[cartFilter].products[filtrado2].quantity++;
        }

            try {
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
                    console.log("Producto Agregado!");
                    
                } catch (e) {
                    console.error("Error al Agregar el producto\n", e);
                }
}

//--------------------------------------------------------------------------

    getCartById(id) {

        const carts = fs.readFileSync(this.path, "utf-8");

        const search = JSON.parse(carts).find(cart => cart.id == id);

        return search
    }
}

export default CartManager