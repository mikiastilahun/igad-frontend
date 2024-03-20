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
</script>

<header class="bg-white shadow-2xl rounded-full mt-5 max-w-7xl mx-auto">
	<div class=" px-12 py-4 flex flex-row justify-between gap-8">
		<!-- logo and links -->
		<div class="  flex gap-8">
			<a href="/">
				<img src={IGAD_LOGO} alt="Logo" class="h-12 w-12" />
			</a>
			<nav class="flex gap-8 items-center text-primary text-sm font-bold">
				<a href="/">
					<span>Home</span>
				</a>
				<a href="#" class=" flex gap-2 items-center relative group/dropdown">
					<span> Who we are </span>
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
					<span> What we do </span>
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
				<a href="#" class="flex gap-2 items-center relative group/dropdown">
					<span> Platforms</span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown>
						<MenuDropdownItems href="rcp">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">RCP</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="/support-platforms">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">IGAD Support Platform</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
					</MenuItemDropdown>
				</a>
				<a href="/#" class="flex gap-2 items-center relative group/dropdown">
					<span> Data and Statistics </span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown>
						<MenuDropdownItems href="/migration-stats">
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Migration Statistics</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems href="/forved-displacement-stats">
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Forced Displacement Statistics</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
					</MenuItemDropdown>
				</a>
				<a href="#" class="flex gap-2 items-center relative group/dropdown">
					<span> Knowledge Base </span>
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
