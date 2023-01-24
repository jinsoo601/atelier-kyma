import type { GetStaticProps } from "next/types";
import type { Image as SanityImage, Slug } from "@sanity/types";

import React from "react";
import { client, urlFor } from "../lib/sanityClient";
import Link from "next/link";
import Image from "next/image";

type Contact = {
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  instagramName: string;
  image: SanityImage;
  hours: string;
};

type Props = {
  contact: Contact;
};

export default function About({ contact }: Props) {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="md:w-3/5">
        <h5 className="text-base font-bold mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          이메일 (Email)
        </h5>
        <p>{contact.email}</p>
        <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          전화 (Phone)
        </h5>
        <p>{contact.phoneNumber}</p>
        <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          웹 (Website)
        </h5>
        <Link href="/about">{contact.website}</Link>
        <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          주소 (Address)
        </h5>
        <p>{contact.address}</p>
        <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          인스타 (Instagram)
        </h5>
        <a href="https://www.instagram.com/atelierkyma/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-5 h-5 inline mr-1"
            style={{ color: "#c13584" }}
          >
            <path
              fill="currentColor"
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
          {contact.instagramName}
        </a>
        <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/3">
          영업시간 (Hours)
        </h5>
        <p className="whitespace-pre-line">{contact.hours}</p>
      </div>
      <div className="relative w-full aspect-[3/4] md:w-2/5">
        <Image
          src={urlFor(contact.image).url()}
          alt="Atelier Kyma image"
          fill
          style={{ objectFit: "contain", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = '*[_type == "contact"][0]';
  const contact: Contact = await client.fetch(query);

  return {
    props: {
      contact,
    },
  };
};
