import { createWire as b } from "@forminator/react-wire";
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
const m = {}, p = (s) => {
  m[s] = s;
}, I = (s) => p(s), O = () => m, S = (s, e = null) => {
  const t = e || m;
  return s ? Object.keys(t).reduce((r, n) => ({
    ...r,
    [n]: `${s}.${t[n]}`
  }), {}) : t;
}, g = {
  getItem: (s) => g[s],
  setItem: (s, e) => {
    g[s] = e;
  },
  removeItem: (s) => {
    delete g[s];
  }
}, d = (s) => {
  const e = typeof s;
  return s === null ? !0 : Array.isArray(s) || e === "object" ? !1 : e !== "function";
}, j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addKey: p,
  fakeLocalStorage: g,
  getKeys: O,
  getPrefixedKeys: S,
  isPrimitive: d,
  key: I
}, Symbol.toStringTag, { value: "Module" }));
class h {
  /**
   * Initializes the class
   * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
   * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
   */
  constructor(e, t) {
    if (new.target === h)
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
class v extends h {
  constructor(e = null, t = {}) {
    super(e, t), this.storage = this.getStorage();
  }
  getStorage() {
    try {
      return window.localStorage;
    } catch {
      return console.warn(new Error("LocalStorageProvider: localStorage not supported")), g;
    }
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
    for (const [r, n] of Object.entries(t)) {
      const o = r.replace(this.namespace, e);
      this.setItem(o, n);
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
    return r != null && (r = d(t) ? t : JSON.stringify(t)), this.storage.setItem(e, r);
  }
  removeItem(e, t = !1) {
    return t && delete this.registry[e], this.storage.removeItem(e);
  }
  getAll() {
    const e = `${this.namespace}.`;
    return Object.keys(this.storage).reduce((t, r) => ((!this.namespace || r.startsWith(e)) && (t[r] = this.storage.getItem(r)), t), {});
  }
  _resetAll(e = !0, t = [], r = !1) {
    const n = `${this.namespace}.`;
    Object.keys(localStorage).forEach((o) => {
      const l = this.namespace ? o.startsWith(n) : !0, a = t?.includes(o) || !1;
      !l || a || (e ? Object.prototype.hasOwnProperty.call(this.registry, o) ? this.storage.setItem(o, this.registry[o]) : this.storage.removeItem(o) : (this.storage.removeItem(o), r && delete this.registry[o]));
    });
  }
  resetAll(e = [], t = !1) {
    this._resetAll(!0, e || [], t);
  }
  removeAll(e = [], t = !1) {
    this._resetAll(!1, e || [], t);
  }
}
const A = {
  logging: {
    enabled: !1
  }
};
let y = v, i = new y(), u = { ...A }, f = [];
const w = () => i.namespace, K = () => i, P = () => u, _ = (s) => {
  i.setNamespace(s), i = new y(s || w());
}, E = (s) => {
  if (u = {
    ...u,
    ...s
  }, u.logging.enabled)
    for (console.info("Flushing", f.length, "pending logs"); f.length; )
      console.log(...f.shift());
}, x = (...s) => {
  u.logging.enabled ? console.log(...s) : f.push(s);
}, V = (s, e = null) => {
  if (!s && typeof s != "number") throw new Error(
    `createPersistedWire: Key cannot be a falsey value (${s}}`
  );
  i.register(s, e);
  const t = b(e), r = () => t.getValue(), n = (c) => (i.setItem(s, c), t.setValue(c)), o = (c) => {
    t.subscribe(c);
  }, l = i.getItem(s), a = l === null ? e : l;
  return x("react-wire-persisted: create", s, {
    value: e,
    storedValue: l,
    initialValue: a
  }), a !== e && n(a), {
    ...t,
    getValue: r,
    setValue: n,
    subscribe: o
  };
};
export {
  V as createPersistedWire,
  A as defaultOptions,
  w as getNamespace,
  P as getOptions,
  K as getStorage,
  _ as setNamespace,
  E as setOptions,
  j as utils
};
