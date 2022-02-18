import { Router } from 'express'
import { getAddresses, createAddress, getAddress, deleteAddress, updateAddress } from '../controllers/address.controller'

const router = Router();

router.route('/')
    .get(getAddresses)
    .post(createAddress);

router.route('/:addressId')
    .get(getAddress)
    .delete(deleteAddress)
    .put(updateAddress);

export default router;