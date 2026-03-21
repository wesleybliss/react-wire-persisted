import type React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export type ListItemProps = {
    children: React.ReactNode
    active?: boolean
}

const ListItem = ({
    active,
    children,
    ...props
}: ListItemProps & ComponentPropsWithoutRef<'li'>) => {
    return (
        <li
            className={`
                p-4 cursor-pointer hover:bg-slate-300
                ${active ? 'bg-slate-200' : ''}
            `}
            {...props}
        >
            {children}
        </li>
    )
}

export default ListItem
