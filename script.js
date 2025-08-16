// http://api.weatherapi.com/v1/current.json?key=&q=Lucknow&aqi=no

const apiKey = `7de1bdbee3ed4f5dbce142950250208`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
  fetchResults(searchBox.value);
});

const fetchResults = async (targetLocation) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    const location = data.location.name+"," +data.location.region;
   
    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const conditionText = data.current.condition.text.toLowerCase();
 console.log(data);
    // Updating UI
    document.querySelector(".city").innerHTML = location;
    document.querySelector(".temp").innerHTML = temp + " °C";
    document.querySelector(".humidity").innerHTML = humidity + " %";
    document.querySelector(".wind").innerHTML = wind + " km/h";

    // Update image based on condition
    if (conditionText.includes("cloud")) {
      weatherIcon.src = "images/clouds.jpg";
    } else if (conditionText.includes("clear")) {
      weatherIcon.src = "images/clear.jpg";
    } else if (conditionText.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.webp";
    } else if (conditionText.includes("rain")) {
      weatherIcon.src = "images/rainimage.jpg";
    } else if (conditionText.includes("mist")) {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = data.current.condition.icon;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Could not get weather for this location.");
  }
  
};

// Ask for location on page load
window.addEventListener("load", () => {
  document.querySelector(".city").innerText = "Detecting location....";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const location = `${lat},${lon}`;
        fetchResults(location);
      },
      () => {
        console.warn("User denied geolocation, falling back to Lucknow.");
        fetchResults("Lucknow");
      }
    );
  } else {
    alert("Geolocation not supported. Showing Lucknow weather.");
    fetchResults("Lucknow");
  }
});
