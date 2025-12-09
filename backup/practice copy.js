let sentence = "I want to be like you";

const meaning = document.querySelector("#definition");

const page = document.querySelector("main");

let list = sentence.split(" ");

const usedURL = "";

list.forEach(word => {

    const thisword = document.createElement("span");

    thisword.innerHTML = `${word} `; 
    thisword.addEventListener("click", () => {
        // thisword.textContent = "bro";
        console.log("Omba'apoi hina!")
        const usedURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${thisword.textContent}?key=8962be0b-43a0-48ca-bbfb-710215e73b3e`
        fetchDefinition(usedURL);
    })
    page.appendChild(thisword);
    console.log(word);
    
});

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