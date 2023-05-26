import type { GetStaticProps } from 'next/types';
import type { Image as SanityImage, Slug } from '@sanity/types';

import { client, urlFor } from '../../lib/sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import NowShowing from '@/components/NowShowing';
import Heading from '@/components/Heading';

type Exhibition = {
	name: string;
	endDate: string;
	startDate: string;
	slug: Slug;
	posterImage: SanityImage;
};

type Props = {
	exhibitions: Exhibition[];
};

export default function Exhibition({ exhibitions }: Props) {
	const today = new Date().toISOString().split('T')[0];
	const currentExhibition = exhibitions.find(({ endDate }) => endDate >= today);
	const pastExhibitions = exhibitions.filter(({ endDate }) => endDate < today);
	return (
		<>
			{currentExhibition && <NowShowing exhibition={currentExhibition} />}
			<div className="mt-24 mb-12">
				<Heading value="Past Exhibitions" />
			</div>
			<div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
				{pastExhibitions.map(({ name, slug, posterImage }) => (
					<Link
						key={slug.current}
						href={`/exhibition/${slug.current}`}
						className="flex flex-col items-center transition-transform hover:scale-105 duration-500"
					>
						<Image
							src={urlFor(posterImage).width(400).height(574).url()}
							alt={name}
							width={400}
							height={574}
						/>
						<p className="font-semibold mt-2">{name}</p>
					</Link>
				))}
			</div>
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const query = `*[_type == "exhibition"]{name, slug, endDate, startDate, posterImage} | order(startDate desc)`;
	const exhibitions: Exhibition[] = await client.fetch(query);

	return {
		props: {
			exhibitions,
		},
	};
};
