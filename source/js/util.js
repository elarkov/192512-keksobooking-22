//генерация рандомного числа
function getRandomNumber(min, max) {
  let rand = Math.random() * (max - min) + min;
  return rand;
}

//проверка на отрицательное число
function checkNegativeNumber(min, max) {
  if (min < 0 || max < 0) {
    throw 'Число должно быть не меньше нуля!';
  }
}

//получение случайного числа из представленого диапазона чисел
function getIntegerNumber(min, max) {
  checkNegativeNumber(min, max);
  return Math.round(getRandomNumber(min, max));
}

//получение случайного числа с плавающей точкой из представленого диапазона чисел
function getFloatNumber(min, max, decimalNum) {
  //возводим в степень
  let degree = Math.pow(10, decimalNum);
  checkNegativeNumber(min, max);
  return Math.round(getRandomNumber(min, max) * degree) / degree;
}

//мешаем данные массива
function shuffleData(data) {

  let elems = data.slice();

  for (let i = elems.length - 1; i > 0; i--) {
    let j = getIntegerNumber(0, elems.length - 1);
    let temp = elems[i];
    elems[i] = elems[j];
    elems[j] = temp;
  }
  return elems;

}

export { getIntegerNumber, getFloatNumber, shuffleData };
