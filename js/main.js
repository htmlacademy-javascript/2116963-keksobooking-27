import { getAdverts } from './data.js';
import { createPopup } from './popup.js';
import { turnFormOn, turnFormOff, setAddress, setOnFormReset } from './form.js';
import { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters } from './map-filters.js';
import { initMap, setOnMapLoad, setAdvertMarkers, setOnMainMarkerMove, resetMap } from './map.js';

const MARKERS_COUNT = 10;
const MAP_CENTER = {
  lat: 35.69710146763371,
  lng: 139.7694347667951,
};

const adverts = getAdverts(10).slice(0, MARKERS_COUNT);

turnFormOff();
turnFiltersOff();

setOnMapLoad(() => {
  setAdvertMarkers(adverts, checkFilters, createPopup);
  setOnMainMarkerMove(setAddress);
  setAddress(MAP_CENTER);
  turnFormOn();
  turnFiltersOn();
  setOnFormReset(() => {
    resetMap(MAP_CENTER);
    resetFilters();
    setAdvertMarkers(adverts, checkFilters, createPopup);
  });
  setOnFiltersChange(() => {
    setAdvertMarkers(adverts, checkFilters, createPopup);
  });
});
initMap(MAP_CENTER);
