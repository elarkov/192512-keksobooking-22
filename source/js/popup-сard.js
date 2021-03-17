const createPopup = (offer) => {
  const templateCard = document.querySelector('#card').content;
  const newCard = templateCard.querySelector('.popup');
  const cardElement = newCard.cloneNode(true);
  const titlePopup = cardElement.querySelector('.popup__title');
  const addressPopup = cardElement.querySelector('.popup__text--address');
  const pricePopup = cardElement.querySelector('.popup__text--price');
  const typePopup = cardElement.querySelector('.popup__type');
  const capacityPopup = cardElement.querySelector('.popup__text--capacity');
  const timePopup = cardElement.querySelector('.popup__text--time');
  const featuresPopup = cardElement.querySelector('.popup__features');
  const descPopup = cardElement.querySelector('.popup__description');
  const photosPopup = cardElement.querySelector('.popup__photos');
  const avatarPopup = cardElement.querySelector('.popup__avatar');

  titlePopup.textContent = offer.offer.title;
  addressPopup.textContent = offer.offer.address;
  pricePopup.textContent = `${offer.offer.price} ₽/ночь`;
  typePopup.textContent = offer.offer.type;
  capacityPopup.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  timePopup.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  featuresPopup.innerHTML = offer.offer.features.map((el) => {
    return `<li class="popup__feature popup__feature--${el}"></li>`;
  }).join('');

  descPopup.textContent = offer.offer.description;

  photosPopup.innerHTML = offer.offer.photos.map((el) => {
    return `<img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
  }).join('');

  avatarPopup.src = offer.author.avatar;

  return cardElement;

};

export { createPopup };
