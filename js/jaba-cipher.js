let inputField = document.getElementById('cipher-input'); //получаем текст
let outputField = document.getElementById('cipher-output'); //выводим шифрованный текст
const vowelFirst = new RegExp('^[аеёиоуыэюя]+[^:,?!_()]+$', 'i'); //регэксп для слов на гласные (но без спецсимволов)
const consonantFirst = new RegExp('^[бвгджзйклмнпрстфхцчшщ]+[^:,?!_()]+$', 'i'); //регэксп для слов на согласные (также без спецсимволов)
const exVowel = new RegExp('(уэкэ)$', ''); //регэксп для шифрованных гласных
const exConsonant = new RegExp('^(аэкэ)', ''); //регэксп для шифрованных согласных
const cipherAttribute = new RegExp('🐸+', 'g'); //регэксп для распознавания шифрованного текста

inputField.addEventListener('keyup', function() { //проверяем какой текст получили и либо шифруем, либо дешифруем
  if (!cipherAttribute.test(inputField.value)) {
    outputField.innerText = makejabaCipher(inputField.value);
  } else {
    outputField.innerText = decipherer(inputField.value);
  }
});

function makejabaCipher(str) {
  let wordByWordStr = str.split(/\s/); //разбивает предложение пословно

  for (let i = 0; i < wordByWordStr.length; i++) {
    if (vowelFirst.test(wordByWordStr[i])) { //добавляет окончание гласным
      wordByWordStr[i] = wordByWordStr[i] + 'уэкэ';
    } else if (consonantFirst.test(wordByWordStr[i])) { //добавляет начало и окончание согласным и переставляет букву
        let LastletterOfWord = wordByWordStr[i].match(/^[бвгджзйклмнпрстфхцчшщ]{1}/i);
        wordByWordStr[i] = wordByWordStr[i].replace(/^[бвгджзйклмнпрстфхцчшщ]{1}/i, 'аэкэ') + LastletterOfWord + 'рэкэ'; //confusing words with consonants
    }
  }

  let randomNum = Math.floor(Math.random() * (wordByWordStr.length - 1) + 1);

  for (let j = 0; j < randomNum; j++) { //ставит эмодзи жаб в рандомные места
    let randomJabsNumber = Math.floor(Math.random() * (wordByWordStr.length));
    wordByWordStr[randomJabsNumber] = wordByWordStr[randomJabsNumber] + ' 🐸';
  }

  return wordByWordStr.join(' '); //return JabaCipher
};

function decipherer(str) {
  let wordByWordStr = str.split(/\s/).filter(item => item !== '🐸'); //разбивает строку пословно и фильтрует от эмодзи
  let decipheredStr = [];

  for (let word of wordByWordStr) {
    switch(true) {
      case exVowel.test(word): //дешифрует бывшие слова на гласные
        decipheredStr.push(word.replace(/уэкэ$/, ''));
        break;
      case exConsonant.test(word): //дешифрует бывшие слова на согласные
        let newWord = word.replace(/^аэкэ/, '').replace(/рэкэ$/, '');
        let LastletterOfDeciphererWord= newWord.match(/[бвгджзйклмнпрстфхцчшщ]{1}$/i);
        decipheredStr.push(LastletterOfDeciphererWord + newWord.replace(/[бвгджзйклмнпрстфхцчшщ]{1}$/i, ''));
        break;
      default: //не трогает слова со спецсимволами и союзы
        decipheredStr.push(word);
    }
  }

  return decipheredStr.join(' ');
};
