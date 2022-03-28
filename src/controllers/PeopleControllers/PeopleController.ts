import { Request, Response } from 'express';
import SwapiService from '../../services/SwapiService';
import PeopleReturnEs from '../../modelsReturn/PeopleReturnEs';
import PeopleResultsEs from '../../modelsReturn/PeopleResultsEs';


export async function getPeople(req: Request, res: Response) {

    const indexParams = parseInt(req.params.index);
    if (indexParams < 10 && indexParams > 0) {

        const result = await getPeopleService(indexParams) //Llamamos al servicio para obtener la lista de gente dependiendo el index enviado
        try {
            if (result.results != undefined && result.results?.length > 0) { //validamos los posibles respuestas sin datos
                let arrayEs: any = []
                let resultEs: PeopleReturnEs = {  //declaramos variable "resultEs" modelo PeopleReturnEs 
                    count: result.count,
                    next: result.next,
                    results: arrayEs,
                }
                for (const item of result.results) {// seteo valores del modelo en ingles al del español
                    let dataPeopleEs: PeopleResultsEs = { // respuesta con los parametros en español modelo "PeopleResultsEs" 
                        nombre: item.name,
                        altura: item.height,
                        masa: item.mass,
                        color_cabello: item.hair_color,
                        color_piel: item.skin_color,
                        color_ojos: item.eye_color,
                        anio_nacimiento: item.birth_year,
                        genero: item.gender,
                        mundo_natal: item.homeworld,
                        peliculas: item.films,
                        especies: item.species,
                        vehiculos: item.vehicles,
                        naves_estelares: item.starships,
                        url: item.url,
                        creado: item.created,
                        editado: item.edited,
                    }
                    resultEs.results?.push(dataPeopleEs)
                }
                //respuesta
                res.json({
                    status: true,
                    message: "list people swapi",
                    data: resultEs
                });
            }

        } catch (error) {
            res.json({
                status: false,
                message: "ERROR_LIST",
                data: error
            });
        }
    }
    else {
        //respuesta si es mayor o menor el el valor del indice al que permite el api SWAPI
        res.json({
            status: false,
            message: "Index debe ser menor de 10 y mayor que 0",
        });
    }
}


//service 
async function getPeopleService(index: number) {
    const swapiService = new SwapiService();
    let response = await swapiService.getPeopleService(index)
    return response
}




