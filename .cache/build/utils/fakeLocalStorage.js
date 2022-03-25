"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeLocalStorage = void 0;
var storage = {
    __IS_FAKE_LOCAL_STORAGE__: true,
};
exports.fakeLocalStorage = {
    getItem: function (key) { return exports.fakeLocalStorage[key]; },
    setItem: function (key, value) {
        exports.fakeLocalStorage[key] = value;
    },
    removeItem: function (key) {
        delete exports.fakeLocalStorage[key];
    }
};
//# sourceMappingURL=fakeLocalStorage.js.map