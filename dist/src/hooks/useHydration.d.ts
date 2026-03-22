export type UseHydrationOptions = {
    autoUpgrade?: boolean;
    onUpgrade?: () => void;
};
/**
 * React hook that handles automatic storage upgrade after hydration
 * This should be used in the root component of your application
 *
 * @param {Object} options Configuration options
 * @param {Boolean} options.autoUpgrade Whether to automatically upgrade storage (default: true)
 * @param {Function} options.onUpgrade Callback called when storage is upgraded
 */
export declare const useHydration: (options?: UseHydrationOptions) => {
    hasUpgraded: boolean;
};
