const MESSAGE_EVENTS = ['click', 'keydown'];
const SEND_URL = 'https://27.javascript.pages.academy/keksobooking';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const advertForm = document.querySelector('.ad-form');
const advertFormFields = advertForm.querySelectorAll('fieldset');
const roomNumberField = advertForm.querySelector('#room_number');
const capacityField = advertForm.querySelector('#capacity');
const houseTypeField = advertForm.querySelector('#type');
const priceField = advertForm.querySelector('#price');
const timeInField = advertForm.querySelector('#timein');
const timeOutField = advertForm.querySelector('#timeout');
const address = advertForm.querySelector('#address');

const avatarInput = advertForm.querySelector('#avatar');
const avatarPreview = advertForm.querySelector('.ad-form-header__preview');
const avatarBasicImage = avatarPreview.querySelector('img');

const housePhotoInput = advertForm.querySelector('#images');
const housePhotoPreview = advertForm.querySelector('.ad-form__photo');

const priceSlider = advertForm.querySelector('.ad-form__slider');

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
  advertForm.classList.add('ad-form--disabled');
  advertFormFields.forEach((element) => {
    element.disabled = true;
  });
  priceSlider.setAttribute('disabled', true);
};

const turnFormOn = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFormFields.forEach((element) => {
    element.disabled = false;
  });
  priceSlider.removeAttribute('disabled');
};

const setAddress = (location) => {
  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
};

const pristine = new Pristine(advertForm, {
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
    to(value) {
      return value.toFixed(0);
    },
    from(value) {
      return parseFloat(value);
    }
  },
});
priceField.value = '';

const updateSliderRange = () => {
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: houseTypeToPrice[houseTypeField.value],
      max: +priceField.max,
    },
  });
};

const updateSliderStart = () => {
  priceSlider.noUiSlider.updateOptions({
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
  updateSliderRange();
  updateSliderStart();
};

const onSliderSlide = () => {
  priceField.value = priceSlider.noUiSlider.get();
  pristine.validate(priceField);
};

const onPriceInput = () => {
  updateSliderStart();
};

const onTimeChange = (evt) => {
  if (evt.target.name === 'timein') {
    timeOutField.value = evt.target.value;
  } else if (evt.target.name === 'timeout') {
    timeInField.value = evt.target.value;
  }
};

const onPhotoChange = (photoInput, preview) => () => {
  const file = photoInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    if (photoInput === avatarInput) {
      avatarBasicImage.style.visibility = 'hidden';
    }
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
};

const resetPhotoPreviews = () => {
  avatarPreview.style.backgroundImage = 'none';
  housePhotoPreview.style.backgroundImage = 'none';
  avatarBasicImage.style.visibility = 'visible';
};

roomNumberField.addEventListener('change', onRoomNumberChange);
houseTypeField.addEventListener('change', onTypeChange);

priceSlider.noUiSlider.on('slide', onSliderSlide);
priceField.addEventListener('input', onPriceInput);

advertForm.querySelector('.ad-form__element--time').addEventListener('change', onTimeChange);

avatarInput.addEventListener('change', onPhotoChange(avatarInput, avatarPreview));
housePhotoInput.addEventListener('change', onPhotoChange(housePhotoInput, housePhotoPreview));

const inputItems = advertForm.querySelectorAll('input, textarea');
const selectionItems = advertForm.querySelectorAll('select');

const resetForm = () => {
  resetPhotoPreviews();
  inputItems.forEach((item) => {
    if (item.type === 'checkbox') {
      item.checked = false;
    } else {
      item.value = '';
    }
  });
  selectionItems.forEach((item) => {
    item.value = item.querySelector('[selected]').value;
  });
  priceField.placeholder = houseTypeToPrice[houseTypeField.value];
  pristine.reset();
  priceSlider.noUiSlider.reset();
};

const submitButton = advertForm.querySelector('.ad-form__submit');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');


const setResultMessage = (message) => {
  const onWindowEvent = (evt) => {
    if (evt.type === 'click' || evt.key === 'Escape') {
      document.body.removeChild(message);
      MESSAGE_EVENTS.forEach((eventName) => window.removeEventListener(eventName, onWindowEvent));
    }
  };

  document.body.appendChild(message);
  MESSAGE_EVENTS.forEach((eventName) => window.addEventListener(eventName, onWindowEvent));
};

let onFormSubmitCallback;
const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    const formData = new FormData(evt.target);
    fetch(SEND_URL,
      {
        method: 'POST',
        body: formData
      })
      .then((response) => {
        if (response.ok) {
          setResultMessage(successMessage);
          resetForm();
          onFormSubmitCallback();
        } else {
          setResultMessage(errorMessage);
        }
      })
      .catch(() => {
        setResultMessage(errorMessage);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }
};

const setOnFormSubmit = (callback) => {
  onFormSubmitCallback = callback;
  advertForm.addEventListener('submit', onFormSubmit);
};

const setOnFormReset = (callback) => {
  advertForm.addEventListener('reset', (evt) => {
    evt.preventDefault();
    resetForm();
    callback();
  });
};

export { turnFormOn, turnFormOff, setAddress, setOnFormReset, setOnFormSubmit, setResultMessage };
