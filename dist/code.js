!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=23)}({23:function(e,t,n){"use strict";function o(e){const t=[],n=e=>{t.some(t=>t.family===e.family&&t.style===e.style)||t.push(e)};for(const t of e)if(t.fontName===figma.mixed){const e=t.characters.length;for(let o=0;o<e;o++){n(t.getRangeFontName(o,o+1))}}else n(t.fontName);return t}n.r(t);var r=function(e,t,n,o){return new(n||(n=Promise))(function(r,i){function f(e){try{a(o.next(e))}catch(e){i(e)}}function u(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(f,u)}a((o=o.apply(e,t||[])).next())})};figma.showUI(__html__),figma.ui.onmessage=e=>r(void 0,void 0,void 0,function*(){if("getFontNames"===e.type){const e=o(figma.currentPage.children.reduce((e,t)=>((e=>"TEXT"===e.type)(t)&&e.push(t),e),[]));figma.ui.postMessage({fontNames:e})}if("applyFont"===e.type){const{family:t,style:n}=e.fontName;yield figma.loadFontAsync({family:t,style:n}),figma.currentPage.selection.filter(e=>"TEXT"===e.type).map(e=>{e.fontName={family:t,style:n}}),figma.closePlugin()}"close"===e.type&&figma.closePlugin()})}});