import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Customer } from '../interfaces/customer.interface'

export async function getCustomers(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const customers = await conn.query('SELECT * FROM customers');
        return res.json(customers[0]);
    } 
    catch (e) {
        console.log(e)
    }
} 

export async function createCustomer(req: Request, res: Response) {
    const newCustomer: Customer = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO customers SET ?', [newCustomer]);
    res.json({
        message: 'New Customer Created'
    });
}

export async function getCustomer(req: Request, res: Response) {
    const id = req.params.customerId;
    const conn = await connect();
    const customer = await conn.query('SELECT * FROM customers WHERE id = ?', [id]);
    res.json(customer[0]);
}

export async function deleteCustomer(req: Request, res: Response) {
    const id = req.params.customerId;
    const conn = await connect();
    await conn.query('DELETE FROM customers WHERE id = ?', [id]);
    res.json({
        message: 'Customer Deleted'
    });
}

export async function updateCustomer(req: Request, res: Response) {
    const id = req.params.customerId;
    const updateCustomer: Customer = req.body;
    const conn = await connect();
    await conn.query('UPDATE customers set ? WHERE id = ?', [updateCustomer, id]);
    res.json({
        message: 'Customer Updated'
    });
}

