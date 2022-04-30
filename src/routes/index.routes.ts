import { Router } from "express";
import bodyParser from 'body-parser'
import { signIn, signUp } from "../controllers/UserController/UserController";
import { createPlanets } from "../controllers/PlanetsControllers/PlanetsController";
const jsonParser = bodyParser.json()

const router = Router()

//getPeoplesSwapi

//api post crear variante
router.post('/user/signUp', jsonParser, signUp);
router.post('/user/signIn', jsonParser, signIn);
router.post('/planets/create', jsonParser, createPlanets);



export default router;