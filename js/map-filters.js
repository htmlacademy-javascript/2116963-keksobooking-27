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
const housingFeatures = mapFiltersContainer.querySelector('#housing-features');

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
  return offer.price >= lowerLimit && offer.price < upperLimit;
};

const checkFeatures = (advertFeatures) => {
  const checkedFeatures = housingFeatures.querySelectorAll(':checked');
  if (checkedFeatures.length) {
    if (advertFeatures.length) {
      return Array.from(checkedFeatures).every((feature) => advertFeatures.includes(feature.value));
    }
    return false;
  }
  return true;
};

const checkFilters = (advert) => {
  const { offer, } = advert;
  return checkType(offer) && checkRooms(offer) && checkGuests(offer)
    && checkPrice(offer) && checkFeatures(offer.features);
};

const setOnFiltersChange = (callback) => {
  mapFiltersContainer.addEventListener('change', () => callback());
};

const resetFilters = () => {
  mapFiltersContainer.reset();
};

export { turnFiltersOn, turnFiltersOff, checkFilters, setOnFiltersChange, resetFilters };
