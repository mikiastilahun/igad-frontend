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
	import SvelteMarkdown from 'svelte-markdown';

	import NewsImg2 from '$lib/assets/temp/news-2.png?enhanced';
	import ChartsImg from '$lib/assets/temp/charts.png?enhanced';
	import FeaturedNewsCard from '$lib/components/_shared/featured-news-card/featured-news-card.svelte';
	import Card from '$lib/components/_shared/card/card.svelte';
	import Logoipsum from '$lib/assets/temp/logoipsum.svg.svelte';
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import { fly, crossfade, slide } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';
	import CaretDown from '$lib/assets/icons/caret-down.svg.svelte';
	import Registration from '$lib/components/registration/registration.svelte';

	export let data;

	const home = data.data?.homeData.data.attributes;
	const learningLinks = data.data?.learningData.data;
	const news = data.data?.newsData.data;

	console.log({ news });

	let scrollContainer: HTMLElement;
	let direction = 1;

	onMount(() => {
		// if (scrollContainer && scrollContainer.firstChild) {
		// 	const imageWidth = (scrollContainer.firstChild as HTMLElement).offsetWidth;
		// 	setInterval(() => {
		// 		if (
		// 			scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
		// 			scrollContainer.scrollWidth
		// 		) {
		// 			direction = -1;
		// 		} else if (scrollContainer.scrollLeft === 0) {
		// 			direction = 1;
		// 		}
		// 		scrollContainer.scrollBy({ left: imageWidth * direction, behavior: 'smooth' });
		// 	}, 5000);
		// }
	});
	const scrollAmount = 500;
	function scrollLeft() {
		if (scrollContainer.scrollLeft === 0) {
			scrollContainer.scrollLeft = scrollContainer.scrollWidth;
		} else {
			scrollContainer.scrollLeft -= scrollContainer.clientWidth;
		}
	}

	function scrollRight() {
		if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
			scrollContainer.scrollLeft = 0;
		} else {
			scrollContainer.scrollLeft += scrollContainer.clientWidth;
		}
	}

	let showRegister = false;
</script>

