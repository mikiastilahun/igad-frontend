<script lang="ts" context="module">
	export type PopulationType = {
		id: string;
		year: string;
		age_group: string;
		male: number;
		female: number;
		country: string;
		[key: string]: any;
	};
	export type TransformedBarType = {
		group: string;
		value: number;
		year: any;
	};
</script>

<script lang="ts">
	import { LineChart, ScaleTypes, BarChartGrouped, BarChartStacked } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';
	import type { PopulationPerCountryStats } from '../../../routes/statistics/proxy+page.server.js';

	export let title = '';
	export let chartType: 'bar' | 'line' = 'line';
	let chartTypes = ['line', 'bar'];
	export let isSwappable = false;

	export let data: any[] = [];
	export let externalData: PopulationPerCountryStats['data']['attributes'] | undefined = undefined;

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

	const transformDataForLine = (data: PopulationType[]): Record<string, any>[] => {
		const countries = data.reduce((acc, curr) => {
			if (!acc[curr.country]) {
				acc[curr.country] = {};
			}
			if (!acc[curr.country][curr.year]) {
				acc[curr.country][curr.year] = 0;
			}
			acc[curr.country][curr.year] += curr.male + curr.female;
			return acc;
		});

		return Object.keys(countries)
			.map((country) => {
				const countryData = countries[country];

				if (typeof countryData === 'object') {
					return Object.keys(countryData).map((year) => {
						return {
							group: country,
							year: year,
							value: countryData[year]
						};
					});
				}
			})
			.flat()
			.filter((x) => x !== undefined) as TransformedBarType[];
	};

	let populationBarData: TransformedBarType[] = [];

	const transformDataForBar = () => {
		let transformedData: any[] = [];

		const selectedCountryData = externalData?.[selectedCountry];

		selectedCountryData
			?.filter((d: PopulationType) => d.year.split('-')[0] === selectedYear)
			.map((d: PopulationType) => {
				transformedData.push({
					group: 'Male',
					key: d.age_group.split(' ')[1],
					value: d.male,
					country: selectedCountry
				});
				transformedData.push({
					group: 'Female',
					key: d.age_group.split(' ')[1],
					value: d.female,
					country: selectedCountry
				});
			});

		transformedData.push({
			group: 'Male',
			key: 'Total',
			value: transformedData
				.filter((p) => p.group === 'Male')
				.reduce((acc, curr) => acc + curr.value, 0),
			country: selectedCountry
		});
		transformedData.push({
			group: 'Female',
			key: 'Total',
			value: transformedData
				.filter((p) => p.group === 'Female')
				.reduce((acc, curr) => acc + curr.value, 0),
			country: selectedCountry
		});

		return transformedData;
	};

	$: {
		selectedCountry;
		selectedYear;
		populationBarData = transformDataForBar();
	}

	const uniqueYears = data.map((d) => d.year).filter((v, i, a) => a.indexOf(v) === i);
	const uniqueCountries = data.map((d) => d.country).filter((v, i, a) => a.indexOf(v) === i);
	const uniqueAgeGroups = data.map((d) => d.age_group).filter((v, i, a) => a.indexOf(v) === i);
	let selectedYear = uniqueYears[0];
	let selectedCountry = uniqueCountries[0];
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
			<div class=" flex gap-3 flex-col md:flex-row">
				<!-- select migrant type -->
				{#if chartType === 'bar'}
					<Select
						placeholder="Select country"
						bind:selectedOption={selectedCountry}
						options={[
							...uniqueCountries.map((country) => {
								return {
									value: country,
									label: country === 'SouthSudan' ? 'South Sudan' : country
								};
							})
						]}
					/>
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
			</div>
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
							title: 'Population',
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
			<BarChartStacked
				data={populationBarData}
				options={{
					...options,
					axes: {
						bottom: {
							title: 'Age Group',
							mapsTo: 'key',
							scaleType: ScaleTypes.LABELS
						},
						left: {
							title: 'Population',
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
