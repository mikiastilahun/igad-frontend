<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import dayjs from 'dayjs';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	console.log({ data });
	const publication = data.data?.publication.data.attributes;
</script>

<div class="md:p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={`${PUBLIC_STATIC_URL}${publication?.coverImage.data.attributes.url}`}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">{publication?.title}</h1>
			</div>
		</div>
	</section>
</div>

<section class="max-w-5xl flex mx-auto gap-16 p-4">
	<div class="w-full">
		<h1 class="text-3xl font-bold mb-2">{publication?.title}</h1>

		<!-- date and publicationType -->

		<div class="flex gap-6 items-center">
			<span class="text-sm text-zinc-500"
				>{dayjs(publication?.publicationDate).format('DD MMMM YYYY')}</span
			>
			<div
				class=" h-3.5 px-2 bg-zinc-700 rounded-[100px] justify-start items-center gap-2.5 inline-flex"
			>
				<div class="text-white text-[10px] font-normal font-['Open Sans']">
					{publication?.publication_type.data.attributes.type}
				</div>
			</div>
		</div>

		<!-- content -->
		<p class="max-w-5xl mx-auto prose">
			<SvelteMarkdown source={publication?.content} />
		</p>
	</div>

	<div class="flex items-center gap-4 flex-col max-w-72 mt-12">
		<ul class="w-full">
			{#each publication?.files.data || [] as file}
				<li class="list-disc p-2 w-full">
					<a
						href={`${PUBLIC_STATIC_URL}${file.attributes.url}`}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2"
					>
						<span class="text-primary">{file.attributes.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
