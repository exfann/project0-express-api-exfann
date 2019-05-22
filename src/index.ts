import express from 'express'
import { loggingMiddleware } from './middleware/logging.middleware';
import bodyParser = require('body-parser');
import { sessionMiddleware } from './middleware/session.middleware';
import { userRouter } from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';

const app = express()

app.use(loggingMiddleware)

app.use (bodyParser.json())

app.use(sessionMiddleware)

app.use('/users', userRouter)

app.use('/reimbursements', reimbursementRouter)



app.listen(9050, ()=>{
    console.log('app has started');  
})