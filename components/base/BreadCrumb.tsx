import { Breadcrumbs, Link } from '@mui/material'
import React from 'react'

export interface BreadcrumbObject {
    name: string;
    component: string;
}

type Props = {
    items: BreadcrumbObject[]
    selectedComponent: (key: string) => void
}

const BreadCrumb = (props: Props) => {

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                props.items.map((breadcrumb, idx) =>
                    <Link key={breadcrumb.name} underline="hover" color={idx === props.items.length - 1 ? "primary" : "inherit"} onClick={() => props.selectedComponent(breadcrumb.component)}>
                        {breadcrumb.name}
                    </Link>
                )
            }
        </Breadcrumbs>
    )
}

export default BreadCrumb