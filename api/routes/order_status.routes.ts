import { Router } from 'express'
import { getOrdersStatus, createOrderStatus, getOrderStatus, deleteOrderStatus, updateOrderStatus } from '../controllers/order_status.controller'

const router = Router();

router.route('/')
    .get(getOrdersStatus)
    .post(createOrderStatus);

router.route('/:orderstatusId')
    .get(getOrderStatus)
    .delete(deleteOrderStatus)
    .put(updateOrderStatus);

export default router;