<div class="">
	<!-- hero section -->
	<section class="relative h-[1000px] md:h-screen md:max-h-[890px] flex items-center">
		<div class=" absolute top-0 left-0 bottom-0">
			<div
				bind:this={scrollContainer}
				class="hide-scroll flex h-full w-full transform-gpu snap-x snap-mandatory overflow-x-scroll scroll-smooth"
			>
				{#if home?.homeHeroSection.length !== 0}
					{#each home?.homeHeroSection ?? [] as hero}
						{@const imageUrl = hero?.BackgroundImage.data?.attributes?.url}
						<div class="snap-center min-w-full relative">
							<img
								class="object-cover w-full h-full md:max-h-[890px]"
								alt={`${hero?.heroTitle}`}
								src={imageUrl ? `${PUBLIC_STATIC_URL}${imageUrl}` : HeroImg}
							/>
							<div
								class=" absolute top-0 left-0 w-full h-full md:bg-gradient-to-r bg-gradient-to-t from-black/80 from-55% md:from-50% to-transparent"
							></div>

							{#key hero.id}
								<div
									class=" absolute top-[40%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1136px] mx-auto w-full px-8 md:px-4 flex justify-center md:justify-start items-center gap-4"
								>
									<div
										transition:slide={{
											axis: 'x',
											duration: 500,
											easing: sineIn
										}}
										class="text-white max-w-2xl"
									>
										<h1 class="text-2xl md:text-3xl font-bold mb-2">
											{hero?.heroTitle}
										</h1>
										<p class=" text-base md:text-base font-normal leading-normal">
											{hero?.heroDescription}
										</p>
									</div>
								</div>
							{/key}
						</div>
					{/each}
				{/if}
			</div>
			<!-- <button
				on:click={scrollLeft}
				class="group p-2 absolute left-0 md:left-8 top-[30%] sm:top-1/2 transform -translate-y-1/2"
			>
				<span
					class="group-hover:opacity-100 block opacity-0 transition-all duration-150 inset-0 absolute rounded-full group-hover:animate-pulse w-full h-full bg-gray-50/25"
				></span>
				<CaretDown class="w-6 h-6 scale-150 rotate-90 fill-white" />
			</button>
			<button
				on:click={scrollRight}
				class=" group p-2 absolute right-0 md:right-8 top-[30%] sm:top-1/2 transform -translate-y-1/2"
			>
				<span
					class="group-hover:opacity-100 block opacity-0 transition-all duration-150 inset-0 absolute rounded-full group-hover:animate-pulse w-full h-full bg-gray-50/25"
				></span>
				<CaretDown class="w-6 h-6 scale-150 -rotate-90 fill-white " /></button
			> -->
		</div>

		<div class=" absolute bottom-0 w-full">
			<div
				class="max-w-[1136px] mx-auto text-white pb-8 sm:pb-16 md:pb-10 grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center md:flex justify-between items-start rounded-lg px-8 md:px-4"
			>
				{#if home?.priorityAreas.length !== 0}
					{#each home?.priorityAreas ?? [] as area}
						<div
							class="  relative group flex flex-col gap-1 items-center w-36 justify-center text-center"
						>
							<img
								class=""
								src={`${PUBLIC_STATIC_URL}${area.icon.data[0].attributes.url}`}
								alt="alt text"
							/>
							<span class="text-center text-xs md:text-sm">{area.title} </span>

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
					<h2 class=" text-3xl font-bold">{home.thirdStat.value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.thirdStat?.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.forthStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.forthStat.value}</h2>
					<p class="font-semibold text-lg flex flex-col items-center leading-normal">
						<span>{home.forthStat.label}</span>
					</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Regional Statistics -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">{home?.regionalStatisticsTitle}</h2>
		<p class="text-base leading-normal">
			{home?.regionalStatisticsDescription}
		</p>
		<enhanced:img class=" object-cover w-full h-full" src={ChartsImg} alt="alt text" />
	</section>
	<!-- IGAD support platform -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">{home?.SupportplatformTitle}</h2>
		<p class="text-base leading-normal">
			<SvelteMarkdown source={home?.supportPlatformContent} />
		</p>
	</section>

	<!-- Quick Learning Links -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3">
		<h2 class="text-2xl font-bold leading-normal">Quick Learning Links</h2>
		<div class="grid grid-cols-4 gap-4">
			<!-- cards -->
			{#if learningLinks?.length !== 0}
				{#each learningLinks ?? [] as link}
					<Card
						title={link.attributes.title}
						description={link.attributes.description}
						imageUrl={`${PUBLIC_STATIC_URL}${link.attributes.thumbnail.data.attributes.url}`}
						link={link.attributes.URL}
					/>
				{/each}
			{/if}

			<!-- register here button with an image behind on a blurry overlay with a rectangle button on top -->
			<div class="relative h-full rounded-lg">
				<div
					class="rounded-lg absolute top-0 left-0 w-full h-full flex justify-center items-center"
				>
					<div
						class="rounded-lg bg-black/80 p-8 h-full gap-2 flex justify-center items-center flex-col"
					>
						<h3 class="text-3xl font-bold text-white">Register Here</h3>
						<p class="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						<button
							on:click={() => (showRegister = true)}
							class="mt-4 bg-primary text-white px-4 py-2 rounded-md">Register Here</button
						>
					</div>
				</div>
				<enhanced:img class="object-cover w-full h-full rounded-lg" src={HeroImg} alt="alt text" />
			</div>
		</div>
	</section>

	{#if showRegister}
		<Registration bind:show={showRegister} />
	{/if}

	<!-- news section -->
	<section class="max-w-[1136px] mx-auto py-10">
		<div class=" flex gap-16 w-full items-stretch">
			<!-- news -->
			<div class="flex flex-col gap-5 justify-center items-start">
				<h2 class="text-2xl font-bold">News and Updates</h2>
				<!-- news card -->
				<div class="flex flex-col gap-5">
					{#if news?.length !== 0}
						{#each news?.slice(1, 4) ?? [] as newsItem}
							<FeaturedNewsCard
								title={newsItem.attributes.title}
								content={newsItem.attributes.content}
								date={newsItem.attributes.date}
								imgSrc={`${PUBLIC_STATIC_URL}${newsItem.attributes.thumbnail.data.attributes.url}`}
								id={newsItem.id}
							/>
						{/each}
					{/if}
				</div>

				<a href="/news" class="mt-4 bg-primary text-white px-4 py-2 rounded-md">Read More</a>
			</div>
			<!-- featured -->
			<div class="flex-1 relative hover:cursor-pointer">
				<div class="absolute top-0 left-0 h-full w-full bg-black opacity-60 rounded-md"></div>
				<enhanced:img
					class="object-cover rounded-md h-full"
					src={news?.[0].attributes.thumbnail.data.attributes.url
						? `${PUBLIC_STATIC_URL}${news?.[0].attributes.thumbnail.data.attributes.url}`
						: NewsImg2}
					alt="alt text"
				/>
				<div class="absolute bottom-0 px-8 pb-8 text-white">
					<span class="text-base leading-normal">Debits - 03 June, 2023</span>
					<h3 class="text-3xl font-bold leading-normal">{news?.[0].attributes.title}</h3>
				</div>
			</div>
		</div>
	</section>

	<!-- Partners -->
	<section class="mx-auto max-w-[1136px]">
		<div class="w-full py-20 flex-col justify-start items-center gap-10 inline-flex">
			<h5 class="text-neutral-400 font-bold text-lg">{home?.partnersTitle}</h5>
			<div class="w-full grid grid-cols-4 gap-4">
				{#if home?.partner.length !== 0}
					{#each home?.partner ?? [] as partner}
						<div class="flex justify-center">
							{#if partner.Logo.data?.attributes?.url}
								<a href={partner.URL}>
									<img
										class=""
										src={`${PUBLIC_STATIC_URL}${partner.Logo.data?.attributes?.url}`}
										alt="alt text"
									/>
								</a>
							{/if}
						</div>
					{/each}
				{/if}

				<!-- <div class="flex justify-center">
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
				</div> -->
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
