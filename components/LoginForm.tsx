'use client';
import { useAppContext } from '@/context/AppContext';
import { SyntheticEvent, useState } from 'react';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

export default function LoginForm() {
  const { login } = useAppContext();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  const isInvalid = !name || !password;

  const toggleHidden = () => setIsHidden(!isHidden);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isInvalid) return;

    const credentials = { name, password };
    login(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Name or Email..."
        />
      </div>
      <div className="form-control">
        <input
          type={isHidden ? 'password' : 'text'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password..."
        />
        <button type="button" onClick={toggleHidden}>
          {isHidden ? <BiSolidShow /> : <BiSolidHide />}
        </button>
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  );
}
