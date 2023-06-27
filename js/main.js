const apiKey = 'f28a7fa8da894874aa224742231106';
const dayIcons = 'icons/day/'
const nightIcons = 'icons/night/'


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
function getDayName(num) {
    const longDayNames = {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота'
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + num); // even 32 is acceptable
    return longDayNames[tomorrow.getDay()]
};

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

    const urlforForecast = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}&days=4&lang=ru`;

    fetch(urlforForecast).then((response) => {
        return response.json()
    }).then((data) => {

        for (const block of document.getElementsByClassName('dayBlock')){
            block.classList.toggle('hide')
            block.classList.toggle('blockLoading')
        }
        document.querySelector('table').classList.toggle('hide')
        document.querySelector('table').classList.toggle('blockLoading')

        document.querySelector('#cityName').classList.toggle('hide')

        document.querySelector('.detailedHeaderTitle').classList.toggle('hide')

        document.querySelector('#todayNumDate').classList.toggle('hide')

        var city = data.location.name;
        var currentDate = new Date()
        var isDayNow = getTimeNow().split(":") > 6 && getTimeNow().split(":") < 21

        const makeIconPath = (icon, today=true) => {
            if (today){
                return  (isDayNow ? dayIcons : nightIcons) + icon.split('/').at(-1)
            } else {
                return dayIcons + icon.split('/').at(-1)
            }
        }
        const setBg = (decscription) => {
            const desc = decscription.toLowerCase()
            if (decs.includes('дожд') || decs.includes('ливень')){
            }
        }
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
        document.querySelector('#todayDateName').innerHTML = getDayName(0);
        document.querySelector('#todayWind').innerHTML =(data.current.wind_kph / 3.6).toFixed(1);
        document.querySelector('#todayPressure').innerHTML = Math.floor(data.current.pressure_mb * 0.750064);
        document.querySelector('#todayHumidity').innerHTML = `${data.current.humidity}%`;

        document.getElementById('todayIcon').style.backgroundImage = `url(${makeIconPath(data.current.condition.icon)})`;

        //second card
        document.querySelector('#longOneDayAfter').innerHTML = getDayName(1)
        document.querySelector('#oneDayAfterFirstTemp').innerHTML = formatTemp(data.forecast.forecastday[1].hour[8].temp_c);
        document.querySelector('#oneDayAfterSecondTemp').innerHTML = formatTemp(data.forecast.forecastday[1].hour[12].temp_c);
        document.querySelector('#oneDayAfterThirdTemp').innerHTML = formatTemp(data.forecast.forecastday[1].hour[17].temp_c);
        document.querySelector('#oneDayAfterFourthTemp').innerHTML = formatTemp(data.forecast.forecastday[1].hour[21].temp_c);
        document.querySelector('#OneDayAfterLongDecsription').innerHTML = `Завтра ожидается ${data.forecast.forecastday[1].day.condition.text.toLowerCase()}`;
        document.querySelector('#oneDayAfterTempAtDay').innerHTML = formatTemp(data.forecast.forecastday[1].day.avgtemp_c);
        document.querySelector('#oneDayAfterTempAtNight').innerHTML = formatTemp(data.forecast.forecastday[1].day.mintemp_c)
        document.getElementById('oneDayAfterIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[1].day.condition.icon, false)})`;
        document.querySelector('#oneDayAfterWind').innerHTML = (data.forecast.forecastday[1].day.maxwind_kph / 3.6).toFixed(1);
        document.querySelector('#oneDayAfterPressure').innerHTML = Math.floor(data.forecast.forecastday[1].hour[14].pressure_mb * 0.750064);
        document.querySelector('#oneDayAfterHumidity').innerHTML = `${data.forecast.forecastday[1].day.avghumidity}%`;


        //third card
        document.querySelector('#longTwoDaysAfter').innerHTML = getDayName(2)
        document.querySelector('#twoDaysAfterFirstTemp').innerHTML = formatTemp(data.forecast.forecastday[2].hour[8].temp_c);
        document.querySelector('#twoDaysAfterSecondTemp').innerHTML = formatTemp(data.forecast.forecastday[2].hour[12].temp_c);
        document.querySelector('#twoDaysAfterThirdTemp').innerHTML = formatTemp(data.forecast.forecastday[2].hour[17].temp_c);
        document.querySelector('#twoDaysAfterFourthTemp').innerHTML = formatTemp(data.forecast.forecastday[2].hour[21].temp_c);
        document.querySelector('#twoDaysAfterLongDecsription').innerHTML = `Послезавтра ожидается ${data.forecast.forecastday[2].day.condition.text.toLowerCase()}`;
        document.querySelector('#twoDaysAfterTempAtDay').innerHTML = formatTemp(data.forecast.forecastday[2].day.avgtemp_c);
        document.querySelector('#twoDaysAfterTempAtNight').innerHTML = formatTemp(data.forecast.forecastday[2].day.mintemp_c)
        document.getElementById('twoDaysAfterIcon').style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[2].day.condition.icon, false)})`;
        document.querySelector('#twoDaysAfterWind').innerHTML = (data.forecast.forecastday[2].day.maxwind_kph / 3.6).toFixed(1);
        document.querySelector('#twoDaysAfterPressure').innerHTML = Math.floor(data.forecast.forecastday[2].hour[14].pressure_mb * 0.750064);
        document.querySelector('#twoDaysAfterHumidity').innerHTML = `${data.forecast.forecastday[2].day.avghumidity}%`;

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