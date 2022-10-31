import { getOffers } from './data.js';
import { createPopup } from './popup.js';
import { addPopup } from './map.js';
import { turnFormOn } from './form.js';
import { turnFiltersOn } from './map-filters.js';

const popups = Array.from(getOffers(), (item) => createPopup(item));

addPopup(popups[0]);

turnFormOn();
turnFiltersOn();
