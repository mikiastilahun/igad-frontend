import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { PopulationStats } from '../+page.server.js';


export type AgeGroup = 'age 0-4' |
	'age 5-9' |
	'age 10-14' |
	'age 15-19' |
	'age 20-24' |
	'age 25-29' |
	'age 30-34' |
	'age 35-39' |
	'age 40-44' |
	'age 45-49' |
	'age 50-54' |
	'age 55-59' |
	'age 60-64' |
	'age 65-69' |
	'age 70-74' |
	'age 75-79' |
	'age 80+';
export type PopulationPerCountryStats = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Kenya: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			SouthSudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Eritrea: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Somalia: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Uganda: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Sudan: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			Djibouti: {
				year: string;
				male: number;
				female: number;
				age_group: AgeGroup;
			}[],
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
	meta: any;
}

export type MigrantsPerCountry = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Kenya: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			SouthSudan: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Eritrea: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Somalia: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Uganda: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Sudan: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			Djibouti: {
				id: number;
				year: string;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[],
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
			[key: string]: any;
		};
	};
	meta: any;
}

export type RemittancePerCountry = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Kenya: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			SouthSudan: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Eritrea: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Somalia: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Uganda: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Sudan: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			Djibouti: {
				id: number;
				year: string;
				amount: number;
				region: string
			}[],
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
	meta: any;
}

type Migrant = {
	male: number;
	female: number;
}
export type IGADRegionMigrants = {
	data: {
		id: number;
		attributes: {
			id: number;
			createdAt: string;
			updatedAt: string
			publishedAt: string
			migrant: {
				id: number;
				year: string;
				total: Migrant;
				migrants_15_plus: Migrant;
				labor_force_migrants: Migrant;
				youth_labor_force_migrants: Migrant;
			}[
			]
		}
	},
	meta: any;
}

type ApiResponseStats = {
	populationStats: PopulationStats;
	populationPerCountry: PopulationPerCountryStats;
	igadRegionMigrants: IGADRegionMigrants;
	migrantsPerCountry: MigrantsPerCountry;
	refugeesPerCountry: PopulationPerCountryStats;
	remittancePerCountry: RemittancePerCountry;
}
export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	try {
		const populationStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population?populate=*`);

		if (!populationStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const populationPerCountryStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population-per-country?populate=*`);

		if (!populationPerCountryStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const igadRegionMigrantsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/igad-region-migrant?populate=migrant.total,migrant.migrants_15_plus,migrant.labor_force_migrants,migrant.youth_labor_force_migrants`);

		if (!igadRegionMigrantsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const migrantsPerCountryResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/migrants-per-country?populate=Ethiopia.total,Ethiopia.migrants_15_plus,Ethiopia.labor_force_migrants,Ethiopia.youth_labor_force_migrants,Kenya.total,Kenya.migrants_15_plus,Kenya.labor_force_migrants,Kenya.youth_labor_force_migrants,SouthSudan.total,SouthSudan.migrants_15_plus,SouthSudan.labor_force_migrants,SouthSudan.youth_labor_force_migrants,Eritrea.total,Eritrea.migrants_15_plus,Eritrea.labor_force_migrants,Eritrea.youth_labor_force_migrants,Somalia.total,Somalia.migrants_15_plus,Somalia.labor_force_migrants,Somalia.youth_labor_force_migrants,Uganda.total,Uganda.migrants_15_plus,Uganda.labor_force_migrants,Uganda.youth_labor_force_migrants,Sudan.total,Sudan.migrants_15_plus,Sudan.labor_force_migrants,Sudan.youth_labor_force_migrants,Djibouti.total,Djibouti.migrants_15_plus,Djibouti.labor_force_migrants,Djibouti.youth_labor_force_migrants`);

		if (!migrantsPerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}


		const refugeesPerCountryResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/refugee?populate=*`);

		if (!refugeesPerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}


		const remittancePerCountryResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/remittance?populate=*`);

		if (!remittancePerCountryResponse.ok) {
			throw new Error(`HTTP error! status: ${remittancePerCountryResponse.status}`);
		}


		const data: ApiResponseStats = {
			populationStats: await populationStatsResponse.json(),
			populationPerCountry: await populationPerCountryStatsResponse.json(),
			igadRegionMigrants: await igadRegionMigrantsResponse.json(),
			migrantsPerCountry: await migrantsPerCountryResponse.json(),
			refugeesPerCountry: await refugeesPerCountryResponse.json(),
			remittancePerCountry: await remittancePerCountryResponse.json(),
		};


		return { data }
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};



