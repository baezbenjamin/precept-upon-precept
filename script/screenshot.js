const ssButton = document.querySelector("a");

const siteAddress = window.location.href;

const newURL = `https://shot.screenshotapi.net/v3/screenshot?token=KRDVN1X-P0HMYE3-J6PHZ2P-7H71FNQ&fresh=true&url=${siteAddress}&output=image&file_type=png&wait_for_event=load`;

ssButton.setAttribute("href", newURL);