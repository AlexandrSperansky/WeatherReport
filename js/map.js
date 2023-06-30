const createMap = (lat, lon) => {
	const openWeatherkey = `3b6fdcc2df7931683a68adf5d6d20a0a`
	function myOwmMarker(data) {
		// just a Leaflet default marker
		return L.marker([lat, lon]);
	}
	
	function myOwmPopup(data) {
		// just a Leaflet default popup with name as content
		return L.popup().setContent(data.name);
	}
	
	var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18 });
	
	var rain = L.OWM.rainClassic({opacity: 0.5 , appId: openWeatherkey});
	var snow = L.OWM.snow({opacity: 0.5, appId: openWeatherkey});
	var clouds = L.OWM.cloudsClassic({opacity: 0.5 ,appId: openWeatherkey});
	var precipitation = L.OWM.pressure({opacity: 0.5 ,appId: openWeatherkey});
	var pressure = L.OWM.pressure({opacity: 0.5,appId: openWeatherkey});
	var temp = L.OWM.temperature({opacity: 0.5,appId: openWeatherkey});
	var wind = L.OWM.wind({opacity: 0.5,appId: openWeatherkey});
	
	var map = L.map('map', { center: new L.LatLng(lat, lon), zoom: 11, layers: [osm] });
	var baseMaps = {};
	var overlayMaps = { 'Осадки':precipitation, Дождь: rain, 'Снег':snow,"Облака": clouds, 'Ветер': wind, 'Температура':temp, 'Давление': pressure, };
	
	var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
}
const MapFlyTo = (lat, lon) => {
	map.setView([lat, lon], 13);

}