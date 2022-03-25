export declare const defaultOptions: {
    logging: {
        enabled: boolean;
    };
};
/**
 * Gets the namespace of the storage provider
 *
 * @returns {String}
 */
export declare const getNamespace: () => any;
/**
 * Gets the current storage provider class instance
 *
 * @returns {StorageProvider}
 */
export declare const getStorage: () => any;
export declare const getOptions: () => {
    logging: {
        enabled: boolean;
    };
};
/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export declare const setNamespace: (namespace: any) => void;
export declare const setOptions: (value: any) => void;
/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export declare const createPersistedWire: (key: any, value?: any) => {
    getValue: () => any;
    setValue: (newValue: any) => void;
    subscribe: (fn: any) => void;
    ' state-wire': [any, (t: any) => void];
    _getId(): string;
    _getLinkIds(): import("@forminator/react-wire").LinkIds;
    fn: <K extends any>(name: K, value: {}[K]) => () => void;
    fns: {};
    ' fns-wire': {};
};
//# sourceMappingURL=react-wire-persisted.d.ts.map