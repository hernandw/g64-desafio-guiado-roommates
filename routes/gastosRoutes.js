import express from 'express';
import { getGastos, addGasto } from '../controller/gastosController.js'
const router = express.Router();

router.get('/gastos',  getGastos)

router.post('/gasto', addGasto)

export default router