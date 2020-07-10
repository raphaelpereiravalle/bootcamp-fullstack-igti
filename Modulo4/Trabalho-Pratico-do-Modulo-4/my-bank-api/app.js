'use strict';

import express from 'express';

import importDadosRoute from './routes/importDadosRoute.js';
import saqueRoute from './routes/saqueRoute.js';
import consultaRoute from './routes/consultaRoute.js';
import deletaRoute from './routes/deletaRoute.js';
import transferenciaRoute from './routes/transferenciaRoute.js';
import mediaRoute from './routes/mediaRoute.js';
import menorsaldoRoute from './routes/menorsaldoRoute.js';
import maiorsaldoRoute from './routes/maiorsaldoRoute.js';
import clientesespeciaisRoute from './routes/clientesespeciaisRoute.js';

const app = express();

app.use(express.json());

app.use('/importDados', importDadosRoute);
app.use('/saque', saqueRoute);
app.use('/consulta', consultaRoute);
app.use('/deleta', deletaRoute);
app.use('/transferencia', transferenciaRoute);
app.use('/media', mediaRoute);
app.use('/menorSaldo', menorsaldoRoute);
app.use('/maiorSaldo', maiorsaldoRoute);
app.use('/clientesEspeciais', clientesespeciaisRoute);

app.listen(3000, () => console.log('Servidor em execução na porta 3000!'));