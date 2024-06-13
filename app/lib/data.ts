import axios from 'axios';
import { Page } from './type';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:5000/pages';

export const fetchAllLandingPages = async (): Promise<Page[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchLandingPageById = async (id: string): Promise<Page | null> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching landing page with ID ${id}:`, error);
      return null;
    }
  };
  
export const createLandingPage = async (page: Omit<Page, 'id' | 'status'>): Promise<Page> => {
  // Ensure the new page is created with status 'draft'
  const newPage = {
    ...page,
    id: uuidv4(),
    status: 'draft',
  };

  const response = await axios.post(API_URL, newPage);
  return response.data;
};

export const updateLandingPage = async (id: string, updatedPage: Omit<Page, 'id'>): Promise<Page> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedPage);
  return response.data;
};

export const deleteLandingPage = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting page:', error);
    return false;
  }
};

