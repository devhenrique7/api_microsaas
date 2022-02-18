import { Router } from 'express'
import { getCategories, createCategory, getCategory, deleteCategory, updateCategory } from '../controllers/category.controller'

const router = Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:categoryId')
    .get(getCategory)
    .delete(deleteCategory)
    .put(updateCategory);

export default router;