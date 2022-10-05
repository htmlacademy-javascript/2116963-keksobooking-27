const getRandomPositiveInt = (min, max) => {
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
  return +((Math.random() * (max - min) + min).toFixed(digits));
};

getRandomPositiveInt(0, 0);
getRandomPositiveFloat(0, 0, 0);
