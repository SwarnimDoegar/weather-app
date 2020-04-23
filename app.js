let cityName = document.querySelector(".city-name");
let temperature = document.querySelector(".temp");
let curImg = document.getElementById("cur-weather-img");
let weatherDesc = document.querySelector(".weather-description");
let cityInput = document.getElementById("city-input");
let reset = document.getElementById("reset");
let key = "" /*Your openweathermap API key goes here*/
if("geolocation" in navigator)
{
    cityInput.value = "";
    navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        // lat = lat;
        // lon = lon;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`;
        perform(url);
        cityInput.addEventListener("keypress", function(e){
            if(e.keyCode == 13 || e.which == 13){
                let cityInputName = cityInput.value;
                cityInput.value = "";
                url = `http://api.openweathermap.org/data/2.5/weather?q=${cityInputName}&APPID=${key}`;
                perform(url);
            }
        })
        reset.addEventListener("click", function(){
            url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}`;
            perform(url);
        })
        function perform(url)
        {
            fetch(url)
            .then(response => {
                return response.json();    
            })
            .then(data => {
                if(data)
                {
                    const ret_data = data;
                    cityName.textContent = `${ret_data.name}, ${ret_data.sys.country}`;
                    temperature.textContent = `${(ret_data.main.temp - 273.15).toFixed(2)}   `;
                    curImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;  
                    weatherDesc.textContent = `${data.weather[0].description.toUpperCase()}`;             
                }    
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
        
}
