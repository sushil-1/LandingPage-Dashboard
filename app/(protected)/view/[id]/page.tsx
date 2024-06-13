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
        <div className="flex-grow">
          <Link href="/dashboard" className="flex items-center justify-center p-2">
            <button className="text-blue-600">Back to Dashboard</button>
          </Link>
          <div>
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
            {/* Render Images */}
            {landingPage.components
              .filter((component) => component.type === 'image')
              .map((component) => (
                <div key={component.id}>
                  <ImageComponent content={component.content} />
                </div>
              ))}
          </div>
        </div>
        <div>
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
