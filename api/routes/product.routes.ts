import { Router } from 'express'
import { getProducts, createProduct, getProduct, deleteProduct, updateProduct } from '../controllers/product.controller'

const router = Router();

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:productId')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct);

export default router;

