import React from "react";
import { client } from "../lib/sanityClient";

export default function About({ contact }) {
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

export async function getStaticProps() {
  const query = '*[_type == "contact"][0]';
  const contact = await client.fetch(query);

  return {
    props: {
      contact,
    },
  };
}
