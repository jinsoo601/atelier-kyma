import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Heading({ value }: { value: string }) {
  return <h5 className="text-sm font-medium opacity-70 mb-4">{value}</h5>;
}
