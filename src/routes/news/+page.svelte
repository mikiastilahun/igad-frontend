<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import FeaturedNewsCard from '$lib/components/_shared/featured-news-card/featured-news-card.svelte';
	import NewsImg2 from '$lib/assets/temp/news-2.png?enhanced';
	import Card from '$lib/components/_shared/card/card.svelte';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';

	export let data;

	const news = data.data?.newsData.data;
</script>

<svelte:head>
	<title>IGAD - News and Articles</title>
	<meta name="description" content="IGAD news and articles" />
</svelte:head>

<PageHeader
	imgSrc={Hero}
	title={'News'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
		vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
		aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<section class="mx-auto max-w-[1136px] px-8 py-10 md:px-4">
	<div class=" flex w-full flex-col-reverse flex-wrap items-stretch gap-16 lg:flex-row">
		<!-- news -->
		<div class="flex flex-col items-start justify-center gap-5">
			<h2 class="hidden text-2xl font-bold lg:inline-block">Latest News</h2>
			<!-- news card -->
			<div class="flex flex-col gap-5">
				{#if news?.length !== 0}
					{#each news?.slice(1, 4) ?? [] as newsItem}
						<FeaturedNewsCard
							title={newsItem.attributes.title}
							content={newsItem.attributes.article}
							date={newsItem.attributes.date}
							imgSrc={`${PUBLIC_STATIC_URL}${newsItem.attributes.thumbnail.data.attributes.url}`}
							slug={newsItem.attributes.slug}
						/>
					{/each}
				{/if}
			</div>
		</div>
		<!-- featured -->

		<a href="news/{news?.[0].attributes.slug}" class="relative flex-1 hover:cursor-pointer">
			<div class="absolute left-0 top-0 h-full w-full rounded-md bg-black opacity-60"></div>
			<enhanced:img
				class="h-full rounded-md object-cover"
				src={news?.[0].attributes.thumbnail.data.attributes.url
					? `${PUBLIC_STATIC_URL}${news?.[0].attributes.thumbnail.data.attributes.url}`
					: NewsImg2}
				alt="alt text"
			/>
			<div class="absolute bottom-0 px-4 pb-4 text-white md:px-8 md:pb-8">
				<span class="text-base leading-normal">Debits - 03 June, 2023</span>
				<h3 class="text-lg font-semibold sm:text-xl md:text-3xl md:font-bold md:leading-normal">
					{news?.[0].attributes.title}
				</h3>
			</div>
		</a>
		<h2 class="inline-block text-2xl font-bold lg:hidden">Latest News</h2>
	</div>
</section>

<!-- List of news -->

<section class="mx-auto max-w-[1136px] px-8 py-10 md:px-4">
	<h2 class="text-2xl font-bold">Our News</h2>
	<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
		{#each news || [] as newsItem}
			{#if newsItem.attributes.thumbnail.data.attributes.url}
				<Card
					title={newsItem.attributes.title}
					description={newsItem.attributes.article}
					imageUrl={`${PUBLIC_STATIC_URL}${newsItem.attributes.thumbnail.data.attributes.url}`}
					link={`news/${newsItem.attributes.slug}`}
					isRichtext={true}
					date={newsItem.attributes.date}
				/>
			{:else}
				<Card
					title={newsItem.attributes.title}
					description={newsItem.attributes.article}
					imageUrl={NewsImg2}
					link={`news/${newsItem.attributes.slug}`}
					isRichtext={true}
					date={newsItem.attributes.date}
				/>
			{/if}
		{/each}
	</div>
	<div class="text-center">
		<button class="mt-8 font-semibold text-primary">Load More</button>
	</div>
</section>

<!-- twitter will be here -->

<!-- email subscription -->
<section class="mx-auto my-10 max-w-[1136px] md:h-[384px]">
	<div class="flex h-full flex-col md:flex-row">
		<div
			class="flex items-center justify-center rounded-lg rounded-b-none bg-primary px-10 py-28 md:w-[410px] md:rounded-b-lg"
		>
			<h3 class="text-[26px] font-bold text-white">
				Subscribe to our newsletter to stay up-to date.
			</h3>
		</div>
		<form class="flex flex-1 flex-col justify-center gap-8 px-8 py-10 md:px-4 lg:px-28">
			<label for="email" class="flex flex-col gap-2">
				<span class="text-base text-gray-700">Email</span>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email address"
					class="w-full rounded-md border border-primary-500 p-2 focus:border-secondary-500 focus:ring-secondary-500"
				/>
			</label>
			<button type="submit" class="rounded-full bg-primary p-2 text-white">Subscribe</button>
		</form>
	</div>
</section>
