import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'



const app = express()
const port = 3000;
app.use(cors());
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server starting on port:`, port)
});