const inputCountries = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
    return fetch(
        `https://restcountries.com/v3.1/name/${name}${inputCountries}`
    ).then(response => {
     if (!response.ok) {
         throw new Error(response.status);
     } 
     return response.json(); 
    });
};