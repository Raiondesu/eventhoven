!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n=n||self).eventhoven={})}(this,function(n){"use strict";function t(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function r(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){if(!(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n)))return;var r=[],e=!0,o=!1,i=void 0;try{for(var u,f=n[Symbol.iterator]();!(e=(u=f.next()).done)&&(r.push(u.value),!t||r.length!==t);e=!0);}catch(n){o=!0,i=n}finally{try{e||null==f.return||f.return()}finally{if(o)throw i}}return r}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function e(n){return function(n){if(Array.isArray(n)){for(var t=0,r=new Array(n.length);t<n.length;t++)r[t]=n[t];return r}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o,i,u,f,c=(t(o={},"EMIT",function(n,t,r,e){}),t(o,"SUBSCRIBE",function(n,t,r,e){}),t(o,"UNSUBSCRIBE",function(n,t,r,e){}),u=i=o,f=function(n){return(new Map).set(i[n],function(){})},[].concat(e(Object.keys(u)),e(Object.getOwnPropertySymbols(u))).reduce(function(n,t){return n[t]=f(t),n},{})),a=function(n){return function(t){return function(){for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return l("EMIT")(n,t,i),Promise.all(e(n[t]||[]).map(function(n){var e=r(n,2),o=e[0],u=e[1];return o&&o.apply(void 0,[{event:t,unsubscribe:u}].concat(i))}))}}},l=function(n){return function(){return(arguments.length<=0?void 0:arguments[0])!==c?a(c)(n).apply(void 0,arguments):Promise.resolve([])}},y=function(n){return function(t){return function(){for(var r=arguments.length,e=new Array(r),o=0;o<r;o++)e[o]=arguments[o];if(t in n){var i=!0,u=!1,f=void 0;try{for(var c,a=(e.length>0?e:n[t].keys())[Symbol.iterator]();!(i=(c=a.next()).done);i=!0){var y=c.value;l("UNSUBSCRIBE")(n,t,y),n[t].delete(y)}}catch(n){u=!0,f=n}finally{try{i||null==a.return||a.return()}finally{if(u)throw f}}}}}},s=y;n.off=s,n.unsubscribe=y,Object.defineProperty(n,"__esModule",{value:!0})});
//# sourceMappingURL=minimal.js.map