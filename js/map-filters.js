const ANY_VALUE = 'any';
const priceValueToNumbers = {
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


const checkType = (offer) => housingType.value === offer.type || housingType.value === ANY_VALUE;
const checkRooms = (offer) => +housingRooms.value === offer.rooms || housingRooms.value === ANY_VALUE;
const checkGuests = (offer) => +housingGuests.value === offer.guests || housingGuests.value === ANY_VALUE;

const checkPrice = (offer) => {
  if (housingPrice.value === ANY_VALUE) {
    return true;
  }
  const lowerLimit = priceValueToNumbers[housingPrice.value][0];
  const upperLimit = priceValueToNumbers[housingPrice.value][1];
  return offer.price >= lowerLimit && offer.price <= upperLimit;
};

const checkFilters = (advert, checkedFeatures) => {
  const { offer, } = advert;
  return checkType(offer) && checkRooms(offer) && checkGuests(offer) && checkPrice(offer)
    && checkedFeatures.every((feature) => offer.features?.includes(feature.value));
};

const setOnFiltersChange = (callback) => {
  mapFiltersContainer.addEventListener('change', () => callback());
};

const resetFilters = () => {
  mapFiltersContainer.reset();
};

export { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters };
