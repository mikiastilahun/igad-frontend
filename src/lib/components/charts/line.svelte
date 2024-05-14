<script>
	import { LineChart, ScaleTypes } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import Select from '$lib/components/_shared/select/select.svelte';

	export let title = '';

	export let data = [
		{ group: 'Dataset 1', key: 'Jan', value: 100 },
		{ group: 'Dataset 1', key: 'Feb', value: 200 },
		{ group: 'Dataset 1', key: 'Mar', value: 300 },
		{ group: 'Dataset 2', key: 'Jan', value: 400 },
		{ group: 'Dataset 2', key: 'Feb', value: 500 },
		{ group: 'Dataset 2', key: 'Mar', value: 600 }
	];

	export let options = {
		axes: {
			bottom: {
				mapsTo: 'key',
				scaleType: ScaleTypes.LABELS
			},
			left: { mapsTo: 'value', scaleType: ScaleTypes.LINEAR }
		},
		curve: 'curveNatural',
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
				'Dataset 1': '#00833F',
				'Dataset 2': '#F4BE49'
			}
		},
		toolbar: {
			enabled: false
		},
		legend: {
			enabled: false
		}
	};
</script>

<div class="bg-white shadow grid gap-6 p-6 rounded">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<span class="text-zinc-400 text-base leading-tight">Statistics</span>
			<div class="flex gap-6 justify-center items-baseline">
				<h4 class="text-stone-900 text-xl font-bold leading-7">{title}</h4>
				<div class="flex gap-3">
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Total</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-orange-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Female</span>
					</div>
					<div class="flex items-center">
						<div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
						<span class="text-neutral-400 text-xs font-normal leading-none">Male</span>
					</div>
				</div>
			</div>
		</div>

		<div class="flex gap-3">
			<!-- select age group -->
			<Select
				placeholder="Select age group"
				options={[
					{
						value: '18-24',
						label: '18-24'
					}
				]}
			/>
			<!-- select country -->
			<Select
				placeholder="Select country"
				options={[
					{
						value: 'ALL',
						label: 'All Countries'
					}
				]}
			/>
		</div>
	</div>
	<div class="w-full h-[0px] border border-stone-200"></div>
	<div class="mt-4">
		<LineChart {data} {options} />
	</div>
</div>
