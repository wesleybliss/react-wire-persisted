import type React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
export type ListItemProps = {
    children: React.ReactNode;
    active?: boolean;
};
declare const ListItem: ({ active, children, ...props }: ListItemProps & ComponentPropsWithoutRef<"li">) => import("react/jsx-runtime").JSX.Element;
export default ListItem;
