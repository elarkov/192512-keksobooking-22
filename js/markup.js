import { createSimilarOffers } from './data.js';

const templateCard = document.querySelector('#card').content;
const newCard = templateCard.querySelector('.popup');

const cardFragment = document.createDocumentFragment();
const mapCanvas = document.querySelector('.map__canvas');

const similarCards = createSimilarOffers(1);


similarCards.forEach(({ offer, author }) => {
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

  titlePopup.textContent = offer.title;
  addressPopup.textContent = offer.address;
  pricePopup.textContent = `${offer.price} ₽/ночь`;
  typePopup.textContent = offer.type;
  capacityPopup.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  timePopup.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  featuresPopup.innerHTML = offer.features.map(el => {
    return `
      <li class="popup__feature popup__feature--${el}"></li>
    `;
  }).join('');
  descPopup.textContent = offer.description;
  photosPopup.innerHTML = offer.photos.map(el => {
    return `
      <img src="${el}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>
    `
  }).join('');
  avatarPopup.src = author.avatar;
  cardFragment.appendChild(cardElement);
});

mapCanvas.appendChild(cardFragment);
