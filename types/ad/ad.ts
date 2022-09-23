export interface Ad {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  street?: string;
  city: string;
  postalCode: string;
  apNumber: string;
  coordinates: string;
  price: number;
}