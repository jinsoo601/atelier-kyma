import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import Head from "../components/Head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <NavBar />
      <main className="p-10 md:px-40">
        <Component {...pageProps} />
      </main>
    </>
  );
}
