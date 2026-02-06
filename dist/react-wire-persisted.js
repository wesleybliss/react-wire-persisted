import { createWire as F } from '@forminator/react-wire'
import { useRef as A, useEffect as E } from 'react'

;(() => {
    const e = {}
    try {
        if (process) {
            ;(process.env = Object.assign({}, process.env)), Object.assign(process.env, e)
            return
        }
    } catch {}
    globalThis.process = { env: e }
})()
const w = {},
    T = (e) => {
        w[e] = e
    },
    x = (e) => T(e),
    N = () => w,
    K = (e, t = null) => {
        const s = t || w
        return e
            ? Object.keys(s).reduce(
                  (r, i) => ({
                      ...r,
                      [i]: `${e}.${s[i]}`,
                  }),
                  {},
              )
            : s
    },
    h = {
        __IS_FAKE_LOCAL_STORAGE__: !0,
    },
    S = {
        getItem: (e) => h[e],
        setItem: (e, t) => {
            h[e] = t
        },
        removeItem: (e) => {
            delete h[e]
        },
        // Make Object.keys() work properly for _resetAll method
        ...h,
    }
let b = !1,
    _ = !1,
    U = !1
typeof window < 'u' &&
    ((b = !0),
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', () => {
              _ = !0
          })
        : (_ = !0))
const d = () => b,
    P = () => _,
    R = () => U,
    O = () => {
        U = !0
    },
    y = () => {
        if (!b) return !1
        try {
            const e = '__rwp_test__'
            return window.localStorage.setItem(e, 'test'), window.localStorage.removeItem(e), !0
        } catch {
            return !1
        }
    },
    v = (e) => {
        const t = typeof e
        return e === null ? !0 : Array.isArray(e) || t === 'object' ? !1 : t !== 'function'
    },
    G = /* @__PURE__ */ Object.freeze(
        /* @__PURE__ */ Object.defineProperty(
            {
                __proto__: null,
                addKey: T,
                fakeLocalStorage: S,
                getHasHydrated: P,
                getHasHydratedStorage: R,
                getIsClient: d,
                getKeys: N,
                getPrefixedKeys: K,
                isLocalStorageAvailable: y,
                isPrimitive: v,
                key: x,
                markStorageAsHydrated: O,
            },
            Symbol.toStringTag,
            { value: 'Module' },
        ),
    )
