module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/[site]/auth/signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/auth/signup.js":
/*!***********************************!*\
  !*** ./components/auth/signup.js ***!
  \***********************************/
/*! exports provided: Signup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Signup\", function() { return Signup; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ \"semantic-ui-react\");\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _hooks_use_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/use-request */ \"./hooks/use-request.js\");\n\nvar _jsxFileName = \"/Users/robbaratta/Desktop/code/projects/rfp/client/components/auth/signup.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nconst Signup = () => {\n  const {\n    0: values,\n    1: setValues\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])({\n    userOfSite: \"rfp\",\n    name: \"\",\n    phone: \"\",\n    email: \"\",\n    password: \"\",\n    success: false,\n    error: false,\n    msg: \"\",\n    loading: false\n  });\n  const {\n    name,\n    phone,\n    email,\n    password,\n    success,\n    loading,\n    error,\n    msg,\n    userOfSite\n  } = values;\n  const {\n    doRequest,\n    errors\n  } = Object(_hooks_use_request__WEBPACK_IMPORTED_MODULE_4__[\"useRequest\"])({\n    url: `/api/users/signup/${userOfSite}`,\n    // MUST CHANGE\n    method: \"post\",\n    body: {\n      name,\n      email,\n      phone,\n      password\n    }\n  });\n\n  const handleChange = name => e => {\n    setValues(_objectSpread(_objectSpread({}, values), {}, {\n      msg: \"\",\n      error: false,\n      [name]: e.target.value\n    }));\n  };\n\n  const clickSubmit = async event => {\n    event.preventDefault(); // keep browser from reloading when btn click\n\n    await doRequest();\n  };\n\n  const redirectAfterLogin = () => {\n    console.log(\"redirecting..\");\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"], {\n    success: success,\n    loading: loading,\n    children: success ? redirectAfterLogin() : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Input, {\n        onChange: handleChange(\"name\"),\n        value: name,\n        fluid: true,\n        placeholder: \"Name\",\n        type: \"text\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 11\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Input, {\n        onChange: handleChange(\"phone\"),\n        value: phone,\n        fluid: true,\n        placeholder: \"Phone\",\n        type: \"text\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 69,\n        columnNumber: 11\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Input, {\n        onChange: handleChange(\"email\"),\n        value: email,\n        fluid: true,\n        placeholder: \"Email\",\n        type: \"email\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 11\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Input, {\n        onChange: handleChange(\"password\"),\n        value: password,\n        fluid: true,\n        placeholder: \"Password\",\n        type: \"Password\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 83,\n        columnNumber: 11\n      }, undefined), errors, /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Button, {\n        fluid: true,\n        onClick: clickSubmit,\n        children: \"Sign Up\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 11\n      }, undefined)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 9\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 57,\n    columnNumber: 5\n  }, undefined);\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2F1dGgvc2lnbnVwLmpzPzRiYzUiXSwibmFtZXMiOlsiU2lnbnVwIiwidmFsdWVzIiwic2V0VmFsdWVzIiwidXNlU3RhdGUiLCJ1c2VyT2ZTaXRlIiwibmFtZSIsInBob25lIiwiZW1haWwiLCJwYXNzd29yZCIsInN1Y2Nlc3MiLCJlcnJvciIsIm1zZyIsImxvYWRpbmciLCJkb1JlcXVlc3QiLCJlcnJvcnMiLCJ1c2VSZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiYm9keSIsImhhbmRsZUNoYW5nZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNsaWNrU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInJlZGlyZWN0QWZ0ZXJMb2dpbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsTUFBTSxHQUFHLE1BQU07QUFDbkIsUUFBTTtBQUFBLE9BQUNDLE1BQUQ7QUFBQSxPQUFTQztBQUFULE1BQXNCQyxzREFBUSxDQUFDO0FBQ25DQyxjQUFVLEVBQUUsS0FEdUI7QUFFbkNDLFFBQUksRUFBRSxFQUY2QjtBQUduQ0MsU0FBSyxFQUFFLEVBSDRCO0FBSW5DQyxTQUFLLEVBQUUsRUFKNEI7QUFLbkNDLFlBQVEsRUFBRSxFQUx5QjtBQU1uQ0MsV0FBTyxFQUFFLEtBTjBCO0FBT25DQyxTQUFLLEVBQUUsS0FQNEI7QUFRbkNDLE9BQUcsRUFBRSxFQVI4QjtBQVNuQ0MsV0FBTyxFQUFFO0FBVDBCLEdBQUQsQ0FBcEM7QUFZQSxRQUFNO0FBQ0pQLFFBREk7QUFFSkMsU0FGSTtBQUdKQyxTQUhJO0FBSUpDLFlBSkk7QUFLSkMsV0FMSTtBQU1KRyxXQU5JO0FBT0pGLFNBUEk7QUFRSkMsT0FSSTtBQVNKUDtBQVRJLE1BVUZILE1BVko7QUFZQSxRQUFNO0FBQUVZLGFBQUY7QUFBYUM7QUFBYixNQUF3QkMscUVBQVUsQ0FBQztBQUN2Q0MsT0FBRyxFQUFHLHFCQUFvQlosVUFBVyxFQURFO0FBQ0M7QUFDeENhLFVBQU0sRUFBRSxNQUYrQjtBQUd2Q0MsUUFBSSxFQUFFO0FBQ0piLFVBREk7QUFFSkUsV0FGSTtBQUdKRCxXQUhJO0FBSUpFO0FBSkk7QUFIaUMsR0FBRCxDQUF4Qzs7QUFXQSxRQUFNVyxZQUFZLEdBQUlkLElBQUQsSUFBV2UsQ0FBRCxJQUFPO0FBQ3BDbEIsYUFBUyxpQ0FBTUQsTUFBTjtBQUFjVSxTQUFHLEVBQUUsRUFBbkI7QUFBdUJELFdBQUssRUFBRSxLQUE5QjtBQUFxQyxPQUFDTCxJQUFELEdBQVFlLENBQUMsQ0FBQ0MsTUFBRixDQUFTQztBQUF0RCxPQUFUO0FBQ0QsR0FGRDs7QUFJQSxRQUFNQyxXQUFXLEdBQUcsTUFBT0MsS0FBUCxJQUFpQjtBQUNuQ0EsU0FBSyxDQUFDQyxjQUFOLEdBRG1DLENBQ1g7O0FBRXhCLFVBQU1aLFNBQVMsRUFBZjtBQUNELEdBSkQ7O0FBTUEsUUFBTWEsa0JBQWtCLEdBQUcsTUFBTTtBQUMvQkMsV0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNELEdBRkQ7O0FBSUEsc0JBQ0UscUVBQUMsc0RBQUQ7QUFBTSxXQUFPLEVBQUVuQixPQUFmO0FBQXdCLFdBQU8sRUFBRUcsT0FBakM7QUFBQSxjQUNHSCxPQUFPLEdBQ05pQixrQkFBa0IsRUFEWixnQkFHTixxRUFBQyw4Q0FBRDtBQUFBLDhCQUNFLHFFQUFDLHNEQUFELENBQU0sS0FBTjtBQUNFLGdCQUFRLEVBQUVQLFlBQVksQ0FBQyxNQUFELENBRHhCO0FBRUUsYUFBSyxFQUFFZCxJQUZUO0FBR0UsYUFBSyxNQUhQO0FBSUUsbUJBQVcsRUFBQyxNQUpkO0FBS0UsWUFBSSxFQUFDO0FBTFA7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixlQVFFLHFFQUFDLHNEQUFELENBQU0sS0FBTjtBQUNFLGdCQUFRLEVBQUVjLFlBQVksQ0FBQyxPQUFELENBRHhCO0FBRUUsYUFBSyxFQUFFYixLQUZUO0FBR0UsYUFBSyxNQUhQO0FBSUUsbUJBQVcsRUFBQyxPQUpkO0FBS0UsWUFBSSxFQUFDO0FBTFA7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFSRixlQWVFLHFFQUFDLHNEQUFELENBQU0sS0FBTjtBQUNFLGdCQUFRLEVBQUVhLFlBQVksQ0FBQyxPQUFELENBRHhCO0FBRUUsYUFBSyxFQUFFWixLQUZUO0FBR0UsYUFBSyxNQUhQO0FBSUUsbUJBQVcsRUFBQyxPQUpkO0FBS0UsWUFBSSxFQUFDO0FBTFA7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFmRixlQXNCRSxxRUFBQyxzREFBRCxDQUFNLEtBQU47QUFDRSxnQkFBUSxFQUFFWSxZQUFZLENBQUMsVUFBRCxDQUR4QjtBQUVFLGFBQUssRUFBRVgsUUFGVDtBQUdFLGFBQUssTUFIUDtBQUlFLG1CQUFXLEVBQUMsVUFKZDtBQUtFLFlBQUksRUFBQztBQUxQO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBdEJGLEVBNkJHTSxNQTdCSCxlQThCRSxxRUFBQyxzREFBRCxDQUFNLE1BQU47QUFBYSxhQUFLLE1BQWxCO0FBQW1CLGVBQU8sRUFBRVMsV0FBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBOUJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQTBDRCxDQTVGRCIsImZpbGUiOiIuL2NvbXBvbmVudHMvYXV0aC9zaWdudXAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgRnJhZ21lbnQsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRm9ybSwgTWVzc2FnZSB9IGZyb20gXCJzZW1hbnRpYy11aS1yZWFjdFwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgdXNlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9ob29rcy91c2UtcmVxdWVzdFwiO1xuXG5jb25zdCBTaWdudXAgPSAoKSA9PiB7XG4gIGNvbnN0IFt2YWx1ZXMsIHNldFZhbHVlc10gPSB1c2VTdGF0ZSh7XG4gICAgdXNlck9mU2l0ZTogXCJyZnBcIixcbiAgICBuYW1lOiBcIlwiLFxuICAgIHBob25lOiBcIlwiLFxuICAgIGVtYWlsOiBcIlwiLFxuICAgIHBhc3N3b3JkOiBcIlwiLFxuICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgIGVycm9yOiBmYWxzZSxcbiAgICBtc2c6IFwiXCIsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIHBob25lLFxuICAgIGVtYWlsLFxuICAgIHBhc3N3b3JkLFxuICAgIHN1Y2Nlc3MsXG4gICAgbG9hZGluZyxcbiAgICBlcnJvcixcbiAgICBtc2csXG4gICAgdXNlck9mU2l0ZSxcbiAgfSA9IHZhbHVlcztcblxuICBjb25zdCB7IGRvUmVxdWVzdCwgZXJyb3JzIH0gPSB1c2VSZXF1ZXN0KHtcbiAgICB1cmw6IGAvYXBpL3VzZXJzL3NpZ251cC8ke3VzZXJPZlNpdGV9YCwgLy8gTVVTVCBDSEFOR0VcbiAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgIGJvZHk6IHtcbiAgICAgIG5hbWUsXG4gICAgICBlbWFpbCxcbiAgICAgIHBob25lLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKG5hbWUpID0+IChlKSA9PiB7XG4gICAgc2V0VmFsdWVzKHsgLi4udmFsdWVzLCBtc2c6IFwiXCIsIGVycm9yOiBmYWxzZSwgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfTtcblxuICBjb25zdCBjbGlja1N1Ym1pdCA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGtlZXAgYnJvd3NlciBmcm9tIHJlbG9hZGluZyB3aGVuIGJ0biBjbGlja1xuXG4gICAgYXdhaXQgZG9SZXF1ZXN0KCk7XG4gIH07XG5cbiAgY29uc3QgcmVkaXJlY3RBZnRlckxvZ2luID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmVkaXJlY3RpbmcuLlwiKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGb3JtIHN1Y2Nlc3M9e3N1Y2Nlc3N9IGxvYWRpbmc9e2xvYWRpbmd9PlxuICAgICAge3N1Y2Nlc3MgPyAoXG4gICAgICAgIHJlZGlyZWN0QWZ0ZXJMb2dpbigpXG4gICAgICApIDogKFxuICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgPEZvcm0uSW5wdXRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoXCJuYW1lXCIpfVxuICAgICAgICAgICAgdmFsdWU9e25hbWV9XG4gICAgICAgICAgICBmbHVpZFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOYW1lXCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxGb3JtLklucHV0XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwicGhvbmVcIil9XG4gICAgICAgICAgICB2YWx1ZT17cGhvbmV9XG4gICAgICAgICAgICBmbHVpZFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQaG9uZVwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Rm9ybS5JbnB1dFxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcImVtYWlsXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgZmx1aWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxGb3JtLklucHV0XG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwicGFzc3dvcmRcIil9XG4gICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgICBmbHVpZFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICB0eXBlPVwiUGFzc3dvcmRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAge2Vycm9yc31cbiAgICAgICAgICA8Rm9ybS5CdXR0b24gZmx1aWQgb25DbGljaz17Y2xpY2tTdWJtaXR9PlxuICAgICAgICAgICAgU2lnbiBVcFxuICAgICAgICAgIDwvRm9ybS5CdXR0b24+XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICApfVxuICAgIDwvRm9ybT5cbiAgKTtcbn07XG5cbmV4cG9ydCB7IFNpZ251cCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/auth/signup.js\n");

/***/ }),

