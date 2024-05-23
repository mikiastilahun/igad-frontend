<script lang="ts" context="module">
	export type DataType = {
		group: string;
		key: string;
		value: number;
		age_group: string;
		year: string;
	}[];
</script>

<script lang="ts">
	import { LineChart, ScaleTypes, BarChartGrouped, PieChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';
	import Table from './table.svelte';
	import type {
		AgeGroup,
		PopulationPerCountryStats
	} from '../../../routes/statistics/proxy+page.server.js';

	export let title = '';
	export let chartType: 'bar' | 'table' | 'pie' | 'line' = 'bar';
	let chartTypes = ['bar', 'table', 'pie', 'line'];
	export let isSwappable = false;

	export let externalData:
		| Omit<
				PopulationPerCountryStats['data']['attributes'],
				'createdAt' | 'updatedAt' | 'publishedAt'
		  >
		| undefined = undefined;

	let uniqueYears: any[] = [
		...new Set(
			Object.values(externalData ?? {})
				.flat()
				.filter((item) => item && item.year)
				.map((item) => item.year.split('-')[0])
		)
	];
	let selectedYear: string = uniqueYears[0];

	let uniqueAgeGroups: AgeGroup[] = [
		...new Set(
			Object.values(externalData ?? {})
				.flat()
				.filter((item) => item && item.age_group)
				.map((item) => item.age_group)
		)
	];
	let selectedAgeGroup: AgeGroup = uniqueAgeGroups[0];

	let data: DataType = [];
	let filteredData: {
		group: string;
		key: string;
		value: number;
		age_group: string;
		year: string;
	}[] = [];
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

	$: {
		for (let country in externalData) {
			if (Array.isArray(externalData[country])) {
				externalData[country].forEach((item) => {
					data.push({
						group: 'Total',
						key: country,
						value: item.male + item.female,
						age_group: item.age_group,
						year: item.year
					});
					// Add male data
					data.push({
						group: 'Male',
						key: country,
						value: item.male,
						age_group: item.age_group,
						year: item.year
					});

					// Add female data
					data.push({
						group: 'Female',
						key: country,
						value: item.female,
						age_group: item.age_group,
						year: item.year
					});
				});
			}
		}
	}

	$: {
		selectedAgeGroup;
		selectedYear;
		filteredData = data.filter((item) => {
			return item.age_group === selectedAgeGroup && item.year.split('-')[0] === selectedYear;
		});
	}
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

			<!-- select year -->
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
	</div>
	<div class="w-full h-[0px] border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<LineChart data={filteredData} {options} />
		{:else if chartType === 'bar'}
			<BarChartGrouped data={filteredData} {options} />
		{:else if chartType === 'pie'}
			<PieChart
				data={filteredData}
				options={{
					...options,
					legend: {
						alignment: 'center'
					}
				}}
			/>
		{:else if chartType === 'table'}
			<Table data={filteredData} />
		{/if}
	</div>
</div>
