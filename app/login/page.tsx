'use client'
import Image from 'next/image';
import * as React from 'react';
import { Checkbox, Link, TextField, FormControlLabel, Button, Divider } from '@mui/material';
import backgroundImg from '@/public/img/backgroundLogin7.jpg';
import useUserAuth from '@/components/helpers/useUserAuth';

type Props = {}

const Login = (props: Props) => {
    const [type, setType] = React.useState("signIn");

    const { user, handleUserChange } = useUserAuth();

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
                            <Button variant='contained' size='small' className={`rounded-none rounded-l-full shadow-none ${type === 'signUp' ? 'bg-gray-600 hover:bg-gray-600' : 'shadow-lg'}`} onClick={() => setType("signIn")}>Sign In</Button>
                            <Button variant='contained' size='small' className={`rounded-none rounded-r-full shadow-none ${type === 'signIn' ? 'bg-gray-600 hover:bg-gray-600' : 'shadow-lg'}`} onClick={() => setType("signUp")}>Sign Up</Button>
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
                            <h1 className='text-primary text-2xl m-0'>Sign In</h1>
                            <TextField id='userSignIn' label='User Name' variant='standard' size='small' fullWidth required name='user' className='my-4' onChange={handleUserChange} />
                            <TextField id='passwordSignIn' label='Password' variant='standard' size='small' fullWidth required name='password' className='my-4' type='password' onChange={handleUserChange} />
                            <div className='w-full flex justify-between items-center text-sm '>
                                <FormControlLabel control={<Checkbox size='small' />} label="Remember me" classes={{ label: 'text-xs' }} />
                                <Link href="#" underline="hover" className='text-xs text-black'>Forgot password?</Link>
                            </div>
                            <div className='w-full flex flex-col items-center justify-center'>
                                <Button variant='contained' size='large' className='w-2/5 rounded-full my-4'>Sign In</Button>
                                <Link onClick={() => setType("signUp")} underline="hover" className='text-xs'>Create an account</Link>
                            </div>
                        </div>
                        <div className={`bg-white signUp h-3/6 flex flex-col justify-center mx-6 ${type === 'signIn' ? 'translate-y-2 ease-in opacity-0 duration-500' : '-translate-y-full ease-out opacity-100 duration-500'}`}>
                            <h1 className='text-primary text-2xl m-0'>Sign Up</h1>
                            <TextField id='userSignUp' label='User Name' variant='standard' size='small' fullWidth required name='user' className='my-4' onChange={handleUserChange} />
                            <TextField id='passwordSignUp' label='Password' variant='standard' size='small' fullWidth required name='password' className='my-4' type='password' onChange={handleUserChange} />
                            <TextField id='confirmPasswordSignUp' label='Confirm Password' variant='standard' size='small' fullWidth required name='temp_password' className='my-4' type='password' />
                            <div className='w-full flex flex-col items-center justify-center'>
                                <Button variant='contained' size='large' className='w-2/5 rounded-full my-4'>Sign Up</Button>
                                <Link onClick={() => setType("signIn")} underline="hover" className='text-xs'>Have an account already?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login