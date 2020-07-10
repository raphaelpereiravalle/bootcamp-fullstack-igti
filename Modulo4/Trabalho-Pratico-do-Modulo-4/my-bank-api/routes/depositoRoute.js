'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { agencia, conta, deposito } = req.body;

        const account = await accountModel.findOne({ agencia, conta });

        if (!account)
            res.status(400).send('Conta não encontrada!');

        account.balance += deposito;

        await account.save();

        res.status(201).send({
            'name': account.name,
            'balance': account.balance
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;