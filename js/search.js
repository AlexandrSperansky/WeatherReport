$(document).ready(function () {
    $('#searchSubmit').click(function () {
        console.log($('#search').val());
        var city = $('#search').val();
        findLocation(city)
    });
});
const findLocation = (city) => {
    jQuery.ajaxSetup({ async: false });
    $.getJSON(`https://geocode.maps.co/search?q={${city}}`, function (data) {
        if (data.length == 0) {
            document.getElementById('searchForm').reset()
            document.getElementById('search').placeholder = 'Некорректное название'
        } else {
            console.log(data);
            fillAllBlock(data[0].lat, data[0].lon)
            document.getElementById('mapHolder').innerHTML = "<div id='map'></div>";
            createMap(data[0].lat, data[0].lon)
            document.getElementById('searchForm').reset()
            document.getElementById('search').placeholder = 'Город или район'
            document.getElementById('cityName').innerText = data[0].display_name.split(',')[0] + ', ' + data[0].display_name.split(',').at(-1)
        }
    })
}
