'use strict';

import express from 'express';
import { ready } from "../file/file.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const json = JSON.parse(await ready());   

        if (data === undefined)
            res.status(404).send("Registro não encontrado!");

        var grades = json.grades.filter(gr =>
            gr.student.toLowerCase() === data.student.toLowerCase() && 
            gr.subject.toLowerCase() === data.subject.toLowerCase()
        );

        const soma = grades.reduce((acc, cur) => acc + cur.value, 0);        
        
        res.status(200).send(`Nota encontrada: ${soma}.`);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;

