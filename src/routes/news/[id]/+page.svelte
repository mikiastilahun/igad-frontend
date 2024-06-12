<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Hero from '$lib/assets/igad-logo.png';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import Share from '$lib/components/_shared/share/share.svelte';

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
	imgSrc={news?.attributes?.thumbnail?.data?.attributes.url
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

<section class="relative mx-auto flex max-w-7xl flex-col-reverse px-4 py-10 lg:flex-row">
	<div class="sticky top-10 self-start">
		<Share />
	</div>
	<div class="mx-auto w-full max-w-[1136px] px-0 md:px-8 lg:px-4">
		<p class="ck-content prose max-w-full">
			{@html news?.attributes.article}
		</p>
	</div>
</section>
