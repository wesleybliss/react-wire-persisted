# Persisted React Wire

> Persisted storage for [React Wire](https://github.com/forminator/react-wire)

## Install

```shell
$ pnpm add @forminator/react-wire react-wire-persisted
```

## Usage

```typescript
// constants.ts
import { key, getPrefixedKeys } from 'react-wire-persisted/lib/utils'

export const NS = 'myapp'

key('foo')

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }
```

```tsx
// index.tsx
import { NS } from './constants'
import * as rwp from 'react-wire-persisted'

rwp.setNamespace(NS)

rwp.setOptions({
    logging: {
        enabled: true,
    },
    storageProvider: rwp.MemoryStorageProvider,
})

// Normal React init code
```

```typescript
// store.ts
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from './constants'

type User = {
    id: number
    email: string
}

export const user = createPersistedWire<User | null>(keys.foo, null)
```

```tsx
// SomeComponent.tsx
import { useWireState } from '@forminator/react-wire'
import * as store from './store'

const SomeComponent = () => {
    const [user, setUser] = useWireState(store.user)
    return (
        <div>
            <p>User: {user?.email}</p>
            <button onClick={() => setUser({ ...user, email: 'example@gmail.com'})}>
                Change Email
            </button>
        </div>
    )
}

export default SomeComponent
```

See the [demo](demo) folder for a more complete example.

## Storage Providers

By default, this library uses `localStorage` via `LocalStorageProvider` in browser environments. However, you can customize the storage behavior using `setOptions`:

```typescript
import { setOptions, createPersistedWire } from 'react-wire-persisted'
import { MemoryStorageProvider } from 'react-wire-persisted'

// Use in-memory storage (useful for testing or SSR)
setOptions({
    storageProvider: MemoryStorageProvider,
})
```

This is useful for:
- **Testing**: Avoid localStorage in unit tests
- **SSR**: Use in-memory storage during server-side rendering
- **Custom storage**: Implement your own provider by extending `RWPStorageProvider`

See [LocalStorageProvider](src/providers/LocalStorageProvider.ts) and [MemoryStorageProvider](src/providers/MemoryStorageProvider.ts) for implementation examples.

## API

### `createPersistedWire<T>(key: string, value: T | null): PersistedWire<T>`

Creates a persisted Wire that automatically syncs with the configured storage provider.

### `setNamespace(namespace: string): void`

Sets the namespace for storage keys. This prefixes all keys to avoid collisions.

### `setOptions(options: Partial<RWPOptions>): void`

Configure library options:
- `logging.enabled`: Enable/disable logging (default: `false`)
- `storageProvider`: Custom storage provider class

### `getOptions(): RWPOptions`

Get current options.

### `getNamespace(): string | null`

Get current namespace.

### `getStorage(): RWPStorageProvider`

Get the current storage provider instance.

### `upgradeStorage(): boolean`

Attempts to upgrade from fake storage (used during SSR) to real localStorage. Returns `true` if upgrade was successful. Call this after hydration in client-side code.

## Building

```shell
$ pnpm build
```

## Contributing

Contributions are welcome. Please feel free to submit a [GitHub Issue](https://github.com/forminator/react-wire-persisted/issues) or pull request.

### Development

```shell
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run linter
pnpm lint
```

## Publishing

To publish a new version to npm:

```shell
# Build the project
pnpm build

# Bump version (choose one)
npm version patch  # bug fixes (e.g., 2.1.0 -> 2.1.1)
npm version minor  # new features (e.g., 2.1.0 -> 2.2.0)
npm version major  # breaking changes (e.g., 2.1.0 -> 3.0.0)

# Push changes and tags
git push
git push --tags

# Publish to npm
npm publish
```

## Miscellaneous

For generating some sample data:

```javascript
import nickGenerator from 'nick-generator'

export const categories = [
    'Entrepeneurs',
    'Investors',
    'Superheroes',
    'Engineers',
    'Chefs',
    'Performers',
    'Musicians',
].reduce((acc, it, i) => [
    ...acc,
    {
        id: (i + 1),
        name: it,
    }
], [])

export const people = Object.values(categories).map(category => {
    
    return Array(8).fill(null).map((_, i) => {
        
        const [firstName, lastName] = nickGenerator().split(' ')
        
        return {
            id: (i + 1),
            categoryId: category.id,
            firstName,
            lastName,
        }
        
    })
    
}).flat()
```
