import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useState } from "react";

const selectedStyle =
  "after:block after:absolute after:top-0 after:-left-2 after:h-6 after:w-1/2 after:bg-mustard after:blur after:opacity-70";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isSelected = (path: string) => router.pathname.startsWith(path);
  return (
    <>
      <nav className="sticky z-50 h-[72px] top-0 py-2 md:p-2 flex bg-white items-center justify-between mx-4 md:mx-8 border-b-2 border-black/20">
        <Logo />
        <div className="flex items-center">
          <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="hidden md:flex">
            <Link
              href="/about"
              className={`ml-8 relative ${
                isSelected("/about") && selectedStyle
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/artist"
              className={`ml-8 relative ${
                isSelected("/artist") && selectedStyle
              }`}
            >
              ARTIST
            </Link>
            <Link
              href="/exhibition"
              className={`ml-8 relative ${
                isSelected("/exhibition") && selectedStyle
              }`}
            >
              EXHIBITION
            </Link>
            <Link
              href="/contact"
              className={`ml-8 relative ${
                isSelected("/contact") && selectedStyle
              }`}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </nav>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

function MobileNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeNav = () => setTimeout(() => setIsOpen(false), 100);
  const router = useRouter();
  const isSelected = (path: string) => router.pathname.startsWith(path);
  return (
    <div
      className={`fixed z-40 md:hidden top-[72px] left-0 h-[220px] w-screen bg-white drop transform transition-transform duration-500 ease-in-out ${
        isOpen ? "-translate-y-0 drop-shadow-lg" : "-translate-y-full"
      }`}
    >
      <div className="h-full flex flex-col justify-around items-end p-6">
        <Link
          className={`text-xl font-medium relative ${
            isSelected("/about") && selectedStyle
          }`}
          href="/about"
          onClick={closeNav}
        >
          About
        </Link>
        <Link
          className={`text-xl font-medium relative ${
            isSelected("/artist") && selectedStyle
          }`}
          href="/artist"
          onClick={closeNav}
        >
          Artist
        </Link>
        <Link
          className={`text-xl font-medium relative ${
            isSelected("/exhibition") && selectedStyle
          }`}
          href="/exhibition"
          onClick={closeNav}
        >
          Exhibition
        </Link>
        <Link
          className={`text-xl font-medium relative ${
            isSelected("/contact") && selectedStyle
          }`}
          href="/contact"
          onClick={closeNav}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Atelier Kyma Logo"
        width={200}
        height={50}
        priority
      />
    </Link>
  );
}

function MenuButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="z-50 flex relative w-5 h-5 flex-col justify-between md:hidden"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span
        className={`h-0.5 w-full bg-black rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2.5" : ""
        }`}
      />
      <span
        className={`h-0.5 w-full bg-black rounded-lg transition-width duration-300 ease-in-out ${
          isOpen ? "w-0" : "w-full"
        }`}
      />
      <span
        className={`h-0.5 bg-black rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "w-full -rotate-45 -translate-y-2" : "w-4/5"
        }`}
      />
    </div>
  );
}
