'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedLayout from '@/app/ProtectedLayout';
import { fetchLandingPageById } from '@/app/lib/data';
import { Page, Component } from '@/app/lib/type';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import TextBlock from '@/app/ui/TextBlock';
import ImageComponent from '@/app/ui/Image';
import { useParams } from 'next/navigation';
import NotLive from '@/app/ui/NotLive';

const ViewLandingPage = () => {
  const { id } = useParams();
  const [landingPage, setLandingPage] = useState<Page | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (id) {
        try {
          const data: Page | null = await fetchLandingPageById(id as string);
          if (data) {
            setLandingPage(data);
          }
        } catch (error) {
          console.error('Error fetching landing page:', error);
        }
      }
    };

    if (id) {
      fetchPage();
    }
  }, [id]);

  if (!landingPage) {
    return <div>Loading...</div>;
  }

  if (landingPage.status !== 'Live') {
    return <NotLive />;
  }

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <Link href="/dashboard" className="ml-auto mr-8 my-6 border-2 border-gray-400 rounded-md p-2">
          Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row items-center justify-center flex-grow mb-16">
          <div className='space-y-4 m-2 md:m-4'>
            {/* Render Headers */}
            {landingPage.components
              .filter((component) => component.type === 'header')
              .map((component) => (
                <div key={component.id}>
                  <Header content={component.content} />
                </div>
              ))}
            {/* Render Text Blocks */}
            {landingPage.components
              .filter((component) => component.type === 'text')
              .map((component) => (
                <div key={component.id}>
                  <TextBlock content={component.content} />
                </div>
              ))}
          </div>
          {/* Render Images */}
          <div className='space-y-4 m-2 md:m-4'>
            {landingPage.components
              .filter((component) => component.type === 'image')
              .map((component) => (
                <div key={component.id}>
                  <ImageComponent content={component.content} />
                </div>
              ))}
          </div>
        </div>
        <div className='mt-auto'>
          {/* Render Footer */}
          {landingPage.components
            .filter((component) => component.type === 'footer')
            .map((component) => (
              <div key={component.id}>
                <Footer content={component.content} />
              </div>
            ))}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default ViewLandingPage;
