import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Product } from '../interfaces/product.interface'

export async function getProducts(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const products = await conn.query('SELECT * FROM products');
        return res.json(products[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createProduct(req: Request, res: Response) {
    const newProduct: Product = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO products SET ?', [newProduct]);
    res.json({
        message: 'New Product Created'
    });
}

export async function getProduct(req: Request, res: Response) {
    const id = req.params.productId;
    const conn = await connect();
    const products = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
    res.json(products[0]);
}

export async function deleteProduct(req: Request, res: Response) {
    const id = req.params.productId;
    const conn = await connect();
    await conn.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({
        message: 'Product Deleted'
    });
}

export async function updateProduct(req: Request, res: Response) {
    const id = req.params.productId;
    const updateProduct: Product = req.body;
    const conn = await connect();
    await conn.query('UPDATE products set ? WHERE id = ?', [updateProduct, id]);
    res.json({
        message: 'Product Updated'
    });
}