import { createMarks, removeMarker, removeElementDisabled, addElementDisabled } from './map.js';
import { createFetch } from './create-fetch.js';
import { showErrorData } from './show-message.js';

const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const typePrice = filterForm.querySelector('#housing-price');
const typeRoom = filterForm.querySelector('#housing-rooms');
const typeGuest = filterForm.querySelector('#housing-guests');
const formFilter = document.querySelector('.map__filters');
const formFilterChildren = formFilter.children;
const formFilterElements = Array.from(formFilterChildren);

const SIMILAR_OFFER_COUNT = 10;
const DELAY = 500;

addElementDisabled(formFilter, formFilterElements);


const filterPrice = (offer, price) => {
  if (price === 'any') {
    return true;
  }
  if (offer.offer.price <= 10000 && price === 'low') {
    return true;
  }
  if (offer.offer.price > 10000 && offer.offer.price <= 50000 && price === 'middle') {
    return true;
  }
  if (offer.offer.price > 50000 && price === 'high') {
    return true;
  }
  return false;
};

const filterTypeHouse = (offer, type) => {
  if (type === 'any' || offer.offer.type === type) {
    return true;
  }
  return false;
};

const filterRooms = (offer, room) => {
  if (room === 'any') {
    return true;
  }
  if (Number(room) === Number(offer.offer.rooms)) {
    return true;
  }
  return false;
};

const filterGuests = (offer, guest) => {
  if (guest === 'any') {
    return true;
  }
  if (Number(guest) === offer.offer.guests) {
    return true;
  }
  return false;
};

const compareFeature = (offer) => {
  const featureElems = filterForm.querySelectorAll('.map__checkbox:checked');
  const featureList = Array.from(featureElems).map(el => el.value);
  return featureList.every((feature) => offer.offer.features.includes(feature));
};


const filterOffers = (offers) => {
  const elems = offers.filter((offer) => {
    return filterTypeHouse(offer, typeHouse.value) && filterPrice(offer, typePrice.value) && filterRooms(offer, typeRoom.value) && filterGuests(offer, typeGuest.value) && compareFeature(offer);
  });
  return elems;
};


let offers = [];

createFetch(
  (data) => {
  /*global _:readonly*/
  offers = data;
  removeElementDisabled(formFilter, formFilterElements);
  createMarks(offers.slice(0, SIMILAR_OFFER_COUNT));
  filterForm.addEventListener('change', _.debounce(() => {
    const filterData = filterOffers(offers);
    removeMarker();
    createMarks(filterData.slice(0, SIMILAR_OFFER_COUNT));
  }, DELAY));
  }, () => {
    showErrorData();
  },
);

export { offers, SIMILAR_OFFER_COUNT };