class I {
    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
     * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
     */
    constructor(t, s) {
        if (new.target === I) throw TypeError('StorageProvider is abstract. Extend this class to implement it')
        ;(this.namespace = t || null), (this.registry = s /* istanbul ignore next */ || {})
    }
    /**
     * Sets the namespace for this storage provider, and migrates
     * all stored values to the new namespace
     * @param {String} namespace New namespace for this storage provider
     */
    /* istanbul ignore next */
    setNamespace(t) {}
    /**
     * Registers an item with it's initial value. This is used for logging, resetting, etc.
     * @param {String} key Storage item's key
     * @param {*} initialValue Storage item's initial value
     */
    register(t, s) {
        this.registry[t] = s
    }
    /**
     * Reads an item from storage
     * @param {String} key Key for the item to retrieve
     */
    /* istanbul ignore next */
    getItem(t) {}
    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    /* istanbul ignore next */
    setItem(t, s) {}
    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
     */
    /* istanbul ignore next */
    removeItem(t, s = !1) {}
    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    /* istanbul ignore next */
    getAll() {}
    /**
     *
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
     */
    /* istanbul ignore next */
    _resetAll(t = !0, s = [], r = !1) {}
    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    resetAll(t = []) {}
    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    removeAll(t = []) {}
}
class V extends I {
    constructor(t = null, s = {}) {
        super(t, s), (this.storage = S), (this._isUsingFakeStorage = !0)
    }
    getStorage() {
        return y() ? window.localStorage : S
    }
    setNamespace(t) {
        if (!this.namespace) {
            this.namespace = t
            return
        }
        if (this.namespace === t) return
        const s = JSON.parse(JSON.stringify(this.getAll()))
        this.removeAll()
        for (const [r, i] of Object.entries(s)) {
            const o = r.replace(this.namespace, t)
            this.setItem(o, i)
        }
        this.namespace = t
    }
    getItem(t) {
        const s = this.storage.getItem(t)
        if (s == null) return null
        try {
            return JSON.parse(s)
        } catch {
            return s
        }
    }
    setItem(t, s) {
        let r = s
        return r != null && (r = v(s) ? s : JSON.stringify(s)), this.storage.setItem(t, r)
    }
    removeItem(t, s = !1) {
        return s && delete this.registry[t], this.storage.removeItem(t)
    }
    getAll() {
        const t = `${this.namespace}.`
        return Object.keys(this.storage).reduce(
            (s, r) => ((!this.namespace || r.startsWith(t)) && (s[r] = this.storage.getItem(r)), s),
            {},
        )
    }
    _resetAll(t = !0, s = [], r = !1) {
        const i = `${this.namespace}.`
        Object.keys(this.storage).forEach((o) => {
            const g = this.namespace ? o.startsWith(i) : !0,
                p = s?.includes(o) || !1
            !g ||
                p ||
                (t
                    ? Object.hasOwn(this.registry, o)
                        ? this.storage.setItem(o, this.registry[o])
                        : this.storage.removeItem(o)
                    : (this.storage.removeItem(o), r && delete this.registry[o]))
        })
    }
    resetAll(t = [], s = !1) {
        this._resetAll(!0, t || [], s)
    }
    removeAll(t = [], s = !1) {
        this._resetAll(!1, t || [], s)
    }
    /**
     * Attempt to upgrade from fake storage to real localStorage
     * This is useful for hydration scenarios
     */
    upgradeToRealStorage() {
        return !this._isUsingFakeStorage || !y()
            ? !1
            : ((this.storage = window.localStorage), (this._isUsingFakeStorage = !1), !0)
    }
    /**
     * Check if currently using fake storage
     */
    isUsingFakeStorage() {
        return this._isUsingFakeStorage
    }
}
const a = Math.random().toString(36).substring(7)
console.log('[RWP] Module initialized, instance ID:', a)
const j = {
    logging: {
        enabled: !1,
    },
}
const W = V
console.log('[RWP] About to check global storage, instanceId:', a)
let n
try {
    globalThis.__RWP_STORAGE__
        ? console.log('[RWP] Using existing global storage in instance:', a)
        : (console.log('[RWP] Creating global storage in instance:', a), (globalThis.__RWP_STORAGE__ = new W())),
        (n = globalThis.__RWP_STORAGE__),
        console.log('[RWP] Storage assigned successfully')
} catch (e) {
    console.error('[RWP] Error setting up global storage:', e), (n = new W())
}
let f = { ...j },
    m = []
typeof globalThis < 'u' &&
    (globalThis.__RWP_REGISTERED_WIRES__
        ? console.log('[RWP] Using existing global registeredWires in instance:', a)
        : (console.log('[RWP] Creating global registeredWires in instance:', a),
          (globalThis.__RWP_REGISTERED_WIRES__ = /* @__PURE__ */ new Map())))
