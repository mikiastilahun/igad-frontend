<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/_shared/footer/footer.svelte';
	import Header from '$lib/components/_shared/header/header.svelte';
	import '../app.postcss';
	import { bindCssVarToScrollDirection } from '$lib/actions/scroll-up';

	export let data;

	const quickLinks =
		data.data?.quickLinks.data.attributes.quickLinks.map((item) => ({
			label: item.label,
			href: item.url
		})) || [];

	$: currentUrl = $page.url;
</script>

<div
	class="  w-full z-30 transition-all duration-300 bg-primary {currentUrl.pathname === '/'
		? ''
		: 'md:rounded-b-lg'}"
>
	<div class="max-w-6xl mx-auto text-white text-sm font-semibold flex items-center gap-2 py-2">
		<div
			class="px-4 max-w-6xl mx-auto items-center justify-center gap-4 flex text-white bg-primary flex-row flex-wrap overflow-x-auto overflow-y-hidden whitespace-nowrap w-full top-0 z-10"
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

<div
	use:bindCssVarToScrollDirection={{
		downVars: () => ({ '--top': '-120px' }),
		upVars: () => ({ '--top': '0' })
	}}
	class="sticky z-50 top-[var(--top)] -mb-[78px] lg:-mb-[120px] w-full pt-8 transition-all duration-300"
>
	<Header />
</div>
<main class="relative z-0 min-h-screen bg-darkscale-100 text-white">
	<slot />
</main>
<Footer />

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

	.header-hidden {
		transform: translateY(-100%);
	}
	.hover-underline-animation:after {
		content: '';
		display: block;
		height: 2px;
		background: #ff9e00; /* Change this to your desired color */
		transition:
			width 0.3s ease,
			background-color 0.3s ease;
		width: 0;
	}
	.hover-underline-animation:hover:after {
		width: 100%;
	}
</style>
