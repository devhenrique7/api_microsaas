import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Category } from '../interfaces/category.interface'

export async function getCategories(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const categories = await conn.query('SELECT * FROM categories');
        return res.json(categories[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createCategory(req: Request, res: Response) {
    const newCategory: Category = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO categories SET ?', [newCategory]);
    res.json({
        message: 'New Category Created'
    });
}

export async function getCategory(req: Request, res: Response) {
    const id = req.params.categoryId;
    const conn = await connect();
    const category = await conn.query('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(category[0]);
}

export async function deleteCategory(req: Request, res: Response) {
    const id = req.params.categoryId;
    const conn = await connect();
    await conn.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({
        message: 'Category deleted'
    });
}

export async function updateCategory(req: Request, res: Response) {
    const id = req.params.categoryId;
    const updateCategory: Category = req.body;
    const conn = await connect();
    await conn.query('UPDATE categories set ? WHERE id = ?', [updateCategory, id]);
    res.json({
        message: 'Category Updated'
    });
}