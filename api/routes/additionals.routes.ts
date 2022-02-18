import { Router } from 'express' //importando Rotas do express

//Aqui ele ta importando cada função do controller separadamente, crud
import { getAdditionals, createAdditional, getAdditional, deleteAdditional, updateAdditional } from '../controllers/additionals.controller'

const router = Router(); //criando uma contante 

//Aqui ele ta declarando as rotas que não precisam de um parametro em url pra ser executada
router.route('/')
    .get(getAdditionals) //pegar todos
    .post(createAdditional); //criar novo

//Aqui ele ta declarando as rotas que precisam de um parametro em url pra ser executada
router.route('/:additionalId')
    .get(getAdditional) //pegar um especifico
    .delete(deleteAdditional) //deletar um especifico 
    .put(updateAdditional); //atualizar um específico

export default router; // exportando as rotas para serem chamadas la no App.ts