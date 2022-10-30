const adForm = document.querySelector('.ad-form');

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

export { turnFormOn, turnFormOff };
