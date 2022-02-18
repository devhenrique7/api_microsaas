import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { OrderStatus } from '../interfaces/order_status.interface'

export async function getOrdersStatus(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const ordersstatus = await conn.query('SELECT * FROM orderStatus'); //comand
        return res.json(ordersstatus[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createOrderStatus(req: Request, res: Response) {
    const newOrderStatus: OrderStatus = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO orderStatus SET ?', [newOrderStatus]);
    res.json({
        message: 'New Order Status Created'
    });
}

export async function getOrderStatus(req: Request, res: Response) {
    const id = req.params.orderstatusId;
    const conn = await connect();
    const orderstatus = await conn.query('SELECT * FROM orderStatus WHERE id = ?', [id]);
    res.json(orderstatus[0]);
}

export async function deleteOrderStatus(req: Request, res: Response) {
    const id = req.params.orderstatusId;
    const conn = await connect();
    await conn.query('DELETE FROM orderStatus WHERE id = ?', [id]);
    res.json({
        message: 'Order Status deleted'
    });
}

export async function updateOrderStatus(req: Request, res: Response) {
    const id = req.params.orderstatusId;
    const updateOrderStatus: OrderStatus = req.body;
    const conn = await connect();
    await conn.query('UPDATE orderStatus set ? WHERE id = ?', [updateOrderStatus, id]);
    res.json({
        message: 'Order Status Updated'
    });
}