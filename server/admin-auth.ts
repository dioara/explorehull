import bcrypt from "bcryptjs";
import { getDb } from "./db";
import { adminUsers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new admin user
 */
export async function createAdminUser(email: string, password: string, name: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const passwordHash = await hashPassword(password);
  
  await db.insert(adminUsers).values({
    email,
    passwordHash,
    name,
  });
}

/**
 * Authenticate an admin user
 */
export async function authenticateAdmin(email: string, password: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  
  if (result.length === 0) return null;

  const admin = result[0];
  const isValid = await verifyPassword(password, admin.passwordHash);

  if (!isValid) return null;

  // Update last login time
  await db.update(adminUsers)
    .set({ lastLoginAt: new Date() })
    .where(eq(adminUsers.id, admin.id));

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };
}

/**
 * Get admin user by ID
 */
export async function getAdminById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
  
  if (result.length === 0) return null;

  const admin = result[0];
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };
}
