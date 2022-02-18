import { Router } from 'express'
import { getSubscriptionPlans, createSubscription, getSubscription, deleteSubscription, updateSubscription } from '../controllers/subscriptions.controller'

const router = Router();

router.route('/')
    .get(getSubscriptionPlans)
    .post(createSubscription);

router.route('/:subscriptionId')
    .get(getSubscription)
    .delete(deleteSubscription)
    .put(updateSubscription);

export default router;