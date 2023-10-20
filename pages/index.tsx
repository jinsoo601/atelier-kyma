import type { GetStaticProps } from 'next/types';
import type { Image as SanityImage, Slug } from '@sanity/types';

import { client } from '../lib/sanityClient';
import NowShowing from '../components/NowShowing';

type Exhibition = {
	name: string;
	slug: Slug;
	posterImage: SanityImage;
	startDate: string;
	endDate: string;
};

type Props = {
	currentExhibition: Exhibition | null;
};

export default function Index({ currentExhibition }: Props) {
	if (!currentExhibition) {
		return null;
	}
	return <NowShowing exhibition={currentExhibition} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const today = new Date().toISOString().split('T')[0];
	const query = `*[_type == "exhibition" && endDate > "${today}"][0]{name, slug, posterImage, startDate, endDate}`;
	const currentExhibition: Exhibition | null = await client.fetch(query);

	return {
		props: {
			currentExhibition,
		},
	};
};
