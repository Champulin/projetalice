import Image from "next/image";

export default function Home() {

  return (
    <div>
      {/* //Navbar */}
      <div className="bg-red-500 w-full h-10 flex py-6">
        {/* //LOGO alice */}
        <div className="flex justify-center items-center ml-4 ">
          <Image src="/images/chien.jpg" alt="Logo" width={100} height={100} className="w-10 h-10 rounded-full" />
        </div>
        {/* Navigation */}
        <div>
          {/* <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/mes-mascotes"></Link>
          <Link href="/contact">Contact</Link> */}
        </div>
      </div>
      {/* //Header */}
      <div className="bg-blue-500 w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-between w-full md:w-[48%] md:min-h-[650px] p-4 bg-green-200 rounded-lg shadow-lg p-4">
          <h1 className="text-white text-2xl font-bold">Alice & les chats</h1> 
        </div>
        {/* <p className="text-white text-2xl font-bold text-center">Alice est une fille qui aime les chiens et les chats    </p> */}
      </div>
      {/* //Main */}
      <div className="bg-green-500 w-full h-10 flex justify-center items-center">
        <h1 className="text-white text-2xl font-bold">Alice</h1>
      </div>
      {/* //Footer */}
      <div className="bg-yellow-500 w-full h-10 flex justify-center items-center">
        <h1 className="text-white text-2xl font-bold">Alice</h1>
      </div>
    </div>
  );
}
