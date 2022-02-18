import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Order } from '../interfaces/order.interface'

export async function getOrders(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const orders = await conn.query('SELECT * FROM orders');
        return res.json(orders[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createOrder(req: Request, res: Response) {
    const newOrder: Order = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO orders SET ?', [newOrder]);
    res.json({
        message: 'New Orders Created'
    });
}

export async function getOrder(req: Request, res: Response) {
    const id = req.params.orderId;
    const conn = await connect();
    const order = await conn.query('SELECT * FROM orders WHERE id = ?', [id]);
    res.json(order[0]);
}

export async function deleteOrder(req: Request, res: Response) {
    const id = req.params.orderId;
    const conn = await connect();
    await conn.query('DELETE FROM orders WHERE id = ?', [id]);
    res.json({
        message: 'Orders Deleted'
    });
}

export async function updateOrder(req: Request, res: Response) {
    const id = req.params.orderId;
    const updateOrder: Order = req.body;
    const conn = await connect();
    await conn.query('UPDATE orders set ? WHERE id = ?', [updateOrder, id]);
    res.json({
        message: 'Orders Updated'
    });
}