import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Choices } from '../interfaces/choices.interface'

export async function getChoices(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const choices = await conn.query('SELECT * FROM choices'); //comand
        return res.json(choices[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createChoice(req: Request, res: Response) {
    const newChoice: Choices = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO choices SET ?', [newChoice]);
    res.json({
        message: 'New Choices Created'
    });
}

export async function getChoice(req: Request, res: Response) {
    const id = req.params.choiceId;
    const conn = await connect();
    const choice = await conn.query('SELECT * FROM choices WHERE id = ?', [id]);
    res.json(choice[0]);
}

export async function deleteChoice(req: Request, res: Response) {
    const id = req.params.choiceId;
    const conn = await connect();
    await conn.query('DELETE FROM choices WHERE id = ?', [id]);
    res.json({
        message: 'Choices deleted'
    });
}

export async function updateChoice(req: Request, res: Response) {
    const id = req.params.choiceId;
    const updateChoice: Choices = req.body;
    const conn = await connect();
    await conn.query('UPDATE choices set ? WHERE id = ?', [updateChoice, id]);
    res.json({
        message: 'Choices Updated'
    });
}