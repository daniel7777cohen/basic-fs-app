import express from 'express';
import Transaction from '../../models/Transaction';
import { Request, Response } from 'express';
const transactionRouter = express.Router();

transactionRouter.get('/', async (req: Request, res) => {});

transactionRouter.post('/', async (req, res) => {
  try {
    validateAddTransaction(req, res);

    const transaction = new Transaction({
      ...req.body,
    });

    await transaction.save();

    res.status(200).send(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

transactionRouter.put('/:transaction_id', async (req, res) => {});

transactionRouter.delete('/:transaction_id', async (req, res) => {});

const validateAddTransaction = (req: Request, res: Response) => {
  //basic validation for request
  if (!req.body) {
    throw new Error('error- request has no body');
  }

  const { customer_id, total_price, currency, credit_card_type, credit_card_number } = req.body;
  if (!customer_id || !total_price || !currency || !credit_card_type || !credit_card_number) {
    throw new Error('error- missing credentials on request');
  }
};

export default transactionRouter;
