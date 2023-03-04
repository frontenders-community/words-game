const keys = document.querySelector('#keys');
const remainingChars = document.querySelector('#char');
const score = document.querySelector('#score');
const errors = document.querySelector('#errors');
const completed = document.querySelector('#completed');

const chars = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m'],
];
let words = [
    "briologia",
    "bromologia",
    "cachessia",
    "callido",
    "consentaneo",
    "docimastica",
    "entomologia",
    "etopea",
    "epitalamio",
    "erubiscente",
    "faldistorio",
    "flebotomo",
    "gipsoteca",
    "lalofobia",
    "lutolento",
    "epicedio",
    "eteroclito",
    "eupeptico",
    "filogino",
    "irrefragabile",
    "carpologia",
    "cervogia",
    "cernecchio",
    "clamide",
    "edace",
    "melologo",
    "onusto"
];
let writing = "";
let randomWord = "";
let currentWordIndex = 0;
let currentScore = 0;
let currentErrors = 0;

function renderKeys() {
    chars.forEach(items => {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let i = 0; i < items.length; i++) {
            const key = document.createElement('div');
            key.classList.add('key');
            key.id = `key-${items[i]}`;
            const kbd = document.createElement('kbd');
            kbd.textContent = items[i];
            key.appendChild(kbd);
            row.appendChild(key);
        }
        keys.appendChild(row);
    });
}

function init() {
    shuffleWords();
    renderKeys();
    showRandomWord();
}

function shuffleWords() {
    words = words.sort(() => Math.random() - 0.5);
}

function showRandomWord() {
    if (currentWordIndex >= words.length) {
        currentWordIndex = 0;
    }
    randomWord = words[currentWordIndex];
    remainingChars.textContent = randomWord;
    completed.textContent = "";
    currentWordIndex++;
}

document.body.addEventListener('keypress', function (event) {
    const key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i)) {
        const keyItem = document.getElementById(`key-${key}`);
        keyItem.classList.add('pressed');
    }
});

document.body.addEventListener('keyup', function (event) {
    const key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i)) {
        const keyItem = document.getElementById(`key-${key}`);
        keyItem.classList.remove('pressed');

        const currentIndex = writing.length;
        if (currentIndex < randomWord.length) {
            if (key === randomWord[currentIndex]) {
                currentScore += 1;
                writing += key;
                completed.textContent = writing;
                remainingChars.textContent = randomWord.slice(currentIndex+1, randomWord.length);
            } else {
                currentErrors += 1;
            }
            score.innerHTML = `${currentScore}`;
            errors.innerHTML = `${currentErrors}`;

            if (writing.length === randomWord.length) {
                showRandomWord();
                writing = "";
            }
        }
    }
});
