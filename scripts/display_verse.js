const verse = document.querySelector("#verse");
const meaning = document.querySelector("#definition");
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const verseBook = urlParams.get('book');
const verseChapter = urlParams.get('chapter');
const verseNumber = urlParams.get('verse');

async function getVerse() {
    const response = await fetch("data/verses.json");
    const data = await response.json();
    displayVerse(data.verses);
}

const usedURL = "";
let wordToSearch = "";

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
                    wordToSearch = `${thisword.textContent}`;
                    const usedURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${thisword.textContent}?key=8962be0b-43a0-48ca-bbfb-710215e73b3e`
                    fetchDefinition(usedURL);
                    document.querySelector('.highlight')?.classList.remove('highlight');
                    thisword.classList.add("highlight");
                })
                verse.appendChild(thisword);
            });
            // Keep the Scripture Read
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
            // console.log(data);
            putMeaning(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function putMeaning(data) {
    meaning.textContent = "";

    let wordToShow = document.createElement("h2");
    wordToShow.setAttribute("class", "important")
    wordToShow.textContent = wordToSearch;
    meaning.appendChild(wordToShow);

    let shortDefinition = document.createElement("p");
    shortDefinition.innerHTML = `<strong>Definition:</strong> ${data[0].shortdef[0]}`;
    meaning.appendChild(shortDefinition);

    let type = document.createElement("p");
    type.innerHTML = `<strong>Type:</strong> ${data[0].fl}`;
    meaning.appendChild(type);

    let pronunciation = document.createElement("p");
    pronunciation.innerHTML = `<strong>Pronunciation:</strong> ${data[0].hwi.prs[0].mw}`; 
    meaning.appendChild(pronunciation);

    let audioDisplay = document.createElement("audio");
    audioDisplay.setAttribute("controls", "");
    let audioAtribute = document.createElement("source");
    audioAtribute.setAttribute("src", `https://media.merriam-webster.com/audio/prons/en/us/mp3/${getFirstLetter(wordToSearch)}/${data[0].hwi.prs[0].sound.audio}.mp3`);
    audioAtribute.setAttribute("type", "audio/ogg")
    audioDisplay.appendChild(audioAtribute);
    meaning.appendChild(audioDisplay);
    
    let wordDate = document.createElement("p");
    wordDate.innerHTML = `<strong>Date:</strong> ${data[0].date}`;
    meaning.appendChild(wordDate);

    let ethimology = document.createElement("p");
    ethimology.innerHTML = `<strong>Ethimology:</strong> ${data[0].et[0]}`;
    meaning.appendChild(ethimology);
}

function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getFirstLetter(word) {
    let myList = word.split("");
    firstletter = myList[0];
    return firstletter;
}