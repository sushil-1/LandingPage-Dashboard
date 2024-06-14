'use client'
import { useEffect, useState } from "react";
import Table from "../../ui/Table";
import { useRouter } from "next/navigation";
import { fetchAllLandingPages } from "../../lib/data";
import ProtectedLayout from "../../ProtectedLayout";
import { Page } from "../../lib/type";
import Link from "next/link";

const Dashboard = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await fetchAllLandingPages();
        setPages(pages);
      } catch (error) {
        setError('Error fetching pages. Please try again later.');
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('auth');
      alert('You have been logged out successfully.');
      router.replace('/');
    }
  };

  return (
    <ProtectedLayout>
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to your dashboard! Here, you can create and manage your landing pages with ease. 
            Use the button below to create a new landing page or manage your existing ones.
          </p>
        </div>
        <button
            onClick={handleLogout}
            className="absolute top-4 right-4 md:right-8 px-2 py-1 md:px-4 md:py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            title="Log out from account"
          >
            Logout
          </button>
          <Link href="/create" className="mb-8 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600" title="Create a new landing page">
            Create New Landing Page
          </Link>
        {loading ? (
          <div className="flex flex-col items-center">
            
            <p className="mt-4 font-semibold">Loading your landing pages...</p>
          </div>
        ) : error ? (
          <div className="mt-12 font-semibold text-red-500">{error}</div>
        ) : pages.length === 0 ? (
          <div className="mt-12 font-semibold text-gray-700">
            No landing pages available. Click "Create New Landing Page" to get started!
          </div>
        ) : (
          <Table pages={pages} setPages={setPages} />
        )}
      </div>
    </ProtectedLayout>
  );
};

export default Dashboard;
