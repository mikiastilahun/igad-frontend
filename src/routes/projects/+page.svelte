<script>
	import Hero from '$lib/assets/publications/hero.jpg';
	import { PUBLIC_STATIC_URL } from '$env/static/public';
	import IGADLogo from '$lib/assets/igad-logo.png';
	import PageHeader from '$lib/components/_shared/page-header/page-header.svelte';

	export let data;

	const projects = data.projects.data;
</script>

<PageHeader
	imgSrc={Hero}
	imgAlt={'IGAD projects'}
	title={'Projects'}
	description={`Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
	vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
	aliquam. Sodales pulvinar facilisi donec facilisis`}
/>

<div class="max-w-[1136px] mx-auto p-4 relative flex gap-8 items-start">
	<!-- Main Content -->
	<div class="w-3/4 pl-8">
		{#each projects as project, i}
			{@const coverImage = project?.attributes?.cover_image.data?.attributes.url}
			<div id={`Background_project-${i}`} class="mb-8">
				<h2 class="text-2xl font-bold mb-4 text-primary-500">
					{project.attributes.name}
				</h2>
				<div class="my-8">
					<h3 class="text-lg font-semibold">Background</h3>
					<p class="text-gray-700 ck-content prose max-w-full">
						{@html project.attributes.project_background}
					</p>
				</div>
				<div class="relative rounded-lg shadow mb-8">
					<img
						src={`${coverImage ? `${PUBLIC_STATIC_URL}${coverImage}` : IGADLogo}`}
						alt={project.attributes.name}
						class="{coverImage
							? 'object-cover'
							: 'object-contain'} w-full h-full rounded-lg max-h-[400px] bg-primary-500"
					/>
					<div
						class="absolute bottom-0 top-0 bg-gradient-to-b from-transparent to-black p-4 w-full flex gap-4 justify-between items-end text-white"
					>
						<div class=" flex flex-wrap flex-col text-sm mb-2 max-w-prose gap-2">
							<p class="flex gap-2">
								<span class="text-secondary flex gap-2 items-center">
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
							<p class="flex gap-2 items-start">
								<span class="text-secondary flex gap-2 items-center"
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
							<p class="flex gap-2 items-start">
								<span class="text-secondary flex gap-2 items-center"
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
							<p class="flex gap-2 items-start">
								<span class="text-secondary flex gap-2 items-center"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-cash-stack"
										viewBox="0 0 16 16"
									>
										<path
											d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
										/>
										<path
											d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"
										/>
									</svg>
									Budget:
								</span>
								<span>{project.attributes.budget.toLocaleString()}</span>
							</p>
							<p class="flex gap-2 items-start">
								<span class="text-secondary flex gap-2 items-center"
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
						<a
							href={`${PUBLIC_STATIC_URL}${project.attributes?.files.data?.attributes.url}`}
							target="_blank"
							class=" w-fit inline-block bg-primary text-white rounded px-4 py-2 hover:bg-primary-600"
							>Download PDF</a
						>
					</div>
				</div>

				<div id={`Objectives_project-${i}`} class="mt-4">
					<h3 class="text-lg font-semibold">Objectives</h3>
					<p class="text-gray-700 ck-content prose max-w-full">
						{@html project.attributes.objectives}
					</p>
				</div>
				<div id={`Key_Outcomes_project-${i}`} class="mt-4">
					<h3 class="text-lg font-semibold">Key Outcomes</h3>
					<p class="text-gray-700 ck-content prose max-w-full">
						{@html project.attributes.key_outcomes}
					</p>
				</div>
				<div id={`Major_Activities_and_Achievements_project-${i}`} class="mt-4">
					<h3 class="text-lg font-semibold">Major Activities and Achievements</h3>
					<p class="text-gray-700 ck-content prose max-w-full">
						{@html project.attributes.major_activities_and_achievement}
					</p>
				</div>

				<!-- create a separator to show end of project  -->
				<div class="border-t border-gray-300 my-10"></div>
			</div>
		{/each}
	</div>

	<!-- Sidebar Navigation -->
	<div class="sticky top-10 w-1/4">
		<h2 class="text-xl text-stone-900 font-bold mb-4">Projects</h2>
		{#each projects as project, i}
			<div class="pb-4 border-l-2">
				<details class="group">
					<summary class="cursor-pointer list-none">
						<p class="px-3 pb-2 text-green-700 text-sm font-semibold group-hover:text-green-800">
							{project.attributes.name}
						</p>
					</summary>
					<ul class=" flex flex-col gap-2">
						{#each ['Background', 'Objectives', 'Key_Outcomes', 'Major_Activities_and_Achievements'] || [] as subTitles}
							<li class="px-6 list-none border-l-2 hover:border-l-primary-500 -m-[2px]">
								<a
									href="#{subTitles}_project-{i}"
									class="hover:text-primary text-sm transition-colors duration-300 ease-in-out"
									>{subTitles.replaceAll('_', ' ')}</a
								>
							</li>
						{/each}
					</ul>
				</details>
			</div>
		{/each}
	</div>
</div>
