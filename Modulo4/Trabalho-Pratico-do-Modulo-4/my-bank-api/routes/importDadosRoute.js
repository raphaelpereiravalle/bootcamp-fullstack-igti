'use strict';

import express from 'express';
import accountModel from '../models/account.js';
import { promises } from 'fs';

const router = express.Router();

const file = 'accounts.json';

const { readFile } = promises;

export const ready = async () => {
    try {
        const data = await readFile(file, 'utf-8');
        return data;

    } catch (err) {
        throw Error('Erro ao ler o arquivo');
    }
}

// Função para importar arquivo accounts.json para banco de dados mongodb
router.post('/', async (_, res) => {
    try {
        const json = JSON.parse(await ready());
        let obj = null;
        let accounts = null;

        json.forEach(element => {
            obj = {
                agencia: element.agencia,
                conta: element.conta,
                name: element.name,
                balance: element.balance
            };

            accounts = new accountModel(obj); 
            accounts.save(); 
        });

        res.status(201).send({
           massege: 'Sucesso!' 
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;