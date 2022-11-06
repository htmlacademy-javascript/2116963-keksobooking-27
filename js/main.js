import { getAdverts } from './data.js';
import { createPopup } from './popup.js';
import { turnFormOn, turnFormOff, setAddress } from './form.js';
import { turnFiltersOn, turnFiltersOff } from './map-filters.js';
import { initMap, setOnMapLoad, setAdMarkers, setOnMainMarkerMove } from './map.js';

const MARKERS_COUNT = 10;
const MAP_CENTER = {
  lat: 35.69710146763371,
  lng: 139.7694347667951,
};

turnFormOff();
turnFiltersOff();

setOnMapLoad(() => {
  setAdMarkers(getAdverts(10), MARKERS_COUNT, createPopup);
  setOnMainMarkerMove(setAddress);
  setAddress(MAP_CENTER);
  turnFormOn();
  turnFiltersOn();
});
initMap(MAP_CENTER);
