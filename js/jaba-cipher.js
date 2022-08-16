function jabaCipher(str) {
  const vowel = new RegExp(/^[аеёиоуыэюя]+[^:,?!_()]+$/, "i"); //regexp for vowels
  const consonant = new RegExp(/^[бвгджзйклмнпрстфхцчшщ]+[^:,?!_()]+$/, "i"); //regexp for consonants
  let wordByWordStr = str.split(/[\s]/); //divide the string word by word
  for (let i = 0; i < wordByWordStr.length; i++) { //adding the jaba last word parts
    if (vowel.test(wordByWordStr[i])) {
      wordByWordStr[i] = wordByWordStr[i] + "уэкэ";
    } else if (consonant.test(wordByWordStr[i])) {
        let LastPartOfWord = wordByWordStr[i].match(/^[бвгджзйклмнпрстфхцчшщ]+/i); 
        wordByWordStr[i] = wordByWordStr[i].replace(/^[бвгджзйклмнпрстфхцчшщ]+/i, "аэкэ") + LastPartOfWord + "рэкэ"; //confusing words with consonants
    }
  }
  let randomNum = Math.floor(Math.random() * (wordByWordStr.length - 1)) + 1;
  if (Math.floor(wordByWordStr.length / 3) >= 1) { //adding the jaba emodzi throw random places
    for (let j = 0; j < randomNum; j++) {
      let randomJabs = Math.floor(Math.random() * (wordByWordStr.length));
      wordByWordStr[randomJabs] = wordByWordStr[randomJabs] + " 🐸";
    }
  }
  return wordByWordStr.join(" "); //return JabaCipher
};

let str = document.getElementById("cipher-input"); //get input text from textarea
let cipherStr = document.getElementById("cipher-output"); //get output text field

str.addEventListener("keypress", function() { //creating text inside <p> tag
  cipherStr.innerText = jabaCipher(str.value);
});
