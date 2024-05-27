<script lang="ts" context="module">
	export type RemittanceType = {
		country: string;
		amount: number;
		year: string;
		region: string;
	};
</script>

<script lang="ts">
	import { LineChart, ScaleTypes, HeatmapChart, BarChartSimple } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	export let title = '';
	export let chartType: 'bar' | 'line' | 'heatmap' = 'line';
	let chartTypes = ['line', 'bar', 'heatmap'];
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

	const transformDataForLine = (data: RemittanceType[]) => {
		return data.map((d) => {
			return {
				...d,
				group: d.country
			};
		});
	};

	let remittanceBarData = [];

	const transformDataForBar = (data: RemittanceType[]) => {
		//calculate the total amount for each country over the years and return an array of objects with country and total amount
		// filter the data by year if selectedYear is not 'All'
		if (selectedYear !== 'All') {
			data = data.filter((d) => d.year === selectedYear);
		}
		const countries = data.reduce((acc, curr) => {
			if (acc[curr.country]) {
				acc[curr.country] += curr.amount;
			} else {
				acc[curr.country] = curr.amount;
			}
			return acc;
		}, {});

		return Object.keys(countries).map((country) => {
			return {
				group: country,
				amount: countries[country]
			};
		});
	};

	$: {
		selectedYear, (remittanceBarData = transformDataForBar(data));
	}

	const uniqueYears = data.map((d) => d.year).filter((v, i, a) => a.indexOf(v) === i);
	let selectedYear = 'All';
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
			</div>
		</div>

		<div class=" flex gap-3 flex-col md:flex-row">
			{#if chartType === 'bar'}
				<div class=" flex gap-3 flex-col md:flex-row">
					<!-- select year -->
					<Select
						placeholder="Select year"
						bind:selectedOption={selectedYear}
						options={[
							{ value: 'All', label: 'All' },
							...uniqueYears.map((year) => {
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
							title: 'Annual Remittance',
							mapsTo: 'year',
							scaleType: ScaleTypes.LABELS
						},
						left: {
							title: ' Million US$',
							mapsTo: 'amount',
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
				<BarChartSimple
					data={transformDataForBar(data)}
					options={{
						...options,
						axes: {
							bottom: {
								title: 'Country',
								mapsTo: 'group',
								scaleType: ScaleTypes.LABELS
							},
							left: {
								title: 'Total Remittance (Million US$)',
								mapsTo: 'amount',
								scaleType: ScaleTypes.LINEAR
							}
						},
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
			{/key}
		{:else if chartType === 'heatmap'}
			<HeatmapChart
				data={data.map((d) => {
					return {
						...d,
						value: d.amount
					};
				})}
				options={{
					...options,
					axes: {
						bottom: {
							title: 'Country',
							mapsTo: 'country',
							scaleType: ScaleTypes.LABELS
						},
						left: {
							title: 'year',
							mapsTo: 'year',
							scaleType: ScaleTypes.LABELS
						}
					},
					heatmap: {
						colorLegend: {
							title: 'Remittance (Million US$)',
							type: 'linear'
						},
						divider: {
							state: 'off'
						}
					},
					color: {
						gradient: {
							colors: [
								'#fef9ed',
								'#fdf2db',
								'#fbe5b6',
								'#f8d892',
								'#f6cb6d',
								'#f4be49',
								'#c3983a',
								'#92722c',
								'#624c1d',
								'#31260f'
							]
						}
					},
					legend: { enabled: true }
				}}
			/>
		{:else}
			<p>Invalid chart type</p>
		{/if}
	</div>
</div>
