webpackHotUpdate_N_E("pages/[site]/auth/signup",{

/***/ "./components/auth/signup.js":
/*!***********************************!*\
  !*** ./components/auth/signup.js ***!
  \***********************************/
/*! exports provided: Signup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Signup\", function() { return Signup; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! semantic-ui-react */ \"./node_modules/semantic-ui-react/dist/es/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _hooks_use_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../hooks/use-request */ \"./hooks/use-request.js\");\n\n\n\n\n\nvar _jsxFileName = \"/Users/robbaratta/Desktop/code/projects/rfp/client/components/auth/signup.js\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\nvar Signup = function Signup() {\n  _s();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__[\"useState\"])({\n    userOfSite: \"rfp\",\n    name: \"\",\n    phone: \"\",\n    email: \"\",\n    password: \"\",\n    success: false,\n    error: false,\n    msg: \"\",\n    loading: false\n  }),\n      values = _useState[0],\n      setValues = _useState[1];\n\n  var _useRequest = Object(_hooks_use_request__WEBPACK_IMPORTED_MODULE_7__[\"useRequest\"])({\n    url: \"/api/users/signup/\".concat(userOfSite),\n    // MUST CHANGE\n    method: \"post\",\n    body: {\n      name: name,\n      email: email,\n      phone: phone,\n      password: password\n    }\n  }),\n      doRequest = _useRequest.doRequest,\n      errors = _useRequest.errors;\n\n  var name = values.name,\n      phone = values.phone,\n      email = values.email,\n      password = values.password,\n      success = values.success,\n      loading = values.loading,\n      error = values.error,\n      msg = values.msg,\n      userOfSite = values.userOfSite;\n\n  var handleChange = function handleChange(name) {\n    return function (e) {\n      setValues(_objectSpread(_objectSpread({}, values), {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n        msg: \"\",\n        error: false\n      }, name, e.target.value)));\n    };\n  };\n\n  var clickSubmit = /*#__PURE__*/function () {\n    var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(event) {\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              event.preventDefault(); // keep browser from reloading when btn click\n\n              doRequest();\n\n            case 2:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function clickSubmit(_x) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  var redirectAfterLogin = function redirectAfterLogin() {\n    console.log(\"redirecting..\");\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"], {\n    success: success,\n    loading: loading,\n    children: success ? redirectAfterLogin() : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react__WEBPACK_IMPORTED_MODULE_4__[\"Fragment\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"].Input, {\n        onChange: handleChange(\"name\"),\n        error: showError(\"name\"),\n        value: name,\n        fluid: true,\n        placeholder: \"Name\",\n        type: \"text\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 11\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"].Input, {\n        onChange: handleChange(\"phone\"),\n        error: showError(\"phone\"),\n        value: phone,\n        fluid: true,\n        placeholder: \"Phone\",\n        type: \"text\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 70,\n        columnNumber: 11\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"].Input, {\n        onChange: handleChange(\"email\"),\n        error: showError(\"email\"),\n        value: email,\n        fluid: true,\n        placeholder: \"Email\",\n        type: \"email\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 78,\n        columnNumber: 11\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"].Input, {\n        onChange: handleChange(\"password\"),\n        error: showError(\"password\"),\n        value: password,\n        fluid: true,\n        placeholder: \"Password\",\n        type: \"Password\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 86,\n        columnNumber: 11\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(semantic_ui_react__WEBPACK_IMPORTED_MODULE_5__[\"Form\"].Button, {\n        fluid: true,\n        onClick: clickSubmit,\n        children: \"Sign Up\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 94,\n        columnNumber: 11\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 61,\n      columnNumber: 9\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 57,\n    columnNumber: 5\n  }, _this);\n};\n\n_s(Signup, \"eDinw+21h4MoYs/v5txtwx6ntIw=\", false, function () {\n  return [_hooks_use_request__WEBPACK_IMPORTED_MODULE_7__[\"useRequest\"]];\n});\n\n_c = Signup;\n\n\nvar _c;\n\n$RefreshReg$(_c, \"Signup\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9hdXRoL3NpZ251cC5qcz80YmM1Il0sIm5hbWVzIjpbIlNpZ251cCIsInVzZVN0YXRlIiwidXNlck9mU2l0ZSIsIm5hbWUiLCJwaG9uZSIsImVtYWlsIiwicGFzc3dvcmQiLCJzdWNjZXNzIiwiZXJyb3IiLCJtc2ciLCJsb2FkaW5nIiwidmFsdWVzIiwic2V0VmFsdWVzIiwidXNlUmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImJvZHkiLCJkb1JlcXVlc3QiLCJlcnJvcnMiLCJoYW5kbGVDaGFuZ2UiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJjbGlja1N1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJyZWRpcmVjdEFmdGVyTG9naW4iLCJjb25zb2xlIiwibG9nIiwic2hvd0Vycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQUE7O0FBQUEsa0JBQ1NDLHNEQUFRLENBQUM7QUFDbkNDLGNBQVUsRUFBRSxLQUR1QjtBQUVuQ0MsUUFBSSxFQUFFLEVBRjZCO0FBR25DQyxTQUFLLEVBQUUsRUFINEI7QUFJbkNDLFNBQUssRUFBRSxFQUo0QjtBQUtuQ0MsWUFBUSxFQUFFLEVBTHlCO0FBTW5DQyxXQUFPLEVBQUUsS0FOMEI7QUFPbkNDLFNBQUssRUFBRSxLQVA0QjtBQVFuQ0MsT0FBRyxFQUFFLEVBUjhCO0FBU25DQyxXQUFPLEVBQUU7QUFUMEIsR0FBRCxDQURqQjtBQUFBLE1BQ1pDLE1BRFk7QUFBQSxNQUNKQyxTQURJOztBQUFBLG9CQWFXQyxxRUFBVSxDQUFDO0FBQ3ZDQyxPQUFHLDhCQUF1QlosVUFBdkIsQ0FEb0M7QUFDQztBQUN4Q2EsVUFBTSxFQUFFLE1BRitCO0FBR3ZDQyxRQUFJLEVBQUU7QUFDSmIsVUFBSSxFQUFKQSxJQURJO0FBRUpFLFdBQUssRUFB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QkUscUVBQUMsc0RBQUQsQ0FBTSxLQUFOO0FBQ0UsZ0JBQVEsRUFBRWMsWUFBWSxDQUFDLFVBQUQsQ0FEeEI7QUFFRSxhQUFLLEVBQUVVLFNBQVMsQ0FBQyxVQUFELENBRmxCO0FBR0UsYUFBSyxFQUFFdkIsUUFIVDtBQUlFLGFBQUssTUFKUDtBQUtFLG1CQUFXLEVBQUMsVUFMZDtBQU1FLFlBQUksRUFBQztBQU5QO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUF6QkYsZUFpQ0UscUVBQUMsc0RBQUQsQ0FBTSxNQUFOO0FBQWEsYUFBSyxNQUFsQjtBQUFtQixlQUFPLEVBQUVpQixXQUE1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWpDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBREY7QUE2Q0QsQ0EvRkQ7O0dBQU12QixNO1VBYTBCYSw2RDs7O0tBYjFCYixNO0FBaUdOIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9hdXRoL3NpZ251cC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCBGcmFnbWVudCwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGb3JtLCBNZXNzYWdlIH0gZnJvbSBcInNlbWFudGljLXVpLXJlYWN0XCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyB1c2VSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZS1yZXF1ZXN0XCI7XG5cbmNvbnN0IFNpZ251cCA9ICgpID0+IHtcbiAgY29uc3QgW3ZhbHVlcywgc2V0VmFsdWVzXSA9IHVzZVN0YXRlKHtcbiAgICB1c2VyT2ZTaXRlOiBcInJmcFwiLFxuICAgIG5hbWU6IFwiXCIsXG4gICAgcGhvbmU6IFwiXCIsXG4gICAgZW1haWw6IFwiXCIsXG4gICAgcGFzc3dvcmQ6IFwiXCIsXG4gICAgc3VjY2VzczogZmFsc2UsXG4gICAgZXJyb3I6IGZhbHNlLFxuICAgIG1zZzogXCJcIixcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgfSk7XG5cbiAgY29uc3QgeyBkb1JlcXVlc3QsIGVycm9ycyB9ID0gdXNlUmVxdWVzdCh7XG4gICAgdXJsOiBgL2FwaS91c2Vycy9zaWdudXAvJHt1c2VyT2ZTaXRlfWAsIC8vIE1VU1QgQ0hBTkdFXG4gICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICBib2R5OiB7XG4gICAgICBuYW1lLFxuICAgICAgZW1haWwsXG4gICAgICBwaG9uZSxcbiAgICAgIHBhc3N3b3JkLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIHBob25lLFxuICAgIGVtYWlsLFxuICAgIHBhc3N3b3JkLFxuICAgIHN1Y2Nlc3MsXG4gICAgbG9hZGluZyxcbiAgICBlcnJvcixcbiAgICBtc2csXG4gICAgdXNlck9mU2l0ZSxcbiAgfSA9IHZhbHVlcztcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAobmFtZSkgPT4gKGUpID0+IHtcbiAgICBzZXRWYWx1ZXMoeyAuLi52YWx1ZXMsIG1zZzogXCJcIiwgZXJyb3I6IGZhbHNlLCBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsaWNrU3VibWl0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8ga2VlcCBicm93c2VyIGZyb20gcmVsb2FkaW5nIHdoZW4gYnRuIGNsaWNrXG5cbiAgICBkb1JlcXVlc3QoKTtcbiAgfTtcblxuICBjb25zdCByZWRpcmVjdEFmdGVyTG9naW4gPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyZWRpcmVjdGluZy4uXCIpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZvcm0gc3VjY2Vzcz17c3VjY2Vzc30gbG9hZGluZz17bG9hZGluZ30+XG4gICAgICB7c3VjY2VzcyA/IChcbiAgICAgICAgcmVkaXJlY3RBZnRlckxvZ2luKClcbiAgICAgICkgOiAoXG4gICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICA8Rm9ybS5JbnB1dFxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcIm5hbWVcIil9XG4gICAgICAgICAgICBlcnJvcj17c2hvd0Vycm9yKFwibmFtZVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgZmx1aWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZVwiXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Rm9ybS5JbnB1dFxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcInBob25lXCIpfVxuICAgICAgICAgICAgZXJyb3I9e3Nob3dFcnJvcihcInBob25lXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Bob25lfVxuICAgICAgICAgICAgZmx1aWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGhvbmVcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZvcm0uSW5wdXRcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoXCJlbWFpbFwiKX1cbiAgICAgICAgICAgIGVycm9yPXtzaG93RXJyb3IoXCJlbWFpbFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICAgIGZsdWlkXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVtYWlsXCJcbiAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Rm9ybS5JbnB1dFxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcInBhc3N3b3JkXCIpfVxuICAgICAgICAgICAgZXJyb3I9e3Nob3dFcnJvcihcInBhc3N3b3JkXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxuICAgICAgICAgICAgZmx1aWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgdHlwZT1cIlBhc3N3b3JkXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxGb3JtLkJ1dHRvbiBmbHVpZCBvbkNsaWNrPXtjbGlja1N1Ym1pdH0+XG4gICAgICAgICAgICBTaWduIFVwXG4gICAgICAgICAgPC9Gb3JtLkJ1dHRvbj5cbiAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICl9XG4gICAgPC9Gb3JtPlxuICApO1xufTtcblxuZXhwb3J0IHsgU2lnbnVwIH07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/auth/signup.js\n");

/***/ })

})