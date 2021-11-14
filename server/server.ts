import express from 'express';
import dotenv from 'dotenv';
import { transactionRouter } from './routes/transaction/transactionRoute';
import { customerRouter } from './routes/customer/customerRoute';

dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/transaction', transactionRouter);
app.use('/api/customer', customerRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
