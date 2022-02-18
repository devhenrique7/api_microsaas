//Esse aqui são os controllers, nele que seão feitas todas ass operações de CRUD
import { Request, Response } from 'express' //Pega req res do express, pq precisa ja que vai fazer o crud

import { connect } from '../database' // importa ja o conecta banco 

import { Additionals } from '../interfaces/additional.interface' //importando as interfaces 

//Promise<Response | void> return type of this function can't be used
export async function getAdditionals(req: Request, res: Response): Promise<Response | void> { 
    try {
        const conn = await connect();
        const additionals = await conn.query('SELECT * FROM additionals'); //comando a ser executado no banco de dados
        return res.json(additionals[0]); //retorna um json com todos os registros do banco
    }
    catch (e) {
        console.log(e)
    }
}

export async function createAdditional(req: Request, res: Response) {
    const newAdditional: Additionals = req.body;
    const conn = await connect(); //espera uma conexão
    await conn.query('INSERT INTO additionals SET ?', [newAdditional]); //comando a ser executado no banco de dados
    res.json({
        message: 'New Additional Created' //retorna um json falando que um additional novo foi criado 
    });
}

export async function getAdditional(req: Request, res: Response) {
    const id = req.params.additionalId; //requere um parametro pra ser executada
    const conn = await connect();
    const additional = await conn.query('SELECT * FROM additionals WHERE id = ?', [id]);
    res.json(additional[0]);
}

export async function deleteAdditional(req: Request, res: Response) {
    const id = req.params.additionalId;
    const conn = await connect();
    await conn.query('DELETE FROM additionals WHERE id = ?', [id]);
    res.json({
        message: 'Additional deleted'
    });
}

export async function updateAdditional(req: Request, res: Response) {
    const id = req.params.additionalId;
    const updateAdditional: Additionals = req.body;
    const conn = await connect();
    await conn.query('UPDATE additionals set ? WHERE id = ?', [updateAdditional, id]);
    res.json({
        message: 'Additional Updated'
    });
}