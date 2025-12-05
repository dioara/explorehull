# Auto-Scraping Service

## Overview

The auto-scraping service keeps ExploreHull.com content fresh by automatically pulling data from Visit Hull and other local sources.

## Current Status

**Phase 1 (Completed)**: Infrastructure and placeholder implementation
- ✅ Scraper service structure created
- ✅ Database integration ready
- ✅ Error handling and logging implemented

**Phase 2 (To Implement)**: Production scraping logic
- ⏳ Implement HTML parsing for visithull.org
- ⏳ Add event scraping from Hull What's On
- ⏳ Implement restaurant data scraping
- ⏳ Add rate limiting and retry logic

## Running the Scraper

### Manual Execution

```bash
# Run the scraper once
cd /home/ubuntu/explorehull
tsx server/scraper.ts
```

### Scheduled Execution

To run the scraper automatically on a schedule, set up a cron job:

```bash
# Edit crontab
crontab -e

# Add this line to run daily at 2 AM
0 2 * * * cd /home/ubuntu/explorehull && tsx server/scraper.ts >> /var/log/explorehull-scraper.log 2>&1
```

## Implementation Guide

### Adding Attraction Scraping

1. Install scraping dependencies:
```bash
pnpm add cheerio axios
```

2. Update `scrapeAttractions()` function:
```typescript
import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeAttractions(): Promise<ScrapedAttraction[]> {
  const response = await axios.get('https://www.visithull.org/to-do/');
  const $ = cheerio.load(response.data);
  
  const attractions: ScrapedAttraction[] = [];
  
  $('.attraction-item').each((i, elem) => {
    const name = $(elem).find('.attraction-name').text().trim();
    const description = $(elem).find('.attraction-description').text().trim();
    // ... extract more fields
    
    attractions.push({
      name,
      slug: name.toLowerCase().replace(/\\s+/g, '-'),
      description,
      category: 'Museums', // categorize based on content
      // ... add more fields
    });
  });
  
  return attractions;
}
```

### Adding Event Scraping

Similar approach for events from https://www.visithull.org/whats-on/

### Data Deduplication

The scraper checks for existing records by slug before inserting:
- If record exists: Update with new data
- If record doesn't exist: Insert new record

### Rate Limiting

Implement delays between requests to avoid overwhelming source websites:

```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Add delay between scraping different pages
await delay(1000); // 1 second delay
```

## Monitoring

Check scraper logs:
```bash
tail -f /var/log/explorehull-scraper.log
```

## Future Enhancements

1. **API Integration**: If Visit Hull provides an API, use it instead of scraping
2. **Image Processing**: Download and optimize images locally
3. **Content Validation**: Verify scraped data quality before inserting
4. **Notification System**: Alert admins when new content is added
5. **Incremental Updates**: Only scrape changed content, not everything

## Data Sources

- **Attractions**: https://www.visithull.org/to-do/
- **Events**: https://www.visithull.org/whats-on/
- **Restaurants**: https://www.visithull.org/food-and-drink/
- **Hull Theatres**: https://www.hulltheatres.co.uk/whats-on/

## Notes

- Always respect robots.txt and terms of service
- Implement proper error handling for network failures
- Consider caching to reduce load on source websites
- Test scraping logic thoroughly before production deployment
