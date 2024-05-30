<script lang="ts">
	import HeroImg from '$lib/assets/hero-img.png?enhanced';
	import SvelteMarkdown from 'svelte-markdown';

	import NewsImg2 from '$lib/assets/temp/news-2.png?enhanced';
	import ChartsImg from '$lib/assets/temp/charts.png?enhanced';
	import FeaturedNewsCard from '$lib/components/_shared/featured-news-card/featured-news-card.svelte';
	import Card from '$lib/components/_shared/card/card.svelte';
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import { fly } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import CaretDown from '$lib/assets/icons/caret-down.svg.svelte';
	import Registration from '$lib/components/registration/registration.svelte';
	import { goto } from '$app/navigation';
	import Map from '$lib/components/leaflet/map.svelte';

	export let data;

	const home = data.data?.homeData.data.attributes;
	const learningLinks = data.data?.learningData.data;
	const news = data.data?.newsData.data;
	const priorityAreas = data.data?.priorityAreas.data || [];
	const populationStats = data.data?.populationStats.data;

	let selectedPriorityArea = 0;
	let lastSelectedPriorityArea = 0;

	console.log({ news, learningLinks, home, priorityAreas, populationStats });

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
		if (priorityAreas && selectedPriorityArea === 0) {
			selectedPriorityArea = priorityAreas.length - 1;
		} else {
			selectedPriorityArea -= 1;
		}
	}

	function scrollRight() {
		if (priorityAreas && selectedPriorityArea === priorityAreas.length - 1) {
			selectedPriorityArea = 0;
		} else {
			selectedPriorityArea += 1;
		}
	}

	let showRegister = false;
</script>

