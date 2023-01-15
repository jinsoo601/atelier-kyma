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
    <main>
      <div>E {contact.email}</div>
      <div>T {contact.phoneNumber}</div>
      <div>W {contact.website}</div>
      <div>A {contact.address}</div>
      <div>I @{contact.instagramName}</div>
    </main>
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
