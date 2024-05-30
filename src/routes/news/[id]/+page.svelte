<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Hero from '$lib/assets/publications/hero.jpg';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	const news = data.data?.newsData.data;

	$: {
		console.log({ data });
	}
</script>

<div class="p-4">
	<section class="relative min-h-[674px] flex items-end rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={news?.attributes.thumbnail.data.attributes.url
				? `${PUBLIC_STATIC_URL}${news.attributes.thumbnail.data.attributes.url}`
				: Hero}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full pb-8">
			<div class="text-white max-w-3xl">
				<h1 class="text-3xl font-bold mb-2">
					{news?.attributes.title ?? 'News'}
				</h1>
				<p class=" text-base text-gray-300 font-normal leading-normal flex flex-col">
					<span>{news?.attributes.date}</span>
					<span>5min read</span>
				</p>
			</div>
		</div>
	</section>
</div>

<section class="px-8 py-10 flex flex-row gap-8 relative">
	<div class="sticky top-0">
		<!-- share icons  -->
		<span class="text-sm font-semibold">Share</span>
		<div class="bg-secondary flex flex-col gap-5 justify-center items-center py-4 rounded-full">
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

		<p class="max-w-5xl mx-auto prose ck-content">
			{@html news?.attributes.article}
		</p>
	</div>
</section>
