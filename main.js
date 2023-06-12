const apiKey = 'f28a7fa8da894874aa224742231106';
const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

fetch(query).then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);
})