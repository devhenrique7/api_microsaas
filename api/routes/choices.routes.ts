import { Router } from 'express'
import { getChoices, createChoice, getChoice, deleteChoice, updateChoice } from '../controllers/choices.controller'

const router = Router();

router.route('/')
    .get(getChoices)
    .post(createChoice);

router.route('/:choiceId')
    .get(getChoice)
    .delete(deleteChoice)
    .put(updateChoice);

export default router;