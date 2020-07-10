'use strict';

import app from './app.js';

// Configurar porta
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port, () => {
    console.log('API rodando na porta ' + port);
}); 
    
// Função para validar porta
function normalizePort(val) {
    const port = parseInt(val, 1);

    if (isNaN(port)) { return val }

    if (port >= 0 ) { return port }

    return false;
}