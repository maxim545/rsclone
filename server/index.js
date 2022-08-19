import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './src/user/userRouter';
import orderRouter from './src/order/orderRouter';
import productRouter from './src/product/productRouter';
import imageRouter from './src/product/imageRouter';

dotenv.config();
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(() => { console.log('DB is started'); });

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', imageRouter);

app.use('/users', userRouter);

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.listen(port, () => {
  console.log('Server starting on port:', port);
});
