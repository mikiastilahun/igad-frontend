<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Hero from '$lib/assets/igad-logo.png';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import Share from '$lib/components/_shared/share/share.svelte';
	import dayjs from 'dayjs';

	export let data;

	const news = data.data?.newsData.attributes;

	function countWordsInHTML(html: string) {
		const text = html.replace(/<[^>]*>/g, '');
		return text.split(/\s+/).filter(Boolean).length;
	}

	const wordsPerMinute = 200;
	const wordCount = countWordsInHTML(news?.article ?? '');
	const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
</script>

<svelte:head>
	<title>IGAD - {news?.title}</title>
	<meta name="description" content={news?.title} />
</svelte:head>

<PageHeader
	imgSrc={news?.thumbnail?.data?.attributes.url
		? `${PUBLIC_STATIC_URL}${news.thumbnail.data.attributes.url}`
		: Hero}
	title={news?.title ?? 'News'}
	class="!items-end pb-8"
>
	<p class=" flex flex-col text-base font-normal leading-normal text-gray-300">
		<span>{dayjs(news?.date).format('DD MMMM YYYY')}</span>
		<span>{readingTimeMinutes} min read</span>
	</p>
</PageHeader>

<section class="relative mx-auto flex max-w-7xl flex-col-reverse px-4 py-10 lg:flex-row">
	<div class="sticky top-10 self-start">
		<Share />
	</div>
	<div class="mx-auto w-full max-w-[1136px] px-0 md:px-8 lg:px-4">
		<p class="ck-content prose max-w-full">
			{@html news?.article}
		</p>
	</div>
</section>
