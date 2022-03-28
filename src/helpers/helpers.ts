
import dayjs, { OpUnitType } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import crypto from 'crypto';


dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

// Muestra un mensaje de error en rojo
export const error_message = (error: Error): void => {
    console.error('\x1b[41m', error.message, '\x1b[0m');
};

// Formatear una fecha con Dayjs
export const dateFormat = (format: string, date?: string): string => dayjs(date).format(format);

// devolver fecha actual y fecha personalizada
export const dateAddOrSubtractDays = (format: string, operation: 'add' | 'subtract', value: number, date?: string): string => {
    if (date) {
        if (operation == 'add') {
            return dayjs(date).add(value, 'day').format(format);
        } else {
            return dayjs(date).subtract(value, 'day').format(format);
        }
    } else {
        if (operation == 'add') {
            return dayjs().add(value, 'day').format(format);
        } else {
            return dayjs().subtract(value, 'day').format(format);
        }
    }
};

// Devolver la fecha actual en formato ISO
export const dateInISOString = (): string => dayjs().toISOString();

// Devolver una fecha en formato UNIX
export const dateInUNIX = (date: string, format: string, position?: 'start' | 'end', unit?: OpUnitType): number => {
    let timestamp = dayjs(date, format);
    switch (position) {
        case 'start':
            timestamp = timestamp.startOf(unit as OpUnitType);
            break;
        case 'end':
            timestamp = timestamp.endOf(unit as OpUnitType);
            break;
        default:
            break;
    }
    return timestamp.valueOf();
};

// Devolver objeto de dayjs
export const getTimestamp = (date?: string): dayjs.Dayjs => dayjs(date);

// Elegir un número aleatorio entre dos números
export const randomNumberBetween = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
};

// Ingresa un arreglo de objetos y retorna un solo objeto con clave y valor definidos
export const normalizeArray = (array: any[], key: string, value: string): any => {
    const result: any = {};
    for (const item of array) {
        result[item[key]] = item[value];
    }
    return result;
};

export const hashMD5 = (value: string): string => {
    return crypto.createHash('md5').update(value).digest('hex');
};



export const uniqueID = () => {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}


export const getWeekNumber = (): number => {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + 4 - (day.getDay() || 7));
    return Math.ceil((((+day - +new Date(day.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

export const deepCopy = <T>(object: T): T | undefined => {
    if (object) return JSON.parse(JSON.stringify(object)) as T;
    return undefined;
};

export const calculatePercentageOfOne = (total: number, value: number): number => {
    const realPercentage = roundTwoDecimals((value / total) * 100);
    return roundTwoDecimals(realPercentage / 100);
};

export const roundTwoDecimals = (num: number): number => {
    return +num.toFixed(2);
};



