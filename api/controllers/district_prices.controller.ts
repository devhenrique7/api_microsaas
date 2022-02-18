import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { DistrictPrices } from '../interfaces/district_prices.interface'

export async function getDistrictPrices(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const districtprices = await conn.query('SELECT * FROM districtPrices'); //comand
        return res.json(districtprices[0]); //constant
    }
    catch (e) {
        console.log(e)
    }
}

export async function createDistrictPrice(req: Request, res: Response) {
    const newDistrictPrice: DistrictPrices = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO districtPrices SET ?', [newDistrictPrice]);
    res.json({
        message: 'New District Price Created'
    });
}

export async function getDistrictPrice(req: Request, res: Response) {
    const id = req.params.districtpriceId;
    const conn = await connect();
    const districtprice = await conn.query('SELECT * FROM districtPrices WHERE id = ?', [id]);
    res.json(districtprice[0]);
}

export async function deleteDistrictPrice(req: Request, res: Response) {
    const id = req.params.districtpriceId;
    const conn = await connect();
    await conn.query('DELETE FROM districtPrices WHERE id = ?', [id]);
    res.json({
        message: 'District Price deleted'
    });
}

export async function updateDistricPrice(req: Request, res: Response) {
    const id = req.params.districtpriceId;
    const updateDistricPrice: DistrictPrices = req.body;
    const conn = await connect();
    await conn.query('UPDATE districtPrices set ? WHERE id = ?', [updateDistricPrice, id]);
    res.json({
        message: 'District Price Updated'
    });
}