#!/usr/bin/env node
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { events } from './drizzle/schema.ts';
import { readFileSync } from 'fs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  process.exit(1);
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
      await db.insert(events).values({
        title: event.title,
        description: event.description,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        location: event.venue,
        category: event.category,
        imageUrl: event.imageUrl,
        ticketUrl: event.ticketUrl || 'https://www.hulltheatres.co.uk/whats-on/',
        price: event.price,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`✅ ${event.title}`);
    } catch (error) {
      console.error(`❌ Error inserting ${event.title}:`, error.message);
    }
  }
  
  await connection.end();
  console.log(`\n🎉 Successfully imported ${eventsData.length} events!`);
}

main().catch(console.error);
