<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/_shared/footer/footer.svelte';
	import Header from '$lib/components/_shared/header/header.svelte';
	import '../app.postcss';
	import { bindCssVarToScrollDirection } from '$lib/actions/scroll-up';
	import Nprogress from '$lib/components/_shared/nprogress/nprogress.svelte';
	export let data;

	const quickLinks =
		data.data?.quickLinks.data.attributes.quickLinks.map((item) => ({
			label: item.label,
			href: item.url
		})) || [];

	$: currentUrl = $page.url;
</script>

<Nprogress />
<div
	class="  z-30 w-full bg-primary transition-all duration-300 {currentUrl.pathname === '/'
		? ''
		: 'md:rounded-b-lg'}"
>
	<div class="mx-auto flex max-w-6xl items-center gap-2 py-2 text-sm font-semibold text-white">
		<div
			class="top-0 z-10 mx-auto flex w-full max-w-6xl flex-row flex-wrap items-center justify-center gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap bg-primary px-4 text-white"
		>
			<p>Quick links:</p>
			{#each quickLinks as link}
				<a
					href={link.href}
					class="hover-underline-quick-links relative transition-all duration-300 hover:border-transparent"
					>{link.label}</a
				>
			{/each}
		</div>
	</div>
</div>

<div
	use:bindCssVarToScrollDirection={{
		downVars: () => ({ '--top': '-120px' }),
		upVars: () => ({ '--top': '0' }),
		onScroll: ({ direction, node, scrollY }) => {
			if (direction === 'down') {
				node.style.setProperty('--header-shadow', '0 0 #0000');
			} else {
				node.style.setProperty('--header-shadow', '0 25px 50px -12px rgb(0 0 0 / 0.25)');
			}

			if (scrollY < 120) {
				node.style.setProperty('--img-h', '80px');
			} else {
				node.style.setProperty('--img-h', '64px');
			}
		}
	}}
	class="sticky top-[var(--top)] z-50 -mb-[78px] h-[112px] w-full pt-8 transition-all duration-500 lg:-mb-[120px]"
>
	<Header />
</div>

<main class="bg-darkscale-100 relative z-0 min-h-screen">
	<slot />
</main>
<Footer />

<style lang="postcss">
	.hover-underline-quick-links {
		@apply after:block after:h-[2px] after:w-0 after:bg-secondary-500 after:transition-[width] after:duration-300 after:content-[''] after:hover:w-full;
	}
</style>
