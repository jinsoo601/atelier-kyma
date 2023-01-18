import NextHead from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Head() {
  const router = useRouter();
  let pageName = router.pathname.split("/")[1];
  pageName &&= `${pageName[0].toUpperCase()}${pageName.slice(1)}`;
  const title = pageName ? `${pageName} | Atelier Kyma` : "Atelier Kyma";
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </NextHead>
  );
}
