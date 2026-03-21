import type React from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export type ButtonProps = {
    children: React.ReactNode
    className?: string
}

const Button = ({
    className,
    children,
    ...props
}: ButtonProps & ComponentPropsWithoutRef<'button'>) => {
    return (
        <button
            className={`
                Button px-4 py-3
                text-gray-800 bg-gray-100
                hover:text-black hover:bg-gray-300
                text-uppercase
                border border-gray-200
                outline:none focus:outline-none
                rounded
                ${className || ''}
            `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
