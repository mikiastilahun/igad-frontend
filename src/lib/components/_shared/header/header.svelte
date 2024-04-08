<script lang="ts">
	import IGAD_LOGO from '$lib/assets/igad-logo.png';
	import SearchIcon from '$lib/assets/icons/search.svg.svelte';
	import CaretDownIcon from '$lib/assets/icons/caret-down.svg.svelte';
	import BadgeIcon from '$lib/assets/icons/badge.svg.svelte';
	import MailIcon from '$lib/assets/icons/mail.svg.svelte';
	import TreeStructureIcon from '$lib/assets/icons/tree-structure.svg.svelte';
	import MenuDropdownItems from '../menu-dropdown-item/menu-dropdown-item.svelte';
	import MenuItemDropdown from '../menu-items-dropdown/menu-items-dropdown.svelte';
	import MenuDropdownItem from '../menu-dropdown-item/menu-dropdown-item.svelte';
	import type { ComponentType } from 'svelte';
	import Team from '$lib/assets/nav/team.svg.svelte';
	import Partner from '$lib/assets/nav/partner.svg.svelte';
	import Mail from '$lib/assets/icons/mail.svg.svelte';
	import BookIcon from '$lib/assets/nav/book-search.svg.svelte';
	import EventIcon from '$lib/assets/nav/event.svg.svelte';
	import NewsIcon from '$lib/assets/nav/news.svg.svelte';
	import Badge from '$lib/assets/icons/badge.svg.svelte';

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
			href: '/support-platform'
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
</script>

<header class="bg-white shadow-2xl rounded-full mt-8 w-fit max-w-6xl mx-auto flex gap-8">
	<a href="/">
		<img src={IGAD_LOGO} alt="Logo" class="h-20 w-20 m-1" />
	</a>
	<div class="  py-4 flex flex-row justify-between gap-4 xl:gap-8">
		<!-- logo and links -->
		<div class="  flex items-center gap-8">
			<nav class="flex gap-5 xl:gap-8 items-center text-primary text-sm font-bold">
				{#each navItems as nav}
					<a href={`${nav.href || '#'}`} class=" flex gap-2 items-center relative group/dropdown">
						{nav.title}
						{#if nav.subMenu}
							<CaretDownIcon />
							<MenuItemDropdown>
								{#each nav?.subMenu || [] as item}
									<MenuDropdownItems href={item.href}>
										<span slot="icon">
											<svelte:component
												this={item.icon}
												class="w-6 h-6 fill-current group-hover:text-white"
											/>
										</span>
										<span slot="title">{item.title}</span>
										<span slot="description">{item.description}</span>
									</MenuDropdownItems>
								{/each}
							</MenuItemDropdown>
						{/if}
					</a>
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
