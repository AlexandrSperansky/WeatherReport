const weatherApiKey = 'f28a7fa8da894874aa224742231106';

const dayIcons = 'icons/day/'
const nightIcons = 'icons/night/'
var lat;
var lon;
$.ajaxSetup({
    async: false
});

$.getJSON('http://ip-api.com/json', function(data) {
    console.log(data)
    lat = data['lat']
    lon = data['lon']
    
});
$.getJSON('https://www.weatherapi.com/docs/conditions.json', function(data) {
    console.log(data.length)
    
});

const windDirTranslate = (direction) => {
    const windDir = {
        N: 'С',
        W: 'З',
        S: 'Ю',
        E: 'В'
    }

    if (direction.length == 1){
        console.log(direction)
        return windDir[direction]
    }
    else if (direction.length == 2){
        return windDir[direction[1]] + windDir[direction[0]]
    }
    return windDir[direction[0]] + windDir[direction[1]]+ windDir[direction[2]]

}
const moonPhaseTranslate = (decs) =>{
    const moonDict ={
        'New Moon' : 'Новолуние',
        'Waxing Crescent': 'Растущая луна',
        'First Quarter':  'Растущая луна',
        'Waxing Gibbous': 'Растущая луна',
        'Full Moon': 'Полнолуние',
        'Waning Gibbous': 'Убывающая луна',
        "Last Quarter":'Убывающая луна',
        'Waning Crescent':'Убывающая луна'
    }
    return moonDict[decs]
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
function getPressureDisc(pressure){
    if (+pressure < 745){
        return ['Пониженное', ' #dfd517']
    } else if (+pressure > 765){
        return ['Повышенное', '#d00a0a']
    }
    return ['Норма', '#028b02']
}
setInterval(() => {
    document.querySelector('#currentTime').innerHTML = String(getTimeNow());
}, 1000);

const formatTemp = (temp) => {
if (String(temp)[0] == '-'){
    return `-${temp}°`
} else{
    return `+${temp}°`
}
}
function getRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var isDayNow = getTimeNow().split(":")[0] > 6 && getTimeNow().split(":")[0] > 0

const setBg = (code) => {
    const bgDict = {
        'clear': [1000, 4],
        'cloudy': [1003, 1006, 2],
        'fog': [1030, 1009, 1135, 1147, 4],
        'lightRain':[1063, 1072, 1150, 1153, 1168, 2],
        'snow':[1066, 1069, 1114, 1204, 1207, 1210, 1213, 1216, 1249, 1255, 1258, 3],
        'heavySnow':[2019, 1222, 1225, 1237, 1240, 1243, 1246, 1252, 1261, 1264, 2],
        'thunder':[1087, 1273, 1279, 2],
        'heavyThunder': [1276, 1282, 1],
        'rain': [1171, 1180, 1183, 1186, 1189, 2],
        'heavyRain': [1192, 1195, 1201, 2]
    }

    for (const [bg, array] of Object.entries(bgDict)){
        if (array.includes(code)){
            if (isDayNow){
                return `url(bg/${bg}${getRand(1, array.at(-1))}.jpg)`
            } else{
                return `url(bg/${bg}Night.jpg)`
            }

        }
    }

}
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
    hours = '00';
    }

    if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}
function msToTime(duration) {
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours} ч ${minutes} мин`;
}
    
const makeIconPath = (icon, today=true, isNight=false) => {
    if (today){
        if (isNight){
            return nightIcons + icon.split('/').at(-1)
        }
        return  (isDayNow ? dayIcons : nightIcons) + icon.split('/').at(-1)
    }else{

        return dayIcons + icon.split('/').at(-1)
    }
}
const urlforForecast = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=4&lang=ru`;

