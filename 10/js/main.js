import { createPopup } from './popup.js';
import { turnFormOn, turnFormOff, setAddress, setOnFormReset, setOnFormSubmit } from './form.js';
import { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters } from './map-filters.js';
import { initMap, setOnMapLoad, setAdvertMarkers, setOnMainMarkerMove, resetMap } from './map.js';

const MAP_CENTER = {
  lat: 35.69710146763371,
  lng: 139.7694347667951,
};

const loadingErrorMessage = document.querySelector('#loading-error').content.querySelector('.error');

const onLoadingErrorWindowClick = () => {
  document.body.removeChild(loadingErrorMessage);
  window.removeEventListener('click', onLoadingErrorWindowClick);
  window.removeEventListener('keydown', onLoadingErrorWindowKeydown);
};

function onLoadingErrorWindowKeydown(evt) {
  if (evt.key === 'Escape') {
    document.body.removeChild(loadingErrorMessage);
    window.removeEventListener('click', onLoadingErrorWindowClick);
    window.removeEventListener('keydown', onLoadingErrorWindowKeydown);
  }
}

const catchLoadingError = () => {
  document.body.appendChild(loadingErrorMessage);
  window.addEventListener('click', onLoadingErrorWindowClick);
  window.addEventListener('keydown', onLoadingErrorWindowKeydown);
};

const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => onSuccess(adverts))
    .catch(() => {
      catchLoadingError();
      onFail();
    });
};

const setFormOnSuccess = (adverts) => {
  turnFiltersOn();
  setAdvertMarkers(adverts, checkFilters, createPopup);
  setOnFormSubmit(() => {
    resetMap(MAP_CENTER);
    resetFilters();
    setAdvertMarkers(adverts, checkFilters, createPopup);
  });
  setOnFormReset(() => {
    resetMap(MAP_CENTER);
    resetFilters();
    setAdvertMarkers(adverts, checkFilters, createPopup);
  });
  setOnFiltersChange(() => setAdvertMarkers(adverts, checkFilters, createPopup));
};

const setFormOnFail = () => {
  setOnFormSubmit(() => {
    resetMap(MAP_CENTER);
    resetFilters();
  });
  setOnFormReset(() => {
    resetMap(MAP_CENTER);
    resetFilters();
  });
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
