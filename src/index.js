import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    list.innerHTML = ``;
    countryInfo.innerHTML = ``;
  }
  const arrCountries = fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Cogito ergo sum');
      } else if (data.length > 1 && data.length < 10) {
        countryInfo.innerHTML = ``;
        list.innerHTML = twoCreateMarkup(data);
      } else if (data.length === 1) {
        list.innerHTML = ``;
        countryInfo.innerHTML = oneCreateMarkup(data);
        console.log(data);
      }
    })
    .catch(err => console.log(err));
  console.log();
}

function twoCreateMarkup(arr) {
  return arr.map(
    ({ name: { official }, flags: { svg } }) =>
      ` <li>
    <img class="country-list-img" src="${svg}" alt="${official}">
    <p class="country-list-text">${official}</p>
    
</li>`
  );
}

function oneCreateMarkup(arr) {
  return arr.map(
    ({
      name: { official },
      capital,
      population,
      languages,
      flags: { svg },
    }) => {
      const languagesString = Object.values(languages).join(',');
      const capitalInfo = `Capital:${capital}`;
      const populationInfo = `Population:${population}`;
      const languagesInfo = `Languages: ${languagesString}`;
      return `<li>
    <img class="country-info-img" src="${svg}" alt="${official}">
    <span class="country_info-text">${capitalInfo}</span>
    <span class="country_info-text">${populationInfo}</span>
    <span class="country_info-text">${languagesInfo}</span>
</li>`;
    }
  );
}
