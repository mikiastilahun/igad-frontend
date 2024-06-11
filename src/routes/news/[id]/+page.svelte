<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Hero from '$lib/assets/publications/hero.jpg';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	const news = data.data?.newsData.data;

	$: {
		console.log({ data });
	}
</script>

<svelte:head>
	<title>IGAD - {news?.attributes.title}</title>
	<meta name="description" content={news?.attributes.title} />
</svelte:head>

<PageHeader
	imgSrc={news?.attributes.thumbnail.data.attributes.url
		? `${PUBLIC_STATIC_URL}${news.attributes.thumbnail.data.attributes.url}`
		: Hero}
	title={news?.attributes.title ?? 'News'}
	class="!items-end pb-8"
>
	<p class=" flex flex-col text-base font-normal leading-normal text-gray-300">
		<span>{news?.attributes.date}</span>
		<span>5min read</span>
	</p>
</PageHeader>

<section class="relative flex flex-row gap-8 px-8 py-10">
	<div class="sticky top-0">
		<!-- share icons  -->
		<span class="text-sm font-semibold">Share</span>
		<div class="flex flex-col items-center justify-center gap-5 rounded-full bg-secondary py-4">
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/facebook-new.png" alt="Facebook Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/instagram.png" alt="Instagram Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/android/18/000000/linkedin.png" alt="Linkedin Icon" />
			</a>
			<a href="#" class="">
				<img src="https://img.icons8.com/ios-filled/18/x.png" alt="Close Icon" />
			</a>
		</div>
	</div>
	<div class="w-full">
		<!-- content -->
		<!-- <p class="max-w-5xl mx-auto prose">
			<SvelteMarkdown source={news?.attributes.content} />
		</p> -->

		<p class="ck-content prose mx-auto max-w-5xl">
			{@html news?.attributes.article}
		</p>
	</div>
</section>
