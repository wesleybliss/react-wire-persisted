import { createWire } from '@forminator/react-wire';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * Convenience map of keys
 */
var storageKeys = {};

/**
 * Adds a key to the keys map
 * 
 * @param {String} value Key name
 */
var addKey = function addKey(value) {
  storageKeys[value] = value;
};

/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 * 
 * @param {String} value Key name
 */
var key = function key(value) {
  return addKey(value);
};

/**
 * Convenience method to get internally managed storage keys
 * 
 * @returns {Object} Storage keys map
 */
var getKeys = function getKeys() {
  return storageKeys;
};

/**
 * Helper utility to prefix all keys in a map to use a namespace
 * 
 * @param {String} namespace Storage namespace prefix
 * @param {Object} keys (Optional) Storage key/values. Defaults to the internally managed keys map
 */
var getPrefixedKeys = function getPrefixedKeys(namespace) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var items = keys || storageKeys;
  if (!namespace) return items;
  return Object.keys(items).reduce(function (acc, it) {
    return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, it, "".concat(namespace, ".").concat(items[it])));
  }, {});
};

var fakeLocalStorage = {
  getItem: function getItem(key) {
    return fakeLocalStorage[key];
  },
  setItem: function setItem(key, value) {
    fakeLocalStorage[key] = value;
  },
  removeItem: function removeItem(key) {
    delete fakeLocalStorage[key];
  }
};

/**
 * Checks if a value is a primitive type
 * 
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
var isPrimitive = function isPrimitive(val) {
  var type = typeof val;
  if (val === null) return true;
  if (Array.isArray(val)) return false;
  if (type === 'object') return false;
  return type !== 'function';
};

var index = /*#__PURE__*/Object.freeze({
__proto__: null,
isPrimitive: isPrimitive,
addKey: addKey,
key: key,
getKeys: getKeys,
getPrefixedKeys: getPrefixedKeys,
fakeLocalStorage: fakeLocalStorage
});

