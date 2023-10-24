import { Breadcrumbs, Link } from '@mui/material'
import React from 'react'

interface BreadcrumObject {
    name: string;
    href: string;
}

type Props = {
    items: BreadcrumObject[]
}

const BreadCrumb = (props: Props) => {

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                props.items.map((breadcrumb, idx) =>
                    <Link underline="hover" color={idx === props.items.length - 1 ? "primary" : "inherit"} href={breadcrumb.href}>
                        {breadcrumb.name}
                    </Link>
                )
            }
        </Breadcrumbs>
    )
}

export default BreadCrumb