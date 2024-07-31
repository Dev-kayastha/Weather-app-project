const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.Weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = 'c3e8df40e8299913850c2cf3a3091aee'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
                 

    const Weather_data = await fetch(`${url}`).then(Response => Response.json());
    //console.log(Weather_data);


    // if we do mistake by typing the city name then it will show the error in console
    if(Weather_data.cod==='404'){        // cod gives the status code for errors
        location_not_found .style.display = 'flex';
        weather_body.style.display = 'none';
        console.log('error');
        return;
    }
    location_not_found .style.display = 'none';
    weather_body.style.display = 'flex';

    temprature.innerHTML = `${Math.round(Weather_data.main.temp -273.15)}°C`;// temp is given in calvin so we have to set temp in celcius, for that we have minus temp using -273.15
    description.innerHTML = `${Weather_data.weather[0].description}`;
    humidity.innerHTML = `${Weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${Weather_data.wind.speed}km/H`;
    

    switch(Weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "clouddd.png";
            break;
         case 'Clear':
            weather_img.src = "clear.png";
            break;
         case 'Mist':
            weather_img.src = "mist.png";
            break;
         case 'Snow':
            weather_img.src = "snow.png";
            break;
         case 'Rain':
            weather_img.src = "rain2.png";
    }
}



searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});