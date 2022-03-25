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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrefixedKeys = exports.getKeys = exports.key = exports.addKey = void 0;
/**
 * Convenience map of keys
 */
var storageKeys = {};
/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
var addKey = function (value) {
    storageKeys[value] = value;
};
exports.addKey = addKey;
/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
var key = function (value) { return (0, exports.addKey)(value); };
exports.key = key;
/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} Storage keys map
 */
var getKeys = function () { return storageKeys; };
exports.getKeys = getKeys;
/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace Storage namespace prefix
 * @param {Object} keys (Optional) Storage key/values. Defaults to the internally managed keys map
 */
var getPrefixedKeys = function (namespace, keys) {
    if (keys === void 0) { keys = null; }
    var items = keys || storageKeys;
    if (!namespace)
        return items;
    return Object.keys(items).reduce(function (acc, it) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[it] = "".concat(namespace, ".").concat(items[it]), _a)));
    }, {});
};
exports.getPrefixedKeys = getPrefixedKeys;
//# sourceMappingURL=keys.js.map