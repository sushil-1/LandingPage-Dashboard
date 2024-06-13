import React from 'react';
import { Page } from '@/app/lib/type';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import TextBlock from '@/app/ui/TextBlock';
import ImageComponent from '@/app/ui/Image';
import ProtectedLayout from '@/app/ProtectedLayout';

interface PreviewPageProps {
  landingPage: Page | null;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ landingPage }) => {
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
        {/* Render Headers */}
        <div className='flex-grow'>
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

        {/* Render Images */}
        {images.map((component) => (
          <div key={component.id}>
            <ImageComponent content={component.content} />
          </div>
        ))}
        </div>
        {/* Render Footer */}
        {footer && (
          <div key={footer.id} className="mt-auto">
            <Footer content={footer.content} />
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
};

export default PreviewPage;
