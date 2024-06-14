import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background-home.avif')" }}>
      <h1 className="flex text-blue-200 text-4xl font-bold m-4 text-center">
        Want Something Like This?
        <br /> Build Your Page Here!
      </h1>
      <p className="text-blue-200 text-2xl font-semibold m-6 text-center">
        Discover a seamless experience.
        <br />
        Start creating now.
      </p>
      <Link 
        className="mt-4 px-6 py-2 text-white bg-blue-600 rounded shadow-lg hover:bg-blue-700 cursor-pointer"
        href="/login"
      >
          Start Now
      </Link>
    </div>
  );
}
