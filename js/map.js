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
	maxZoom: 18, attribution: '[insert correct attribution here!]' });

var rain = L.OWM.rain({appId: mapApikey});
var clouds = L.OWM.clouds({showLegend: true, appId: mapApikey});
var precipitation = L.OWM.precipitation({appId: mapApikey});
var pressure = L.OWM.pressure({appId: mapApikey});
var temp = L.OWM.temperature({appId: mapApikey});

var map = L.map('map', { center: new L.LatLng(lat, lon), zoom: 11, layers: [osm] });
var baseMaps = {};
var overlayMaps = { Дождь: rain, "Облака": clouds,'Температура':temp, 'Давление': pressure };

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);