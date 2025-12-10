const verse = document.querySelector("#verse");
const meaning = document.querySelector("#definition");
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const verseBook = urlParams.get('book');
const verseChapter = urlParams.get('chapter');
const verseNumber = urlParams.get('verse');

async function getVerse() {
    const response = await fetch("json/verses.json");
    const data = await response.json();
    displayVerse(data.verses);
}

const usedURL = "";

const displayVerse = (verses) => {
    verses.forEach((verse2) => {
        if (verse2.book == verseBook && verse2.chapter == verseChapter && verse2.verse == verseNumber) {
            const passage = document.createElement("h2");
            const book = verse2.book;
            const chapter = verse2.chapter;
            const verse1 = verse2.verse;
            const text = document.createElement("p");
            passage.innerHTML = `${book} ${chapter}:${verse1}`;
            text.textContent = `${verse2.text}`;
            let fullTect = text.textContent
            verse.appendChild(passage);
            let list = fullTect.split(" ");
            list.forEach(word => {
                const thisword = document.createElement("span");
                thisword.innerHTML = `${word} `;
                thisword.addEventListener("click", () => {
                    console.log("Omba'apoi hina!")
                    const usedURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${thisword.textContent}?key=8962be0b-43a0-48ca-bbfb-710215e73b3e`
                    fetchDefinition(usedURL);
                })
                verse.appendChild(thisword);
            });
            // Keep the Scripture Ready
            const recordItems = getLocalStorage("record") || [];
            recordItems.push(verse2);
            setLocalStorage("record", recordItems);
            // Keep the Time
            const recordTime = getLocalStorage("record-time") || [];
            let currrentTimeStamp = Date.now();
            recordTime.push(currrentTimeStamp);
            setLocalStorage("record-time", recordTime);
        }
    })
} 

getVerse();

async function fetchDefinition(usedURL) {
    try {
        const response = await fetch(usedURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            putMeaning(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function putMeaning(data) {
    meaning.textContent = data[0].shortdef[0];
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}