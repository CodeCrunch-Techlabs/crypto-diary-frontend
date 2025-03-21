export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    categories: string[];
    blockchain: string;
    logo_url: string;
  }

export interface EventData {
  image: string;
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  organiser: string;
  category: string;
  type: string;
  location: string;
  link: string;
  icon: string;
}
