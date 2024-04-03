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
    BackgroundImage: {
        data: {
            id: number,
            attributes: {
                name: string,
                width: number,
                height: number,
                url: string,
            }
        }
    }
};

type IconData = {
    id: number;
    attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: any | null;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any | null;
        createdAt: string;
        updatedAt: string;
    };
};

type Icon = {
    data: IconData[];
};

type PriorityArea = {
    id: number;
    title: string;
    description: string;
    icon: Icon;
};

type Attributes = {
    createdAt: string;
    updatedAt: string;
    homeHeroSection: HomeHeroSection[];
    firstStat: Stat;
    secondStat: Stat;
    thirdStat: Stat[];
    forthStat: Stat[];
    priorityAreas: PriorityArea[];
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
        const response = await fetch(`${PUBLIC_STRAPI_URL}/api/home?populate=homeHeroSection.BackgroundImage,firstStat,secondStat,thirdStat,forthStat,priorityAreas.icon`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return { data };
    } catch (e: unknown) {
        return { error: (e as Error).message };
    }
}