import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Address } from '../interfaces/address.interface'

export async function getAddresses(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const adresses = await conn.query('SELECT * FROM adresses'); //comand
        return res.json(adresses[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createAddress(req: Request, res: Response) {
    const newAddress: Address = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO adresses SET ?', [newAddress]);
    res.json({
        message: 'New Address Created'
    });
}

export async function getAddress(req: Request, res: Response) {
    const id = req.params.addressId;
    const conn = await connect();
    const address = await conn.query('SELECT * FROM adresses WHERE id = ?', [id]);
    res.json(address[0]);
}

export async function deleteAddress(req: Request, res: Response) {
    const id = req.params.addressId;
    const conn = await connect();
    await conn.query('DELETE FROM adresses WHERE id = ?', [id]);
    res.json({
        message: 'Address deleted'
    });
}

export async function updateAddress(req: Request, res: Response) {
    const id = req.params.addressId;
    const updateAddress: Address = req.body;
    const conn = await connect();
    await conn.query('UPDATE adresses set ? WHERE id = ?', [updateAddress, id]);
    res.json({
        message: 'Address Updated'
    });
}