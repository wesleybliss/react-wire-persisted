import StorageProvider from '@/providers/StorageProvider'
import type { Wire } from '@forminator/react-wire'

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
