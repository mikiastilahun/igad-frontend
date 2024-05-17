import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { PopulationStats } from '../+page.server.js';

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	try {
		const populationStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population?populate=*`);

		if (!populationStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const populationStats = await populationStatsResponse.json();



		return populationStats as PopulationStats;
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
