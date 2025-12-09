const passages = document.querySelector(".passages");

async function getPassage() {
    const response = await fetch("json/verses.json");
    const data = await response.json();
    displayPassage(data.verses);
    displayFilterOptions(data.verses);
}

getPassage();

const displayPassage = (verses) => {
    passages.innerHTML = "";
    verses.forEach((verse2) => {
        const passage = document.createElement("a");
        // const scripture = verse2.scripture;
        const book = verse2.book;
        const chapter = verse2.chapter;
        const verse1 = verse2.verse;
        // const text = document.createElement("p");
        passage.setAttribute("href", `verse_page.html?book=${book}&chapter=${chapter}&verse=${verse1}`)
        passage.textContent = `${book} ${chapter}:${verse1}`;
        // text.innerHTML = `${verse2.text}`;
        passages.appendChild(passage);
        // verse.appendChild(text);
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
                // document.querySelector('.active')?.classList.remove('active');
                // link.classList.add('active')
                passages.classList.remove('hide')
            })
        }
        scriptureList.push(`${option.scripture}`);
    })

}