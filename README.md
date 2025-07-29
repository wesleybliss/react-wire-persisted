# Persisted React Wire

> Persisted storage for [React Wire](https://github.com/forminator/react-wire)

## Install

```shell
$ pnpm add -D @forminator/react-wire react-wire-persisted
```

## Building

```shell
$ pnpm build
$ npm version patch # patch, minor, major
$ git push
$ git push --tags
$ npm publish
```

## Usage

```javascript
// constants.js
import { key, getPrefixedKeys } from 'react-wire-persisted/lib/utils'

export const NS = 'myapp'

key('foo')

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }
```

```javascript
// index.js
import { NS } from './constants'
import * as reactWirePersisted from 'react-wire-persisted'

reactWirePersisted.setNamespace(NS)

// Normal React init code
```

```javascript
// store.js
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from './constants'

export const foo = createPersistedWire(keys.foo, null)
```

```javascript
// SomeComponent.js
import { useWireState } from '@forminator/react-wire'
import * as store from './store'

const SomeComponent = () => {
    const [foo, setFoo] = useWireState(store.foo)
    return (
        <div>
            <p>Foo: {foo}</p>
            <button onClick={() => setFoo('bar')}>
                CHANGE FOO
            </button>
        </div>
    )
}

export default SomeComponent
```

See the [demo](demo) folder for a more complete example.

## Storage Providers

This library uses `localStorage`, and will only work in browser environments.

See [LocalStorageProvider](src/LocalStorageProvider.js) for implementation.

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
