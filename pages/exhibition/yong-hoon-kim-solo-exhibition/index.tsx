import type { GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { TypedObject } from '@sanity/types';

import { PortableText } from '@portabletext/react';
import { client } from '../../../lib/sanityClient';
import components from '../../../components/exhibition/YonghookExhibitionComponents';

type ExhibitionDetail = {
	name: string;
	startDate: string;
	endDate: string;
	description: TypedObject[];
};

type Props = {
	exhibitionDetail: ExhibitionDetail;
};

type Params = ParsedUrlQuery & {
	slug: string;
};

export default function ExhibitionDetail({ exhibitionDetail }: Props) {
	return (
		<>
			<header className="text-xl font-semibold whitespace-pre-line">
				{exhibitionDetail.name.replace('\\n', '\n')}
			</header>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
				<PortableText
					value={exhibitionDetail.description}
					components={components}
				/>
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({}) => {
	const query = `*[_type == "exhibition" && slug.current == "yong-hoon-kim-solo-exhibition"][0]{name, startDate, endDate, description}`;
	const exhibitionDetail: ExhibitionDetail = await client.fetch(query);

	return {
		props: {
			exhibitionDetail,
		},
	};
};
