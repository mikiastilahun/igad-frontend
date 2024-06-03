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
	import { formatNumber } from '$lib/utils/format-number.js';

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
				{#if chartType === 'bar' || chartType === 'pie'}
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
			<div class="flex gap-8 flex-col-reverse md:flex-row">
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
						<div class="flex justify-between items-end">
							<span class="text-stone-500 text-base font-bold">Age Group</span>
							<div class="flex gap-1 flex-col justify-end items-end">
								<span class="leading-tight text-stone-500">Total:</span>
								<span class="text-stone-900 text-xl font-bold">
									{populationPieData.reduce((acc, curr) => acc + curr.value, 0)}
								</span>
							</div>
						</div>
						<div class="flex flex-col gap-8">
							{#each ['0-14', '15-19', '20-29', '30-59', '60+'] as ageGroup}
								{@const totalForSingleAgeGroup =
									populationPieData.find((d) => d.group === ageGroup)?.value || 0}
								{@const total = populationPieData.reduce((acc, curr) => acc + curr.value, 0)}
								<div class="flex flex-col gap-1">
									<div class="flex justify-between text-stone-500 text-xs">
										<span>{ageGroup}</span>
										<span>{formatNumber(totalForSingleAgeGroup)}</span>
									</div>
									<div class="relative">
										<div
											style="width: {((totalForSingleAgeGroup / total) * 100).toFixed(2)}%"
											class="absolute top-0 left-0 z-10 h-4 bg-green-700
												 rounded"
										></div>
										<div class="absolute top-0 left-0 w-full h-4 bg-neutral-100 rounded"></div>
									</div>
								</div>
							{/each}
							<div class="flex justify-between text-stone-500 text-xs">
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
