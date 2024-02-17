<script lang="ts">
	import IGAD_LOGO from '$lib/assets/igad-logo.png';
	import SearchIcon from '$lib/assets/icons/search.svg.svelte';
	import CaretDownIcon from '$lib/assets/icons/caret-down.svg.svelte';

	let isExpanded = false;
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
				<a href="/#" class="flex gap-2 items-center">
					<span> Who we are </span>
					<CaretDownIcon />
				</a>
				<a href="/#" class="flex gap-2 items-center">
					<span> What we do </span>
					<CaretDownIcon />
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
			<button class="" on:click={() => (isExpanded = !isExpanded)}>
				<SearchIcon />
			</button>
		</div>
	</div>
</header>
