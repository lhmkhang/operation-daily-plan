import { useState } from 'react';

interface User {
  user: string,
  password: string
}
export default function useUserAuth() {
  const [user, setUser] = useState({
    user: '',
    password: ''
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  console.log(user);


  return {
    user,
    handleUserChange
  };
}
