import { getAdverts } from './data.js';
import { turnFormOn, turnFormOff } from './form.js';
import { turnFiltersOn, turnFiltersOff } from './map-filters.js';
import { initMap, onMapLoad, setAdMarkers } from './map.js';

const MARKERS_COUNT = 10;
const TOKIO_CENTER = [35.69710146763371, 139.7694347667951];

turnFormOff();
turnFiltersOff();

onMapLoad(() => {
  turnFormOn();
  turnFiltersOn();
  setAdMarkers(getAdverts(10), MARKERS_COUNT);
});
initMap(TOKIO_CENTER);
