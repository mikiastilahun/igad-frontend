<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';

	import type { PageData } from '$routes/$types';

	export let priorityAreas: Exclude<PageData['data'], undefined>['priorityAreas']['data'];
</script>

<div class="relative bottom-0 w-full">
	<div
		class="mx-auto grid max-w-[1136px] grid-cols-2 items-start justify-between justify-items-center gap-8 rounded-lg px-8 text-white sm:grid-cols-3 md:flex md:px-4"
	>
		{#if priorityAreas?.length !== 0}
			{#each priorityAreas ?? [] as area, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="group relative flex w-36 flex-col items-center justify-center gap-1 text-center text-white transition-all hover:scale-125
						hover:cursor-pointer"
					on:click={() => {
						// redirect to the priority area page
					}}
				>
					<img
						class=""
						src={`${PUBLIC_STATIC_URL}${area.attributes.icon.data.attributes.url}`}
						alt="alt text"
						width="50"
						height="50"
					/>
					<span class="text-center text-xs md:text-sm">{area.attributes.Title} </span>
				</div>
			{/each}
		{/if}
	</div>
</div>
