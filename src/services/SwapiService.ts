import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import PeopleReturnEn from '../modelsReturn/PeopleReturnEn';

dotenv.config();

class SwapiService {
    
    private urlSwapi: string = process.env.URLSWAPI ? process.env.URLSWAPI : "" //url base para obtener gente

    public async getPeopleService(index: number): Promise<PeopleReturnEn> {
        
        let response : any = await fetch(`${this.urlSwapi}${index}`); //concatenamos url base con index
        const data = await response.json(); //parseamos a json la respuesta
        let results : any = []
        for (const people of data.results) { //obtenemos nombres y datos de la gente
            results.push(people)
        }
        return {    //respuesta
            count: data.count ? data.count : 0,
            next: data.next? data.next : "",
            results: results.length > 0 ? results : []
        };

    }

}
export default SwapiService;