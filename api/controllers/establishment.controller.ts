import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Establishment } from '../interfaces/establishment.interface'

export async function getEstablishments(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const establishments = await conn.query('SELECT * FROM establishments');
        return res.json(establishments[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createEstablishment(req: Request, res: Response) {
    const newEstablishment: Establishment = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO establishments SET ?', [newEstablishment]);
    res.json({
        message: 'New Establishment Created'
    });
}

export async function getEstablishment(req: Request, res: Response) {
    const id = req.params.establishmentId;
    const conn = await connect();
    const establishment = await conn.query('SELECT * FROM establishments WHERE id = ?', [id]);
    res.json(establishment[0]);
}

export async function deleteEstablishment(req: Request, res: Response) {
    const id = req.params.establishmentId;
    const conn = await connect();
    await conn.query('DELETE FROM establishments WHERE id = ?', [id]);
    res.json({
        message: 'Establishment deleted'
    });
}

export async function updateEstablishment(req: Request, res: Response) {
    const id = req.params.establishmentId;
    const updateEstablishment: Establishment = req.body;
    const conn = await connect();
    await conn.query('UPDATE establishments set ? WHERE id = ?', [updateEstablishment, id]);
    res.json({
        message: 'Establishment Updated'
    });
}