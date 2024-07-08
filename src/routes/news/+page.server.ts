import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type NewsData = {
	data: {
		id: number;
		attributes: {
			title: string;
			article: string;
			date: string;
			slug: string;
			createdAt: string;
			updatedAt: string;
			thumbnail: {
				data: {
					id: number;
					attributes: {
						name: string;
						width: number;
						height: number;
						url: string;
					};
				};
			};
		};
	}[];
	meta: any;
};

type ApiResponse = {
	newsData: NewsData;
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const newsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/articles?populate=*`);

		console.log({ newsResponse });
		if (!newsResponse.ok) {
			throw new Error(`HTTP error! status: ${newsResponse.status}`);
		}

		const newsData = await newsResponse.json();

		const data: ApiResponse = {
			newsData: newsData
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
