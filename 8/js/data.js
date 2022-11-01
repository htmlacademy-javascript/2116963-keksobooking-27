import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayItem, getRandomElements } from './util.js';

const OFFERS_COUNT = 10;
const Location = {
  MIN_LATITUDE: 35.65,
  MAX_LATITUDE: 35.7,
  MIN_LONGITUDE: 139.7,
  MAX_LONGITUDE: 139.8,
};
const RandomInteger = {
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

const getRandomLocation = () => ({
  latitude: getRandomPositiveFloat(Location.MIN_LATITUDE, Location.MAX_LATITUDE, 5),
  longitude: getRandomPositiveFloat(Location.MIN_LONGITUDE, Location.MAX_LONGITUDE, 5),
});

const createOffer = (id, location) => ({
  author: {
    avatar: `img/avatars/user${id < 10 ? `0${id}` : id}.png`,
  },
  offer: {
    title: getRandomArrayItem(TITLES),
    address: `${location.latitude}, ${location.longitude}`,
    price: getRandomPositiveInteger(RandomInteger.MIN, RandomInteger.MAX),
    type: getRandomArrayItem(TYPES),
    rooms: getRandomPositiveInteger(RandomInteger.MIN, RandomInteger.MAX),
    guests: getRandomPositiveInteger(RandomInteger.MIN, RandomInteger.MAX),
    checkin: getRandomArrayItem(CHECK_OPTIONS),
    checkout: getRandomArrayItem(CHECK_OPTIONS),
    features: getRandomElements(FEATURES),
    description: getRandomArrayItem(DESCRIPTIONS),
    photos: getRandomElements(PHOTOS),
  },
  location: {
    lat: location.latitude,
    lng: location.longitude,
  }
});

const getOffers = () => Array.from({ length: OFFERS_COUNT }, (_, index) => createOffer(index + 1, getRandomLocation()));

export { getOffers };
