<script>
	import Footer from '$lib/components/_shared/footer/footer.svelte';
	import Header from '$lib/components/_shared/header/header.svelte';
	import '../app.postcss';

	export let data;

	console.log({ data });

	const quickLinks =
		data.data?.quickLinks.data.attributes.quickLinks.map((item) => ({
			label: item.label,
			href: item.url
		})) || [];
</script>

<div class="absolute w-full top-0 z-20">
	<Header {quickLinks} />
</div>
<slot />
<Footer />
