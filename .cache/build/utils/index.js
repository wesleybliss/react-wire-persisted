"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitive = void 0;
__exportStar(require("./keys"), exports);
__exportStar(require("./fakeLocalStorage"), exports);
/**
 * Checks if a value is a primitive type
 *
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
var isPrimitive = function (val) {
    var type = typeof val;
    if (val === null)
        return true;
    if (Array.isArray(val))
        return false;
    if (type === 'object')
        return false;
    return type !== 'function';
};
exports.isPrimitive = isPrimitive;
//# sourceMappingURL=index.js.map