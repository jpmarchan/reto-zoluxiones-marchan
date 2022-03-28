import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export const checkClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const client_hash = req.header('client-hash');

    try {
        if (client_hash == process.env.CLIENT_SECRET_HASHED) {
            next();
        } else {
            res.status(401).send({ 'mensaje': 'Cliente no autorizado.' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ 'mensaje': 'Cliente no autorizado.' });
    }
};


