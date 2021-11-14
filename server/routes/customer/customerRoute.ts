import express from 'express';

export const customerRouter = express.Router();

customerRouter.get('/', ()=>{}, async (req, res) => {});

customerRouter.post('/', ()=>{}, async (req, res) => {});

customerRouter.put('/:customer_id', ()=>{}, async (req, res) => {});

customerRouter.delete('/:customer_id', ()=>{}, async (req, res) => {});
