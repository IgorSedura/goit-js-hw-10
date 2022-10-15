import './css/styles.css';
const countryInfoRef = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

fetch(
  'https://restcountries.com/v3.1/name/peru?fields=name,capital,population,flags,languages'
)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    createMarkup(data);
    const markup = createMarkup(data);
    countryInfoRef.innerHTML = markup;
  });

function createMarkup([{ population, flags, capital, languages, name }]) {
  return `<div class="title__wraper">
    <img class="flag" src="${flags.svg}" alt="flag" width= "150px" />
    <p class="card__item"><span> ${name.official}</span></p>
    <p class="card__item">Capital: <span>${capital}</span></p>
    <p class="card__item">Population: <span>${
      population / 1000000
    } million people </span></p>
    <p class="card__item">Languages: <span>${languages.spa}</span></p>
  </div>`;
}
