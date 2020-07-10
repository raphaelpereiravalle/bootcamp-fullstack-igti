'use strict';

import mongoose from '../config.js';

const accountSchema = mongoose.Schema({
    agencia: {
        type: Number,
        require: true
    },
    conta: {
        type: Number,
        require: true
    },    
    name:{
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true,
        validate (value) {
            if(value < 0) 
                throw new Error("Valor não permite negativo");
        }
    }
});

export default mongoose.model('account', accountSchema, 'account');