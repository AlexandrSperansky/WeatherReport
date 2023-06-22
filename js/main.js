const apiKey = 'f28a7fa8da894874aa224742231106';
const yandexApiKey = '37039c7a-2ca4-42b6-9bdf-fc3e03db9066'
let form = document.querySelector('#cityName');
let city = form.textContent
function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);



    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${crd.latitude},${crd.longitude}`;

fetch(url).then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);
    console.log(data.location.name);
    console.log(data.location.country);
    console.log(data.current.temp_c);
    console.log(data.current.condition.text);
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
