import type { Image as SanityImage, Slug } from '@sanity/types';

import { urlFor } from '../lib/sanityClient';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Heading from './Heading';

type Exhibition = {
	name: string;
	slug: Slug;
	posterImage: SanityImage;
	startDate: string;
};

type Props = {
	exhibition: Exhibition;
};

export default function NowShowing({
	exhibition: { name, slug, posterImage, startDate },
}: Props) {
	const today = new Date().toISOString().split('T')[0];
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsMobile(window.innerWidth < 768);
		}
	}, []);
	const heading = startDate > today ? 'UPCOMING' : 'NOW SHOWING';
	return (
		<div className="flex flex-col-reverse md:flex-row md:justify-center">
			<div className="flex flex-col justify-center items-start md:mr-4 mt-6 md:mt-0">
				<Heading value={heading} />
				<h1 className="text-2xl font-semibold whitespace-pre-line">
					{name.replaceAll('\\n', '\n')}
				</h1>
				<Link
					href={`/exhibition/${slug.current}`}
					className="inline-block text-lg font-medium border-2 border-black py-2 px-12 mt-6"
				>
					Details
				</Link>
			</div>
			<div className="relative w-full md:w-1/2 h-[50vh] md:h-[75vh] md:ml-4">
				<Image
					src={urlFor(posterImage).url()}
					alt={name + ' poster'}
					fill
					style={{
						objectFit: isMobile ? 'fill' : 'contain',
						objectPosition: isMobile ? 'center' : 'right',
					}}
				/>
			</div>
		</div>
	);
}
