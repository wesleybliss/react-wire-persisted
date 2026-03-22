import { useEffect as e, useRef as t } from "react";
import { createWire as n } from "@forminator/react-wire";
//#region \0rolldown/runtime.js
var r = Object.defineProperty, i = (e, t) => {
	let n = {};
	for (var i in e) r(n, i, {
		get: e[i],
		enumerable: !0
	});
	return t || r(n, Symbol.toStringTag, { value: "Module" }), n;
};
//#endregion
//#region \0rollup-plugin-inject-process-env
(function() {
	let e = {};
	try {
		if (process) {
			process.env = Object.assign({}, process.env), Object.assign(process.env, e);
			return;
		}
	} catch {}
	globalThis.process = { env: e };
})();
//#endregion
//#region src/utils/fakeLocalStorage.ts
var a = { __IS_FAKE_LOCAL_STORAGE__: "true" }, o = {
	getItem: (e) => a[e],
	setItem: (e, t) => {
		a[e] = t;
	},
	removeItem: (e) => {
		delete a[e];
	},
	...a
}, s = !1, c = !1, l = !1;
typeof window < "u" && (s = !0, document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
	c = !0;
}) : c = !0);
var u = () => s, d = () => c, f = () => l, p = () => {
	l = !0;
}, m = () => {
	if (!s) return !1;
	try {
		let e = "__rwp_test__";
		return window.localStorage.setItem(e, "test"), window.localStorage.removeItem(e), !0;
	} catch {
		return !1;
	}
}, h = {}, g = (e) => {
	h[e] = e;
}, _ = (e) => g(e), v = () => h, y = (e, t = null) => {
	let n = t || h;
	return e ? Object.keys(n).reduce((t, r) => (t[r] = `${e}.${n[r]}`, t), {}) : n;
}, b = /* @__PURE__ */ i({
	addKey: () => g,
	fakeLocalStorage: () => o,
	getHasHydrated: () => d,
	getHasHydratedStorage: () => f,
	getIsClient: () => u,
	getKeys: () => v,
	getPrefixedKeys: () => y,
	isLocalStorageAvailable: () => m,
	isPrimitive: () => x,
	key: () => _,
	markStorageAsHydrated: () => p
}), x = (e) => {
	let t = typeof e;
	return e === null ? !0 : Array.isArray(e) || t === "object" ? !1 : t !== "function";
}, S = class e {
	constructor(t, n) {
		if (new.target === e) throw TypeError("StorageProvider is abstract. Extend this class to implement it");
		this.namespace = t || null, this.registry = n || (		/* istanbul ignore next */ {});
	}
	register(e, t) {
		this.registry[e] = t;
	}
	upgradeToRealStorage() {
		return !1;
	}
	isUsingFakeStorage() {
		return !1;
	}
}, C = class extends S {
	constructor(e, t = {}) {
		super(e, t), this.storage = o, this._isUsingFakeStorage = !0;
	}
	getStorage() {
		return m() ? window.localStorage : o;
	}
	setNamespace(e) {
		if (!this.namespace) {
			this.namespace = e;
			return;
		}
		if (this.namespace === e) return;
		let t = JSON.parse(JSON.stringify(this.getAll()));
		this.removeAll();
		for (let [n, r] of Object.entries(t)) {
			let t = n.replace(this.namespace, e);
			this.setItem(t, r);
		}
		this.namespace = e;
	}
	getItem(e) {
		let t = this.storage.getItem(e);
		if (t == null) return null;
		try {
			return JSON.parse(t);
		} catch {
			return t;
		}
	}
	setItem(e, t) {
		return t == null ? this.removeItem(e) : this.storage.setItem(e, JSON.stringify(t));
	}
	removeItem(e, t = !1) {
		return t && delete this.registry[e], this.storage.removeItem(e);
	}
	getAll() {
		let e = `${this.namespace}.`;
		return Object.keys(this.storage).reduce((t, n) => ((!this.namespace || n.startsWith(e)) && (t[n] = this.storage.getItem(n)), t), {});
	}
	_resetAll(e = !0, t = [], n = !1) {
		let r = `${this.namespace}.`;
		Object.keys(this.storage).forEach((i) => {
			let a = this.namespace ? i.startsWith(r) : !0, o = t?.includes(i) || !1;
			!a || o || (e ? Object.hasOwn(this.registry, i) ? this.registry[i] === void 0 || this.registry[i] === null ? this.storage.removeItem(i) : this.storage.setItem(i, JSON.stringify(this.registry[i])) : this.storage.removeItem(i) : (this.storage.removeItem(i), n && delete this.registry[i]));
		});
	}
	resetAll(e = [], t = !1) {
		this._resetAll(!0, e || [], t);
	}
	removeAll(e = [], t = !1) {
		this._resetAll(!1, e || [], t);
	}
	upgradeToRealStorage() {
		return !this._isUsingFakeStorage || !m() ? !1 : (this.storage = window.localStorage, this._isUsingFakeStorage = !1, !0);
	}
	isUsingFakeStorage() {
		return this._isUsingFakeStorage;
	}
}, w = {
	name: "react-wire-persisted",
	version: "2.1.1",
	author: "Wesley Bliss <wesley.bliss@gmail.com>",
	license: "MIT",
	type: "module",
	main: "./dist/react-wire-persisted.umd.cjs",
	module: "./dist/index.js",
	types: "./dist/index.d.ts",
	files: [
		"src",
		"dist",
		"client.js",
		"client.mjs",
		"nextjs.js"
	],
	exports: {
		".": {
			import: "./dist/react-wire-persisted.js",
			require: "./dist/react-wire-persisted.umd.cjs"
		},
		"./client": {
			import: "./client.mjs",
			require: "./client.js"
		},
		"./nextjs": {
			import: "./nextjs.js",
			require: "./nextjs.js"
		}
	},
	scripts: {
		dev: "vite --host --config config/vite.config.development.ts",
		clean: "rm -rf dist",
		build: "pnpm clean && pnpm build:js && pnpm build:types",
		"build:js": "vite build --config config/vite.config.production.ts && cp dist/react-wire-persisted.js dist/index.js",
		"build:types": "tsc --emitDeclarationOnly --declarationDir dist --declaration --skipLibCheck",
		prepublishOnly: "pnpm build",
		check: "pnpm tsc --noEmit --skipLibCheck",
		lint: "biome check --write",
		"lint:format": "biome format --write",
		"lint:lint": "biome lint --write",
		test: "pnpm test:unit",
		"test:unit": "NODE_ENV=test vitest run",
		"test:unit:only": "NODE_ENV=test vitest run -t ",
		"test:unit:coverage": "NODE_ENV=test vitest run --no-color --reporter=junit --coverage --outputFile=coverage/report.xml",
		yalc: "pnpm build && yalc push"
	},
	devDependencies: {
		"@biomejs/biome": "^2.4.8",
		"@forminator/react-wire": "^0.7.0",
		"@testing-library/dom": "^10.4.1",
		"@testing-library/jest-dom": "^6.9.1",
		"@testing-library/react": "^16.3.2",
		"@testing-library/user-event": "^14.6.1",
		"@types/react": "^19.2.14",
		"@types/react-dom": "^19.2.3",
		"@vitejs/plugin-react": "^6.0.1",
		"@vitest/coverage-v8": "^4.1.0",
		browserslist: "^4.28.1",
		dotenv: "^17.3.1",
		esbuild: "^0.27.4",
		jest: "^30.3.0",
		"jest-environment-jsdom": "^30.3.0",
		np: "^11.0.2",
		react: "^19.2.4",
		"react-dom": "^19.2.4",
		"rollup-plugin-inject-process-env": "^1.3.1",
		"snapshot-diff": "^0.10.0",
		typescript: "^5.9.3",
		vite: "8.0.1",
		"vite-jest": "^0.1.4",
		"vite-tsconfig-paths": "^6.1.1",
		vitest: "^4.1.0"
	},
	peerDependencies: {
		"@forminator/react-wire": "^0.7.0",
		react: "^19.0.0",
		"react-dom": "^19.0.0"
	},
	browserslist: {
		production: [
			">0.2%",
			"not dead",
			"not op_mini all"
		],
		development: [
			"last 1 chrome version",
			"last 1 firefox version",
			"last 1 safari version, not dead"
		]
	},
	pnpm: { neverBuiltDependencies: [] }
}, T = Math.random().toString(36).substring(7), E = (...e) => {
	typeof globalThis < "u" && globalThis.__RWP_LOGGING_ENABLED__ !== !1 && console.log(...e);
}, D = { logging: { enabled: !1 } };
typeof globalThis < "u" && globalThis.__RWP_LOGGING_ENABLED__ === void 0 && (globalThis.__RWP_LOGGING_ENABLED__ = D.logging.enabled), E("[RWP] Module initialized, instance ID:", T), E("[RWP] About to check global storage, instanceId:", T);
var O;
try {
	globalThis.__RWP_STORAGE__ ? E("[RWP] Using existing global storage in instance:", T) : (E("[RWP] Creating global storage in instance:", T), globalThis.__RWP_STORAGE__ = new C("__internal_rwp_storage__")), O = globalThis.__RWP_STORAGE__, E("[RWP] InternalStorage assigned successfully");
} catch (e) {
	globalThis.__RWP_LOGGING_ENABLED__ && console.error("[RWP] Error setting up global storage:", e), O = new C("__internal_rwp_storage__");
}
var k = { ...D }, A = [];
typeof globalThis < "u" && (globalThis.__RWP_REGISTERED_WIRES__ ? E("[RWP] Using existing global registeredWires in instance:", T) : (E("[RWP] Creating global registeredWires in instance:", T), globalThis.__RWP_REGISTERED_WIRES__ = /* @__PURE__ */ new Map()));
var j = globalThis.__RWP_REGISTERED_WIRES__ || /* @__PURE__ */ new Map();
E("[RWP] registeredWires Map reference in instance:", T, "size:", j.size);
var M = () => O.namespace, N = () => O, P = () => k, F = (e) => {
	E("[RWP] setNamespace() called with:", e, "registered wires before:", j.size);
	let t = e || M();
	if (!t) throw Error("react-wire-persisted: Cannot set namespace to null or undefined");
	O.setNamespace(e), O = new C(t), E(`[RWP] version: ${w.version}, setNamespace() done, registered wires after:`, j.size);
}, I = (e) => {
	/* istanbul ignore next */
	if (k = {
		...k,
		...e
	}, typeof globalThis < "u" && (globalThis.__RWP_LOGGING_ENABLED__ = k.logging.enabled), k.logging.enabled) for (console.info("Flushing", A.length, "pending logs"); A.length;)
 /* istanbul ignore next */
	console.log(...A.shift() || []);
}, L = () => {
	E("[RWP] refreshAllWires() called in instance:", T, "registered wires:", j.size), z("react-wire-persisted: refreshAllWires() called, registered wires:", j.size), j.forEach((e, t) => {
		let n = O.getItem(t), r = e.getValue();
		E("[RWP] Checking wire", t, {
			storedValue: n,
			currentValue: r,
			willUpdate: n !== null && n !== r
		}), z("react-wire-persisted: Checking wire", t, {
			storedValue: n,
			currentValue: r,
			willUpdate: n !== null && n !== r
		}), n !== null && n !== r && (E("[RWP] Refreshing wire", t, "with stored value", n), z("react-wire-persisted: Refreshing wire", t, "with stored value", n), e.setValue(n));
	});
}, R = () => {
	if (E("[RWP] upgradeStorage() called in instance:", T, {
		isClient: u(),
		isUsingFakeStorage: O.isUsingFakeStorage()
	}), z("react-wire-persisted: upgradeStorage() called", {
		isClient: u(),
		isUsingFakeStorage: O.isUsingFakeStorage()
	}), !u()) return !1;
	let e = O.upgradeToRealStorage();
	return E("[RWP] upgradeToRealStorage() returned", e), z("react-wire-persisted: upgradeToRealStorage() returned", e), e && (p(), E("[RWP] Upgraded to real localStorage, calling refreshAllWires()"), z("react-wire-persisted: Upgraded to real localStorage after hydration"), L()), e;
}, z = (...e) => {
	/* istanbul ignore next */
	k.logging.enabled ? console.log(...e) : A.push(e);
}, B = (e, t = null) => {
	if (E("[RWP] createPersistedWire() called in instance:", T, "key:", e, "value:", t), !e) throw Error(`createPersistedWire: Key cannot be a falsey value (${e}}`);
	O.register(e, t);
	let r = n(t), i = () => r.getValue(), a = (t) => (E("[RWP] setValue called in instance:", T, "key:", e, "isUsingFakeStorage:", O.isUsingFakeStorage()), O.setItem(e, t), r.setValue(t)), o = (e) => r.subscribe(e), s = t, c = f() || !O.isUsingFakeStorage();
	if (c && u()) {
		let t = O.getItem(e);
		t !== null && (s = t);
	}
	return z("react-wire-persisted: create", e, {
		value: t,
		initialValue: s,
		hasHydratedStorage: f(),
		isUsingFakeStorage: O.isUsingFakeStorage(),
		canReadStorage: c
	}), s !== t && s !== void 0 && a(s), j.set(e, {
		getValue: i,
		setValue: a,
		subscribe: o
	}), E("[RWP] Wire registered, total wires:", j.size, "keys:", Array.from(j.keys())), {
		...r,
		getValue: i,
		setValue: a,
		subscribe: o
	};
}, V = (n = {}) => {
	let { autoUpgrade: r = !0, onUpgrade: i } = n, a = t(!1);
	return e(() => {
		if (!r || a.current || !u()) return;
		let e = () => {
			d() && !a.current && R() && (a.current = !0, i?.());
		};
		e();
		let t = setTimeout(e, 0);
		return () => clearTimeout(t);
	}, [r, i]), { hasUpgraded: a.current };
}, H = ({ children: e, onUpgrade: t, autoUpgrade: n = !0 }) => (V({
	onUpgrade: t,
	autoUpgrade: n
}), e);
//#endregion
export { H as HydrationProvider, B as createPersistedWire, D as defaultOptions, M as getNamespace, P as getOptions, N as getStorage, F as setNamespace, I as setOptions, R as upgradeStorage, V as useHydration, b as utils };
