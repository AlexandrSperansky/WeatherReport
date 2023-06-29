const mapApikey = 'b5624ce86e106ad950186fe5bf8adf4b'
function myOwmMarker(data) {
	// just a Leaflet default marker
	return L.marker([data.coord.lat, data.coord.lon]);
}

function myOwmPopup(data) {
	// just a Leaflet default popup with name as content
	return L.popup().setContent(data.name);
}

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18 });

var rain = L.OWM.rainClassic({opacity: 0.5 ,appId: mapApikey});
var snow = L.OWM.snow({opacity: 0.5, appId: mapApikey});
var clouds = L.OWM.cloudsClassic({opacity: 0.5 ,appId: mapApikey});
var precipitation = L.OWM.pressure({opacity: 0.5 ,appId: mapApikey});
var pressure = L.OWM.pressure({opacity: 0.5,appId: mapApikey});
var temp = L.OWM.temperature({opacity: 0.5,appId: mapApikey});
var wind = L.OWM.wind({opacity: 0.5,appId: mapApikey});

var map = L.map('map', { center: new L.LatLng(lat, lon), zoom: 11, layers: [osm] });
var baseMaps = {};
var overlayMaps = { 'Осадки':precipitation, Дождь: rain, 'Снег':snow,"Облака": clouds, 'Ветер': wind, 'Температура':temp, 'Давление': pressure, };

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);