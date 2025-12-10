const passages = document.querySelector(".passages");

const randomLink = document.querySelector("#ranVer");

async function getPassage() {
    const response = await fetch("json/verses.json");
    const data = await response.json();
    displayPassage(data.verses);
    displayFilterOptions(data.verses);
    let randomVerse = getRandomVerse(data.verses);
    setRandomLink(data.verses, randomVerse)
}

getPassage();

const displayPassage = (verses) => {
    passages.innerHTML = "";
    verses.forEach((verse2) => {
        const passage = document.createElement("a");
        const book = verse2.book;
        const chapter = verse2.chapter;
        const verse1 = verse2.verse;
        passage.setAttribute("href", `verse_page.html?book=${book}&chapter=${chapter}&verse=${verse1}`)
        passage.textContent = `${book} ${chapter}:${verse1}`;
        passages.appendChild(passage);

    })
}

const options = document.querySelector(".filter");

const displayFilterOptions = (verses) => {
    let scriptureList = [];
    verses.forEach((option) => {
        if (scriptureList.includes(`${option.scripture}`)) {
            let times = 1;
        } else {
            let select = document.createElement('li');
            let link = document.createElement('a');
            link.textContent = option.scripture;
            link.setAttribute("href", "#");
            link.setAttribute("class", "option");
            select.appendChild(link);
            options.appendChild(select);
            select.addEventListener("click", () => {
                displayPassage(verses.filter(part => part.scripture == `${option.scripture}`))
                passages.classList.remove('hide')
            })
        }
        scriptureList.push(`${option.scripture}`);
    })
}

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