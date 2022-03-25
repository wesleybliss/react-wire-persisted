"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersistedWire = exports.setOptions = exports.setNamespace = exports.getOptions = exports.getStorage = exports.getNamespace = exports.defaultOptions = void 0;
var react_wire_1 = require("@forminator/react-wire");
var LocalStorageProvider_1 = __importDefault(require("./providers/LocalStorageProvider"));
exports.defaultOptions = {
    logging: {
        enabled: false,
    },
};
var Provider = LocalStorageProvider_1.default;
var storage = new Provider();
var options = __assign({}, exports.defaultOptions);
var pendingLogs = [];
/**
 * Gets the namespace of the storage provider
 *
 * @returns {String}
 */
var getNamespace = function () { return storage.namespace; };
exports.getNamespace = getNamespace;
/**
 * Gets the current storage provider class instance
 *
 * @returns {StorageProvider}
 */
var getStorage = function () { return storage; };
exports.getStorage = getStorage;
var getOptions = function () { return options; };
exports.getOptions = getOptions;
/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
var setNamespace = function (namespace) {
    storage.setNamespace(namespace);
    storage = new Provider(namespace || (0, exports.getNamespace)());
};
exports.setNamespace = setNamespace;
var setOptions = function (value) {
    options = __assign(__assign({}, options), value);
    /* istanbul ignore next */
    if (options.logging.enabled) {
        console.info('Flushing', pendingLogs.length, 'pending logs');
        while (pendingLogs.length)
            /* istanbul ignore next */
            console.log.apply(console, pendingLogs.shift());
    }
};
exports.setOptions = setOptions;
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    /* istanbul ignore next */
    if (options.logging.enabled)
        /* istanbul ignore next */
        console.log.apply(console, args);
    else
        pendingLogs.push(args);
};
/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
var createPersistedWire = function (key, value) {
    if (value === void 0) { value = null; }
    // This check helps ensure no accidental key typos occur
    if (!key && (typeof key) !== 'number')
        throw new Error("createPersistedWire: Key cannot be a falsey value (".concat(key, "}"));
    // Track this writable entry so we can easily clear all
    storage.register(key, value);
    // The actual Wire backing object
    var wire = (0, react_wire_1.createWire)(value);
    var getValue = function () { return wire.getValue(); };
    var setValue = function (newValue) {
        storage.setItem(key, newValue);
        return wire.setValue(newValue);
    };
    var subscribe = function (fn) {
        wire.subscribe(fn);
    };
    var storedValue = storage.getItem(key);
    var initialValue = storedValue === null ? value : storedValue;
    log('react-wire-persisted: create', key, {
        value: value,
        storedValue: storedValue,
        initialValue: initialValue,
    });
    if (initialValue !== value)
        setValue(initialValue);
    return __assign(__assign({}, wire), { getValue: getValue, setValue: setValue, subscribe: subscribe });
};
exports.createPersistedWire = createPersistedWire;
//# sourceMappingURL=react-wire-persisted.js.map