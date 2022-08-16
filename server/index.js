import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { products } from './src/product/data';
import userRouter from './src/user/userRouter';
import orderRouter from './src/order/orderRouter';

dotenv.config();
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => { console.log('DB is started') })


const app = express()
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter)

app.use('/orders', orderRouter)

app.get('/products', (req, res) => {
  res.send(products)
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server starting on port:`, port)
});