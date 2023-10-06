import { useState } from 'react';

interface User {
  username: string,
  password: string
}
export default function useUserAuth() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  return {
    userInfo,
    handleUserChange
  };
}
