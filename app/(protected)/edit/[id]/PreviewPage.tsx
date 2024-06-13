import React from 'react';
import { Page, Component } from '@/app/lib/type';
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
      {/* Render Headers */}
      {headers.map((component) => (
        <div key={component.id}>
          <Header content={component.content} />
        </div>
      ))}

      {/* Render Images */}
      {images.map((component) => (
        <div key={component.id}>
          <ImageComponent content={component.content} />
        </div>
      ))}

      {/* Render TextBlocks */}
      {textBlocks.map((component) => (
        <div key={component.id}>
          <TextBlock content={component.content} />
        </div>
      ))}

      {/* Render Footer */}
      {footer && (
        <div key={footer.id}>
          <Footer content={footer.content} />
        </div>
      )}
    </ProtectedLayout>
  );
};

export default PreviewPage;
