
import { currentCity } from "../index.js";


// old code without fetch
// export function cityNameFetch(currentCity) {
//     console.log("cityNameFetch");
//     if (currentCity === "Amsterdam") {
//       return { latitude: 52.3676, longitude: 4.9041 };
//     }
  
//     return { latitude: 0, longitude: 0 };  
//   }

  // new code with fewtch
  export async function cityNameFetch(currentCity) {
    const encodedCityName = encodeURIComponent(currentCity);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedCityName}&countrycodes=nl&limit=1&addressdetails=1`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'YourWeatherApp/1.0 (your-email@example.com)'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
            console.warn("No results found for this city.");

            // ✅ Remove existing error if any
            const oldError = document.getElementById("error-message");
            if (oldError) oldError.remove();

            // ✅ Create and show error div
            const errorDiv = document.createElement("div");
            errorDiv.id = "error-message";
            errorDiv.textContent = "City not found in the Netherlands.";
            errorDiv.style.color = "red";
            errorDiv.style.marginTop = "10px";

            // Append to your page
            const contentDiv = document.getElementById('content-transparent');
            if (contentDiv) {
                contentDiv.appendChild(errorDiv);
            }

            return { latitude: null, longitude: null };
        }

        const { lat, lon, address } = data[0];
        const displayName = address.municipality || address.city || address.town; // Example for city name

        // Concatenate the city, state, and country into a single line of text
        const cityAddress = {
            city: displayName,
            state: address.state,
            country: address.country,
            countryCode: address.country_code
        };

        console.log("City Name:", displayName);
        console.log("Latitude:", lat, "Longitude:", lon);

        // Display the address on the screen
        displayCityAddress(cityAddress);

        return { latitude: parseFloat(lat), longitude: parseFloat(lon), cityAddress };

    } catch (error) {
        console.error('Error fetching city coordinates:', error);

        const oldError = document.getElementById("error-message");
        if (oldError) oldError.remove();

        const errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.textContent = "Error fetching location data.";
        errorDiv.style.color = "red";
        errorDiv.style.marginTop = "10px";

        const contentDiv = document.getElementById('content-transparent');
        if (contentDiv) {
            contentDiv.appendChild(errorDiv);
        }

        return { latitude: null, longitude: null };
    }
}

function displayCityAddress(cityAddress) {
    // Create or clear the previous address display
    const existingAddressDiv = document.getElementById('city-address');
    if (existingAddressDiv) {
        existingAddressDiv.remove();
    }

    const addressDiv = document.createElement('div');
    addressDiv.id = 'city-address';

    // Concatenate the city, state, and country into a single line of text
    const addressText = `${cityAddress.city}, ${cityAddress.state}, ${cityAddress.country} (Country Code: ${cityAddress.countryCode})`;

    // Create a single paragraph element for the full address
    const addressElement = document.createElement('p');
    addressElement.textContent = addressText;
    addressDiv.appendChild(addressElement);

    // Append the addressDiv to the body or any specific container element
    const contentDiv = document.getElementById('content-transparent'); // Assuming this is your main container
    if (contentDiv) {
        contentDiv.appendChild(addressDiv);
    }
}
