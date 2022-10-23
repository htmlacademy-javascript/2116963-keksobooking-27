import { getOffers } from './data.js';

const Types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const popupTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const showElement = (element, dataItem, show) => {
  if (dataItem) {
    show();
  } else {
    element.remove();
  }
};

const addTitle = (popup, data) => {
  const popupTitle = popup.querySelector('.popup__title');
  const dataTitle = data.offer.title;
  showElement(popupTitle, dataTitle, () => {
    popupTitle.textContent = dataTitle;
  });
};

const addAddress = (popup, data) => {
  const popupAddress = popup.querySelector('.popup__text--address');
  const dataAddress = data.offer.address;
  showElement(popupAddress, dataAddress, () => {
    popupAddress.textContent = dataAddress;
  });
};

const addDescription = (popup, data) => {
  const popupDescription = popup.querySelector('.popup__description');
  const dataDescription = data.offer.description;
  showElement(popupDescription, dataDescription, () => {
    popupDescription.textContent = dataDescription;
  });
};

const addPrice = (popup, data) => {
  const popupPrice = popup.querySelector('.popup__text--price');
  const dataPrice = data.offer.price;
  showElement(popupPrice, dataPrice, () => {
    popupPrice.querySelector('[data-price]').textContent = dataPrice;
  });
};

const addType = (popup, data) => {
  const popupType = popup.querySelector('.popup__type');
  const dataType = data.offer.type;
  showElement(popupType, popupType, () => {
    popupType.textContent = Types[dataType];
  });
};

const addCapacity = (popup, data) => {
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const dataRooms = data.offer.rooms;
  const dataGuests = data.offer.guests;
  showElement(popupCapacity, dataRooms || dataGuests, () => {
    const partOne = dataRooms ? `${dataRooms} комнаты ` : '';
    const partTwo = dataGuests ? `для ${dataGuests} гостей` : '';
    popupCapacity.textContent = partOne + partTwo;
  });
};

const addTime = (popup, data) => {
  const popupTime = popup.querySelector('.popup__text--time');
  const dataCheckin = data.offer.checkin;
  const dataCheckout = data.offer.checkout;
  showElement(popupTime, dataCheckin || dataCheckout, () => {
    if (dataCheckin && dataCheckout) {
      popupTime.textContent = `Заезд после ${dataCheckin}, выезд до ${dataCheckout}`;
    } else if (dataCheckin) {
      popupTime.textContent = `Заезд после ${dataCheckin}`;
    } else {
      popupTime.textContent = `Выезд до ${dataCheckout}`;
    }
  });
};

const addFeatures = (popup, data) => {
  const popupFeatures = popup.querySelector('.popup__features');
  const dataFeatures = data.offer.features;
  showElement(popupFeatures, dataFeatures?.length, () => {
    popup.querySelectorAll('.popup__feature')
      .forEach((popupFeature) => {
        const hasFeature = dataFeatures.some((feature) => popupFeature.classList.contains(`popup__feature--${feature}`));
        if (!hasFeature) {
          popupFeature.remove();
        }
      });
  });
};

const addPhotos = (popup, data) => {
  const popupPhotos = popup.querySelector('.popup__photos');
  const dataPhotos = data.offer.photos;
  showElement(popupPhotos, dataPhotos?.length, () => {
    dataPhotos.forEach((photo) => {
      const popupPhoto = popup.querySelector('.popup__photo')
        .cloneNode(false);
      popupPhoto.src = photo;
      popupPhotos.append(popupPhoto);
    });
    popupPhotos.querySelector(':nth-child(1)').remove();
  });
};

const addAvatar = (popup, data) => {
  const popupAvatar = popup.querySelector('.popup__avatar');
  const dataAvatar = data.author.avatar;
  showElement(popupAvatar, dataAvatar, () => {
    popupAvatar.src = dataAvatar;
  });
};

const createPopup = (data) => {
  const popup = popupTemplate.cloneNode(true);

  addTitle(popup, data);
  addAddress(popup, data);
  addDescription(popup, data);
  addPrice(popup, data);
  addType(popup, data);
  addCapacity(popup, data);
  addTime(popup, data);
  addFeatures(popup, data);
  addPhotos(popup, data);
  addAvatar(popup, data);

  return popup;
};

const getPopups = () => Array.from(getOffers(), (item) => createPopup(item));

export { getPopups };
