import React from 'react';
import { Page } from '@/app/lib/type';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import TextBlock from '@/app/ui/TextBlock';
import ImageComponent from '@/app/ui/Image';
import ProtectedLayout from '@/app/ProtectedLayout';

interface PreviewPageProps {
  onClose: () => void;
  landingPage: Page | null;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ landingPage, onClose }) => {
  if (!landingPage) {
    return <div>Loading...</div>;
  }

  // Separate components based on type for rendering order
  const headers = landingPage.components.filter(component => component.type === 'header');
  const images = landingPage.components.filter(component => component.type === 'image');
  const textBlocks = landingPage.components.filter(component => component.type === 'text');
  const footer = landingPage.components.find(component => component.type === 'footer');

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
          <button className="ml-auto mr-8 my-6 border-2 border-gray-400 rounded-md p-2" onClick={onClose}>
            Close Preview
          </button>
        <div className="flex flex-col md:flex-row items-center justify-center flex-grow mb-16">
          <div className='space-y-4 m-2 md:m-4'>
            {/* Render Headers */}
            {headers.map((component) => (
              <div key={component.id}>
                <Header content={component.content} />
              </div>
            ))}

            {/* Render Text Blocks */}
            {textBlocks.map((component) => (
              <div key={component.id}>
                <TextBlock content={component.content} />
              </div>
            ))}
          </div>
          <div className='space-y-4 m-2 md:m-4'>
            {/* Render Images */}
            {images.map((component) => (
              <div key={component.id}>
                <ImageComponent content={component.content} />
              </div>
            ))}
          </div>
        </div>
        <div className='mt-auto'>
          {/* Render Footer */}
          {footer && (
            <div key={footer.id}>
              <Footer content={footer.content} />
            </div>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default PreviewPage;
