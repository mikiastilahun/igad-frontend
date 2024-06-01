<script lang="ts">
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import Stackholders from '$lib/assets/icons/stackholders.svg.svelte';
	import Hero from '$lib/assets/publications/hero.jpg';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;

	const priorityArea = data.data?.priorityArea.data;
</script>

<section class="relative min-h-[674px] flex items-center rounded-lg bg-primary">
	<div class="max-w-7xl mx-auto flex items-center h-full gap-28">
		<div class="max-w-3xl">
			<h1 class="text-xl font-bold mb-2 text-white">{priorityArea?.attributes.Title}</h1>
			<p class="text-white">{priorityArea?.attributes.ShortDescription}</p>
		</div>

		<img
			src="{PUBLIC_STATIC_URL}{priorityArea?.attributes.icon.data.attributes.url}"
			alt={priorityArea?.attributes.Title}
			height="200"
			width="200"
		/>
	</div>
</section>

<section class="py-10 pl-8 flex gap-8 max-w-[1136px] mx-auto items-start relative">
	<div class="w-full max-w-5xl ml-auto">
		<h2 class="text-3xl font-bold text-primary mt-4 mb-4 pb-2" id="header">
			{priorityArea?.attributes.header}
		</h2>
		<!-- content -->
		<p class="prose w-full !max-w-full">
			<SvelteMarkdown source={priorityArea?.attributes.mainContent} />
		</p>

		<!-- IGAD ACTIONS -->
		<div class="mt-10">
			<h1 class="text-2xl font-bold mb-4">Actions for IGAD</h1>

			<div class="flex flex-col">
				{#each priorityArea?.attributes.IgadActions || [] as action}
					<h2 class="text-primary text-lg font-bold" id={action.ActionTitle}>
						{action.ActionTitle}
					</h2>
					<!-- ul with action.actionItemList -->
					<ul class=" border-gray-300 rounded-md p-4 mb-4">
						{#each action.actionItemList || [] as item}
							<li class="gap-2 list-disc">
								{item.item}
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
		<!-- MemberState ACTIONS -->
		<div class="mt-10">
			<h1 class="text-3xl font-bold mb-4">Actions for Member States</h1>

			<div class="flex flex-col">
				{#each priorityArea?.attributes.memberStateActions || [] as action}
					<h2 class="text-primary text-lg font-bold" id={action.ActionTitle}>
						{action.ActionTitle}
					</h2>
					<!-- ul with action.actionItemList -->
					<ul class=" border-gray-300 rounded-md p-4 mb-4">
						{#each action.actionItemList || [] as item}
							<li class="gap-2 list-disc">
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
				<ul class=" border-gray-300 rounded-md p-4 mb-4 list-disc list-outside">
					{#each priorityArea?.attributes.expectedOutcomes || [] as action}
						<!-- ul with action.actionItemList -->

						<li class="gap-2 list-disc">
							{action.item}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Stackholders and partners -->
		<div class="bg-secondary p-6 mb-4 rounded-md flex flex-col gap-4">
			<div>
				<h1 class="font-bold">
					<span class="flex gap-2 items-center"> <Stackholders />Stackholders</span>
				</h1>
				<div class="flex gap-2 font-light ml-7">
					{#each priorityArea?.attributes.stackholders || [] as stackholder}
						<a
							href={stackholder.url}
							class="
						hover:text-primary transition-colors duration-300 ease-in-out
						">{stackholder.label}</a
						>
						<span>
							{#if stackholder !== priorityArea?.attributes.stackholders[priorityArea?.attributes.stackholders.length - 1]}
								,
							{/if}
						</span>
					{/each}
				</div>
			</div>

			<div>
				<h1 class="font-bold">
					<span class="flex gap-2 items-center"> <Stackholders />Partners</span>
				</h1>
				<div class="flex gap-2 font-light ml-7">
					{#each priorityArea?.attributes.partners || [] as partner}
						<a
							href={partner.url}
							class="
						hover:text-primary transition-colors duration-300 ease-in-out
						">{partner.label}</a
						>
						<span>
							{#if partner !== priorityArea?.attributes.partners[priorityArea?.attributes.partners.length - 1]}
								,
							{/if}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- side nav with header selector-->
	<div class="w-full max-w-72 sticky top-10">
		<div class="flex flex-col">
			<a
				href="#header"
				class="border-l-2 hover:border-l-primary-700 px-3 transition-colors duration-300 ease-in-out hover:text-primary"
				>{priorityArea?.attributes.header}</a
			>

			<div class="py-4 border-l-2">
				<p class="px-3 pb-2 text-green-700 text-sm font-semibold">Action for IGAD</p>
				<ul class=" flex flex-col gap-2">
					{#each priorityArea?.attributes.IgadActions || [] as action}
						<li class="px-6 list-none border-l-2 hover:border-l-primary-700 -m-[2px]">
							<a
								href="#{action.ActionTitle}"
								class="hover:text-primary text-sm transition-colors duration-300 ease-in-out"
								>{action.ActionTitle}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<div class=" border-l-2">
				<p class="px-3 pb-2 text-green-700 text-sm font-semibold">Action for Member States</p>
				<ul class="flex flex-col gap-2">
					{#each priorityArea?.attributes.memberStateActions || [] as action}
						<li class="px-6 list-none border-l-2 hover:border-l-primary-700 -m-[2px]">
							<a
								href="#{action.ActionTitle}"
								class="hover:text-primary text-sm transition-colors duration-300 ease-in-out"
								>{action.ActionTitle}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<div class=" pt-4 border-l-2">
				<ul class="flex flex-col gap-2">
					<li class="px-3 list-none border-l-2 hover:border-l-primary-700 -m-[2px]">
						<a
							href="#expected_outcome"
							class="hover:text-primary text-sm transition-colors duration-300 ease-in-out"
							>Expected outcome</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
