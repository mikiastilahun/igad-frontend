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
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import { fly, crossfade, slide } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let data;

	const home = data.data?.data.attributes;

	let scrollContainer: HTMLElement;
	let direction = 1;

	onMount(() => {
		if (scrollContainer && scrollContainer.firstChild) {
			const imageWidth = (scrollContainer.firstChild as HTMLElement).offsetWidth;
			setInterval(() => {
				if (
					scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
					scrollContainer.scrollWidth
				) {
					direction = -1;
				} else if (scrollContainer.scrollLeft === 0) {
					direction = 1;
				}

				scrollContainer.scrollBy({ left: imageWidth * direction, behavior: 'smooth' });
			}, 5000);
		}
	});
</script>

<div class="">
	<!-- hero section -->
	<section class="relative h-screen max-h-[890px] flex items-center">
		<div
			bind:this={scrollContainer}
			class="absolute top-0 left-0 bottom-0 hide-scroll flex h-full w-full transform-gpu snap-x snap-mandatory overflow-x-scroll scroll-smooth"
		>
			{#if home?.homeHeroSection.length !== 0}
				{#each home?.homeHeroSection ?? [] as hero}
					{@const imageUrl = hero?.BackgroundImage.data?.attributes?.url}
					<div class="snap-center min-w-full relative">
						<img
							class="object-cover w-full h-full max-h-[890px]"
							alt={`${hero?.heroTitle}`}
							src={imageUrl ? `${PUBLIC_STATIC_URL}${imageUrl}` : HeroImg}
						/>
						<div
							class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent"
						></div>
						{#key hero.id}
							<div
								class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1136px] mx-auto w-full"
							>
								<div
									transition:slide={{
										axis: 'x',
										duration: 500,
										easing: sineIn
									}}
									class="text-white max-w-2xl"
								>
									<h1 class="text-3xl font-bold mb-2">{hero?.heroTitle}</h1>
									<p class=" text-base font-normal leading-normal">
										{hero?.heroDescription}
									</p>
								</div>
							</div>
						{/key}
					</div>
				{/each}
			{/if}
		</div>

		<div class=" absolute bottom-0 w-full">
			<div
				class="max-w-[1136px] mx-auto text-white pb-10 flex justify-between items-start rounded-lg"
			>
				{#if home?.priorityAreas.length !== 0}
					{#each home?.priorityAreas ?? [] as area}
						<div
							class=" relative group flex flex-col gap-1 items-center w-36 justify-center text-center"
						>
							<img
								class=""
								src={`${PUBLIC_STATIC_URL}${area.icon.data[0].attributes.url}`}
								alt="alt text"
							/>
							<span class="text-center text-sm">{area.title} </span>

							<div
								class="opacity-0 w-full bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full mb-2 px-2 pointer-events-none"
							>
								{area.title}
								<!-- <a class="underline" href="https://geonode.igad.int/">Read more here</a> -->
								<svg
									class="absolute text-black h-2 w-full left-0 top-full"
									x="0px"
									y="0px"
									viewBox="0 0 255 255"
									xml:space="preserve"
									><polygon class="fill-current" points="0,0 127.5,127.5 255,0" /></svg
								>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</section>
	<!--  -->

	<!-- stats -->
	<section class=" bg-primary">
		<div class="px-4 lg:px-0 py-8 max-w-[1136px] mx-auto flex justify-between items-center">
			{#if home?.firstStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.firstStat.value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.firstStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.secondStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.secondStat.value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.secondStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.thirdStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.thirdStat[0].value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.thirdStat[0].label}</span>
					</p>
				</div>
			{/if}
			{#if home?.forthStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.forthStat[0].value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.forthStat[0].label}</span>
					</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Regional Statistics -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
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
	</section>
	<!-- IGAD support platform -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
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
	</section>

	<!-- Quick Learning Links -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">Quick Learning Links</h2>
		<div class="grid grid-cols-4 gap-4">
			<!-- cards -->
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	</section>

	<!-- news section -->
	<section class="max-w-[1136px] mx-auto py-10">
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
	</section>

	<!-- Partners -->
	<section class="mx-auto max-w-[1136px]">
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
	</section>
</div>

<style>
	.tooltip::before {
		@apply content-[''] absolute top-[-10px] left-1/2 transform -translate-x-1/2 border-t-2 border-transparent border-b-2 border-white;
	}

	.tooltip:hover .tooltip-content {
		opacity: 1;
	}

	.hide-scroll {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
