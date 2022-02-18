import { Router } from 'express'
import { getDistrictPrices, createDistrictPrice, getDistrictPrice, deleteDistrictPrice, updateDistricPrice } from '../controllers/district_prices.controller'

const router = Router();

router.route('/')
    .get(getDistrictPrices)
    .post(createDistrictPrice);

router.route('/:districtpriceId')
    .get(getDistrictPrice)
    .delete(deleteDistrictPrice)
    .put(updateDistricPrice);

export default router;