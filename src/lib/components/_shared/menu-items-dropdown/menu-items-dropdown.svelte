<script>
	let className = '';
	export { className as class };
</script>

<div
	class=" {className} hidden group-focus/dropdown:inline-flex animate-slide transform-gpu absolute w-[400px] top-16 shadow-md border-gray-200 border bg-white p-4 rounded-lg flex-col items-center gap-3"
>
	<slot />
</div>
