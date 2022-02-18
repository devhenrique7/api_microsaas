import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Plans } from '../interfaces/plans.interface'

export async function getPlans(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const plans = await conn.query('SELECT * FROM plans'); //comand
        return res.json(plans[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createPlan(req: Request, res: Response) {
    const newPlan: Plans = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO plans SET ?', [newPlan]);
    res.json({
        message: 'New Plans Created'
    });
}

export async function getPlan(req: Request, res: Response) {
    const id = req.params.planId;
    const conn = await connect();
    const plan = await conn.query('SELECT * FROM plans WHERE id = ?', [id]);
    res.json(plan[0]);
}

export async function deletePlan(req: Request, res: Response) {
    const id = req.params.planId;
    const conn = await connect();
    await conn.query('DELETE FROM plans WHERE id = ?', [id]);
    res.json({
        message: 'Plans deleted'
    });
}

export async function updatePlan(req: Request, res: Response) {
    const id = req.params.planId;
    const updatePlan: Plans = req.body;
    const conn = await connect();
    await conn.query('UPDATE plans set ? WHERE id = ?', [updatePlan, id]);
    res.json({
        message: 'Plans Updated'
    });
}