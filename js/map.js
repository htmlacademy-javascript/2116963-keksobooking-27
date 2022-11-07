const VIEW_ZOOM = 12;
const MARKERS_COUNT = 10;

const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const ADVERT_PIN_ICON = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    icon: MAIN_PIN_ICON,
    draggable: true,
  }
);

const setAdvertMarkers = (adverts, checkFilters, createPopup) => {
  markerGroup.clearLayers();
  let count = 1;
  for (const advert of adverts) {
    if (checkFilters(advert)) {
      const marker = L.marker(
        {
          lat: advert.location.lat,
          lng: advert.location.lng,
        },
        {
          icon: ADVERT_PIN_ICON,
        }
      );

      marker.addTo(markerGroup).bindPopup(createPopup(advert));

      if (count === MARKERS_COUNT) {
        break;
      }
      count++;
    }
  }
};

const initMap = (location) => {
  map.setView(location, VIEW_ZOOM);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  mainMarker.setLatLng(location).addTo(map);
};

const setOnMapLoad = (callback) => {
  map.on('load', () => callback());
};

const setOnMainMarkerMove = (callback) => {
  mainMarker.on('move', (evt) => callback(evt.target.getLatLng()));
};

const resetMap = (location) => {
  map.setView(location, VIEW_ZOOM);
  mainMarker.setLatLng(location).addTo(map);
};

export { initMap, setOnMapLoad, setAdvertMarkers, setOnMainMarkerMove, resetMap };
