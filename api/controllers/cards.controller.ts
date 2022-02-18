import { Request, Response } from 'express'
// DB
import { connect } from '../database'
// Interfaces
import { Cards } from '../interfaces/cards.interface'

export async function getCards(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const cards = await conn.query('SELECT * FROM cards'); //comand
        return res.json(cards[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
} 

export async function createCard(req: Request, res: Response) {
    const newCard: Cards = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO cards SET ?', [newCard]);
    res.json({
        message: 'New Cards Created'
    });
}

export async function getCard(req: Request, res: Response) {
    const id = req.params.cardId;
    const conn = await connect();
    const card = await conn.query('SELECT * FROM cards WHERE id = ?', [id]);
    res.json(card[0]);
}

export async function deleteCard(req: Request, res: Response) {
    const id = req.params.cardId;
    const conn = await connect();
    await conn.query('DELETE FROM cards WHERE id = ?', [id]);
    res.json({
        message: 'Cards deleted'
    });
}

export async function updateCard(req: Request, res: Response) {
    const id = req.params.cardId;
    const updateCard: Cards = req.body;
    const conn = await connect();
    await conn.query('UPDATE cards set ? WHERE id = ?', [updateCard, id]);
    res.json({
        message: 'Cards Updated'
    });
}