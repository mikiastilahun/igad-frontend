<script lang="ts">
	import HeroImg from '$lib/assets/hero-img.png?enhanced';
	import SvelteMarkdown from 'svelte-markdown';

	import NewsImg2 from '$lib/assets/temp/news-2.png?enhanced';
	import ChartsImg from '$lib/assets/temp/charts.png?enhanced';
	import FeaturedNewsCard from '$lib/components/_shared/featured-news-card/featured-news-card.svelte';
	import Card from '$lib/components/_shared/card/card.svelte';
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import { fly, slide, fade, crossfade } from 'svelte/transition';
	import { sineOut, cubicOut } from 'svelte/easing';
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

	let scrollContainer: HTMLDivElement;

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
	<section
		class="relative flex h-[1000px] w-full max-w-full items-center md:h-screen md:max-h-[890px]"
	>
		<div class="relative h-full w-full">
			<div class=" relative flex h-full w-full transform-gpu">
				<div class="z-50 flex w-full items-center md:px-4">
					<div class="-mt-64 flex w-full md:mt-0">
						<button
							on:click={() => {
								scrollContainer.scrollBy({
									left: -scrollContainer.clientWidth,
									behavior: 'smooth'
								});
							}}
							class="group relative self-center p-2"
						>
							<span
								class="absolute inset-0 block h-full w-full rounded-full bg-gray-50/25 opacity-0 transition-all duration-150 group-hover:animate-pulse group-hover:opacity-100"
							></span>
							<CaretDown class="h-6 w-6 rotate-90 scale-150 fill-white" />
						</button>
						<div
							bind:this={scrollContainer}
							class=" hide-scroll mx-auto flex w-full max-w-[1136px] snap-x snap-mandatory overflow-x-scroll"
						>
							{#each priorityAreas as area, i}
								<!-- {#if i === selectedPriorityArea} -->
								<div
									class="w-full min-w-full snap-start px-4 text-white"
									transition:fade={{ duration: 300, easing: cubicOut }}
								>
									<div class="max-w-2xl">
										<h1 class="text-2xl font-bold md:text-4xl">
											{area.attributes.Title ?? ''}
										</h1>
										<p class=" mt-4 text-lg leading-normal opacity-80">
											{area.attributes.ShortDescription ?? ''}
										</p>

										<button
											on:click={() => {
												goto(`/priority-area/${area.id}`);
											}}
											class="mt-8 block rounded-md bg-secondary px-6 py-2 font-semibold text-black"
											>Read More</button
										>
									</div>
								</div>
								<!-- {/if} -->
							{/each}
						</div>
						<button
							on:click={() => {
								scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
							}}
							class=" group relative self-center p-2"
						>
							<span
								class="absolute inset-0 block h-full w-full rounded-full bg-gray-50/25 opacity-0 transition-all duration-150 group-hover:animate-pulse group-hover:opacity-100"
							></span>
							<CaretDown class="h-6 w-6 -rotate-90 scale-150 fill-white " /></button
						>
					</div>
				</div>
				{#if home?.BackgroundImage}
					{@const imageUrl = home.BackgroundImage.data?.attributes?.url}
					<img
						class="absolute inset-0 h-full w-full object-cover"
						alt={'this is the alt text'}
						src={imageUrl ? `${PUBLIC_STATIC_URL}${imageUrl}` : HeroImg}
					/>
					<div
						class=" absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 from-55% to-transparent md:bg-gradient-to-r md:from-50%"
					></div>
				{/if}
			</div>
		</div>

		<div class=" absolute bottom-0 w-full">
			<div
				class="mx-auto grid max-w-[1136px] grid-cols-2 items-start justify-between justify-items-center gap-8 rounded-lg px-8 pb-8 text-white sm:grid-cols-3 sm:pb-16 md:flex md:justify-start md:px-4 md:pb-10"
			>
				{#if priorityAreas?.length !== 0}
					{#each priorityAreas ?? [] as area, i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="group relative flex w-36 flex-col items-center justify-center gap-1 text-center transition-all hover:scale-125 hover:cursor-pointer {i ===
							selectedPriorityArea
								? 'scale-125 text-primary'
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
								width="32"
								height="32"
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
			class="mx-auto grid max-w-[1136px] grid-cols-1 items-center justify-items-center gap-16 px-4 py-8 text-center md:grid-cols-2 lg:grid-cols-4 lg:px-0"
		>
			{#if home?.firstStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.firstStat.value}</h2>
					<p class="flex flex-col items-center text-base font-semibold leading-normal md:text-lg">
						<span>{home.firstStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.secondStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.secondStat.value}</h2>
					<p class="flex flex-col items-center text-base font-semibold leading-normal md:text-lg">
						<span>{home.secondStat.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.thirdStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.thirdStat.value}</h2>
					<p class="flex flex-col items-center text-base font-semibold leading-normal md:text-lg">
						<span>{home.thirdStat?.label}</span>
					</p>
				</div>
			{/if}
			{#if home?.forthStat}
				<div class="flex flex-col items-center gap-1 text-white">
					<h2 class=" text-3xl font-bold">{home.forthStat.value}</h2>
					<p class="flex flex-col items-center text-base font-semibold leading-normal md:text-lg">
						<span>{home.forthStat.label}</span>
					</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Regional Statistics -->
	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-8 py-10 md:px-4">
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
	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-8 py-10 md:px-4">
		<h2 class="text-2xl font-bold leading-normal">{home?.SupportplatformTitle}</h2>
		<p class="text-base leading-normal">
			<SvelteMarkdown source={home?.supportPlatformContent} />
		</p>
	</section>

	<!-- Quick Learning Links -->
	<section class="mx-auto flex max-w-[1136px] flex-col gap-3 px-8 py-10 md:px-4">
		<h2 class="text-2xl font-bold leading-normal">Quick Learning Links</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
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
					class="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg"
				>
					<div
						class="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-black/80 p-8"
					>
						<h3 class="text-3xl font-bold text-white">Register Here</h3>
						<p class="text-center text-white">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
						<button
							on:click={() => (showRegister = true)}
							class="mt-4 rounded-md bg-primary px-4 py-2 text-white">Register Here</button
						>
					</div>
				</div>
				<enhanced:img class="h-full w-full rounded-lg object-cover" src={HeroImg} alt="alt text" />
			</div>
		</div>
	</section>

	{#if showRegister}
		<Registration bind:show={showRegister} />
	{/if}

	<!-- news section -->
	<section class="mx-auto max-w-[1136px] px-8 py-10 md:px-4">
		<div class=" flex w-full flex-col-reverse flex-wrap items-stretch gap-16 lg:flex-row">
			<!-- news -->
			<div class="flex flex-col items-start justify-center gap-5">
				<h2 class="hidden text-2xl font-bold lg:inline-block">News and Updates</h2>
				<!-- news card -->
				<div class="flex w-full flex-col gap-5">
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

				<a href="/news" class="mt-4 rounded-md bg-primary px-4 py-2 text-white">Read More</a>
			</div>
			<!-- featured -->
			<div class="relative flex-1 hover:cursor-pointer">
				<div class="absolute left-0 top-0 h-full w-full rounded-md bg-black opacity-60"></div>
				<enhanced:img
					class="h-full rounded-md object-cover"
					src={news?.[0].attributes.thumbnail.data.attributes.url
						? `${PUBLIC_STATIC_URL}${news?.[0].attributes.thumbnail.data.attributes.url}`
						: NewsImg2}
					alt="alt text"
				/>
				<div class="absolute bottom-0 px-8 pb-8 text-white">
					<span class="text-sm leading-normal md:text-base">Debits - 03 June, 2023</span>
					<h3 class="text-lg font-semibold sm:text-xl md:text-3xl md:font-bold md:leading-normal">
						{news?.[0].attributes.title}
					</h3>
				</div>
			</div>
			<h2 class="inline-block text-2xl font-bold lg:hidden">News and Updates</h2>
		</div>
	</section>

	<!-- Partners -->
	<section class="mx-auto max-w-[1136px] px-8 md:px-4">
		<div class="inline-flex w-full flex-col items-center justify-start gap-10 py-20">
			<h5 class="text-lg font-bold text-neutral-400">{home?.partnersTitle}</h5>
			<div class="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
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
		@apply absolute left-1/2 top-[-10px] -translate-x-1/2 transform border-b-2 border-t-2 border-transparent border-white content-[''];
	}

	.tooltip:hover .tooltip-content {
		opacity: 1;
	}

	.hide-scroll {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
