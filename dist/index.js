import { useRef as A, useEffect as T } from "react";
import { createWire as k } from "@forminator/react-wire";
(function() {
  const e = {};
  try {
    if (process) {
      process.env = Object.assign({}, process.env), Object.assign(process.env, e);
      return;
    }
  } catch {
  }
  globalThis.process = { env: e };
})();
const p = {
  __IS_FAKE_LOCAL_STORAGE__: !0
}, S = {
  getItem: (e) => p[e],
  setItem: (e, t) => {
    p[e] = t;
  },
  removeItem: (e) => {
    delete p[e];
  },
  // Make Object.keys() work properly for _resetAll method
  ...p
};
let w = !1, R = !1, O = !1;
typeof window < "u" && (w = !0, document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  R = !0;
}) : R = !0);
const u = () => w, I = () => R, b = () => O, U = () => {
  O = !0;
}, y = () => {
  if (!w) return !1;
  try {
    const e = "__rwp_test__";
    return window.localStorage.setItem(e, "test"), window.localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, P = {}, N = (e) => {
  P[e] = e;
}, F = (e) => N(e), x = () => P, K = (e, t = null) => {
  const s = t || P;
  return e ? Object.keys(s).reduce((r, n) => (r[n] = `${e}.${s[n]}`, r), {}) : s;
}, G = (e) => {
  const t = typeof e;
  return e === null ? !0 : Array.isArray(e) || t === "object" ? !1 : t !== "function";
}, z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addKey: N,
  fakeLocalStorage: S,
  getHasHydrated: I,
  getHasHydratedStorage: b,
  getIsClient: u,
  getKeys: x,
  getPrefixedKeys: K,
  isLocalStorageAvailable: y,
  isPrimitive: G,
  key: F,
  markStorageAsHydrated: U
}, Symbol.toStringTag, { value: "Module" }));
class E {
  /**
   * Initializes the class
   * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
   * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
   */
  constructor(t, s) {
    if (new.target === E)
      throw TypeError("StorageProvider is abstract. Extend this class to implement it");
    this.namespace = t || null, this.registry = s || /* istanbul ignore next */
    {};
  }
  /**
   * Sets the namespace for this storage provider, and migrates
   * all stored values to the new namespace
   * @param {String} namespace New namespace for this storage provider
   */
  /* istanbul ignore next */
  setNamespace(t) {
  }
  /**
   * Registers an item with it's initial value. This is used for logging, resetting, etc.
   * @param {String} key Storage item's key
   * @param {*} initialValue Storage item's initial value
   */
  register(t, s) {
    this.registry[t] = s;
  }
  /**
   * Reads an item from storage
   * @param {String} key Key for the item to retrieve
   */
  /* istanbul ignore next */
  getItem(t) {
  }
  /**
   * Stores a value
   * @param {String} key Item's storage key
   * @param {String} value Item's value to store
   */
  /* istanbul ignore next */
  setItem(t, s) {
  }
  /**
   * Removes an item from storage
   * @param {String} key Item's storage key
   * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
   */
  /* istanbul ignore next */
  removeItem(t, s = !1) {
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
  _resetAll(t = !0, s = [], r = !1) {
  }
  /**
   * Resets all values to their initial values
   * If a `namespace` is set, only keys prefixed with the namespace will be reset
   * @param {String[]} excludedKeys (Optional) List of keys to exclude
   */
  /* istanbul ignore next */
  resetAll(t = []) {
  }
  /**
   * Removes all items from local storage.
   * If a `namespace` is set, only keys prefixed with the namespace will be removed
   * @param {String[]} excludedKeys (Optional) List of keys to exclude
   */
  /* istanbul ignore next */
  removeAll(t = []) {
  }
}
class V extends E {
  constructor(t = null, s = {}) {
    super(t, s), this.storage = S, this._isUsingFakeStorage = !0;
  }
  getStorage() {
    return y() ? window.localStorage : S;
  }
  setNamespace(t) {
    if (!this.namespace) {
      this.namespace = t;
      return;
    }
    if (this.namespace === t) return;
    const s = JSON.parse(JSON.stringify(this.getAll()));
    this.removeAll();
    for (const [r, n] of Object.entries(s)) {
      const a = r.replace(this.namespace, t);
      this.setItem(a, n);
    }
    this.namespace = t;
  }
  getItem(t) {
    const s = this.storage.getItem(t);
    if (s == null) return null;
    try {
      return JSON.parse(s);
    } catch {
      return s;
    }
  }
  setItem(t, s) {
    let r = s;
    return r != null && (r = G(s) ? s : JSON.stringify(s)), this.storage.setItem(t, r);
  }
  removeItem(t, s = !1) {
    return s && delete this.registry[t], this.storage.removeItem(t);
  }
  getAll() {
    const t = `${this.namespace}.`;
    return Object.keys(this.storage).reduce((s, r) => ((!this.namespace || r.startsWith(t)) && (s[r] = this.storage.getItem(r)), s), {});
  }
  _resetAll(t = !0, s = [], r = !1) {
    const n = `${this.namespace}.`;
    Object.keys(this.storage).forEach((a) => {
      const c = this.namespace ? a.startsWith(n) : !0, _ = s?.includes(a) || !1;
      !c || _ || (t ? Object.hasOwn(this.registry, a) ? this.storage.setItem(a, this.registry[a]) : this.storage.removeItem(a) : (this.storage.removeItem(a), r && delete this.registry[a]));
    });
  }
  resetAll(t = [], s = !1) {
    this._resetAll(!0, t || [], s);
  }
  removeAll(t = [], s = !1) {
    this._resetAll(!1, t || [], s);
  }
  /**
   * Attempt to upgrade from fake storage to real localStorage
   * This is useful for hydration scenarios
   */
  upgradeToRealStorage() {
    return !this._isUsingFakeStorage || !y() ? !1 : (this.storage = window.localStorage, this._isUsingFakeStorage = !1, !0);
  }
  /**
   * Check if currently using fake storage
   */
  isUsingFakeStorage() {
    return this._isUsingFakeStorage;
  }
}
const l = Math.random().toString(36).substring(7), i = (...e) => {
  typeof globalThis < "u" && globalThis.__RWP_LOGGING_ENABLED__ !== !1 && console.log(...e);
}, v = {
  logging: {
    enabled: !1
  }
};
typeof globalThis < "u" && globalThis.__RWP_LOGGING_ENABLED__ === void 0 && (globalThis.__RWP_LOGGING_ENABLED__ = v.logging.enabled);
i("[RWP] Module initialized, instance ID:", l);
const W = V;
i("[RWP] About to check global storage, instanceId:", l);
let o;
try {
  globalThis.__RWP_STORAGE__ ? i("[RWP] Using existing global storage in instance:", l) : (i("[RWP] Creating global storage in instance:", l), globalThis.__RWP_STORAGE__ = new W()), o = globalThis.__RWP_STORAGE__, i("[RWP] Storage assigned successfully");
} catch (e) {
  globalThis.__RWP_LOGGING_ENABLED__ && console.error("[RWP] Error setting up global storage:", e), o = new W();
}
let h = { ...v };
const m = [];
typeof globalThis < "u" && (globalThis.__RWP_REGISTERED_WIRES__ ? i("[RWP] Using existing global registeredWires in instance:", l) : (i("[RWP] Creating global registeredWires in instance:", l), globalThis.__RWP_REGISTERED_WIRES__ = /* @__PURE__ */ new Map()));
const g = globalThis.__RWP_REGISTERED_WIRES__ || /* @__PURE__ */ new Map();
i("[RWP] registeredWires Map reference in instance:", l, "size:", g.size);
const j = () => o.namespace, M = () => o, $ = () => h, B = (e) => {
  i("[RWP] setNamespace() called with:", e, "registered wires before:", g.size), o.setNamespace(e), o = new W(e || j()), i("[RWP] setNamespace() done, registered wires after:", g.size);
}, J = (e) => {
  if (h = {
    ...h,
    ...e
  }, typeof globalThis < "u" && (globalThis.__RWP_LOGGING_ENABLED__ = h.logging.enabled), h.logging.enabled)
    for (console.info("Flushing", m.length, "pending logs"); m.length; )
      console.log(...m.shift());
}, C = () => {
  i("[RWP] refreshAllWires() called in instance:", l, "registered wires:", g.size), f("react-wire-persisted: refreshAllWires() called, registered wires:", g.size), g.forEach((e, t) => {
    const s = o.getItem(t), r = e.getValue();
    i("[RWP] Checking wire", t, {
      storedValue: s,
      currentValue: r,
      willUpdate: s !== null && s !== r
    }), f("react-wire-persisted: Checking wire", t, {
      storedValue: s,
      currentValue: r,
      willUpdate: s !== null && s !== r
    }), s !== null && s !== r && (i("[RWP] Refreshing wire", t, "with stored value", s), f("react-wire-persisted: Refreshing wire", t, "with stored value", s), e.setValue(s));
  });
}, L = () => {
  if (i("[RWP] upgradeStorage() called in instance:", l, {
    isClient: u(),
    isUsingFakeStorage: o.isUsingFakeStorage()
  }), f("react-wire-persisted: upgradeStorage() called", {
    isClient: u(),
    isUsingFakeStorage: o.isUsingFakeStorage()
  }), !u()) return !1;
  const e = o.upgradeToRealStorage();
  return i("[RWP] upgradeToRealStorage() returned", e), f("react-wire-persisted: upgradeToRealStorage() returned", e), e && (U(), i("[RWP] Upgraded to real localStorage, calling refreshAllWires()"), f("react-wire-persisted: Upgraded to real localStorage after hydration"), C()), e;
}, f = (...e) => {
  h.logging.enabled ? console.log(...e) : m.push(e);
}, q = (e, t = null) => {
  if (i("[RWP] createPersistedWire() called in instance:", l, "key:", e, "value:", t), !e && typeof e != "number") throw new Error(`createPersistedWire: Key cannot be a falsey value (${e}}`);
  o.register(e, t);
  const s = k(t), r = () => s.getValue(), n = (d) => (i(
    "[RWP] setValue called in instance:",
    l,
    "key:",
    e,
    "isUsingFakeStorage:",
    o.isUsingFakeStorage()
  ), o.setItem(e, d), s.setValue(d)), a = (d) => {
    s.subscribe(d);
  };
  let c = t;
  const _ = b() || !o.isUsingFakeStorage();
  if (_ && u()) {
    const d = o.getItem(e);
    d !== null && (c = d);
  }
  return f("react-wire-persisted: create", e, {
    value: t,
    initialValue: c,
    hasHydratedStorage: b(),
    isUsingFakeStorage: o.isUsingFakeStorage(),
    canReadStorage: _
  }), c !== t && n(c), g.set(e, {
    getValue: r,
    setValue: n,
    subscribe: a
  }), i("[RWP] Wire registered, total wires:", g.size, "keys:", Array.from(g.keys())), {
    ...s,
    getValue: r,
    setValue: n,
    subscribe: a
  };
};
function Q({ children: e, onUpgrade: t, autoUpgrade: s = !0 }) {
  const r = A(!1);
  return T(() => {
    if (!s || r.current || !u())
      return;
    const n = () => {
      I() && !r.current && L() && (r.current = !0, t?.());
    };
    n();
    const a = setTimeout(n, 0);
    return () => clearTimeout(a);
  }, [s, t]), e;
}
const X = (e = {}) => {
  const { autoUpgrade: t = !0, onUpgrade: s } = e, r = A(!1);
  return T(() => {
    if (!t || r.current || !u()) return;
    const n = () => {
      I() && !r.current && L() && (r.current = !0, s?.());
    };
    n();
    const a = setTimeout(n, 0);
    return () => clearTimeout(a);
  }, [t, s]), {
    hasUpgraded: r.current
  };
};
export {
  Q as HydrationProvider,
  q as createPersistedWire,
  v as defaultOptions,
  j as getNamespace,
  $ as getOptions,
  M as getStorage,
  B as setNamespace,
  J as setOptions,
  L as upgradeStorage,
  X as useHydration,
  z as utils
};
