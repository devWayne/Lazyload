var Lazyload =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOpt = {
    attr: 'data-lazyload',
    attrRetina: 'data-lazyload-retina',
    threshold: 1
};

var Lazyload = function () {
    function Lazyload(opt) {
        _classCallCheck(this, Lazyload);

        this.opt = opt || {};
        for (var key in defaultOpt) {
            this.opt[key] = this.opt[key] || defaultOpt[key];
        }
        this.lastScroll;
        this.ticking = false;
        this.selector = '[' + this.opt.attr + ']';
        this.nodes = document.querySelectorAll(this.selector);
        this.start();
    }

    _createClass(Lazyload, [{
        key: 'start',
        value: function start() {
            window.addEventListener('scroll', this._scroll.bind(this), false);
            window.addEventListener('resize', this._scroll.bind(this), false);
        }
    }, {
        key: 'stop',
        value: function stop() {
            window.removeEventListener('scroll', this._scroll.bind(this), false);
            window.removeEventListener('resize', this._scroll.bind(this), false);
        }
    }, {
        key: '_update',
        value: function _update() {
            this.nodes = Array.prototype.slice.call(this.nodes);
            this.nodes.forEach(function (v, i) {
                var node = this.nodes[i];
                if (node.hasAttribute(this.opt.attr) && Lazyload._inViewport.call(this, node)) {
                    v.setAttribute('src', v.getAttribute(this.opt.attr));
                }
            }.bind(this));
            this.ticking = false;
        }
    }, {
        key: '_scroll',
        value: function _scroll(e) {
            this.lastScroll = window.scrollY;
            if (!this.ticking) {
                requestAnimationFrame(this._update.bind(this));
                this.ticking = true;
            }
        }
    }], [{
        key: '_inViewport',
        value: function _inViewport(node) {
            var viewportTop = this.lastScroll;
            var viewportBottom = viewportTop + window.innerHeight;

            var elementTop = Lazyload.getOffsetTop(node);
            var elementBottom = elementTop + node.offsetHeight;
            var threshold = this.opt.threshold / 100 * window.innerHeight;
            return elementBottom >= viewportTop - threshold && elementTop <= viewportBottom + threshold;
        }
    }, {
        key: 'getOffsetTop',
        value: function getOffsetTop(element) {
            var offsetTop = 0;

            do {
                if (!isNaN(element.offsetTop)) {
                    offsetTop += element.offsetTop;
                }
            } while (element = element.offsetParent);

            return offsetTop;
        }
    }]);

    return Lazyload;
}();

module.exports = Lazyload;

/***/ }
/******/ ]);