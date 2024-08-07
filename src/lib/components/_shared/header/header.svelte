<script lang="ts">
	import IGAD_LOGO from '$lib/assets/igad-logo.svg';
	import SearchIcon from '$lib/assets/icons/search.svg.svelte';
	import MenuDropdownItem from '../menu-dropdown-item/menu-dropdown-item.svelte';
	import { type ComponentType } from 'svelte';

	import CaretDownIcon from '$lib/assets/icons/caret-down.svg.svelte';

	import { clickOutside } from '$lib/actions/click-outside';
	import ChevronDown from '$lib/assets/icons/chevron-down.svg.svelte';
	import { fade, scale } from 'svelte/transition';
	import { quadOut, quadIn } from 'svelte/easing';
	import { page } from '$app/stores';
	import Search from '$lib/components/search.svelte';

	let isSearchOpen = false;

	type NavType = {
		title: string;
		href?: string;
		icon?: ComponentType;
		description?: string;
	};

	export let navItems: (NavType & { subMenu?: NavType[] })[];

	let activeIndex: number | null = null;
	let mobileActiveIndex: number | null = null;
	let isMobileOpen = false;

	const handleClose = () => {
		isSearchOpen = false;
	};
</script>

{#if isSearchOpen}
	<Search on:close={handleClose} />
{/if}

<div class="">
	<header
		class=" relative mx-auto hidden w-full max-w-[calc(1024px-144px)] transform-gpu gap-4 rounded-full bg-white transition-shadow duration-500 ease-in [box-shadow:var(--header-shadow)] lg:flex xl:max-w-[1136px]"
	>
		<a href="/">
			<img
				src={IGAD_LOGO}
				alt="Logo"
				class=" h-[var(--img-h)] w-20 object-contain object-left p-1 transition-all duration-500 ease-out"
			/>
		</a>

		<div class="flex flex-1 flex-row justify-between py-4">
			<!-- links -->
			<nav
				class=" flex h-full flex-1 items-center justify-between gap-3 text-xs font-semibold text-primary xl:gap-6 xl:text-sm"
			>
				{#each navItems as nav, index}
					{@const isActive =
						nav.href === $page.url.pathname ||
						nav.subMenu?.some((item) => item.href === $page.url.pathname)}
					<div use:clickOutside={{ callback: () => (activeIndex = null) }}>
						{#if nav.subMenu}
							<a
								href={`${nav.href || '#'}`}
								class=" group/dropdown relative flex h-full items-center gap-1"
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
										<MenuDropdownItem
											target={item.href &&
											(item.href.startsWith('https://') || item.href.startsWith('www.'))
												? '_blank'
												: '_self'}
											href={item.href}
										>
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
								target={nav.href && (nav.href.startsWith('https://') || nav.href.startsWith('www.'))
									? '_blank'
									: '_self'}
							>
								{nav.title}
							</a>
						{/if}
					</div>
				{/each}
			</nav>

			<!-- search -->
			<div class="relative flex flex-shrink-0 items-center gap-4">
				<button
					on:click={() => (isSearchOpen = true)}
					class="flex w-20 items-center justify-center hover:cursor-pointer"
				>
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
			in:fade={{
				duration: 300,
				easing: quadOut
			}}
			out:fade={{
				duration: 300,
				easing: quadIn
			}}
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
													target={subItem.href &&
													(subItem.href.startsWith('https://') || subItem.href.startsWith('www.'))
														? '_blank'
														: '_self'}
													href={subItem.href || '#'}
													on:click={() => (isMobileOpen = false)}
													class="hover-underline-animation relative text-sm font-semibold {$page.url
														.pathname === subItem.href
														? 'text-secondary-500'
														: 'text-white'}"
													>{subItem.title}
												</a>
											</li>
										{/each}
									</ul>
								</li>
							{:else}
								<li class=" pt-6">
									<a
										target={nav.href &&
										(nav.href.startsWith('https://') || nav.href.startsWith('www.'))
											? '_blank'
											: '_self'}
										href={nav.href || '#'}
										title={nav.title || ''}
										class=" hover-underline-animation relative text-xl font-semibold {isActive
											? 'text-secondary-500'
											: 'text-white'}"
										on:click={() => (isMobileOpen = false)}
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
