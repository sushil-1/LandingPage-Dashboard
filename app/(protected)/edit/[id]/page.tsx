'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedLayout from '@/app/ProtectedLayout';
import { fetchLandingPageById, updateLandingPage } from '@/app/lib/data';
import { Page, Component, Header, Footer, TextBlock, Image } from '@/app/lib/type';
import { createHeader, createFooter, createTextBlock, createImage } from '@/app/lib/utils';
import PreviewPage from './PreviewPage';
import Modal from '@/app/ui/Modal';

// Define a type for the component creation functions
type ComponentCreator = (content: string) => Component;

// Define a type for the component types object
type ComponentTypes = {
  [key: string]: { label: string; create: ComponentCreator }
};

const componentTypes: ComponentTypes = {
  header: { label: 'Header', create: createHeader },
  footer: { label: 'Footer', create: createFooter },
  text: { label: 'Text Block', create: createTextBlock },
  image: { label: 'Image URL', create: createImage },
};

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
    if (!componentExists(type)) {
      const newComponent = componentTypes[type].create('');
      setComponents([...components, newComponent]);
    }
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((component) => component.id !== id));
  };

  const modifyComponent = (id: string, updatedContent: string) => {
    setComponents(
      components.map((component) =>
        component.id === id ? { ...component, content: updatedContent } : component
      )
    );
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
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error publishing landing page:', error);
    }
  };

  const handleCancel = () => {
    router.replace('/dashboard');
  };

  const componentExists = (type: string) => components.some((component) => component.type === type);

  const availableComponentTypes = Object.keys(componentTypes).filter(
    (type) => !componentExists(type)
  );

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
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <h1 className="text-3xl font-bold mb-2 text-center">Edit Landing Page</h1>
          <p className="text-gray-700 mb-2 text-center">
            On this page, you can modify the title, description, and components of your landing page.
            Add new components from the available options, edit their content, or remove them as needed.
            For image components, add the image URL in the content field. You can also preview your changes before publishing.
          </p>
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
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">Components</h2>
          <div className="flex space-x-2 mb-2">
            {availableComponentTypes.map((type) => (
              <button
                key={type}
                onClick={() => addComponent(type)}
                className="py-2 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add {componentTypes[type].label}
              </button>
            ))}
          </div>
          {components.map((component) => (
            <div key={component.id} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 mr-2">
                  {component.type.toUpperCase()}
                </label>
                <button
                  onClick={() => removeComponent(component.id)}
                  className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6">
            <div className='flex items-center justify-center gap-4'>
              <button
                onClick={() => setPreviewOpen(true)}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
            </div>
            <div className='flex items-center justify-center gap-4'>
              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
        </div>
      </div>
      {isPreviewOpen && (
        <Modal>
          <PreviewPage landingPage={modifiedPage} onClose={() => setPreviewOpen(false)} />
        </Modal>
      )}
    </ProtectedLayout>
  );
}
