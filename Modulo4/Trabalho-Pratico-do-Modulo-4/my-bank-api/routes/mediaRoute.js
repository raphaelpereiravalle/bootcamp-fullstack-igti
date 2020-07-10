'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const agenciaBusca = +req.query.agencia;

        const mediaAgencia = await accountModel.aggregate([
                                { $match:  {agencia : agenciaBusca }},
                                { $group: { _id: null, media: { $avg: '$balance' }} }
                            ]);

        res.status(200).send(mediaAgencia);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;