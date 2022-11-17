const MESSAGE_EVENTS = ['click', 'keydown'];

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

export { setResultMessage };
