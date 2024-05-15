<script>
	import { LineChart, ScaleTypes } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data = [
		{ group: 'Dataset 1', key: 'Jan', value: 100 },
		{ group: 'Dataset 1', key: 'Feb', value: 200 },
		{ group: 'Dataset 1', key: 'Mar', value: 300 },
		{ group: 'Dataset 2', key: 'Jan', value: 400 },
		{ group: 'Dataset 2', key: 'Feb', value: 500 },
		{ group: 'Dataset 2', key: 'Mar', value: 600 }
	];

	export let options = {
		axes: {
			bottom: {
				mapsTo: 'key',
				scaleType: ScaleTypes.LABELS
			},
			left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR }
		},
		curve: 'curveNatural',
		height: '400px',
		width: '100%',
		grid: {
			x: { enabled: false },
			y: { enabled: true }
		},
		points: {
			radius: 4
		},
		color: {
			scale: {
				'Dataset 1': '#00833F',
				'Dataset 2': '#F4BE49'
			}
		},
		toolbar: {
			enabled: false
		},
		legend: {
			enabled: false
		}
	};
</script>

<LineChart {data} {options} />
