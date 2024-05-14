<script lang="ts">
	import Hero from '$lib/assets/statistics/hero.png';
	import Map from '$lib/components/leaflet/map.svelte';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Search from '$lib/assets/icons/search.svg.svelte';
	import Select from 'svelte-select';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	import IGADLogo from '$lib/assets/igad-logo.png';
	import Pie from '$lib/components/charts/pie.svelte';
</script>

<div class="md:p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={Hero}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">Data and Statistics</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</section>
</div>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-8 md:px-4">
	<h2 class="text-2xl font-bold leading-normal">Population</h2>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<div class="pt-8">
		<Map />
	</div>
</section>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-8 md:px-4">
	<!-- Line, area, pie and bar charts -->
	<Pie />
</section>
