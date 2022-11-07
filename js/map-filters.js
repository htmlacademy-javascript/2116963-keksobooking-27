const ANY_VALUE = 'any';
const priceClassToNumbers = {
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, Infinity],
};

const mapFiltersContainer = document.querySelector('.map__filters');
const mapFilters = mapFiltersContainer.querySelectorAll('fieldset, select');

const housingType = mapFiltersContainer.querySelector('#housing-type');
const housingPrice = mapFiltersContainer.querySelector('#housing-price');
const housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
const housingGuests = mapFiltersContainer.querySelector('#housing-guests');
const housingFeatures = mapFiltersContainer.querySelector('#housing-features').querySelectorAll('input');

const turnFiltersOff = () => {
  mapFiltersContainer.classList.add('map__filters--disabled');
  mapFilters.forEach((element) => {
    element.disabled = true;
  });
};

const turnFiltersOn = () => {
  mapFiltersContainer.classList.remove('map__filters--disabled');
  mapFilters.forEach((element) => {
    element.disabled = false;
  });
};

const checkPrice = (offer) => {
  if (housingPrice.value === ANY_VALUE) {
    return true;
  }
  const lowerLimit = priceClassToNumbers[housingPrice.value][0];
  const upperLimit = priceClassToNumbers[housingPrice.value][1];
  return offer.price >= lowerLimit && offer.price < upperLimit;
};

const checkFeatures = (advertFeatures) => {
  const checkedFeatures = [];
  for (const feature of housingFeatures) {
    if (feature.checked) {
      checkedFeatures.push(feature);
    }
  }
  if (!advertFeatures[0] && checkedFeatures[0]) {
    return false;
  } else if (advertFeatures[0] && checkedFeatures[0]) {
    return checkedFeatures.every((feature) => advertFeatures.includes(feature.value));
  }
  return true;
};

const checkFilters = (advert) => {
  const { offer, } = advert;
  const result = [
    housingType.value === offer.type || housingType.value === ANY_VALUE,
    housingRooms.value === offer.rooms || housingRooms.value === ANY_VALUE,
    housingGuests.value === offer.guests || housingGuests.value === ANY_VALUE,
    checkPrice(offer),
    checkFeatures(offer.features),
  ];
  return result.every((item) => item);
};

const setOnFiltersChange = (callback) => {
  mapFiltersContainer.addEventListener('change', callback);
};

const resetFilters = () => {
  mapFiltersContainer.reset();
};

export { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters };
