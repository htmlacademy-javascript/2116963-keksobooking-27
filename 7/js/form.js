const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('#address');
const roomNumberField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const roomsToCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const turnFormOff = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = true;
  });
};

const turnFormOn = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

const validateCapacity = (value) => roomsToCapacity[roomNumberField.value].includes(value);

const capacityErrorMessage = () => {
  if (roomNumberField.value === '100') {
    return adForm.querySelector('[name="capacity"]').querySelector('[value="0"]').textContent;
  }
  return `Количество гостей: ${roomsToCapacity[roomNumberField.value].join(', ')}`;
};

pristine.addValidator(capacityField, validateCapacity, capacityErrorMessage);

const onAddressFocus = () => {
  addressField.blur();
};

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

const onCapacityChange = () => {
  pristine.validate(capacityField);
};

addressField.addEventListener('focus', onAddressFocus);
roomNumberField.addEventListener('change', onRoomNumberChange);
capacityField.addEventListener('change', onCapacityChange);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { turnFormOn, turnFormOff };
