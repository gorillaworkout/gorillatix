// Event types
export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  ticketsAvailable: number;
  organizer: string;
  organizerDescription: string;
  createdAt: any; // Firestore timestamp, use proper type if using Firebase SDK types
  updatedAt: any; // same here
  userId?: string;
}

export interface EventInput {
  slug: string
  title: string
  description: string
  date: string
  time: string
  location: string
  venue: string
  address: string
  imageUrl: string
  price: number
  category: string
  ticketsAvailable: number
  organizer: string
  organizerDescription: string
}
