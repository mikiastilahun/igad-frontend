<script lang="ts">
	import type { DataType } from './chart-card.svelte';

	export let data: DataType = [];

	let columns: string[] = [];
	let tableData: { [s: string]: any } | ArrayLike<any> = [];

	// Make columns and tableData reactive
	$: {
		columns = Array.from(new Set(data.map((item) => item.group)));
		columns.unshift('Country');

		tableData = data.reduce((acc: { [key: string]: any }, item) => {
			if (!acc[item.key]) {
				acc[item.key] = { Country: item.key };
			}
			acc[item.key][item.group] = item.value;
			return acc;
		}, {});

		tableData = Object.values(tableData);
	}
	$: console.log({ columns, tableData, data });
</script>

<table class="w-full bg-white">
	<thead>
		<tr class="h-11 bg-gray-50 border-b border-gray-200">
			{#each columns as column}
				<th class="text-neutral-400 text-sm font-normal">{column}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.values(tableData) as row}
			<tr class="h-[72px] border-b border-gray-200">
				{#each Object.values(row) as cell}
					<td class="text-stone-500 text-xs text-center font-normal">{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
