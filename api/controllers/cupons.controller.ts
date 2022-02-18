import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Cupons } from '../interfaces/cupons.interface'

export async function getCupons(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const cupons = await conn.query('SELECT * FROM cupons'); //comand
        return res.json(cupons[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createCoupon(req: Request, res: Response) {
    const newCoupon: Cupons = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO cupons SET ?', [newCoupon]);
    res.json({
        message: 'New Cupons Created'
    });
}

export async function getCoupon(req: Request, res: Response) {
    const id = req.params.couponId;
    const conn = await connect();
    const coupon = await conn.query('SELECT * FROM cupons WHERE id = ?', [id]);
    res.json(coupon[0]);
}

export async function deleteCoupon(req: Request, res: Response) {
    const id = req.params.couponId;
    const conn = await connect();
    await conn.query('DELETE FROM cupons WHERE id = ?', [id]);
    res.json({
        message: 'Cupons deleted'
    });
}

export async function updateCoupon(req: Request, res: Response) {
    const id = req.params.couponId;
    const updateCoupon: Cupons = req.body;
    const conn = await connect();
    await conn.query('UPDATE cupons set ? WHERE id = ?', [updateCoupon, id]);
    res.json({
        message: 'Cupons Updated'
    });
}