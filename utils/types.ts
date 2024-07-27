export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type BlogType = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  createdAt: string;
};
