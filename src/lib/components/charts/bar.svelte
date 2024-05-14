<script lang="ts">
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data = [
		// Ethiopia data
		{ group: 'Total', country: 'Ethiopia', value: 114963588 },
		{ group: 'Male', country: 'Ethiopia', value: 57370422 },
		{ group: 'Female', country: 'Ethiopia', value: 57693166 },
		// Djibouti data
		{ group: 'Total', country: 'Djibouti', value: 988002 },
		{ group: 'Male', country: 'Djibouti', value: 497002 },
		{ group: 'Female', country: 'Djibouti', value: 491000 },
		// Somalia data
		{ group: 'Total', country: 'Somalia', value: 15893222 },
		{ group: 'Male', country: 'Somalia', value: 7981611 },
		{ group: 'Female', country: 'Somalia', value: 7911611 },
		// Sudan data
		{ group: 'Total', country: 'Sudan', value: 43849260 },
		{ group: 'Male', country: 'Sudan', value: 21924630 },
		{ group: 'Female', country: 'Sudan', value: 21924630 },
		// Kenya data
		{ group: 'Total', country: 'Kenya', value: 53771296 },
		{ group: 'Male', country: 'Kenya', value: 26885648 },
		{ group: 'Female', country: 'Kenya', value: 26885648 },
		// Uganda data
		{ group: 'Total', country: 'Uganda', value: 45741007 },
		{ group: 'Male', country: 'Uganda', value: 22870503 },
		{ group: 'Female', country: 'Uganda', value: 22870504 }
	];

	export let options = {
		title: 'Vertical grouped bar (time series)',
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'country',
				scaleType: ScaleTypes.LABELS
			}
		},
		height: '600px',
		toolbar: {
			enabled: false
		},
		color: {
			scale: {
				Total: '#1f77b4',
				Male: '#ff7f0e',
				Female: '#2ca02c'
			}
		}
	};
</script>

<BarChartGrouped {data} {options} style="padding:2rem;" />
