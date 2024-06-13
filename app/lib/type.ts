export interface Header {
    id: string;
    type: 'header';
    content: string;
  }
  
  export interface TextBlock {
    id: string;
    type: 'text';
    content: string;
  }
  
  export interface Image {
    id: string;
    type: 'image';
    content: string;
  }
  
  export interface Footer {
    id: string;
    type: 'footer';
    content: string;
  }
  
  export type Component = Header | TextBlock | Image | Footer ;
  
  export interface Page {
    id: string;
    name: string;
    description: string;
    status: string;
    components: {
      id: string;
      type: 'header' | 'text' | 'image' | 'footer' ;
      content: string;
    }[];
  }
  