const mapFiltersContainer = document.querySelector('.map__filters');
const mapFilters = mapFiltersContainer.querySelectorAll('fieldset, select');

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

export { turnFiltersOn, turnFiltersOff };
