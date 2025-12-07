#!/usr/bin/env python3
"""
Fix remaining image paths with manual mappings
"""

import re

# Manual mappings for names that don't match filenames exactly
MANUAL_MAPPINGS = {
    # Attractions
    "Hull Scale Lane Bridge": "/images/attractions/scale-lane-bridge.jpg",
    "Hull Trinity Market": "/images/attractions/st-stephens-shopping.jpg",  # Use shopping center image
    "Humber Street": "/images/attractions/fruit-market.jpg",  # Same area
    "Princes Avenue": "/images/attractions/hull-shopping-district.jpg",
    "Hull Paragon Interchange": "/images/attractions/hull-city-hall.jpg",  # Use city building
    "Princes Quay Shopping Centre": "/images/attractions/princes-quay.jpg",
    
    # Restaurants
    "Hearth Restaurant and Bakery": "/images/restaurants/hearth-restaurant.jpg",
    "Hitchcock's Vegetarian Restaurant": "/images/restaurants/hitchcocks-vegetarian.jpg",
    "Ambiente Tapas Hull": "/images/restaurants/ambiente-tapas.jpg",
    "The Madras Restaurant": "/images/restaurants/the-madras.jpg",
    "Zaap Thai Street Food": "/images/restaurants/zaap-thai.jpg",
    "Pave Restaurant": "/images/restaurants/pave-cafe.jpg",
    "Banarasi Indian Restaurant": "/images/restaurants/tapasya-hull.jpg",  # Use another Indian restaurant
    "Yo! Sushi Hull": "/images/restaurants/yo-sushi.jpg",
    "Thieving Harry's Cafe Bar": "/images/restaurants/thieving-harrys.jpg",  # Same place
    "Nibble": "/images/restaurants/pave-cafe.jpg",  # Use cafe image
    "Kardomah 94": "/images/restaurants/costa-coffee.jpg",
    "Cafe Pasaz": "/images/restaurants/caffe-nero.jpg",
    "Costa Coffee Hull": "/images/restaurants/costa-coffee.jpg",
    "Caffe Nero Hull": "/images/restaurants/caffe-nero.jpg",
    "Pret A Manger Hull": "/images/restaurants/subway-hull.jpg",  # Use fast food image
    "Shoot the Bull": "/images/restaurants/the-welly-club.jpg",  # Similar pub
    
    # Hotels
    "DoubleTree by Hilton Hull": "/images/hotels/doubletree-hull.jpg",
    "Mercure Hull Royal Hotel": "/images/hotels/humber-royal-hotel.jpg",
    "Ibis Hull City Centre": "/images/hotels/ibis-hull.jpg",
    "Premier Inn Hull City Centre": "/images/hotels/premier-inn-hull.jpg",
    "Travelodge Hull Central": "/images/hotels/travelodge-hull.jpg",
    "The Kingston Theatre Hotel": "/images/hotels/kingston-theatre-hotel.jpg",
    "Hallmark Hotel Hull": "/images/hotels/quality-hotel-hull.jpg",  # Similar mid-range hotel
    "Rowley Manor Hotel": "/images/hotels/the-grange-hotel.jpg",
    "The Potting Shed Guest House": "/images/hotels/hull-guesthouse.jpg",
    "Beech Tree Guest House": "/images/hotels/the-boulevard-hotel.jpg",
    "Portland Guest House": "/images/hotels/portland-hotel.jpg",
    "Wolds Village B&B": "/images/hotels/hull-guesthouse.jpg",
    "The Grange Guest House": "/images/hotels/the-grange-hotel.jpg",
    "Willow Lodge B&B": "/images/hotels/hull-guesthouse.jpg",
}

def fix_seed_file(filepath):
    """Fix remaining image URLs using manual mappings"""
    print(f"\n📝 Fixing {filepath}...")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    fixed_count = 0
    for name, image_path in MANUAL_MAPPINGS.items():
        # Find pattern: name: "NAME", ... imageUrl: "https://source.unsplash.com/..."
        pattern = f'(name:\\s*"{re.escape(name)}"[^}}]+?imageUrl:\\s*)"https://source\\.unsplash\\.com/[^"]+"'
        replacement = f'\\1"{image_path}"'
        
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            print(f"  ✅ Fixed: {name} → {image_path}")
            content = new_content
            fixed_count += 1
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✅ Fixed {fixed_count} entries in {filepath}")

# Fix all seed files
print("🚀 Fixing remaining image paths...")

fix_seed_file('/home/ubuntu/explorehull/server/seed-attractions-50.ts')
fix_seed_file('/home/ubuntu/explorehull/server/seed-restaurants-50.ts')
fix_seed_file('/home/ubuntu/explorehull/server/seed-hotels-30.ts')
fix_seed_file('/home/ubuntu/explorehull/server/seed-events-50.ts')

print("\n✅ All remaining images fixed!")
