"use client";

import CircularGallery from "@/components/CircularGallery";

interface DeliveryGalleryProps {
  items: { image: string; text: string }[];
}

export function DeliveryGallery({ items }: DeliveryGalleryProps) {
  return (
    <div className="relative h-[650px] w-full">
      <CircularGallery items={items} />
    </div>
  );
}