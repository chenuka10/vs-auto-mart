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
  is_cover: boolean;
}

export interface VehicleWithImages extends Vehicle {
  vehicle_images: VehicleImage[];
}

/**
 * Fields safe to select on public pages. Deliberately omits registration_no
 * (plate number) and created_by, which are admin-only. Always select this
 * exact column list (see PUBLIC_VEHICLE_COLUMNS in lib/queries.ts) rather
 * than "*" on any public-facing query.
 */
export type PublicVehicle = Omit<Vehicle, "registration_no">;

export interface PublicVehicleWithImages extends PublicVehicle {
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

// Replace the existing Testimonial interface with this (added is_published, created_at)
export interface Testimonial {
  id: string;
  reviewer_name: string;
  rating: number | null;
  review_text: string | null;
  photo_url: string | null;
  video_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface GoogleReviewsConfig {
  rating: number;
  totalReviews: number;
  googleReviewsUrl: string;
  leaveReviewUrl: string;
}

export interface InventoryFilters {
  brand?: string;
  model?: string;
  minYear?: number;
  maxPrice?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
}
