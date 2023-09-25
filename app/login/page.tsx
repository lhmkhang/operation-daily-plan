'use client'
import Image from 'next/image';
import * as React from 'react';
import { Checkbox, Link, TextField, FormControlLabel } from '@mui/material';

type Props = {}

const Login = (props: Props) => {

    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="w-screen h-screen flex items-center bg-[url('/img/backgroundLogin2.jpg')] bg-cover">
            <div className="container m-auto h-2/4 w-1/2 px-4 rounded-2xl bg-white">
                <div className="grid grid-cols-5 h-full">
                    <div className='col-span-3'>
                        <Image
                            alt='Image Login'
                            src={'/img/imageLogin2.jpg'}
                            width={600}
                            height={600}
                            style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}
                        />
                    </div>
                    <div className='col-span-2 flex flex-col items-center px-8'>
                        <div className='h-2/6 items-center'>
                            <h1 className='text-center'>Login</h1>
                            <p className='text-center'>Welcome back, let's inspire and be inspired!</p>
                        </div>
                        <div>
                            <TextField id="user" label="User Name" variant="standard" required fullWidth />
                            <TextField id="password" label="Password" variant='standard' type='password' required fullWidth />
                        </div>
                        <div className='w-full flex justify-between items-center text-sm'>
                            <FormControlLabel style={{ fontSize: '0.875rem' }} control={<Checkbox size='small' />} label="Remember me" />
                            <Link href="#" underline="hover">Forgot password?</Link>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login