const apiKey = "e33d0e21aecddc79a6895e9416a906f7";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        // Show weather info
        document.getElementById("cityName").textContent = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `${data.main.temp}°C`;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("windSpeed").textContent = `${data.wind.speed} km/h`;
        document.getElementById("condition").textContent = data.weather[0].description;

        // Show charts
        showCharts(data.main.temp, data.main.humidity);

    } catch (error) {
        alert("Something went wrong!");
    }
}

function showCharts(temp, humidity) {
    // Temperature Chart
    const tempCtx = document.getElementById("tempChart").getContext("2d");
    new Chart(tempCtx, {
        type: "bar",
        data: {
            labels: ["Temperature"],
            datasets: [{
                label: "Temperature (°C)",
                data: [temp],
                backgroundColor: "#ff6384"
            }]
        }
    });

    // Humidity Chart
    const humidityCtx = document.getElementById("humidityChart").getContext("2d");
    new Chart(humidityCtx, {
        type: "doughnut",
        data: {
            labels: ["Humidity", "Remaining"],
            datasets: [{
                data: [humidity, 100 - humidity],
                backgroundColor: ["#00d4ff", "#1a1a2e"]
            }]
        }
    });
}
