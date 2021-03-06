window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");
  let iconLocation = document.querySelector(".icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=191122672216a5f64a876ac00ca7988a
      `;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.current;
          const { description, icon } = data.current.weather[0];
          //set DOM elements from API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;
          //formula for farengirt
          let celsius = (temp - 32) * (5 / 9);
          //set icons

          iconLocation.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="icon" width="100" height="100" />`;

          //change temperature to farenhighgt
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
