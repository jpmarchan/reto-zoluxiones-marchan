import { Router } from "express";
import { body } from 'express-validator';
import { checkClient } from "../middlewares/ClienteMiddleware";
import bodyParser from 'body-parser'
import { getPeople } from "../controllers/PeopleControllers/PeopleController";
import { createPlanets, deletePlanet, getByIdPlanet, getPlanets, updatePlanet } from "../controllers/PlanetsControllers/PlanetsController";
const jsonParser = bodyParser.json()

const router = Router()

//getPeoplesSwapi
router.get('/swapi/getPeople/:index', checkClient, getPeople);

//api post crear variante
router.post('/planets/create', jsonParser, body("name").notEmpty().isLength({ min: 1, max:40 }), checkClient, createPlanets);
router.post('/planets/update', jsonParser, checkClient, updatePlanet);
router.get('/planets/get', checkClient, getPlanets);
router.get('/planets/getById/:id', checkClient, getByIdPlanet);
router.delete('/planets/delete/:id', checkClient, deletePlanet);


export default router;