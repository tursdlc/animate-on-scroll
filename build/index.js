/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);







// Register the dataAttributes for all blocks
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'custom-block-attributes/add-attributes', settings => {
  // Store the original save function
  const originalSave = settings.save;

  // Create a new save function that wraps the original
  settings.save = props => {
    // Get the original save element
    const element = originalSave(props);
    if (!element || !props.attributes.dataAttributes || props.attributes.dataAttributes.length === 0) {
      return element;
    }

    // Clone the element to avoid modifying the original
    const newElement = {
      ...element
    };

    // Make sure props exists
    if (!newElement.props) {
      newElement.props = {};
    }

    // Add data attributes to the props
    props.attributes.dataAttributes.forEach(attr => {
      if (attr.name && attr.value) {
        newElement.props[`data-${attr.name}`] = attr.value;
      }
    });
    return newElement;
  };

  // Add the dataAttributes attribute to all blocks
  settings.attributes = {
    ...settings.attributes,
    dataAttributes: {
      type: 'array',
      default: []
    }
  };

  // Add support for custom attributes
  settings.supports = {
    ...settings.supports,
    customClassName: true,
    html: true
  };
  return settings;
});

// Higher order component to add custom inspector controls
const withCustomAttributes = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      attributes,
      setAttributes
    } = props;

    // Initialize dataAttributes if it doesn't exist
    const dataAttributes = attributes.dataAttributes || [];

    // Find existing SAL attributes
    const getSalAttribute = name => {
      const attr = dataAttributes.find(attr => attr.name === name);
      return attr ? attr.value : '';
    };

    // Check if SAL animation is enabled
    const hasSalAnimation = Boolean(getSalAttribute('sal'));

    // Set initial state based on whether animation exists
    const [showAnimationControls, setShowAnimationControls] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(hasSalAnimation);

    // Update state when attributes change
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      setShowAnimationControls(Boolean(getSalAttribute('sal')));
    }, [attributes.dataAttributes]);

    // SAL animation options
    const animationOptions = [{
      label: 'Fade',
      value: 'fade'
    }, {
      label: 'Slide Up',
      value: 'slide-up'
    }, {
      label: 'Slide Down',
      value: 'slide-down'
    }, {
      label: 'Slide Left',
      value: 'slide-left'
    }, {
      label: 'Slide Right',
      value: 'slide-right'
    }, {
      label: 'Zoom In',
      value: 'zoom-in'
    }, {
      label: 'Zoom Out',
      value: 'zoom-out'
    }];
    const durationOptions = [{
      label: '200ms',
      value: '200'
    }, {
      label: '300ms',
      value: '300'
    }, {
      label: '400ms',
      value: '400'
    }, {
      label: '500ms',
      value: '500'
    }, {
      label: '600ms',
      value: '600'
    }, {
      label: '700ms',
      value: '700'
    }, {
      label: '800ms',
      value: '800'
    }, {
      label: '900ms',
      value: '900'
    }, {
      label: '1000ms',
      value: '1000'
    }];
    const easingOptions = [{
      label: 'Linear',
      value: 'linear'
    }, {
      label: 'Ease',
      value: 'ease'
    }, {
      label: 'Ease In',
      value: 'ease-in'
    }, {
      label: 'Ease Out',
      value: 'ease-out'
    }, {
      label: 'Ease In Out',
      value: 'ease-in-out'
    }];

    // Add or update a SAL attribute
    const updateSalAttribute = (name, value) => {
      const newAttributes = [...dataAttributes];
      const existingIndex = newAttributes.findIndex(attr => attr.name === name);
      if (existingIndex !== -1) {
        if (value) {
          newAttributes[existingIndex].value = value;
        } else {
          // Remove if value is empty
          newAttributes.splice(existingIndex, 1);
        }
      } else if (value) {
        newAttributes.push({
          name,
          value
        });
      }
      setAttributes({
        dataAttributes: newAttributes
      });
    };

    // Remove all SAL attributes
    const removeSalAnimation = () => {
      const newAttributes = dataAttributes.filter(attr => !attr.name.startsWith('sal'));
      setAttributes({
        dataAttributes: newAttributes
      });
      setShowAnimationControls(false);
    };

    // Add SAL animation preset
    const addSalAnimation = () => {
      const newAttributes = [...dataAttributes.filter(attr => !attr.name.startsWith('sal')), {
        name: 'sal',
        value: 'fade'
      }, {
        name: 'sal-duration',
        value: '500'
      }, {
        name: 'sal-delay',
        value: '0'
      }, {
        name: 'sal-easing',
        value: 'ease-out'
      }];
      setAttributes({
        dataAttributes: newAttributes
      });
      setShowAnimationControls(true);
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: "Scroll Animation",
      initialOpen: false
    }, !showAnimationControls ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isPrimary: true,
      onClick: addSalAnimation,
      style: {
        marginBottom: '10px',
        width: '100%'
      }
    }, "Add Scroll Animation") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        padding: '15px',
        backgroundColor: '#f0f0f0',
        marginBottom: '15px',
        borderRadius: '4px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: "Animation Type",
      value: getSalAttribute('sal'),
      options: animationOptions,
      onChange: value => updateSalAttribute('sal', value)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: "Duration",
      value: getSalAttribute('sal-duration'),
      options: durationOptions,
      onChange: value => updateSalAttribute('sal-duration', value)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
      label: "Delay (ms)",
      value: parseInt(getSalAttribute('sal-delay') || '0'),
      onChange: value => updateSalAttribute('sal-delay', value.toString()),
      min: 0,
      max: 1000,
      step: 100
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: "Easing",
      value: getSalAttribute('sal-easing'),
      options: easingOptions,
      onChange: value => updateSalAttribute('sal-easing', value)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isDestructive: true,
      onClick: removeSalAnimation,
      style: {
        marginTop: '15px'
      }
    }, "Remove Animation")))));
  };
}, 'withCustomAttributes');

// Add our custom attributes panel to all blocks
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'custom-block-attributes/with-custom-attributes', withCustomAttributes);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map