import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { hashMD5 } from '../helpers/helpers';
import { RouletteModel } from '../models/Roulette';
dotenv.config();

export default class RouletteService {

    public async createRolette(req: Request, res: Response) {
        const result = validationResult(req);
        const { name, numbersToBet, colorsToBet, maximumMoney, bets } = req.body;

        if (!result.isEmpty()) {
            return false;
        } else {
            const date = new Date();
            const id = hashMD5(`${name}${date}`);
            const result = await RouletteModel.create({
                id: id,
                name: name,
                numbers_to_bet: numbersToBet,
                colors_to_bet: colorsToBet,
                maximum_money: maximumMoney,
                bets: bets,
                status_roulette: true,
                create_date: date.toString(),
                update_date: date.toString(),

            });
            return result
        }

    }

}
