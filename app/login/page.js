'use client'
import Image from 'next/image';
// import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// const TextField = dynamic(() => import('@mui/material/TextField'));


import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
// import { TextField } from '@mui/material';

import backgroundImg from '@/public/img/backgroundLogin7.jpg';
import UseAuth from '@/components/helpers/UseAuth'
import useUserAuth from '@/components/helpers/UseUserAuth';
import UseSignUp from '@/components/helpers/UseSignUp';
import { useRouter } from 'next/navigation';
import style from '../../styles/Login.module.css'
import { useDispatch } from 'react-redux';
import { setAuthInfo } from '@/lib/redux/slices/authSlice/authSlice';

const Login = () => {
    const router = useRouter();
    const [type, setType] = useState("signIn");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [signInStatus, setSignInStatus] = useState("");
    const [signUpStatus, setSignUpStatus] = useState("");
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [confirmPasswordSignUpText, setConfirmPasswordSignUpText] = useState("");
    const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);

    //handle login from redus
    const dispatch = useDispatch();

    const { setUserInfo, userInfo, handleUserChange } = useUserAuth();

    const handleConfirmPassword = (e) => {
        const _confirmPassword = e.target.value
        setConfirmPasswordSignUpText(_confirmPassword);
        setPasswordMatch(() => _confirmPassword === userInfo.password);
    }

    const handleBlur = ({ target }) => {
        if (target.name == "username") setUsernameEmpty(!target.value);
        if (target.name == "password") setPasswordEmpty(!target.value);
        if (target.name == "confirmPassword") setConfirmPasswordEmpty(!target.value);
    }

    const handleSignIn = async () => {
        if (!userInfo.username) {
            setUsernameEmpty(true);
        }
        if (!userInfo.password) {
            setPasswordEmpty(true);
        }
        if (userInfo.username && userInfo.password) {

            // console.log("userInfo: ", userInfo);
            let status = await UseAuth(userInfo);

            if (status) {
                const updateStatus = { ...status, username: userInfo.username };

                dispatch(setAuthInfo({
                    userInfo: updateStatus
                }));

                router.push("/");
            } else {
                setSignInStatus("fail");
                // router.push("/");
            }
        }
    }

    const handleSignUp = async () => {
        if (userInfo.username && userInfo.password) {
            let status = await UseSignUp(userInfo);
            if (status) {
                setType("signIn");
                setUserInfo({ username: "", password: "" });
                setConfirmPasswordSignUpText("");
                setSignUpStatus("signIn");
            } else {
                setSignUpStatus("fail");
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && type === "signUp") {
            handleSignUp();
        } else if (e.key === "Enter" && type === "signIn") {
            handleSignIn();
        }
    }

    useEffect(() => {
        setUsernameEmpty(false);
        setPasswordEmpty(false);
        setConfirmPasswordEmpty(false);
    }, [type, userInfo])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [type, userInfo])

    return (
        <div className="w-screen h-screen flex items-center bg-slate-50">
            <div className="container m-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary">
                <div className="grid grid-cols-2 lg:grid-cols-6 h-3/6">
                    <div className='hidden lg:block col-span-4 bg-white relative'>
                        <Image
                            alt='Image Login'
                            src={backgroundImg}
                            priority
                            fill
                            sizes="100vw, 50vw, 33vw"
                        />
                    </div>
                    <div className='col-span-2 bg-white'>
                        <div className='toggle flex justify-end m-3'>
                            <Button
                                variant='contained'
                                size='small'
                                className={`${style.btn_switch_left} ${type === 'signUp' ? style.btn_inactive : ""}`}
                                onClick={() => setType("signIn")}>
                                Sign In
                            </Button>
                            <Button
                                variant='contained'
                                size='small'
                                className={`${style.btn_switch_right} ${type === 'signIn' ? style.btn_inactive : ""}`}
                                /* onClick={() => setType("signUp")} */>
                                Sign Up
                            </Button>
                        </div>
                        <div className='loginLogo h-1/6 w-full flex justify-center items-center m-0'>
                            <div className='flex flex-row justify-center items-center rounded-xl'>
                                <Image
                                    alt='Logo Login'
                                    src={'/img/Logo_DIGI-TEXX_2021_Blue.jpg'}
                                    width={300}
                                    height={70}
                                    priority
                                />
                            </div>
                        </div>
                        <div className={`signIn h-3/6 flex flex-col justify-center mx-6 ${type === 'signUp' ? '-translate-y-2 ease-out opacity-0 duration-500' : 'translate-y-2 ease-in opacity-100 duration-500'}`} >
                            <h1 className='text-primary text-2xl m-0 my-1'>Sign In</h1>
                            <TextField
                                id='userSignIn'
                                label='User Name'
                                variant='standard'
                                size='small'
                                fullWidth
                                required
                                name='username'
                                helperText={usernameEmpty ? "Username cannot be empty!" : signInStatus === "fail" ? "Username or Password is not correct!" : " "}
                                error={usernameEmpty || signInStatus === 'fail'}
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                id='passwordSignIn'
                                label='Password'
                                variant='standard'
                                size='small'
                                fullWidth
                                required
                                name='password'
                                type='password'
                                helperText={passwordEmpty ? "Password cannot be empty!" : " "}
                                error={passwordEmpty}
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                            />
                            <div className='w-full flex justify-between items-center text-sm '>
                                <FormControlLabel
                                    control={<Checkbox size='small' />}
                                    label="Remember me"
                                    classes={{ label: 'text-xs' }}
                                />
                                <Link
                                    href="#"
                                    underline="hover"
                                    className='text-xs text-black cursor-pointer'>
                                    Forgot password?
                                </Link>
                            </div>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <Button
                                    variant='contained'
                                    size='large'
                                    className='w-2/5 rounded-full my-4'
                                    onClick={handleSignIn}>
                                    Sign In
                                </Button>
                                <Link
                                    /* onClick={() => setType("signUp")} */
                                    underline="hover"
                                    className='text-xs cursor-pointer'>
                                    Create an account
                                </Link>
                            </div>
                        </div>
                        <div className={`signUp bg-white h-3/6 flex flex-col justify-center mx-6 ${type === 'signIn' ? 'translate-y-2 ease-in opacity-0 duration-500' : '-translate-y-full ease-out opacity-100 duration-500'}`}>
                            <h1 className='text-primary text-2xl my-1'>Sign Up</h1>
                            <TextField
                                id='userSignUp'
                                label='User Name'
                                variant='standard'
                                size='small'
                                fullWidth
                                required
                                name='username'
                                helperText={usernameEmpty ? "Username cannot be empty" : signUpStatus === "fail" ? "User already taken!" : " "}
                                error={usernameEmpty || signUpStatus === 'fail'}
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                value={userInfo.username}
                            />
                            <TextField
                                id='passwordSignUp'
                                label='Password'
                                variant='standard'
                                size='small'
                                fullWidth
                                required
                                name='password'
                                type='password'
                                helperText={passwordEmpty ? "Password cannot be empty" : " "}
                                error={passwordEmpty}
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                value={userInfo.password}
                            />
                            <TextField
                                id='confirmPasswordSignUp'
                                label='Confirm Password'
                                variant='standard'
                                size='small'
                                fullWidth
                                required
                                name='confirmPassword'
                                type='password'
                                helperText={confirmPasswordEmpty ? "Password cannot be empty" : !passwordMatch ? "Passwords does not match" : " "}
                                onChange={handleConfirmPassword}
                                error={confirmPasswordEmpty || !passwordMatch}
                                onBlur={handleBlur}
                                value={confirmPasswordSignUpText}
                            />
                            <div className='w-full flex flex-col items-center justify-center'>
                                <Button
                                    variant='contained'
                                    size='large'
                                    className='w-2/5 rounded-full my-4'
                                    onClick={handleSignUp}>
                                    Sign Up
                                </Button>
                                <Link
                                    onClick={() => setType("signIn")}
                                    underline="hover"
                                    className='text-xs cursor-pointer'>
                                    Have an account already?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login;