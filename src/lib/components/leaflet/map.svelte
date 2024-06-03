<script lang="ts">
	import { onMount } from 'svelte';
	import Select from '$lib/components/_shared/select/select.svelte';

	import eritrea from '$lib/assets/json/eritrea.json';
	import ethiopia from '$lib/assets/json/ethiopia.json';
	import djibouti from '$lib/assets/json/djibouti.json';
	import kenya from '$lib/assets/json/kenya.json';
	import somalia from '$lib/assets/json/somalia.json';
	import southSudan from '$lib/assets/json/south-sudan.json';
	import sudan from '$lib/assets/json/sudan.json';
	import uganda from '$lib/assets/json/uganda.json';

	// import {} from 'leaflet';

	import type { PopulationStats } from '../../../routes/+page.server.js';

	import 'leaflet/dist/leaflet.css';

	import type { Map, GeoJSON } from 'leaflet';
	import { formatNumber } from '$lib/utils/format-number.js';

	export let data: PopulationStats['data']['attributes'] | undefined;

	let uniqueYears: any[] = [
		...new Set(
			Object.values(data ?? {})
				.flat()
				.filter((item) => item && item.year)
				.map((item) => item.year.split('-')[0])
		)
	];

	let selectedYear: string = uniqueYears[0];

	$: eastAfricaGeoJSON = {
		type: 'FeatureCollection',
		features: [djibouti, eritrea, ethiopia, kenya, somalia, southSudan, sudan, uganda].map(
			(country) => {
				let countryData = data[country.features[0].properties.COUNTRY];
				let countryYearData = countryData.find((item) => item.year.split('-')[0] === selectedYear);

				let male = Number(countryYearData?.male || 0);
				let female = Number(countryYearData?.female || 0);

				country.features[0].properties.FEMALE = female;
				country.features[0].properties.MALE = male;
				country.features[0].properties.TOTAL = male + female;
				return country;
			}
		)
	};

	let map: Map;
	let geojson: GeoJSON;
	let grades: number[] = [];

	const calculateGrades = () => {
		let max = Math.max(
			...eastAfricaGeoJSON.features.map((country) => country.features[0].properties.TOTAL)
		);
		let min = Math.min(
			...eastAfricaGeoJSON.features.map((country) => country.features[0].properties.TOTAL)
		);

		let step = (max - min) / 8;
		for (let i = 0; i < 8; i++) {
			grades.push(min + step * i);
		}
	};

	const loadLeaflet = async () => {
		const L = await import('leaflet');
		const screenWidth = window.innerWidth;

		calculateGrades();

		function getColor(d: number) {
			// total number of density groups: 8
			return d > grades[8]
				? '#00512d'
				: d > grades[7]
					? '#005a32'
					: d > grades[6]
						? '#238b45'
						: d > grades[5]
							? '#41ab5d'
							: d > grades[4]
								? '#74c476'
								: d > grades[3]
									? '#a1d99b'
									: d > grades[2]
										? '#c7e9c0'
										: '#e5f5e0';
		}

		function style(feature: {
			properties: {
				density: number;
				GID_0: string;
				COUNTRY: string;
			};
		}) {
			return {
				fillColor: getColor(feature.properties.TOTAL),
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

			layer.on('mouseover', function () {
				layer
					.bindPopup(
						`
						
    <div class=" text-gray-400 rounded-lg flex-col justify-start items-start gap-2 inline-flex">
        <div class="self-stretch text-center  text-[10px] font-semibold  uppercase leading-none tracking-tight">Population</div>
        <div class="justify-start items-start gap-2 inline-flex">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
                <div class="justify-start items-center gap-2 inline-flex">
                    <div class="w-3 h-3 bg-stone-500 rounded-[50px] border border-white/opacity-60"></div>
                    <div class=" text-xs font-normal  leading-[18px]">Total</div>
                </div>
                <div class="justify-start items-center gap-2 inline-flex">
                    <div class="w-3 h-3 bg-green-700 rounded-[50px] border border-white/opacity-60"></div>
                    <div class=" text-xs font-normal  leading-[18px]">Male</div>
                </div>
                <div class="justify-start items-center gap-2 inline-flex">
                    <div class="w-3 h-3 bg-amber-300 rounded-[50px] border border-white/opacity-60"></div>
                    <div class=" text-xs font-normal  leading-[18px]">Female</div>
                </div>
            </div>
            <div class="flex-col justify-start items-start gap-2 inline-flex">
                <div class=" text-xs font-semibold  leading-[18px]">${formatNumber(layer.feature.properties.TOTAL)}</div>
                <div class=" text-xs font-semibold  leading-[18px]"> ${formatNumber(layer.feature.properties.MALE)}</div>
                <div class=" text-xs font-semibold  leading-[18px]">${formatNumber(layer.feature.properties.FEMALE)}</div>
            </div>
        </div>
    </div>
	
						`
					)

					.openPopup();
			});
			info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			// map.fitBounds(e.target.getBounds());
			// TODO: Implement click event
		}

		let info = L.control();
		let legend = L.control({ position: 'bottomright' });

		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
				labels = [],
				from,
				to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					`<span><i style="background:${getColor(from + 1)}"></i> ${formatNumber(from)}${to ? '&ndash;' + formatNumber(to) : '+'}</span>`
				);
			}

			div.innerHTML = `<div class="gap-2 flex flex-col  flex-wrap scale-" ">${labels.join('')}</div>`;
			return div;
		};
		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML =
				'<h4>IGAD Population</h4>' +
				(props
					? `<b>Population</b><br/>
            <b>Total: </b>${formatNumber(props.TOTAL)}<br/>
            <b>Male: </b>${formatNumber(props.MALE)}<br/>
            <b>Female: </b>${formatNumber(props.FEMALE)}`
					: 'Hover over a country');
		};

		map = L.map('IGAD_map', {
			zoomControl: screenWidth <= 768 ? true : false,
			dragging: screenWidth <= 768 ? true : false,
			touchZoom: screenWidth <= 768 ? true : false,
			doubleClickZoom: false,
			scrollWheelZoom: false,
			boxZoom: false,
			keyboard: false
		}).setView([9.1181, 35], screenWidth <= 768 ? 4 : 5);
		let eastAfricaBounds =
			screenWidth <= 768
				? L.latLngBounds([
						[4.5, 23],
						[10, 51]
					])
				: L.latLngBounds([
						[4.5, 29],
						[15, 51]
					]);
		map.setMaxBounds(eastAfricaBounds);
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		geojson = L.geoJson(eastAfricaGeoJSON, {
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

	$: {
		selectedYear;
		if (geojson) {
			geojson.clearLayers();
			geojson.addData(eastAfricaGeoJSON);
		}
	}

	onMount(() => {
		loadLeaflet();
	});
</script>

<div class="relative">
	<div class="max-w-[180px] absolute z-[99999] top-2 left-2 shadow-lg rounded-lg">
		<Select
			placeholder="Select year"
			bind:selectedOption={selectedYear}
			options={[
				...uniqueYears.map((year) => {
					return {
						value: year,
						label: year
					};
				})
			]}
		/>
	</div>
	<div id="IGAD_map" class="relative bg-red overflow-hidden flex justify-center">
		<div class="h-[400px] md:h-[725px] w-[800px] max-w-full bg-green-100 border-2"></div>
	</div>
</div>

<style>
	:global(.info) {
		padding: 6px 8px;
		font-size: 12px;
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
		opacity: 0.9;
	}
	:global(.leaflet-popup-content) {
		/* margin: 0 !important; */
	}
</style>
