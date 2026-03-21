"use client";

import { useState } from "react";
import Image from "next/image";
import { Tab, TabGroup, TabList } from "@headlessui/react";

const tabClass = `
  rounded-full px-4 py-2 text-sm font-semibold
  w-full md:w-auto
  text-pastel-text
  transition-all duration-200

  hover:bg-pastel-secondary/20
  hover:text-pastel-text

  data-selected:bg-pastel-primary
  data-selected:text-white
  data-selected:shadow-md

  focus:outline-none focus:ring-2 focus:ring-pastel-primary/40
`;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    "Accueil",
    "À propos",
    "Mes mascottes",
    "Contactez-moi",
  ];

  return (
    <div className="bg-pastel-bg min-h-screen text-pastel-text">

      {/* Navbar */}
      <div className="w-full flex items-center justify-between py-4 px-4 shadow-md bg-gradient-to-r from-pastel-navbarStart to-pastel-navbarEnd">

        {/* LOGO */}
        <Image
          src="/images/chien.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full border-2 border-white shadow"
        />

        {/* 🍔 Mobile ONLY */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-col space-y-1 md:hidden"
        >
          <span className="w-6 h-0.5 bg-white"></span>

          <span className="w-6 h-0.5 bg-white"></span>

          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* 💻 Desktop ONLY */}
        <div className="hidden sm:flex items-center">
          <TabGroup>
            <TabList className="flex items-center space-x-4 font-medium">
              {tabs.map((tab) => (
                <Tab key={tab} className={tabClass}>
                  {tab}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-pastel-surface shadow-md">
          <TabGroup>
            <TabList className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <Tab key={tab} className={tabClass}>
                  {tab}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      )}
      {/* Header */}
      <div className="w-full flex justify-center items-center bg-gradient-to-b from-pastel-bg to-pastel-surface py-16">

        <div className="flex flex-col items-center justify-between w-full md:w-[48%] md:min-h-[650px] p-8 bg-pastel-surface rounded-2xl shadow-lg border border-pastel-border">

          <h1 className="text-3xl font-bold">
            Alice & les chats
          </h1>

          <p className="text-pastel-muted text-center mt-4">
            Alice est une fille qui aime les chiens et les chats
          </p>

          <button className="mt-6 px-6 py-2 bg-pastel-primary text-white rounded-lg shadow hover:opacity-90">
            Découvrir
          </button>

        </div>

      </div>

      {/* Main */}
      <div className="w-full py-12 flex justify-center items-center">

        <div className="bg-pastel-secondary/20 px-8 py-6 rounded-xl shadow border border-pastel-border">

          <h1 className="text-2xl font-bold">
            Alice
          </h1>

        </div>

      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-pastel-secondary to-pastel-tertiary w-full py-6 flex justify-center items-center">

        <h1 className="text-white text-xl font-semibold">
          Alice
        </h1>

      </div>

    </div>
  );
}