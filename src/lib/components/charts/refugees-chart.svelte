<script lang="ts" context="module">
	export type RefugeesType = {
		country: string;
		male: number;
		female: number;
		age_group: any;
		year: any;
		[key: string]: any;
	};
	export type TransformedBarType = {
		group: string;
		value: number;
		age_group: any;
		year: any;
		country: string;
	};
</script>

<script lang="ts">
	import { LineChart, ScaleTypes, PieChart, BarChartGrouped } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	export let title = '';
	export let chartType: 'bar' | 'line' | 'pie' = 'line';
	let chartTypes = ['line', 'bar', 'pie'];
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

	const transformDataForLine = (data: RefugeesType[]): any[] => {
		// calculate the total amount for each country with all age_groups  over the years and return an array of objects with country, year and total amount (male+female)
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
			.filter((x) => x !== undefined);
	};

	let refugeesBarData: TransformedBarType[] = [];
	let refugeesPieData: { group: string; value: number }[] = [];

	const transformDataForBar = (data: RefugeesType[]) => {
		let transformedData: TransformedBarType[] = [];

		data
			.filter((d) => d.year === selectedYear && d.country === selectedCountry)
			.map((d) => {
				transformedData.push({
					group: 'Male',
					value: d.male,
					age_group: d.age_group.split(' ')[1],
					year: d.year,
					country: d.country
				});
				transformedData.push({
					group: 'Female',
					value: d.female,
					age_group: d.age_group.split(' ')[1],
					year: d.year,
					country: d.country
				});
			});

		transformedData.push(
			...transformedData,
			{
				group: 'Male',
				value: transformedData
					.filter((d) => d.group === 'Male')
					.reduce((acc, curr) => acc + curr.value, 0),
				age_group: 'Total',
				year: selectedYear,
				country: selectedCountry
			},
			{
				group: 'Female',
				value: transformedData
					.filter((d) => d.group === 'Female')
					.reduce((acc, curr) => acc + curr.value, 0),
				age_group: 'Total',
				year: selectedYear,
				country: selectedCountry
			}
		);

		return transformedData;
	};

	const transformPieChartData = (data: RefugeesType[]) => {
		let transformedData: { group: string; value: number }[] = [];

		data
			.filter((d) => d.year === selectedYear && d.country === selectedCountry)
			.map((d) => {
				transformedData.push({
					group: d.age_group,
					value: d.male + d.female
				});
			});

		return transformedData;
	};

	$: {
		selectedYear;
		selectedCountry;
		refugeesBarData = transformDataForBar(data);
		refugeesPieData = transformPieChartData(data);
	}

	const uniqueYears = data.map((d) => d.year).filter((v, i, a) => a.indexOf(v) === i);
	const uniqueCountries = data.map((d) => d.country).filter((v, i, a) => a.indexOf(v) === i);
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
			{#if chartType === 'bar' || chartType === 'pie'}
				<div class=" flex gap-3 flex-col md:flex-row">
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
					<!-- select year -->
					<Select
						placeholder="Select country"
						bind:selectedOption={selectedCountry}
						options={[
							...uniqueCountries.map((year) => {
								return {
									value: year,
									label: year
								};
							})
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
							title: 'Total Refugees',
							mapsTo: 'value',
							scaleType: ScaleTypes.LINEAR
						}
					},
					legend: { enabled: true },
					color: {
						scale: {
							Djibouti: '#6880FF',
							Eritrea: '#8BC34A',
							Ethiopia: '#00833F',
							Kenya: '#F4BE49',
							Somalia: '#C34AB7',
							SouthSudan: '#4AC3C3',
							Sudan: ' #9747FF',
							Uganda: '#E74C3C'
						}
					}
				}}
			/>
		{:else if chartType === 'bar'}
			{#key selectedYear}
				<BarChartGrouped
					data={refugeesBarData}
					options={{
						...options,
						axes: {
							bottom: {
								title: 'Age Group',
								mapsTo: 'age_group',
								scaleType: ScaleTypes.LABELS
							},
							left: {
								title: 'Number of Refugees ',
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
			{/key}
		{:else if chartType === 'pie'}
			<PieChart
				data={refugeesPieData}
				options={{
					...options,
					color: {
						scale: {
							'age 0-4': '#6880FF',
							'age 5-11': '#8BC34A',
							'age 12-17': '#00833F',
							'age 18-69': '#F4BE49',
							'age 60+': '#C34AB7'
						}
					},
					legend: { enabled: true, alignment: 'center' },
					pie: {
						alignment: 'center'
					}
				}}
			/>
		{:else}
			<p>Invalid chart type</p>
		{/if}
	</div>
</div>
