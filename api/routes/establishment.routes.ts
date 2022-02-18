import { Router } from 'express'
import { getEstablishments, createEstablishment, getEstablishment, deleteEstablishment, updateEstablishment } from '../controllers/establishment.controller'

const router = Router();

router.route('/')
    .get(getEstablishments)
    .post(createEstablishment);

router.route('/:establishmentId')
    .get(getEstablishment)
    .delete(deleteEstablishment)
    .put(updateEstablishment);

export default router;