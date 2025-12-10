const historyDisplay = document.querySelector("#history");

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function renderRecord() {
    let recordScripture = getLocalStorage("record");
    let recordTime = getLocalStorage("record-time");
    let thisNumber = numberVerses(recordScripture);
    buildTemplate(recordScripture, recordTime, thisNumber);
}

function displayTemplate(scripture, time) {
    const content = document.createElement("p");
    let thisTime = new Date(time);
    content.innerHTML = `You read <strong>${scripture.book} ${scripture.chapter}:${scripture.verse}</strong> on ${thisTime}`
    historyDisplay.appendChild(content)
}

function numberVerses(verses) {
    let numberVerses = 0;
    verses.forEach((verse) => {
        numberVerses += 1;
    })
    return numberVerses;
}

function buildTemplate(scripture, time, numberVerses) {
    for (let i = 0; i < numberVerses; i++) {
        displayTemplate(scripture[i], time[i])
    }
}

renderRecord();