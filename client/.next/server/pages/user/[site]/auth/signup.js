module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JfgM");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "FfxO":
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),

/***/ "HPDO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("FfxO");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);






const Layout = ({
  children,
  fullPageLeaderboard,
  smallLeaderboard,
  leaderboardData,
  heightOverride
}) => {
  // fullpageleaderboard
  // smallleaderboard
  // calculate out the difference in the full and small
  // mobile menu button is 36px
  const showLeaderboard = ({
    header,
    subHeader,
    btnText,
    btnPath,
    dividerText
  }) => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Segment"], {
    basic: true,
    style: fullPageLeaderboard ? {
      minHeight: "calc(100vh - 2rem)"
    } : {
      minHeight: "33vh"
    },
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      columns: 1,
      centered: true,
      style: fullPageLeaderboard ? {
        minHeight: "calc(100vh - 2rem)"
      } : {
        minHeight: "33vh"
      },
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Grid"].Row, {
        verticalAlign: "middle",
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Grid"].Column, {
          children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Header"], {
            as: "h2",
            textAlign: "center",
            children: [header, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Header"].Subheader, {
              children: subHeader
            }), btnPath && btnText && /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
              color: "linkedin",
              style: {
                marginTop: "1rem"
              },
              onClick: () => next_router__WEBPACK_IMPORTED_MODULE_3___default.a.push(btnPath),
              children: btnText
            })]
          })
        })
      })
    }), !smallLeaderboard ? "" : /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Divider"], {
      horizontal: true,
      children: dividerText
    })]
  });

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
    children: [showLeaderboard(leaderboardData), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Container"], {
      style: smallLeaderboard ? {
        minHeight: heightOverride || "67vh"
      } : {
        minHeight: heightOverride || null
      },
      children: children
    })]
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Layout);

/***/ }),

/***/ "JfgM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__("FfxO");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: ./hooks/use-request.js
var use_request = __webpack_require__("qYya");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// CONCATENATED MODULE: ./components/auth/signup-basic-user.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const Signup = ({
  createSitePermission
}) => {
  const {
    0: values,
    1: setValues
  } = Object(external_react_["useState"])({
    name: "",
    phone: null,
    email: "",
    password: "",
    success: false,
    loading: false
  });
  const {
    name,
    phone,
    email,
    password,
    success,
    loading
  } = values;
  const {
    doRequest,
    errors
  } = Object(use_request["a" /* useRequest */])({
    url: `/api/users/signup/${Object(router_["useRouter"])().query.site}`,
    // MUST CHANGE
    method: "post",
    body: {
      email,
      password,
      name,
      phone,
      createSitePermission
    }
  });

  const handleChange = name => e => {
    if (name === "phone" && /^\d+$/.test(e.target.value) === false && e.nativeEvent.inputType !== "deleteContentBackward") {
      return;
    }

    setValues(_objectSpread(_objectSpread({}, values), {}, {
      [name]: e.target.value
    }));
  };

  const clickSubmit = async event => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues(_objectSpread(_objectSpread({}, values), {}, {
      loading: true
    }));
    const response = await doRequest();
    setValues(_objectSpread(_objectSpread({}, values), {}, {
      loading: false
    }));

    if (response && response.token) {
      setValues(_objectSpread(_objectSpread({}, values), {}, {
        success: true
      }));
    }
  };

  return success ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Message"], {
    success: true,
    header: `Activation email sent to ${email}`
  }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"], {
    loading: loading,
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_react_["Fragment"], {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Input, {
        onChange: handleChange("name"),
        value: name,
        fluid: true,
        placeholder: "Name",
        type: "text"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Input, {
        onChange: handleChange("phone"),
        value: phone,
        fluid: true,
        placeholder: "Phone",
        type: "text"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Input, {
        onChange: handleChange("email"),
        value: email,
        fluid: true,
        placeholder: "Email",
        type: "email"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Input, {
        onChange: handleChange("password"),
        value: password,
        fluid: true,
        placeholder: "Password",
        type: "Password"
      }), errors, /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Button, {
        fluid: true,
        onClick: clickSubmit,
        children: "Sign Up"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Message"], {
        children: "When you click \"signup\" you will be sent an email to confirm your account."
      })]
    })
  });
};


// EXTERNAL MODULE: ./components/layouts/index.js
var layouts = __webpack_require__("HPDO");

// CONCATENATED MODULE: ./pages/user/[site]/auth/signup.js





const signup = () => {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(layouts["a" /* default */], {
    smallLeaderboard: true,
    leaderboardData: {
      header: "Sign Up",
      subHeader: "To accelerate conversations about your project",
      dividerText: "New user sign up"
    },
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Signup, {})
  });
};

/* harmony default export */ var auth_signup = __webpack_exports__["default"] = (signup);

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "qYya":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useRequest; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("FfxO");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const useRequest = ({
  url,
  method,
  body,
  onSuccess
}) => {
  const {
    0: errors,
    1: setErrors
  } = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null);
  const {
    0: errMsgArr,
    1: setErrMsgArr
  } = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a[method](url, _objectSpread(_objectSpread({}, body), props));

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(" did you import Router from next/router?", err);
      setErrors( /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Message"], {
        negative: true,
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Message"].Header, {
          children: "There is a problem with the form submission."
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["List"], {
          as: "ul",
          children: err.response.data.errors.map(e => /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["List"].Item, {
            as: "li",
            children: e.message
          }, e.message))
        })]
      }));
      setErrMsgArr(err.response.data.errors.map(e => e.message));
    }
  };

  return {
    doRequest,
    errors,
    errMsgArr
  };
};



/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });