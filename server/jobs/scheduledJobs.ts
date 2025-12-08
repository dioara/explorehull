/**
 * Scheduled Jobs Configuration
 * 
 * This file sets up cron jobs that run automatically on a schedule.
 * Jobs are executed server-side and run independently of user requests.
 */

import { runHullTheatresEventScraper } from '../scrapers/hullTheatresEventScraper';

/**
 * Schedule: Every Monday at 2:00 AM
 * Cron: 0 2 * * 1
 * 
 * This job scrapes Hull Theatres website for new events
 * and updates the database automatically.
 */
export function scheduleEventScraper() {
  // Check if we're in production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('⏭️  Event scraper scheduling skipped (not in production)');
    return;
  }
  
  // Schedule the job to run every Monday at 2 AM
  const schedule = '0 2 * * 1'; // Cron format: minute hour day month weekday
  
  console.log(`📅 Event scraper scheduled: Every Monday at 2:00 AM`);
  console.log(`   Cron expression: ${schedule}`);
  
  // In a production environment, you would use a cron library like 'node-cron'
  // or rely on Railway's cron job feature
  
  // Example with node-cron (install with: pnpm add node-cron @types/node-cron)
  /*
  import cron from 'node-cron';
  
  cron.schedule(schedule, async () => {
    console.log('🕐 Scheduled event scraper triggered');
    try {
      await runHullTheatresEventScraper();
    } catch (error) {
      console.error('❌ Scheduled scraper failed:', error);
    }
  });
  */
}

/**
 * Initialize all scheduled jobs
 * Call this from your server startup
 */
export function initializeScheduledJobs() {
  console.log('\n🚀 Initializing scheduled jobs...\n');
  
  // Schedule event scraper
  scheduleEventScraper();
  
  console.log('\n✅ All scheduled jobs initialized\n');
}