/***/ "./hooks/use-request.js":
/*!******************************!*\
  !*** ./hooks/use-request.js ***!
  \******************************/
/*! exports provided: useRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useRequest\", function() { return useRequest; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! semantic-ui-react */ \"semantic-ui-react\");\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _jsxFileName = \"/Users/robbaratta/Desktop/code/projects/rfp/client/hooks/use-request.js\";\n\n\n\n\nconst useRequest = ({\n  url,\n  method,\n  body\n}) => {\n  const {\n    0: errors,\n    1: setErrors\n  } = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(null);\n\n  const doRequest = async () => {\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a[method](url, body);\n      return response.data;\n    } catch (err) {\n      setErrors( /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__[\"Message\"], {\n        negative: true,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__[\"Message\"].Header, {\n          children: \"There is a problem with your submission.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 14,\n          columnNumber: 11\n        }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__[\"List\"], {\n          as: \"ul\",\n          children: console.log(err.response)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 17,\n          columnNumber: 11\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 13,\n        columnNumber: 9\n      }, undefined));\n    }\n  };\n\n  return {\n    doRequest,\n    errors\n  };\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ob29rcy91c2UtcmVxdWVzdC5qcz9hOThjIl0sIm5hbWVzIjpbInVzZVJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJib2R5IiwiZXJyb3JzIiwic2V0RXJyb3JzIiwidXNlU3RhdGUiLCJkb1JlcXVlc3QiLCJyZXNwb25zZSIsImF4aW9zIiwiZGF0YSIsImVyciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxVQUFVLEdBQUcsQ0FBQztBQUFFQyxLQUFGO0FBQU9DLFFBQVA7QUFBZUM7QUFBZixDQUFELEtBQTJCO0FBQzVDLFFBQU07QUFBQSxPQUFDQyxNQUFEO0FBQUEsT0FBU0M7QUFBVCxNQUFzQkMsc0RBQVEsQ0FBQyxJQUFELENBQXBDOztBQUNBLFFBQU1DLFNBQVMsR0FBRyxZQUFZO0FBQzVCLFFBQUk7QUFDRixZQUFNQyxRQUFRLEdBQUcsTUFBTUMsNENBQUssQ0FBQ1AsTUFBRCxDQUFMLENBQWNELEdBQWQsRUFBbUJFLElBQW5CLENBQXZCO0FBQ0EsYUFBT0ssUUFBUSxDQUFDRSxJQUFoQjtBQUNELEtBSEQsQ0FHRSxPQUFPQyxHQUFQLEVBQVk7QUFDWk4sZUFBUyxlQUNQLHFFQUFDLHlEQUFEO0FBQVMsZ0JBQVEsTUFBakI7QUFBQSxnQ0FDRSxxRUFBQyx5REFBRCxDQUFTLE1BQVQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREYsZUFJRSxxRUFBQyxzREFBRDtBQUFNLFlBQUUsRUFBQyxJQUFUO0FBQUEsb0JBQ0dPLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixHQUFHLENBQUNILFFBQWhCO0FBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRE8sQ0FBVDtBQWVEO0FBQ0YsR0FyQkQ7O0FBdUJBLFNBQU87QUFBRUQsYUFBRjtBQUFhSDtBQUFiLEdBQVA7QUFDRCxDQTFCRCIsImZpbGUiOiIuL2hvb2tzL3VzZS1yZXF1ZXN0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpc3QsIE1lc3NhZ2UgfSBmcm9tIFwic2VtYW50aWMtdWktcmVhY3RcIjtcblxuY29uc3QgdXNlUmVxdWVzdCA9ICh7IHVybCwgbWV0aG9kLCBib2R5IH0pID0+IHtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBkb1JlcXVlc3QgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3NbbWV0aG9kXSh1cmwsIGJvZHkpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXRFcnJvcnMoXG4gICAgICAgIDxNZXNzYWdlIG5lZ2F0aXZlPlxuICAgICAgICAgIDxNZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgIFRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHlvdXIgc3VibWlzc2lvbi5cbiAgICAgICAgICA8L01lc3NhZ2UuSGVhZGVyPlxuICAgICAgICAgIDxMaXN0IGFzPVwidWxcIj5cbiAgICAgICAgICAgIHtjb25zb2xlLmxvZyhlcnIucmVzcG9uc2UpfVxuICAgICAgICAgICAgey8qIHtlcnIucmVzcG9uc2UuZGF0YS5lcnJvci5tYXAoKGUpID0+IChcbiAgICAgICAgICAgICAgPExpc3QuSXRlbSBhcz1cImxpXCIga2V5PXtlLm1lc3NhZ2V9PlxuICAgICAgICAgICAgICAgIHtlLm1lc3NhZ2V9XG4gICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgKSl9ICovfVxuICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgZG9SZXF1ZXN0LCBlcnJvcnMgfTtcbn07XG5cbmV4cG9ydCB7IHVzZVJlcXVlc3QgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./hooks/use-request.js\n");

