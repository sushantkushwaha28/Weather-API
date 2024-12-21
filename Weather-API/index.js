let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");


let W_feelsLike = document.querySelector(".weather_feelsLike");
let W_humidity= document.querySelector(".weather_humidity");
let W_wind = document.querySelector(".weather_wind");
let W_pressure= document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");
const getCountryName =(code) =>{
    return new Intl.DisplayNames([code],{type:'region'}).of(code);
};

//  to get the date and time

const getDAtaTime =(dt) =>{
// let dt = 1708667988;
const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
console.log(curDate);
// // const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
console.log(formatter);
return formatter.format(curDate);
};

let city = "vadodara";
// search functionality
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value="";
});
const getWeatherData = async() =>{
    const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c2da23d50cf4e31b4f5471a03a15c2fd`;
    try{
    const res =await fetch(weatherUrl);
    const data =await res.json();
    console.log(data);

    const { main,name,weather,wind,sys,dt} = data;


    cityName.innerHTML =`${name},${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDAtaTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML =`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    w_temperature.innerHTML= `${main.temp}&#176`;
    w_minTem.innerHTML =`Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML =`Min: ${main.temp_max.toFixed()}&#176`;

    W_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
    W_humidity.innerHTML=`${main.humidity}%`;
    W_wind.innerHTML=`${wind.speed} m/s`;
    W_pressure.innerHTML=`${main.pressure} hPa`;
    }catch(error){
        console.log(error);
    }
}
document.body.addEventListener("load",getWeatherData());