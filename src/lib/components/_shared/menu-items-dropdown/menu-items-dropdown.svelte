<script>
	let className = '';
	export { className as class };
	import { slide } from 'svelte/transition';
	import { elasticIn } from 'svelte/easing';
</script>

<div
	transition:slide={{
		axis: 'x',
		delay: 0,
		duration: 1500,
		easing: elasticIn
	}}
	class=" {className}  absolute w-[400px] top-16 shadow-md border-gray-200 border bg-white p-4 rounded-lg inline-flex flex-col items-center gap-3"
>
	<slot />
</div>
