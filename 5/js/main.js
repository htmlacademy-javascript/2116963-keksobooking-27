import { getPopups } from './popup.js';

const popups = getPopups();
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(popups[0]);
