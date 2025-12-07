#!/usr/bin/env python3
"""
Scrape events from Hull Theatres and save to JSON for database import
"""
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import re

def scrape_hull_theatres():
    """Scrape events from hulltheatres.co.uk"""
    url = "https://www.hulltheatres.co.uk/theatre-events"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    events = []
    
    # Find all event cards
    event_cards = soup.find_all('article', class_='uk-card')
    
    print(f"Found {len(event_cards)} event cards")
    
    for card in event_cards:
        try:
            # Extract title
            title_elem = card.find('h3')
            if not title_elem:
                continue
            title = title_elem.get_text(strip=True)
            
            # Extract date
            date_elem = card.find('time')
            if date_elem:
                date_text = date_elem.get_text(strip=True)
            else:
                # Try to find date in other elements
                date_container = card.find('div', class_='uk-card-badge')
                date_text = date_container.get_text(strip=True) if date_container else "TBA"
            
            # Extract venue
            venue_elem = card.find('span', class_='uk-label')
            venue = venue_elem.get_text(strip=True) if venue_elem else "Hull Theatres"
            
            # Extract category
            category_elem = card.find('div', class_='uk-card-footer')
            category = "Event"
            if category_elem:
                cat_text = category_elem.get_text(strip=True)
                if cat_text:
                    category = cat_text
            
            # Extract image
            img_elem = card.find('img')
            image_url = ""
            if img_elem and img_elem.get('src'):
                image_url = img_elem['src']
                if not image_url.startswith('http'):
                    image_url = f"https://www.hulltheatres.co.uk{image_url}"
            
            # Extract link for more info
            link_elem = card.find('a', href=True)
            event_url = ""
            if link_elem:
                event_url = link_elem['href']
                if not event_url.startswith('http'):
                    event_url = f"https://www.hulltheatres.co.uk{event_url}"
            
            event = {
                'title': title,
                'date': date_text,
                'venue': venue,
                'category': category,
                'image_url': image_url,
                'event_url': event_url,
                'description': f"Experience {title} at {venue}. {category} event in Hull.",
                'source': 'Hull Theatres'
            }
            
            events.append(event)
            print(f"✓ {title}")
            
        except Exception as e:
            print(f"Error parsing event: {e}")
            continue
    
    return events

def main():
    print("Scraping Hull Theatres events...")
    events = scrape_hull_theatres()
    
    print(f"\n✅ Successfully scraped {len(events)} events")
    
    # Save to JSON
    output_file = '/home/ubuntu/explorehull/hull-events-scraped.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(events, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Saved to {output_file}")
    
    # Print summary
    print("\n📊 Events Summary:")
    for i, event in enumerate(events[:10], 1):
        print(f"{i}. {event['title']} - {event['date']}")
    
    if len(events) > 10:
        print(f"... and {len(events) - 10} more events")

if __name__ == "__main__":
    main()
