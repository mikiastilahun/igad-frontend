<script lang="ts" context="module">
	export type MigrantsType = {
		id: string;
		year: string;
		country: string;
		labor_force_migrants: { male: number; female: number };
		migrants_15_plus: { male: number; female: number };
		youth_labor_force_migrants: { male: number; female: number };
		[key: string]: any;
	};
	export type TransformedBarType = {
		group: string;
		value: number;
		year: any;
	};
</script>

<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	import { onMount, type ComponentType } from 'svelte';
	import { ScaleTypes } from '@carbon/charts-svelte';
	import { type LineChart, type BarChartGrouped } from '@carbon/charts-svelte';

	let lineChart: ComponentType<LineChart>;
	let barChart: ComponentType<BarChartGrouped>;

	onMount(async () => {
		const { LineChart, BarChartGrouped } = await import('@carbon/charts-svelte');
		lineChart = LineChart;
		barChart = BarChartGrouped;
	});

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
			enabled: true
		},
		legend: {
			enabled: false
		}
	};

	const transformDataForLine = (data: MigrantsType[]) => {
		let transformedData: { group: string; value: number; year: string }[] = [];

		if (selectedCountry === 'All' || selectedCountry === '') {
			uniqueYears.map((year) => {
				let totalValue = 0;
				let filteredYearData = data.filter((y) => y.year === year);

				// for each year calculate the total value of all countries combined total of each migrant type (labor_force_migrants, migrants_15_plus, youth_labor_force_migrants) and then
				// push the data into an array of objects (group: migrantType, value: total, year)
				['labor_force_migrants', 'migrants_15_plus', 'youth_labor_force_migrants'].forEach(
					(migrantType) => {
						let migrantTypeTotal = filteredYearData.reduce((acc, curr) => {
							return acc + curr[migrantType].male + curr[migrantType].female;
						}, 0);
						totalValue += migrantTypeTotal;
						transformedData.push({
							group: migrantType.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
							value: migrantTypeTotal,
							year: year.split('-')[0]
						});
					}
				);
			});
		} else {
			data
				.filter((d) => d.country === selectedCountry)
				.map((d) => {
					Object.keys(d).map((key) => {
						if (typeof d[key] === 'object') {
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
		}

		return transformedData;
	};

	let migrantsBarData: TransformedBarType[] = [];
	let migrantsLineData: TransformedBarType[] = [];

	const transformDataForBar = (data: MigrantsType[]) => {
		let transformedData: TransformedBarType[] = [];

		data.map((d) => {
			let totalMale = 0;
			let totalFemale = 0;

			Object.keys(d).map((key) => {
				if (selectedCountry === 'All' || selectedCountry === '' || selectedCountry === d.country)
					if (typeof d[key] === 'object') {
						if (
							selectedMigrantType === 'All' ||
							selectedMigrantType === '' ||
							selectedMigrantType === key
						) {
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
		selectedCountry;
		migrantsBarData = transformDataForBar(data);
		migrantsLineData = transformDataForLine(data);
	}

	const uniqueYears = data.map((d) => d.year).filter((v, i, a) => a.indexOf(v) === i);
	const uniqueCountries = data.map((d) => d.country).filter((v, i, a) => a.indexOf(v) === i);
	let selectedCountry = '';
	let selectedMigrantType = '';
</script>

<div class="bg-zin grid gap-6 rounded bg-white p-2 shadow md:p-6">
	<!-- toolbar -->
	<div
		class=" flex flex-col justify-between gap-4 lg:flex-row lg:items-end
			"
	>
		<div class="flex flex-col items-start">
			<span class="text-base leading-tight text-zinc-400">Statistics</span>
			<div class="flex items-baseline justify-center gap-6">
				<h4 class="text-lg font-bold leading-7 text-stone-900">{title}</h4>
				<div class="flex gap-3 {chartType === 'bar' ? '' : 'hidden'}">
					<div class="flex items-center">
						<div class="mr-2 h-2.5 w-2.5 rounded-full bg-primary-500"></div>
						<span class="text-xs font-normal leading-none text-neutral-400">Male</span>
					</div>
					<div class="flex items-center">
						<div class="mr-2 h-2.5 w-2.5 rounded-full bg-secondary-500"></div>
						<span class="text-xs font-normal leading-none text-neutral-400">Female</span>
					</div>
				</div>
			</div>
		</div>

		<div class=" flex flex-col gap-3 md:flex-row">
			<div class=" flex flex-col gap-3 md:flex-row">
				<!-- select country -->
				<Select
					placeholder="Select country"
					bind:selectedOption={selectedCountry}
					options={[
						{ value: 'All', label: 'All' },
						...uniqueCountries.map((year) => {
							return {
								value: year,
								label: year
							};
						})
					]}
				/>
				{#if chartType === 'bar'}
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
				{/if}
			</div>
			{#if isSwappable}
				<div
					class=" inline-flex h-10 items-center justify-center gap-3 rounded-lg bg-neutral-100 px-3 py-1.5"
				>
					{#each chartTypes as type (type)}
						<label
							class="group cursor-pointer px-[15px] py-2 transition-colors hover:bg-neutral-200 {chartType ===
							type
								? 'bg-primary-500 hover:!bg-primary-600'
								: ''} flex items-center justify-end gap-2.5 rounded"
						>
							<input type="radio" bind:group={chartType} value={type} class="hidden" />
							<span
								class="text-center transition-colors group-hover:text-black {chartType === type
									? 'text-white group-hover:!text-white'
									: 'text-neutral-800'} text-sm font-medium leading-none"
							>
								{type[0].toUpperCase() + type.slice(1)}
							</span>
						</label>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="h-[0px] w-full border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<svelte:component
				this={lineChart}
				data={migrantsLineData}
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
			<svelte:component
				this={barChart}
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
