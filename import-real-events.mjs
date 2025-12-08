#!/usr/bin/env node
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('🗄️  Connecting to database...');
  
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);
  
  // Read events from JSON
  const eventsData = JSON.parse(readFileSync('./hull-events-manual.json', 'utf-8'));
  
  console.log(`📥 Importing ${eventsData.length} real Hull events...`);
  
  // Clear existing events
  console.log('🗑️  Clearing existing events...');
  await connection.execute('DELETE FROM events');
  
  // Insert new events
  for (const event of eventsData) {
    try {
      const slug = generateSlug(event.title);
      
      await connection.execute(
        `INSERT INTO events (title, slug, description, startDate, endDate, location, category, imageUrl, ticketUrl, price, featured, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          event.title,
          slug,
          event.description,
          new Date(event.startDate),
          new Date(event.endDate),
          event.venue,
          event.category,
          event.imageUrl,
          event.ticketUrl || 'https://www.hulltheatres.co.uk/whats-on/',
          event.price,
          false,
          new Date(),
          new Date()
        ]
      );
      
      console.log(`✅ ${event.title} (${slug})`);
    } catch (error) {
      console.error(`❌ Error inserting ${event.title}:`, error.message);
    }
  }
  
  await connection.end();
  console.log(`\n🎉 Successfully imported ${eventsData.length} events!`);
}

main().catch(console.error);
