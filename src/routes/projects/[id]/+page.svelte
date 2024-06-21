<script lang="ts">
	import Hero from '$lib/assets/publications/hero.jpg';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import IGADLogo from '$lib/assets/igad-logo.png';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';
	import { slide } from 'svelte/transition';
	import { quintIn, quintOut } from 'svelte/easing';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	export let data;

	const project = data.projects.data;

	// let activeProjectId = selectedProject.id;
	let activeSubmenuId: null | string = null;

	$: coverImage = project?.attributes?.cover_image.data?.attributes.url;

	// mobile
	let isOpen = false;
</script>

<svelte:head>
	<title>IGAD - Projects</title>
	<meta
		name="description"
		content={`Explore IGAD projects and learn about their background, objectives, key outcomes, and major activities and achievements.`}
	/>
</svelte:head>

<PageHeader
	imgSrc={Hero}
	imgAlt={'IGAD projects'}
	title={'Projects'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
	vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
	aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<div
	class="relative mx-auto flex max-w-[1136px] flex-col-reverse items-start gap-8 p-4 md:flex-row"
>
	<!-- Main Content -->
	<div class="w-full md:w-3/4 md:pl-4 lg:pl-8">
		<div id={`Background`} class="mb-8 scroll-mt-[136px]">
			<h2 class="mb-4 text-2xl font-bold text-primary-500">
				{project.attributes.name}
			</h2>
			<div class="my-8">
				<h3 class="text-lg font-semibold">Background</h3>
				<p class="ck-content prose max-w-full text-gray-700">
					{@html project.attributes.project_background}
				</p>
			</div>
			<div class="relative mb-8 rounded-lg shadow">
				<img
					src={`${coverImage ? `${PUBLIC_STATIC_URL}${coverImage}` : IGADLogo}`}
					alt={project.attributes.name}
					class="{coverImage
						? 'object-cover'
						: 'object-contain'} h-full max-h-[400px] w-full rounded-lg bg-primary-500"
				/>
				<div
					class="absolute bottom-0 top-0 flex w-full flex-wrap items-end justify-between gap-4 bg-gradient-to-b from-transparent to-black p-4 text-white"
				>
					<div class=" mb-2 flex max-w-prose flex-col flex-wrap gap-2 text-sm">
						<p class="flex gap-2">
							<span class="flex items-center gap-2 text-nowrap text-secondary">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="feather feather-briefcase"
									><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path
										d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
									></path></svg
								>
								Implemented by:
							</span>
							<span>{project.attributes.implementing_organization}</span>
						</p>
						<p class="flex items-start gap-2">
							<span class="flex items-center gap-2 text-secondary"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="feather feather-globe"
									><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"
									></line><path
										d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
									></path></svg
								>
								Region:
							</span>
							<span>{project.attributes.region}</span>
						</p>
						<p class="flex items-start gap-2">
							<span class="flex items-center gap-2 text-secondary"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-bank"
									viewBox="0 0 16 16"
								>
									<path
										d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"
									/>
								</svg>
								Funded by:
							</span>
							<span>{project.attributes.funding_organization}</span>
						</p>
						<p class="flex items-start gap-2">
							<span class="flex items-center gap-2 text-secondary"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-cash-stack"
									viewBox="0 0 16 16"
								>
									<path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
									<path
										d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"
									/>
								</svg>
								Budget:
							</span>
							<span>{project.attributes.budget.toLocaleString()}</span>
						</p>
						<p class="flex items-start gap-2">
							<span class="flex items-center gap-2 text-secondary"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-calendar-week"
									viewBox="0 0 16 16"
								>
									<path
										d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
									/>
									<path
										d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
									/>
								</svg>
								Duration:
							</span>
							<span
								>{project.attributes.duration.from.split('-')[0]} to {project.attributes.duration.to.split(
									'-'
								)[0]}</span
							>
						</p>
					</div>
					{#if project.attributes?.files.data?.attributes.url}
						<a
							href={`${PUBLIC_STATIC_URL}${project.attributes?.files.data?.attributes.url}`}
							target="_blank"
							class=" inline-block w-fit rounded bg-primary px-4 py-2 text-white hover:bg-primary-600"
							>Download PDF</a
						>
					{/if}
				</div>
			</div>

			<div id={`Objectives`} class="mt-4 scroll-mt-[136px]">
				<h3 class="text-lg font-semibold">Objectives</h3>
				<p class="ck-content prose max-w-full text-gray-700">
					{@html project.attributes.objectives}
				</p>
			</div>
			<div id={`Key_Outcomes`} class="mt-4 scroll-mt-[136px]">
				<h3 class="text-lg font-semibold">Key Outcomes</h3>
				<p class="ck-content prose max-w-full text-gray-700">
					{@html project.attributes.key_outcomes}
				</p>
			</div>
			<div id={`Major_Activities_and_Achievements`} class="mt-4 scroll-mt-[136px]">
				<h3 class="text-lg font-semibold">Major Activities and Achievements</h3>
				<p class="ck-content prose max-w-full text-gray-700">
					{@html project.attributes.major_activities_and_achievement}
				</p>
			</div>
		</div>
	</div>

	<!-- Sidebar Navigation -->
	<div class="sticky top-10 hidden w-1/4 md:block">
		<h2 class="mb-4 text-xl font-bold text-stone-900">Project</h2>
		<div class="border-l-2">
			<div class="group">
				<button class=" peer -m-[2px] cursor-pointer list-none border-l-2 border-primary">
					<p
						class="  px-3 pb-2 text-left text-sm font-semibold text-green-700 underline group-hover:text-green-800"
					>
						{project.attributes.name}
					</p>
				</button>
				<div
					class=" flex flex-col gap-2"
					transition:slide={{
						duration: 300,
						easing: quintOut
					}}
				>
					{#each ['Background', 'Objectives', 'Key_Outcomes', 'Major_Activities_and_Achievements'] || [] as subTitles}
						<a
							href="#{subTitles}"
							class="-m-[2px] list-none border-l-2 px-6 text-left transition-colors duration-150 hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100 hover:text-primary-600 {activeSubmenuId ===
							subTitles
								? 'border-l-primary-500'
								: ''}"
							on:click={() => (activeSubmenuId = subTitles)}
						>
							<span
								class="text-left text-sm transition-colors duration-300 ease-in-out {activeSubmenuId ===
								subTitles
									? 'text-primary'
									: ''}">{subTitles.replaceAll('_', ' ')}</span
							>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="sticky top-0 w-full bg-white py-4 md:hidden">
		<h2 class="mb-4 pl-2 text-xl font-bold text-stone-900">Project</h2>

		<button
			on:click={() => (isOpen = !isOpen)}
			class="h-[48px] w-full rounded-md {!isOpen ? 'border' : ''} bg-white px-4 shadow-sm"
		>
			<p class="flex w-full items-center justify-between gap-4 text-primary-500">
				<span class="line-clamp-1 text-left text-sm font-medium leading-5 tracking-[0.4px]"
					>{project.attributes.name}</span
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
				<div class="w-full">
					<button
						class="text-primary' w-full border-l-2
							 border-l-primary-500 px-4 text-left text-sm font-medium leading-normal tracking-[0.4px] transition-all hover:cursor-pointer hover:border-l-primary-500 hover:text-primary"
					>
						<span class="">{project.attributes.name}</span>
					</button>

					<div class=" mb-2 flex flex-col gap-2 border-l-2">
						{#each ['Background', 'Objectives', 'Key_Outcomes', 'Major_Activities_and_Achievements'] || [] as subTitles}
							<a
								href="#{subTitles}"
								class="-m-[2px] list-none border-l-2 px-4 text-left hover:cursor-pointer hover:border-l-primary-500 hover:bg-secondary-100 {activeSubmenuId ===
								subTitles
									? 'border-l-primary-500'
									: ''}"
								on:click={() => {
									activeSubmenuId = subTitles;
									isOpen = false;
								}}
							>
								<span
									href="#{subTitles}"
									class="text-left text-sm transition-colors duration-300 ease-in-out hover:text-primary {activeSubmenuId ===
									subTitles
										? 'text-primary'
										: ''}">{subTitles.replaceAll('_', ' ')}</span
								>
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
