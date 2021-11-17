import express from 'express';
import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';
import Customer from '../../models/Customer';
import { getProcessedTransactions } from '../utils/transaction-utils';
const transactionRouter = express.Router();

transactionRouter.get('/', async (req: Request, res) => {
  try {
    const transactionsDbResponse = await Transaction.find({})
      .populate({
        path: 'customer_id',
        select: '-transactions -__v',
      })
      .lean();

    const processedTransactions = getProcessedTransactions(transactionsDbResponse);
    return res.status(200).json({ processedTransactions, msg: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

transactionRouter.post('/', async (req, res) => {
  try {
    await validateAddTransaction(req, res);

    const transaction = new Transaction({
      ...req.body,
    });

    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

transactionRouter.put('/:transaction_id', async (req, res) => {});

transactionRouter.delete('/', async (req, res) => {
  try {
    /*
  --validateRequest--
  *body
  *params
  *make sure transaction_id exists at db
*/
    await deleteTransactions(req.body.transaction_ids);
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const validateAddTransaction = async (req: Request, res: Response) => {
  //basic validation for request
  if (!req.body) {
    throw new Error('error- request has no body');
  }

  const { customer_id, total_price, currency, credit_card_type, credit_card_number } = req.body;
  if (!customer_id || !total_price || !currency || !credit_card_type || !credit_card_number) {
    throw new Error('error- missing credentials on request');
  }

  const user = await Customer.findById({ customer_id });
  if (!user) {
    throw new Error('error- user not found in db');
  }
};

const deleteTransactions = async (transaction_ids: string[]) => {
  await Transaction.updateMany(
    {
      _id: {
        $in: transaction_ids,
      },
    },
    {
      $set: {
        is_deleted: true,
      },
    }
  );
};

export default transactionRouter;
