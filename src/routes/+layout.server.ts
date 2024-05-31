import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

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
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const response = await fetch(`${PUBLIC_STRAPI_URL}/api/home?populate=quickLinks`);

		console.log({ response });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const quickLinks = await response.json();

		const data: ApiResponse = {
			quickLinks: quickLinks
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
