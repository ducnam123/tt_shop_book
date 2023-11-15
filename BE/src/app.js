import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors";

import {
  categoryRouter, authRouter, bookRouter,
  cardRouter, voucherRouter, paymentRouter, cartRouter, orderRouter
} from './routes/'
dotenv.config()

const app = express();
//
app.use(express.json());
app.use(cors());

app.use('/api', categoryRouter)
app.use('/api', authRouter)
app.use('/api', bookRouter)

//
app.use('/api', cartRouter)
app.use('/card', cardRouter)
app.use('/order', orderRouter)
app.use('/payment', paymentRouter)
app.use('/voucher', voucherRouter)


mongoose.connect(process.env.URI)

export const viteNodeApp = app;