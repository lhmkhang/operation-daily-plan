import { useState } from 'react';

export default function UseUserAuth() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });

  const handleUserChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  return {
    setUserInfo,
    userInfo,
    handleUserChange
  };
}