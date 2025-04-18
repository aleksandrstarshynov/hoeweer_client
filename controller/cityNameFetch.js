// export let latitude = 52.37;
// export let longitude = 4.89;

import { currentCity } from "../index.js";
// console.log("currentCity in cityNameFetch:", currentCity); 


// let latitude = null;
// let longitude = null;

// export function setCoordinates() {
//   latitude = 52.37;
//   longitude = 4.89;
// }

export function cityNameFetch(currentCity) {
    console.log("cityNameFetch");
    // Ensure we're using the variable correctly inside the function
    if (currentCity === "Amsterdam") {
      return { latitude: 52.3676, longitude: 4.9041 };
    }
  
    return { latitude: 0, longitude: 0 };  // Fallback for other cities
  }