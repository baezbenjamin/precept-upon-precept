const randomLink = document.querySelector("#ranVer");

function getRandomVerse(verses) {
    let numberVerses = 0;
    verses.forEach((verse) => {
        numberVerses += 1;
    })
    let randomVerse = Math.floor(Math.random() * numberVerses);
    return randomVerse;
}

function setRandomLink(verses, randomVerse) {
    let luckyVerse = verses[randomVerse];
    randomLink.setAttribute("href", `verse_page.html?book=${luckyVerse.book}&chapter=${luckyVerse.chapter}&verse=${luckyVerse.verse}`);
}

async function getPassage() {
    const response = await fetch("data/verses.json");
    const data = await response.json();
    let randomVerse = getRandomVerse(data.verses);
    setRandomLink(data.verses, randomVerse);
}

getPassage();