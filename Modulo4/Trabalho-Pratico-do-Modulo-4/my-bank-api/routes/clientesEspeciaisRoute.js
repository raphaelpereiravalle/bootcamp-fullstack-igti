'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const agencias = await accountModel.distinct('agencia');

        const promises = agencias.map(async (agencia) =>{
            const account = await accountModel.find({agencia})
            .sort({balance:-1})
            .limit(1);
           
            account[0].oldAgencia = account.agencia;
            account[0].agencia = 99;

            await account[0].save();
        });

        await Promise.all(promises);

        const privates = await accountModel.find({'agencia': 99})

        res.status(201).send(privates);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;