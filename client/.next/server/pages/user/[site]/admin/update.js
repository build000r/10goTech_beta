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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Y41p");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "4ZY9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildClient; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const buildClient = ({
  req
}) => {
  if (true) {
    const baseURL = "https://" + req.headers.host + "/"; // const baseURL =
    //   "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local";

    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
      baseURL,
      headers: req.headers
    });
  } else {}
};



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

/***/ "Y41p":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");
var router_default = /*#__PURE__*/__webpack_require__.n(router_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__("FfxO");

// EXTERNAL MODULE: ./api/build-client.js
var build_client = __webpack_require__("4ZY9");

// EXTERNAL MODULE: ./hooks/use-request.js
var use_request = __webpack_require__("qYya");

// EXTERNAL MODULE: ./components/layouts/index.js
var layouts = __webpack_require__("HPDO");

// CONCATENATED MODULE: ./components/admin-site/email-config.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const EmailConfig = ({
  config
}) => {
  const {
    0: values,
    1: setValues
  } = Object(external_react_["useState"])({
    loading: false,
    submitted: false,
    title: config.title,
    mailjetFromEmail: config.mailjetFromEmail,
    mailjetFromName: config.mailjetFromName
  });
  const {
    doRequest,
    errors,
    errMsgArr
  } = Object(use_request["a" /* useRequest */])({
    url: `/api/notification/config`,
    // MUST CHANGE
    method: "put",
    body: {
      title: values.title,
      mailjetFromEmail: values.mailjetFromEmail,
      mailjetFromName: values.mailjetFromName
    }
  });

  const handleChange = name => e => {
    setValues(_objectSpread(_objectSpread({}, values), {}, {
      [name]: e.target.value
    }));
  };

  const clickSubmit = async event => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues(_objectSpread(_objectSpread({}, values), {}, {
      loading: true
    }));
    await doRequest();
    setValues(_objectSpread(_objectSpread({}, values), {}, {
      loading: false,
      submitted: true
    }));
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"], {
    onSubmit: clickSubmit,
    loading: values.loading,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), errors, /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Divider"], {
      horizontal: true,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Header"], {
        as: "h4",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Icon"], {
          name: "mail"
        }), "Email Automation Config"]
      })
    }), " ", /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
        children: "Email"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
        value: values.mailjetFromEmail,
        placeholder: values.mailjetFromEmail || "Enter new sendgrid email blurb...",
        onChange: handleChange("mailjetFromEmail")
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
        children: "Name"
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
        value: values.mailjetFromName,
        placeholder: values.mailjetFromName || "Enter new sendgrid email blurb...",
        onChange: handleChange("mailjetFromName")
      })]
    }), values.submitted ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Message"], {
      header: "Check your email",
      content: "Follow the steps sent from `MailJet` to activate your new email"
    }) : "", /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Button, {
      floated: "right",
      children: "Update Email Configuration"
    })]
  });
};

/* harmony default export */ var email_config = (EmailConfig);
// CONCATENATED MODULE: ./pages/user/[site]/admin/update.js



