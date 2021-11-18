import express from 'express';
import Customer from '../../models/Customer';
import { Request, Response } from 'express';
import { getProcessedCustomers } from '../utils/customer-utils';

const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({}, { is_deleted: false }).lean();
    const processedCustomers = getProcessedCustomers(customers);
    res.status(200).json({ processedCustomers, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

customerRouter.post('/', async (req, res) => {
  try {
    validateRequest(req, res);

    const customer = new Customer({
      ...req.body,
    });

    await customer.save();

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

customerRouter.put('/:customer_id', async (req, res) => {});

customerRouter.delete('/:customer_id', async (req, res) => {});

function validateRequest(req: Request, res: Response) {
  //basic validation for request
  if (!req.body) {
    throw new Error('error- request has no body');
  }

  const { first_name, last_name, email, gender, country, city, street, phone } = req.body;
  if (!first_name || !last_name || !email || !gender || !country || !city || !street || !phone) {
    throw new Error('error- missing credentials on request');
  }
}
export default customerRouter;
