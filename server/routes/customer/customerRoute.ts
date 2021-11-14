import express from 'express';

export const customerRouter = express.Router();

customerRouter.get('/', ()=>{}, async (req, res) => {});

customerRouter.post('/', ()=>{}, async (req, res) => {});

customerRouter.put('/:transaction_id', ()=>{}, async (req, res) => {});

customerRouter.delete('/:transaction_id', ()=>{}, async (req, res) => {});
