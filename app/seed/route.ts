import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { blogs, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedBlogs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      content VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL
    );
  `;

  const insertedBlogs = await Promise.all(
    blogs.map(
      (blog) => client.sql`
        INSERT INTO blogs (user_id, title, content, created_at)
        VALUES (${blog.user_id}, ${blog.title}, ${blog.content}, ${blog.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedBlogs;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedBlogs();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
