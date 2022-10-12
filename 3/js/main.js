const OFFERS_COUNT = 10;
const LOCATION = {
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7,
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
};
const RANDOM_INTEGER = {
  MIN: 1,
  MAX: 1000000,
};
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECK_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TITLES = [
  'Квартира в центре города',
  'Дом за городом',
  'Дворец с видом на море',
  'Отель рядом с метро',
];
const DESCRIPTIONS = [
  'Сдаю квартиру.',
  'Все удобства.',
  'Прекрасный вид из окна и парк рядом.',
  'Все в шаговой доступности.',
];

const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomPositiveFloat = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0) {
    return NaN;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return +(Math.random() * (max - min) + min).toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomLocation = () => ({
  latitude: (() => getRandomPositiveFloat(LOCATION.MIN_LATITUDE, LOCATION.MAX_LATITUDE, 5))(),
  longitude: (() => getRandomPositiveFloat(LOCATION.MIN_LONGITUDE, LOCATION.MAX_LONGITUDE, 5))(),
});

const getRandomElements = (elements) => {
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    if (getRandomPositiveInteger(0, 1)) {
      result.push(elements[i]);
    }
  }
  return result;
};

const createOffer = (index, RandomLocation) => ({
  author: {
    avatar: `img/avatars/user${index < 10 ? `0${index}` : index}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${RandomLocation.latitude}, ${RandomLocation.longitude}`,
    price: getRandomPositiveInteger(RANDOM_INTEGER.MIN, RANDOM_INTEGER.MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(RANDOM_INTEGER.MIN, RANDOM_INTEGER.MAX),
    guests: getRandomPositiveInteger(RANDOM_INTEGER.MIN, RANDOM_INTEGER.MAX),
    checkin: getRandomArrayElement(CHECK_OPTIONS),
    checkout: getRandomArrayElement(CHECK_OPTIONS),
    features: getRandomElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRandomElements(PHOTOS),
  },
  location: {
    lat: RandomLocation.latitude,
    lng: RandomLocation.longitude,
  }
});

const getOffers = () => Array.from({length: OFFERS_COUNT}, (_, index) => createOffer(index + 1, getRandomLocation()));

getOffers();