function update_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function update_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { update_ownKeys(Object(source), true).forEach(function (key) { update_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { update_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function update_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const update = ({
  site,
  config
}) => {
  const {
    0: values,
    1: setValues
  } = Object(external_react_["useState"])({
    title: site.title,
    homeTitle: site.homeTitle,
    tagline: site.tagline,
    aboutUsTitle: site.aboutUsTitle,
    aboutUsBlurb: site.aboutUsBlurb,
    loading: false,
    privacyPolicy: site.privacyPolicy,
    termsOfService: site.termsOfService,
    servicesPageHeadline: site.servicesPageHeadline,
    servicesPageSubheadline: site.servicesPageSubheadline
  });
  const {
    doRequest,
    errors,
    errMsgArr
  } = Object(use_request["a" /* useRequest */])({
    url: `/api/site/${Object(router_["useRouter"])().query.site}`,
    // MUST CHANGE
    method: "put",
    body: {
      title: values.title,
      homeTitle: values.homeTitle,
      tagline: values.tagline,
      aboutUsBlurb: values.aboutUsBlurb,
      aboutUsTitle: values.aboutUsTitle,
      privacyPolicy: values.privacyPolicy,
      termsOfService: values.termsOfService,
      servicesPageHeadline: values.servicesPageHeadline,
      servicesPageSubheadline: values.servicesPageSubheadline
    },
    onSuccess: () => router_default.a.push(`/user/${values.title}`)
  });

  const handleChange = name => e => {
    setValues(update_objectSpread(update_objectSpread({}, values), {}, {
      [name]: e.target.value
    }));
  };

  const clickSubmit = async event => {
    event.preventDefault(); // keep browser from reloading when btn click

    setValues(update_objectSpread(update_objectSpread({}, values), {}, {
      loading: true
    }));
    await doRequest();
    setValues(update_objectSpread(update_objectSpread({}, values), {}, {
      loading: false
    }));
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(layouts["a" /* default */], {
    smallLeaderboard: true,
    leaderboardData: {
      header: "Website Details",
      subHeader: "Update the content and configuration of your website",
      dividerText: "Configure"
    },
    heightOverride: "1500px",
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"], {
      onSubmit: clickSubmit,
      loading: values.loading,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), errors, /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        error: errMsgArr && errMsgArr.includes("This title has been reserved by another user."),
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Site Title "
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          style: {
            maxWidth: "300px"
          },
          label: ".10gotech.com",
          labelPosition: "right",
          value: values.title,
          placeholder: values.title || "Your title",
          onChange: handleChange("title")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Header"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          value: values.homeTitle,
          placeholder: values.homeTitle || "Your headline",
          onChange: handleChange("homeTitle")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Sub header"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          value: values.tagline,
          placeholder: values.tagline || "Your tagline",
          onChange: handleChange("tagline")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Section Header"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          value: values.aboutUsTitle,
          placeholder: values.aboutUsTitle || "Your About Us Header",
          onChange: handleChange("aboutUsTitle")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Section Paragraph"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["TextArea"], {
          value: values.aboutUsBlurb,
          placeholder: values.aboutUsBlurb || "Your About Us Paragraph",
          onChange: handleChange("aboutUsBlurb")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Divider"], {
        horizontal: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Header"], {
          as: "h4",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Icon"], {
            name: "money"
          }), "Services"]
        })
      }), " ", /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Enter new services page headline"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          value: values.servicesPageHeadline,
          placeholder: values.servicesPageHeadline || "Enter new services page headline...",
          onChange: handleChange("servicesPageHeadline")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Enter new services page subheadline"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Input"], {
          value: values.servicesPageSubheadline,
          placeholder: values.servicesPageSubheadline || "Enter new services page subheadline...",
          onChange: handleChange("servicesPageSubheadline")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Divider"], {
        horizontal: true,
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Header"], {
          as: "h4",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Icon"], {
            name: "law"
          }), "Legal"]
        })
      }), " ", /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Custom privacy policy for your website"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["TextArea"], {
          value: values.privacyPolicy,
          placeholder: values.privacyPolicy || "Enter new privacy policy...",
          onChange: handleChange("privacyPolicy")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])(external_semantic_ui_react_["Form"].Field, {
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("label", {
          children: "Custom terms of service for your website"
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["TextArea"], {
          value: values.termsOfService,
          placeholder: values.termsOfService || "Enter new terms of service...",
          onChange: handleChange("termsOfService")
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_semantic_ui_react_["Form"].Button, {
        floated: "right",
        children: "Update"
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(email_config, {
      config: config
    })]
  });
};

update.getInitialProps = async context => {
  const {
    data: site
  } = await Object(build_client["a" /* buildClient */])(context).get(`/api/site/${context.query.site}`);
  const {
    data: config
  } = await Object(build_client["a" /* buildClient */])(context).get(`/api/notification/config/${context.query.site}`);
  return {
    site,
    config
  };
};

/* harmony default export */ var admin_update = __webpack_exports__["default"] = (update);

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