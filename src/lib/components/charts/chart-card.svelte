<script lang="ts">
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';
	import { browser } from '$app/environment';

	export let title = '';
	export let chartType: 'bar' | 'table' | 'pie' | 'line' = 'bar';
	let chartTypes = ['bar', 'table', 'pie', 'line'];
	export let isSwappable = false;

	let chartInstance;

	let data = [
		// Ethiopia data
		{ group: 'Total', key: 'Ethiopia', value: 114963588 },
		{ group: 'Male', key: 'Ethiopia', value: 57370422 },
		{ group: 'Female', key: 'Ethiopia', value: 57693166 },
		// Djibouti data
		{ group: 'Total', key: 'Djibouti', value: 988002 },
		{ group: 'Male', key: 'Djibouti', value: 497002 },
		{ group: 'Female', key: 'Djibouti', value: 491000 },
		// Somalia data
		{ group: 'Total', key: 'Somalia', value: 15893222 },
		{ group: 'Male', key: 'Somalia', value: 7981611 },
		{ group: 'Female', key: 'Somalia', value: 7911611 },
		// Sudan data
		{ group: 'Total', key: 'Sudan', value: 43849260 },
		{ group: 'Male', key: 'Sudan', value: 21924630 },
		{ group: 'Female', key: 'Sudan', value: 21924630 },
		// Kenya data
		{ group: 'Total', key: 'Kenya', value: 53771296 },
		{ group: 'Male', key: 'Kenya', value: 26885648 },
		{ group: 'Female', key: 'Kenya', value: 26885648 },
		// Uganda data
		{ group: 'Total', key: 'Uganda', value: 45741007 },
		{ group: 'Male', key: 'Uganda', value: 22870503 },
		{ group: 'Female', key: 'Uganda', value: 22870504 }
	];

	onMount(() => {
		if (!browser) return;
		const chartDom = document.getElementById('main');
		chartInstance = echarts.init(chartDom);
		updateChart();
	});

	// $: updateChart();

	function updateChart() {
		let option;

		if (chartType === 'line') {
			option = {
				xAxis: {
					type: 'category',
					data: data.map((item) => item.key)
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: data.map((item) => item.value),
						type: 'line'
					}
				]
			};
		} else if (chartType === 'bar') {
			option = {
				xAxis: {
					type: 'category',
					data: data.map((item) => item.key)
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: data.map((item) => item.value),
						type: 'bar'
					}
				]
			};
		} else if (chartType === 'pie') {
			option = {
				series: [
					{
						data: data.map((item) => ({ name: item.key, value: item.value })),
						type: 'pie'
					}
				]
			};
		} else if (chartType === 'table') {
			option = {
				// Table options
			};
		}

		chartInstance.setOption(option);
	}
</script>

<div id="main" style="width: 100%;height:400px;"></div>
