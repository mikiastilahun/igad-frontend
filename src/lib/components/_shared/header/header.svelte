<script lang="ts">
	import IGAD_LOGO from '$lib/assets/igad-logo.png';
	import SearchIcon from '$lib/assets/icons/search.svg.svelte';
	import CaretDownIcon from '$lib/assets/icons/caret-down.svg.svelte';
	import BadgeIcon from '$lib/assets/icons/badge.svg.svelte';
	import TreeStructureIcon from '$lib/assets/icons/tree-structure.svg.svelte';
	import MenuDropdownItem from '../menu-dropdown-item/menu-dropdown-item.svelte';
	import type { ComponentType } from 'svelte';
	import Team from '$lib/assets/nav/team.svg.svelte';
	import Partner from '$lib/assets/nav/partner.svg.svelte';
	import Mail from '$lib/assets/icons/mail.svg.svelte';
	import BookIcon from '$lib/assets/nav/book-search.svg.svelte';
	import EventIcon from '$lib/assets/nav/event.svg.svelte';
	import NewsIcon from '$lib/assets/nav/news.svg.svelte';
	import Badge from '$lib/assets/icons/badge.svg.svelte';
	import { clickOutside } from '$lib/actions/click-outside';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';

	type NavType = {
		title: string;
		href?: string;
		icon?: ComponentType;
		description?: string;
	};

	export let navItems: (NavType & { subMenu?: NavType[] })[] = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'About Us',
			subMenu: [
				{
					title: 'The Team',
					href: '/team',
					icon: Team,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Policies and Frameworks',
					href: '/team',
					icon: Badge,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Partners',
					href: '/partners',
					icon: Partner,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Contact Us',
					href: '/contact-us',
					icon: Mail,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				}
			]
		},
		{
			title: 'Projects',
			href: '/projects'
		},
		{
			title: 'Support Platforms',
			href: 'https://igadsupportplatform.org/'
		},
		{
			title: 'Data and Statistics',
			href: '/data-stats'
		},
		{
			title: 'Resources',
			subMenu: [
				{
					title: 'Policies and Frameworks',
					href: '/policies',
					icon: BadgeIcon,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Report and Publications',
					href: '/publications',
					icon: TreeStructureIcon,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Research and Learning',
					href: '/learning',
					icon: BookIcon,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				}
			]
		},
		{
			title: 'News and Events',
			subMenu: [
				{
					title: 'News',
					href: '/news',
					icon: NewsIcon,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Events',
					href: '/events',
					icon: EventIcon,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				}
			]
		}
	];

	let activeIndex: number | null = null;
	let mobileActiveIndex: number | null = null;
	let isMobileOpen = false;
</script>

