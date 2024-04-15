<script lang="ts">
	import { json } from 'd3';
	import ethiopia from '$lib/assets/json/ethiopia.json';
	import uganda from '$lib/assets/json/uganda.json';
	import kenya from '$lib/assets/json/kenya.json';
	import chad from '$lib/assets/json/chad.json';
	import djibouti from '$lib/assets/json/djibouti.json';
	import eritrea from '$lib/assets/json/eritrea.json';
	import somalia from '$lib/assets/json/somalia.json';
	import southSudan from '$lib/assets/json/south-sudan.json';
	import sudan from '$lib/assets/json/sudan.json';
	import tanzania from '$lib/assets/json/tanzania.json';
	import egypt from '$lib/assets/json/egypt.json';

	import { geoPath, geoNaturalEarth1 } from 'd3';
	import { onMount } from 'svelte';
	export let dataset: any[] = [];
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);

	let geojson: any;
	onMount(async () => {
		// Merge the features from each geoJSON data
		geojson = {
			type: 'FeatureCollection',
			features: [
				...ethiopia.features,
				...uganda.features,
				...kenya.features,
				...chad.features,
				...djibouti.features,
				...eritrea.features,
				...somalia.features,
				...southSudan.features,
				...sudan.features,
				...tanzania.features,
				...egypt.features
			]
		};
	});
	$: pathGenerator = geoPath(projection);

	let counties: any = [];
	$: if (geojson) {
		counties = geojson.features.map((feature) => {
			return {
				...feature,
				path: pathGenerator(feature)
			};
		});

		console.log(counties);
	}
</script>

<svg width={1200} height={600}>
	{#each counties as data}
		<path d={path(data)} />
	{/each}
</svg>
<div>hel</div>

<style>
	path {
		fill: none;
		stroke: red;
		stroke-width: 1px;
	}
</style>
