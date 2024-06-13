'use client'
import { useEffect, useState } from "react";
import Table from "../../ui/Table"
import { useRouter } from "next/navigation";
import { fetchAllLandingPages } from "../../lib/data";
import ProtectedLayout from "../../ProtectedLayout";
import { Page } from "../../lib/type";
import Link from "next/link";


const Dashboard = () => {

    const [pages, setPages] = useState<Page[]>([]);
    const router = useRouter();
  
    useEffect(() => {
      const fetchPages = async () => {
        try {
          const pages = await fetchAllLandingPages();
          setPages(pages);
        } catch (error) {
          console.error('Error fetching pages:', error);
        }
      };
  
      fetchPages();
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('auth');
      router.replace('/');
   }

    return (
        <ProtectedLayout>  
      <div className="flex flex-col items-center justify-center m-2">
        <div>
          <Link
               href={'/create'}
               className="px-6 py-2 m-8 text-white bg-blue-500 rounded hover:bg-blue-600"
             >
               Create New Landing Page
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-2 m-8 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
             Logout
          </button>
        </div>
        {pages.length === 0 ?
          <div className="font-semibold mt-12">
            No Landing Page Available!
          </div>
           :
          <Table pages={pages} setPages={setPages}/>
        }
      </div>
        </ProtectedLayout>
    )
}

export default Dashboard;