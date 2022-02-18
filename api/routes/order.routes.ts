import { Router } from 'express'
import { getOrders, createOrder, getOrder, deleteOrder, updateOrder } from '../controllers/orders.controller'

const router = Router();

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:orderId')
    .get(getOrder)
    .delete(deleteOrder)
    .put(updateOrder);

export default router;