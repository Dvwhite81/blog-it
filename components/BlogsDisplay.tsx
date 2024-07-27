import { fetchBlogs } from '@/app/lib/data';
import SingleBlog from './SingleBlog';
import { BlogType } from '@/utils/types';

export default async function BlogsDisplay() {
  const blogs = await fetchBlogs() as BlogType[];

  return (
    <div>
      {blogs.map((blog) => <SingleBlog key={blog.id} blog={blog} />)}
    </div>
  );
};