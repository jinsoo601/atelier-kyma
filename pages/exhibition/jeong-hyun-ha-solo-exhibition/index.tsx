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
			<div>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/1-1.jpeg"
					caption={`Draw without drawing 93, 2018, oil bar, oil pastel and acrylic color on canvas\n116cm x 74cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/1-2.jpeg"
					caption={`Draw without drawing 96, 2018, oil bar, oil pastel and acrylic color on canvas\n130cm x 88cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/1-3.jpeg"
					caption={`Draw without drawing 97, 2018, oil bar, oil pastel and acrylic color on canvas\n140cm x 80cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/1-4.jpeg"
					caption={`Draw without drawing 105, 2020, oil bar, oil pastel and acrylic color on canvas\n116.8cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/2-1.jpeg"
					caption={`Draw without drawing 114, 2022, oil bar, oil pastel and acrylic color on canvas\n91cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/2-2.jpeg"
					caption={`Draw without drawing 115, 2022, oil bar, oil pastel and acrylic color on canvas\n91cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/2-3.jpeg"
					caption={`Draw without drawing 116, 2022, oil bar, oil pastel and acrylic color on canvas\n91cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/2-4.jpeg"
					caption={`Draw without drawing 117, 2022, oil bar, oil pastel and acrylic color on canvas\n91cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/2-5.jpeg"
					caption={`Draw without drawing 118, 2022, oil bar, oil pastel and acrylic color on canvas\n91cm x 91cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/3-1.jpeg"
					caption={`Draw without drawing 124, 2022, oil bar, oil pastel and oil color on canvas\n192cm x 150cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/3-2.jpeg"
					caption={`Draw without drawing 125, 2022, oil bar, oil pastel and oil color on canvas\n162.2cm x 130.3cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/3-3.jpeg"
					caption={`Draw without drawing 126, 2022, oil bar, oil pastel and oil color on canvas\n162.2cm x 130.3cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/4-1.jpeg"
					caption={`Draw without drawing 119, 2022, oil bar, oil pastel and acrylic color on canvas\n88cm x 144cm`}
					isLong
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/4-2.jpeg"
					caption={`Draw without drawing 120, 2022, oil bar, oil pastel and acrylic color on canvas\n88cm x 144cm`}
					isLong
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/4-3.jpeg"
					caption={`Draw without drawing 121, 2022, oil bar, oil pastel and acrylic color on canvas\n140.5cm x 237cm`}
					isLong
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/4-4.jpeg"
					caption={`Draw without drawing 122, 2022, oil bar, oil pastel and acrylic color on canvas\n140.5cm x 238.5cm`}
					isLong
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/4-5.jpeg"
					caption={`Draw without drawing 123, 2022, oil bar, oil pastel and acrylic color on canvas\n140.5cm x 232.5cm`}
					isLong
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/5-3.jpeg"
					caption={`Draw without drawing 133, 2022, oil bar, oil pastel and oil color on canvas\n31.8cm x 31.8cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/5-4.jpeg"
					caption={`Draw without drawing 134, 2022, oil bar, oil pastel and oil color on canvas\n31.8cm x 31.8cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/5-5.jpeg"
					caption={`Draw without drawing 135, 2022, oil bar, oil pastel and oil color on canvas\n31.8cm x 31.8cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/5-6.jpeg"
					caption={`Draw without drawing 136, 2022, oil bar, oil pastel and oil color on canvas\n31.8cm x 31.8cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/6-1.jpeg"
					caption={`Treasure hunt 1, 2022,\nmixed media\n25cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/6-2.jpeg"
					caption={`Treasure hunt 3, 2022,\nmixed media\n25cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/6-3.jpeg"
					caption={`Treasure hunt 5, 2022,\nmixed media\n25cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/6-4.jpeg"
					caption={`Treasure hunt 7, 2022,\nmixed media\n25cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/6-5.jpeg"
					caption={`Treasure hunt 9, 2022,\nmixed media\n25cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-1.jpeg"
					caption={`Draw without drawing on paper 1, 2014 pencil on paper\n33cm x 24.5cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-2.jpeg"
					caption={`Draw without drawing on paper 4, 2014 pencil on paper\n33cm x 24.5cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-3.jpeg"
					caption={`Draw without drawing on paper 6, 2014 pencil on paper\n33cm x 24.5cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-4.jpeg"
					caption={`Draw without drawing on paper 13, 2018 oil pastel on paper\n22.5cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-5.jpeg"
					caption={`Draw without drawing on paper 18, 2018 pencil and oil pastel on paper\n22.5cm x 25cm`}
				/>
				<Painting
					src="/jeong-hyun-ha-solo-exhibition/7-6.jpeg"
					caption={`Draw without drawing on paper 18, 2018 oil pastel on paper\n22.5cm x 25cm`}
				/>
			</div>
			<small className="block text-end whitespace-nowrap">
				Copyright ©️ 2022 Jeong Hyun Ha, all rights reserved
			</small>
		</>
	);
}

function Painting({
	caption,
	src,
	isLong,
}: {
	caption: string;
	src: string;
	isLong?: boolean;
}) {
	return (
		<div className="text-center mb-12">
			<div
				className={`relative ${isLong ? 'h-80 md:h-[36rem]' : 'h-48 md:h-80'}`}
			>
				<Image
					src={src}
					alt="jeong-hyun-ha-solo-exhibition-painting"
					fill
					className="object-scale-down"
				/>
			</div>
			<small className="whitespace-pre-line">{caption}</small>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const query = `*[_type == "exhibition" && slug.current == "jeong-hyun-ha-solo-exhibition"][0]{name, startDate, endDate, description}`;
	const exhibitionDetail: ExhibitionDetail = await client.fetch(query);

	return {
		props: {
			exhibitionDetail,
		},
	};
};
