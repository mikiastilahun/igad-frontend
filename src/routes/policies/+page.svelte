<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Download from '$lib/assets/icons/download.svg.svelte';
	import IGADLogo from '$lib/assets/igad-logo.svg';

	import SvelteMarkdown from 'svelte-markdown';

	export let data;
	const policy = data.data?.policy?.data.attributes;

	console.log({ data });

	function downloadFile(url: string, filename: string) {
		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
				const link = document.createElement('a');
				const objectURL = URL.createObjectURL(blob);
				link.href = objectURL;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(objectURL);
			})
			.catch((err) => console.error('Error while downloading file:', err));
	}

	// define the content with sample markdown text and images included
	const content = `
# This is a Markdown policy and framework description.

## Headers

`;
</script>

<div class="md:p-4">
	<section
		class="relative flex min-h-[674px] items-center justify-between bg-primary md:rounded-lg"
	>
		<div class="mx-auto flex w-full max-w-[1136px] items-center justify-between gap-4">
			<div class="relative w-full px-4 md:px-8">
				<div class="max-w-2xl text-white">
					<h1 class="mb-2 text-3xl font-bold">{policy?.title}</h1>
					<p class=" text-base font-normal leading-normal">
						{policy?.description}
					</p>
				</div>
			</div>
			<img
				class="hidden h-auto max-h-[400px] max-w-52 px-4 md:inline-block md:rounded-full md:px-8 lg:max-w-[300px]"
				alt={`policies and framework`}
				src={IGADLogo}
			/>
		</div>
	</section>
</div>

<div class="mx-auto my-4 mb-12 max-w-5xl p-4">
	{#each policy?.section || [] as section}
		<div class="w-full">
			<h2 class="mt-8 text-2xl font-bold">{section.title}</h2>
			<p class="prose mx-auto max-w-5xl">
				<SvelteMarkdown source={section.content} />
			</p>
		</div>

		{#if section?.subSection}
			{#each section.subSection as subsection}
				<div class="w-full">
					<h3 class="mt-8 text-xl font-bold text-primary">{subsection.title}</h3>
					<p class="prose mx-auto max-w-5xl">
						<SvelteMarkdown source={subsection.content} />
					</p>
				</div>
			{/each}
		{/if}

		{#if section.files.data}
			{#each section.files.data as file}
				<div class="mt-8 flex w-full items-center gap-8">
					<!-- download button -->
					<button
						class="flex items-center gap-2 rounded bg-primary px-4 py-3"
						on:click={() => {
							downloadFile(`${PUBLIC_STATIC_URL}${file.attributes.url}`, file.attributes.name);
						}}
					>
						<Download />
						<a
							href={`${PUBLIC_STATIC_URL}${file.attributes.url}`}
							target="_blank"
							rel="noopener noreferrer"
							class="text-white"
						>
							Download File
						</a>
					</button>

					<a
						class="text-xl font-bold text-primary hover:cursor-pointer"
						href={`${PUBLIC_STATIC_URL}${file.attributes.url}`}
					>
						Read Full Document ({file.attributes.name})
					</a>
				</div>
			{/each}
		{/if}
	{/each}
</div>
