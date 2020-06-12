'use strict';

import express from 'express';
import gradeRouter from './routes/gradeRouter.js';
import averageRouter from './routes/averageRouter.js';
import bestGradeRouter from './routes/bestGradeRouter.js';
import noteStudentRouter from './routes/noteStudentRouter.js';

const app = express();
app.use(express.json());

//Router
app.use('/grade', gradeRouter);
app.use('/average', averageRouter);
app.use('/best', bestGradeRouter);
app.use('/note', noteStudentRouter); 

export default app;