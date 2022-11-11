import { getAdverts } from './data.js';
import { createPopup } from './popup.js';
import { turnFormOn, turnFormOff, setAddress, setOnFormReset, setOnFormSubmit } from './form.js';
import { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters } from './map-filters.js';
import { initMap, setOnMapLoad, setAdvertMarkers, setOnMainMarkerMove, resetMap } from './map.js';

const MAP_CENTER = {
  lat: 35.69710146763371,
  lng: 139.7694347667951,
};

const adverts = getAdverts(50);

turnFormOff();
turnFiltersOff();

setOnMapLoad(() => {
  setAdvertMarkers(adverts, checkFilters, createPopup);
  setOnMainMarkerMove(setAddress);
  setAddress(MAP_CENTER);
  turnFormOn();
  turnFiltersOn();
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
});
initMap(MAP_CENTER);
