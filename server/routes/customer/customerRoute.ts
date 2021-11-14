import express from 'express';
import Customer from '../../models/Customer';

export const customerRouter = express.Router();

customerRouter.get('/', async (req, res) => {});

customerRouter.post('/', async (req, res) => {
  //basic validation for request
  if (!req.body) {
    return res.status(400).json({ msg: 'error- request has no body' });
  }

  const { first_name, last_name, email, gender, country, city, street, phone } = req.body;
  if (!first_name || !last_name || !email || !gender || !country || !city || !street || !phone) {
    return res.status(400).json({ msg: 'error- missing credentials on request' });
  }

  try {
    const customer = new Customer({
      first_name,
      last_name,
      email,
      gender,
      country,
      city,
      street,
      phone,
    });

    await customer.save();

    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

customerRouter.put('/:customer_id', async (req, res) => {});

customerRouter.delete('/:customer_id', async (req, res) => {});
