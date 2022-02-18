import { Router } from 'express'
import { getCupons, createCoupon, getCoupon, deleteCoupon, updateCoupon } from '../controllers/cupons.controller'

const router = Router();

router.route('/')
    .get(getCupons)
    .post(createCoupon);

router.route('/:couponId')
    .get(getCoupon)
    .delete(deleteCoupon)
    .put(updateCoupon);

export default router;