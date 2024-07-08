import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { PriorityAreas } from './+page.server.js';

type QuickLinks = {
	data: {
		id: number;
		attributes: {
			quickLinks: {
				label: string;
				url: string;
			}[];
		};
	};
	meta: any;
};

type ApiResponse = {
	quickLinks: QuickLinks;
	priorityAreasLinks: {
		data: {
			id: number;
			attributes: {
				Title: string;
			};
		}[];
		meta: any;
	};
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


	try {
		const response = await fetch(`${PUBLIC_STRAPI_URL}/api/home?populate=quickLinks`);

		console.log({ response });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const quickLinks = await response.json();


		const priorityAreasResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/priority-areas?fields[0]=title`);

		if (!priorityAreasResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreasResponse.status}`);
		}

		const priorityAreasLinks = await priorityAreasResponse.json();


		const data: ApiResponse = {
			quickLinks: quickLinks,
			priorityAreasLinks: priorityAreasLinks
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
