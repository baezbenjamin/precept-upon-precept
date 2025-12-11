const ssButton = document.querySelector("a");

const siteAddress = window.location.href;

const newURL = `https://shot.screenshotapi.net/v3/screenshot?token=KRDVN1X-P0HMYE3-J6PHZ2P-7H71FNQ&fresh=true&url=${siteAddress}&output=image&file_type=png&wait_for_event=load`;

const lostURL = "https://shot.screenshotapi.net/v3/screenshot?token=KRDVN1X-P0HMYE3-J6PHZ2P-7H71FNQ&fresh=true&url=https%3A%2F%2Fbaezbenjamin.github.io%2Fprecept-upon-precept%2Fverse_page.html%3Fbook%3DAmos%26chapter%3D3%26verse%3D7&output=image&file_type=png&wait_for_event=load";

// ssButton.setAttribute("href", newURL);

ssButton.setAttribute("href", lostURL);