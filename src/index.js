import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountry } from './fetchCountry';
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

function outputClear(evt) {
  const country = evt.target.value.trim().toLowerCase();
  console.log(country);
  if (!country) {
    countryInfoRef.innerHTML = '';
    countryListRef.innerHTML = '';
    return;
  }
  fetchCountry(country)
    .then(data => {
      console.log(data);

      if (data.length === 1) {
        const markupInfo = countryInfo(data);
        countryInfoRef.innerHTML = markupInfo;
        countryListRef.innerHTML = '';
      } else if (data.length >= 2 && data.length <= 10) {
        const countriesList = data.map(countryList).join('');
        countryListRef.innerHTML = countriesList;
        countryInfoRef.innerHTML = '';
      } else {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function countryInfo([{ population, flags, capital, languages, name }]) {
  return `<div class="title__wraper">
    <img class="flag" src="${
      flags.svg
    }" alt="flag" width= "50px" <p  class = "name"><span> ${
    name.official
  } </span></p>> 
    
    <p class="card__item">Capital: <span>${capital}</span></p>
    <p class="card__item">Population: <span>${
      population / 1000000
    } million people </span></p>
    <p class="card__item">Languages: <span>${Object.values(
      languages
    )}</span></p>
  </div>`;
}

function countryList({ flags, name }) {
  return ` <li><img class="flag" src="${flags.svg}" alt="flag" width= "50px" <p class="card__item"><span class_name> ${name.official}</span></p></li>
    `;
}

searchInput.addEventListener('input', debounce(outputClear, DEBOUNCE_DELAY));
