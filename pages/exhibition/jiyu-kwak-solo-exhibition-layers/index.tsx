import type { GetStaticProps } from 'next';
import type { TypedObject } from '@sanity/types';

import Image from 'next/image';
import { client } from '../../../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import components from '../../../components/ExhibitionComponents';

type ExhibitionDetail = {
	name: string;
	startDate: string;
	endDate: string;
	description: TypedObject[];
};

type Props = {
	exhibitionDetail: ExhibitionDetail;
};

export default function ExhibitionDetail({ exhibitionDetail }: Props) {
	const startDate = exhibitionDetail.startDate.replaceAll('-', '.');
	const endDate = exhibitionDetail.endDate.replaceAll('-', '.');
	return (
		<>
			<header className="text-xl font-semibold whitespace-pre-line">
				{exhibitionDetail.name.replace('\\n', '\n')}
			</header>
			<h5 className="text-base font-bold mt-4 mb-2">일시</h5>
			<p>
				{startDate} ~ {endDate}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
				<PortableText
					value={exhibitionDetail.description}
					components={components}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12 md:h-[360px]">
				<Painting
					src="/jiyu/1-1.jpg"
					caption="Untitled, 2019, Acrylic and charcoal on paper, 80x110cm"
				/>
				<Painting
					src="/jiyu/1-2.jpg"
					caption="Untitled, 2019, Acrylic and charcoal on paper, 80x110cm"
				/>
				<Painting
					src="/jiyu/1-3.jpg"
					caption="Untitled, 2019, Acrylic and charcoal on paper, 80x110cm"
				/>
				<Painting
					src="/jiyu/1-4.jpg"
					caption="Untitled, 2019, Acrylic and charcoal on paper, 80x110cm"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12 md:h-[360px]">
				<Painting
					src="/jiyu/2-1.jpg"
					caption="Layer 1, 2019, Acrylic on canvas, 80x100cm"
				/>
				<Painting
					src="/jiyu/2-2.jpg"
					caption="Layer 2, 2019, Oil, acrylic and charcoal on canvas, 80x100cm"
				/>
				<Painting
					src="/jiyu/2-3.jpg"
					caption="Layer 3, 2019, Acrylic on canvas, 80x100cm"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 my-12 md:h-[360px]">
				<Painting
					src="/jiyu/3-1.jpg"
					caption="In March_1, 2021, Oil on paper, 42x60cm"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 my-12 md:h-[360px]">
				<div />
				<Painting
					src="/jiyu/4-1.jpg"
					caption="Soap Bubble, 2019, Oil on canvas, 30x40cm"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 my-12 md:h-[360px]">
				<div />
				<div />
				<Painting
					src="/jiyu/5-1.png"
					caption="Pandemic Drawing_P, 2021, Acrylic on paper, 24x30cm"
				/>
				<Painting
					src="/jiyu/5-2.png"
					caption="Pandemic Drawing_P, 2021, Acrylic on paper, 24x30cm"
				/>
			</div>
			<small className="block text-end whitespace-nowrap">
				Copyright ©️ 2022 jiyukwak, all rights reserved
			</small>
		</>
	);
}

function Painting({ caption, src }: { caption: string; src: string }) {
	return (
		<div className="flex flex-col text-center gap-y-2 aspect-[3/4] md:aspect-auto">
			<div className="grow relative">
				<Image
					src={src}
					alt="jiyu-painting"
					fill
					className="object-scale-down"
				/>
			</div>
			<small>{caption}</small>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const query = `*[_type == "exhibition" && slug.current == "jiyu-kwak-solo-exhibition-layers"][0]{name, startDate, endDate, description}`;
	const exhibitionDetail: ExhibitionDetail = await client.fetch(query);

	return {
		props: {
			exhibitionDetail,
		},
	};
};
