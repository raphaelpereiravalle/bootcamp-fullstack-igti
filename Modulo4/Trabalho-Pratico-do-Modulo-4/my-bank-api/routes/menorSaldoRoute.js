'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const limit = +req.query.limit;

        const accounts = await accountModel.find()
                                           .sort({balance:1})
                                           .limit(limit);

        res.status(200).send(accounts.map(m => {
            return {
                agencia: m.agencia,
                conta: m.conta,
                saldo: m.balance
            }
        }));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;