import type { GetStaticProps } from "next/types";

import React from "react";
import { client } from "../lib/sanityClient";

type Contact = {
  email: string;
  phoneNumber: string;
  website: string;
  address: string;
  instagramName: string;
};

type Props = {
  contact: Contact;
};

export default function About({ contact }: Props) {
  return (
    <>
      <h5 className="text-base font-bold mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/4">
        이메일 (Email)
      </h5>
      <p>{contact.email}</p>
      <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/4">
        전화 (Phone)
      </h5>
      <p>{contact.phoneNumber}</p>
      <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/4">
        웹 (Website)
      </h5>
      <p>{contact.website}</p>
      <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/4">
        주소 (Address)
      </h5>
      <p>{contact.address}</p>
      <h5 className="text-base font-bold mt-4 mb-2 border-b-4 border-slate-300 w-2/3 md:w-1/4">
        인스타 (Instagram)
      </h5>
      <p>@{contact.instagramName}</p>
    </>
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
