'use client';
import { useState } from 'react';
import { createLandingPage } from '../../lib/data';
import { useRouter } from 'next/navigation';
import ProtectedLayout from '../../ProtectedLayout';
import { createHeader, createFooter, createTextBlock, createImage } from '../../lib/utils'; // Import utility functions
import { Component } from '../../lib/type';

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [components, setComponents] = useState<Component[]>([]); // Assuming Component type is imported and defined elsewhere
  const [headerContent, setHeaderContent] = useState('');
  const [footerContent, setFooterContent] = useState('');
  const [textBlockContent, setTextBlockContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create components based on input fields
    const newComponents = [];

    if (headerContent.trim() !== '') {
      newComponents.push(createHeader(headerContent));
      setHeaderContent('');
    }

    if (footerContent.trim() !== '') {
      newComponents.push(createFooter(footerContent));
      setFooterContent('');
    }

    if (textBlockContent.trim() !== '') {
      newComponents.push(createTextBlock(textBlockContent));
      setTextBlockContent('');
    }

    if (imageUrl.trim() !== '') {
      newComponents.push(createImage(imageUrl));
      setImageUrl('');
    }

    // Combine new components with existing ones
    const allComponents = [...components, ...newComponents];

    // Create new page object
    const newPage = { name: title, description, components: allComponents };

    try {
      // Call API to create landing page
      const createdPage = await createLandingPage(newPage);
      router.replace('/dashboard');
      console.log('Page created:', createdPage);
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };

  const handleCancel = () => {
    router.replace('/dashboard');
  };

  return (
    <ProtectedLayout>
      <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl font-bold text-center mb-2">Create Landing Page</h1>
        <p className='text-center mb-6'>Enter details to create your Landing Page</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Header Content</label>
            <input
              type="text"
              value={headerContent}
              onChange={(e) => setHeaderContent(e.target.value)}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Text Block Content</label>
            <textarea
              value={textBlockContent}
              onChange={(e) => setTextBlockContent(e.target.value)}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Footer Content</label>
            <input
              type="text"
              value={footerContent}
              onChange={(e) => setFooterContent(e.target.value)}
              className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    </ProtectedLayout>
  );
}
