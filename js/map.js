import { createPopup } from './popup.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const adPinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    icon: mainPinIcon,
    draggable: true,
  }
);

const setAdMarkers = (adverts, quantity) => {
  markerGroup.clearLayers();
  adverts.slice(0, quantity).forEach((advert) => {
    const marker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );

    marker.addTo(markerGroup).bindPopup(createPopup(advert));
  });
};

const initMap = (location) => {
  map.setView(location, 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  mainMarker.setLatLng(location).addTo(map);
};

const onMapLoad = (callback) => {
  map.on('load', callback);
};

export { initMap, onMapLoad, setAdMarkers };
