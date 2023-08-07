import ProductManger from '../ProductMananger.js';
import {Router} from 'express';

const router = Router();

const productManager = new ProductManger("./products.json");

router.get('/products', async (req, res) => {

    const limit = parseInt(req.query.limit);

    const products = await productManager.sendProducts();

    if (!limit || !limit == Number) {

        return res.send({ productsSended: products })
    }

    const limitProducts = products.slice(0, limit);

    return res.send({ products: limitProducts });


});

router.get('/:id', async (req, res) => {

    const idProduct = parseInt(req.params.id);

    const productid = await productManager.getProductsById(idProduct);

    if (!productid) return (res.status(400).send({ error: "Product no founded" }))

    return res.send({ productFinded: productid })

}
);

router.post('/', async(req,res)=>{

    const products = await productManager.sendProducts();
    
    const productAdded=req.body;
    
    const productDouble= await products.find(prod=>prod.code === productAdded.code);
    
    if(productDouble){
        return res.status(400).send({error:"El producto que intenta agregar ya ha sido creado"})
}
    
    console.log(productDouble);
        res.send(await productManager.addProduct(req.body));
});

router.put('/:id', async (req,res)=>{

    const idProduct = parseInt(req.params.id);
    
    res.send(await productManager.updateProduct(idProduct,req.body));
});
    
router.delete('/:id', async (req,res)=>{
    
    const products = await prodManger.sendProducts();
    
    const idProduct = parseInt(req.params.id);
    
    const confirmDelete=products.find(prod=>prod.id == idProduct)
    
    if(!confirmDelete) return res.status(400).send({error:"product not found"})
    
    res.send(await productManager.deletProduct(idProduct));
})
    
export default router;