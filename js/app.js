const form = document.querySelector('#form');
const blockResult = document.querySelector('#hidden');
const calcBtn = document.querySelector('#calc_btn');

// Находим Инпуты
const priceInput = document.querySelector('#price-input');
const volumeInput = document.querySelector('#volume-input');
const poverInput = document.querySelector('#pover-input');

// Находим Таможенная пошлина и Утилизационный сбор
const volumeInputRUB = document.querySelector('#volume-input--RUB');

// Находим Аукционная стоимость
const auctionPriceJPY = document.querySelector('#auction-price--JPY');
const auctionPriceRUB = document.querySelector('#auction-price--RUB');
// Находим Расходы в Японии от
const expensesJapanJPY = document.querySelector('#expenses-japan--JPY');
const expensesJapanRUB = document.querySelector('#expenses-japan--RUB');
// Фрахт до Владивостока:
const freightToVladivostokUSD = document.querySelector('#freight-to-vladivostok--USD');
const freightToVladivostokRUB = document.querySelector('#freight-to-vladivostok--RUB');
// Итого
const totalJapan = document.querySelector('#total-japan');

// Находим Расходы в России
const customsClearanceRUB = document.querySelector('#customs-clearance--rub');
const temporaryStorageRUB = document.querySelector('#temporary-storage--rub');
const companyCommissionRUB = document.querySelector('#company-commission--rub');
const drivingVladivostokRUB = document.querySelector('#driving-vladivostok--rub');
const totalRUB = document.querySelector('#total--rub');

// Получем текстконтент Расходы по России
const customsClearanceRUBText = +customsClearanceRUB.textContent;
const temporaryStorageRUBText = +temporaryStorageRUB.textContent;
const companyCommissionRUBText = +companyCommissionRUB.textContent;
const drivingVladivostokRUBText = +drivingVladivostokRUB.textContent;

// Текстовые поля
const textError = document.querySelector('#text-error');
const priceText = document.querySelector('#price-text');
const totalResultSumText = document.querySelector('#total-result-sum');

// Текстовые поля курсов валют
const textJPY = document.querySelector('#text--JPY');
const textUSD = document.querySelector('#text--USD');
const textEUR = document.querySelector('#text--EUR');


// Получаем элемент <select>
const selectElement = document.getElementById("mySelect");

// Вызываем функцию при загрузке страницы



// Адрес API ЦБ для получения курса валют
const apiUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

// Переменные евро и иены
let jpyRate;
let euroRate;
let usdRate;

// сколько евро в 1 рубле
let euroRateRUB;
let jpyRateRUB;

// Функция для получения курса иена и евро к рублю
function getRate() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      jpyRate = data.Valute.JPY.Value / 100;
      euroRate = data.Valute.EUR.Value;
      usdRate = data.Valute.USD.Value;
      
    })
};

let totalJapanConvert;

// Вызов функции для получения курса
getRate();

form.addEventListener('input', function() {

    euroRateRUB = +priceInput.value / euroRate;
    jpyRateRUB = jpyRate * +priceInput.value;
    
    // text
    priceText.textContent = +jpyRateRUB.toFixed(2) + ' руб';
    // Выводим Аукционная стоимость
    auctionPriceJPY.textContent = priceInput.value;
    auctionPriceRUB.textContent = +jpyRateRUB.toFixed(0);
    // Выводим Расходы в Японии от
    expensesJapanJPY.textContent = 95000;
    let expensesJapanConvert = jpyRate * 950000;
    expensesJapanRUB.textContent = expensesJapanConvert.toFixed(0);
    // Выводим Фрахт до Владивостока
    freightToVladivostokUSD.textContent = 500;
    let freightToVladivostokConvert = usdRate * 500;
    freightToVladivostokRUB.textContent = freightToVladivostokConvert.toFixed(0);
    // Выводим итого
    totalJapanConvert = +jpyRateRUB + +expensesJapanConvert + +freightToVladivostokConvert;
    totalJapan.textContent = totalJapanConvert.toFixed(0);
    
    
    
    // Выводим курсы валют
    textJPY.textContent = 'JPY/RUB: ' + jpyRate.toFixed(2)
    textUSD.textContent = 'USD/RUB: ' + usdRate.toFixed(2)
    textEUR.textContent = 'EUR/RUB: ' + euroRate.toFixed(2)
    
    if (parseFloat(volumeInput.value) > 1900) {
        textError.textContent = 'Согласно санкций установлен запрет на экспорт автомобилей в Россию с объемом двигателя свыше 1900 куб.см.';
    }
    else {
        textError.textContent = '';
    }
    

});


