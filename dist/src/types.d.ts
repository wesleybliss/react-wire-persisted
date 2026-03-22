import type { Wire } from '@forminator/react-wire';
export type RWPOptions = {
    logging: {
        enabled: boolean;
    };
};
export type PersistedWire<T> = Wire<T | null>;
export interface InternalStorage {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}
export type AnyStorage = InternalStorage | Storage;
