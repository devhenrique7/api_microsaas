import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Invoices } from '../interfaces/invoice.interface'

export async function getInvoices(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const invoices = await conn.query('SELECT * FROM invoices'); //comand
        return res.json(invoices[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createInvoice(req: Request, res: Response) {
    const newInvoice: Invoices = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO invoices SET ?', [newInvoice]);
    res.json({
        message: 'New Invoices Created'
    });
}

export async function getInvoice(req: Request, res: Response) {
    const id = req.params.invoiceId;
    const conn = await connect();
    const invoice = await conn.query('SELECT * FROM invoices WHERE id = ?', [id]);
    res.json(invoice[0]);
}

export async function deleteInvoice(req: Request, res: Response) {
    const id = req.params.invoiceId;
    const conn = await connect();
    await conn.query('DELETE FROM invoices WHERE id = ?', [id]);
    res.json({
        message: 'Invoices deleted'
    });
}

export async function updateInvoice(req: Request, res: Response) {
    const id = req.params.invoiceId;
    const updateInvoice: Invoices = req.body;
    const conn = await connect();
    await conn.query('UPDATE invoices set ? WHERE id = ?', [updateInvoice, id]);
    res.json({
        message: 'Invoices Updated'
    });
}