import * as dotenv from 'dotenv';
import { Request } from 'express';
import fetch from 'node-fetch';
import { UserModel } from '../models/User';
import PeopleReturnEn from '../modelsReturn/PeopleReturnEn';
import dynamoose from 'dynamoose';
import { encrypt, hashMD5 } from '../helpers/helpers';
import jwt from "jsonwebtoken"

dotenv.config();

class UserService {
    
    public async userSignUp(req: Request) {
        const { name, lastName, email, password } = req.body;
        const date = new Date();
        const id = hashMD5(`${name}${date}`);

        if (! await this.validateUser(email)) {
            try {
                const result = await UserModel.create({
                    id: id,
                    name: name,
                    last_name: lastName,
                    email: email,
                    password: encrypt(password),
                    balance: 20000,
                    create_date: date.toString(),
                    update_date: date.toString(),

                });
                return { status: true, message: "USER_CREATED", data: result }
            } catch (error) {
                console.log(error)
                return { status: false, message: "FAILED" }
            }
        } else {
            return { status: false, message: "USER_EXISTS" }
        }
    }

    public async userSignIn(req: Request) {
        const { email, password } = req.body;
        const dataUser = await UserModel.scan('email').eq(email).and()
            .parenthesis(new dynamoose.Condition().where('password').eq(encrypt(password))).exec();

        if (dataUser.length != 0) {
            const token = jwt.sign({ id: dataUser[0].id, email: dataUser[0].email, balance: dataUser[0].balance },
                process.env.SECRET ? process.env.SECRET : "", { expiresIn: 86400 })
            return { status: true, message: "SIGN_IN_SUCCESS", token: token };
        } else {
            return { status: false, message: "EMAIL_OR_PASS_INVALID" }
        }


    }

    public async validateUser(email: string) {
        let dataUser = await UserModel.scan("email").eq(email).exec();
        console.log(dataUser)
        return dataUser.length > 0 ? true : false;

    }

}
export default UserService;