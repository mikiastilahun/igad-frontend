import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public';

type Stat = {
	id: number;
	label: string;
	value: string;
};

// type IconData = {
// 	id: number;
// 	attributes: {
// 		name: string;
// 		alternativeText: string | null;
// 		caption: string | null;
// 		width: number;
// 		height: number;
// 		formats: any | null;
// 		hash: string;
// 		ext: string;
// 		mime: string;
// 		size: number;
// 		url: string;
// 		previewUrl: string | null;
// 		provider: string;
// 		provider_metadata: any | null;
// 		createdAt: string;
// 		updatedAt: string;
// 	};
// };

// type Icon = {
// 	data: IconData[];
// };

type PriorityAreas = {
	data: {
		id: number;
		attributes: {
			Title: string;
			ShortDescription: string;
			icon: {
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

type Partner = {
	Logo: {
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
	URL: string;
};

type Attributes = {
	createdAt: string;
	updatedAt: string;
	BackgroundImage: {
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
	firstStat: Stat;
	secondStat: Stat;
	thirdStat: Stat;
	forthStat: Stat;
	regionalStatisticsTitle: string;
	regionalStatisticsDescription: string;
	SupportplatformTitle: string;
	supportPlatformContent: string;
	partnersTitle: string;
	partner: Partner[];
};

type Data = {
	data: {
		id: number;
		attributes: Attributes;
	};
	meta: any;
};

type LearningData = {
	data: {
		id: number;
		attributes: {
			title: string;
			description: string;
			URL: string;
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
type NewsData = {
	data: {
		id: number;
		attributes: {
			title: string;
			content: string;
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
	}[];
	meta: any;
};

export type PopulationStats = {
	data: {
		id: number;
		attributes: {
			Ethiopia: {
				year: string;
				male: number;
				female: number;
			}[],
			Kenya: {
				year: string;
				male: number;
				female: number;
			}[],
			SouthSudan: {
				year: string;
				male: number;
				female: number;
			}[],
			Eritrea: {
				year: string;
				male: number;
				female: number;
			}[],
			Somalia: {
				year: string;
				male: number;
				female: number;
			}[],
			Uganda: {
				year: string;
				male: number;
				female: number;
			}[],
			Sudan: {
				year: string;
				male: number;
				female: number;
			}[],
			Djibouti: {
				year: string;
				male: number;
				female: number;
			}[],
			createdAt: string;
			updatedAt: string;
			publishedAt: string;
		};
	};
	meta: any;
}

type ApiResponse = {
	homeData: Data;
	learningData: LearningData;
	newsData: NewsData;
	priorityAreas: PriorityAreas;
	populationStats: PopulationStats;
};

export const load: Load = async ({ fetch }) => {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	console.log('in the load function');
	console.log({ PUBLIC_STRAPI_URL });

	try {
		const response = await fetch(
			`${PUBLIC_STRAPI_URL}/api/home?populate=BackgroundImage,firstStat,secondStat,thirdStat,forthStat,priorityAreas.icon,regionalStatisticsTitle,regionalStatisticsDescription,SupportplatformTitle,supportPlatformContent,partnersTitle,partner.URL,partner.Logo  
`
		);

		console.log({ response });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const learningResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/learning-links?populate=*`);

		console.log({ learningResponse });
		if (!learningResponse.ok) {
			throw new Error(`HTTP error! status: ${learningResponse.status}`);
		}

		const newsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/articles?populate=*`);

		console.log({ newsResponse });
		if (!newsResponse.ok) {
			throw new Error(`HTTP error! status: ${newsResponse.status}`);
		}

		const priorityAreasResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/priority-areas?populate=*`);

		if (!priorityAreasResponse.ok) {
			throw new Error(`HTTP error! status: ${priorityAreasResponse.status}`);
		}

		const populationStatsResponse = await fetch(`${PUBLIC_STRAPI_URL}/api/population?populate=*`);

		if (!populationStatsResponse.ok) {
			throw new Error(`HTTP error! status: ${populationStatsResponse.status}`);
		}

		const homeData = await response.json();
		const learningData = await learningResponse.json();
		const newsData = await newsResponse.json();
		const priorityAreas = await priorityAreasResponse.json();
		const populationStats = await populationStatsResponse.json();


		const data: ApiResponse = {
			homeData: homeData,
			learningData: learningData,
			newsData: newsData,
			priorityAreas: priorityAreas,
			populationStats: populationStats
		};

		return { data };
	} catch (e: unknown) {
		console.log({ e });
		return { error: (e as Error).message };
	}
};
