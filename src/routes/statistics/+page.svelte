<script lang="ts">
	import Hero from '$lib/assets/statistics/hero.png';
	import Map from '$lib/components/leaflet/map.svelte';

	import RemittanceChart from '$lib/components/charts/remittance-chart.svelte';
	import RefugeesChart from '$lib/components/charts/refugees-chart.svelte';
	import MigrantsChart from '$lib/components/charts/migrants-chart.svelte';
	import MigrantsPerCountryChart, {
		type MigrantsType
	} from '$lib/components/charts/migrants-per-country-chart.svelte';
	import PopulationPerCountryChart, {
		type PopulationType
	} from '$lib/components/charts/population-per-country-chart.svelte';

	export let data;

	const populationStats = data.data?.populationStats.data.attributes;
	const populationPerCountry = data.data?.populationPerCountry.data.attributes;
	const igadRegionMigration = data.data?.igadRegionMigrants.data.attributes;
	const migrantsPerCountry = data.data?.migrantsPerCountry.data.attributes;
	const refugeesPerCountry = data.data?.refugeesPerCountry.data.attributes;
	const remittancePerCountry = data.data?.remittancePerCountry.data.attributes;

	const transformMigrantsPerCountry = (data: typeof migrantsPerCountry) => {
		let t: MigrantsType[] = [];

		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item: MigrantsType) => {
					t.push({
						country: country,
						labor_force_migrants: item.labor_force_migrants,
						migrants_15_plus: item.migrants_15_plus,
						youth_labor_force_migrants: item.youth_labor_force_migrants,
						year: item.year.split('-')[0],
						id: item.id
					});
				});
			}
		}

		return t;
	};

	const transformPopulationPerCountryData = (data: typeof populationPerCountry) => {
		let t: PopulationType[] = [];

		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item: PopulationType) => {
					t.push({
						age_group: item.age_group,
						male: item.male,
						female: item.female,
						country: country,
						year: item.year.split('-')[0],
						id: item.id
					});
				});
			}
		}

		return t;
	};

	const transformRefugeesPerCountryData = (data: any) => {
		let t: any[] = [];
		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item) => {
					t.push({
						country: country,
						age_group: item.age_group,
						male: item.male,
						female: item.female,
						year: item.year.split('-')[0]
					});
				});
			}
		}
		return t;
	};

	const transformRemittancePerCountryData = (data: any) => {
		// country, year, amount, region
		let transformedData: { country: string; region: string; amount: string; year: string }[] = [];
		for (let country in data) {
			if (Array.isArray(data[country])) {
				data[country].forEach((item) => {
					transformedData.push({
						country: country,
						region: item.region,
						amount: item.amount,
						year: item.year.split('-')[0]
					});
				});
			}
		}

		return transformedData;
	};

	// refugees

	let transformedRefugeesPerCountryData = transformRefugeesPerCountryData(refugeesPerCountry);

	// Remittance
	let transformedRemittancePerCountryData = transformRemittancePerCountryData(remittancePerCountry);
</script>

<div class="md:p-4">
	<section class="relative min-h-[674px] flex items-center rounded-lg">
		<img
			class="absolute inset-0 object-cover w-full h-full rounded-lg"
			alt={`publications hero image`}
			src={Hero}
		/>
		<div
			class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent rounded-lg"
		></div>
		<div class="relative max-w-[1136px] mx-auto w-full px-4 md:px-8">
			<div class="text-white max-w-2xl">
				<h1 class="text-3xl font-bold mb-2">Data and Statistics</h1>
				<p class=" text-base font-normal leading-normal">
					Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien
					vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien
					aliquam. Sodales pulvinar facilisi donec facilisis
				</p>
			</div>
		</div>
	</section>
</div>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-4">
	<h2 class="text-2xl font-bold leading-normal">Population</h2>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<div class="pt-8">
		<Map data={populationStats} />
	</div>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<PopulationPerCountryChart
		data={transformPopulationPerCountryData(populationPerCountry)}
		externalData={populationPerCountry}
		title="Population"
		isSwappable={true}
		chartType="line"
	/>
</section>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-4">
	<h2 class="text-2xl font-bold leading-normal">Migrants</h2>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<MigrantsChart
		data={igadRegionMigration?.migrant}
		title="Migrants"
		isSwappable={true}
		chartType="line"
	/>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<MigrantsPerCountryChart
		data={transformMigrantsPerCountry(migrantsPerCountry)}
		isSwappable={true}
		chartType="bar"
		title="Migrants per country"
	/>
</section>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-4">
	<h2 class="text-2xl font-bold leading-normal">Refugees</h2>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<RefugeesChart
		data={transformedRefugeesPerCountryData}
		isSwappable={true}
		title="Refugees"
		chartType="line"
	/>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
</section>

<section class="max-w-[1136px] mx-auto py-10 flex flex-col gap-3 px-4">
	<h2 class="text-2xl font-bold leading-normal">Remittance</h2>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
	<RemittanceChart
		isSwappable={true}
		data={transformedRemittancePerCountryData}
		title="Remittance"
		chartType="line"
	/>
	<p class="text-base leading-normal">
		Lorem ipsum dolor sit amet consectetur. Egestas nulla ullamcorper pretium sit nibh sapien vel
		phasellus eu. Aliquet facilisis enim dui ridiculus. Sit ipsum sollicitudin sapien aliquam.
		Sodales pulvinar facilisi donec facilisis.Lorem ipsum dolor sit amet consectetur. Egestas nulla
		ullamcorper pretium sit nibh sapien vel phasellus eu. Aliquet facilisis enim dui ridiculus. Sit
		ipsum sollicitudin sapien aliquam. Sodales pulvinar facilisi donec facilisis
	</p>
</section>
