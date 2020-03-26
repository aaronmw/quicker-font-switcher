/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/clone.js":
/*!******************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/clone.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clone; });
//this function returns clone the object
function clone(val) {
    const type = typeof val;
    if (val === null) {
        return null;
    }
    else if (type === 'undefined' ||
        type === 'number' ||
        type === 'string' ||
        type === 'boolean') {
        return val;
    }
    else if (type === 'object') {
        if (val instanceof Array) {
            return val.map((x) => clone(x));
        }
        else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
        }
        else {
            const o = {};
            for (const key in val) {
                o[key] = clone(val[key]);
            }
            return o;
        }
    }
    throw 'unknown';
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js":
/*!************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAllFonts; });
//this function returns all used fonts to textNodes
function getAllFonts(textNodes) {
    const fonts = [];
    const pushUnique = (font) => {
        if (!fonts.some((item) => item.family === font.family && item.style === font.style)) {
            fonts.push(font);
        }
    };
    for (const node of textNodes) {
        if (node.fontName === figma.mixed) {
            const len = node.characters.length;
            for (let i = 0; i < len; i++) {
                const font = node.getRangeFontName(i, i + 1);
                pushUnique(font);
            }
        }
        else {
            pushUnique(node.fontName);
        }
    }
    return fonts;
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getBoundingRect; });
/* harmony import */ var _getNodeIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeIndex */ "./node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js");

// this function return a bounding rect for an nodes
// x/y absolute coordinates
// height/width
// x2/y2 bottom right coordinates
function getBoundingRect(nodes) {
    const boundingRect = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0,
        height: 0,
        width: 0
    };
    // to assemble coordinates
    function pushXY(node, rez) {
        const [[, , x], [, , y]] = node.absoluteTransform;
        rez.x.push(x);
        rez.y.push(y);
        rez.x2.push(x + node.width);
        rez.y2.push(y + node.height);
    }
    if (nodes.length > 0) {
        const xy = nodes.reduce((rez, node) => {
            if (node.rotation === 0) {
                pushXY(node, rez);
            }
            else {
                // if the node is rotated, wrap it in a group
                const index = Object(_getNodeIndex__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
                const parent = node.parent;
                const group = figma.group([node], parent, index);
                pushXY(group, rez);
                parent.insertChild(index, node);
            }
            return rez;
        }, { x: [], y: [], x2: [], y2: [] });
        const rect = {
            x: Math.min(...xy.x),
            y: Math.min(...xy.y),
            x2: Math.max(...xy.x2),
            y2: Math.max(...xy.y2)
        };
        boundingRect.x = rect.x;
        boundingRect.y = rect.y;
        boundingRect.x2 = rect.x2;
        boundingRect.y2 = rect.y2;
        boundingRect.width = rect.x2 - rect.x;
        boundingRect.height = rect.y2 - rect.y;
    }
    return boundingRect;
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getNodeIndex; });
//this function allows you to get the return the index of node in its parent
function getNodeIndex(node) {
    return node.parent.children.indexOf(node);
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/getPage.js":
/*!********************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/getPage.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getPage; });
//this function allows you to pass in a node and return its pageNode
function getPage(node) {
    while (node.type != 'PAGE') {
        node = node.parent;
    }
    return node;
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPartOfInstance; });
//this function allows you to check whether a node is part of an instance
function isPartOfInstance(node) {
    const parent = node.parent;
    if (parent.type === 'INSTANCE') {
        return true;
    }
    else if (parent.type === 'PAGE') {
        return false;
    }
    else {
        return isPartOfInstance(parent);
    }
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPartOfNode; });
//this function allows you to check whether a node is part of an rootNode
function isPartOfNode(part, rootNode) {
    const parent = part.parent;
    if (parent === rootNode) {
        return true;
    }
    else if (parent.type === 'PAGE') {
        return false;
    }
    else {
        return isPartOfNode(parent, rootNode);
    }
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js ***!
  \***********************************************************************/
/*! exports provided: isPageNode, isGroupNode, isFrameNode, isTextNode, isInstanceNode, isComponentNode, isOneOfNodeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPageNode", function() { return isPageNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroupNode", function() { return isGroupNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFrameNode", function() { return isFrameNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTextNode", function() { return isTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInstanceNode", function() { return isInstanceNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComponentNode", function() { return isComponentNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOneOfNodeType", function() { return isOneOfNodeType; });
const isPageNode = (node) => {
    return node.type === 'PAGE';
};
const isGroupNode = (node) => {
    return node.type === 'GROUP';
};
const isFrameNode = (node) => {
    return node.type === 'FRAME';
};
const isTextNode = (node) => {
    return node.type === 'TEXT';
};
const isInstanceNode = (node) => {
    return node.type === 'INSTANCE';
};
const isComponentNode = (node) => {
    return node.type === 'COMPONENT';
};
const isOneOfNodeType = (node, typeList) => {
    return typeList.includes(node.type);
};


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadUniqueFonts; });
/* harmony import */ var _getAllFonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getAllFonts */ "./node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

//this function allows you to load only unique fonts asynchronously
function loadUniqueFonts(textNodes) {
    return __awaiter(this, void 0, void 0, function* () {
        const fonts = Object(_getAllFonts__WEBPACK_IMPORTED_MODULE_0__["default"])(textNodes);
        const promises = fonts.map((font) => figma.loadFontAsync(font));
        yield Promise.all(promises);
        return fonts;
    });
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nodeToObject; });
function nodeToObject(node) {
    const props = Object.entries(Object.getOwnPropertyDescriptors(node.__proto__));
    const blacklist = ['parent', 'children', 'removed'];
    const obj = { id: node.id, type: node.type, children: undefined };
    if (node.parent)
        obj.parent = { id: node.parent.id, type: node.type };
    for (const [name, prop] of props) {
        if (prop.get && blacklist.indexOf(name) < 0) {
            obj[name] = prop.get.call(node);
            if (typeof obj[name] === 'symbol')
                obj[name] = 'Mixed';
        }
    }
    if (node.children)
        obj.children = node.children.map((child) => nodeToObject(child));
    if (node.masterComponent)
        obj.masterComponent = nodeToObject(node.masterComponent);
    return obj;
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return topLevelFrames; });
//this function returns all top level frames on currentPage
function topLevelFrames() {
    return figma.currentPage.children.filter((node) => node.type === 'FRAME');
}


