import { createWire as U } from "@forminator/react-wire";
import { useRef as b, useEffect as O } from "react";
(function() {
  const s = {};
  try {
    if (process) {
      process.env = Object.assign({}, process.env), Object.assign(process.env, s);
      return;
    }
  } catch {
  }
  globalThis.process = { env: s };
})();
const y = {}, w = (s) => {
  y[s] = s;
}, j = (s) => w(s), x = () => y, N = (s, e = null) => {
  const t = e || y;
  return s ? Object.keys(t).reduce((r, o) => ({
    ...r,
    [o]: `${s}.${t[o]}`
  }), {}) : t;
}, g = {
  __IS_FAKE_LOCAL_STORAGE__: !0
}, h = {
  getItem: (s) => g[s],
  setItem: (s, e) => {
    g[s] = e;
  },
  removeItem: (s) => {
    delete g[s];
  },
  // Make Object.keys() work properly for _resetAll method
  ...g
};
let S = !1, p = !1;
typeof window < "u" && (S = !0, document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  p = !0;
}) : p = !0);
const m = () => S, _ = () => p, d = () => {
  if (!S) return !1;
  try {
    const s = "__rwp_test__";
    return window.localStorage.setItem(s, "test"), window.localStorage.removeItem(s), !0;
  } catch {
    return !1;
  }
}, A = (s) => {
  const e = typeof s;
  return s === null ? !0 : Array.isArray(s) || e === "object" ? !1 : e !== "function";
}, k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addKey: w,
  fakeLocalStorage: h,
  getHasHydrated: _,
  getIsClient: m,
  getKeys: x,
  getPrefixedKeys: N,
  isLocalStorageAvailable: d,
  isPrimitive: A,
  key: j
}, Symbol.toStringTag, { value: "Module" }));
class I {
  /**
   * Initializes the class
   * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
   * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
   */
  constructor(e, t) {
    if (new.target === I)
      throw TypeError("StorageProvider is abstract. Extend this class to implement it");
    this.namespace = e || null, this.registry = t || /* istanbul ignore next */
    {};
  }
  /**
   * Sets the namespace for this storage provider, and migrates
   * all stored values to the new namespace
   * @param {String} namespace New namespace for this storage provider
   */
  /* istanbul ignore next */
  setNamespace(e) {
  }
  /**
   * Registers an item with it's initial value. This is used for logging, resetting, etc.
   * @param {String} key Storage item's key
   * @param {*} initialValue Storage item's initial value
   */
  register(e, t) {
    this.registry[e] = t;
  }
  /**
   * Reads an item from storage
   * @param {String} key Key for the item to retrieve
   */
  /* istanbul ignore next */
  getItem(e) {
  }
  /**
   * Stores a value
   * @param {String} key Item's storage key
   * @param {String} value Item's value to store
   */
  /* istanbul ignore next */
  setItem(e, t) {
  }
  /**
   * Removes an item from storage
   * @param {String} key Item's storage key
   * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
   */
  /* istanbul ignore next */
  removeItem(e, t = !1) {
  }
  /**
   * Gets all stored keys & values
   * If a `namespace` was set, only keys prefixed with the namespace will be returned
   */
  /* istanbul ignore next */
  getAll() {
  }
  /**
   * 
   * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
   * @param {String[]} excludedKeys (Optional) List of keys to exclude
   * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
   */
  /* istanbul ignore next */
  _resetAll(e = !0, t = [], r = !1) {
  }
  /**
   * Resets all values to their initial values
   * If a `namespace` is set, only keys prefixed with the namespace will be reset
   * @param {String[]} excludedKeys (Optional) List of keys to exclude
   */
  /* istanbul ignore next */
  resetAll(e = []) {
  }
  /**
   * Removes all items from local storage.
   * If a `namespace` is set, only keys prefixed with the namespace will be removed
   * @param {String[]} excludedKeys (Optional) List of keys to exclude
   */
  /* istanbul ignore next */
  removeAll(e = []) {
  }
}
class T extends I {
  constructor(e = null, t = {}) {
    super(e, t), this.storage = this.getStorage(), this._isUsingFakeStorage = !d();
  }
  getStorage() {
    return d() ? window.localStorage : h;
  }
  setNamespace(e) {
    if (!this.namespace) {
      this.namespace = e;
      return;
    }
    if (this.namespace === e)
      return;
    const t = JSON.parse(JSON.stringify(this.getAll()));
    this.removeAll();
    for (const [r, o] of Object.entries(t)) {
      const n = r.replace(this.namespace, e);
      this.setItem(n, o);
    }
    this.namespace = e;
  }
  getItem(e) {
    const t = this.storage.getItem(e);
    if (t == null)
      return null;
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
  }
  setItem(e, t) {
    let r = t;
    return r != null && (r = A(t) ? t : JSON.stringify(t)), this.storage.setItem(e, r);
  }
  removeItem(e, t = !1) {
    return t && delete this.registry[e], this.storage.removeItem(e);
  }
  getAll() {
    const e = `${this.namespace}.`;
    return Object.keys(this.storage).reduce((t, r) => ((!this.namespace || r.startsWith(e)) && (t[r] = this.storage.getItem(r)), t), {});
  }
  _resetAll(e = !0, t = [], r = !1) {
    const o = `${this.namespace}.`;
    Object.keys(this.storage).forEach((n) => {
      const a = this.namespace ? n.startsWith(o) : !0, l = t?.includes(n) || !1;
      !a || l || (e ? Object.prototype.hasOwnProperty.call(this.registry, n) ? this.storage.setItem(n, this.registry[n]) : this.storage.removeItem(n) : (this.storage.removeItem(n), r && delete this.registry[n]));
    });
  }
  resetAll(e = [], t = !1) {
    this._resetAll(!0, e || [], t);
  }
  removeAll(e = [], t = !1) {
    this._resetAll(!1, e || [], t);
  }
  /**
   * Attempt to upgrade from fake storage to real localStorage
   * This is useful for hydration scenarios
   */
  upgradeToRealStorage() {
    if (!this._isUsingFakeStorage || !d())
      return !1;
    const e = { ...this.storage };
    return this.storage = window.localStorage, this._isUsingFakeStorage = !1, Object.keys(e).forEach((t) => {
      if (t !== "__IS_FAKE_LOCAL_STORAGE__" && e[t] != null)
        try {
          this.storage.setItem(t, e[t]);
        } catch {
          return this.storage = h, this._isUsingFakeStorage = !0, !1;
        }
    }), !0;
  }
  /**
   * Check if currently using fake storage
   */
  isUsingFakeStorage() {
    return this._isUsingFakeStorage;
  }
}
const L = {
  logging: {
    enabled: !1
  }
};
let v = T, i = new v(), u = { ...L }, f = [];
const P = () => i.namespace, V = () => i, $ = () => u, C = (s) => {
  i.setNamespace(s), i = new v(s || P());
}, H = (s) => {
  if (u = {
    ...u,
    ...s
  }, u.logging.enabled)
    for (console.info("Flushing", f.length, "pending logs"); f.length; )
      console.log(...f.shift());
}, K = () => {
  if (!m())
    return !1;
  const s = i.upgradeToRealStorage();
  return s && E("react-wire-persisted: Upgraded to real localStorage after hydration"), s;
}, E = (...s) => {
  u.logging.enabled ? console.log(...s) : f.push(s);
}, W = (s, e = null) => {
  if (!s && typeof s != "number") throw new Error(
    `createPersistedWire: Key cannot be a falsey value (${s}}`
  );
  i.register(s, e);
  const t = U(e), r = () => t.getValue(), o = (c) => (i.setItem(s, c), t.setValue(c)), n = (c) => {
    t.subscribe(c);
  }, a = i.getItem(s), l = a === null ? e : a;
  return E("react-wire-persisted: create", s, {
    value: e,
    storedValue: a,
    initialValue: l
  }), l !== e && o(l), {
    ...t,
    getValue: r,
    setValue: o,
    subscribe: n
  };
}, J = (s = {}) => {
  const {
    autoUpgrade: e = !0,
    onUpgrade: t
  } = s, r = b(!1);
  return O(() => {
    if (!e || r.current || !m())
      return;
    const o = () => {
      _() && !r.current && K() && (r.current = !0, t?.());
    };
    o();
    const n = setTimeout(o, 0);
    return () => clearTimeout(n);
  }, [e, t]), {
    hasUpgraded: r.current
  };
};
function D({ children: s, onUpgrade: e, autoUpgrade: t = !0 }) {
  const r = b(!1);
  return O(() => {
    if (!t || r.current || !m())
      return;
    const o = () => {
      _() && !r.current && K() && (r.current = !0, e?.());
    };
    o();
    const n = setTimeout(o, 0);
    return () => clearTimeout(n);
  }, [t, e]), s;
}
export {
  D as HydrationProvider,
  W as createPersistedWire,
  L as defaultOptions,
  P as getNamespace,
  $ as getOptions,
  V as getStorage,
  C as setNamespace,
  H as setOptions,
  K as upgradeStorage,
  J as useHydration,
  k as utils
};
