<script lang="ts">
	import algoliasearch from 'algoliasearch/lite.js';
	import {
		PUBLIC_ALGOLIA_INDEX_PREFIX,
		PUBLIC_ALGOLIA_APP_ID,
		PUBLIC_ALGOLIA_SEARCH_API_KEY
	} from '$env/static/public';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { quadOut, quadIn } from 'svelte/easing';

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	let input: HTMLInputElement;
	let indexType = ['events', 'news', 'publications', 'priority-area', 'projects'];
	let query = '';
	let hits: any[] = [];
	let error: string | null = null;

	const searchClient = algoliasearch(PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_API_KEY);

	const search = async () => {
		if (!query) {
			return;
		}
		try {
			const result = await searchClient.search(
				indexType.map((type) => {
					return {
						indexName: `${PUBLIC_ALGOLIA_INDEX_PREFIX}${type}`,
						query: query
					};
				})
			);

			console.log('Search result:', result);
			hits = result.results.reduce(
				(acc, curr) => [...acc, ...curr.hits.map((hit) => ({ ...hit, index: curr.index }))],
				[]
			);
			if (hits.length === 0) {
				error = 'No results found';
			} else {
				error = null;
			}
		} catch (err) {
			console.error('Search error:', err);
			error = 'An error occurred while searching';
		}
	};

	$: query, search();

	onMount(() => {
		input.focus();
	});
</script>

<div
	class="fixed inset-0 z-[99999] overflow-y-auto p-4 sm:p-6 md:p-20"
	role="dialog"
	aria-modal="true"
>
	<div
		in:fade={{
			duration: 300,
			easing: quadOut
		}}
		out:fade={{
			duration: 300,
			easing: quadIn
		}}
		on:click={() => handleClose()}
		class="fixed inset-0 transform-gpu bg-primary/50 px-8 backdrop-blur-lg transition-opacity"
		aria-hidden="true"
	></div>

	<div
		in:scale={{
			duration: 300,
			opacity: 0,
			start: 0.95,
			easing: quadOut
		}}
		out:scale={{
			duration: 200,
			opacity: 1,
			start: 1,
			easing: quadIn
		}}
		class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
	>
		<div class="relative">
			<!-- Heroicon name: solid/search -->
			<svg
				class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/>
			</svg>
			<input
				type="text"
				class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
				placeholder="Search..."
				role="combobox"
				aria-expanded="false"
				aria-controls="options"
				bind:value={query}
				bind:this={input}
			/>
		</div>

		{#if query !== '' && hits.length === 0}
			<div class=" px-6 py-14 text-center text-sm sm:px-14">
				<svg
					class="mx-auto h-6 w-6 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p class="mt-4 font-semibold text-secondary-600">No results found</p>
				<p class="mt-2 text-gray-500">
					No components found for this search term. Please try again.
				</p>
			</div>
		{/if}
		{#if hits.length > 0}
			<ul class="max-h-96 scroll-py-3 overflow-y-auto p-3" id="options" role="listbox">
				{#each hits as hit}
					{@const index = hit.index.split('_')[1]}
					{@const to = index === 'priority-area' ? `${index}/${hit.title}` : `${index}/${hit.id}`}
					<li
						class="group flex cursor-default select-none rounded-xl p-3 transition-colors hover:bg-secondary-100"
						id="option-1"
						role="option"
						tabindex="-1"
					>
						<!-- TODO: show image here maybe -->
						<!-- <div
							class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-500"
						>
							<svg
								class="h-6 w-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
						</div> -->
						<a href={to} on:click={() => handleClose()} class=" flex-auto">
							<p
								class="text-sm font-medium text-gray-700 group-hover:text-primary-500 group-hover:underline"
							>
								{hit.title || hit.Title || hit.name}
							</p>

							<span
								class="inline-flex items-center justify-start gap-2.5 rounded-md bg-zinc-500 px-2"
							>
								<span class="text-[10px] font-normal text-white">{index.toUpperCase()}</span>
							</span>

							{#if hit.description || hit.ShortDescription || hit.mainContent || hit.article || hit.project_background}
								<p class="ck-editor prose line-clamp-2 text-sm text-gray-500 hover:text-gray-700">
									{@html hit.description ||
										hit.ShortDescription ||
										hit.mainContent ||
										hit.article ||
										hit.project_background}
								</p>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
