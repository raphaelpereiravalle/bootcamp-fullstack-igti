'use strict';

import express from 'express';
import accountModel from '../models/account.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { contaOrigem, contaDestino, valor } = req.body;

        const accountOrigem = await accountModel.findOne({ 'conta': contaOrigem });

        if (!accountOrigem) {
            res.status(400).send('Conta de origem não encontrada!');
        }

        const accountDestino = await accountModel.findOne({ 'conta': contaDestino });

        if (!accountDestino) {
            res.status(400).send('Conta de origem não encontrada!');
        }

        let valorDebito = valor;

        if (accountOrigem.agencia !== accountDestino.agencia){
            valorDebito += 8;
        }

        if((accountOrigem.balance - valorDebito) < 0){
            res.status(400).send('Saldo da conta de origem insuficiente!');
        }

        accountOrigem.balance -= valorDebito;
        accountDestino.balance += valor;

        await accountOrigem.save();
        await accountDestino.save();
        
        res.send({
            'name': accountOrigem.name,
            'balance': accountOrigem.balance
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;