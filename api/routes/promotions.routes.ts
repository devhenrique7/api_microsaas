import { Router } from 'express'
import { getPromotions, createPromotion, getPromotion, deletePromotion, updatePromotion } from '../controllers/promotions.controller'

const router = Router();

router.route('/')
    .get(getPromotions)
    .post(createPromotion);

router.route('/:promotionId')
    .get(getPromotion)
    .delete(deletePromotion)
    .put(updatePromotion);

export default router; 