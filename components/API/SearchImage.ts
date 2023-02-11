import axios from "axios";
import { RapidAPIKey } from "../../constants/rapidAPIkey";

export default async function SearchImage(search : string) : Promise<string> {    
    const request = 
    {
        method: "GET",
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {q: search, pageNumber: '1', pageSize: '1', autoCorrect: 'true'},
        headers: {
            'X-RapidAPI-Key': RapidAPIKey,
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        }
    }

    return new Promise( (resolve, reject) => {
        axios(request).then(function (response) {
            const result:string = response.data.value[0].url; // thumbnail just
            resolve(result);
        }).catch(function (error) {
            console.error(error);
            reject(error);
        });
    });
}