import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';




const DEBOUNCE_DELAY = 300;

const refs = {
    inputCountry: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const choiseCountries = value => {
    const choiseQuestion = refs.inputCountry.value.trim().toLowerCase();
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (choiseQuestion.length > 0) {
        fetchCountries(choiseQuestion)
        .then(data => {
            console.log(data);

    if (data.length > 10) {
        console.log('data1 :', data);
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
    } else if (data.length >= 2 && data.length <= 10) {
        console.log('data2 :', data);
        makeCountryCard(data);
    } else {
        makeCountryCard(data);
        console.log('data3 :', data);
    }
        }).catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');    
        });
    }
};

refs.inputCountry.addEventListener('input',
    debounce(choiseCountries, DEBOUNCE_DELAY)
);

const makeCountryCard = countries => {
    const countryBorders = countries.map(country => {
        return `<div class="countries">
        <img class="countries__img" src="${
            country.flags.svg
        }" alt="flag of ${country.name.common}" height = 100 width = 200>
        <p class="countries__list">${country.name.common}</p>
        </div>
        <p class="countries__text">CAPITAL: ${country.capital}</p>
        <p class="countries__text">POPULATION: ${country.population}</p>
        <p class="countries__text">LANGUAGES: ${Object.values(
            country.languages
        )}</p>`;
    }).join('');
    return (refs.countryInfo.innerHTML = countryBorders);
};

const makeCountryCards = countries => {
 const countriesBorders = countries.map(country => {
     return `<li class="countries__item"><img class="countries__img"></li>`
 }).join('');
 return (refs.countryList.innerHTML = countriesBorders);
};