let customsDuty;
let result;
let sumResult;


// Функция появления блока с результатами
calcBtn.addEventListener('click', function(e) {
    e.preventDefault()
    if (priceInput.value <= 50) {
        textError.textContent = 'Пожалуйста заполните все поля';
        return;
    }
    else if (volumeInput.value <= 0) {
        textError.textContent = 'Пожалуйста заполните все поля';
        return;
    }
    else if (parseFloat(volumeInput.value) > 1900) {
        textError.textContent = 'Согласно санкций установлен запрет на экспорт автомобилей в Россию с объемом двигателя свыше 1900 куб.см.';
        return;
    }
    else if (poverInput.value <= 0) {
        textError.textContent = 'Пожалуйста заполните все поля';
        return;
    }
    
    blockResult.classList.remove('hidden');
    
    const selectedOption = selectElement.value;
    
    if (selectedOption === "option1") {
    input1 = parseFloat(priceInput.value) * parseFloat(jpyRate);
    input2 = parseFloat(volumeInput.value) * euroRate + (0.17 * 20000) * 0.54;
    // Пересчитываем euro в рубли
    const euroRate8500 = parseFloat(euroRate) * 8500;
    const euroRate16700 = parseFloat(euroRate) * 16700;
    const euroRate42300 = parseFloat(euroRate) * 42300;
    const euroRate84500 = parseFloat(euroRate) * 84500;
    const euroRate169000 = parseFloat(euroRate) * 169000;
    
    
    if (input1 <= euroRate8500) {
    let minSum = input2 * 2.5;  // Вычисляем минимальную сумму
    let sum = input1 * 0.54;  // Вычисляем сумму с коэффициентом  

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  }
      
    else if (input1 <= euroRate16700) {
    let minSum = input2 * 3.5;  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate42300) {
    let minSum = input2 * 5.5;  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate84500) {
    let minSum = input2 * 7.5;  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate169000) {
    let minSum = input2 * 15;  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
  // Выводим результат в текстовое содержимое блока
  volumeInputRUB.textContent = result.toFixed(0);  // где переменная result содержит ваш результат
    
  // Считаем сумму Расходы по России
  sumResult = result + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
  totalRUB.textContent = sumResult.toFixed(0);
        
  // Считаем общую сумму и выводим
  const totalResultSum = sumResult + totalJapanConvert;
  totalResultSumText.textContent = 'Итого общая сумма: ' + totalResultSum.toFixed(0) + ' руб.';
  
  return result;  // Возвращаем результат   
}

    if (selectedOption === "option2") {
    if (parseFloat(volumeInput.value) > 1800) {
        customsDuty = (parseFloat(volumeInput.value) * (2.7 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
        
    }
    else if (parseFloat(volumeInput.value) > 1500) {
        customsDuty = (parseFloat(volumeInput.value) * (2.5 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) > 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (1.7 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) <= 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (1.5 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
        
    // Считаем таможенную пошлину
    volumeInputRUB.textContent = parseFloat(customsDuty).toFixed(0);
    
    // Считаем сумму Расходы по России
    const sum = customsDuty + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
    totalRUB.textContent = sum.toFixed(0);
        
    // Считаем общую сумму и выводим
    const totalResultSum = sum + totalJapanConvert;
    totalResultSumText.textContent = 'Итого общая сумма: ' + totalResultSum.toFixed(0) + ' руб.';
};
    
    if (selectedOption === "option3") {
    if (parseFloat(volumeInput.value) > 1800) {
        customsDuty = (parseFloat(volumeInput.value) * (4.8 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
        
    }
    else if (parseFloat(volumeInput.value) > 1500) {
        customsDuty = (parseFloat(volumeInput.value) * (3.5 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) > 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (3.2 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) <= 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (3 * euroRate)) + (0.17 * 20000);
        textError.textContent = '';
    }  
        
    // Считаем таможенную пошлину
    volumeInputRUB.textContent = parseFloat(customsDuty).toFixed(0);
    
    // Считаем сумму Расходы по России
    const sum = customsDuty + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
    totalRUB.textContent = sum.toFixed(0);
        
    // Считаем общую сумму и выводим
    const totalResultSum = sum + totalJapanConvert;
    totalResultSumText.textContent = 'Итого общая сумма: ' + totalResultSum.toFixed(0) + ' руб.';
};
    
});