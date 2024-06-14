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
      <table className="w-full md:w-3/4 table-auto border-collapse bg-gray-50 rounded-lg">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-6 py-3 border-b-2 border-blue-300">Title</th>
            <th className="px-6 py-3 border-b-2 border-blue-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-100 transition duration-150">
              <td className="px-6 py-4 border-b border-gray-200 justify-center">
                <div className="flex items-center justify-center font-medium">
                {page.name} <span className="text-red-500 mx-2">{page.status === 'Live' ? 'Live' : ''}</span>
                </div>
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                <div className="flex items-center justify-center space-x-4 md:space-x-8">
                  <Link 
                    href={`/edit/${page.id}`}
                    className="border-2 rounded-md px-2 py-1 hover:bg-blue-100"
                  >
                    Edit
                  </Link>
                  <Link 
                    href={`/view/${page.id}`}
                    className="border-2 rounded-md px-2 py-1 hover:bg-blue-100"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(page.id, setPages, pages)}
                    className="border-2 border-red-200 text-red-500 rounded-md px-2 py-1 hover:bg-red-100"
                  > 
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Table;
