'use client';
import { addBlog } from '@/app/lib/data';
import { useAppContext } from '@/context/AppContext';
import { NewBlogType } from '@/utils/types';
import { redirect } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

export default function NewBlogForm() {
  const { login, loggedInUser } = useAppContext();

  if (!loggedInUser) {
    redirect('/login');
  }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isInvalid = !title || !content;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isInvalid) return;

    const newBlog: NewBlogType = {
      title,
      content,
      user_id: loggedInUser.id,
    };
    addBlog(newBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title..."
        />
      </div>
      <div className="form-control">
        <input
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          placeholder="Content..."
        />
      </div>
      <div>
        <button type="submit">Add Blog</button>
      </div>
    </form>
  );
}
