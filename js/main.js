import { createPopup } from './popup.js';
import { turnFormOn, turnFormOff, setAddress, setOnFormReset, setOnFormSubmit } from './form.js';
import { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters } from './map-filters.js';
import { initMap, setOnMapLoad, setAdvertMarkers, setOnMainMarkerMove, resetMap } from './map.js';
import { setResultMessage } from './messages.js';
import { debounce } from './utils.js';

const MAP_CENTER = {
  lat: 35.69710146763371,
  lng: 139.7694347667951,
};

const RERENDER_DELAY = 500;

const GET_URL = 'https://27.javascript.pages.academy/keksobooking/data';

const loadingErrorMessage = document.querySelector('#loading-error').content.querySelector('.error');

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      setResultMessage(loadingErrorMessage);
      onFail();
    });
};

const debounceAdvertMarkers = debounce(setAdvertMarkers, RERENDER_DELAY);

const resetOnSuccess = (adverts) => {
  resetMap(MAP_CENTER);
  resetFilters();
  setAdvertMarkers(adverts, checkFilters, createPopup);
};

const resetOnFail = () => {
  resetMap(MAP_CENTER);
  resetFilters();
};

const setFormOnSuccess = (adverts) => {
  turnFiltersOn();
  setAdvertMarkers(adverts, checkFilters, createPopup);
  setOnFormSubmit(() => resetOnSuccess(adverts), setResultMessage);
  setOnFormReset(() => resetOnSuccess(adverts));
  setOnFiltersChange(() => debounceAdvertMarkers(adverts, checkFilters, createPopup));
};

const setFormOnFail = () => {
  setOnFormSubmit(resetOnFail, setResultMessage);
  setOnFormReset(resetOnFail);
};

turnFormOff();
turnFiltersOff();

setOnMapLoad(() => {
  turnFormOn();
  setAddress(MAP_CENTER);
  setOnMainMarkerMove(setAddress);
  getData(
    setFormOnSuccess,
    setFormOnFail
  );
});
initMap(MAP_CENTER);