<div class="">
	<!-- hero section -->
	<section class="w-full relative h-[1000px] md:h-screen md:max-h-[890px] flex items-center">
		<div class=" w-full absolute top-0 left-0 bottom-0">
			<div
				bind:this={scrollContainer}
				class="hide-scroll flex h-full w-full transform-gpu snap-x snap-mandatory overflow-x-scroll scroll-smooth"
			>
				{#if home?.BackgroundImage}
					{@const imageUrl = home.BackgroundImage.data?.attributes?.url}
					<div class="snap-center min-w-full relative">
						<img
							class="object-cover w-full h-full"
							alt={'this is the alt text'}
							src={imageUrl ? `${PUBLIC_STATIC_URL}${imageUrl}` : HeroImg}
						/>
						<div
							class=" absolute top-0 left-0 w-full h-full md:bg-gradient-to-r bg-gradient-to-t from-black/80 from-55% md:from-50% to-transparent"
						></div>

						<div
							class=" absolute top-[40%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1136px] mx-auto w-full px-8 md:px-4 flex justify-center md:justify-start items-center gap-4"
						>
							{#each priorityAreas as area, i}
								{#if i === selectedPriorityArea}
									<div
										class="text-white max-w-2xl absolute"
										transition:fly={{
											duration: 300,
											easing: sineOut,
											x: lastSelectedPriorityArea < selectedPriorityArea ? -100 : 100
										}}
									>
										<h1 class="text-2xl md:text-4xl font-bold mb-2">
											{area.attributes.Title ?? ''}
										</h1>
										<p class=" text-lg md:text-2xl font-normal leading-normal">
											{area.attributes.ShortDescription ?? ''}
										</p>

										<button
											on:click={() => {
												goto(`/priority-area/${area.id}`);
											}}
											class="block p-2 mt-4 bg-secondary text-black rounded-md">Read More</button
										>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			</div>
			<button
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
			>
		</div>

		<div class=" absolute bottom-0 w-full">
			<div
				class="max-w-[1136px] mx-auto text-white pb-8 sm:pb-16 md:pb-10 grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center md:flex justify-between items-start rounded-lg px-8 md:px-4"
			>
				{#if priorityAreas?.length !== 0}
					{#each priorityAreas ?? [] as area, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="relative group flex flex-col gap-1 items-center w-36 justify-center text-center hover:scale-125 hover:cursor-pointer transition-all {i ===
							selectedPriorityArea
								? 'text-primary scale-125'
								: 'text-white'} "
							on:click={() => {
								lastSelectedPriorityArea = selectedPriorityArea;
								selectedPriorityArea = i;
							}}
						>
							<img
								class=""
								src={`${PUBLIC_STATIC_URL}${area.attributes.icon.data.attributes.url}`}
								alt="alt text"
								width="50"
								height="50"
							/>
							<span class="text-center text-xs md:text-sm">{area.attributes.Title} </span>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</section>
	<!--  -->

	<!-- stats -->
	<section class=" bg-primary">
		<div
			class="px-4 lg:px-0 py-8 max-w-[1136px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 justify-items-center items-center text-center"
		>
			{#if home?.firstStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.firstStat.value}</h2>
					<p class="font-semibold text-base md:text-lg flex flex-col items-center leading-normal">
						<span>{home.firstStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.secondStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.secondStat.value}</h2>
					<p class="font-semibold text-base md:text-lg flex flex-col items-center leading-normal">
						<span>{home.secondStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.thirdStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.thirdStat.value}</h2>
					<p class="font-semibold text-base md:text-lg flex flex-col items-center leading-normal">
						<span>{home.thirdStat?.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.forthStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.forthStat.value}</h2>
					<p class="font-semibold text-base md:text-lg flex flex-col items-center leading-normal">
						<span>{home.forthStat.label}</span>
					</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Regional Statistics -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-8 md:px-4">
		<h2 class="text-2xl font-bold leading-normal">{home?.regionalStatisticsTitle}</h2>
		<p class="text-base leading-normal">
			{home?.regionalStatisticsDescription}
		</p>
		<!-- <enhanced:img class=" object-cover w-full h-full" src={ChartsImg} alt="alt text" /> -->
		<div class="pt-8">
			<Map data={populationStats?.attributes} />
		</div>
	</section>
	<!-- IGAD support platform -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-8 md:px-4">
		<h2 class="text-2xl font-bold leading-normal">{home?.SupportplatformTitle}</h2>
		<p class="text-base leading-normal">
			<SvelteMarkdown source={home?.supportPlatformContent} />
		</p>
	</section>

	<!-- Quick Learning Links -->
	<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-8 md:px-4">
		<h2 class="text-2xl font-bold leading-normal">Quick Learning Links</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
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
						class="w-full rounded-lg bg-black/80 p-8 h-full gap-2 flex justify-center items-center flex-col"
					>
						<h3 class="text-3xl font-bold text-white">Register Here</h3>
						<p class="text-white text-center">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
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
	<section class="max-w-[1136px] mx-auto py-10 px-8 md:px-4">
		<div class=" flex flex-col-reverse lg:flex-row flex-wrap gap-16 w-full items-stretch">
			<!-- news -->
			<div class="flex flex-col gap-5 justify-center items-start">
				<h2 class="text-2xl hidden lg:inline-block font-bold">News and Updates</h2>
				<!-- news card -->
				<div class="flex flex-col gap-5 w-full">
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
					<span class="text-sm md:text-base leading-normal">Debits - 03 June, 2023</span>
					<h3 class="text-lg sm:text-xl md:text-3xl font-semibold md:font-bold md:leading-normal">
						{news?.[0].attributes.title}
					</h3>
				</div>
			</div>
			<h2 class="text-2xl lg:hidden inline-block font-bold">News and Updates</h2>
		</div>
	</section>

	<!-- Partners -->
	<section class="mx-auto max-w-[1136px] px-8 md:px-4">
		<div class="w-full py-20 flex-col justify-start items-center gap-10 inline-flex">
			<h5 class="text-neutral-400 font-bold text-lg">{home?.partnersTitle}</h5>
			<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
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
