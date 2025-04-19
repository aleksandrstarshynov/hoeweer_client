export function displayCityAddress(cityAddress) {
    const existingAddressDiv = document.getElementById('city-address');
    if (existingAddressDiv) {
      existingAddressDiv.remove();
    }
  
    const addressDiv = document.createElement('div');
    addressDiv.id = 'city-address';
  
    const addressText = `${cityAddress.city}, ${cityAddress.state}, ${cityAddress.country} (Country Code: ${cityAddress.countryCode})`;
  
    const addressElement = document.createElement('p');
    addressElement.textContent = addressText;
    addressDiv.appendChild(addressElement);
  
    const contentDiv = document.getElementById('content-transparent'); 
    if (contentDiv) {
      contentDiv.appendChild(addressDiv);
    }
  }
  