const ssButton = document.querySelector("#takeshot");

const initialURL = window.location.href;

function modifyURL(URL) {
    let list = URL.split("");
    let newURL = "";
    list.forEach(letter => {
        if (letter == ":") {
            letter = "%3A";
        } else if (letter == "/") {
            letter = "%2F";
        } else if (letter == "?") {
            letter = "%3F";
        } else if (letter == "=") {
            letter = "%3D";
        } else if (letter == "&") {
            letter = "%26";
        }
        newURL = newURL + letter;
    })
    return newURL;
}

newURL = modifyURL(initialURL);

const screenshotURL = `https://shot.screenshotapi.net/v3/screenshot?token=KRDVN1X-P0HMYE3-J6PHZ2P-7H71FNQ&fresh=true&url=${newURL}&output=image&file_type=png&wait_for_event=load`;

ssButton.setAttribute("href", screenshotURL);