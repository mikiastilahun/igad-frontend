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

	import NewsImg2 from '$lib/assets/temp/news-2.png?enhanced';
	import ChartsImg from '$lib/assets/temp/charts.png?enhanced';
	import FeaturedNewsCard from '$lib/components/_shared/featured-news-card/featured-news-card.svelte';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Logoipsum from '$lib/assets/temp/logoipsum.svg.svelte';
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
				alt="alt text"
			/>
		</div>
		<!-- hero text -->
		<div class="max-w-[1136px] mx-auto w-full">
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
			<div
				class="max-w-[1136px] mx-auto text-white pb-10 flex justify-between items-start rounded-lg"
			>
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
					<GenderIcon />
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
		<div class="px-36 py-8 max-w-[1136px] mx-auto flex justify-between items-center">
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

	<!-- Regional Statistics -->
	<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">Regional Statistics</h2>
		<p class="text-base leading-normal">
			Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
			phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
			Sodales pulvinar facilisi donec facilisis lorem lectus. Nec feugiat pharetra diam faucibus
			felis aliquam lectus nibh. Praesent mauris eget sollicitudin donec neque risus interdum
			pellentesque aliquam. Vitae eu duis vel nunc ullamcorper. Vehicula eu mi nisl massa. Lectus
			quam sit sit senectus vitae ante eget. Donec ut nunc velit in. Aliquam non proin vitae ac.
		</p>
		<enhanced:img class=" object-cover w-full h-full" src={ChartsImg} alt="alt text" />
	</div>
	<!-- IGAD support platform -->
	<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">IGAD Support Platform</h2>
		<p class="text-base leading-normal">
			Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
			phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
			Sodales pulvinar facilisi donec facilisis lorem lectus. Nec feugiat pharetra diam faucibus
			felis aliquam lectus nibh. Praesent mauris eget sollicitudin donec neque risus interdum
			pellentesque aliquam. Vitae eu duis vel nunc ullamcorper. Vehicula eu mi nisl massa. Lectus
			quam sit sit senectus vitae ante eget. Donec ut nunc velit in. Aliquam non proin vitae ac.
		</p>
		<p class="text-base leading-normal">
			Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
			phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
			Sodales pulvinar facilisi donec facilisis lorem lectus. Nec feugiat pharetra diam faucibus
			felis aliquam lectus nibh. Praesent mauris eget sollicitudin donec neque risus interdum
			pellentesque aliquam. Vitae eu duis vel nunc ullamcorper. Vehicula eu mi nisl massa. Lectus
			quam sit sit senectus vitae ante eget. Donec ut nunc velit in. Aliquam non proin vitae ac.
		</p>
	</div>

	<!-- Quick Learning Links -->
	<div class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">Quick Learning Links</h2>
		<div class="grid grid-cols-4 gap-4">
			<!-- cards -->
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	</div>

	<!-- news section -->
	<div class="max-w-[1136px] mx-auto py-10">
		<div class=" flex items-start gap-16 w-full">
			<!-- news -->
			<div class="flex flex-col gap-5 justify-center items-start">
				<h2 class="text-2xl font-bold">News and Updates</h2>
				<!-- news card -->
				<div class="flex flex-col gap-5">
					<FeaturedNewsCard />
					<FeaturedNewsCard />
					<FeaturedNewsCard />
				</div>
			</div>
			<!-- featured -->
			<div class="relative">
				<div class="absolute top-0 left-0 h-full w-full bg-black opacity-60 rounded-md"></div>
				<enhanced:img class="object-cover rounded-md" src={NewsImg2} alt="alt text" />
				<div class="absolute bottom-0 px-8 pb-8 text-white">
					<span class="text-base leading-normal">Debits - 03 June, 2023</span>
					<h3 class="text-3xl font-bold leading-normal">LOREM IMPUSM DOLOR SIA EMET IPSUM LOREM</h3>
				</div>
			</div>
		</div>
	</div>

	<!-- Partners -->
	<div class="mx-auto max-w-[1136px]">
		<div class="w-full py-20 flex-col justify-start items-center gap-10 inline-flex">
			<h5 class="text-neutral-400 text-base font-bold text-lg">Our Partners</h5>
			<div class="w-full grid grid-cols-4 gap-4">
				<div class="flex justify-center">
					<Logoipsum />
				</div>
				<div class="flex justify-center">
					<Logoipsum />
				</div>
				<div class="flex justify-center">
					<Logoipsum />
				</div>
				<div class="flex justify-center">
					<Logoipsum />
				</div>
			</div>
		</div>
	</div>
</div>
