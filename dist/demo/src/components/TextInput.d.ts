import type { ComponentPropsWithoutRef } from 'react';
export type TextInputProps = {
    className?: string;
    type?: string;
};
declare const TextInput: {
    ({ className, type, ...props }: TextInputProps & ComponentPropsWithoutRef<"input">): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        type: string;
    };
};
export default TextInput;
