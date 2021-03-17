const showPopup = (id, className) => {
  const templateCard = document.querySelector(id).content;
  const newCard = templateCard.querySelector(className);
  const cardElement = newCard.cloneNode(true);
  const container = document.querySelector('main');

  container.appendChild(cardElement);

  const onSend = (evt) => {
    if (evt.code === 'Escape') {
      cardElement.remove();
      document.removeEventListener('keydown', onSend);
    }
  };

  document.addEventListener('keydown', onSend);
  cardElement.addEventListener('click', () => {
    cardElement.remove();
  });
};

const showMsg = () => {
  showPopup('#success', '.success');
};

const showError = () => {
  showPopup('#error', '.error');
};

const showErrorData = () => {
  showPopup('#data', '.error');
};

export { showMsg, showError, showErrorData };
