import express from 'express';
import Customer from '../../models/Customer';
import { Request, Response } from 'express';
const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {});

customerRouter.post('/', async (req, res) => {
  try {
    validateRequest(req, res);

    const customer = new Customer({
      ...req.body,
    });

    await customer.save();

    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error.message);
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
