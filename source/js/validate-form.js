import { showMsg, showError } from './show-message.js';
import { setInitStartPin, createMarks, removeMarker } from './map.js';
import { createSubmit } from './create-fetch.js';
import { offers, SIMILAR_OFFER_COUNT } from './filter.js';

const mainForm = document.querySelector('.ad-form');
const typeField = mainForm.querySelector('#type');
const inputFieldPrice = mainForm.querySelector('#price');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');
const roomNumber = mainForm.querySelector('#room_number');
const capacityGuests = mainForm.querySelectorAll('#capacity option');
const formFilter = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');

const typeApartment = {
  bungalow: 0,
  flat: 1000,
  palace: 10000,
  house: 5000,
};

const numberRoom = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formFilter.reset();
  removeMarker();
  createMarks(offers.slice(0, SIMILAR_OFFER_COUNT));
  setInitStartPin();
});

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  createSubmit(
    formData,
    () => {
      mainForm.reset();
      formFilter.reset();
      removeMarker();
      createMarks(offers.slice(0, SIMILAR_OFFER_COUNT));
      showMsg();
      setInitStartPin();
    },
    () => {
      showError();
    },
  );
});

typeField.addEventListener('change', () => {
  inputFieldPrice.min = typeApartment[typeField.value];
  inputFieldPrice.placeholder = typeApartment[typeField.value];
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const setDisabledOption = () => {
  capacityGuests.forEach((el) => {
    const isAvailable = numberRoom[roomNumber.value].includes(el.value);
    el.selected = isAvailable;
    el.disabled = !isAvailable;
  });
};

setDisabledOption();

roomNumber.addEventListener('change', setDisabledOption);







