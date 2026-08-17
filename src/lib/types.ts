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

export type SellCarFuelType = "petrol" | "diesel" | "hybrid" | "electric" | "other";
export type SellCarTransmission = "automatic" | "manual" | "amt" | "cvt" | "other";
export type SellCarCondition = "excellent" | "good" | "fair" | "needs_repairs";
export type SellCarStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "INSPECTION"
  | "OFFER_MADE"
  | "PURCHASED"
  | "REJECTED"
  | "CLOSED";

export interface SellCarSubmissionPhoto {
  id: string;
  submission_id: string;
  image_url: string;
  cloudinary_public_id: string | null;
  sort_order: number;
  created_at: string;
}

export interface SellCarSubmission {
  id: string;
  reference_number: string;
  created_at: string;
  updated_at: string;

  seller_name: string;
  seller_phone: string;
  seller_whatsapp: string;
  seller_email: string | null;

  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  registration_number: string;
  mileage: number;

  fuel_type: SellCarFuelType;
  transmission: SellCarTransmission;
  colour: string | null;
  engine_capacity: string | null;
  owners_count: number | null;
  condition: SellCarCondition;

  asking_price: number;
  description: string | null;

  status: SellCarStatus;
  admin_notes: string | null;
  assigned_to: string | null;

  consent_given: boolean;
  consent_at: string | null;
}

export interface SellCarSubmissionWithPhotos extends SellCarSubmission {
  sell_car_submission_photos: SellCarSubmissionPhoto[];
}