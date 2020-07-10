'use strict';

import mongoose from 'mongoose';

// Configuração de conexão com banco de dados
const connectionString = 'mongodb+srv://user_accounts:accounts@cluster0-ueakx.gcp.mongodb.net/dbAccounts?retryWrites=true&w=majority';
const MONGODB_URL = process.env.MONGODB_URL || connectionString;

try {
    // Conexão de banco de dados
    mongoose.connect(MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log('Sucesso ao conectar no MongoDB!');
} catch (err) {
    console.log(`${'Erro ao conectar no MongoDB'} ${err}`);
}

export default mongoose;