/***/ }),

/***/ "./node_modules/@figma-plugin/helpers/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@figma-plugin/helpers/dist/index.js ***!
  \**********************************************************/
/*! exports provided: getPage, getNodeIndex, isComponentNode, isFrameNode, isGroupNode, isInstanceNode, isPageNode, isTextNode, topLevelFrames, getAllFonts, loadUniqueFonts, isPartOfInstance, isPartOfNode, isOneOfNodeType, clone, getBoundingRect, nodeToObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_getPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/getPage */ "./node_modules/@figma-plugin/helpers/dist/helpers/getPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPage", function() { return _helpers_getPage__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _helpers_getNodeIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/getNodeIndex */ "./node_modules/@figma-plugin/helpers/dist/helpers/getNodeIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNodeIndex", function() { return _helpers_getNodeIndex__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _helpers_isPartOfInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/isPartOfInstance */ "./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfInstance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPartOfInstance", function() { return _helpers_isPartOfInstance__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _helpers_isPartOfNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/isPartOfNode */ "./node_modules/@figma-plugin/helpers/dist/helpers/isPartOfNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPartOfNode", function() { return _helpers_isPartOfNode__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _helpers_topLevelFrames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/topLevelFrames */ "./node_modules/@figma-plugin/helpers/dist/helpers/topLevelFrames.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "topLevelFrames", function() { return _helpers_topLevelFrames__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _helpers_getAllFonts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/getAllFonts */ "./node_modules/@figma-plugin/helpers/dist/helpers/getAllFonts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAllFonts", function() { return _helpers_getAllFonts__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _helpers_loadUniqueFonts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/loadUniqueFonts */ "./node_modules/@figma-plugin/helpers/dist/helpers/loadUniqueFonts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadUniqueFonts", function() { return _helpers_loadUniqueFonts__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _helpers_clone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/clone */ "./node_modules/@figma-plugin/helpers/dist/helpers/clone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return _helpers_clone__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _helpers_getBoundingRect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/getBoundingRect */ "./node_modules/@figma-plugin/helpers/dist/helpers/getBoundingRect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBoundingRect", function() { return _helpers_getBoundingRect__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/isTypeNode */ "./node_modules/@figma-plugin/helpers/dist/helpers/isTypeNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isComponentNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isComponentNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFrameNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isFrameNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isGroupNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isGroupNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInstanceNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isInstanceNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPageNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isPageNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTextNode", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isTextNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOneOfNodeType", function() { return _helpers_isTypeNode__WEBPACK_IMPORTED_MODULE_9__["isOneOfNodeType"]; });

/* harmony import */ var _helpers_nodeToObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/nodeToObject */ "./node_modules/@figma-plugin/helpers/dist/helpers/nodeToObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nodeToObject", function() { return _helpers_nodeToObject__WEBPACK_IMPORTED_MODULE_10__["default"]; });

//import all helper functions here











//export all helper functions so they can be used indidually as needed



/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _figma_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @figma-plugin/helpers */ "./node_modules/@figma-plugin/helpers/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(undefined, void 0, void 0, function* () {
    if (msg.type === 'getFontNames') {
        const nodes = figma.currentPage.children;
        const textNodes = nodes.reduce((acc, node) => {
            if (Object(_figma_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__["isTextNode"])(node)) {
                acc.push(node);
            }
            return acc;
        }, []);
        const fontNames = Object(_figma_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__["getAllFonts"])(textNodes);
        figma.ui.postMessage({
            fontNames,
        });
    }
    if (msg.type === 'applyFont') {
        const { family, style } = msg.fontName;
        yield figma.loadFontAsync({
            family,
            style,
        });
        figma.currentPage.selection
            .filter(node => node.type === 'TEXT')
            .map(textNode => {
            textNode.fontName = {
                family,
                style,
            };
        });
        figma.closePlugin();
    }
    if (msg.type === 'close') {
        figma.closePlugin();
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvY2xvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvZ2V0QWxsRm9udHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvZ2V0Qm91bmRpbmdSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2dldE5vZGVJbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy9nZXRQYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2lzUGFydE9mSW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvaXNQYXJ0T2ZOb2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL2lzVHlwZU5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BmaWdtYS1wbHVnaW4vaGVscGVycy9kaXN0L2hlbHBlcnMvbG9hZFVuaXF1ZUZvbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZmlnbWEtcGx1Z2luL2hlbHBlcnMvZGlzdC9oZWxwZXJzL25vZGVUb09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaGVscGVycy90b3BMZXZlbEZyYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZpZ21hLXBsdWdpbi9oZWxwZXJzL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUFBO0FBQUE7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FB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QUF3QyxTQUFJO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3RUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsMEJBQTBCLHlFQUFXO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsIi8vdGhpcyBmdW5jdGlvbiByZXR1cm5zIGNsb25lIHRoZSBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lKHZhbCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsO1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKCh4KSA9PiBjbG9uZSh4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBvW2tleV0gPSBjbG9uZSh2YWxba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyAndW5rbm93bic7XG59XG4iLCIvL3RoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdXNlZCBmb250cyB0byB0ZXh0Tm9kZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFsbEZvbnRzKHRleHROb2Rlcykge1xuICAgIGNvbnN0IGZvbnRzID0gW107XG4gICAgY29uc3QgcHVzaFVuaXF1ZSA9IChmb250KSA9PiB7XG4gICAgICAgIGlmICghZm9udHMuc29tZSgoaXRlbSkgPT4gaXRlbS5mYW1pbHkgPT09IGZvbnQuZmFtaWx5ICYmIGl0ZW0uc3R5bGUgPT09IGZvbnQuc3R5bGUpKSB7XG4gICAgICAgICAgICBmb250cy5wdXNoKGZvbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGV4dE5vZGVzKSB7XG4gICAgICAgIGlmIChub2RlLmZvbnROYW1lID09PSBmaWdtYS5taXhlZCkge1xuICAgICAgICAgICAgY29uc3QgbGVuID0gbm9kZS5jaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb250ID0gbm9kZS5nZXRSYW5nZUZvbnROYW1lKGksIGkgKyAxKTtcbiAgICAgICAgICAgICAgICBwdXNoVW5pcXVlKGZvbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHVzaFVuaXF1ZShub2RlLmZvbnROYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9udHM7XG59XG4iLCJpbXBvcnQgZ2V0Tm9kZUluZGV4IGZyb20gJy4vZ2V0Tm9kZUluZGV4Jztcbi8vIHRoaXMgZnVuY3Rpb24gcmV0dXJuIGEgYm91bmRpbmcgcmVjdCBmb3IgYW4gbm9kZXNcbi8vIHgveSBhYnNvbHV0ZSBjb29yZGluYXRlc1xuLy8gaGVpZ2h0L3dpZHRoXG4vLyB4Mi95MiBib3R0b20gcmlnaHQgY29vcmRpbmF0ZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdChub2Rlcykge1xuICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgeDI6IDAsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIHdpZHRoOiAwXG4gICAgfTtcbiAgICAvLyB0byBhc3NlbWJsZSBjb29yZGluYXRlc1xuICAgIGZ1bmN0aW9uIHB1c2hYWShub2RlLCByZXopIHtcbiAgICAgICAgY29uc3QgW1ssICwgeF0sIFssICwgeV1dID0gbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybTtcbiAgICAgICAgcmV6LngucHVzaCh4KTtcbiAgICAgICAgcmV6LnkucHVzaCh5KTtcbiAgICAgICAgcmV6LngyLnB1c2goeCArIG5vZGUud2lkdGgpO1xuICAgICAgICByZXoueTIucHVzaCh5ICsgbm9kZS5oZWlnaHQpO1xuICAgIH1cbiAgICBpZiAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB4eSA9IG5vZGVzLnJlZHVjZSgocmV6LCBub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5yb3RhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHB1c2hYWShub2RlLCByZXopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIG5vZGUgaXMgcm90YXRlZCwgd3JhcCBpdCBpbiBhIGdyb3VwXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnZXROb2RlSW5kZXgobm9kZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSBmaWdtYS5ncm91cChbbm9kZV0sIHBhcmVudCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHB1c2hYWShncm91cCwgcmV6KTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0Q2hpbGQoaW5kZXgsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlejtcbiAgICAgICAgfSwgeyB4OiBbXSwgeTogW10sIHgyOiBbXSwgeTI6IFtdIH0pO1xuICAgICAgICBjb25zdCByZWN0ID0ge1xuICAgICAgICAgICAgeDogTWF0aC5taW4oLi4ueHkueCksXG4gICAgICAgICAgICB5OiBNYXRoLm1pbiguLi54eS55KSxcbiAgICAgICAgICAgIHgyOiBNYXRoLm1heCguLi54eS54MiksXG4gICAgICAgICAgICB5MjogTWF0aC5tYXgoLi4ueHkueTIpXG4gICAgICAgIH07XG4gICAgICAgIGJvdW5kaW5nUmVjdC54ID0gcmVjdC54O1xuICAgICAgICBib3VuZGluZ1JlY3QueSA9IHJlY3QueTtcbiAgICAgICAgYm91bmRpbmdSZWN0LngyID0gcmVjdC54MjtcbiAgICAgICAgYm91bmRpbmdSZWN0LnkyID0gcmVjdC55MjtcbiAgICAgICAgYm91bmRpbmdSZWN0LndpZHRoID0gcmVjdC54MiAtIHJlY3QueDtcbiAgICAgICAgYm91bmRpbmdSZWN0LmhlaWdodCA9IHJlY3QueTIgLSByZWN0Lnk7XG4gICAgfVxuICAgIHJldHVybiBib3VuZGluZ1JlY3Q7XG59XG4iLCIvL3RoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBnZXQgdGhlIHJldHVybiB0aGUgaW5kZXggb2Ygbm9kZSBpbiBpdHMgcGFyZW50XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlSW5kZXgobm9kZSkge1xuICAgIHJldHVybiBub2RlLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUpO1xufVxuIiwiLy90aGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gcGFzcyBpbiBhIG5vZGUgYW5kIHJldHVybiBpdHMgcGFnZU5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhZ2Uobm9kZSkge1xuICAgIHdoaWxlIChub2RlLnR5cGUgIT0gJ1BBR0UnKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59XG4iLCIvL3RoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBjaGVjayB3aGV0aGVyIGEgbm9kZSBpcyBwYXJ0IG9mIGFuIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BhcnRPZkluc3RhbmNlKG5vZGUpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICBpZiAocGFyZW50LnR5cGUgPT09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBhcmVudC50eXBlID09PSAnUEFHRScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlzUGFydE9mSW5zdGFuY2UocGFyZW50KTtcbiAgICB9XG59XG4iLCIvL3RoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBjaGVjayB3aGV0aGVyIGEgbm9kZSBpcyBwYXJ0IG9mIGFuIHJvb3ROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1BhcnRPZk5vZGUocGFydCwgcm9vdE5vZGUpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBwYXJ0LnBhcmVudDtcbiAgICBpZiAocGFyZW50ID09PSByb290Tm9kZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocGFyZW50LnR5cGUgPT09ICdQQUdFJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gaXNQYXJ0T2ZOb2RlKHBhcmVudCwgcm9vdE5vZGUpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBpc1BhZ2VOb2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS50eXBlID09PSAnUEFHRSc7XG59O1xuZXhwb3J0IGNvbnN0IGlzR3JvdXBOb2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS50eXBlID09PSAnR1JPVVAnO1xufTtcbmV4cG9ydCBjb25zdCBpc0ZyYW1lTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ0ZSQU1FJztcbn07XG5leHBvcnQgY29uc3QgaXNUZXh0Tm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ1RFWFQnO1xufTtcbmV4cG9ydCBjb25zdCBpc0luc3RhbmNlTm9kZSA9IChub2RlKSA9PiB7XG4gICAgcmV0dXJuIG5vZGUudHlwZSA9PT0gJ0lOU1RBTkNFJztcbn07XG5leHBvcnQgY29uc3QgaXNDb21wb25lbnROb2RlID0gKG5vZGUpID0+IHtcbiAgICByZXR1cm4gbm9kZS50eXBlID09PSAnQ09NUE9ORU5UJztcbn07XG5leHBvcnQgY29uc3QgaXNPbmVPZk5vZGVUeXBlID0gKG5vZGUsIHR5cGVMaXN0KSA9PiB7XG4gICAgcmV0dXJuIHR5cGVMaXN0LmluY2x1ZGVzKG5vZGUudHlwZSk7XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgZ2V0QWxsRm9udHMgZnJvbSAnLi9nZXRBbGxGb250cyc7XG4vL3RoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBsb2FkIG9ubHkgdW5pcXVlIGZvbnRzIGFzeW5jaHJvbm91c2x5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkVW5pcXVlRm9udHModGV4dE5vZGVzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZm9udHMgPSBnZXRBbGxGb250cyh0ZXh0Tm9kZXMpO1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IGZvbnRzLm1hcCgoZm9udCkgPT4gZmlnbWEubG9hZEZvbnRBc3luYyhmb250KSk7XG4gICAgICAgIHlpZWxkIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgcmV0dXJuIGZvbnRzO1xuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9kZVRvT2JqZWN0KG5vZGUpIHtcbiAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5lbnRyaWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKSk7XG4gICAgY29uc3QgYmxhY2tsaXN0ID0gWydwYXJlbnQnLCAnY2hpbGRyZW4nLCAncmVtb3ZlZCddO1xuICAgIGNvbnN0IG9iaiA9IHsgaWQ6IG5vZGUuaWQsIHR5cGU6IG5vZGUudHlwZSwgY2hpbGRyZW46IHVuZGVmaW5lZCB9O1xuICAgIGlmIChub2RlLnBhcmVudClcbiAgICAgICAgb2JqLnBhcmVudCA9IHsgaWQ6IG5vZGUucGFyZW50LmlkLCB0eXBlOiBub2RlLnR5cGUgfTtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBwcm9wXSBvZiBwcm9wcykge1xuICAgICAgICBpZiAocHJvcC5nZXQgJiYgYmxhY2tsaXN0LmluZGV4T2YobmFtZSkgPCAwKSB7XG4gICAgICAgICAgICBvYmpbbmFtZV0gPSBwcm9wLmdldC5jYWxsKG5vZGUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbbmFtZV0gPT09ICdzeW1ib2wnKVxuICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9ICdNaXhlZCc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pXG4gICAgICAgIG9iai5jaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gbm9kZVRvT2JqZWN0KGNoaWxkKSk7XG4gICAgaWYgKG5vZGUubWFzdGVyQ29tcG9uZW50KVxuICAgICAgICBvYmoubWFzdGVyQ29tcG9uZW50ID0gbm9kZVRvT2JqZWN0KG5vZGUubWFzdGVyQ29tcG9uZW50KTtcbiAgICByZXR1cm4gb2JqO1xufVxuIiwiLy90aGlzIGZ1bmN0aW9uIHJldHVybnMgYWxsIHRvcCBsZXZlbCBmcmFtZXMgb24gY3VycmVudFBhZ2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvcExldmVsRnJhbWVzKCkge1xuICAgIHJldHVybiBmaWdtYS5jdXJyZW50UGFnZS5jaGlsZHJlbi5maWx0ZXIoKG5vZGUpID0+IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyk7XG59XG4iLCIvL2ltcG9ydCBhbGwgaGVscGVyIGZ1bmN0aW9ucyBoZXJlXG5pbXBvcnQgZ2V0UGFnZSBmcm9tICcuL2hlbHBlcnMvZ2V0UGFnZSc7XG5pbXBvcnQgZ2V0Tm9kZUluZGV4IGZyb20gJy4vaGVscGVycy9nZXROb2RlSW5kZXgnO1xuaW1wb3J0IGlzUGFydE9mSW5zdGFuY2UgZnJvbSAnLi9oZWxwZXJzL2lzUGFydE9mSW5zdGFuY2UnO1xuaW1wb3J0IGlzUGFydE9mTm9kZSBmcm9tICcuL2hlbHBlcnMvaXNQYXJ0T2ZOb2RlJztcbmltcG9ydCB0b3BMZXZlbEZyYW1lcyBmcm9tICcuL2hlbHBlcnMvdG9wTGV2ZWxGcmFtZXMnO1xuaW1wb3J0IGdldEFsbEZvbnRzIGZyb20gJy4vaGVscGVycy9nZXRBbGxGb250cyc7XG5pbXBvcnQgbG9hZFVuaXF1ZUZvbnRzIGZyb20gJy4vaGVscGVycy9sb2FkVW5pcXVlRm9udHMnO1xuaW1wb3J0IGNsb25lIGZyb20gJy4vaGVscGVycy9jbG9uZSc7XG5pbXBvcnQgZ2V0Qm91bmRpbmdSZWN0IGZyb20gJy4vaGVscGVycy9nZXRCb3VuZGluZ1JlY3QnO1xuaW1wb3J0IHsgaXNDb21wb25lbnROb2RlLCBpc0ZyYW1lTm9kZSwgaXNHcm91cE5vZGUsIGlzSW5zdGFuY2VOb2RlLCBpc1BhZ2VOb2RlLCBpc1RleHROb2RlLCBpc09uZU9mTm9kZVR5cGUgfSBmcm9tICcuL2hlbHBlcnMvaXNUeXBlTm9kZSc7XG5pbXBvcnQgbm9kZVRvT2JqZWN0IGZyb20gJy4vaGVscGVycy9ub2RlVG9PYmplY3QnO1xuLy9leHBvcnQgYWxsIGhlbHBlciBmdW5jdGlvbnMgc28gdGhleSBjYW4gYmUgdXNlZCBpbmRpZHVhbGx5IGFzIG5lZWRlZFxuZXhwb3J0IHsgZ2V0UGFnZSwgZ2V0Tm9kZUluZGV4LCBpc0NvbXBvbmVudE5vZGUsIGlzRnJhbWVOb2RlLCBpc0dyb3VwTm9kZSwgaXNJbnN0YW5jZU5vZGUsIGlzUGFnZU5vZGUsIGlzVGV4dE5vZGUsIHRvcExldmVsRnJhbWVzLCBnZXRBbGxGb250cywgbG9hZFVuaXF1ZUZvbnRzLCBpc1BhcnRPZkluc3RhbmNlLCBpc1BhcnRPZk5vZGUsIGlzT25lT2ZOb2RlVHlwZSwgY2xvbmUsIGdldEJvdW5kaW5nUmVjdCwgbm9kZVRvT2JqZWN0IH07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGlzVGV4dE5vZGUsIGdldEFsbEZvbnRzIH0gZnJvbSAnQGZpZ21hLXBsdWdpbi9oZWxwZXJzJztcbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG1zZy50eXBlID09PSAnZ2V0Rm9udE5hbWVzJykge1xuICAgICAgICBjb25zdCBub2RlcyA9IGZpZ21hLmN1cnJlbnRQYWdlLmNoaWxkcmVuO1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSBub2Rlcy5yZWR1Y2UoKGFjYywgbm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGV4dE5vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBhY2MucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgY29uc3QgZm9udE5hbWVzID0gZ2V0QWxsRm9udHModGV4dE5vZGVzKTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgZm9udE5hbWVzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAnYXBwbHlGb250Jykge1xuICAgICAgICBjb25zdCB7IGZhbWlseSwgc3R5bGUgfSA9IG1zZy5mb250TmFtZTtcbiAgICAgICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyh7XG4gICAgICAgICAgICBmYW1pbHksXG4gICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblxuICAgICAgICAgICAgLmZpbHRlcihub2RlID0+IG5vZGUudHlwZSA9PT0gJ1RFWFQnKVxuICAgICAgICAgICAgLm1hcCh0ZXh0Tm9kZSA9PiB7XG4gICAgICAgICAgICB0ZXh0Tm9kZS5mb250TmFtZSA9IHtcbiAgICAgICAgICAgICAgICBmYW1pbHksXG4gICAgICAgICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9