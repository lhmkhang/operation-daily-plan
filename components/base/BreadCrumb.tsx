import { Breadcrumbs, Link } from '@mui/material'
import React from 'react'

export interface BreadcrumbObject {
    name: string;
    href: string;
}

type Props = {
    items: BreadcrumbObject[]
}

const BreadCrumb = (props: Props) => {

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                props.items.map((breadcrumb, idx) =>
                    <Link key={breadcrumb.name} underline="hover" color={idx === props.items.length - 1 ? "primary" : "inherit"} href={breadcrumb.href}>
                        {breadcrumb.name}
                    </Link>
                )
            }
        </Breadcrumbs>
    )
}

export default BreadCrumb