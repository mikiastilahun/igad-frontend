<script lang="ts">
	import IGAD_LOGO from '$lib/assets/igad-logo.svg';
	import SearchIcon from '$lib/assets/icons/search.svg.svelte';
	import CaretDownIcon from '$lib/assets/icons/caret-down.svg.svelte';
	import BadgeIcon from '$lib/assets/icons/badge.svg.svelte';
	import TreeStructureIcon from '$lib/assets/icons/tree-structure.svg.svelte';
	import MenuDropdownItem from '../menu-dropdown-item/menu-dropdown-item.svelte';
	import { type ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import Team from '$lib/assets/nav/team.svg.svelte';
	import Partner from '$lib/assets/nav/partner.svg.svelte';
	import Mail from '$lib/assets/icons/mail.svg.svelte';
	import BookIcon from '$lib/assets/nav/book-search.svg.svelte';
	import EventIcon from '$lib/assets/nav/event.svg.svelte';
	import NewsIcon from '$lib/assets/nav/news.svg.svelte';
	import Badge from '$lib/assets/icons/badge.svg.svelte';
	import { clickOutside } from '$lib/actions/click-outside';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';
	import { bindCssVarToScrollDirection } from '$lib/actions/scroll-up.js';
	import { fly, scale } from 'svelte/transition';
	import { page } from '$app/stores';

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
					href: '/policies',
					icon: Badge,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Contact Us',
					href: 'https://igad.int/contact-us/',
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
			title: 'Support Areas',
			href: '/priority-area/Migration Governance'
		},
		{
			title: 'Support Platforms',
			href: 'https://igadsupportplatform.org/'
		},
		{
			title: 'Data and Statistics',
			href: '/statistics'
		},
		{
			title: 'Resources',
			subMenu: [
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
		class=" relative mx-auto hidden w-fit max-w-7xl transform-gpu gap-[var(--img-gap)] rounded-full bg-white transition-shadow duration-500 ease-in [box-shadow:var(--header-shadow)] lg:flex"
	>
		<a href="/">
			<img
				src={IGAD_LOGO}
				alt="Logo"
				class=" aspect-square h-[var(--img-h)] w-20 p-1 transition-all duration-500"
			/>
		</a>

		<div class="flex flex-row justify-between gap-4 py-4 xl:gap-8">
			<!-- logo and links -->
			<div class="  flex items-center gap-8">
				<nav class="flex h-full items-center gap-3 text-sm font-bold text-primary xl:gap-6">
					{#each navItems as nav, index}
						{@const isActive =
							nav.href === $page.url.pathname ||
							nav.subMenu?.some((item) => item.href === $page.url.pathname)}
						<div use:clickOutside={{ callback: () => (activeIndex = null) }}>
							{#if nav.subMenu}
								<a
									href={`${nav.href || '#'}`}
									class=" group/dropdown relative flex h-full items-center gap-2"
									on:mouseenter={() => {
										activeIndex = index;
									}}
								>
									<span class="hover-underline-animation relative">{nav.title}</span>
									<CaretDownIcon class="fill-primary" />
									<div
										class=" {activeIndex === index ? 'inline-flex' : 'hidden'} {index >=
										navItems.length - 2
											? 'right-0'
											: ''}  animate-slide absolute top-16 w-[400px] transform-gpu flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-md"
									>
										{#each nav?.subMenu || [] as item}
											<MenuDropdownItem href={item.href}>
												<span slot="icon">
													<svelte:component
														this={item.icon}
														class="h-6 w-6 fill-current group-hover:text-white"
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
									class="hover-underline-animation group/dropdown relative flex items-center gap-2"
								>
									{nav.title}
								</a>
							{/if}
						</div>
					{/each}
				</nav>
			</div>

			<!-- search -->
			<div class="relative mr-10 flex flex-shrink-0 items-center gap-4 xl:mr-20">
				<button class="">
					<SearchIcon />
				</button>
			</div>
		</div>
	</header>

	<!-- Hamburger menu -->
	<div class="relative z-50 flex justify-end pr-8 lg:hidden">
		<div
			class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-right shadow-lg lg:hidden"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				on:click={() => {
					isMobileOpen ? (isMobileOpen = false) : (isMobileOpen = true);
				}}
				on:keypress
				class=""
			>
				<div>
					<button class=" group relative">
						<div
							class="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full transition-all duration-200"
						>
							<div
								class="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300"
							>
								<div
									class="h-[2px] w-7 origin-left transform bg-primary transition-all duration-300 {isMobileOpen
										? 'translate-x-10'
										: ''}"
								/>
								<div
									class="h-[2px] w-7 transform rounded bg-primary transition-all duration-300 {isMobileOpen
										? 'translate-x-10'
										: ''} delay-75"
								/>
								<div
									class="h-[2px] w-7 origin-left transform bg-primary transition-all duration-300 {isMobileOpen
										? 'translate-x-10'
										: ''} delay-150"
								/>

								<div
									class="absolute top-2.5 -translate-x-10 transform items-center justify-between transition-all duration-500 {isMobileOpen
										? 'w-12 translate-x-0'
										: ''} flex w-0"
								>
									<div
										class="absolute h-[2px] w-5 transform bg-primary transition-all duration-500 {isMobileOpen
											? 'rotate-45'
											: 'rotate-0'} delay-300"
									/>
									<div
										class="absolute h-[2px] w-5 transform bg-primary transition-all delay-300 duration-500 {isMobileOpen
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
			class=" fixed inset-0 block h-screen w-full transform-gpu overflow-y-auto overflow-x-hidden rounded-md bg-primary/90 px-8 shadow-lg backdrop-blur-lg backdrop-saturate-200 lg:hidden"
		>
			<nav class=" flex h-full items-center justify-center">
				<ul class="grid w-full justify-items-start sm:max-w-48">
					{#each navItems as nav, index}
						{@const isActive =
							nav.href === $page.url.pathname ||
							nav.subMenu?.some((item) => item.href === $page.url.pathname)}
						<div class="w-full">
							{#if nav.subMenu}
								<li class=" w-full pt-6">
									<button
										on:click={() => {
											mobileActiveIndex ? (mobileActiveIndex = null) : (mobileActiveIndex = index);
										}}
										class="flex w-full items-center justify-between"
									>
										<span
											class="hover-underline-animation relative text-xl font-semibold {isActive
												? 'text-secondary-500'
												: 'text-white'}"
										>
											{nav.title}
										</span>
										<ChevronDown
											class="{mobileActiveIndex ? 'rotate-90' : '-rotate-90'} fill-white"
										/>
									</button>
									<ul
										class="{mobileActiveIndex === index
											? 'inline-flex'
											: 'hidden'}  transform-gpu flex-col gap-3 rounded-lg pl-4 pt-4"
									>
										{#each nav.subMenu || [] as subItem}
											<li class=" ">
												<a
													href={subItem.href || '#'}
													class="hover-underline-animation relative text-sm font-semibold {$page.url
														.pathname === subItem.href
														? 'text-secondary-500'
														: 'text-white'}">{subItem.title}</a
												>
											</li>
										{/each}
									</ul>
								</li>
							{:else}
								<li class=" pt-6">
									<a
										href={nav.href || '#'}
										title={nav.title || ''}
										class=" hover-underline-animation relative text-xl font-semibold {isActive
											? 'text-secondary-500'
											: 'text-white'}"
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
	@keyframes animate-slide {
		0% {
			transform: translateY(-64px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-slide {
		animation: animate-slide 300ms ease-out;
	}

	.hover-underline-animation {
		@apply after:absolute after:-bottom-1 after:block after:h-[2px] after:w-0 after:bg-secondary-500 after:transition-[width] after:duration-300 after:content-[''] after:hover:w-full;
	}
</style>
