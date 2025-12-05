const word = document.querySelector("p");
const meaning = document.querySelector("#definition");
console.log(word.textContent);

const toSearch = word.textContent;

const usedURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${toSearch}?key=8962be0b-43a0-48ca-bbfb-710215e73b3e`

async function fetchDefinition() {
    try {
        const response = await fetch(usedURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data[0].shortdef[0]);
            putMeaning(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

fetchDefinition();

function putMeaning(data) {
    meaning.textContent = data[0].shortdef[0];
}