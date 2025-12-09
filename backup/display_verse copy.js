const verse = document.querySelector("#verse");

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const verseBook = urlParams.get('book');
const verseChapter = urlParams.get('chapter');
const verseNumber = urlParams.get('verse');

async function getVerse() {
    const response = await fetch("json/verses.json");
    const data = await response.json();
    // const objt2 = data.verses;
    // displayVerse(objt2.filter(verse => verse.book == verseBook && verse.chapter == verseChapter && verse.veerse == verseNumber));
    displayVerse(data.verses);
}

const displayVerse = (verses) => {
    verses.forEach((verse2) => {
        // if (verse2.book == verseBook && verse2.chapter == verseChapter && verse2.veerse == verseNumber) {

        // }
        if (verse2.book == verseBook && verse2.chapter == verseChapter && verse2.verse == verseNumber) {
            // console.log("Yes");
            const passage = document.createElement("h2");
            // const scripture = verse2.scripture;
            const book = verse2.book;
            const chapter = verse2.chapter;
            const verse1 = verse2.verse;
            const text = document.createElement("p");
            passage.innerHTML = `${book} ${chapter}:${verse1}`;
            text.innerHTML = `${verse2.text}`;
            verse.appendChild(passage);
            verse.appendChild(text);
        }
    })
} 

getVerse();