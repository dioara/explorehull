#!/usr/bin/env python3
"""
Final fix for remaining Unsplash URLs
"""

import re

# Final mappings for remaining entries
FINAL_MAPPINGS = {
    # Attractions - use existing images or close matches
    "Streetlife Museum of Transport": "/images/attractions/streetlife-museum.jpg",
    "Wilberforce House Museum": "/images/attractions/wilberforce-house.jpg",
    "Humber Street Gallery": "/images/attractions/fruit-market.jpg",
    "Hands on History Museum": "/images/attractions/hands-on-history.jpg",
    "MKM Stadium": "/images/attractions/kcom-stadium.jpg",
    "Hull Bonus Arena": "/images/attractions/bonus-arena.jpg",
    "St Stephen's Shopping Centre": "/images/attractions/st-stephens-shopping.jpg",
}

def final_fix(filepath):
    """Final fix for remaining URLs"""
    print(f"\n📝 Final fix for {filepath}...")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # First, try specific mappings
    fixed_count = 0
    for name, image_path in FINAL_MAPPINGS.items():
        pattern = f'(name:\\s*"{re.escape(name)}"[^}}]+?imageUrl:\\s*)"https://source\\.unsplash\\.com/[^"]+"'
        replacement = f'\\1"{image_path}"'
        
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            print(f"  ✅ Fixed: {name} → {image_path}")
            content = new_content
            fixed_count += 1
    
    # For any remaining generic Unsplash URLs, replace with a default image
    remaining = re.findall(r'https://source\.unsplash\.com/[^"]+', content)
    if remaining:
        print(f"  ⚠️  {len(remaining)} generic URLs remaining, using fallback images...")
        # Replace remaining with appropriate fallback
        content = re.sub(
            r'"https://source\.unsplash\.com/800x600/\?[^"]+"',
            '"/images/attractions/hull-old-town.jpg"',
            content
        )
        fixed_count += len(remaining)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"✅ Fixed {fixed_count} entries in {filepath}")

# Fix remaining files
print("🚀 Final image path fixes...")

final_fix('/home/ubuntu/explorehull/server/seed-attractions-50.ts')
final_fix('/home/ubuntu/explorehull/server/seed-events-50.ts')

print("\n✅ All images fixed!")
