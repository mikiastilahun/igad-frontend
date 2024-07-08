<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/_shared/footer/footer.svelte';
	import Header from '$lib/components/_shared/header/header.svelte';
	import '../app.postcss';
	import { bindCssVarToScrollDirection } from '$lib/actions/scroll-up';
	import Nprogress from '$lib/components/_shared/nprogress/nprogress.svelte';

	import Team from '$lib/assets/nav/team.svg.svelte';
	import Mail from '$lib/assets/icons/mail.svg.svelte';
	import BookIcon from '$lib/assets/nav/book-search.svg.svelte';
	import EventIcon from '$lib/assets/nav/event.svg.svelte';
	import NewsIcon from '$lib/assets/nav/news.svg.svelte';
	import Badge from '$lib/assets/icons/badge.svg.svelte';
	import TreeStructureIcon from '$lib/assets/icons/tree-structure.svg.svelte';

	export let data;

	const quickLinks =
		data.data?.quickLinks.data.attributes.quickLinks.map((item) => ({
			label: item.label,
			href: item.url
		})) || [];

	const priorityAreasLinks =
		data.data?.priorityAreasLinks.data.map((item) => ({
			title: item.attributes.title,
			slug: item.attributes.slug
		})) || [];

	const navItems = [
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
					href: '/policies',
					icon: Badge,
					description:
						'Lorem ipsum dolor sit amet consectetur. Quis in nunc bibendum elit tristique risus vestibulum fermentum'
				},
				{
					title: 'Contact Us',
					href: 'https://igad.int/contact-us/',
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
			title: 'Support Areas',
			href: `/priority-area/${priorityAreasLinks[0]?.slug}}`
		},
		{
			title: 'Support Platforms',
			href: 'https://igadsupportplatform.org/'
		},
		{
			title: 'Data and Statistics',
			href: '/statistics'
		},
		{
			title: 'Resources',
			subMenu: [
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

<Nprogress />
<div class="  } z-30 w-full bg-primary transition-all duration-300">
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
		downVars: () => ({ '--top': '-112px' }),
		upVars: () => ({ '--top': '0' }),
		onScroll: ({ direction, node, scrollY }) => {
			if (direction === 'down') {
				node.style.setProperty('--header-shadow', '0 0 #0000');
			} else {
				node.style.setProperty('--header-shadow', '0 25px 50px -12px rgb(0 0 0 / 0.25)');
			}

			if (scrollY < 70) {
				node.style.setProperty('--img-h', '80px');
			} else {
				node.style.setProperty('--img-h', '64px');
			}
		}
	}}
	class="sticky top-[var(--top)] z-50 -mb-[112px] h-[112px] w-full pt-8 transition-all duration-500"
>
	<Header {navItems} />
</div>

<main class="bg-darkscale-100 relative min-h-screen">
	<slot />
</main>
<Footer {priorityAreasLinks} {quickLinks} />

<style lang="postcss">
	.hover-underline-quick-links {
		@apply after:block after:h-[2px] after:w-0 after:bg-secondary-500 after:transition-[width] after:duration-300 after:content-[''] after:hover:w-full;
	}
</style>
