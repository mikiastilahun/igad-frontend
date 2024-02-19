<script lang="ts">
	import HeroImg from '$lib/assets/hero-img.png?enhanced';
	import ResettlementIcon from '$lib/assets/icons/resettlement.svg.svelte';
	import TunnelIcon from '$lib/assets/icons/tunnel.svg.svelte';
	import ClimateChangeIcon from '$lib/assets/icons/climate-change.svg.svelte';
	import GenderIcon from '$lib/assets/icons/gender.svg.svelte';
	import SchoolIcon from '$lib/assets/icons/school.svg.svelte';
	import GroupIcon from '$lib/assets/icons/group.svg.svelte';
	import NonDevelopmentIcon from '$lib/assets/icons/non-development.svg.svelte';
	import ShieldIcon from '$lib/assets/icons/shield.svg.svelte';
	import Gender from '$lib/assets/icons/gender.svg.svelte';
</script>

<div class="">
	<!-- hero section -->
	<div class="relative h-screen max-h-[890px] flex items-center">
		<!-- hero-bg -->
		<div class="absolute -z-10 top-0 left-0 bottom-0 w-full">
			<div
				class="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent"
			></div>
			<enhanced:img
				class="absolute -z-20 top-0 left-0 object-cover w-full h-full max-h-[890px]"
				src={HeroImg}
				alt="LumPad 2.0 tablet"
			/>
		</div>
		<!-- hero text -->
		<div class="max-w-7xl mx-auto w-full">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">Migration and Forced Displacement Platform</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>

		<div class=" absolute bottom-0 w-full">
			<div class="max-w-7xl mx-auto text-white pb-10 flex justify-between items-start rounded-lg">
				<div class="flex flex-col gap-1 items-center w-36 justify-center">
					<ResettlementIcon />
					<span class="text-center text-sm">Migration Governance</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<TunnelIcon />
					<span class="text-center text-sm">Free Movement and Labor Mobility</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<SchoolIcon />
					<span class="text-center text-sm">Durable Solutions</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<ClimateChangeIcon />
					<span class="text-center text-sm">Humanity and Mobility Climate Change</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<ShieldIcon />
					<span class="text-center text-sm">Protection</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<NonDevelopmentIcon />
					<span class="text-center text-sm">Migration and Development</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<Gender />
					<span class="text-center text-sm">Gender and Other Cross-cutting issues</span>
				</div>
				<div class="flex flex-col gap-1 items-center w-36">
					<GroupIcon />
					<span class="text-center text-sm">Data and Statistics</span>
				</div>
			</div>
		</div>
	</div>

	<!-- stats -->
	<div class=" bg-primary">
		<div class="px-36 py-8 max-w-7xl mx-auto flex justify-between items-center">
			<div class="flex flex-col items-center gap-1 text-white">
				<h2 class=" text-3xl font-bold">12600</h2>
				<p class="font-semibold text-lg flex flex-col items-center leading-normal">
					<span>Refugees and</span> <span>Asylum seekers</span>
				</p>
			</div>
			<div class="flex flex-col items-center gap-1 text-white">
				<h2 class="text-3xl font-bold">550,000</h2>
				<p class="font-semibold text-lg flex flex-col items-center leading-normal">
					<span>Internally displaced</span> <span>population (IDP)</span>
				</p>
			</div>
			<div class="flex flex-col items-center gap-1 text-white">
				<h2 class="text-3xl font-bold">50,000</h2>
				<p class="font-semibold text-lg">Total Migrants</p>
			</div>
			<div class="flex flex-col items-center gap-1 text-white">
				<h2 class="text-3xl font-bold">280M+</h2>
				<p class="font-semibold text-lg">Population in Region</p>
			</div>
		</div>
	</div>
</div>
