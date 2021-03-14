import { showMsg } from './show-message.js';
import { showError } from './show-message.js';
import { setInitStartPin } from './map.js';
import { createSubmit } from './create-fetch.js';

const mainForm = document.querySelector('.ad-form');
const typeField = mainForm.querySelector('#type');
const inputFieldPrice = mainForm.querySelector('#price');
const timeIn = mainForm.querySelector('#timein');
const timeOut = mainForm.querySelector('#timeout');
const roomNumber = mainForm.querySelector('#room_number');
const capacityGuests = mainForm.querySelectorAll('#capacity option');



const TypeApartment = {
  bungalow: 0,
  flat: 1000,
  palace: 10000,
  house: 5000,
};

const NumberRoom = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  createSubmit(
    formData,
    () => {
      mainForm.reset();
      showMsg();
      setInitStartPin();
    },
    () => {
      showError();
    },
  );
});

typeField.addEventListener('change', () => {
  inputFieldPrice.min = TypeApartment[typeField.value];
  inputFieldPrice.placeholder = TypeApartment[typeField.value];
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const setDisabledOption = () => {
  capacityGuests.forEach(el => {
    el.removeAttribute('selected');
    el.disabled = true;
    if (NumberRoom[roomNumber.value].includes(el.value)) {
      el.setAttribute('selected', true);
      el.disabled = false;
    }
  });
};

setDisabledOption();

roomNumber.addEventListener('change', setDisabledOption);







