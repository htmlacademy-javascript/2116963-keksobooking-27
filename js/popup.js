const houseTypeEngToRus = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const popupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const addDescription = (popup, description) => {
  const popupDescription = popup.querySelector('.popup__description');
  if (description !== '') {
    popupDescription.textContent = description;
  } else {
    popupDescription.remove();
  }
};

const addPhotos = (popup, photos) => {
  const popupPhotoContainer = popup.querySelector('.popup__photos');
  if (photos.length > 0) {
    const popupPhoto = popup.querySelector('.popup__photo');
    photos.forEach((photo) => {
      const photoItem = popupPhoto.cloneNode(false);
      photoItem.src = photo;
      popupPhotoContainer.appendChild(photoItem);
    });
    popupPhoto.remove();
  } else {
    popupPhotoContainer.remove();
  }
};

const addFeatures = (popup, features) => {
  if (features.length > 0) {
    popup.querySelectorAll('.popup__feature')
      .forEach((popupFeature) => {
        const hasFeature = features.some((feature) => popupFeature.classList.contains(`popup__feature--${feature}`));
        if (!hasFeature) {
          popupFeature.remove();
        }
      });
  } else {
    popup.querySelector('.popup__features').remove();
  }
};

const createPopup = (advert) => {
  const popup = popupTemplate.cloneNode(true);

  const { description = '', photos = [], features = [], ...offer } = advert.offer;

  addDescription(popup, description);
  addPhotos(popup, photos);
  addFeatures(popup, features);

  popup.querySelector('.popup__avatar').src = advert.author.avatar;
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').querySelector('[data-price]').textContent = offer.price;
  popup.querySelector('.popup__type').textContent = houseTypeEngToRus[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  return popup;
};

export { createPopup };
