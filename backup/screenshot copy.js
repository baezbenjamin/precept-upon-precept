const ssButton = document.querySelector("a");

const siteAddress = window.location.href;

console.log(siteAddress);
let takeImage = `https://shot.screenshotapi.net/v3/screenshot?token=RA18FXX-4804ZR6-NZRC1SC-MAP6P5R&fresh=true&url=${siteAddress}&output=image&file_type=png&wait_for_event=load`;

ssButton.setAttribute("href", takeImage);