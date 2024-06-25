<script lang="ts" context="module">
	export type RemittanceType = {
		country: string;
		amount: number;
		year: string;
		region: string;
		[key: string]: any;
	};
</script>

<script lang="ts">
	import Select from '$lib/components/_shared/select/select.svelte';
	import '@carbon/charts-svelte/styles.css';

	import { onMount, type ComponentType } from 'svelte';
	import { ScaleTypes } from '@carbon/charts-svelte';
	import { type BarChartSimple, type HeatmapChart, type LineChart } from '@carbon/charts-svelte';

	let lineChart: ComponentType<LineChart>;
	let barChart: ComponentType<BarChartSimple>;
	let heatmapChart: ComponentType<HeatmapChart>;

	onMount(async () => {
		const { BarChartSimple, HeatmapChart, LineChart } = await import('@carbon/charts-svelte');
		barChart = BarChartSimple;
		heatmapChart = HeatmapChart;
		lineChart = LineChart;
	});

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

	const transformDataForBar = (data: RemittanceType[]): Record<string, any>[] => {
		if (selectedYear !== 'All') {
			data = data.filter((d) => d.year === selectedYear);
		}
		let countries: Record<string, number> = {};
		data.forEach((d) => {
			if (countries[d.country]) {
				countries[d.country] += d.amount;
			} else {
				countries[d.country] = d.amount;
			}
		});

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
			</div>
		</div>

		<div class=" flex flex-col gap-3 md:flex-row">
			{#if chartType === 'bar'}
				<div class=" flex flex-col gap-3 md:flex-row">
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
				<svelte:component
					this={barChart}
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
			<svelte:component
				this={heatmapChart}
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
							// state: 'off'
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
