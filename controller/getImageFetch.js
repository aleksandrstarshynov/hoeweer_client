import { weather } from "./weatherFetch.js";
import { currentCity} from "../index.js";

let ACCESS_KEY = "s-QDeN8Ing-6mmyOjkJjI31msk5xlVf6tJKhSEpOfJc";
export let backgroundImageUrl = '';


export function setRandomBackgroundImage(currentCity, weather) {
    fetch(`https://api.unsplash.com/search/photos?query=${currentCity}+${weather}&client_id=${ACCESS_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const randomImg = data.results[Math.floor(Math.random() * data.results.length)];
                backgroundImageUrl = randomImg.urls.regular;
                document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
            } else {
                throw new Error("No images found");
            }
        })
        .catch(err => {
            console.warn("Fallback background being used:", err);
            fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${currentCity},${weather}`)
                .then(res => res.json())
                .then(data => {
                    backgroundImageUrl = data.urls.regular; 
                    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
                });
        });
}