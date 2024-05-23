<script lang="ts" context="module">
	export type DataType = {
		group: string;
		key: string;
		value: number;
		age_group: string;
		year: string;
		country?: string;
	};
</script>

<script lang="ts">
	import {
		LineChart,
		ScaleTypes,
		BarChartGrouped,
		PieChart,
		BarChartStacked
	} from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';
	import Table from './table.svelte';

	export let tableColumnName = 'Country';
	export let title = '';
	export let chartType: 'bar' | 'table' | 'pie' | 'line' | 'bar_stacked' = 'bar';
	let chartTypes = ['bar', 'table', 'pie', 'line'];
	export let isSwappable = false;

	export let uniqueYears: any[] = [];
	export let selectedYear: string;

	export let uniqueAgeGroups: any[] = [];
	export let selectedAgeGroup: string;

	export let uniqueCountries: any[] = [];
	export let selectedCountry: string;

	export let data: any[] = [];

	export let options = {
		axes: {
			bottom: {
				mapsTo: 'key',
				scaleType: ScaleTypes.LABELS
			},
			left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR }
		},
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
				Male: '#00833F',
				Female: '#F4BE49',
				Total: 'rgb(55, 65, 81)'
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

<div class="bg-white shadow grid gap-6 p-2 md:p-6 rounded bg-zin">
	<!-- toolbar -->
	<div
		class=" flex lg:items-end justify-between gap-4 flex-col lg:flex-row
			"
	>
		<div class="flex items-start flex-col">
			<span class="text-zinc-400 text-base leading-tight">Statistics</span>
			<div class="flex gap-6 justify-center items-baseline">
				<h4 class="text-stone-900 text-lg font-bold leading-7">{title}</h4>
				<div class="flex gap-3">
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-gray-700 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Total</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-secondary-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Female</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-primary-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Male</span>
					</div>
				</div>
			</div>
		</div>

		<div class=" flex gap-3 flex-col md:flex-row">
			{#if isSwappable}
				<div
					class=" h-10 px-3 py-1.5 bg-neutral-100 rounded-lg justify-center items-center gap-6 inline-flex"
				>
					{#each chartTypes as type (type)}
						<label
							class="transition-colors cursor-pointer group hover:bg-primary-200 px-[15px] py-2 {chartType ===
							type
								? 'bg-primary-500 hover:bg-primary-600'
								: ''} rounded justify-end items-center gap-2.5 flex"
						>
							<input type="radio" bind:group={chartType} value={type} class="hidden" />
							<span
								class="transition-colors text-center group-hover:text-black {chartType === type
									? 'text-white group-hover:!text-white'
									: 'text-neutral-400'} text-sm font-medium leading-none"
							>
								{type[0].toUpperCase() + type.slice(1)}
							</span>
						</label>
					{/each}
				</div>
			{/if}
			<!-- select age group -->
			{#if uniqueAgeGroups.length > 0}
				<Select
					placeholder="Select age group"
					bind:selectedOption={selectedAgeGroup}
					options={[
						...uniqueAgeGroups.map((year) => {
							return {
								value: year,
								label: year
							};
						})
					]}
				/>
			{/if}

			<!-- select year -->
			{#if uniqueYears.length > 0}
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
			{/if}

			<!-- select country -->
			{#if uniqueCountries.length > 0}
				<Select
					placeholder="Select country"
					bind:selectedOption={selectedCountry}
					options={[
						...uniqueCountries.map((country) => {
							return {
								value: country,
								label: country
							};
						})
					]}
				/>
			{/if}
		</div>
	</div>
	<div class="w-full h-[0px] border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<LineChart {data} {options} />
		{:else if chartType === 'bar'}
			<BarChartGrouped {data} {options} />
		{:else if chartType === 'pie'}
			<PieChart
				{data}
				options={{
					...options,
					legend: {
						alignment: 'center'
					}
				}}
			/>
		{:else if chartType === 'table'}
			<Table {tableColumnName} {data} />
		{:else if chartType === 'bar_stacked'}
			<BarChartStacked {data} {options} />
		{:else}
			<p>Invalid chart type</p>
		{/if}
	</div>
</div>
