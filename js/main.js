const apiKey = 'f28a7fa8da894874aa224742231106';
const yandexApiKey = '37039c7a-2ca4-42b6-9bdf-fc3e03db9066'
function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    const urlforForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}`;
    const urlForFutere = `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}`

    fetch(urlforForecast).then((response) => {
        return response.json()
    }).then((data) => {
        let city = data.location.name;
        console.log(data);
        document.querySelector('#todayFirstTemp').innerHTML = `${data.forecast.forecastday[0].hour[21].temp_c}°`;
        document.querySelector('#todaySecondTemp').innerHTML = `${data.forecast.forecastday[0].hour[22].temp_c}°`;
        document.querySelector('#todayThirdTemp').innerHTML = `${data.forecast.forecastday[0].hour[23].temp_c}°`;
        document.querySelector('#todayFourthTemp').innerHTML = `${data.forecast.forecastday[0].hour[0].temp_c}°`;
        document.querySelector("#cityName").innerHTML = city;
        document.querySelector("#cityName2").innerHTML = city;
        document.querySelector("#currentTime").innerHTML = data.location.localtime;
        document.querySelector('#todayTempNow').innerHTML = `${data.current.temp_c}°`;
        document.querySelector('#todayFeelsLike').innerHTML = `ощущается как ${data.current.feelslike_c}°`;
        document.querySelector('#todayTempatDay').innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c}°`;
        document.querySelector('#todayTempatNight').innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}°`
})

}
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


