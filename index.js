
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1ab73cb747c2b04eb0328f9e2276a223`;
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1ab73cb747c2b04eb0328f9e2276a223`;
// const container = document.getElementById("container");
// let city;

// const detailsOfWeather = document.getElementById("weatherForcastFor7Days");
// const details = document.getElementById("details");

// const parentBox=document.getElementById("parentBox");


// function getData() {
//   city = document.getElementById("city").value;
//   const url = ` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9266fb0df833aa13af2df209e6a9622f`;


const container = document.getElementById("container");
let city;

const detailsOfWeather = document.getElementById("weatherForcastFor7Days");
const details = document.getElementById("details");

const parentBox=document.getElementById("parentBox");


function submit() {
  city = document.getElementById("cityName").value;
  const url = ` https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1ab73cb747c2b04eb0328f9e2276a223`;

  // ` https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=2f665c90b9a6e6776ee8415432ea013b`

if(city!==""){
  fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    weatherDataRepport(res);
  })
  .catch(function (err) {
    console.log("err", err);
  });
}
else{
  alert("Please Enter City Name !!!")
}
}

function weatherDataRepport(data) {
  // container.append(data.main.temp);
  //   console.log(city,data);

  if (data.cod == "404") {
      details.textContent=null;
    let image = document.createElement("img");
    image.src =
      "https://i.pinimg.com/originals/ef/8b/bd/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif";

    detailsOfWeather.append(image);
  } else {

    details.textContent=null;
   
    let box = document.getElementById("weatherContainer");
    box.style.visibility = "visible";
    let dailyUpdate = document.createElement("div");
    dailyUpdate.setAttribute("class", "dailyUpdate");
    let cityName = document.createElement("h1");
    cityName.innerText = city;

    let temperature = document.createElement("h1");
    let temp = Number(data.list[0].main.temp - 273.15).toFixed(1);
    temperature.innerText = `${temp}°C`;

    let pressure = document.createElement("p");
    let pre = data.list[0].main.pressure;
    pressure.innerText = `Pressure : ${pre}`;

    let averageTemp = document.createElement("p");
    let max = Number(data.list[0].main.temp_max - 273.15).toFixed(1);
    let min = Number(data.list[0].main.temp_min - 273.15).toFixed(1);
    averageTemp.innerText = `Hight/Low : ${max}°C/${min}°C`;

    let humidity = document.createElement("p");
    let hum = data.list[0].main.humidity;
    humidity.innerText = `Humidity : ${hum}`;

    let wind = document.createElement("p");
    let wi = data.list[0].wind.speed;
    wind.innerText = `Wind : ${wi}Km/h`;

    let weather = document.createElement("p");
    let des = data.list[0].weather[0].description;
    weather.innerText = `Weather Description : ${des}`;

    let visibility = document.createElement("p");
    visibility.innerText = `Visibility Rate :${data.list[0].visibility}`;

    dailyUpdate.append(
      cityName,
      temperature,
      pressure,
      averageTemp,
      humidity,
      wind,
      weather,
      visibility
    );

    let map = document.getElementById("gmap_canvas");

    map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    details.append(dailyUpdate);

    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "Min").innerHTML =
        "Min:" + Number(data.list[i].main.temp_min - 288.53).toFixed(1) + "°C";
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "Max").innerHTML =
        "Max:" + Number(data.list[i].main.temp_max - 288.53).toFixed(1) + "°C";
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("img" + (i + 1)).src =
        " http://openweathermap.org/img/wn/" +
        data.list[i].weather[0].icon +
        ".png";
      console.log(data.list[i].weather[0].icon);
    }
    const d = new Date();
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    function checkDay(day) {
      if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
      } else {
        return day + d.getDay();
      }
    }

    for (i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
    }
  }
  document.getElementById("cityName").value = null;
}