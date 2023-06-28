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
function getPressureDisc(pressure){
    if (+pressure < 745){
        return ['Пониженное', 'yellow']
    } else if (+pressure > 765){
        return ['Повышенное', 'red']
    }
    return ['Норма', 'green']
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
        console.log(data)

        document.querySelector('table').classList.toggle('hide')
        document.querySelector('table').classList.toggle('blockLoading')

        document.querySelectorAll('.dayBlock').forEach(element => element.classList.toggle('hide'));
        document.querySelectorAll('.dayBlock').forEach(element => element.classList.toggle('blockLoading'));

        document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.classList.toggle('hide'));
        document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.classList.toggle('blockLoading'));
        document.querySelectorAll('.mobileDetailedBlock').forEach(element => element.style.padding = '10px 20px');

        document.querySelector('#cityName').classList.toggle('hide')
    
        document.querySelectorAll('.mobileDetailedHeader').forEach(element => element.classList.toggle('hide'));
        document.querySelectorAll('.detailedHeader').forEach(element => element.classList.toggle('hide'));


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
        
        var city = data.location.name;
        var currentDate = new Date()
        var isDayNow = getTimeNow().split(":")[0] > 6 && getTimeNow().split(":")[0] < 21

        const makeIconPath = (icon, today=true, isNight=false) => {
            if (today){
                if (isNight){
                    return nightIcons + icon.split('/').at(-1)
                }
                return  (isDayNow ? dayIcons : nightIcons) + icon.split('/').at(-1)
            } 
            return dayIcons + icon.split('/').at(-1)
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
        document.querySelectorAll('.todayNumDate').forEach(element => element.innerHTML = currentDate.getDate());
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
        document.querySelectorAll('.morningIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[8].condition.icon)})`);

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
        document.querySelectorAll('.afternoonIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[14].condition.icon)})`);
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
        document.querySelectorAll('.eveningIcon').forEach(element => element.style.backgroundImage = `url(${makeIconPath(data.forecast.forecastday[0].hour[20].condition.icon)})`);

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