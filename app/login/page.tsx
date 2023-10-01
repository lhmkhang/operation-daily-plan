'use client'
import Image from 'next/image';
import * as React from 'react';
import { Checkbox, Link, TextField, FormControlLabel, Button } from '@mui/material';
import style from './login.module.scss';
type Props = {}

const Login = (props: Props) => {

    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="w-screen h-screen flex items-center bg-[url('/img/backgroundLogin2.jpg')] bg-cover">
            <div className="container m-auto h-2/4 w-1/2 px-4 rounded-2xl bg-background_blur">
                <div className="grid grid-cols-5 h-full">
                    <div className='col-span-3 flex items-center justify-center'>
                        <Image
                            alt='Image Login'
                            src={'/img/imageLogin.png'}
                            width={400}
                            height={400}
                            priority
                            style={{ width: '90%', height: '100%', backgroundSize: 'cover' }}
                        />
                    </div>
                    <div className='col-span-2 flex flex-col items-center shadow-3xl overflow-hidden bg-gradient-to-b from-primary via-blue-300 to-primary' >
                        <div className={`login flex flex-col items-center ${isLogin ? '' : 'hidden'}`}>
                            <h1 className='text-center h-1/6'>Login</h1>
                            <TextField id="user" label="User Name" variant="filled" size='small' fullWidth required sx={{ marginTop: '15px', color: 'white' }} />
                            <TextField id="password" label="Password" variant='filled' type='password' size='small' fullWidth required sx={{ marginTop: '15px' }} />
                            <div className='w-full flex justify-between items-center text-sm py-4'>
                                <FormControlLabel classes={{ label: 'text-sm' }} control={<Checkbox size='small' />} label="Remember me" />
                                <Link href="#" underline="hover">Forgot password?</Link>
                            </div>
                            <div className='w-full flex justify-center items-center text-sm py-1'>
                                <Button variant='contained'>Login</Button>
                            </div>
                        </div>
                        <div className={`signUp flex flex-col items-center bg-white w-full rounded-6_1 ${isLogin ? 'translate-y-16' : ''}`}>
                            <h1 className='text-center h-1/6'>Sign up</h1>
                            <TextField id="user" label="User Name" variant="filled" size='small' fullWidth required sx={{ marginTop: '15px' }} />
                            <TextField id="password" label="Password" variant='filled' type='password' size='small' fullWidth required sx={{ marginTop: '15px' }} />
                            <TextField id="password" label="Confirm Password" variant='standard' type='password' size='small' fullWidth required sx={{ marginTop: '15px' }} />
                            <div className='w-full flex justify-center items-center text-sm py-3'>
                                <Button variant='contained'>Sign up</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login