;((i, h) => {
    typeof exports == 'object' && typeof module < 'u'
        ? h(exports, require('@forminator/react-wire'), require('react'))
        : typeof define == 'function' && define.amd
          ? define(['exports', '@forminator/react-wire', 'react'], h)
          : ((i = typeof globalThis < 'u' ? globalThis : i || self),
            h((i['react-wire-persisted'] = {}), i.reactWire, i.React))
})(this, (i, h, m) => {
    'use strict'
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
    const R = {},
        U = (e) => {
            R[e] = e
        },
        H = (e) => U(e),
        K = () => R,
        V = (e, t = null) => {
            const s = t || R
            return e ? Object.keys(s).reduce((r, a) => ({ ...r, [a]: `${e}.${s[a]}` }), {}) : s
        },
        S = { __IS_FAKE_LOCAL_STORAGE__: !0 },
        w = {
            getItem: (e) => S[e],
            setItem: (e, t) => {
                S[e] = t
            },
            removeItem: (e) => {
                delete S[e]
            },
            ...S,
        }
    let W = !1,
        b = !1,
        v = !1
    typeof window < 'u' &&
        ((W = !0),
        document.readyState === 'loading'
            ? document.addEventListener('DOMContentLoaded', () => {
                  b = !0
              })
            : (b = !0))
    const u = () => W,
        P = () => b,
        I = () => v,
        k = () => {
            v = !0
        },
        A = () => {
            if (!W) return !1
            try {
                const e = '__rwp_test__'
                return window.localStorage.setItem(e, 'test'), window.localStorage.removeItem(e), !0
            } catch {
                return !1
            }
        },
        F = (e) => {
            const t = typeof e
            return e === null ? !0 : Array.isArray(e) || t === 'object' ? !1 : t !== 'function'
        },
        C = Object.freeze(
            Object.defineProperty(
                {
                    __proto__: null,
                    addKey: U,
                    fakeLocalStorage: w,
                    getHasHydrated: P,
                    getHasHydratedStorage: I,
                    getIsClient: u,
                    getKeys: K,
                    getPrefixedKeys: V,
                    isLocalStorageAvailable: A,
                    isPrimitive: F,
                    key: H,
                    markStorageAsHydrated: k,
                },
                Symbol.toStringTag,
                { value: 'Module' },
            ),
        )
    class T {
        constructor(t, s) {
            if (new.target === T) throw TypeError('StorageProvider is abstract. Extend this class to implement it')
            ;(this.namespace = t || null), (this.registry = s || {})
        }
        setNamespace(t) {}
        register(t, s) {
            this.registry[t] = s
        }
        getItem(t) {}
        setItem(t, s) {}
        removeItem(t, s = !1) {}
        getAll() {}
        _resetAll(t = !0, s = [], r = !1) {}
        resetAll(t = []) {}
        removeAll(t = []) {}
    }
    class z extends T {
        constructor(t = null, s = {}) {
            super(t, s), (this.storage = w), (this._isUsingFakeStorage = !0)
        }
        getStorage() {
            return A() ? window.localStorage : w
        }
        setNamespace(t) {
            if (!this.namespace) {
                this.namespace = t
                return
            }
            if (this.namespace === t) return
            const s = JSON.parse(JSON.stringify(this.getAll()))
            this.removeAll()
            for (const [r, a] of Object.entries(s)) {
                const o = r.replace(this.namespace, t)
                this.setItem(o, a)
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
            return r != null && (r = F(s) ? s : JSON.stringify(s)), this.storage.setItem(t, r)
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
            const a = `${this.namespace}.`
            Object.keys(this.storage).forEach((o) => {
                const g = this.namespace ? o.startsWith(a) : !0,
                    y = s?.includes(o) || !1
                !g ||
                    y ||
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
        upgradeToRealStorage() {
            return !this._isUsingFakeStorage || !A()
                ? !1
                : ((this.storage = window.localStorage), (this._isUsingFakeStorage = !1), !0)
        }
        isUsingFakeStorage() {
            return this._isUsingFakeStorage
        }
    }
    const l = Math.random().toString(36).substring(7)
    console.log('[RWP] Module initialized, instance ID:', l)
    const N = { logging: { enabled: !1 } }
    const E = z
    console.log('[RWP] About to check global storage, instanceId:', l)
    let n
    try {
        globalThis.__RWP_STORAGE__
            ? console.log('[RWP] Using existing global storage in instance:', l)
            : (console.log('[RWP] Creating global storage in instance:', l), (globalThis.__RWP_STORAGE__ = new E())),
            (n = globalThis.__RWP_STORAGE__),
            console.log('[RWP] Storage assigned successfully')
    } catch (e) {
        console.error('[RWP] Error setting up global storage:', e), (n = new E())
    }
    let p = { ...N },
        _ = []
    typeof globalThis < 'u' &&
        (globalThis.__RWP_REGISTERED_WIRES__
            ? console.log('[RWP] Using existing global registeredWires in instance:', l)
            : (console.log('[RWP] Creating global registeredWires in instance:', l),
              (globalThis.__RWP_REGISTERED_WIRES__ = new Map())))
    const c = globalThis.__RWP_REGISTERED_WIRES__ || new Map()
    console.log('[RWP] registeredWires Map reference in instance:', l, 'size:', c.size)
    const j = () => n.namespace,
        L = () => n,
        M = () => p,
        G = (e) => {
            console.log('[RWP] setNamespace() called with:', e, 'registered wires before:', c.size),
                n.setNamespace(e),
                (n = new E(e || j())),
                console.log('[RWP] setNamespace() done, registered wires after:', c.size)
        },
        $ = (e) => {
            if (((p = { ...p, ...e }), p.logging.enabled))
                for (console.info('Flushing', _.length, 'pending logs'); _.length; ) console.log(..._.shift())
        },
        D = () => {
            console.log('[RWP] refreshAllWires() called in instance:', l, 'registered wires:', c.size),
                f('react-wire-persisted: refreshAllWires() called, registered wires:', c.size),
                c.forEach((e, t) => {
                    const s = n.getItem(t),
                        r = e.getValue()
                    console.log('[RWP] Checking wire', t, {
                        storedValue: s,
                        currentValue: r,
                        willUpdate: s !== null && s !== r,
                    }),
                        f('react-wire-persisted: Checking wire', t, {
                            storedValue: s,
                            currentValue: r,
                            willUpdate: s !== null && s !== r,
                        }),
                        s !== null &&
                            s !== r &&
                            (console.log('[RWP] Refreshing wire', t, 'with stored value', s),
                            f('react-wire-persisted: Refreshing wire', t, 'with stored value', s),
                            e.setValue(s))
                })
        },
        O = () => {
            if (
                (console.log('[RWP] upgradeStorage() called in instance:', l, {
                    isClient: u(),
                    isUsingFakeStorage: n.isUsingFakeStorage(),
                }),
                f('react-wire-persisted: upgradeStorage() called', {
                    isClient: u(),
                    isUsingFakeStorage: n.isUsingFakeStorage(),
                }),
                !u())
            )
                return !1
            const e = n.upgradeToRealStorage()
            return (
                console.log('[RWP] upgradeToRealStorage() returned', e),
                f('react-wire-persisted: upgradeToRealStorage() returned', e),
                e &&
                    (k(),
                    console.log('[RWP] Upgraded to real localStorage, calling refreshAllWires()'),
                    f('react-wire-persisted: Upgraded to real localStorage after hydration'),
                    D()),
                e
            )
        },
        f = (...e) => {
            p.logging.enabled ? console.log(...e) : _.push(e)
        },
        x = (e, t = null) => {
            if (
                (console.log('[RWP] createPersistedWire() called in instance:', l, 'key:', e, 'value:', t),
                !e && typeof e != 'number')
            )
                throw new Error(`createPersistedWire: Key cannot be a falsey value (${e}}`)
            n.register(e, t)
            const s = h.createWire(t),
                r = () => s.getValue(),
                a = (d) => (
                    console.log(
                        '[RWP] setValue called in instance:',
                        l,
                        'key:',
                        e,
                        'isUsingFakeStorage:',
                        n.isUsingFakeStorage(),
                    ),
                    n.setItem(e, d),
                    s.setValue(d)
                ),
                o = (d) => {
                    s.subscribe(d)
                }
            let g = t
            const y = I() || !n.isUsingFakeStorage()
            if (y && u()) {
                const d = n.getItem(e)
                d !== null && (g = d)
            }
            return (
                f('react-wire-persisted: create', e, {
                    value: t,
                    initialValue: g,
                    hasHydratedStorage: I(),
                    isUsingFakeStorage: n.isUsingFakeStorage(),
                    canReadStorage: y,
                }),
                g !== t && a(g),
                c.set(e, { getValue: r, setValue: a, subscribe: o }),
                console.log('[RWP] Wire registered, total wires:', c.size, 'keys:', Array.from(c.keys())),
                { ...s, getValue: r, setValue: a, subscribe: o }
            )
        },
        J = (e = {}) => {
            const { autoUpgrade: t = !0, onUpgrade: s } = e,
                r = m.useRef(!1)
            return (
                m.useEffect(() => {
                    if (!t || r.current || !u()) return
                    const a = () => {
                        P() && !r.current && O() && ((r.current = !0), s?.())
                    }
                    a()
                    const o = setTimeout(a, 0)
                    return () => clearTimeout(o)
                }, [t, s]),
                { hasUpgraded: r.current }
            )
        }
    function q({ children: e, onUpgrade: t, autoUpgrade: s = !0 }) {
        const r = m.useRef(!1)
        return (
            m.useEffect(() => {
                if (!s || r.current || !u()) return
                const a = () => {
                    P() && !r.current && O() && ((r.current = !0), t?.())
                }
                a()
                const o = setTimeout(a, 0)
                return () => clearTimeout(o)
            }, [s, t]),
            e
        )
    }
    ;(i.HydrationProvider = q),
        (i.createPersistedWire = x),
        (i.defaultOptions = N),
        (i.getNamespace = j),
        (i.getOptions = M),
        (i.getStorage = L),
        (i.setNamespace = G),
        (i.setOptions = $),
        (i.upgradeStorage = O),
        (i.useHydration = J),
        (i.utils = C),
        Object.defineProperty(i, Symbol.toStringTag, { value: 'Module' })
})
