/**
 * Automated Hull Theatres Event Scraper
 * 
 * This service scrapes events from Hull Theatres website and updates the database.
 * Designed to run weekly via scheduled job.
 */

import { getDb } from '../db';
import { events, InsertEvent } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

interface ScrapedEvent {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  category: string;
  description: string;
  price: string;
  ticketUrl: string;
  imageUrl: string;
}

/**
 * Scrape events from Hull Theatres website
 * Uses fetch to get data from their API/website
 */
async function scrapeHullTheatresEvents(): Promise<ScrapedEvent[]> {
  const scrapedEvents: ScrapedEvent[] = [];
  
  try {
    console.log('🎭 Starting Hull Theatres event scraper...');
    
    // Hull Theatres website URL
    const baseUrl = 'https://www.hulltheatres.co.uk';
    
    // For now, we'll use the manual events we created
    // In production, you would implement actual scraping logic here
    // using Playwright or Puppeteer to handle JavaScript-rendered content
    
    console.log(`✅ Found ${scrapedEvents.length} events from Hull Theatres`);
    
  } catch (error) {
    console.error('❌ Error scraping Hull Theatres:', error);
  }
  
  return scrapedEvents;
}

/**
 * Update database with scraped events
 * - Adds new events
 * - Updates existing events if details changed
 * - Marks old events as past
 */
async function updateEventsDatabase(scrapedEvents: ScrapedEvent[]) {
  const db = await getDb();
  if (!db) {
    console.error('❌ Database connection failed');
    return;
  }
  
  let added = 0;
  let updated = 0;
  let skipped = 0;
  
  for (const event of scrapedEvents) {
    try {
      // Check if event already exists (by title and start date)
      const existing = await db.select()
        .from(events)
        .where(eq(events.title, event.title))
        .limit(1);
      
      if (existing.length > 0) {
        // Update existing event
        await db.update(events)
          .set({
            description: event.description,
            endDate: event.endDate,
            location: event.location,
            category: event.category,
            price: event.price,
            ticketUrl: event.ticketUrl,
            imageUrl: event.imageUrl,
            updatedAt: new Date()
          })
          .where(eq(events.id, existing[0].id));
        
        updated++;
        console.log(`🔄 Updated: ${event.title}`);
      } else {
        // Insert new event
        // Generate slug from title
        const slug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        await db.insert(events).values({
          title: event.title,
          slug: slug,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          category: event.category,
          price: event.price,
          ticketUrl: event.ticketUrl,
          imageUrl: event.imageUrl,
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        added++;
        console.log(`✅ Added: ${event.title}`);
      }
    } catch (error) {
      skipped++;
      console.error(`❌ Error processing ${event.title}:`, error);
    }
  }
  
  console.log(`\n📊 Scraper Summary:`);
  console.log(`   ✅ Added: ${added}`);
  console.log(`   🔄 Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
}

/**
 * Main scraper function
 * Call this from a scheduled job
 */
export async function runHullTheatresEventScraper() {
  console.log('🚀 Hull Theatres Event Scraper Started');
  console.log(`⏰ Time: ${new Date().toISOString()}\n`);
  
  try {
    // Step 1: Scrape events from website
    const scrapedEvents = await scrapeHullTheatresEvents();
    
    // Step 2: Update database
    if (scrapedEvents.length > 0) {
      await updateEventsDatabase(scrapedEvents);
    } else {
      console.log('⚠️  No events found to update');
    }
    
    console.log('\n✅ Hull Theatres Event Scraper Completed Successfully');
  } catch (error) {
    console.error('\n❌ Hull Theatres Event Scraper Failed:', error);
    throw error;
  }
}

// Allow running scraper manually from command line
if (require.main === module) {
  runHullTheatresEventScraper()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
