import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

export class Roulette extends Document {
  id!: string;
  name: string;
  numbers_to_bet: any;
  colors_to_bet: any;
  maximum_money: number;
  bets: any;
  status_roulette: boolean;
  closing_date: string;
  create_date: string;
  update_date: string;
}

export const RouletteModel = dynamoose.model<Roulette>(
  process.env.ROLETTE as string,
  new dynamoose.Schema(
    {
      id: { "type": String, "hashKey": true },
      name: String,
      numbers_to_bet: Array,
      colors_to_bet: Array,
      maximum_money: Number,
      bets: Array,
      status_roulette: Boolean,
      closing_date: String,
      create_date: String,
      update_date: String,
    },
    {
      saveUnknown: true,
      timestamps: false,
    },
  ),
  {
    create: false,
    waitForActive: { enabled: false },
  },
);
