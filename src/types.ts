import type { Wire } from '@forminator/react-wire'
import type RWPStorageProvider from '@/providers/RWPStorageProvider'

export type RWPOptions = {
    logging: { enabled: boolean }
    storageProvider?: typeof RWPStorageProvider
}

export type PersistedWire<T> = Wire<T>

export interface InternalStorage {
    getItem: (key: string) => string | null
    setItem: (key: string, value: string) => void
    removeItem: (key: string) => void
}

export type AnyStorage = InternalStorage | Storage

export type WireLikeObject = Pick<Wire<unknown>, 'getValue' | 'setValue' | 'subscribe'>
