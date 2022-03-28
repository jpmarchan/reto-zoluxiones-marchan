import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { hashMD5 } from '../../helpers/helpers';
import { Covid19VariantsModel } from '../../models/Covid19Variants';
import { Condition } from 'dynamoose';


export async function createVariant(req: Request, res: Response) {
    const result = validationResult(req);
    const { name, identified_in, spread, symptoms, lethality, vaccine, treatments } = req.body;
    if (!result.isEmpty()) {
        return res.status(422).json({ errros: result.array() })
    } else {
        const date = new Date().getTime() / 1000;
        const id = hashMD5(`${name}${date}`);
        const result = await Covid19VariantsModel.create({
            id: id,
            name: name,
            identified_in: identified_in,
            spread: spread,
            symptoms: symptoms,
            lethality: lethality,
            vaccine: vaccine,
            treatments: treatments,
            createdDate: date,
            updateDate: date,

        });
        res.json({
            status: true,
            message: "CREATE_NEW_VARIANT",
            data: result,
        });

    }
}

export async function getVariant(req: Request, res: Response) {
    try {
        const dataVariant = await Covid19VariantsModel.scan().all().exec();
        res.json({
            status: true,
            message: "LIST_COVID19_VARIANTS",
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

export async function getByIdVariant(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
        const dataVariant = await Covid19VariantsModel.scan("id").eq(id).exec();
        res.json({
            status: true,
            message: dataVariant[0] ? "LIST_COVID19_VARIANTS" : "NOT_REGISTERS",
            data: dataVariant[0] ? dataVariant[0] : null,
        });

    } else {
        res.json({
            status: false,
            message: "ID_NOT_FOUND",
        });
    }

}

export async function updateVariant(req: Request, res: Response) {
    const { id, name, identified_in, spread, symptoms, lethality, vaccine, treatments } = req.body;
    const date = new Date().getTime() / 1000;
    const dataVariant = await Covid19VariantsModel.scan("id").eq(id).exec();
    if (dataVariant.length > 0) {
        if (name) {
            await Covid19VariantsModel.update(
                { id: id },
                { name: name },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (identified_in) {
            await Covid19VariantsModel.update(
                { id: id },
                { identified_in: identified_in },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (spread) {
            await Covid19VariantsModel.update(
                { id: id },
                { spread: spread },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (symptoms) {
            await Covid19VariantsModel.update(
                { id: id },
                { symptoms: symptoms },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (lethality) {
            await Covid19VariantsModel.update(
                { id: id },
                { lethality: lethality },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (vaccine) {
            await Covid19VariantsModel.update(
                { id: id },
                { vaccine: vaccine },
                { condition: new Condition().filter('id').exists() },
            );
        }
        if (treatments) {
            await Covid19VariantsModel.update(
                { id: id },
                { treatments: treatments },
                { condition: new Condition().filter('id').exists() },
            );
        }
        let resultUpdate = await Covid19VariantsModel.update(
            { id: id },
            { updateDate: date },
            { condition: new Condition().filter('id').exists() },
        );
        res.json({
            status: true,
            message: "UPDATE_VARIANT",
            data: resultUpdate
        });
    } else {
        res.json({
            status: true,
            message: "NOT_REGISTERS",
        });
    }
}

export async function deleteVariant(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
        try {
            Covid19VariantsModel.delete(id, error => {
                if (error) {
                    res.json({
                        result: { status: false }
                    });
                }
            });
            res.json({
                status: true,
                message: "VARIANT_DELETE_SUCCESS",
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




