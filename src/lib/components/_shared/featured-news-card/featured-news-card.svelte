<script lang="ts">
	import NewsImg1 from '$lib/assets/temp/news-1.png?enhanced';

	export let title: string;
	export let content: String;
	export let date: string;
	export let imgSrc: string;
	export let slug: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a class="flex w-full gap-2 hover:cursor-pointer md:gap-5" href="/news/{slug}">
	<enhanced:img
		class="h-[150px] w-[166px] rounded-md object-cover md:w-[234px]"
		src={imgSrc ? imgSrc : NewsImg1}
		alt="LumPad 2.0 tablet"
	/>

	<div class="flex w-full flex-1 flex-col gap-1 lg:max-w-60">
		<span class="text-xs leading-normal text-black/60">{date}</span>
		<h4 class="... line-clamp-2 text-lg font-bold leading-tight md:text-xl md:leading-normal">
			{title}
		</h4>
		<p class="... line-clamp-3 text-sm text-gray-500">
			{@html content}
		</p>
	</div>
</a>