<div class="">
	<header
		class="bg-white shadow-2xl rounded-full mt-8 w-fit max-w-6xl mx-auto hidden lg:flex gap-8"
	>
		<a href="/">
			<img src={IGAD_LOGO} alt="Logo" class="h-20 w-20 m-1" />
		</a>
		<div class="flex py-4 flex-row justify-between gap-4 xl:gap-8">
			<!-- logo and links -->
			<div class="  flex items-center gap-8">
				<nav class="h-full flex gap-5 xl:gap-8 items-center text-primary text-sm font-bold">
					{#each navItems as nav, index}
						<div use:clickOutside={{ callback: () => (activeIndex = null) }}>
							{#if nav.subMenu}
								<a
									href={`${nav.href || '#'}`}
									class=" h-full flex gap-2 items-center relative group/dropdown"
									on:mouseenter={() => {
										activeIndex = index;
									}}
								>
									{nav.title}
									<CaretDownIcon class="fill-primary" />
									<div
										class=" {activeIndex === index ? 'inline-flex' : 'hidden'} {index >=
										navItems.length - 2
											? 'right-0'
											: ''}  animate-slide transform-gpu absolute w-[400px] top-16 shadow-md border-gray-200 border bg-white p-4 rounded-lg flex-col items-center gap-3"
									>
										{#each nav?.subMenu || [] as item}
											<MenuDropdownItem href={item.href}>
												<span slot="icon">
													<svelte:component
														this={item.icon}
														class="w-6 h-6 fill-current group-hover:text-white"
													/>
												</span>
												<span slot="title">{item.title}</span>
												<span slot="description">{item.description}</span>
											</MenuDropdownItem>
										{/each}
									</div>
								</a>
							{:else}
								<a
									href={`${nav.href || '#'}`}
									class=" flex gap-2 items-center relative group/dropdown"
								>
									{nav.title}
								</a>
							{/if}
						</div>
					{/each}
				</nav>
			</div>

			<!-- search -->
			<div class="mr-10 xl:mr-20 flex-shrink-0 relative flex items-center gap-4">
				<button class="">
					<SearchIcon />
				</button>
			</div>
		</div>
	</header>

	<div class="lg:hidden flex justify-end pr-5 pt-5 relative z-50">
		<div
			class="lg:hidden flex justify-center items-center w-11 h-11 bg-white rounded-full text-right"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				on:click={() => {
					isMobileOpen ? (isMobileOpen = false) : (isMobileOpen = true);
				}}
				on:keypress
				class="text-gugut-text"
			>
				<div>
					<button class=" relative group">
						<div
							class="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200"
						>
							<div
								class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden"
							>
								<div
									class="bg-primary h-[2px] w-7 transform transition-all duration-300 origin-left {isMobileOpen
										? 'translate-x-10'
										: ''}"
								/>
								<div
									class="bg-primary h-[2px] w-7 rounded transform transition-all duration-300 {isMobileOpen
										? 'translate-x-10'
										: ''} delay-75"
								/>
								<div
									class="bg-primary h-[2px] w-7 transform transition-all duration-300 origin-left {isMobileOpen
										? 'translate-x-10'
										: ''} delay-150"
								/>

								<div
									class="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 {isMobileOpen
										? 'translate-x-0 w-12'
										: ''} flex w-0"
								>
									<div
										class="absolute bg-primary h-[2px] w-5 transform transition-all duration-500 {isMobileOpen
											? 'rotate-45'
											: 'rotate-0'} delay-300"
									/>
									<div
										class="absolute bg-primary h-[2px] w-5 transform transition-all duration-500 delay-300 {isMobileOpen
											? '-rotate-45'
											: '-rotate-0'}"
									/>
								</div>
							</div>
						</div>
					</button>
				</div>
			</span>
		</div>
	</div>

	{#if isMobileOpen}
		<div
			class="block lg:hidden fixed overflow-y-auto top-0 bottom-0 w-full h-auto bg-primary/90 backdrop-blur backdrop-saturate-200 shadow-lg rounded-md"
		>
			<nav class=" h-full flex justify-center items-center">
				<ul class="grid justify-items-start min-w-48">
					{#each navItems as nav, index}
						<div class="w-full">
							{#if nav.subMenu}
								<li class="pt-6 w-full">
									<button
										on:click={() => {
											mobileActiveIndex ? (mobileActiveIndex = null) : (mobileActiveIndex = index);
										}}
										class="flex justify-between w-full items-center"
									>
										<span class="text-lg font-semibold text-white">
											{nav.title}
										</span>
										<ChevronDown
											class="{mobileActiveIndex ? 'rotate-90' : '-rotate-90'} fill-white"
										/>
									</button>
									<ul
										class="{mobileActiveIndex === index
											? 'inline-flex'
											: 'hidden'} animate-slide transform-gpu p-4 rounded-lg flex-col gap-3"
									>
										{#each nav.subMenu || [] as subItem}
											<li class=" hover:scale-105 hover:transition">
												<a href={subItem.href || '#'} class="link text-sm font-semibold text-white"
													>{subItem.title}</a
												>
											</li>
										{/each}
									</ul>
								</li>
							{:else}
								<li class="pt-6 hover:scale-105 hover:transition">
									<a
										href={nav.href || '#'}
										title={nav.title || ''}
										class="link text-lg font-semibold text-white"
									>
										{nav.title}
									</a>
								</li>
							{/if}
						</div>
					{/each}
				</ul>
			</nav>
		</div>
	{/if}
</div>

<style>
	.link {
		position: relative;
		overflow: hidden;
	}

	.link::after {
		content: '';
		position: absolute;
		width: 100%;
		transform: scaleX(0);
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #fff;
		transform-origin: bottom right;
		transition: transform 0.3s ease-out;
	}

	.link:hover::after {
		transform: scaleX(1);
		transform-origin: bottom left;
	}
</style>