/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.js` for an example implementation
 */
var StorageProvider = /*#__PURE__*/function () {
  /**
   * Initializes the class
   * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
   * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
   */
  function StorageProvider(namespace, registry) {
    _classCallCheck(this, StorageProvider);
    // Simulate being an abstract class
    if ((this instanceof StorageProvider ? this.constructor : void 0) === StorageProvider) throw TypeError("StorageProvider is abstract. Extend this class to implement it");
    this.namespace = namespace || null;
    this.registry = registry || /* istanbul ignore next */{};
  }

  /**
   * Sets the namespace for this storage provider, and migrates
   * all stored values to the new namespace
   * @param {String} namespace New namespace for this storage provider
   */
  /* istanbul ignore next */
  _createClass(StorageProvider, [{
    key: "setNamespace",
    value: function setNamespace(namespace) {}

    /**
     * Registers an item with it's initial value. This is used for logging, resetting, etc.
     * @param {String} key Storage item's key
     * @param {*} initialValue Storage item's initial value
     */
  }, {
    key: "register",
    value: function register(key, initialValue) {
      this.registry[key] = initialValue;
    }

    /**
     * Reads an item from storage
     * @param {String} key Key for the item to retrieve
     */
    /* istanbul ignore next */
  }, {
    key: "getItem",
    value: function getItem(key) {}

    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    /* istanbul ignore next */
  }, {
    key: "setItem",
    value: function setItem(key, value) {}

    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
     */
    /* istanbul ignore next */
  }, {
    key: "removeItem",
    value: function removeItem(key) {
    }

    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    /* istanbul ignore next */
  }, {
    key: "getAll",
    value: function getAll() {}

    /**
     * 
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
     */
    /* istanbul ignore next */
  }, {
    key: "_resetAll",
    value: function _resetAll() {
    }

    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
  }, {
    key: "resetAll",
    value: function resetAll() {
    }

    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
  }, {
    key: "removeAll",
    value: function removeAll() {
    }
  }]);
  return StorageProvider;
}();

/**
 * A storage provider for `localStorage`
 * @see `StorageProvider.js` for documentation
 */
var LocalStorageProvider = /*#__PURE__*/function (_StorageProvider) {
  _inherits(LocalStorageProvider, _StorageProvider);
  var _super = _createSuper(LocalStorageProvider);
  function LocalStorageProvider() {
    var _this;
    var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var registry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, LocalStorageProvider);
    _this = _super.call(this, namespace, registry);
    _this.storage = _this.getStorage();
    return _this;
  }
  _createClass(LocalStorageProvider, [{
    key: "getStorage",
    value: function getStorage() {
      try {
        return window.localStorage;
      } catch (e) {
        /* istanbul ignore next */
        console.warn('LocalStorageProvider: localStorage not supported');
        /* istanbul ignore next */
        return fakeLocalStorage;
      }
    }
  }, {
    key: "setNamespace",
    value: function setNamespace(namespace) {
      if (!this.namespace) {
        this.namespace = namespace;
        return;
      }
      if (this.namespace === namespace) return;
      var items = JSON.parse(JSON.stringify(this.getAll()));
      this.removeAll();
      for (var _i = 0, _Object$entries = Object.entries(items); _i < _Object$entries.length; _i++) {
        var _ref = _Object$entries[_i];
        var _ref2 = _slicedToArray(_ref, 2);
        var key = _ref2[0];
        var value = _ref2[1];
        var newKey = key.replace(this.namespace, namespace);
        this.setItem(newKey, value);
      }
      this.namespace = namespace;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      var val = this.storage.getItem(key);
      if (val === undefined || val === null) return null;
      try {
        return JSON.parse(val);
      } catch (e) {
        return val;
      }
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      var val = value;

      // Don't allow "null" & similar values to be stringified
      if (val !== undefined && val !== null) val = isPrimitive(value) ? value : JSON.stringify(value);
      return this.storage.setItem(key, val);
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      var fromRegistry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (fromRegistry) delete this.registry[key];
      return this.storage.removeItem(key);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var _this2 = this;
      var prefixNs = "".concat(this.namespace, ".");
      return Object.keys(this.storage).reduce(function (acc, it) {
        if (_this2.namespace ? it.startsWith(prefixNs) : true) acc[it] = _this2.storage.getItem(it);
        return acc;
      }, {});
    }
  }, {
    key: "_resetAll",
    value: function _resetAll() {
      var _this3 = this;
      var useInitialValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var excludedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var clearRegistry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var prefixNs = "".concat(this.namespace, ".");
      Object.keys(localStorage).forEach(function (it) {
        var isAppKey = _this3.namespace ? it.startsWith(prefixNs) : true;
        var isExcluded = (excludedKeys === null || excludedKeys === void 0 ? void 0 : excludedKeys.includes(it)) || false;
        if (!isAppKey || isExcluded) return;
        if (useInitialValues) {
          var isRegistered = Object.prototype.hasOwnProperty.call(_this3.registry, it);
          if (isRegistered) _this3.storage.setItem(it, _this3.registry[it]);else _this3.storage.removeItem(it);
        } else {
          _this3.storage.removeItem(it);
          if (clearRegistry) delete _this3.registry[it];
        }
      });
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      var excludedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var clearRegistry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._resetAll(true, excludedKeys || [], clearRegistry);
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var excludedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var clearRegistry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._resetAll(false, excludedKeys || [], clearRegistry);
    }
  }]);
  return LocalStorageProvider;
}(StorageProvider);

var defaultOptions = {
  logging: {
    enabled: false
  }
};
var Provider = LocalStorageProvider;
var storage = new Provider();
var options = _objectSpread2({}, defaultOptions);
var pendingLogs = [];

/**
 * Gets the namespace of the storage provider
 * 
 * @returns {String}
 */
var getNamespace = function getNamespace() {
  return storage.namespace;
};

/**
 * Gets the current storage provider class instance
 * 
 * @returns {StorageProvider}
 */
var getStorage = function getStorage() {
  return storage;
};
var getOptions = function getOptions() {
  return options;
};

/**
 * Sets the namespace for the storage provider
 * 
 * @param {String} namespace The namespace for the storage provider
 */
var setNamespace = function setNamespace(namespace) {
  storage.setNamespace(namespace);
  storage = new Provider(namespace || getNamespace());
};
var setOptions = function setOptions(value) {
  options = _objectSpread2(_objectSpread2({}, options), value);
  /* istanbul ignore next */
  if (options.logging.enabled) {
    console.info('Flushing', pendingLogs.length, 'pending logs');
    while (pendingLogs.length) {
      var _console;
      /* istanbul ignore next */
      (_console = console).log.apply(_console, _toConsumableArray(pendingLogs.shift()));
    }
  }
};
var log = function log() {
  var _console2;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  /* istanbul ignore next */
  if (options.logging.enabled) /* istanbul ignore next */
    (_console2 = console).log.apply(_console2, args);else pendingLogs.push(args);
};

/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 * 
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
var createPersistedWire = function createPersistedWire(key) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // This check helps ensure no accidental key typos occur
  if (!key && typeof key !== 'number') throw new Error("createPersistedWire: Key cannot be a falsey value (".concat(key, "}"));

  // Track this writable entry so we can easily clear all
  storage.register(key, value);

  // The actual Wire backing object
  var wire = createWire(value);
  var getValue = function getValue() {
    return wire.getValue();
  };
  var setValue = function setValue(newValue) {
    storage.setItem(key, newValue);
    return wire.setValue(newValue);
  };
  var subscribe = function subscribe(fn) {
    wire.subscribe(fn);
  };
  var storedValue = storage.getItem(key);
  var initialValue = storedValue === null ? value : storedValue;
  log('react-wire-persisted: create', key, {
    value: value,
    storedValue: storedValue,
    initialValue: initialValue
  });
  if (initialValue !== value) setValue(initialValue);
  return _objectSpread2(_objectSpread2({}, wire), {}, {
    getValue: getValue,
    setValue: setValue,
    subscribe: subscribe
  });
};

export { createPersistedWire, defaultOptions, getNamespace, getOptions, getStorage, setNamespace, setOptions, index as utils };
