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
    // const objt2 = data.verses;
    // displayVerse(objt2.filter(verse => verse.book == verseBook && verse.chapter == verseChapter && verse.veerse == verseNumber));
    displayVerse(data.verses);
}

const usedURL = ""; //Another Part of the other code

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
            text.textContent = `${verse2.text}`;
            let fullTect = text.textContent
            verse.appendChild(passage);
            // Here start the merging Process
            let list = fullTect.split(" ");
            // verse.appendChild(text);

            list.forEach(word => {

                const thisword = document.createElement("span");

                thisword.innerHTML = `${word} `;
                thisword.addEventListener("click", () => {
                    // thisword.textContent = "bro";
                    console.log("Omba'apoi hina!")
                    const usedURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${thisword.textContent}?key=8962be0b-43a0-48ca-bbfb-710215e73b3e`
                    fetchDefinition(usedURL);
                })
                verse.appendChild(thisword);
                // console.log(word);
            });
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