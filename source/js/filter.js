import { createMarks, removeMarker, removeElementDisabled, addElementDisabled } from './map.js';
import { createFetch } from './create-fetch.js';
import { showErrorData } from './show-message.js';

const SIMILAR_OFFER_COUNT = 10;
const DELAY = 500;
const DEFAULT_FILTER = 'any';
const PRICES = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
  [DEFAULT_FILTER]: {
    min: 0,
    max: Infinity,
  },
};
const FIELDS_TYPE = {
  low: 'low',
  middle: 'middle',
  high: 'high',
  any: 'any',
};

const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const typePrice = filterForm.querySelector('#housing-price');
const typeRoom = filterForm.querySelector('#housing-rooms');
const typeGuest = filterForm.querySelector('#housing-guests');
const formFilter = document.querySelector('.map__filters');
const formFilterChildren = formFilter.children;
const formFilterElements = Array.from(formFilterChildren);

addElementDisabled(formFilter, formFilterElements);

const filterPrice = (offer, price) => {

  const priceSettings = PRICES[price];
  return priceSettings && offer.offer.price >= priceSettings.min && offer.offer.price < priceSettings.max;
};

const filterTypeHouse = (offer, type) => {
  if (type === FIELDS_TYPE.any || offer.offer.type === type) {
    return true;
  }
  return false;
};

const filterRooms = (offer, room) => {
  if (room === FIELDS_TYPE.any || Number(room) === Number(offer.offer.rooms)) {
    return true;
  }
  return false;
};

const filterGuests = (offer, guest) => {
  if (guest === FIELDS_TYPE.any || Number(guest) === offer.offer.guests) {
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
  const filteredOffers = [];
  for (let offer of offers) {
    const isOk = filterTypeHouse(offer, typeHouse.value)
      && filterPrice(offer, typePrice.value)
      && filterRooms(offer, typeRoom.value)
      && filterGuests(offer, typeGuest.value)
      && compareFeature(offer);
    if (isOk) {
      filteredOffers.push(offer);
      if (filteredOffers.length >= SIMILAR_OFFER_COUNT) {
        break;
      }
    }
  }
  return filteredOffers;
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






