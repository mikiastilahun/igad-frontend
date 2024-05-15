<script lang="ts">
	export const data = [
		// Ethiopia data
		{ group: 'Total', key: 'Ethiopia', value: 114963588 },
		{ group: 'Male', key: 'Ethiopia', value: 57370422 },
		{ group: 'Female', key: 'Ethiopia', value: 57693166 },
		// Djibouti data
		{ group: 'Total', key: 'Djibouti', value: 988002 },
		{ group: 'Male', key: 'Djibouti', value: 497002 },
		{ group: 'Female', key: 'Djibouti', value: 491000 },
		// Somalia data
		{ group: 'Total', key: 'Somalia', value: 15893222 },
		{ group: 'Male', key: 'Somalia', value: 7981611 },
		{ group: 'Female', key: 'Somalia', value: 7911611 },
		// Sudan data
		{ group: 'Total', key: 'Sudan', value: 43849260 },
		{ group: 'Male', key: 'Sudan', value: 21924630 },
		{ group: 'Female', key: 'Sudan', value: 21924630 },
		// Kenya data
		{ group: 'Total', key: 'Kenya', value: 53771296 },
		{ group: 'Male', key: 'Kenya', value: 26885648 },
		{ group: 'Female', key: 'Kenya', value: 26885648 },
		// Uganda data
		{ group: 'Total', key: 'Uganda', value: 45741007 },
		{ group: 'Male', key: 'Uganda', value: 22870503 },
		{ group: 'Female', key: 'Uganda', value: 22870504 }
	];

	let columns = Array.from(new Set(data.map((item) => item.group)));
	columns.unshift('Country');
	// TODO: find a better way to add the first column from the keys of the data

	let tableData = data.reduce((acc: { [key: string]: any }, item) => {
		if (!acc[item.key]) {
			acc[item.key] = { Country: item.key };
		}
		acc[item.key][item.group] = item.value;
		return acc;
	}, {});

	tableData = Object.values(tableData);
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
		{#each tableData as row}
			<tr class="h-[72px] border-b border-gray-200">
				{#each Object.values(row) as cell}
					<td class="text-stone-500 text-xs text-center font-normal">{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
