import React from 'react'
import * as Icons from '@mui/icons-material'

type IconNames = keyof typeof Icons;
type IconProps = {
    iconName: string
}

const IconComponent = (props: IconProps) => {
    
    const IconName = props.iconName as IconNames;
    const Icon = Icons[IconName];
    return <Icon />
}

export default IconComponent