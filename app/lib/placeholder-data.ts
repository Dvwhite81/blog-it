import { BlogType, UserType } from '@/utils/types';

const users: UserType[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Dan',
    email: 'dan@dan.com',
    password: 'password',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Bob',
    email: 'bob@bob.com',
    password: 'password',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Joe',
    email: 'joe@joe.com',
    password: 'password',
  },
];

const blogs: BlogType[] = [
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    title: 'First',
    content: 'The first blog content',
    user_id: users[0].id,
    createdAt: '2022-12-06',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    title: 'Second',
    content: 'The second blog content',
    user_id: users[1].id,
    createdAt: '2022-11-14',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    title: 'Third',
    content: 'The third blog content',
    user_id: users[2].id,
    createdAt: '2022-10-29',
  },
];

export { users, blogs };
