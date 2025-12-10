const ssButton = document.querySelector("a");

const siteAddress = window.location.href;

const newURL = `https://shot.screenshotapi.net/v3/screenshot?token=RA18FXX-4804ZR6-NZRC1SC-MAP6P5R&fresh=true&url=${siteAddress}&output=image&file_type=png&wait_for_event=load`
// console.log(siteAddress);

// ssButton.setAttribute("href", takeImage);

async function setScreenshotButton() {
    try {
        const response = await fetch(newURL);
        if (response.ok) {
            ssButton.setAttribute("href", response);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

setScreenshotButton();