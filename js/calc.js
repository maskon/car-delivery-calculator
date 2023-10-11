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
    const priceTextValue1 = jpyRateRUB.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    priceText.textContent = priceTextValue1 + ' руб';
    // Выводим Аукционная стоимость
    auctionPriceJPY.textContent = '(' + priceInput.value + ')' + 'JPY';
    auctionPriceRUB.textContent = jpyRateRUB.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    // Выводим Расходы в Японии от
    expensesJapanJPY.textContent = '(95000 JPY)';
    let expensesJapanConvert = jpyRate * 95000;
    expensesJapanRUB.textContent = expensesJapanConvert.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    // Выводим Фрахт до Владивостока
    freightToVladivostokUSD.textContent = '(500 USD)';
    let freightToVladivostokConvert = usdRate * 500;
    freightToVladivostokRUB.textContent = freightToVladivostokConvert.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    // Выводим итого
    totalJapanConvert = +jpyRateRUB + +expensesJapanConvert + +freightToVladivostokConvert;
    totalJapan.textContent = totalJapanConvert.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    
    
    
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
    input2 = parseFloat(volumeInput.value) * euroRate;
    // Пересчитываем euro в рубли
    const euroRate8500 = parseFloat(euroRate) * 8500;
    const euroRate16700 = parseFloat(euroRate) * 16700;
    const euroRate42300 = parseFloat(euroRate) * 42300;
    const euroRate84500 = parseFloat(euroRate) * 84500;
    const euroRate169000 = parseFloat(euroRate) * 169000;
    
    
    if (input1 <= euroRate8500) {
    let minSum = input2 * 2.5 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.54;  // Вычисляем сумму с коэффициентом  

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  }
      
    else if (input1 <= euroRate16700) {
    let minSum = input2 * 3.5 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate42300) {
    let minSum = input2 * 5.5 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate84500) {
    let minSum = input2 * 7.5 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
    else if (input1 <= euroRate169000) {
    let minSum = input2 * 15 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  }
        
    else if (input1 > euroRate169000) {
    let minSum = input2 * 20 + (0.17 * 20000);  // Вычисляем минимальную сумму
    let sum = input1 * 0.48;  // Вычисляем сумму с коэффициентом

    if (sum >= minSum) {
      result = sum;  // Если сумма больше или равна минимальной, присваиваем результат переменной result
    } else {
      result = minSum;  // Если сумма меньше минимальной, присваиваем результат переменной result
    }
  } 
    
  // Считаем таможенную пошлину 
    if  (result < 200000) {
        result += 775;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 450000) {
        result += 1550;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 1200000) {
        result += 3100;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 2700000) {
        result += 8530;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 4200000) {
        result += 12000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 5500000) {
        result += 15500;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 7000000) {
        result += 20000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 8000000) {
        result += 23000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 9000000) {
        result += 25000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (result < 10000000) {
        result += 27000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else {
        result += 30000;
        volumeInputRUB.textContent = result.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    
  // Считаем сумму Расходы по России
  sumResult = result + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
  totalRUB.textContent = sumResult.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
        
  // Считаем общую сумму и выводим
  const totalResultSum = sumResult + totalJapanConvert;
  totalResultSumText.textContent = 'Конечная стоимость автомобиля во Владивостоке ' + totalResultSum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    }); + ' руб.';
  
  return result;  // Возвращаем результат   
}

    if (selectedOption === "option2") {
    if (parseFloat(volumeInput.value) > 1800) {
        customsDuty = (parseFloat(volumeInput.value) * (2.7 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
        
    }
    else if (parseFloat(volumeInput.value) > 1500) {
        customsDuty = (parseFloat(volumeInput.value) * (2.5 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) > 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (1.7 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) <= 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (1.5 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
        
    // Считаем таможенную пошлину 
    if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 200000) {
        customsDuty += 775;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 450000) {
        customsDuty += 1550;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 1200000) {
        customsDuty += 3100;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 2700000) {
        customsDuty += 8530;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 4200000) {
        customsDuty += 12000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 5500000) {
        customsDuty += 15500;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 7000000) {
        customsDuty += 20000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 8000000) {
        customsDuty += 23000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 9000000) {
        customsDuty += 25000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 10000000) {
        customsDuty += 27000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else {
        customsDuty += 30000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    
    // Считаем сумму Расходы по России
    const sum = customsDuty + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
    totalRUB.textContent = sum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
        
    // Считаем общую сумму и выводим
    const totalResultSum = sum + totalJapanConvert;
    totalResultSumText.textContent = 'Конечная стоимость автомобиля во Владивостоке ' + totalResultSum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    }); + ' руб.';
};
    
    if (selectedOption === "option3") {
    if (parseFloat(volumeInput.value) > 1800) {
        customsDuty = (parseFloat(volumeInput.value) * (4.8 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
        
    }
    else if (parseFloat(volumeInput.value) > 1500) {
        customsDuty = (parseFloat(volumeInput.value) * (3.5 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) > 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (3.2 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
    else if (parseFloat(volumeInput.value) <= 1000) {
        customsDuty = (parseFloat(volumeInput.value) * (3 * euroRate)) + (0.26 * 20000);
        textError.textContent = '';
    }  
        
    // Считаем таможенную пошлину 
    if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 200000) {
        customsDuty += 775;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 450000) {
        customsDuty += 1550;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 1200000) {
        customsDuty += 3100;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 2700000) {
        customsDuty += 8530;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 4200000) {
        customsDuty += 12000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 5500000) {
        customsDuty += 15500;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 7000000) {
        customsDuty += 20000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 8000000) {
        customsDuty += 23000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 9000000) {
        customsDuty += 25000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else if (parseFloat(priceInput.value) * parseFloat(jpyRate) < 10000000) {
        customsDuty += 27000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
    else {
        customsDuty += 30000;
        volumeInputRUB.textContent = customsDuty.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
    }
        
    // Считаем сумму Расходы по России
    const sum = customsDuty + customsClearanceRUBText + temporaryStorageRUBText + companyCommissionRUBText + drivingVladivostokRUBText
    totalRUB.textContent = sum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    });
        
    // Считаем общую сумму и выводим
    const totalResultSum = sum + totalJapanConvert;
    totalResultSumText.textContent = 'Конечная стоимость автомобиля во Владивостоке ' + totalResultSum.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,      
        maximumFractionDigits: 2,
    }) + ' руб.';
};
    
});