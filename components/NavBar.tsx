import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { useState } from "react";

const selectedStyle =
  "after:block after:absolute after:h-0.5 after:w-full after:bg-black";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isSelected = (path: string) => router.pathname.startsWith(path);
  return (
    <nav className="sticky z-50 top-0 flex drop-shadow-lg bg-white p-2 items-center justify-between">
      <Logo />
      <div className="flex items-center">
        <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="hidden md:flex">
          <Link
            href="/about"
            className={`mx-6 relative ${isSelected("/about") && selectedStyle}`}
          >
            ABOUT
          </Link>
          <Link
            href="/artist"
            className={`mx-6 relative ${
              isSelected("/artist") && selectedStyle
            }`}
          >
            ARTIST
          </Link>
          <Link
            href="/exhibition"
            className={`mx-6 relative ${
              isSelected("/exhibition") && selectedStyle
            }`}
          >
            EXHIBITION
          </Link>
          <Link
            href="/contact"
            className={`mx-6 relative ${
              isSelected("/contact") && selectedStyle
            }`}
          >
            CONTACT
          </Link>
        </div>
      </div>
      <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
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
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col justify-end items-end p-6">
        <Link
          className={`text-xl font-medium my-2 relative ${
            isSelected("/about") && selectedStyle
          }`}
          href="/about"
          onClick={closeNav}
        >
          About
        </Link>
        <Link
          className={`text-xl font-medium my-2 relative ${
            isSelected("/artist") && selectedStyle
          }`}
          href="/artist"
          onClick={closeNav}
        >
          Artist
        </Link>
        <Link
          className={`text-xl font-medium my-2 relative ${
            isSelected("/exhibition") && selectedStyle
          }`}
          href="/exhibition"
          onClick={closeNav}
        >
          Exhibition
        </Link>
        <Link
          className={`text-xl font-medium my-2 relative ${
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
    <Link href="/about">
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
      className="z-50 flex relative w-6 h-6 flex-col justify-between items-center md:hidden mr-2"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span
        className={`h-1 w-full bg-black rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2.5" : ""
        }`}
      />
      <span
        className={`h-1 w-full bg-black rounded-lg transition-width duration-300 ease-in-out ${
          isOpen ? "w-0" : "w-full"
        }`}
      />
      <span
        className={`h-1 w-full bg-black rounded-lg transition duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-2.5" : ""
        }`}
      />
    </div>
  );
}
