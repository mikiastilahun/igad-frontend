<script lang="ts">
	import { onMount } from 'svelte';
	// import { statesData } from '$lib/assets/json/us';

	import eritrea from '$lib/assets/json/eritrea.json';
	import ethiopia from '$lib/assets/json/ethiopia.json';
	import djibouti from '$lib/assets/json/djibouti.json';
	import kenya from '$lib/assets/json/kenya.json';
	import somalia from '$lib/assets/json/somalia.json';
	import southSudan from '$lib/assets/json/south-sudan.json';
	import sudan from '$lib/assets/json/sudan.json';
	import tanzania from '$lib/assets/json/tanzania.json';
	import uganda from '$lib/assets/json/uganda.json';

	import type { Map, GeoJSON } from 'leaflet';

	const eastAfricaGeoJSON = {
		type: 'FeatureCollection',
		features: [
			djibouti,
			eritrea,
			ethiopia,
			kenya,
			somalia,
			southSudan,
			sudan,
			tanzania,
			uganda
		].map((country) => {
			country.features[0].properties.density = Math.random() * 1000;
			return country;
		})
	};
	let map: Map;

	// Function to import Leaflet dynamically
	async function loadLeaflet() {
		const L = await import('leaflet');

		// Function to get color based on population density
		function getColor(d: number) {
			return d > 1000
				? '#800026'
				: d > 500
					? '#BD0026'
					: d > 200
						? '#E31A1C'
						: d > 100
							? '#FC4E2A'
							: d > 50
								? '#FD8D3C'
								: d > 20
									? '#FEB24C'
									: d > 10
										? '#FED976'
										: '#FFEDA0';
		}

		// Style function for GeoJSON layer
		function style(feature: any) {
			return {
				fillColor: getColor(feature.properties.density),
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7
			};
		}

		// Event listeners for interactive map
		function highlightFeature(e: any) {
			var layer = e.target;
			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});
			layer.bringToFront();
			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		//Custom legend control
		let legend = L.control({ position: 'bottomright' });
		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 10, 20, 50, 100, 200, 500, 1000],
				labels = [],
				from,
				to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' +
						getColor(from + 1) +
						'"></i> ' +
						from +
						(to ? '&ndash;' + to : '+')
				);
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};
		// Custom info control
		let info = L.control();
		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML =
				'<h4>US Population Density</h4>' +
				(props
					? '<b>' + props.COUNTRY + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
					: 'Hover over a state');
		};

		// Add event listeners to GeoJSON layer
		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		// Initialize the map
		map = L.map('map').setView([7.1181, 31.254], 4);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		// Add GeoJSON layer
		var geojson = L.geoJson(eastAfricaGeoJSON, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		info.addTo(map);
		legend.addTo(map);
	}

	onMount(() => {
		loadLeaflet();
	});
</script>

<div id="map" class="h-[700px] w-[800px] max-w-full bg-green-100 border-2"></div>

<style>
	:global(.info) {
		padding: 6px 8px;
		font:
			14px/16px Arial,
			Helvetica,
			sans-serif;
		background: white;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
	}

	:global(.legend) {
		margin: 0 0 5px;
		color: #777;
	}

	:global(.legend) {
		line-height: 18px;
		color: #555;
	}

	:global(.legend i) {
		width: 18px;
		height: 18px;
		float: left;
		margin-right: 8px;
		opacity: 0.7;
	}
</style>
