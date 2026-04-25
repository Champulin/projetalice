"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export type NavTab = { label: string; href: string };

type NavbarProps = {
  tabs: NavTab[];
  isOpen: boolean;
  onToggle: () => void;
};

const tabBase = `
  rounded-full px-4 py-2 text-sm font-semibold
  w-full md:w-auto text-pastel-text
  transition-all duration-200
  hover:bg-pastel-secondary/20 hover:text-pastel-text
  focus:outline-none focus:ring-2 focus:ring-pastel-primary/40
`;

export default function Navbar({ tabs, isOpen, onToggle }: NavbarProps) {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex items-center justify-between py-4 px-4 shadow-md bg-gradient-to-r from-pastel-navbarStart to-pastel-navbarEnd">
        <div className="w-full md:max-w-[1440px] flex sm:mx-auto justify-between">
          {/* Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 sm:mx-12">
            <Image
              src="/images/chien.jpg"
              alt="Logo"
              fill
              className="object-cover rounded-lg border-2 border-white shadow"
            />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={onToggle}
            className="flex flex-col space-y-1 sm:hidden"
            aria-label="Open navigation menu"
          >
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </button>

          {/* Desktop tabs */}
          <div className="hidden sm:flex items-center gap-2">
            {tabs.map(({ label, href }) => (
              <button key={href} onClick={() => router.push(href)} className={tabBase}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-pastel-surface shadow-md flex flex-col gap-2">
          {tabs.map(({ label, href }) => (
            <button key={href} onClick={() => router.push(href)} className={tabBase}>
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
