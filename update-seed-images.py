#!/usr/bin/env python3
"""
Update all seed files to use local image paths instead of Unsplash URLs
"""

import re
import os

def slugify(name):
    """Convert name to slug format matching our image filenames"""
    slug = name.lower()
    slug = slug.replace("&", "and")
    slug = slug.replace("'", "")
    slug = slug.replace(".", "")
    slug = slug.replace(",", "")
    slug = slug.replace("(", "")
    slug = slug.replace(")", "")
    slug = slug.replace(" - ", "-")
    slug = slug.replace(" ", "-")
    slug = slug.replace("--", "-")
    return slug

def update_seed_file(filepath, category_folder):
    """Update imageUrl in seed file to use local paths"""
    print(f"\n📝 Updating {filepath}...")
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find all name fields and their corresponding imageUrl
    # Pattern: name: "NAME", ... imageUrl: "URL"
    pattern = r'name:\s*"([^"]+)"[^}]+?imageUrl:\s*"https://source\.unsplash\.com/[^"]+"'
    
    def replace_image_url(match):
        name = match.group(0).split('name: "')[1].split('"')[0]
        slug = slugify(name)
        
        # Check if image file exists
        image_path = f"/images/{category_folder}/{slug}.jpg"
        full_path = f"/home/ubuntu/explorehull/client/public{image_path}"
        
        if os.path.exists(full_path):
            # Replace the imageUrl in the matched text
            updated = re.sub(
                r'imageUrl:\s*"https://source\.unsplash\.com/[^"]+"',
                f'imageUrl: "{image_path}"',
                match.group(0)
            )
            print(f"  ✅ {name} → {image_path}")
            return updated
        else:
            print(f"  ⚠️  Image not found for: {name} (expected: {image_path})")
            return match.group(0)
    
    updated_content = re.sub(pattern, replace_image_url, content)
    
    with open(filepath, 'w') as f:
        f.write(updated_content)
    
    print(f"✅ Updated {filepath}")

# Update all seed files
print("🚀 Starting image path updates...")

update_seed_file('/home/ubuntu/explorehull/server/seed-attractions-50.ts', 'attractions')
update_seed_file('/home/ubuntu/explorehull/server/seed-restaurants-50.ts', 'restaurants')
update_seed_file('/home/ubuntu/explorehull/server/seed-hotels-30.ts', 'hotels')
update_seed_file('/home/ubuntu/explorehull/server/seed-events-50.ts', 'events')

print("\n✅ All seed files updated successfully!")
