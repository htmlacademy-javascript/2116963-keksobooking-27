import { getOffers } from './data.js';
import { createPopup } from './popup.js';
import { addPopup } from './map.js';

const popups = Array.from(getOffers(), (item) => createPopup(item));

addPopup(popups[0]);