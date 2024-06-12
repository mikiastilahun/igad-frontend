<script lang="ts">
	// define href as a prop
	let to = '';
	export { to as href };
</script>

<a
	href={to}
	class="group flex items-start justify-start gap-3 rounded-lg p-2 transition-colors hover:bg-primary/80"
>
	<span>
		<slot name="icon" />
	</span>
	<p class="flex flex-col">
		<span class="font-semibold text-zinc-900 group-hover:text-white">
			<slot name="title" />
		</span>
		<span class="text-xs font-normal text-gray-500 group-hover:text-gray-200">
			<slot name="description" />
		</span>
	</p>
</a>
