const mapCanvas = document.querySelector('#map-canvas');

const addPopup = (popup) => {
  mapCanvas.appendChild(popup);
};

export { addPopup };
