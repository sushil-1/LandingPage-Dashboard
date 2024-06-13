import React from "react";
import { deleteLandingPage } from "../lib/data";
import Link from "next/link";
import { Page } from "../lib/type";

interface TableProps {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
}

const handleDelete = async (id: string, setPages: React.Dispatch<React.SetStateAction<Page[]>>, pages: Page[]) => {
  try {
    const success = await deleteLandingPage(id);
    if (success) {
      setPages(pages.filter(page => page.id !== id));
    }
  } catch (error) {
    console.error("Error deleting page:", error);
  }
};

const Table: React.FC<TableProps> = ({ pages, setPages }) => {
  return (
    <div className="overflow-x-auto mx-auto my-4">
      <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300">Title</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-100 transition duration-150">
              <td className="px-6 py-4 border-b border-gray-200">
                {page.name} <span className="text-red-500">{page.status === 'Live' ? 'Live' : ''}</span>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <Link href={`/edit/${page.id}`}>
                    <div className="text-blue-500 hover:underline cursor-pointer">Edit</div>
                  </Link>
                  <Link href={`/view/${page.id}`}>
                    <button className="text-blue-500 hover:underline">View</button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(page.id, setPages, pages)}
                    className="text-red-500 hover:underline"
                  > 
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
