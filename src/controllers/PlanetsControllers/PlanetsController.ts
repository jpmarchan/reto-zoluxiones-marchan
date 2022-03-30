import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { hashMD5 } from '../../helpers/helpers';
import { PlanetsModel } from '../../models/Planets';
import { Condition } from 'dynamoose';


export async function createPlanets(req: Request, res: Response) {
    const result = validationResult(req);
    const { climate, diameter, gravity, name, orbital_period, population, residents, films, url } = req.body;
    if (!result.isEmpty()) {
        return res.status(422).json({ errros: result.array() })
    } else {
        const date = new Date().getTime() / 1000;
        const id = hashMD5(`${name}${date}`);
        const result = await PlanetsModel.create({
            id: id,
            climate: climate,
            diameter: diameter,
            gravity: gravity,
            name: name,
            orbital_period: orbital_period,
            population: population,
            residents: residents,
            films: films,
            url: url,
            created: date.toString(),
            edited: date.toString(),

        });
        res.json({
            status: true,
            message: "CREATE_NEW_PLANETS",
            data: result,
        });

    }
}

export async function getPlanets(req: Request, res: Response) {
    try {
        const dataVariant = await PlanetsModel.scan().all().exec();
        res.json({
            status: true,
            message: "LIST_PLANETS",
            data: dataVariant,
        });
    } catch (error) {
        res.json({
            status: false,
            message: "ERROR",
            data: error,
        });
    }
}

export async function getByIdPlanet(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
        const dataVariant = await PlanetsModel.scan("id").eq(id).exec();
        res.json({
            status: true,
            message: dataVariant[0] ? "LIST_PLANETS" : "NOT_REGISTERS",
            data: dataVariant[0] ? dataVariant[0] : null,
        });

    } else {
        res.json({
            status: false,
            message: "ID_NOT_FOUND",
        });
    }

}

export async function updatePlanet(req: Request, res: Response) {
    const { id, climate, diameter, gravity, name, orbital_period, population, residents, films, url } = req.body;
    const date = new Date().getTime() / 1000;
    const dataVariant = await PlanetsModel.scan("id").eq(id).exec();
    if (dataVariant.length > 0) {
        if (name) {
            await PlanetsModel.update(
                { id: id },
                { name: name },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (climate) {
            await PlanetsModel.update(
                { id: id },
                { climate: climate },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (diameter) {
            await PlanetsModel.update(
                { id: id },
                { diameter: diameter },
                { condition: new Condition().filter('id').exists() },
            );
        }
        await PlanetsModel.update(
            { id: id },
            { gravity: gravity },
            { condition: new Condition().filter('id').exists() },
        );

        await PlanetsModel.update(
            { id: id },
            { orbital_period: orbital_period },
            { condition: new Condition().filter('id').exists() },
        );

        await PlanetsModel.update(
            { id: id },
            { population: population },
            { condition: new Condition().filter('id').exists() },
        );

        await PlanetsModel.update(
            { id: id },
            { residents: residents },
            { condition: new Condition().filter('id').exists() },
        );
        await PlanetsModel.update(
            { id: id },
            { films: films },
            { condition: new Condition().filter('id').exists() },
        );
        await PlanetsModel.update(
            { id: id },
            { url: url },
            { condition: new Condition().filter('id').exists() },
        );
        let resultUpdate = await PlanetsModel.update(
            { id: id },
            { created: date.toString() },
            { condition: new Condition().filter('id').exists() },
        );
        res.json({
            status: true,
            message: "UPDATE_PLANET",
            data: resultUpdate
        });
    } else {
        res.json({
            status: true,
            message: "NOT_REGISTERS",
        });
    }
}

export async function deletePlanet(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
        try {
            PlanetsModel.delete(id, error => {
                if (error) {
                    res.json({
                        result: { status: false }
                    });
                }
            });
            res.json({
                status: true,
                message: "PLANET_DELETE_SUCCESS",
            });

        } catch (error) {
            res.json({
                status: false,
                message: "ERROR",
                data: error
            });
        }

    } else {
        res.json({
            status: false,
            message: "ID_NOT_FOUND",
        });
    }

}




