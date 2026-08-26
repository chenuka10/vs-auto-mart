"use client";

import CircularGallery from "@/components/CircularGallery";

interface DeliveryGalleryProps {
  items: { image: string; text: string }[];
}

export function DeliveryGallery({ items }: DeliveryGalleryProps) {
  return (
    <div style={{ height: "650px", position: "relative" }}>
      <CircularGallery
        items={items}
        bend={2}
        textColor="#EDEDE5"
        borderRadius={0.06}
        fontUrl="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap"
        font="600 22px Oswald"
        scrollEase={0.04}
      />
    </div>
  );
}
