function getRandomPositiveInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  if ((!Number.isInteger(min) && !Number.isInteger(max)) && (max - min < 1)) {
    return NaN;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPositiveFloat(min, max, digits) {
  if (typeof min !== 'number' || typeof max !== 'number' || typeof digits !== 'number') {
    return NaN;
  }
  if (min < 0 || max < 0 || digits < 0) {
    return NaN;
  }
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}

getRandomPositiveInt(0, 0);
getRandomPositiveFloat(0, 0, 0);
