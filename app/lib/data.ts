'use server';
import bcrypt from 'bcrypt';
import { NewBlogType, UserCredentials, UserType } from '@/utils/types';
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

export async function fetchBlogById(blog_id: string) {
  try {
    const data = await sql`
      SELECT title, content, user_id FROM blogs WHERE id = ${blog_id}
    `;
    const blog = data.rows[0];
    return blog;
  } catch (error) {
    console.error('Database error:', error);
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

export async function fetchUserBlogs(user_id: string) {
  try {
    const data = await sql`
      SELECT * FROM blogs WHERE user_id = ${user_id}
    `;
    const blogs = data.rows;
    return blogs;
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

export async function authenticateUser(credentials: UserCredentials) {
  console.log('URL:', process.env.POSTGRES_URL as string);
  try {
    const { name, password } = credentials;
    console.log('credentials:', name, password);
    console.log('auth sql:', sql);

    let user = null;

    const data =
      await sql`SELECT * FROM users WHERE name = ${name} OR email = ${name}`;
    console.log('data:', data);
    const foundUser = data.rows[0] as UserType;

    if (foundUser) {
      user = foundUser;

      if (await bcrypt.compare(password, user.password)) {
        return { success: true, msg: 'User Authenticated', user };
      } else {
        return { success: false, msg: 'Incorrect Password' };
      }
    } else {
      return { success: false, msg: 'User Could Not Be Found' };
    }
  } catch (error) {
    console.error('Login Error:', error);
  }
}

export async function addBlog(newBlog: NewBlogType) {
  try {
    const created_at = new Date().toLocaleDateString();
    const { title, content, user_id } = newBlog;
    console.log('NEW BLOG:', newBlog);

    const data = await sql`
      INSERT INTO blogs (user_id, title, content, created_at)
      VALUES(${user_id}, ${title}, ${content}, ${created_at})
    `;

    console.log('data:', data);
  } catch (error) {
    console.error('New Blog Error:', error);
  }
}
