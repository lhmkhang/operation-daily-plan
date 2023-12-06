'use client'
import * as React from 'react'
import { AuthContext } from "@/components/helpers/AuthenContext";
import { LetterAvatar } from '..';

type Props = {}

const Header = (props: Props) => {

    const { user } = React.useContext(AuthContext);
    const username = JSON.parse(user).username;

    return (
        <div className='w-full h-12 flex justify-end shadow-xl'>
            <LetterAvatar
                key="avatar"
                name={username}
            />
        </div>
    )
}

export default Header