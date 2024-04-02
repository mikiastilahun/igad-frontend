import type { Load } from '@sveltejs/kit';
import { PUBLIC_STRAPI_URL } from '$env/static/public'

type Stat = {
    id: number;
    label: string;
    value: string;
};

type HomeHeroSection = {
    id: number;
    heroTitle: string;
    heroDescription: string;
};

type Attributes = {
    createdAt: string;
    updatedAt: string;
    homeHeroSection: HomeHeroSection[];
    firstStat: Stat;
    secondStat: Stat;
    thirdStat: Stat[];
    forthStat: Stat[];
    priorityAreas: any[];
};

type Data = {
    id: number;
    attributes: Attributes;
};

type ApiResponse = {
    data: Data;
    meta: any;
};


export const load: Load = async ({ fetch }) => {
    try {
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/home?populate=*`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return { data };
    } catch (e: unknown) {
        return { error: (e as Error).message };
    }
}