'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedLayout from '@/app/ProtectedLayout';
import { fetchLandingPageById, updateLandingPage } from '@/app/lib/data';
import { Page, Component, Header, Footer, TextBlock, Image } from '@/app/lib/type';
import { createHeader, createFooter, createTextBlock, createImage } from '@/app/lib/utils';
import PreviewPage from './PreviewPage';
import Modal from '@/app/ui/Modal';

export default function EditLandingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<Page | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPreviewOpen, setPreviewOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      const fetchPage = async () => {
        try {
          const data: Page | null = await fetchLandingPageById(id as string);
          if (data) {
            setInitialData(data);
            setTitle(data.name);
            setDescription(data.description);
            setStatus(data.status);
            setComponents(data.components);
          }
        } catch (error) {
          console.error('Error fetching landing page:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPage();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedPage: Omit<Page, 'id'> = {
        name: title,
        description,
        status,
        components,
      };

      await updateLandingPage(id as string, updatedPage);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error updating landing page:', error);
    }
  };

  const addComponent = (type: string) => {
    let newComponent: Component | null = null;

    switch (type) {
      case 'header':
        newComponent = createHeader('');
        break;
      case 'footer':
        newComponent = createFooter('');
        break;
      case 'text':
        newComponent = createTextBlock('');
        break;
      case 'image':
        newComponent = createImage('');
        break;
      default:
        break;
    }

    if (newComponent) {
      setComponents([...components, newComponent]);
    }
  };

  const removeComponent = (id: string) => {
    const updatedComponents = components.filter((component) => component.id !== id);
    setComponents(updatedComponents);
  };

  const modifyComponent = (id: string, updatedContent: string) => {
    const updatedComponents = components.map((component) =>
      component.id === id ? { ...component, content: updatedContent } : component
    );
    setComponents(updatedComponents);
  };

  const handlePublish = async () => {
    try {
      const updatedPage: Omit<Page, 'id'> = {
        name: title,
        description,
        status: 'Live',
        components,
      };

      await updateLandingPage(id as string, updatedPage);
    } catch (error) {
      console.error('Error publishing landing page:', error);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setTitle(initialData.name);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setComponents(initialData.components);
    }
    router.replace('/dashboard');
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const modifiedPage: Page = {
    id: id as string,
    name: title,
    description,
    status,
    components,
  };

  return (
    <ProtectedLayout>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Landing Page</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Components</h2>
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => addComponent('header')}
              className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Header
            </button>
            <button
              onClick={() => addComponent('footer')}
              className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Footer
            </button>
            <button
              onClick={() => addComponent('text')}
              className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Text Block
            </button>
            <button
              onClick={() => addComponent('image')}
              className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Image
            </button>
          </div>
          {components.map((component) => (
            <div key={component.id} className="mb-4">
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-2">{component.type.toUpperCase()}</label>
                <button
                  onClick={() => removeComponent(component.id)}
                  className="py-1 px-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
              <textarea
                value={component.content}
                onChange={(e) => modifyComponent(component.id, e.target.value)}
                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={handlePreviewOpen}
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Preview
          </button>
          {status !== 'Live' && (
            <button
              onClick={handlePublish}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Publish
            </button>
          )}
          <button
            onClick={handleUpdate}
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
      {isPreviewOpen && (
        <Modal onClose={handlePreviewClose}>
          <PreviewPage landingPage={modifiedPage} />
        </Modal>
      )}
    </ProtectedLayout>
  );
}
