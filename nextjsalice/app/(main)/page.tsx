import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-pastel-bg min-h-screen text-pastel-text">

      {/* Navbar */}
      <div className="bg-gradient-to-r from-pastel-navbarStart to-pastel-navbarEnd w-full flex py-6 shadow-md">

        {/* LOGO */}
        <div className="flex justify-center items-center ml-4">
          <Image
            src="/images/chien.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="w-10 h-10 rounded-full border-2 border-white shadow"
          />
        </div>

        {/* Navigation */}
        <div className="ml-6 flex items-center space-x-6 text-white font-medium">
          {/* <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/mes-mascotes"></Link>
          <Link href="/contact">Contact</Link> */}
        </div>

      </div>

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