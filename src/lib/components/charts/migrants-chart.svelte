<script lang="ts" context="module">
	export type MigrantsType = {
		id: string;
		year: string;
		labor_force_migrants: { male: number; female: number };
		migrants_15_plus: { male: number; female: number };
		youth_labor_force: { male: number; female: number };
		[key: string]: any;
	};
	export type TransformedBarType = {
		group: string;
		value: number;
		year: any;
	};
</script>

<script lang="ts">
	import { LineChart, ScaleTypes, BarChartGrouped } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	export let title = '';
	export let chartType: 'bar' | 'line' = 'line';
	let chartTypes = ['line', 'bar'];
	export let isSwappable = false;

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

	const transformDataForLine = (data: MigrantsType[]) => {
		let transformedData: { group: string; value: number; year: string }[] = [];

		// transform the data to the group representing the object name i.e. labor_force_migrants, migrants_15_plus, youth_labor_force and total(sum of all the groups values) and the value representing the sum of male and female values for each group
		data.map((d) => {
			Object.keys(d).map((key) => {
				if (key !== 'id' && key !== 'year') {
					transformedData.push({
						group: key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
						value: d[key].male + d[key].female,
						year: d.year.split('-')[0]
					});
				}
			});
		});

		// add the total value for each year
		uniqueYears.map((year) => {
			transformedData.push({
				group: 'Total',
				value: transformedData
					.filter((d) => d.year === year.split('-')[0])
					.reduce((acc, curr) => acc + curr.value, 0),
				year: year.split('-')[0]
			});
		});

		return transformedData;
	};

	let migrantsBarData: TransformedBarType[] = [];

	const transformDataForBar = (data: MigrantsType[]) => {
		let transformedData: TransformedBarType[] = [];

		data.map((d) => {
			let totalMale = 0;
			let totalFemale = 0;

			Object.keys(d).map((key) => {
				if (typeof d[key] === 'object') {
					if (selectedMigrantType === 'All' || selectedMigrantType === key) {
						totalMale += d[key].male;
						totalFemale += d[key].female;
					}
				}
			});

			transformedData.push({
				group: 'Male',
				value: totalMale,
				year: d.year.split('-')[0]
			});
			transformedData.push({
				group: 'Female',
				value: totalFemale,
				year: d.year.split('-')[0]
			});
		});

		return transformedData;
	};

	$: {
		selectedMigrantType;
		migrantsBarData = transformDataForBar(data);
	}

	const uniqueYears = data.map((d) => d.year).filter((v, i, a) => a.indexOf(v) === i);
	let selectedMigrantType = 'All';
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
				<div class="flex gap-3 {chartType === 'bar' ? '' : 'hidden'}">
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-primary-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Male</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-secondary-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Female</span>
					</div>
				</div>
			</div>
		</div>

		<div class=" flex gap-3 flex-col md:flex-row">
			{#if chartType === 'bar'}
				<div class=" flex gap-3 flex-col md:flex-row">
					<!-- select migrant type -->
					<Select
						placeholder="Select Migrant type"
						bind:selectedOption={selectedMigrantType}
						options={[
							{ value: 'All', label: 'All' },
							{ value: 'labor_force_migrants', label: 'Labor force migrants' },
							{ value: 'migrants_15_plus', label: 'Migrants 15 plus' },
							{ value: 'youth_labor_force_migrants', label: 'Youth labor force migrants' }
						]}
					/>
				</div>
			{/if}
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
		</div>
	</div>
	<div class="w-full h-[0px] border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<LineChart
				data={transformDataForLine(data)}
				options={{
					...options,
					axes: {
						bottom: {
							title: 'Year',
							mapsTo: 'year',
							scaleType: ScaleTypes.LABELS
						},
						left: {
							title: 'Total Migrants',
							mapsTo: 'value',
							scaleType: ScaleTypes.LINEAR
						}
					},
					legend: { enabled: true },
					color: {
						scale: {
							'Youth labor force migrants': '#6880FF',
							'Labor force migrants': '#8BC34A',
							'Migrants 15 plus': '#00833F',
							Total: '#F4BE49'
						}
					}
				}}
			/>
		{:else if chartType === 'bar'}
			<BarChartGrouped
				data={migrantsBarData}
				options={{
					...options,
					axes: {
						bottom: {
							title: 'Year',
							mapsTo: 'year',
							scaleType: ScaleTypes.LABELS
						},
						left: {
							title: 'Number of Migrants ',
							mapsTo: 'value',
							scaleType: ScaleTypes.LINEAR
						}
					},
					color: {
						scale: {
							Male: '#00833F',
							Female: '#F4BE49'
						}
					}
				}}
			/>
		{:else}
			<p>Invalid chart type</p>
		{/if}
	</div>
</div>
