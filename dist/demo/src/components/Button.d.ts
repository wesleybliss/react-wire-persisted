import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
export type ButtonProps = {
    children: React.ReactNode;
    className?: string;
};
declare const Button: ({ className, children, ...props }: ButtonProps & ComponentPropsWithoutRef<"button">) => import("react/jsx-runtime").JSX.Element;
export default Button;
