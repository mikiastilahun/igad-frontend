import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type EventsData = {
	data: {
		id: number;
		attributes: {
			title: string;
			description: string;
			location: string;
			date: string;
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
	meta: any;
};

type ApiResponse = {
	eventData: EventsData;
};

export const load: Load = async ({ fetch, params }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const eventResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/events/${params.id}?populate=*`);

		console.log({ eventResponse });
		if (!eventResponse.ok) {
			throw new Error(`HTTP error! status: ${eventResponse.status}`);
		}

		const eventData = await eventResponse.json();

		const data: ApiResponse = {
			eventData: eventData
		};
		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
