import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type NewsData = {
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

};

type ApiResponse = {
	newsData: NewsData;
};

export const load: Load = async ({ fetch, params }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const newsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/articles?slug=${params.slug}&populate=*`);

		if (!newsResponse.ok) {
			throw new Error(`HTTP error! status: ${newsResponse.status}`);
		}

		const newsData = await newsResponse.json();

		const data: ApiResponse = {
			newsData: newsData?.data[0]
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
