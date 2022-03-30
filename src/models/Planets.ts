import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

export class Planets extends Document {

  id: string;
  climate: string;
  diameter: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: any;
  films: any;
  url: string;
  created: string;
  edited: string;

}

export const PlanetsModel = dynamoose.model<Planets>(
  process.env.PLANETS as string,
  //"gente",
  new dynamoose.Schema(
    {
      id: { "type": String, "hashKey": true },
      climate: String,
      diameter: String,
      gravity: String,
      name: String,
      orbital_period: String,
      population: String,
      residents: Array,
      films: Array,
      url: String,
      created: String,
      edited: String,
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
