import { ReactNode } from 'react';

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type NewBlogType = {
  title: string;
  content: string;
  user_id: string;
};

export type BlogType = NewBlogType & {
  id: string;
  created_at: string;
};

export type UserCredentials = {
  name: string;
  password: string;
};

export type AppContextType = {
  loggedInUser: UserType | null;
  login: (credentials: UserCredentials) => void;
  logout: () => void;
};

export type ChildrenProps = {
  children: ReactNode;
};
