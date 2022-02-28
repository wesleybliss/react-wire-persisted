!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["react-wire-persisted"]=t():e["react-wire-persisted"]=t()}(this,(function(){return(()=>{"use strict";var e={928:(e,t,r)=>{r.d(t,{default:()=>O});const n=require("@babel/runtime/helpers/slicedToArray");var i=r.n(n);const o=require("@babel/runtime/helpers/inherits");var a=r.n(o);const s=require("@babel/runtime/helpers/possibleConstructorReturn");var u=r.n(s);const c=require("@babel/runtime/helpers/getPrototypeOf");var l=r.n(c),f=r(537),v=r.n(f),p=r(765),y=r.n(p),h=r(152),m=r(518);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=l()(e);if(t){var i=l()(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return u()(this,r)}}var b=new(function(){function e(){v()(this,e),this.data={}}return y()(e,[{key:"getItem",value:function(e){return this.data[e]}},{key:"setItem",value:function(e,t){this.data[e]=t}},{key:"removeItem",value:function(e){delete this.data[e]}}]),e}()),g=function(e){a()(r,e);var t=d(r);function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v()(this,r),t.call(this,e,n)}return y()(r,[{key:"setNamespace",value:function(e){if(this.namespace){if(this.namespace!==e){var t=JSON.parse(JSON.stringify(this.getAll()));this.removeAll();for(var r=0,n=Object.entries(t);r<n.length;r++){var o=i()(n[r],2),a=o[0],s=o[1],u=a.replace(this.namespace,e);this.setItem(u,s)}this.namespace=e}}else this.namespace=e}},{key:"getItem",value:function(e){var t=b.getItem(e);if(null==t)return null;try{return JSON.parse(t)}catch(e){return t}}},{key:"setItem",value:function(e,t){var r=t;return null!=r&&(r=(0,m.isPrimitive)(t)?t:JSON.stringify(t)),b.setItem(e,r)}},{key:"removeItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t&&delete this.registry[e],b.removeItem(e)}},{key:"getAll",value:function(){var e=this,t="".concat(this.namespace,".");return Object.keys(b.data).reduce((function(r,n){return e.namespace&&!n.startsWith(t)||(r[n]=b.getItem(n)),r}),{})}},{key:"_resetAll",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="".concat(this.namespace,".");Object.keys(b.data).forEach((function(o){var a=!e.namespace||o.startsWith(i),s=(null==r?void 0:r.includes(o))||!1;a&&!s&&(t?Object.prototype.hasOwnProperty.call(e.registry,o)?b.setItem(o,e.registry[o]):b.removeItem(o):(b.removeItem(o),n&&delete e.registry[o]))}))}},{key:"resetAll",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._resetAll(!0,e||[],t)}},{key:"removeAll",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this._resetAll(!1,e||[],t)}}]),r}(h.default);const O=g},152:(e,t,r)=>{r.d(t,{default:()=>s});var n=r(537),i=r.n(n),o=r(765),a=r.n(o);const s=function(){function e(t,r){if(i()(this,e),(this instanceof e?this.constructor:void 0)===e)throw TypeError("StorageProvider is abstract. Extend this class to implement it");this.namespace=t||null,this.registry=r||{}}return a()(e,[{key:"setNamespace",value:function(e){}},{key:"register",value:function(e,t){this.registry[e]=t}},{key:"getItem",value:function(e){}},{key:"setItem",value:function(e,t){}},{key:"removeItem",value:function(e){}},{key:"getAll",value:function(){}},{key:"_resetAll",value:function(){}},{key:"resetAll",value:function(){}},{key:"removeAll",value:function(){}}]),e}()},518:(e,t,r)=>{r.d(t,{isPrimitive:()=>o});const n=require("@babel/runtime/helpers/typeof");var i=r.n(n),o=function(e){var t=i()(e);return!Array.isArray(e)&&("object"===t?null===e:"function"!==t)}},537:e=>{e.exports=require("@babel/runtime/helpers/classCallCheck")},765:e=>{e.exports=require("@babel/runtime/helpers/createClass")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{createPersistedWire:()=>y,getNamespace:()=>c,getProvider:()=>l,getStorage:()=>f,setNamespace:()=>p,setProvider:()=>v});const e=require("@babel/runtime/helpers/defineProperty");var t=r.n(e);const i=require("@forminator/react-wire");function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){t()(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s=r(928).default,u=new s,c=function(){var e;return(null===(e=u)||void 0===e?void 0:e.namespace)||null},l=function(){return s},f=function(){return u},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;u=new(s=e)(t||c())},p=function(e){u.setNamespace(e)},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!s)throw new Error("A provider must be set before using this library");if(!e&&"number"!=typeof e)throw new Error("createPersistedWire: Key cannot be a falsey value (".concat(e,"}"));u.register(e,t);var r=(0,i.createWire)(t),n=function(){return r.getValue()},o=function(t){return u.setItem(e,t),r.setValue(t)},c=function(e){r.subscribe(e)},l=u.getItem(e),f=!1!==l&&(l||t);return f!==t&&o(f),a(a({},r),{},{getValue:n,setValue:o,subscribe:c})}})(),n})()}));