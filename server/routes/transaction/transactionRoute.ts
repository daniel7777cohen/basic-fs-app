import express from 'express';
import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';
import Customer from '../../models/Customer';
import { getProcessedTransactions } from '../utils/transaction-utils';
import { TransactionsDbResponse } from '../../common/types';

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
    return res.status(200).json({ processedTransactions, message: 'success' });
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

    const populatedTransaction = await Transaction.findById(transaction._id)
      .populate({
        path: 'customer_id',
        select: '-transactions -__v',
      })
      .lean();

    const processedTransaction = getProcessedTransactions([populatedTransaction]);

    return res.status(200).json({ processedTransaction, message: 'success' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

transactionRouter.put('/', async (req, res) => {
  try {
    await validateUpdateParams(req, res);
    const transactionsDbResponse = await getTransactionsByIds(req.body.transaction_ids);

    if (hasDeletedTransaction(transactionsDbResponse)) {
      throw new Error('cannot update deleted transaction. transactions failed');
    }

    const { field, newValue } = req.body;
    const updatedTransactions = await applyTransactionUpdate(transactionsDbResponse, field, newValue);
    if (!updatedTransactions.acknowledged) {
      throw new Error(`Error - unable to set ${newValue}`);
    }

    res.status(200).json({ ...updatedTransactions, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@deprecated
transactionRouter.delete('/', async (req, res) => {
  try {
    const response = await deleteTransactions(req.body.transaction_ids);
    res.status(200).json({ response, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteTransactions = async (transaction_ids: string[]) => {
  const response = await Transaction.deleteMany({
    _id: {
      $in: transaction_ids,
    },
  });
  return response;
};

const validateAddTransaction = async (req: Request, res: Response) => {
  //basic validation for request
  if (!req.body) {
    throw new Error('error- request has no body');
  }

  const { customer_id, total_price, currency, credit_card_type, credit_card_number } = req.body;
  if (!customer_id || !total_price || !currency || !credit_card_type || !credit_card_number) {
    throw new Error('error- missing credentials on request!!');
  }

  const user = await Customer.findById(customer_id);
  if (!user) {
    throw new Error('error- user not found in db');
  }

  if (user.is_deleted) {
    throw new Error('error- user is not active');
  }
};

const validateUpdateParams = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new Error('error- request has no body');
  }

  const { field, newValue, transaction_ids } = req.body;
  if (!field || !newValue || !transaction_ids) {
    throw new Error('error- missing credentials on request');
  }

  /*
  field validation - field must be an editable field,
  transaction_id/credit_card_number for example, is forbidden
  */
};

const getTransactionsByIds = async (transaction_ids: string[]) => {
  const transactions = await Transaction.find({ _id: { $in: transaction_ids } });
  if (transactions?.length === transaction_ids.length) {
    return transactions;
  } else {
    throw new Error('error finding transactions in db');
  }
};

const hasDeletedTransaction = (transactions: TransactionsDbResponse[]) => {
  return transactions.some((trs) => trs.is_deleted);
};

const applyTransactionUpdate = async (
  transaction_ids: string[],
  field: string,
  newValue: string | number
) => {
  const updates = {} as { [key: string]: number | string };
  updates[field] = newValue;
  const response = await Transaction.updateMany(
    {
      _id: {
        $in: transaction_ids,
      },
    },
    {
      $set: updates,
    }
  );

  return response;
};

export default transactionRouter;