/***/ }),

/***/ "./pages/[site]/auth/signup.js":
/*!*************************************!*\
  !*** ./pages/[site]/auth/signup.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_auth_signup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/auth/signup */ \"./components/auth/signup.js\");\n\nvar _jsxFileName = \"/Users/robbaratta/Desktop/code/projects/rfp/client/pages/[site]/auth/signup.js\";\n\n\nconst signup = () => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_auth_signup__WEBPACK_IMPORTED_MODULE_1__[\"Signup\"], {}, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 4,\n    columnNumber: 10\n  }, undefined);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (signup);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9bc2l0ZV0vYXV0aC9zaWdudXAuanM/NTZmMCJdLCJuYW1lcyI6WyJzaWdudXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBLE1BQU1BLE1BQU0sR0FBRyxNQUFNO0FBQ25CLHNCQUFPLHFFQUFDLDhEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBUDtBQUNELENBRkQ7O0FBSWVBLHFFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvW3NpdGVdL2F1dGgvc2lnbnVwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbnVwIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvYXV0aC9zaWdudXBcIjtcblxuY29uc3Qgc2lnbnVwID0gKCkgPT4ge1xuICByZXR1cm4gPFNpZ251cCAvPjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNpZ251cDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/[site]/auth/signup.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"semantic-ui-react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZW1hbnRpYy11aS1yZWFjdFwiPzVjODIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic2VtYW50aWMtdWktcmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW1hbnRpYy11aS1yZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///semantic-ui-react\n");

/***/ })

/******/ });