import mongoose from 'mongoose';

export default (mongoose) => {
    const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        validate(value) {
        if(value < 0)
        throw new Error('valor negativo nao permitido');
        },
    },
    lastModified: {
        type: Date
    }
    });
    
    const Student = mongoose.model('student', studentSchema, 'student');
    return Student;
};