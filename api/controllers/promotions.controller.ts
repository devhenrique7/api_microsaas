import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Promotions } from '../interfaces/promotions.interface'

export async function getPromotions(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const promotions = await conn.query('SELECT * FROM promotions');
        return res.json(promotions[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createPromotion(req: Request, res: Response) {
    const newPromotion: Promotions = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO promotions SET ?', [newPromotion]);
    res.json({
        message: 'New Promotions Created'
    });
}

export async function getPromotion(req: Request, res: Response) {
    const id = req.params.promotionId;
    const conn = await connect();
    const promotion = await conn.query('SELECT * FROM promotions WHERE id = ?', [id]);
    res.json(promotion[0]);
}

export async function deletePromotion(req: Request, res: Response) {
    const id = req.params.promotionId;
    const conn = await connect();
    await conn.query('DELETE FROM promotions WHERE id = ?', [id]);
    res.json({
        message: 'Promotions Deleted'
    });
}

export async function updatePromotion(req: Request, res: Response) {
    const id = req.params.promotionId;
    const updatePromotion: Promotions = req.body;
    const conn = await connect();
    await conn.query('UPDATE promotions set ? WHERE id = ?', [updatePromotion, id]);
    res.json({
        message: 'Promotions Updated'
    });
}