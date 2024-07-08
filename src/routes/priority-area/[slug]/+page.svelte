<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Stackholders from '$lib/assets/icons/stackholders.svg.svelte';
	import Hero from '$lib/assets/publications/hero.jpg';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import PriorityAreas from '$lib/components/priority-areas/priority-areas.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';
	import { slide } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';

	export let data;

	$: priorityArea = data.data?.priorityArea;
	$: priorityAreas = data.data?.priorityAreas.data;

	$: filteredPriorityAreas = priorityAreas?.filter(
		(item) => item.attributes.title !== $page.params.title
	);
	let activeSubmenuId: string | undefined = undefined;
	let isOpen = false;
</script>

<svelte:head>
	<title>IGAD - {priorityArea?.attributes.title || ''}</title>
	<meta name="description" content={priorityArea?.attributes.shortDescription || ''} />
</svelte:head>

<div class="relative md:p-4">
	<section
		class="relative flex min-h-[674px] flex-col items-center justify-center bg-primary px-4 md:rounded-lg md:px-8"
	>
		<div class="mx-auto flex max-w-[1136px] items-center gap-28">
			<div class="max-w-3xl">
				<h1 class="mb-2 text-xl font-bold text-white">{priorityArea?.attributes.title}</h1>
				<p class="text-white">{priorityArea?.attributes.shortDescription}</p>
			</div>

			<img
				class="hidden md:inline-block"
				src="{PUBLIC_STATIC_URL}{priorityArea?.attributes.icon.data.attributes.url}"
				alt={priorityArea?.attributes.title}
				height="200"
				width="200"
			/>
		</div>
		<div
			class="absolute bottom-0 mx-auto w-full max-w-[1136px] overflow-y-visible px-4 pb-8 md:px-8"
		>
			<PriorityAreas priorityAreas={filteredPriorityAreas} />
		</div>
	</section>
</div>

<section
	class="relative mx-auto flex max-w-[1136px] flex-col-reverse items-start gap-8 px-4 py-10 md:flex-row lg:pl-8"
>
	<div class="ml-auto w-full max-w-5xl">
		<h2 class="mb-4 mt-4 scroll-mt-[136px] pb-2 text-3xl font-bold text-primary" id="header">
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
					<h2 class="scroll-mt-[136px] text-lg font-bold text-primary" id={action.ActionTitle}>
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
					<h2 class="scroll-mt-[136px] text-lg font-bold text-primary" id={action.ActionTitle}>
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
			<h1 class="scroll-mt-[136px] text-2xl font-bold" id="expected_outcome">Expected Outcomes</h1>

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
	<div class="sticky top-10 hidden w-full max-w-72 md:block">
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

	<div class="sticky top-0 w-full bg-white py-4 md:hidden">
		<h2 class="mb-4 pl-2 text-xl font-bold text-stone-900">{priorityArea?.attributes.title}</h2>

		<button
			on:click={() => (isOpen = !isOpen)}
			class="h-[48px] w-full rounded-md {!isOpen ? 'border' : ''} bg-white px-4 shadow-sm"
		>
			<p class="flex w-full items-center justify-between gap-4 text-primary-500">
				<span class="line-clamp-1 text-left text-sm font-medium leading-5 tracking-[0.4px]"
					>{activeSubmenuId ? activeSubmenuId : priorityArea?.attributes.title}</span
				>
				<ChevronDown
					class="h-5 w-5 transition-transform {isOpen ? 'rotate-90' : '-rotate-90'} fill-black"
				/>
			</p>
		</button>

		{#if isOpen}
			<div
				in:slide={{
					duration: 300,
					easing: quintOut
				}}
				out:slide={{
					duration: 200,
					easing: quintIn
				}}
				class="absolute left-0 right-0 grid rounded-b-md bg-white px-4 py-4 shadow-2xl"
			>
				<div class="border-l-2">
					<div class="-m-[2px] w-full">
						<div class=" mb-2 flex flex-col gap-2 border-l-2">
							<a
								href="#header"
								class=" {activeSubmenuId === priorityArea?.attributes.header
									? 'border-l-primary-500'
									: ''} -m-[2px] list-none border-l-2 px-4 text-left hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100"
								on:click={() => {
									activeSubmenuId = priorityArea?.attributes.header;
									isOpen = false;
								}}>{priorityArea?.attributes.header}</a
							>
						</div>
					</div>
					<div class="-m-[2px] w-full">
						<button
							class="text-primary' w-full border-l-2
								 px-4 text-left text-sm font-medium leading-normal tracking-[0.4px] text-primary-500 transition-all hover:cursor-pointer
								 {priorityArea?.attributes.IgadActions.some((action) => action.ActionTitle === activeSubmenuId)
								? 'border-l-primary-500'
								: ''}
								 "
						>
							<span class="">Action for IGAD</span>
						</button>

						<div class=" mx-4 mb-2 flex flex-col gap-2">
							{#each priorityArea?.attributes.IgadActions || [] as action}
								<a
									href="#{action.ActionTitle}"
									class="-m-[2px] list-none px-4 text-left hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100 {activeSubmenuId ===
									action.ActionTitle
										? 'border-l-primary-500'
										: ''}"
									on:click={() => {
										activeSubmenuId = action.ActionTitle;
										isOpen = false;
									}}
								>
									<span
										class="text-left text-sm transition-colors duration-300 ease-in-out hover:text-primary {activeSubmenuId ===
										action.ActionTitle
											? 'text-primary'
											: ''}">{action.ActionTitle.replaceAll('_', ' ')}</span
									>
								</a>
							{/each}
						</div>
					</div>
					<div class="-m-[2px] w-full">
						<button
							class="text-primary' w-full border-l-2
								 px-4 text-left text-sm font-medium leading-normal tracking-[0.4px] text-primary-500 transition-all hover:cursor-pointer
								 {priorityArea?.attributes.memberStateActions.some(
								(action) => action.ActionTitle === activeSubmenuId
							)
								? 'border-l-primary-500'
								: ''}
								 "
						>
							<span class="">Action for Member States</span>
						</button>

						<div class=" mx-4 mb-2 flex flex-col gap-2">
							{#each priorityArea?.attributes.memberStateActions || [] as action}
								<a
									href="#{action.ActionTitle}"
									class="-m-[2px] list-none px-4 text-left hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100 {activeSubmenuId ===
									action.ActionTitle
										? 'border-l-primary-500'
										: ''}"
									on:click={() => {
										activeSubmenuId = action.ActionTitle;
										isOpen = false;
									}}
								>
									<span
										class="text-left text-sm transition-colors duration-300 ease-in-out hover:text-primary {activeSubmenuId ===
										action.ActionTitle
											? 'text-primary'
											: ''}">{action.ActionTitle.replaceAll('_', ' ')}</span
									>
								</a>
							{/each}
						</div>
					</div>

					<div class="-m-[2px] w-full">
						<div class=" mb-2 flex flex-col gap-2 border-l-2">
							<a
								on:click={() => {
									activeSubmenuId = 'Expected Outcome';
									isOpen = false;
								}}
								href="#expected_outcome"
								class="{activeSubmenuId === 'Expected Outcome'
									? 'border-l-primary-500'
									: ''} -m-[2px] list-none border-l-2 px-4 text-left hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100"
								>Expected outcome</a
							>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
<div class=" mx-auto w-full max-w-[1136px] rounded bg-secondary p-8 text-black">
	<PriorityAreas priorityAreas={filteredPriorityAreas} />
</div>
