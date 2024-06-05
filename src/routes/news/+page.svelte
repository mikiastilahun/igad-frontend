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

<PageHeader
	imgSrc={Hero}
	title={'News'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
		vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
		aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<section class="max-w-[1136px] mx-auto py-10 px-8 md:px-4">
	<div class=" flex flex-col-reverse lg:flex-row flex-wrap gap-16 w-full items-stretch">
		<!-- news -->
		<div class="flex flex-col gap-5 justify-center items-start">
			<h2 class="text-2xl hidden lg:inline-block font-bold">Latest News</h2>
			<!-- news card -->
			<div class="flex flex-col gap-5">
				{#if news?.length !== 0}
					{#each news?.slice(1, 4) ?? [] as newsItem}
						<FeaturedNewsCard
							title={newsItem.attributes.title}
							content={newsItem.attributes.article}
							date={newsItem.attributes.date}
							imgSrc={`${PUBLIC_STATIC_URL}${newsItem.attributes.thumbnail.data.attributes.url}`}
							id={newsItem.id}
						/>
					{/each}
				{/if}
			</div>
		</div>
		<!-- featured -->
		<div class="relative flex-1 hover:cursor-pointer">
			<div class="absolute top-0 left-0 h-full w-full bg-black opacity-60 rounded-md"></div>
			<enhanced:img
				class="object-cover rounded-md h-full"
				src={news?.[0].attributes.thumbnail.data.attributes.url
					? `${PUBLIC_STATIC_URL}${news?.[0].attributes.thumbnail.data.attributes.url}`
					: NewsImg2}
				alt="alt text"
			/>
			<div class="absolute bottom-0 px-4 md:px-8 pb-4 md:pb-8 text-white">
				<span class="text-base leading-normal">Debits - 03 June, 2023</span>
				<h3 class="text-lg sm:text-xl md:text-3xl font-semibold md:font-bold md:leading-normal">
					{news?.[0].attributes.title}
				</h3>
			</div>
		</div>
		<h2 class="text-2xl lg:hidden inline-block font-bold">Latest News</h2>
	</div>
</section>

<!-- List of news -->

<section class="max-w-[1136px] mx-auto py-10 px-8 md:px-4">
	<h2 class="text-2xl font-bold">Our News</h2>
	<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
		{#each news || [] as newsItem}
			{#if newsItem.attributes.thumbnail.data.attributes.url}
				<Card
					title={newsItem.attributes.title}
					description={newsItem.attributes.article}
					imageUrl={`${PUBLIC_STATIC_URL}${newsItem.attributes.thumbnail.data.attributes.url}`}
					link={`news/${newsItem.id}`}
				/>
			{:else}
				<Card
					title={newsItem.attributes.title}
					description={newsItem.attributes.article}
					imageUrl={NewsImg2}
					link={`news/${newsItem.id}`}
				/>
			{/if}
		{/each}
	</div>
	<div class="text-center">
		<button class="text-primary mt-8 font-semibold">Load More</button>
	</div>
</section>

<!-- twitter will be here -->

<!-- email subscription -->
<section class="max-w-[1136px] md:h-[384px] mx-auto my-10">
	<div class="h-full flex flex-col md:flex-row">
		<div
			class="py-28 md:w-[410px] rounded-b-none md:rounded-b-lg rounded-lg bg-primary flex justify-center items-center px-10"
		>
			<h3 class="text-white font-bold text-[26px]">
				Subscribe to our newsletter to stay up-to date.
			</h3>
		</div>
		<form class="py-10 px-8 md:px-4 lg:px-28 flex flex-col gap-8 justify-center flex-1">
			<label for="email" class="flex flex-col gap-2">
				<span class="text-base text-gray-700">Email</span>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email address"
					class="w-full border border-gray-300 rounded-md p-2"
				/>
			</label>
			<button type="submit" class="bg-primary text-white rounded-full p-2">Subscribe</button>
		</form>
	</div>
</section>