const l = globalThis.__RWP_REGISTERED_WIRES__ || /* @__PURE__ */ new Map()
console.log('[RWP] registeredWires Map reference in instance:', a, 'size:', l.size)
const C = () => n.namespace,
    M = () => n,
    $ = () => f,
    D = (e) => {
        console.log('[RWP] setNamespace() called with:', e, 'registered wires before:', l.size),
            n.setNamespace(e),
            (n = new W(e || C())),
            console.log('[RWP] setNamespace() done, registered wires after:', l.size)
    },
    J = (e) => {
        if (
            ((f = {
                ...f,
                ...e,
            }),
            f.logging.enabled)
        )
            for (console.info('Flushing', m.length, 'pending logs'); m.length; ) console.log(...m.shift())
    },
    H = () => {
        console.log('[RWP] refreshAllWires() called in instance:', a, 'registered wires:', l.size),
            u('react-wire-persisted: refreshAllWires() called, registered wires:', l.size),
            l.forEach((e, t) => {
                const s = n.getItem(t),
                    r = e.getValue()
                console.log('[RWP] Checking wire', t, {
                    storedValue: s,
                    currentValue: r,
                    willUpdate: s !== null && s !== r,
                }),
                    u('react-wire-persisted: Checking wire', t, {
                        storedValue: s,
                        currentValue: r,
                        willUpdate: s !== null && s !== r,
                    }),
                    s !== null &&
                        s !== r &&
                        (console.log('[RWP] Refreshing wire', t, 'with stored value', s),
                        u('react-wire-persisted: Refreshing wire', t, 'with stored value', s),
                        e.setValue(s))
            })
    },
    k = () => {
        if (
            (console.log('[RWP] upgradeStorage() called in instance:', a, {
                isClient: d(),
                isUsingFakeStorage: n.isUsingFakeStorage(),
            }),
            u('react-wire-persisted: upgradeStorage() called', {
                isClient: d(),
                isUsingFakeStorage: n.isUsingFakeStorage(),
            }),
            !d())
        )
            return !1
        const e = n.upgradeToRealStorage()
        return (
            console.log('[RWP] upgradeToRealStorage() returned', e),
            u('react-wire-persisted: upgradeToRealStorage() returned', e),
            e &&
                (O(),
                console.log('[RWP] Upgraded to real localStorage, calling refreshAllWires()'),
                u('react-wire-persisted: Upgraded to real localStorage after hydration'),
                H()),
            e
        )
    },
    u = (...e) => {
        f.logging.enabled ? console.log(...e) : m.push(e)
    },
    q = (e, t = null) => {
        if (
            (console.log('[RWP] createPersistedWire() called in instance:', a, 'key:', e, 'value:', t),
            !e && typeof e != 'number')
        )
            throw new Error(`createPersistedWire: Key cannot be a falsey value (${e}}`)
        n.register(e, t)
        const s = F(t),
            r = () => s.getValue(),
            i = (c) => (
                console.log(
                    '[RWP] setValue called in instance:',
                    a,
                    'key:',
                    e,
                    'isUsingFakeStorage:',
                    n.isUsingFakeStorage(),
                ),
                n.setItem(e, c),
                s.setValue(c)
            ),
            o = (c) => {
                s.subscribe(c)
            }
        let g = t
        const p = R() || !n.isUsingFakeStorage()
        if (p && d()) {
            const c = n.getItem(e)
            c !== null && (g = c)
        }
        return (
            u('react-wire-persisted: create', e, {
                value: t,
                initialValue: g,
                hasHydratedStorage: R(),
                isUsingFakeStorage: n.isUsingFakeStorage(),
                canReadStorage: p,
            }),
            g !== t && i(g),
            l.set(e, {
                getValue: r,
                setValue: i,
                subscribe: o,
            }),
            console.log('[RWP] Wire registered, total wires:', l.size, 'keys:', Array.from(l.keys())),
            {
                ...s,
                getValue: r,
                setValue: i,
                subscribe: o,
            }
        )
    },
    B = (e = {}) => {
        const { autoUpgrade: t = !0, onUpgrade: s } = e,
            r = A(!1)
        return (
            E(() => {
                if (!t || r.current || !d()) return
                const i = () => {
                    P() && !r.current && k() && ((r.current = !0), s?.())
                }
                i()
                const o = setTimeout(i, 0)
                return () => clearTimeout(o)
            }, [t, s]),
            {
                hasUpgraded: r.current,
            }
        )
    }
function Q({ children: e, onUpgrade: t, autoUpgrade: s = !0 }) {
    const r = A(!1)
    return (
        E(() => {
            if (!s || r.current || !d()) return
            const i = () => {
                P() && !r.current && k() && ((r.current = !0), t?.())
            }
            i()
            const o = setTimeout(i, 0)
            return () => clearTimeout(o)
        }, [s, t]),
        e
    )
}
export {
    Q as HydrationProvider,
    q as createPersistedWire,
    j as defaultOptions,
    C as getNamespace,
    $ as getOptions,
    M as getStorage,
    D as setNamespace,
    J as setOptions,
    k as upgradeStorage,
    B as useHydration,
    G as utils,
}
