// noinspection ES6ConvertVarToLetConst

import type { Wire } from '@forminator/react-wire'
import type StorageProvider from '@/providers/StorageProvider'

declare global {
    interface Window {
        app?: Record<string, unknown>
    }

    var __RWP_LOGGING_ENABLED__: boolean | undefined
    var __RWP_STORAGE__: StorageProvider | undefined
    var __RWP_REGISTERED_WIRES__:
        | Map<string, Wire<unknown> | Pick<Wire<unknown>, 'getValue' | 'setValue' | 'subscribe'>>
        | undefined
}
