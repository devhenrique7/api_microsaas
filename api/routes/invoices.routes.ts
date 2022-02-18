import { Router } from 'express'
import { getInvoices, createInvoice, getInvoice, deleteInvoice, updateInvoice } from '../controllers/invoices.controller'

const router = Router();

router.route('/')
    .get(getInvoices)
    .post(createInvoice);

router.route('/:invoiceId')
    .get(getInvoice)
    .delete(deleteInvoice)
    .put(updateInvoice);

export default router; 