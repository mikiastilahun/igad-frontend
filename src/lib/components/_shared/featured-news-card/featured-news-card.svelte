<script lang="ts">
	import { goto } from '$app/navigation';
	import NewsImg1 from '$lib/assets/temp/news-1.png?enhanced';

	export let title: string;
	export let content: String;
	export let date: string;
	export let imgSrc: string;
	export let id: number;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex gap-2 md:gap-5 hover:cursor-pointer w-full"
	on:click={() => {
		// navigate to the news page
		goto(`/news/${id}`);
	}}
>
	<enhanced:img
		class="object-cover w-[166px] md:w-[234px] h-[150px] rounded-md"
		src={imgSrc ? imgSrc : NewsImg1}
		alt="LumPad 2.0 tablet"
	/>

	<div class="flex flex-col gap-1 w-full lg:max-w-60 flex-1">
		<span class="text-xs leading-normal text-black/60">{date}</span>
		<h4 class="text-lg md:text-xl font-bold leading-tight md:leading-normal line-clamp-2 ...">
			{title}
		</h4>
		<p class="text-sm text-gray-500 line-clamp-3 ...">
			{content}
		</p>
	</div>
</div>
