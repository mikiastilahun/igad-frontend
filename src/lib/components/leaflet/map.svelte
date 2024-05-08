<script lang="ts">
	import { onMount } from 'svelte';

	import eritrea from '$lib/assets/json/eritrea.json';
	import ethiopia from '$lib/assets/json/ethiopia.json';
	import djibouti from '$lib/assets/json/djibouti.json';
	import kenya from '$lib/assets/json/kenya.json';
	import somalia from '$lib/assets/json/somalia.json';
	import southSudan from '$lib/assets/json/south-sudan.json';
	import sudan from '$lib/assets/json/sudan.json';
	import tanzania from '$lib/assets/json/tanzania.json';
	import uganda from '$lib/assets/json/uganda.json';

	import 'leaflet/dist/leaflet.css';

	import type { Map } from 'leaflet';
	const eastAfricaGeoJSON = {
		type: 'FeatureCollection',
		features: [djibouti, eritrea, ethiopia, kenya, somalia, southSudan, sudan, uganda].map(
			(country) => {
				country.features[0].properties.density = Math.random() * 1000;
				return country;
			}
		)
	};

	let map: Map;

	const loadLeaflet = async () => {
		const L = await import('leaflet');

		function getColor(d: number) {
			// total number of density groups: 8
			return d > 1000
				? '#005a32'
				: d > 500
					? '#238b45'
					: d > 200
						? '#41ab5d'
						: d > 100
							? '#74c476'
							: d > 50
								? '#a1d99b'
								: d > 20
									? '#c7e9c0'
									: d > 10
										? '#e5f5e0'
										: '#f7fcf5';
		}

		function style(feature: {
			properties: {
				density: number;
				GID_0: string;
				COUNTRY: string;
			};
		}) {
			return {
				fillColor: getColor(feature.properties.density),
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7
			};
		}

		function highlightFeature(e: any) {
			let layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});
			layer.bringToFront();

			// Add this line to bind a popup to the layer
			// layer.bindPopup(
			// 	`<b>Country: </b>${layer.feature.properties.COUNTRY}<br/><b>Density: </b>${layer.feature.properties.density}`
			// );
			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		let info = L.control();
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
		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML =
				'<h4>IGAD Population Density</h4>' +
				(props
					? '<b>' + props.COUNTRY + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
					: 'Hover over a country');
		};

		map = L.map('IGAD_map').setView([9.1181, 35], 5);
		let eastAfricaBounds = L.latLngBounds([
			[4.5, 29],
			[15, 51]
		]);
		map.setMaxBounds(eastAfricaBounds);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		let geojson = L.geoJson(eastAfricaGeoJSON, {
			style: style,
			onEachFeature: (feature, layer) => {
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature
				});
			}
		}).addTo(map);

		info.addTo(map);
		legend.addTo(map);
	};

	onMount(() => {
		loadLeaflet();
	});
</script>

<div id="IGAD_map" class="relative bg-red overflow-hidden flex justify-center">
	<div class="h-[700px] w-[800px] max-w-full bg-green-100 border-2"></div>
</div>

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
