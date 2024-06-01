<script>
	import Footer from '$lib/components/_shared/footer/footer.svelte';
	import Header from '$lib/components/_shared/header/header.svelte';
	import '../app.postcss';
	import { onMount } from 'svelte';

	export let data;

	const quickLinks =
		data.data?.quickLinks.data.attributes.quickLinks.map((item) => ({
			label: item.label,
			href: item.url
		})) || [];

	let showHeader = false;
	let lastScrollTop = 0;

	function handleScroll() {
		let st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop) {
			// Scrolling down
			showHeader = false;
		} else {
			// Scrolling up
			if (st <= 100) {
				showHeader = true;
			} else {
				showHeader = false;
			}
		}
		lastScrollTop = st <= 0 ? 0 : st;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll, false);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div
	style="display: ${showHeader ? 'block' : 'none'}"
	class="sticky top-0 w-full z-30 transition-all duration-300 bg-primary {showHeader
		? 'block'
		: 'header-hidden hidden'}"
>
	<div class="max-w-6xl mx-auto text-white text-sm font-semibold flex items-center gap-2 py-2">
		<div
			class="px-4 max-w-6xl mx-auto items-center justify-center gap-4 hidden lg:flex text-white bg-primary flex-row flex-wrap overflow-x-auto overflow-y-hidden whitespace-nowrap w-full top-0 z-10"
		>
			<p>Quick links:</p>
			{#each quickLinks as link}
				<a
					href={link.href}
					class="relative transition-all duration-300 hover:border-transparent hover-underline-animation"
					>{link.label}</a
				>
			{/each}
		</div>
	</div>
</div>
<div class="absolute w-full top-4 z-20">
	<Header />
</div>
<slot />
<Footer />

<style>
	.header-hidden {
		transform: translateY(-100%);
		opacity: 0;
		visibility: hidden;
	}
	.hover-underline-animation:after {
		content: '';
		display: block;
		height: 2px;
		background: #ff9e00;
		transition:
			width 0.3s ease,
			background-color 0.3s ease;
		width: 0;
	}
	.hover-underline-animation:hover:after {
		width: 100%;
	}
</style>
