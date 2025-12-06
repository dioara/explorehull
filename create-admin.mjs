import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { adminUsers } from './drizzle/schema.js';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function createAdmin() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  const email = 'admin@explorehull.com';
  const password = 'Admin123!'; // Change this password after first login
  const name = 'Admin User';

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(adminUsers).values({
      email,
      passwordHash,
      name,
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password after first login!');
    console.log('Login at: /admin/login');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('ℹ️  Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  } finally {
    await connection.end();
  }
}

createAdmin();
