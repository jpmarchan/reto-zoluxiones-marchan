import CryptoJS from "crypto-js";

export const encrypt = (value: string): string => {
    return CryptoJS.AES.encrypt(value, process.env.SECRETHASH ? process.env.SECRETHASH : "").toString();
};

export const decrypt = (value: string): string => {
    var bytes = CryptoJS.AES.decrypt(value, process.env.SECRETHASH ? process.env.SECRETHASH : "");
    return bytes.toString(CryptoJS.enc.Utf8);
};


export const hashMD5 = (value: string): string => {
    return CryptoJS.MD5(value).toString();
};

