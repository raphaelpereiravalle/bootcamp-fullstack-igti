'use strict';

import express from 'express';
import { ready, write } from "../file/file.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let data = req.body;
        const json = JSON.parse(await ready());

        data = { id: json.nextId++, ...data };
        data.timestamp = `${ new Date().toISOString() }`;

        json.grades.push(data);

        write(json);

        res.status(200).send(data);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        let data = req.body; // Capturando valores
        let json = JSON.parse(await ready()); // Ler arquivo
        let index = json.grades.findIndex(x => x.id === data.id);

        if (index === undefined)
            res.status(404).send('Registro não encontrado');

        data.timestamp = `${new Date().toISOString()}`;
        json.grades[data] = data;

        write(json);

        res.status(200).send(`Registro ${ data.id } atualizado com sucess!`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let json = JSON.parse(await ready());

        const data = json.grades.find(x => x.id === parseInt(req.params.id, 10));

        if (data === undefined)
            res.status(404).send("Registro não encontrado!");

        json.grades = json.grades.filter(y => y.id !== data.id);

        await write(json);

        res.status(200).send(`Registro ID ${ data.id } foi excluído com sucesso!`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.get('/', async (_, res) => {
    try {
        const data = await ready();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const json = JSON.parse(await ready());
        const data = json.grades.find(x => x.id === parseInt(req.params.id, 10));

       if (data === undefined)
            res.status(404).send("Registro não encontrado");

        res.status(200).send(JSON.stringify(data));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;