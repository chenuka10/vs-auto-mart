Drop these in before deploying — they're referenced directly in the code:

- `hero-showroom.jpg` — homepage hero image (showroom or a hero vehicle)
- `placeholder-car.jpg` — fallback image for vehicles with no photos yet
- `founder-photo.jpg` — About page founder portrait

Everything else (vehicle photos, customer delivery photos) is stored in
Cloudinary and referenced by URL from Supabase — nothing else needs to live here.
