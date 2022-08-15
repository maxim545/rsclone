import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

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


app.listen(port, () => {
  console.log(`Server starting on port:`, port)
});