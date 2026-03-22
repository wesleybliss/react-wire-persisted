import type { ReactNode } from 'react';
/**
 * A Next.js App Router compatible component that handles automatic storage upgrade
 * after hydration. Use this in your root layout.
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {Function} props.onUpgrade Callback called when storage is upgraded
 * @param {Boolean} props.autoUpgrade Whether to automatically upgrade storage (default: true)
 */
export type HydrationProviderProps = {
    children: ReactNode;
    onUpgrade?: () => void;
    autoUpgrade?: boolean;
};
declare const HydrationProvider: ({ children, onUpgrade, autoUpgrade }: HydrationProviderProps) => ReactNode;
export default HydrationProvider;
