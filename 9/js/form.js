const adForm = document.querySelector('.ad-form');
const adFormFields = adForm.querySelectorAll('fieldset');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const houseTypeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const address = adForm.querySelector('#address');

const priceSlider = adForm.querySelector('.ad-form__slider');

const roomsToCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const houseTypeToPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const turnFormOff = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFields.forEach((element) => {
    element.disabled = true;
  });
};

const turnFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFields.forEach((element) => {
    element.disabled = false;
  });
};

const setAddress = (location) => {
  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

noUiSlider.create(priceSlider, {
  range: {
    min: houseTypeToPrice[houseTypeField.value],
    max: +priceField.max,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

const updateSlider = () => {
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: houseTypeToPrice[houseTypeField.value],
      max: +priceField.max,
    },
    start: priceField.value,
  });
};

const validateCapacity = (value) => roomsToCapacity[roomNumberField.value].includes(value);

const validatePrice = (value) => +value >= houseTypeToPrice[houseTypeField.value];

const capacityOptionZero = capacityField.querySelector('[value="0"]');

const getCapacityErrorMessage = () => {
  if (roomNumberField.value === '100') {
    return capacityOptionZero.textContent;
  }
  return `Количество гостей: ${roomsToCapacity[roomNumberField.value].join(', ')}`;
};

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

pristine.addValidator(priceField, validatePrice, () => `Минимальная цена ${houseTypeToPrice[houseTypeField.value]}`);

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

const onTypeChange = () => {
  priceField.placeholder = houseTypeToPrice[houseTypeField.value];
  pristine.validate(priceField);
  updateSlider();
};

const onSliderUpdate = () => {
  priceField.value = priceSlider.noUiSlider.get();
  pristine.validate(priceField);
};

const onPriceChange = (evt) => {
  if (evt.target.value >= houseTypeToPrice[houseTypeField.value] && evt.target.value <= +priceField.max) {
    updateSlider();
  }
};

const onTimeChange = (evt) => {
  if (evt.target.name === 'timein') {
    timeOutField.value = evt.target.value;
  } else if (evt.target.name === 'timeout') {
    timeInField.value = evt.target.value;
  }
};

roomNumberField.addEventListener('change', onRoomNumberChange);
houseTypeField.addEventListener('change', onTypeChange);

priceSlider.noUiSlider.on('update', onSliderUpdate);
priceField.addEventListener('input', onPriceChange);

adForm.querySelector('.ad-form__element--time').addEventListener('change', onTimeChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { turnFormOn, turnFormOff, setAddress };
