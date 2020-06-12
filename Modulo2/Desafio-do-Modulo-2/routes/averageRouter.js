'use strict';

import express from 'express';
import { ready } from "../file/file.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const json = JSON.parse(await ready());

        var grades = json.grades.filter(gr =>
            gr.subject.toLowerCase() === data.subject.toLowerCase() && 
            gr.type.toLowerCase() === data.type.toLowerCase()
        );

        const soma = grades.reduce((acc, cur) => acc + cur.value, 0);

        const media = soma / grades.length;

        res.status(200).send(`Média encontrada: ${media}`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;