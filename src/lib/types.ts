export type VehicleStatus = "available" | "reserved" | "sold";
export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";
export type TransmissionType = "automatic" | "manual";
export type ImageContext =
  | "exterior"
  | "interior"
  | "dashboard"
  | "engine_bay"
  | "wheels"
  | "other";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage_km: number;
  fuel: FuelType;
  transmission: TransmissionType;
  engine_capacity: string | null;
  colour: string | null;
  registration_no: string | null;
  condition: string | null;
  description: string | null;
  location: string | null;
  status: VehicleStatus;
  is_featured: boolean;
  video_url: string | null;
  date_added: string;
  date_sold: string | null;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  image_url: string;
  context: ImageContext;
  sort_order: number;
}

export interface VehicleWithImages extends Vehicle {
  vehicle_images: VehicleImage[];
}

export interface CustomerStory {
  id: string;
  customer_name: string;
  vehicle_id: string | null;
  vehicle_label: string | null;
  delivery_date: string;
  message: string | null;
  video_url: string | null;
  is_published: boolean;
  customer_story_photos: { id: string; image_url: string; sort_order: number }[];
}

export interface Testimonial {
  id: string;
  reviewer_name: string;
  rating: number | null;
  review_text: string | null;
  photo_url: string | null;
  video_url: string | null;
}

export interface InventoryFilters {
  brand?: string;
  model?: string;
  minYear?: number;
  maxPrice?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
}
