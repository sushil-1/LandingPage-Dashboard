
import { useRouter } from 'next/navigation';
import { Page } from './type';
import { v4 as uuidv4 } from 'uuid';

// Define a key for storing pages in local storage
const LOCAL_STORAGE_KEY = 'landingPages';

export const fetchAllLandingPages = async (): Promise<Page[]> => {
  try {
      // Retrieve pages from local storage
      const pagesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      const pages: Page[] = pagesJson ? JSON.parse(pagesJson) : [];
      return pages;
  } catch (error) {
      console.error('Error fetching landing pages:', error);
      return [];
  }
};

export const fetchLandingPageById = async (id: string): Promise<Page | null> => {
  try {
      const pagesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      const pages: Page[] = pagesJson ? JSON.parse(pagesJson) : [];
      const page = pages.find(page => page.id === id);
      return page ? page : null;
  } catch (error) {
      console.error(`Error fetching landing page with ID ${id}:`, error);
      return null;
  }
};

export const createLandingPage = async (page: Omit<Page, 'id' | 'status'>): Promise<Page> => {
  try {
      const newPage: Page = {
          ...page,
          id: uuidv4(),
          status: 'draft',
      };

      // Fetch existing pages from local storage
      const pagesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      const pages: Page[] = pagesJson ? JSON.parse(pagesJson) : [];

      // Update pages array with new page
      pages.push(newPage);

      // Store updated pages array back to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));

      return newPage;
  } catch (error) {
      console.error('Error creating landing page:', error);
      throw error; // Rethrow error to handle at the caller
  }
};

export const updateLandingPage = async (id: string, updatedPage: Omit<Page, 'id'>): Promise<Page> => {
  try {
      // Fetch existing pages from local storage
      const pagesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      const pages: Page[] = pagesJson ? JSON.parse(pagesJson) : [];

      // Find index of page to update
      const pageIndex = pages.findIndex(page => page.id === id);

      if (pageIndex === -1) {
          throw new Error(`Page with ID ${id} not found`);
      }

      // Update page with new data
      const updatedPageWithId: Page = {
          id,
          ...updatedPage,
      };

      // Replace old page with updated page
      pages[pageIndex] = updatedPageWithId;

      // Store updated pages array back to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));

      return updatedPageWithId;
  } catch (error) {
      console.error(`Error updating landing page with ID ${id}:`, error);
      throw error; // Rethrow error to handle at the caller
  }
};


export const deleteLandingPage = async (id: string): Promise<boolean> => {
  try {
      // Fetch existing pages from local storage
      const pagesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
      let pages: Page[] = pagesJson ? JSON.parse(pagesJson) : [];

      // Filter out the page to delete
      pages = pages.filter(page => page.id !== id);

      // Store updated pages array back to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));

      return true;
  } catch (error) {
      console.error('Error deleting page:', error);
      return false;
  }
};
