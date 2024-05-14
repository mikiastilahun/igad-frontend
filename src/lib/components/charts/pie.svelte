<script lang="ts">
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data = [
		{ group: 'Group 1', value: 65000 },
		{ group: 'Group 2', value: 29123 },
		{ group: 'Group 3', value: 35213 },
		{ group: 'Group 4', value: 51213 },
		{ group: 'Group 5', value: 16932 }
	];

	export let options = {
		title: 'Pie Chart',
		resizable: true,
		legend: {
			alignment: 'center'
		},
		height: '400px',
		theme: 'g10'
	};
</script>

<DonutChart {data} {options} />
