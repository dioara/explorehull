#!/bin/bash

# Update attractions seed file
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?aquarium,fish,ocean"|imageUrl: "/images/attractions/the-deep.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?art,gallery,museum"|imageUrl: "/images/attractions/ferens-art-gallery.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?church,cathedral,gothic"|imageUrl: "/images/attractions/hull-minster.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?victorian,street,vintage"|imageUrl: "/images/attractions/streetlife-museum.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?historic,house,museum"|imageUrl: "/images/attractions/wilberforce-house.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?theatre,stage,performance"|imageUrl: "/images/attractions/hull-new-theatre.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?modern,theatre,building"|imageUrl: "/images/attractions/hull-truck-theatre.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?park,gardens,lake"|imageUrl: "/images/attractions/east-park.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?gardens,flowers,park"|imageUrl: "/images/attractions/queens-gardens.jpg"|g' server/seed-attractions-50.ts
sed -i 's|imageUrl: "https://source.unsplash.com/800x600/?bridge,suspension,landmark"|imageUrl: "/images/attractions/humber-bridge.jpg"|g' server/seed-attractions-50.ts

echo "✅ Attraction image paths updated"
