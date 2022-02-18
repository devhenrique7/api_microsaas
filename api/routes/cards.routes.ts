import { Router } from 'express'
import { getCards, createCard, getCard, deleteCard, updateCard } from '../controllers/cards.controller'

const router = Router();

router.route('/')
    .get(getCards)
    .post(createCard);

router.route('/:cardId')
    .get(getCard)
    .delete(deleteCard)
    .put(updateCard);

export default router;