import { v4 as uuidv4 } from 'uuid';
import { Footer, Header, TextBlock, Image} from './type';

export const createHeader = (content: string): Header => ({
  id: uuidv4(),
  type: 'header',
  content,
});

export const createTextBlock = (content: string): TextBlock => ({
  id: uuidv4(),
  type: 'text',
  content,
});

export const createImage = (content: string): Image => ({
  id: uuidv4(),
  type: 'image',
  content,
});

export const createFooter = (content: string): Footer => ({
  id: uuidv4(),
  type: 'footer',
  content,
});