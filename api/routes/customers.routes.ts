import { Router } from 'express'
import { getCustomers, createCustomer, getCustomer, deleteCustomer, updateCustomer } from '../controllers/customer.controller'

const router = Router();

router.route('/')
    .get(getCustomers)
    .post(createCustomer); 

router.route('/:customerId')
    .get(getCustomer)
    .delete(deleteCustomer)
    .put(updateCustomer);

export default router;