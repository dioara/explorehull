import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const results = await db.execute('SELECT id, name, imageUrl FROM attractions LIMIT 5');
console.log('Attractions image URLs:');
results[0].forEach(row => {
  console.log(`${row.id}. ${row.name}: ${row.imageUrl}`);
});

await connection.end();
