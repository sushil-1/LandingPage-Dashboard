import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-700 font-semibold mb-6">
          Discover a seamless experience. Login to access your dashboard and manage your activities.
        </p>
        <Link href="/login">
          <p className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Login
          </p>
        </Link>
    </div>
  );
}
