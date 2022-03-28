import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';

export class Covid19Variants extends Document {

  id: string;
  name:string;
  identified_in: string;
  spread: string;
  symptoms: any;
  lethality: string;
  vaccine: any;
  treatments: any;
  createdDate: number;
  updateDate: number;

}

export const Covid19VariantsModel = dynamoose.model<Covid19Variants>(
  process.env.COVID19_VARIANTS as string,
  //"gente",
  new dynamoose.Schema(
    {
      id: { "type": String, "hashKey": true },
      name: String,
      identified_in: String,
      spread: String,
      symptoms: Array,
      lethality: String,
      vaccine: Array,
      treatments: Array,
      createdDate: Number,
      updateDate: Number,

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
