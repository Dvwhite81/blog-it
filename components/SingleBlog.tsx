import { fetchUserById } from '@/app/lib/data';
import { BlogType, UserType } from '@/utils/types';

interface SingleBlogProps {
  blog: BlogType;
}

export default async function SingleBlog({ blog }: SingleBlogProps) {
  const { title, content, user_id } = blog;

  const user = (await fetchUserById(user_id)) as UserType;

  return (
    <div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{user.email}</p>
    </div>
  );
}
