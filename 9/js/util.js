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

const getRandomArrayItem = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

const getRandomElements = (elements) => {
  const items = [];
  for (let i = 0; i < elements.length; i++) {
    if (getRandomPositiveInteger(0, 1)) {
      items.push(elements[i]);
    }
  }
  return items;
};

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayItem, getRandomElements };
