import { Router } from "express";
import { body } from 'express-validator';
import { checkClient } from "../middlewares/ClienteMiddleware";
import bodyParser from 'body-parser'
import { getPeople } from "../controllers/PeopleControllers/PeopleController";
import { createVariant, deleteVariant, getByIdVariant, getVariant, updateVariant } from "../controllers/Covid19VariantsControllers/Covid19VariantsController";
const jsonParser = bodyParser.json()

const router = Router()

//getPeoplesSwapi
router.get('/swapi/getPeople/:index', checkClient, getPeople);

//api post crear variante
router.post('/covid19Variants/create', jsonParser, body("name").notEmpty().isLength({ min: 1, max:40 }), checkClient, createVariant);
router.post('/covid19Variants/update', jsonParser, checkClient, updateVariant);
router.get('/covid19Variants/get', checkClient, getVariant);
router.get('/covid19Variants/getById/:id', checkClient, getByIdVariant);
router.delete('/covid19Variants/delete/:id', checkClient, deleteVariant);


export default router;