'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.delete('/', async (req, res) => {
    try {
        const { agencia, conta } = req.query;

        const account = await accountModel.findOneAndRemove({ agencia, conta });

        if (!account)
            res.status(400).send('Conta não encontrada!');

        const totalAccounts = await accountModel.count({agencia});

        res.status(201).send({
            'contasAtivas': totalAccounts
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;