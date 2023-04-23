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
  return arr
    .map(({ name: { common }, flags: { svg } }) => {
      return `<li class="country-list-item">
    <img class="country-list-img" src="${svg}" alt="${common}">
    <p class="country-list-text">${common}</p></li>`;
    })
    .join('');
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
      const languagesString = Object.values(languages).join(', ');

      return `<li class="country-info-item">
    <div class="container">
    <img class="country-info-img" src="${svg}" alt="${official}">
    <h1 class="country_info-title">${official}</h1>
    </div>
    <p><span class="country_info-text">Capital:</span>${capital}</p>
    <p><span class="country_info-text">Population:</span>${population}</p>
    <p><span class="country_info-text">Languages:</span>${languagesString}</p>
</li>`;
    }
  );
}
