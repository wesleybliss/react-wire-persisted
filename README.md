# Persisted React Wire

> Persisted storage for [React Wire](https://github.com/forminator/react-wire)

## Install

```shell
$ yarn add -D @forminator/react-wire react-wire-persisted
```

## Usage

```javascript
// constants.js
export const NS = 'myapp'

const keys = {}

keys.foo = 'foo'

const prefixedKeys = Object.keys(keys).reduce((acc, it) => ({
    ...acc,
    [it]: `${NS}.${keys[it]}`,
}), {})

export { prefixedKeys as keys }
```

```javascript
// App.js
import { NS } from './constants'
import { setNamespace } from 'react-wire-persisted'

setNamespace(NS)

// Normal app code
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

This library uses `localStorage` by default, but you can create your own
storage provider by extending the base class.

```javascript
// MemoryStorageProvider.js
import { StorageProvider } from 'react-wire-persisted'

class MemoryStorageProvider extends StorageProvider {
    
    constructor(namespace = null) {
        super(namespace)
    }
    
    getItem(key) {
        // Your implementation
    }
    
    setItem(key) {
        // Your implementation
    }
    
    removeItem(key) {
        // Your implementation
    }
    
    getAll(namespace = null) {
        // Your implementation
    }
    
    _resetAll(
        namespace = null,
        withDefaults = true,
        excludeKeys = []
    ) {
        // Your implementation
    }
    
    resetAll(namespace = null, excludeKeys = []) {
        // Your implementation
    }
    
    removeAll(namespace = null, excludeKeys = []) {
        // Your implementation
    }
    
}
```

See [LocalStorageProvider](src/LocalStorageProvider.js) for a full example.

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
