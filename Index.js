import express from 'express';
import products from './src/routes/products.js';
import carts from './src/routes/carts.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', products);

const PORT = 8080;


app.listen(PORT, () => {
    console.log(`Servidor arriba en el puerto ${PORT}`);
})

