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
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';
	import type {
		AgeGroup,
		PopulationPerCountryStats
	} from '../../../routes/statistics/proxy+page.server.js';
	import { formatNumber, formatNumberWithCommas } from '$lib/utils/format-number.js';

	import { onMount, type ComponentType } from 'svelte';
	import { ScaleTypes } from '@carbon/charts-svelte';
	import { type LineChart, type BarChartStacked, type PieChart } from '@carbon/charts-svelte';

	let lineChart: ComponentType<LineChart>;
	let barChart: ComponentType<BarChartStacked>;
	let pieChart: ComponentType<PieChart>;

	onMount(async () => {
		const { LineChart, BarChartStacked, PieChart } = await import('@carbon/charts-svelte');
		lineChart = LineChart;
		barChart = BarChartStacked;
		pieChart = PieChart;
	});

	export let title = '';
	export let chartType: 'bar' | 'line' | 'pie' = 'line';
	let chartTypes = ['line', 'bar', 'pie'];
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
	let populationPieData: { group: string; value: number }[] = [];

	const transformDataForBar = () => {
		let transformedData: any[] = [];

		if (selectedCountry === 'All' || selectedCountry === '') {
			let ageGroups: any = {};

			for (let country in externalData) {
				if (Array.isArray(externalData[country])) {
					externalData[country]
						.filter((d: PopulationType) => d.year.split('-')[0] === selectedYear)
						.map((d: PopulationType) => {
							if (!ageGroups[d.age_group]) {
								ageGroups[d.age_group] = {
									male: 0,
									female: 0
								};
							}

							ageGroups[d.age_group].male += d.male;
							ageGroups[d.age_group].female += d.female;
						});
				}
			}
			for (let ageGroup in ageGroups) {
				transformedData.push({
					group: 'Male',
					key: ageGroup.split(' ')[1],
					value: ageGroups[ageGroup].male,
					country: 'All'
				});
				transformedData.push({
					group: 'Female',
					key: ageGroup.split(' ')[1],
					value: ageGroups[ageGroup].female,
					country: 'All'
				});
			}
		} else {
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
		}

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

	const mapAgeGroupToCategory = (ageGroup: AgeGroup) => {
		const age = parseInt(ageGroup.split(' ')[1].split('-')[1]);

		if (age <= 14) {
			return '0-14';
		} else if (age <= 19) {
			return '15-19';
		} else if (age <= 29) {
			return '20-29';
		} else if (age <= 59) {
			return '30-59';
		} else {
			return '60+';
		}
	};

	const transformPieChartData = (data: PopulationType[]) => {
		let transformedData: { group: string; value: number }[] = [];

		// If selectedCountry is 'All' or '', then show all countries data
		if (selectedCountry === 'All' || selectedCountry === '') {
			let ageGroups: any = {};

			data
				.filter((d) => d.year === selectedYear)
				.map((d) => {
					let ageCategory = mapAgeGroupToCategory(d.age_group as AgeGroup);

					if (!ageGroups[ageCategory]) {
						ageGroups[ageCategory] = 0;
					}

					ageGroups[ageCategory] += d.male + d.female;
				});

			for (let ageGroup in ageGroups) {
				transformedData.push({
					group: ageGroup,
					value: ageGroups[ageGroup]
				});
			}
		} else {
			// If selectedCountry is a specific country, then show the data for that country
			data
				.filter((d) => d.year === selectedYear && d.country === selectedCountry)
				.map((d) => {
					let ageCategory = mapAgeGroupToCategory(d.age_group as AgeGroup);

					const existingData = transformedData.find((item) => item.group === ageCategory);
					if (existingData) {
						existingData.value += d.male + d.female;
					} else {
						transformedData.push({
							group: ageCategory,
							value: d.male + d.female
						});
					}
				});
		}

		return transformedData;
	};

	$: {
		selectedCountry;
		selectedYear;
		populationBarData = transformDataForBar();
		populationPieData = transformPieChartData(data);
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
			<div class=" flex flex-col gap-3 md:flex-row">
				<!-- select migrant type -->
				{#if chartType === 'bar' || chartType === 'pie'}
					<Select
						placeholder="Select country"
						bind:selectedOption={selectedCountry}
						options={[
							{ value: 'All', label: 'All' },
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
			<svelte:component
				this={barChart}
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
		{:else if chartType === 'pie'}
			<div class="flex flex-col-reverse gap-8 md:flex-row">
				<div class="flex-1">
					<svelte:component
						this={pieChart}
						data={populationPieData}
						options={{
							...options,
							color: {
								scale: {
									'0-14': '#F4BE49',
									'15-19': '#8BC34A',
									'20-29': '#6880FF',
									'30-59': '#E74C3C',
									'60+': '#ADFF2F'
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
										populationPieData.reduce((acc, curr) => acc + curr.value, 0)
									)}
								</span>
							</div>
						</div>
						<div class="flex flex-col gap-8">
							{#each ['0-14', '15-19', '20-29', '30-59', '60+'] as ageGroup}
								{@const totalForSingleAgeGroup =
									populationPieData.find((d) => d.group === ageGroup)?.value || 0}
								{@const total = populationPieData.reduce((acc, curr) => acc + curr.value, 0)}
								{@const width = parseFloat(((totalForSingleAgeGroup / total) * 100).toFixed(2))}
								<div class="flex flex-col gap-1">
									<div class="flex justify-between text-xs text-stone-500">
										<span>{ageGroup}</span>
										<span>{formatNumber(totalForSingleAgeGroup)}</span>
									</div>
									<div class="relative">
										<div
											style="width: {isNaN(width) ? 0 : width}%"
											class="absolute left-0 top-0 z-10 h-4 rounded
												 bg-green-700"
										></div>
										<div class="absolute left-0 top-0 h-4 w-full rounded bg-neutral-100"></div>
									</div>
								</div>
							{/each}
							<div class="flex justify-between text-xs text-stone-500">
								{#each Array.from({ length: 5 }).map((_, i) => i) as section}
									{@const total = populationPieData.reduce((acc, curr) => acc + curr.value, 0)}
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
