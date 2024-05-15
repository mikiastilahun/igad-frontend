<script lang="ts">
	import { LineChart, ScaleTypes, BarChartGrouped, PieChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';
	import Table from './table.svelte';

	export let title = '';
	export let isSwappable = false;
	export let data = [
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

	export let chartType: 'bar' | 'table' | 'pie' | 'line' = 'bar';
	let chartTypes = ['bar', 'table', 'pie', 'line'];
</script>

<div class="bg-white shadow grid gap-6 p-6 rounded">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<span class="text-zinc-400 text-base leading-tight">Statistics</span>
			<div class="flex gap-6 justify-center items-baseline">
				<h4 class="text-stone-900 text-xl font-bold leading-7">{title}</h4>
				<div class="flex gap-3">
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Total</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-orange-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Female</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Male</span>
					</div>
				</div>
			</div>
		</div>

		<div class="flex gap-3">
			{#if isSwappable}
				<div
					class=" h-10 px-3 py-1.5 bg-neutral-100 rounded-lg justify-center items-center gap-6 inline-flex"
				>
					{#each chartTypes as type (type)}
						<label
							class="px-[15px] py-2 {chartType === type
								? 'bg-green-700'
								: ''} rounded justify-end items-center gap-2.5 flex"
						>
							<input type="radio" bind:group={chartType} value={type} class="hidden" />
							<span
								class="text-center {chartType === type
									? 'text-white'
									: 'text-neutral-400'} text-sm font-medium leading-none"
							>
								{type[0].toUpperCase() + type.slice(1)}
							</span>
						</label>
					{/each}
				</div>
			{/if}
			<!-- select age group -->
			<Select
				placeholder="Select age group"
				options={[
					{
						value: '18-24',
						label: '18-24'
					}
				]}
			/>
			<!-- select country -->
			<Select
				placeholder="Select country"
				options={[
					{
						value: 'ALL',
						label: 'All Countries'
					}
				]}
			/>
		</div>
	</div>
	<div class="w-full h-[0px] border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<LineChart {data} {options} />
		{:else if chartType === 'bar'}
			<BarChartGrouped {data} {options} style="padding:2rem;" />
		{:else if chartType === 'pie'}
			<PieChart {data} {options} />
		{:else if chartType === 'table'}
			<Table />
		{/if}
	</div>
</div>
