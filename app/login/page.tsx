'use client'
import Image from 'next/image';
import * as React from 'react';
import TextField from '@mui/material/TextField';

type Props = {}

const Login = (props: Props) => {

    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <div className="w-screen h-screen flex items-center bg-[url('/img/backgroundLogin2.jpg')] bg-cover">
            <div className="container m-auto h-2/4 w-1/2 px-4 rounded-2xl bg-gray-100">
                <div className="grid grid-cols-5 h-full">
                    <div className='border-2 border-black col-span-3'>
                        <Image
                            alt='Image Login'
                            src={'/img/imageLogin2.jpg'}
                            width={600}
                            height={600}
                            style={{ width: '100%', height: '100%', backgroundSize: 'cover' }}
                        />
                    </div>
                    <div className='border-2 border-black col-span-2 flex items-center justify-center'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login