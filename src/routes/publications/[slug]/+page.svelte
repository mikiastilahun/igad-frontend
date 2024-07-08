<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import dayjs from 'dayjs';

	export let data;

	console.log({ data });
	const publication = data.data?.publication.attributes;
</script>

<svelte:head>
	<title>{publication?.title || 'IGAD Publication detail'}</title>
	<meta name="description" content={publication?.title || ''} />
</svelte:head>
<PageHeader
	imgSrc={`${PUBLIC_STATIC_URL}${publication?.coverImage.data.attributes.url}`}
	imgAlt={'IGAD projects'}
	title={publication?.title}
/>

<section class="mx-auto grid max-w-7xl grid-cols-3 gap-16 p-4">
	<div class="col-span-2 grid max-w-full">
		<h1 class="mb-2 text-3xl font-bold">{publication?.title}</h1>

		<!-- date and publicationType -->
		<div class="mb-8 flex items-center gap-6">
			<span class="text-sm text-zinc-500"
				>{dayjs(publication?.publicationDate).format('DD MMMM YYYY')}</span
			>
			<div
				class=" inline-flex h-3.5 items-center justify-start gap-2.5 rounded-[100px] bg-zinc-700 px-2"
			>
				<div class="font-['Open Sans'] text-[10px] font-normal text-white">
					{publication?.publication_type.data.attributes.type}
				</div>
			</div>
		</div>

		<!-- content -->
		<p class="ck-content prose mx-auto max-w-full">
			{@html publication?.mainContent}
		</p>
	</div>

	<div class="col-span-1 mt-12 flex max-w-72 flex-col items-center gap-4">
		<ul class="w-full break-all">
			{#each publication?.files.data || [] as file}
				<li class=" list-disc p-2">
					<a
						href={`${PUBLIC_STATIC_URL}${file.attributes.url}`}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2"
					>
						<span class="  text-primary">{file.attributes.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
