<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Download from '$lib/assets/icons/download.svg.svelte';
	import IGADLogo from '$lib/assets/igad-logo.png';

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
	<section class="relative min-h-[674px] flex items-center rounded-lg bg-primary">
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">{policy?.title}</h1>
				<p class=" text-base font-normal leading-normal">
					{policy?.description}
				</p>
			</div>
		</div>
		<img
			class="rounded-full w-[400px] h-[400px] mr-32 absolute right-0 bottom-1/2 top-1/2 transform -translate-y-1/2"
			alt={`publications hero image`}
			src={IGADLogo}
		/>
	</section>
</div>

<div class="max-w-5xl mx-auto my-4 mb-12 p-4">
	{#each policy?.section || [] as section}
		<div class="w-full">
			<h2 class="text-2xl font-bold mt-8">{section.title}</h2>
			<p class="prose max-w-5xl mx-auto">
				<SvelteMarkdown source={section.content} />
			</p>
		</div>

		{#if section?.subSection}
			{#each section.subSection as subsection}
				<div class="w-full">
					<h3 class="text-xl font-bold mt-8 text-primary">{subsection.title}</h3>
					<p class="prose max-w-5xl mx-auto">
						<SvelteMarkdown source={subsection.content} />
					</p>
				</div>
			{/each}
		{/if}

		{#if section.files.data}
			{#each section.files.data as file}
				<div class="w-full flex items-center gap-8 mt-8">
					<!-- download button -->
					<button
						class="bg-primary px-4 py-3 rounded flex gap-2 items-center"
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
