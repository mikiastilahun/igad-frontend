<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import type { PageData } from '$routes/$types';

	export let priorityAreas:
		| Exclude<PageData['data'], undefined>['priorityAreas']['data']
		| undefined;
	let scrollContainer: HTMLDivElement;
</script>

<div
	bind:this={scrollContainer}
	class="hide-scroll flex h-full w-full max-w-[1136px] snap-x snap-mandatory gap-4 overflow-x-scroll pt-4"
>
	{#if priorityAreas?.length !== 0}
		{#each priorityAreas ?? [] as area, i}
			<a
				class="group flex min-w-24 snap-start flex-col items-center justify-center gap-1
			text-center text-white hover:cursor-pointer"
				href="/priority-area/{area.attributes.slug}"
			>
				<img
					class="transition-transform duration-300 ease-in-out group-hover:scale-125"
					src={`${PUBLIC_STATIC_URL}${area.attributes.icon.data.attributes.url}`}
					alt="alt text"
					width="30"
					height="30"
				/>
				<span class="text-center text-xs md:text-sm">{area.attributes.title} </span>
			</a>
		{/each}
	{/if}
</div>

<style>
	.hide-scroll {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
