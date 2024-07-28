'use client';
import LoginForm from '@/components/LoginForm';
import { useAppContext } from '@/context/AppContext';

export default function LoginPage() {
  const { loggedInUser } = useAppContext();

  return loggedInUser ? <p>{loggedInUser.name}</p> : <LoginForm />;
}
