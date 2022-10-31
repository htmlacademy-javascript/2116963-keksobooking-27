const mapFilters = document.querySelector('.map__filters');

const turnFiltersOff = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = true;
  });
};

const turnFiltersOn = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = false;
  });
};

export { turnFiltersOn, turnFiltersOff };
