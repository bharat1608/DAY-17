document.addEventListener("DOMContentLoaded", function() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('countries-container');
            data.forEach(country => {
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-sm-12 mb-4';

                card.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${country.name.common}</h5>
                            <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
                            <p class="card-text">Region: ${country.region}</p>
                            <p class="card-text">Country Code: ${country.cca2} / ${country.cca3}</p>
                            <p class="card-text">Lat/Lng: ${country.latlng.join(', ')}</p>
                            <button class="btn btn-primary" onclick="getWeather(${country.latlng[0]}, ${country.latlng[1]}, this)">Click for Weather</button>
                            <div class="weather-info mt-3"></div>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));
});

function getWeather(lat, lon, button) {
    const apiKey = "1d08a4af3b0b19de550c048def08736b";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = button.nextElementSibling;
            weatherInfo.innerHTML = `
                <p>Weather: ${data.weather[0].description}</p>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

