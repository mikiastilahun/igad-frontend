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
				<a href="/#" class="flex gap-2 items-center relative group/dropdown">
					<span> Who we are </span>
					<CaretDownIcon />
					<!-- sub menu-items -->

					<MenuItemDropdown class="invisible group-focus/dropdown:visible">
						<MenuDropdownItems>
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Policies and Frameworks</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems>
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Governance Structure</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItem>
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
				<a href="/#" class="flex gap-2 items-center relative group/dropdown">
					<span> What we do </span>
					<CaretDownIcon />
					<!-- sub menu-items -->
					<MenuItemDropdown class="invisible group-focus/dropdown:visible">
						<MenuDropdownItems>
							<span slot="icon">
								<BadgeIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Policies and Frameworks</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItems>
							<span slot="icon">
								<TreeStructureIcon class="w-6 h-6 fill-current group-hover:text-white" />
							</span>
							<span slot="title">Governance Structure</span>
							<span slot="description"
								>Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus
								vestibulum.</span
							>
						</MenuDropdownItems>
						<MenuDropdownItem>
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
				<a href="/#" class="flex gap-2 items-center">
					<span> Platforms</span>
					<CaretDownIcon />
				</a>
				<a href="/#" class="flex gap-2 items-center">
					<span> Data and Statistics </span>
					<CaretDownIcon />
				</a>
				<a href="/#" class="flex gap-2 items-center">
					<span> Knowledge Base </span>
					<CaretDownIcon />
				</a>
				<a href="/#" class="flex gap-2 items-center">
					<span> News and Media </span>
					<CaretDownIcon />
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
