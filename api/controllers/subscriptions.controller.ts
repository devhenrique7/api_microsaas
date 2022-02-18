import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Subscription } from '../interfaces/subscription.interface'

export async function getSubscriptionPlans(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const subscriptions = await conn.query('SELECT * FROM subscriptions');
        return res.json(subscriptions[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createSubscription(req: Request, res: Response) {
    const newSubscription: Subscription = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO subscriptions SET ?', [newSubscription]);
    res.json({
        message: 'New Subscription Created'
    });
}

export async function getSubscription(req: Request, res: Response) {
    const id = req.params.subscriptionId;
    const conn = await connect();
    const subscription = await conn.query('SELECT * FROM subscriptions WHERE id = ?', [id]);
    res.json(subscription[0]);
}

export async function deleteSubscription(req: Request, res: Response) {
    const id = req.params.subscriptionId;
    const conn = await connect();
    await conn.query('DELETE FROM subscriptions WHERE id = ?', [id]);
    res.json({
        message: 'Subscription Deleted'
    });
}

export async function updateSubscription(req: Request, res: Response) {
    const id = req.params.subscriptionId;
    const updateSubscription: Subscription = req.body;
    const conn = await connect();
    await conn.query('UPDATE subscriptions set ? WHERE id = ?', [updateSubscription, id]);
    res.json({
        message: 'Subscription Updated'
    });
}