fetch(urlforForecast).then((response) => {
return response.json()
}).then((data) => {
    console.log(data)
    var currentDate = new Date()

    var city = data.location.name;
    document.querySelector('#mainBlock').style.backgroundImage = setBg(data.current.condition.code)


    document.querySelector('table').classList.toggle('hide')
    document.querySelector('table').classList.toggle('blockLoading')

    document.querySelectorAll('.dayBlock').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.dayBlock').forEach(element => element.classList.toggle('blockLoading'));

    document.querySelectorAll('.sunBlock').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.sunBlock').forEach(element => element.classList.toggle('blockLoading'));

    document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.classList.toggle('blockLoading'));
    document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.style.padding = '10px 20px');

    document.querySelectorAll('.dayBlock').forEach(element => element.style.scrollMarginLeft = `${(document.clientWidth - element.clientWidth)/2}`);
    document.querySelector('#cityName').classList.toggle('hide')

    document.querySelectorAll('.mobileDetailedHeader').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.detailedHeader').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.sunHeader').forEach(element => element.classList.toggle('hide'));



    document.querySelectorAll('.mobileDetailedDate').forEach(element => element.classList.toggle('hide'));
    document.querySelectorAll('.mobileDetailedDate').forEach(element => element.classList.toggle('blockLoading'));

    const daysHolder = document.querySelector('.daysHolder');
    const nextBtn = document.querySelector('.btn.next');
    const prevBtn = document.querySelector('.btn.prev');
    const itemWidth = document.querySelector('.dayBlock').clientWidth

    nextBtn.addEventListener('click', scrollToNextItem);
    prevBtn.addEventListener('click', scrollToPrevItem);


    function scrollToNextItem() {
        daysHolder.scrollBy({left: itemWidth, top: 0, behavior: 'smooth'});
    }
    function scrollToPrevItem() {
        daysHolder.scrollBy({left: -itemWidth, top: 0, behavior: 'smooth'});
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

    document.querySelectorAll('.todayNumDate').forEach(element => element.innerHTML = currentDate.getDate());
    const sunset = convertTime12to24(data.forecast.forecastday[0].astro.sunset)
    const sunrise = convertTime12to24(data.forecast.forecastday[0].astro.sunrise)

    document.querySelectorAll('.moonPhase').forEach(element => element.innerHTML = moonPhaseTranslate(data.forecast.forecastday[0].astro.moon_phase));

    document.querySelectorAll('.sunrise').forEach(element => element.innerHTML = sunrise);
    document.querySelectorAll('.sunset').forEach(element => element.innerHTML = sunset);
    console.log(new Date(data.forecast.forecastday[0].astro.sunset))
    const dayLong = new Date(2019, 5, 11, sunset.split(":")[0],  sunset.split(":")[1], 0) - new Date(2019, 5, 11, sunrise.split(":")[0], sunrise.split(":")[1], 0)
    document.querySelectorAll('.dayLong').forEach(element => element.innerHTML = msToTime(dayLong));

    console.log(msToTime(dayLong))

    //morning

    document.querySelectorAll('.morningTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].temp_c));
    document.querySelector('#morningDecs').innerHTML = data.forecast.forecastday[0].hour[8].condition.text;
    const morningPressure = Math.floor(data.forecast.forecastday[0].hour[8].pressure_mb * 0.750064)
    document.querySelectorAll('.morningPressure').forEach(element => element.innerHTML = morningPressure);
    document.querySelectorAll('.morningPressureDisc').forEach(element => element.innerHTML = getPressureDisc(morningPressure)[0]);
    document.querySelectorAll('.morningPressureDisc').forEach(element => element.style.color = getPressureDisc(morningPressure)[1]);
    document.querySelectorAll('.morningHumidity').forEach(element => element.innerHTML = `${data.forecast.forecastday[0].hour[8].humidity}%`);
    document.querySelectorAll('.morningWind').forEach(element => element.innerHTML = (data.forecast.forecastday[0].hour[8].wind_kph / 3.6).toFixed(1));
    document.querySelectorAll('.morningWindTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].windchill_c));
    document.querySelectorAll('.morningWindDir').forEach(element => element.innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[8].wind_dir));
    document.querySelectorAll('.morningFeelsLike').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[8].feelslike_c));
    document.querySelectorAll('.morningIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[8].condition.icon, true, false)})`);

    //afternoon
    document.querySelectorAll('.afternoonTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[14].temp_c));
    document.querySelector('#afternoonDecs').innerHTML = data.forecast.forecastday[0].hour[14].condition.text;
    const afternoonPressure = Math.floor(data.forecast.forecastday[0].hour[14].pressure_mb * 0.750064)
    document.querySelectorAll('.afternoonPressure').forEach(element => element.innerHTML = afternoonPressure);
    document.querySelectorAll('.afternoonPressureDisc').forEach(element => element.innerHTML = getPressureDisc(afternoonPressure)[0]);
    document.querySelectorAll('.afternoonPressureDisc').forEach(element => element.style.color = getPressureDisc(afternoonPressure)[1]);
    document.querySelectorAll('.afternoonHumidity').forEach(element => element.innerHTML = `${data.forecast.forecastday[0].hour[14].humidity}%`);
    document.querySelectorAll('.afternoonWind').forEach(element => element.innerHTML = (data.forecast.forecastday[0].hour[14].wind_kph / 3.6).toFixed(1));
    document.querySelectorAll('.afternoonWindTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[14].windchill_c));
    document.querySelectorAll('.afternoonWindDir').forEach(element => element.innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[14].wind_dir));
    document.querySelectorAll('.afternoonFeelsLike').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[14].feelslike_c));
    document.querySelectorAll('.afternoonIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[14].condition.icon, true, false)})`);
    //evening
    document.querySelectorAll('.eveningTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[20].temp_c));
    document.querySelector('#eveningDecs').innerHTML = data.forecast.forecastday[0].hour[20].condition.text;
    const eveningPressure = Math.floor(data.forecast.forecastday[0].hour[20].pressure_mb * 0.750064)
    document.querySelectorAll('.eveningPressure').forEach(element => element.innerHTML = afternoonPressure);
    document.querySelectorAll('.eveningPressureDisc').forEach(element => element.innerHTML = getPressureDisc(eveningPressure)[0]);
    document.querySelectorAll('.eveningPressureDisc').forEach(element => element.style.color = getPressureDisc(eveningPressure)[1]);
    document.querySelectorAll('.eveningHumidity').forEach(element => element.innerHTML = `${data.forecast.forecastday[0].hour[20].humidity}%`);
    document.querySelectorAll('.eveningWind').forEach(element => element.innerHTML = (data.forecast.forecastday[0].hour[20].wind_kph / 3.6).toFixed(1));
    document.querySelectorAll('.eveningWindTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[20].windchill_c));
    document.querySelectorAll('.eveningWindDir').forEach(element => element.innerHTML = windDirTranslate(data.forecast.forecastday[0].hour[20].wind_dir));
    document.querySelectorAll('.eveningFeelsLike').forEach(element => element.innerHTML =  formatTemp(data.forecast.forecastday[0].hour[20].feelslike_c));
    document.querySelectorAll('.eveningIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[20].condition.icon, true, false)})`);

    //night
    document.querySelectorAll('.nightTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[0].hour[23].temp_c));
    document.querySelector('#nightDecs').innerHTML = data.forecast.forecastday[1].hour[2].condition.text;
    const nightPressure = Math.floor(data.forecast.forecastday[1].hour[2].pressure_mb * 0.750064)
    document.querySelectorAll('.nightPressure').forEach(element => element.innerHTML = afternoonPressure);
    document.querySelectorAll('.nightPressureDisc').forEach(element => element.innerHTML = getPressureDisc(eveningPressure)[0]);
    document.querySelectorAll('.nightPressureDisc').forEach(element => element.style.color = getPressureDisc(eveningPressure)[1]);
    document.querySelectorAll('.nightHumidity').forEach(element => element.innerHTML = `${data.forecast.forecastday[1].hour[2].humidity}%`);
    document.querySelectorAll('.nightWind').forEach(element => element.innerHTML = (data.forecast.forecastday[1].hour[2].wind_kph / 3.6).toFixed(1));
    document.querySelectorAll('.nightWindTemp').forEach(element => element.innerHTML = formatTemp(data.forecast.forecastday[1].hour[2].windchill_c));
    document.querySelectorAll('.nightWindDir').forEach(element => element.innerHTML = windDirTranslate(data.forecast.forecastday[1].hour[2].wind_dir));
    document.querySelectorAll('.nightFeelsLike').forEach(element => element.innerHTML =  formatTemp(data.forecast.forecastday[1].hour[2].feelslike_c));
    document.querySelectorAll('.nightIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[1].hour[2].condition.icon, true, true)})`);
    console.log(data.forecast.forecastday[1].hour[2].wind_dir)

})
