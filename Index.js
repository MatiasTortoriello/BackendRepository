import ProductManger from './src/ProductMananger.js';
import express from 'express';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const productOne = new ProductManger("./products.json");



app.get('/products', async (req, res) => {

    const limit = parseInt(req.query.limit);

    const products = await productOne.sendProducts();

    if (!limit || !limit == Number) {

        return res.send({ products })
    }

    const limitProducts = products.slice(0, limit);

    return res.send({ products: limitProducts });


});



app.get('/products/:pid', async (req,res)=>{

    const idProduct=parseInt(req.params.pid);

    const products = await productOne.sendProducts();

    let product=products.find(prod=>prod.id == idProduct);

    if(!product) return (res.send({error:"Product no founded"}))

    return res.send({productFinded:product})

    }
);



const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor arriba en el puerto ${PORT}`);
})