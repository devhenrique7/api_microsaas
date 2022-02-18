import { Router } from 'express'
import { getPlans, createPlan, getPlan, deletePlan, updatePlan } from '../controllers/plans.controller'

const router = Router();

router.route('/')
    .get(getPlans)
    .post(createPlan);

router.route('/:planId')
    .get(getPlan)
    .delete(deletePlan)
    .put(updatePlan);

export default router;