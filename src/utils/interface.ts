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
  id: number;
  event_images: {
    logo: string;
    banner: string;
  };
  date: string;
  time: string;
  title: string;
  description: string;
  organizer: string;
  tags: string[];
  paid_event: boolean;
  location: {
    city: string;
    region: string;
    country: string;
  };
  link: string;
  icon: string;
  event_schedule: {
    start_date: Date;
    end_date: Date;
    timezone: string;
  };
}

export interface sideEventData {
  id: number;
  startDate: string;
  time: string;
  name: string;
  description: string;
  tags: string;
  topics: string[];
  paidEvent: boolean;
  website: string;
  endDate: string;
  weekday: string;
  event: string;
  link:string;
}

export interface sideEventModalData {
  id: number;
  startDate: string;
  time: string;
  name: string;
  description: string;
  tags: string;
  topics: string[];
  paidEvent: boolean;
  website: string;
  cached_banner: string;
  organizer: string;
  city: string [];
  country: string [];
  endDate: string;
  cached_description: string;
  banner: string;
  event: string;
  link: string;
}