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
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	import { onMount, type ComponentType } from 'svelte';
	import { ScaleTypes } from '@carbon/charts-svelte';
	import { type LineChart, type PieChart, type BarChartGrouped } from '@carbon/charts-svelte';
	import { formatNumber, formatNumberWithCommas } from '$lib/utils/format-number.js';

	let lineChart: ComponentType<LineChart>;
	let pieChart: ComponentType<PieChart>;
	let barChart: ComponentType<BarChartGrouped>;

	onMount(async () => {
		const { LineChart, BarChartGrouped, PieChart } = await import('@carbon/charts-svelte');
		lineChart = LineChart;
		pieChart = PieChart;
		barChart = BarChartGrouped;
	});

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

		if (selectedCountry === 'All' || selectedCountry === '') {
			let ageGroups: any = {};
			data
				.filter((d) => d.year === selectedYear)
				.map((d) => {
					if (!ageGroups[d.age_group]) {
						ageGroups[d.age_group] = {
							male: 0,
							female: 0
						};
					}

					ageGroups[d.age_group].male += d.male;
					ageGroups[d.age_group].female += d.female;
				});

			for (let ageGroup in ageGroups) {
				transformedData.push({
					group: 'Male',
					value: ageGroups[ageGroup].male,
					age_group: ageGroup.split(' ')[1],
					year: selectedYear,
					country: 'All'
				});
				transformedData.push({
					group: 'Female',
					value: ageGroups[ageGroup].female,
					age_group: ageGroup.split(' ')[1],
					year: selectedYear,
					country: 'All'
				});
			}
		} else {
			// If selectedCountry is a specific country, then show the data for that country
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
		}

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

		if (selectedCountry === 'All' || selectedCountry === '') {
			let ageGroups: any = {};

			data
				.filter((d) => d.year === selectedYear)
				.map((d) => {
					if (!ageGroups[d.age_group]) {
						ageGroups[d.age_group] = 0;
					}

					ageGroups[d.age_group] += d.male + d.female;
				});

			for (let ageGroup in ageGroups) {
				transformedData.push({
					group: ageGroup,
					value: ageGroups[ageGroup]
				});
			}
		} else {
			data
				.filter((d) => d.year === selectedYear && d.country === selectedCountry)
				.map((d) => {
					transformedData.push({
						group: d.age_group,
						value: d.male + d.female
					});
				});
		}

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
			{#if chartType === 'bar' || chartType === 'pie'}
				<div class=" flex flex-col gap-3 md:flex-row">
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
							{ value: 'All', label: 'All' },
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
					class=" inline-flex h-10 items-center justify-center gap-6 rounded-lg bg-neutral-100 px-3 py-1.5"
				>
					{#each chartTypes as type (type)}
						<label
							class="group cursor-pointer px-[15px] py-2 transition-colors hover:bg-primary-200 {chartType ===
							type
								? 'bg-primary-500 hover:bg-primary-600'
								: ''} flex items-center justify-end gap-2.5 rounded"
						>
							<input type="radio" bind:group={chartType} value={type} class="hidden" />
							<span
								class="text-center transition-colors group-hover:text-black {chartType === type
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
	<div class="h-[0px] w-full border border-stone-200"></div>
	<div class="mt-4">
		{#if chartType === 'line'}
			<svelte:component
				this={lineChart}
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
				<svelte:component
					this={barChart}
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
			<div class="flex flex-col-reverse gap-8 md:flex-row">
				<div class="flex-1">
					<svelte:component
						this={pieChart}
						data={refugeesPieData}
						options={{
							...options,
							color: {
								scale: {
									'age 0-4': '#6880FF',
									'age 5-11': '#8BC34A',
									'age 12-17': '#00833F',
									'age 18-59': '#F4BE49',
									'age 60+': '#C34AB7'
								}
							},
							legend: { enabled: true, alignment: 'center' },
							pie: {
								alignment: 'center'
							}
						}}
					/>
				</div>
				<div class=" flex-1">
					<div class="flex flex-col gap-8">
						<div class="flex items-end justify-between">
							<span class="text-base font-bold text-stone-500">Age Group</span>
							<div class="flex flex-col items-end justify-end gap-1">
								<span class="leading-tight text-stone-500">Total:</span>
								<span class="text-xl font-bold text-stone-900">
									{formatNumberWithCommas(
										refugeesPieData.reduce((acc, curr) => acc + curr.value, 0)
									)}
								</span>
							</div>
						</div>
						<div class="flex flex-col gap-8">
							{#each ['0-4', '5-11', '12-17', '18-59', '60+'] as ageGroup}
								{@const totalForSingleAgeGroup =
									refugeesPieData.find((d) => d.group.split(' ')[1] === ageGroup)?.value || 0}
								{@const total = refugeesPieData.reduce((acc, curr) => acc + curr.value, 0)}
								{@const width = parseFloat(((totalForSingleAgeGroup / total) * 100).toFixed(2))}
								<div class="flex flex-col gap-1">
									<div class="flex justify-between text-xs text-stone-500">
										<span>{ageGroup}</span>
										<span>{formatNumber(totalForSingleAgeGroup)}</span>
									</div>
									<div class="relative">
										<div
											style="width: {isNaN(width) ? 0 : width}%"
											class=" absolute left-0 top-0 z-10 h-4 rounded
												 bg-green-700"
										></div>
										<div class="absolute left-0 top-0 h-4 w-full rounded bg-neutral-100"></div>
									</div>
								</div>
							{/each}
							<div class="flex justify-between text-xs text-stone-500">
								{#each Array.from({ length: 5 }).map((_, i) => i) as section}
									{@const total = refugeesPieData.reduce((acc, curr) => acc + curr.value, 0)}
									{@const diff = total / 5}
									<span>
										{formatNumber(section === 0 ? 0 : section === 4 ? total : section * diff)}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<p>Invalid chart type</p>
		{/if}
	</div>
</div>
