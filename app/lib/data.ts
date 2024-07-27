import { sql } from '@vercel/postgres';

export async function fetchBlogs() {
  try {
    const data = await sql`
      SELECT * FROM blogs
    `;

    const blogs = data.rows;
    return blogs;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchUsers() {
  try {
    const data = await sql`
      SELECT id, name FROM users
    `;

    const users = data.rows;
    return users;
  } catch (error) {
    console.error('Database error:', error);
  }
}

export async function fetchUserById(user_id: string) {
  try {
    const data = await sql`
      SELECT id, name, email FROM users WHERE id = ${user_id}
    `;
    const user = data.rows[0];
    return user;
  } catch (error) {
    console.error('Database error:', error);
  }
}
