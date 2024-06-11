<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Stackholders from '$lib/assets/icons/stackholders.svg.svelte';
	import Hero from '$lib/assets/publications/hero.jpg';
	import PriorityAreas from '$lib/components/priority-areas/priority-areas.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	const priorityArea = data.data?.priorityArea.data;
	const priorityAreas = data.data?.priorityAreas.data;

	$: filteredPriorityAreas = priorityAreas?.filter((item) => item.id !== parseInt($page.params.id));
</script>

<svelte:head>
	<title>IGAD - {priorityArea?.attributes.Title || ''}</title>
	<meta name="description" content={priorityArea?.attributes.ShortDescription || ''} />
</svelte:head>

<div class="md:p-4">
	<section class="relative flex min-h-[674px] items-center rounded-lg bg-primary">
		<div class="mx-auto flex h-full max-w-7xl items-center gap-28">
			<div class="max-w-3xl">
				<h1 class="mb-2 text-xl font-bold text-white">{priorityArea?.attributes.Title}</h1>
				<p class="text-white">{priorityArea?.attributes.ShortDescription}</p>
			</div>

			<img
				src="{PUBLIC_STATIC_URL}{priorityArea?.attributes.icon.data.attributes.url}"
				alt={priorityArea?.attributes.Title}
				height="200"
				width="200"
			/>
			<div class="absolute bottom-0">
				<PriorityAreas priorityAreas={filteredPriorityAreas} />
			</div>
		</div>
	</section>
</div>

<section class="relative mx-auto flex max-w-[1136px] items-start gap-8 py-10 pl-8">
	<div class="ml-auto w-full max-w-5xl">
		<h2 class="mb-4 mt-4 pb-2 text-3xl font-bold text-primary" id="header">
			{priorityArea?.attributes.header}
		</h2>
		<!-- content -->
		<p class="prose w-full !max-w-full">
			<SvelteMarkdown source={priorityArea?.attributes.mainContent} />
		</p>

		<!-- IGAD ACTIONS -->
		<div class="mt-10">
			<h1 class="mb-4 text-2xl font-bold">Actions for IGAD</h1>

			<div class="flex flex-col">
				{#each priorityArea?.attributes.IgadActions || [] as action}
					<h2 class="text-lg font-bold text-primary" id={action.ActionTitle}>
						{action.ActionTitle}
					</h2>
					<!-- ul with action.actionItemList -->
					<ul class=" mb-4 rounded-md border-gray-300 p-4">
						{#each action.actionItemList || [] as item}
							<li class="list-disc gap-2">
								{item.item}
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
		<!-- MemberState ACTIONS -->
		<div class="mt-10">
			<h1 class="mb-4 text-3xl font-bold">Actions for Member States</h1>

			<div class="flex flex-col">
				{#each priorityArea?.attributes.memberStateActions || [] as action}
					<h2 class="text-lg font-bold text-primary" id={action.ActionTitle}>
						{action.ActionTitle}
					</h2>
					<!-- ul with action.actionItemList -->
					<ul class=" mb-4 rounded-md border-gray-300 p-4">
						{#each action.actionItemList || [] as item}
							<li class="list-disc gap-2">
								{item.item}
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
		<!-- Expected Outcomes -->
		<div class="mt-10">
			<h1 class="text-2xl font-bold" id="expected_outcome">Expected Outcomes</h1>

			<div class="flex flex-col">
				<ul class=" mb-4 list-outside list-disc rounded-md border-gray-300 p-4">
					{#each priorityArea?.attributes.expectedOutcomes || [] as action}
						<!-- ul with action.actionItemList -->

						<li class="list-disc gap-2">
							{action.item}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Stackholders and partners -->
		<div class="mb-4 flex flex-col gap-8 rounded-md bg-secondary p-6">
			<div class="grid gap-3">
				<h1 class="text-lg font-bold">
					<span class="flex items-center gap-2"> <Stackholders />Stackholders</span>
				</h1>
				<div class="ml-7 flex flex-wrap gap-2">
					{#each priorityArea?.attributes.stackholders || [] as stackholder}
						<a
							href={stackholder.url}
							class="
							text-nowrap text-stone-900 transition-colors duration-300 ease-in-out hover:text-primary
						">{stackholder.label}</a
						>
						{#if stackholder !== priorityArea?.attributes.stackholders[priorityArea?.attributes.stackholders.length - 1]}
							<div class="font-['Open Sans'] text-base font-normal text-stone-900">•</div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="grid gap-3">
				<h1 class="text-lg font-bold">
					<span class="flex items-center gap-2"> <Stackholders />Partners</span>
				</h1>
				<div class="ml-7 flex flex-wrap gap-2">
					{#each priorityArea?.attributes.partners || [] as partner}
						<a
							href={partner.url}
							class="
							text-nowrap text-stone-900 transition-colors duration-300 ease-in-out hover:text-primary
						">{partner.label}</a
						>
						{#if partner !== priorityArea?.attributes.partners[priorityArea?.attributes.partners.length - 1]}
							<div class="font-['Open Sans'] text-base font-normal text-stone-900">•</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- side nav with header selector-->
	<div class="sticky top-10 w-full max-w-72">
		<div class="flex flex-col">
			<a
				href="#header"
				class="border-l-2 px-3 text-stone-900 transition-colors duration-300 ease-in-out hover:border-l-primary-600 hover:text-primary"
				>{priorityArea?.attributes.header}</a
			>

			<div class="border-l-2 py-4">
				<p class="px-3 pb-2 text-sm font-semibold text-green-600">Action for IGAD</p>
				<ul class=" flex flex-col gap-2">
					{#each priorityArea?.attributes.IgadActions || [] as action}
						<li class="-m-[2px] list-none border-l-2 px-6 hover:border-l-primary-600">
							<a
								href="#{action.ActionTitle}"
								class="text-sm text-stone-900 transition-colors duration-300 ease-in-out hover:text-primary"
								>{action.ActionTitle}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<div class=" border-l-2">
				<p class="px-3 pb-2 text-sm font-semibold text-green-600">Action for Member States</p>
				<ul class="flex flex-col gap-2">
					{#each priorityArea?.attributes.memberStateActions || [] as action}
						<li class="-m-[2px] list-none border-l-2 px-6 hover:border-l-primary-600">
							<a
								href="#{action.ActionTitle}"
								class="text-sm text-stone-900 transition-colors duration-300 ease-in-out hover:text-primary"
								>{action.ActionTitle}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<div class=" border-l-2 pt-4">
				<ul class="flex flex-col gap-2">
					<li class="-m-[2px] list-none border-l-2 px-3 hover:border-l-primary-600">
						<a
							href="#expected_outcome"
							class="text-sm transition-colors duration-300 ease-in-out hover:text-primary"
							>Expected outcome</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
<div class="mx-4 rounded bg-secondary p-8 text-black">
	<PriorityAreas priorityAreas={filteredPriorityAreas} />
</div>
