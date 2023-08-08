import { Router } from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../CartMananger.js";

const prodManger = new ProductManager("./products.json");
const cartManager= new CartManager("./carrito.json");

const router = Router();

router.post('/', async (req,res)=>{

    const carts= await cartManager.sendCarts();
    const cartFile=await cartManager.addCart();
    
    return res.send({result:"Cart created"});
    });

router.post('/:cid/product/:pid', async(req,res)=>{

    const carts= await cartManager.sendCarts();
    const products = await prodManger.sendProducts();
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
        
    const findProduct= await prodManger.getProductsById(idProduct);
    const producForAdd={prod:findProduct.id,quantity:1};
        
    res.status(200).send( await cartManager.addProductCart(idCart,producForAdd));
    });
            
router.get('/:cid',async (req,res)=>{

    const idCart = parseInt(req.params.cid);
    
    const cartfind = await cartManager.getCartById(idCart);
    
    if (!idCart || !cartfind) return (res.status(400).send({ error: "Cart no founded" }))
    
    return res.send({ cartFinded: cartfind })
})


export default router;