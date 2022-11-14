const debounce = (callback, timeoutDelay) => {
  let timeoutId = 0;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeoutDelay, ...rest);
  };
};

export { debounce };
