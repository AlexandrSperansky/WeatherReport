const apiKey = 'f28a7fa8da894874aa224742231106';
const yandexApiKey = '37039c7a-2ca4-42b6-9bdf-fc3e03db9066'
const dayIcons = 'icons/day/'
const nightIcons = 'icons/night/'

const longDayNames = {
    0: 'Воскресенье',
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота'
}
const shortDayNames = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб'
}
const windDirTranslate = (direction) => {
    const windDir = {
        N: 'С',
        W: 'З',
        S: 'Ю',
        E: 'В'
    }

    if (direction.length == 1){
        return windDir[direction]
    }
    else {
        return windDir[direction[1]] + windDir[direction[0]]
    }
}
function getDayAfter(num) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + num); // even 32 is acceptable
    return tomorrow
}

function getTimeNow(){
    dateNow = new Date();
    hours = dateNow.getHours();
    minutes = dateNow.getMinutes();
    seconds = dateNow.getSeconds();

    if(hours < 10)
        hours = "0" + hours;
    if(minutes < 10)
        minutes = "0" + minutes;
    return hours + ":" + minutes;
}
setInterval(() => {
    document.querySelector('#currentTime').innerHTML = String(getTimeNow());
}, 1000);

function success(pos) {
    const crd = pos.coords;
    const formatTemp = (temp) => {
        if (String(temp)[0] == '-'){
            return `-${temp}°`
        } else{
            return `+${temp}°`
        }
    }

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    const urlforForecast = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}&lang=ru`;
    const urlForFuture = `https://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}&lang=ru`

    fetch(urlforForecast).then((response) => {
        return response.json()
    }).then((data) => {
        var city = data.location.name;
        var currentDate = new Date()
        var isDayNow = getTimeNow().split(":") > 6 && getTimeNow().split(":") < 21
        const makeIconPath = (icon) => {
            return (isDayNow ? dayIcons : nightIcons) + icon.split('/').at(-1)
        }
        console.log(data);
        //header
        document.querySelector("#cityName").innerHTML = city;

        //fisrt card
        document.querySelector('#todayFirstTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].temp_c);
        document.querySelector('#todaySecondTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[12].temp_c);
        document.querySelector('#todayThirdTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[17].temp_c);
        document.querySelector('#todayFourthTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[21].temp_c);
        document.querySelector("#cityName2").innerHTML = city;
        document.querySelector('#todayTempNow').innerHTML = formatTemp(data.current.temp_c);
        document.querySelector('#todayFeelsLike').innerHTML = `Ощущается как ${formatTemp(data.current.feelslike_c)}`;
        document.querySelector('#todayLongDecsription').innerHTML = data.current.condition.text;
        document.querySelector('#todayDateName').innerHTML = longDayNames[currentDate.getDay()];
        document.querySelector('#todayWind').innerHTML =(data.current.wind_kph / 3.6).toFixed(1);
        document.querySelector('#todayPressure').innerHTML = Math.floor(data.current.pressure_mb * 0.750064);
        document.querySelector('#todayHumidity').innerHTML = `${data.current.humidity}%`;

        document.getElementById('todayIcon').style.backgroundImage = `url(${makeIconPath(data.current.condition.icon)})`;


        //weekForecast
        document.querySelector('#todayTempatDay').innerHTML = formatTemp(data.forecast.forecastday[0].day.avgtemp_c);
        document.querySelector('#todayTempatNight').innerHTML = formatTemp(data.forecast.forecastday[0].day.mintemp_c)
        document.querySelector('#shortOneDayAfter').innerHTML = shortDayNames[getDayAfter(1).getDay()]
        document.querySelector('#shortTwoDaysAfter').innerHTML = shortDayNames[getDayAfter(2).getDay()]
        document.querySelector('#shortThreeDaysAfter').innerHTML = shortDayNames[getDayAfter(3).getDay()]

        //detailedForecast
        document.querySelector('#todayNumDate').innerHTML = currentDate.getDate()

            //morning
        document.querySelector('#morningTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].temp_c);
        document.querySelector('#morningDecs').innerHTML = data.forecast.forecastday[0].hour[8].condition.text;
        document.querySelector('#morningPressure').innerHTML = Math.floor(data.forecast.forecastday[0].hour[8].pressure_mb * 0.750064);
        document.querySelector('#morningHumidity').innerHTML = `${data.forecast.forecastday[0].hour[8].humidity}%`;
        document.querySelector('#morningWind').innerHTML = (data.forecast.forecastday[0].hour[8].wind_kph / 3.6).toFixed(1);
        document.querySelector('#morningWindDir').innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[8].wind_dir)
        document.querySelector('#morningFeelsLike').innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].feelslike_c)
        document.getElementById('morningIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[8].condition.icon)})`;

        //afternoon
        document.querySelector('#afternoonTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[14].temp_c);
        document.querySelector('#afternoonDecs').innerHTML = data.forecast.forecastday[0].hour[14].condition.text;
        document.querySelector('#afternoonPressure').innerHTML = Math.floor(data.forecast.forecastday[0].hour[14].pressure_mb * 0.750064);
        document.querySelector('#afternoonHumidity').innerHTML = `${data.forecast.forecastday[0].hour[14].humidity}%`;
        document.querySelector('#afternoonWind').innerHTML = (data.forecast.forecastday[0].hour[14].wind_kph / 3.6).toFixed(1);
        document.querySelector('#afternoonWindDir').innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[14].wind_dir)
        document.querySelector('#afternoonFeelsLike').innerHTML = formatTemp(data.forecast.forecastday[0].hour[14].feelslike_c)
        document.getElementById('afternoonIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[14].condition.icon)})`;

        //evening
        document.querySelector('#eveningTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[20].temp_c);
        document.querySelector('#eveningDecs').innerHTML = data.forecast.forecastday[0].hour[20].condition.text;
        document.querySelector('#eveningPressure').innerHTML = Math.floor(data.forecast.forecastday[0].hour[20].pressure_mb * 0.750064);
        document.querySelector('#eveningHumidity').innerHTML = `${data.forecast.forecastday[0].hour[20].humidity}%`;
        document.querySelector('#eveningWind').innerHTML = (data.forecast.forecastday[0].hour[20].wind_kph / 3.6).toFixed(1);
        document.querySelector('#eveningWindDir').innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[20].wind_dir)
        document.querySelector('#eveningFeelsLike').innerHTML = formatTemp(data.forecast.forecastday[0].hour[20].feelslike_c)
        document.getElementById('eveningIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[20].condition.icon)})`;

        //night
        document.querySelector('#nightTemp').innerHTML = formatTemp(data.forecast.forecastday[0].hour[23].temp_c);
        document.querySelector('#nightDecs').innerHTML = data.forecast.forecastday[0].hour[23].condition.text;
        document.querySelector('#nightPressure').innerHTML = Math.floor(data.forecast.forecastday[0].hour[23].pressure_mb * 0.750064);
        document.querySelector('#nightHumidity').innerHTML = `${data.forecast.forecastday[0].hour[23].humidity}%`;
        document.querySelector('#nightWind').innerHTML = (data.forecast.forecastday[0].hour[23].wind_kph / 3.6).toFixed(1);
        document.querySelector('#nightWindDir').innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[23].wind_dir)
        document.querySelector('#nightFeelsLike').innerHTML = formatTemp(data.forecast.forecastday[0].hour[23].feelslike_c)
        document.getElementById('nightIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[23].condition.icon)})`;

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