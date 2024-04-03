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

	type NavType = {
		title: string;
		href: string;
		description?: string;
	};
	type NavItemsType = NavType & {
		subMenu?: (NavType & { description?: string })[];
	};

	export let navItems: NavItemsType[] = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'About Us',
			href: '/about',
			subMenu: [
				{
					title: 'The Team',
					href: '/team'
				},
				{
					title: 'Policies and Frameworks',
					href: ''
				},
				{
					title: 'Partners',
					href: ''
				},
				{
					title: 'Contact Us',
					href: ''
				}
			]
		},
		{
			title: 'Projects',
			href: '',
			subMenu: [
				{
					title: 'Our Priority Areas',
					href: '/',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				},
				{
					title: 'Projects',
					href: '/projects',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				}
			]
		},
		{
			title: 'Support Platforms',
			href: '/support-platforms'
		},
		{
			title: 'Data and Statistics',
			href: '/data'
		},
		{
			title: 'Resources',
			href: '',
			subMenu: [
				{
					title: 'Policies',
					href: '',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				},
				{
					title: 'Report and Publications',
					href: '/publications',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				},
				{
					title: 'Research and Learning',
					href: '/research-learning',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				}
			]
		},
		{
			title: 'News and Events',
			href: '',
			subMenu: [
				{
					title: 'News',
					href: '/news',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				},
				{
					title: 'Events',
					href: '/events',
					description: 'Lorem ipsum dolor sit amet consectetur.'
				}
			]
		}
	];
</script>

<header class="bg-white shadow-2xl rounded-full mt-8 max-w-6xl mx-auto flex">
	<a href="/">
		<img src={IGAD_LOGO} alt="Logo" class="h-20 w-20 m-1" />
	</a>
	<div class=" px-12 py-4 flex flex-row justify-between gap-8">
		<!-- logo and links -->
		<div class="  flex gap-8">
			<nav class="flex gap-8 items-center text-primary text-sm font-bold">
				<!-- {#each navItems as nav}
					<a href={`${nav.href}`} class=" flex gap-2 items-center relative group/dropdown">
						{nav.title}
						{#if nav.subMenu?.length !== 0}
							<CaretDownIcon />
							<MenuItemDropdown>
								{#each nav?.subMenu as item}
									<MenuDropdownItems href={item.href}>
										<span slot="icon">
											<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
										</span>
										<span slot="title">Our Priority Areas</span>
										<span slot="description"
											>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique
											risus vestibulum.</span
										>
									</MenuDropdownItems>
								{/each}
							</MenuItemDropdown>
						{/if}
					</a>
				{/each} -->
				<a href="/">
					<span>Home</span>
				</a>
				<a href="#" class=" flex gap-2 items-center relative group/dropdown">
					<span> About Us </span>
					<CaretDownIcon />
					<!-- sub menu-items -->

					<MenuItemDropdown>
						<MenuDropdownItems href="/policoies">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Policies and Frameworks</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="governance-structure">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Governance Structure</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItem href="/contact-us">
							<span slot="icon">
								<MailIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Contact Us</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItem>
					</MenuItemDropdown>
				</a>
				<a href="#" class="flex gap-2 items-center relative group/dropdown">
					<span> Projects </span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown>
						<MenuDropdownItems href="/our-priority">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Our Priority Areas</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="projects">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Projects</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
					</MenuItemDropdown>
				</a>
				<a
					href="https://igad.int/"
					target="_blank"
					class="flex gap-2 items-center relative group/dropdown"
				>
					<span> Support Platforms</span>
				</a>
				<a
					href="https://igad.int/"
					target="_blank"
					class="flex gap-2 items-center relative group/dropdown"
				>
					<span> Data and Statistics </span>
				</a>
				<a href="#" class="flex gap-2 items-center relative group/dropdown">
					<span>Resources </span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown class=" ">
						<MenuDropdownItems href="/policies">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Polices</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="report-and-publications">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Report and Publications</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="/research-and-learning">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Research and Learning</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
					</MenuItemDropdown>
				</a>
				<a href="#" class="flex gap-2 items-center relative group/dropdown">
					<span> News and Media </span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown class=" right-0">
						<MenuDropdownItems href="/news">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">News</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="/events">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Events</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
					</MenuItemDropdown>
				</a>
			</nav>
		</div>

		<!-- search -->
		<div class="flex-shrink-0 relative flex items-center gap-4">
			<button class="">
				<SearchIcon />
			</button>
		</div>
	</div>
</header>
