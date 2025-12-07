import { db } from './server/db.ts';

const events = await db.query.events.findMany({ limit: 15, orderBy: (events, { desc }) => [desc(events.startDate)] });
console.log(`\nFound ${events.length} events:\n`);
events.forEach(e => {
  console.log(`- ${e.title} (${e.startDate?.toISOString().split('T')[0]}) - ${e.category}`);
});
process.exit(0);
