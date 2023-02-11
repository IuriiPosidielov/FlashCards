import axios from "axios";
import { RapidAPIKey } from "../../constants/rapidAPIkey";

export default async function Translate(word: string, fromLanguage: string, toLanguage : string) : Promise<string> {
    const formData = new FormData();
    formData.append("source_language", fromLanguage);
    formData.append("target_language", toLanguage);
    formData.append("text", word);

    const request = 
    {
        method: "post",
        url: "https://text-translator2.p.rapidapi.com/translate",
        data: formData,
        headers: { 
            "Content-Type": "multipart/form-data", 
            'X-RapidAPI-Key': RapidAPIKey,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    }

    return new Promise( (resolve, reject) => {
        axios(request).then(function (response) {
            const result:string = response.data.data.translatedText;
            resolve(result);
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    });
}