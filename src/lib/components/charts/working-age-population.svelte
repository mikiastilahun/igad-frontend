<script lang="ts" context="module">
	export type PopulationType = {
		id: string;
		year: string;
		male: number;
		female: number;
		country: string;
		male15plus: number;
		female15plus: number;
		[key: string]: any;
	};
	export type TransformedBarType = {
		group: string;
		value: number;
		year: string;
	};
</script>

<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	import { onMount, type ComponentType } from 'svelte';
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';
	import { type LineChart, type PieChart } from '@carbon/charts-svelte';

	let lineChart: ComponentType<LineChart>;
	let barChart: ComponentType<BarChartGrouped>;
	let pieChart: ComponentType<PieChart>;

	onMount(async () => {
		const { LineChart, BarChartGrouped, PieChart } = await import('@carbon/charts-svelte');
		lineChart = LineChart;
		barChart = BarChartGrouped;
		pieChart = PieChart;
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

	const transformDataForLine = (data: PopulationType[]): Record<string, any>[] => {
		let countries: Record<string, Record<string, number>> = {};
		data.reduce((acc, curr) => {
			if (!acc[curr.country]) {
				acc[curr.country] = {};
			}
			if (!acc[curr.country][curr.year]) {
				acc[curr.country][curr.year] = 0;
			}
			switch (selectedGender) {
				case 'All':
					acc[curr.country][curr.year] +=
						Number(curr.male15plus || 0) + Number(curr.female15plus || 0);
					break;
				case 'Male':
					acc[curr.country][curr.year] += Number(curr.male15plus || 0);
					break;
				case 'Female':
					acc[curr.country][curr.year] += Number(curr.female15plus || 0);
					break;
			}
			return acc;
		}, countries);

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

	const transformDataForBar = (data: PopulationType[]) => {
		let transformedData: TransformedBarType[] = [];

		data.map((d) => {
			let totalMale15Plus = 0;
			let totalFemale15Plus = 0;

			if (selectedCountry === 'All' || selectedCountry === '' || selectedCountry === d.country) {
				totalMale15Plus += Number(d.male15plus || 0);
				totalFemale15Plus += Number(d.female15plus || 0);
			}

			transformedData.push({
				group: 'Male',
				value: totalMale15Plus,
				year: d.year.split('-')[0]
			});
			transformedData.push({
				group: 'Female',
				value: totalFemale15Plus,
				year: d.year.split('-')[0]
			});
		});

		return transformedData;
	};

	let populationBarData: TransformedBarType[] = [];
	let populationLineData: Record<string, any>[] = [];

	$: {
		selectedCountry;
		populationBarData = transformDataForBar(data);
	}
	$: {
		selectedGender;
		populationLineData = transformDataForLine(data);
	}

	const uniqueCountries = data.map((d) => d.country).filter((v, i, a) => a.indexOf(v) === i);
	let selectedCountry = '';
	let selectedGender: 'All' | 'Female' | 'Male' = 'All';

	$: console.log({ populationBarData });
</script>

<div class="grid gap-6 rounded rounded-t-none bg-white p-2 shadow md:p-6">
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
				{#if chartType === 'bar'}
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
				{/if}
				{#if chartType === 'line'}
					<Select
						placeholder="Select Gender"
						bind:selectedOption={selectedGender}
						options={[
							{ value: 'All', label: 'All' },
							{ value: 'Female', label: 'Female' },
							{ value: 'Male', label: 'Male' }
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
				data={populationLineData}
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
						left: {
							title: 'Working Age Population',
							mapsTo: 'value',
							scaleType: ScaleTypes.LINEAR
						},
						bottom: {
							title: 'Year',
							mapsTo: 'year',
							scaleType: ScaleTypes.LABELS
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
