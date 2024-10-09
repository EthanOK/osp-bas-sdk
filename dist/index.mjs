var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __asyncGenerator = (__this, __arguments, generator) => {
  var resume = (k, v, yes, no) => {
    try {
      var x = generator[k](v), isAwait = (v = x.value) instanceof __await, done = x.done;
      Promise.resolve(isAwait ? v[0] : v).then((y) => isAwait ? resume(k === "return" ? k : "next", v[1] ? { done: y.done, value: y.value } : y, yes, no) : yes({ value: y, done })).catch((e) => resume("throw", e, yes, no));
    } catch (e) {
      no(e);
    }
  }, method = (k) => it[k] = (x) => new Promise((yes, no) => resume(k, x, yes, no)), it = {};
  return generator = generator.apply(__this, __arguments), it[__knownSymbol("asyncIterator")] = () => it, method("next"), method("throw"), method("return"), it;
};
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({ value, done }), no)))), method("next"), method("return"), it);

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os2 = __require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os2.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/httpx/lib/index.js
var require_lib = __commonJS({
  "node_modules/httpx/lib/index.js"(exports) {
    "use strict";
    var zlib = __require("zlib");
    var http = __require("http");
    var https = __require("https");
    var parse = __require("url").parse;
    var format = __require("url").format;
    var debugBody = require_src()("httpx:body");
    var debugHeader = require_src()("httpx:header");
    var httpAgent = new http.Agent({ keepAlive: true });
    var httpsAgent = new https.Agent({ keepAlive: true });
    var TIMEOUT = 3e3;
    var READ_TIMER = Symbol("TIMER::READ_TIMER");
    var READ_TIME_OUT = Symbol("TIMER::READ_TIME_OUT");
    var READ_TIMER_START_AT = Symbol("TIMER::READ_TIMER_START_AT");
    function decompress(response) {
      switch (response.headers["content-encoding"]) {
        // or, just use zlib.createUnzip() to handle both cases
        case "gzip":
          return response.pipe(zlib.createGunzip());
        case "deflate":
          return response.pipe(zlib.createInflate());
        default:
          return response;
      }
    }
    var append = function(err, name, message) {
      err.name = name + err.name;
      err.message = `${message}. ${err.message}`;
      return err;
    };
    var isNumber = function(num) {
      return num !== null && !isNaN(num);
    };
    exports.request = function(url, opts) {
      opts || (opts = {});
      const parsed = typeof url === "string" ? parse(url) : url;
      let readTimeout, connectTimeout;
      if (isNumber(opts.readTimeout) || isNumber(opts.connectTimeout)) {
        readTimeout = isNumber(opts.readTimeout) ? Number(opts.readTimeout) : TIMEOUT;
        connectTimeout = isNumber(opts.connectTimeout) ? Number(opts.connectTimeout) : TIMEOUT;
      } else if (isNumber(opts.timeout)) {
        readTimeout = connectTimeout = Number(opts.timeout);
      } else {
        readTimeout = connectTimeout = TIMEOUT;
      }
      const isHttps = parsed.protocol === "https:";
      const method = (opts.method || "GET").toUpperCase();
      const defaultAgent = isHttps ? httpsAgent : httpAgent;
      const agent = opts.agent || defaultAgent;
      var options = {
        host: parsed.hostname || "localhost",
        path: parsed.path || "/",
        method,
        port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
        agent,
        headers: opts.headers || {},
        // ssl config
        key: opts.key || "",
        cert: opts.cert || "",
        ca: opts.ca || "",
        // connect timerout
        timeout: connectTimeout
      };
      if (isHttps && typeof opts.rejectUnauthorized !== "undefined") {
        options.rejectUnauthorized = opts.rejectUnauthorized;
      }
      if (opts.compression) {
        options.headers["accept-encoding"] = "gzip,deflate";
      }
      const httplib = isHttps ? https : http;
      if (typeof opts.beforeRequest === "function") {
        options = opts.beforeRequest(options);
      }
      return new Promise((resolve, reject) => {
        const request = httplib.request(options);
        const body = opts.data;
        var fulfilled = (response) => {
          if (debugHeader.enabled) {
            const requestHeaders = response.req._header;
            requestHeaders.split("\r\n").forEach((line) => {
              debugHeader("> %s", line);
            });
            debugHeader("< HTTP/%s %s %s", response.httpVersion, response.statusCode, response.statusMessage);
            Object.keys(response.headers).forEach((key) => {
              debugHeader("< %s: %s", key, response.headers[key]);
            });
          }
          resolve(response);
        };
        var rejected = (err) => {
          err.message += `${method} ${format(parsed)} failed.`;
          if (request.socket && request.socket[READ_TIMER]) {
            clearTimeout(request.socket[READ_TIMER]);
          }
          reject(err);
        };
        var abort = (err) => {
          request.abort();
          rejected(err);
        };
        const startResponseTimer = function(socket) {
          const timer = setTimeout(() => {
            if (socket[READ_TIMER]) {
              clearTimeout(socket[READ_TIMER]);
              socket[READ_TIMER] = null;
            }
            var err = new Error();
            var message = `ReadTimeout(${readTimeout})`;
            abort(append(err, "RequestTimeout", message));
          }, readTimeout);
          socket[READ_TIME_OUT] = readTimeout;
          socket[READ_TIMER] = timer;
          socket[READ_TIMER_START_AT] = Date.now();
          timer.unref();
        };
        if (!body || "string" === typeof body || body instanceof Buffer) {
          if (debugBody.enabled) {
            if (!body) {
              debugBody("<no request body>");
            } else if ("string" === typeof body) {
              debugBody(body);
            } else {
              debugBody(`Buffer <ignored>, Buffer length: ${body.length}`);
            }
          }
          request.end(body);
        } else if ("function" === typeof body.pipe) {
          body.pipe(request);
          if (debugBody.enabled) {
            debugBody("<request body is a stream>");
          }
          body.once("error", (err) => {
            abort(append(err, "HttpX", "Stream occor error"));
          });
        }
        request.on("response", fulfilled);
        request.on("error", rejected);
        request.once("socket", function(socket) {
          if (socket.readyState === "opening") {
            socket.once("connect", function() {
              startResponseTimer(socket);
            });
          } else {
            startResponseTimer(socket);
          }
        });
      });
    };
    exports.read = function(response, encoding) {
      const readable = decompress(response);
      return new Promise((resolve, reject) => {
        const socket = response.socket || response.client;
        const makeReadTimeoutError = () => {
          const req = response.req;
          var err = new Error();
          err.name = "RequestTimeoutError";
          err.message = `ReadTimeout: ${socket[READ_TIME_OUT]}. ${req.method} ${req.path} failed.`;
          return err;
        };
        let readTimer;
        const oldReadTimer = socket[READ_TIMER];
        if (!oldReadTimer) {
          reject(makeReadTimeoutError());
          return;
        }
        const remainTime = socket[READ_TIME_OUT] - (Date.now() - socket[READ_TIMER_START_AT]);
        clearTimeout(oldReadTimer);
        if (remainTime <= 0) {
          reject(makeReadTimeoutError());
          return;
        }
        readTimer = setTimeout(function() {
          reject(makeReadTimeoutError());
        }, remainTime);
        var onError, onData, onEnd;
        var cleanup = function() {
          readable.removeListener("error", onError);
          readable.removeListener("data", onData);
          readable.removeListener("end", onEnd);
          if (readTimer) {
            clearTimeout(readTimer);
          }
        };
        const bufs = [];
        var size = 0;
        onData = function(buf) {
          bufs.push(buf);
          size += buf.length;
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        onEnd = function() {
          cleanup();
          var buff = Buffer.concat(bufs, size);
          debugBody("");
          if (encoding) {
            const result = buff.toString(encoding);
            debugBody(result);
            return resolve(result);
          }
          if (debugBody.enabled) {
            debugBody(buff.toString());
          }
          resolve(buff);
        };
        readable.on("error", onError);
        readable.on("data", onData);
        readable.on("end", onEnd);
      });
    };
    function readyToRead(readable) {
      return new Promise((resolve, reject) => {
        var onReadable, onEnd, onError;
        var cleanup = function() {
          readable.removeListener("error", onError);
          readable.removeListener("end", onEnd);
          readable.removeListener("readable", onReadable);
        };
        onReadable = function() {
          cleanup();
          resolve(false);
        };
        onEnd = function() {
          cleanup();
          resolve(true);
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        readable.once("readable", onReadable);
        readable.once("end", onEnd);
        readable.once("error", onError);
      });
    }
    var Event = class {
      constructor(id, event, data, retry) {
        this.id = id;
        this.event = event;
        this.data = data;
        this.retry = retry;
      }
    };
    exports.Event = Event;
    var DATA_PREFIX = "data:";
    var EVENT_PREFIX = "event:";
    var ID_PREFIX = "id:";
    var RETRY_PREFIX = "retry:";
    function isDigitsOnly(str) {
      for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (c < "0" || c > "9") {
          return false;
        }
      }
      return str.length > 0;
    }
    function tryGetEvents(head, chunk) {
      const all = head + chunk;
      let start = 0;
      const events = [];
      for (let i = 0; i < all.length - 1; i++) {
        const c = all[i];
        const c2 = all[i + 1];
        if (c === "\n" && c2 === "\n") {
          const part = all.substring(start, i);
          const lines = part.split("\n");
          const event = new Event();
          lines.forEach((line) => {
            if (line.startsWith(DATA_PREFIX)) {
              event.data = line.substring(DATA_PREFIX.length).trim();
            } else if (line.startsWith(EVENT_PREFIX)) {
              event.event = line.substring(EVENT_PREFIX.length).trim();
            } else if (line.startsWith(ID_PREFIX)) {
              event.id = line.substring(ID_PREFIX.length).trim();
            } else if (line.startsWith(RETRY_PREFIX)) {
              const retry = line.substring(RETRY_PREFIX.length).trim();
              if (isDigitsOnly(retry)) {
                event.retry = parseInt(retry, 10);
              }
            } else if (line.startsWith(":")) {
            }
          });
          events.push(event);
          start = i + 2;
        }
      }
      const rest = all.substring(start);
      return [events, rest];
    }
    exports.readAsSSE = function(response) {
      return __asyncGenerator(this, null, function* () {
        const readable = decompress(response);
        const socket = response.socket || response.client;
        clearTimeout(socket[READ_TIMER]);
        let rest = "";
        while (true) {
          const ended = yield new __await(readyToRead(readable));
          if (ended) {
            return;
          }
          let chunk;
          while (null !== (chunk = readable.read())) {
            const [events, remain] = tryGetEvents(rest, chunk.toString());
            rest = remain;
            if (events && events.length > 0) {
              for (const event of events) {
                yield event;
              }
            }
          }
        }
      });
    };
  }
});

// node_modules/@alicloud/tea-typescript/dist/tea.js
var require_tea = __commonJS({
  "node_modules/@alicloud/tea-typescript/dist/tea.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isRetryable = exports.retryError = exports.newUnretryableError = exports.getBackoffTime = exports.allowRetry = exports.sleep = exports.cast = exports.Model = exports.toMap = exports.newError = exports.doAction = exports.Response = exports.Request = exports.BytesReadable = void 0;
    var querystring = __importStar(__require("querystring"));
    var http_1 = __require("http");
    var https_1 = __require("https");
    var stream_1 = __require("stream");
    var httpx = __importStar(require_lib());
    var url_1 = __require("url");
    var BytesReadable = (
      /** @class */
      function(_super) {
        __extends(BytesReadable2, _super);
        function BytesReadable2(value) {
          var _this = _super.call(this) || this;
          if (typeof value === "string") {
            _this.value = Buffer.from(value);
          } else if (Buffer.isBuffer(value)) {
            _this.value = value;
          }
          return _this;
        }
        BytesReadable2.prototype._read = function() {
          this.push(this.value);
          this.push(null);
        };
        return BytesReadable2;
      }(stream_1.Readable)
    );
    exports.BytesReadable = BytesReadable;
    var Request = (
      /** @class */
      /* @__PURE__ */ function() {
        function Request2() {
          this.headers = {};
          this.query = {};
        }
        return Request2;
      }()
    );
    exports.Request = Request;
    var Response = (
      /** @class */
      function() {
        function Response2(httpResponse) {
          this.statusCode = httpResponse.statusCode;
          this.statusMessage = httpResponse.statusMessage;
          this.headers = this.convertHeaders(httpResponse.headers);
          this.body = httpResponse;
        }
        Response2.prototype.convertHeaders = function(headers) {
          var results = {};
          var keys = Object.keys(headers);
          for (var index = 0; index < keys.length; index++) {
            var key = keys[index];
            results[key] = headers[key];
          }
          return results;
        };
        Response2.prototype.readBytes = function() {
          return __awaiter(this, void 0, void 0, function() {
            var buff;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  return [4, httpx.read(this.body, "")];
                case 1:
                  buff = _a.sent();
                  return [2, buff];
              }
            });
          });
        };
        return Response2;
      }()
    );
    exports.Response = Response;
    function buildURL(request) {
      var url = request.protocol + "://" + request.headers["host"];
      if (request.port) {
        url += ":" + request.port;
      }
      url += "" + request.pathname;
      var urlInfo = url_1.parse(url);
      if (request.query && Object.keys(request.query).length > 0) {
        if (urlInfo.query) {
          url += "&" + querystring.stringify(request.query);
        } else {
          url += "?" + querystring.stringify(request.query);
        }
      }
      return url;
    }
    function isModelClass(t) {
      if (!t) {
        return false;
      }
      return typeof t.types === "function" && typeof t.names === "function";
    }
    function doAction(request, runtime) {
      if (runtime === void 0) {
        runtime = null;
      }
      return __awaiter(this, void 0, void 0, function() {
        var url, method, options, agentOptions, response;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              url = buildURL(request);
              method = (request.method || "GET").toUpperCase();
              options = {
                method,
                headers: request.headers
              };
              if (method !== "GET" && method !== "HEAD") {
                options.data = request.body;
              }
              if (runtime) {
                if (typeof runtime.timeout !== "undefined") {
                  options.timeout = Number(runtime.timeout);
                }
                if (typeof runtime.readTimeout !== "undefined") {
                  options.readTimeout = Number(runtime.readTimeout);
                }
                if (typeof runtime.connectTimeout !== "undefined") {
                  options.connectTimeout = Number(runtime.connectTimeout);
                }
                if (typeof runtime.ignoreSSL !== "undefined") {
                  options.rejectUnauthorized = !runtime.ignoreSSL;
                }
                if (typeof runtime.key !== "undefined") {
                  options.key = String(runtime.key);
                }
                if (typeof runtime.cert !== "undefined") {
                  options.cert = String(runtime.cert);
                }
                if (typeof runtime.ca !== "undefined") {
                  options.ca = String(runtime.ca);
                }
                agentOptions = {
                  keepAlive: true
                };
                if (typeof runtime.keepAlive !== "undefined") {
                  agentOptions.keepAlive = runtime.keepAlive;
                  if (request.protocol && request.protocol.toLowerCase() === "https") {
                    options.agent = new https_1.Agent(agentOptions);
                  } else {
                    options.agent = new http_1.Agent(agentOptions);
                  }
                }
              }
              return [4, httpx.request(url, options)];
            case 1:
              response = _a.sent();
              return [2, new Response(response)];
          }
        });
      });
    }
    exports.doAction = doAction;
    var ResponseError = (
      /** @class */
      function(_super) {
        __extends(ResponseError2, _super);
        function ResponseError2(map) {
          var _this = _super.call(this, map.code + ": " + map.message) || this;
          _this.code = map.code;
          _this.data = map.data;
          _this.description = map.description;
          _this.accessDeniedDetail = map.accessDeniedDetail;
          if (_this.data && _this.data.statusCode) {
            _this.statusCode = Number(_this.data.statusCode);
          }
          return _this;
        }
        return ResponseError2;
      }(Error)
    );
    function newError(data) {
      return new ResponseError(data);
    }
    exports.newError = newError;
    function getValue(type, value) {
      if (typeof type === "string") {
        return value;
      }
      if (type.type === "array") {
        if (!Array.isArray(value)) {
          throw new Error("expect: array, actual: " + typeof value);
        }
        return value.map(function(item) {
          return getValue(type.itemType, item);
        });
      }
      if (typeof type === "function") {
        if (isModelClass(type)) {
          return new type(value);
        }
        return value;
      }
      return value;
    }
    function toMap(value) {
      if (value === void 0) {
        value = void 0;
      }
      if (typeof value === "undefined" || value == null) {
        return null;
      }
      if (value instanceof Model) {
        return value.toMap();
      }
      if (typeof value.toMap === "function") {
        return value.toMap();
      }
      if (Array.isArray(value)) {
        return value.map(function(item) {
          return toMap(item);
        });
      }
      return value;
    }
    exports.toMap = toMap;
    var Model = (
      /** @class */
      function() {
        function Model2(map) {
          var _this = this;
          if (map == null) {
            return;
          }
          var clz = this.constructor;
          var names = clz.names();
          var types = clz.types();
          Object.keys(names).forEach(function(name) {
            var value = map[name];
            if (value === void 0 || value === null) {
              return;
            }
            var type = types[name];
            _this[name] = getValue(type, value);
          });
        }
        Model2.prototype.toMap = function() {
          var _this = this;
          var map = {};
          var clz = this.constructor;
          var names = clz.names();
          Object.keys(names).forEach(function(name) {
            var originName = names[name];
            var value = _this[name];
            if (typeof value === "undefined" || value == null) {
              return;
            }
            map[originName] = toMap(value);
          });
          return map;
        };
        return Model2;
      }()
    );
    exports.Model = Model;
    function cast(obj, t) {
      if (!obj) {
        throw new Error("can not cast to Map");
      }
      if (typeof obj !== "object") {
        throw new Error("can not cast to Map");
      }
      var map = obj;
      var clz = t.constructor;
      var names = clz.names();
      var types = clz.types();
      Object.keys(names).forEach(function(key) {
        var originName = names[key];
        var value = map[originName];
        var type = types[key];
        if (typeof value === "undefined" || value == null) {
          return;
        }
        if (typeof type === "string") {
          if (type === "Readable" || type === "map" || type === "Buffer" || type === "any" || typeof value === type) {
            t[key] = value;
            return;
          }
          if (type === "string" && (typeof value === "number" || typeof value === "boolean")) {
            t[key] = value.toString();
            return;
          }
          if (type === "boolean") {
            if (value === 1 || value === 0) {
              t[key] = !!value;
              return;
            }
            if (value === "true" || value === "false") {
              t[key] = value === "true";
              return;
            }
          }
          if (type === "number" && typeof value === "string") {
            if (value.match(/^\d*$/)) {
              t[key] = parseInt(value);
              return;
            }
            if (value.match(/^[\.\d]*$/)) {
              t[key] = parseFloat(value);
              return;
            }
          }
          throw new Error("type of " + key + " is mismatch, expect " + type + ", but " + typeof value);
        } else if (type.type === "map") {
          if (!(value instanceof Object)) {
            throw new Error("type of " + key + " is mismatch, expect object, but " + typeof value);
          }
          t[key] = value;
        } else if (type.type === "array") {
          if (!Array.isArray(value)) {
            throw new Error("type of " + key + " is mismatch, expect array, but " + typeof value);
          }
          if (typeof type.itemType === "function") {
            t[key] = value.map(function(d) {
              if (isModelClass(type.itemType)) {
                return cast(d, new type.itemType({}));
              }
              return d;
            });
          } else {
            t[key] = value;
          }
        } else if (typeof type === "function") {
          if (!(value instanceof Object)) {
            throw new Error("type of " + key + " is mismatch, expect object, but " + typeof value);
          }
          if (isModelClass(type)) {
            t[key] = cast(value, new type({}));
            return;
          }
          t[key] = value;
        } else {
        }
      });
      return t;
    }
    exports.cast = cast;
    function sleep(ms) {
      return new Promise(function(resolve) {
        setTimeout(resolve, ms);
      });
    }
    exports.sleep = sleep;
    function allowRetry(retry, retryTimes, startTime) {
      if (retryTimes === 0) {
        return true;
      }
      if (retry.retryable !== true) {
        return false;
      }
      if (retry.policy === "never") {
        return false;
      }
      if (retry.policy === "always") {
        return true;
      }
      if (retry.policy === "simple") {
        return retryTimes < retry["maxAttempts"];
      }
      if (retry.policy === "timeout") {
        return Date.now() - startTime < retry.timeout;
      }
      if (retry.maxAttempts && typeof retry.maxAttempts === "number") {
        return retry.maxAttempts >= retryTimes;
      }
      return false;
    }
    exports.allowRetry = allowRetry;
    function getBackoffTime(backoff, retryTimes) {
      if (retryTimes === 0) {
        return 0;
      }
      if (backoff.policy === "no") {
        return 0;
      }
      if (backoff.policy === "fixed") {
        return backoff.period;
      }
      if (backoff.policy === "random") {
        var min = backoff["minPeriod"];
        var max = backoff["maxPeriod"];
        return min + (max - min) * Math.random();
      }
      if (backoff.policy === "exponential") {
        var init = backoff.initial;
        var multiplier = backoff.multiplier;
        var time = init * Math.pow(1 + multiplier, retryTimes - 1);
        var max = backoff.max;
        return Math.min(time, max);
      }
      if (backoff.policy === "exponential_random") {
        var init = backoff.initial;
        var multiplier = backoff.multiplier;
        var time = init * Math.pow(1 + multiplier, retryTimes - 1);
        var max = backoff.max;
        return Math.min(time * (0.5 + Math.random()), max);
      }
      return 0;
    }
    exports.getBackoffTime = getBackoffTime;
    var UnretryableError = (
      /** @class */
      function(_super) {
        __extends(UnretryableError2, _super);
        function UnretryableError2(message) {
          var _this = _super.call(this, message) || this;
          _this.name = "UnretryableError";
          return _this;
        }
        return UnretryableError2;
      }(Error)
    );
    function newUnretryableError(request) {
      var e = new UnretryableError("");
      e.data = {
        lastRequest: request
      };
      return e;
    }
    exports.newUnretryableError = newUnretryableError;
    var RetryError = (
      /** @class */
      function(_super) {
        __extends(RetryError2, _super);
        function RetryError2(message) {
          var _this = _super.call(this, message) || this;
          _this.name = "RetryError";
          return _this;
        }
        return RetryError2;
      }(Error)
    );
    function retryError(request, response) {
      var e = new RetryError("");
      e.data = {
        request,
        response
      };
      return e;
    }
    exports.retryError = retryError;
    function isRetryable(err) {
      if (typeof err === "undefined" || err === null) {
        return false;
      }
      return err.name === "RetryError";
    }
    exports.isRetryable = isRetryable;
  }
});

// node_modules/@alicloud/tea-util/node_modules/kitx/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@alicloud/tea-util/node_modules/kitx/lib/index.js"(exports) {
    "use strict";
    var fs2 = __require("fs");
    var os2 = __require("os");
    var crypto2 = __require("crypto");
    exports.loadJSONSync = function(filename) {
      var content = fs2.readFileSync(filename, "utf8");
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      try {
        return JSON.parse(content);
      } catch (err) {
        err.message = filename + ": " + err.message;
        throw err;
      }
    };
    exports.encode = function(str, encoding) {
      if (typeof str !== "string") {
        str = "" + str;
      }
      return Buffer.from(str, encoding);
    };
    exports.makeHasher = function(algorithm) {
      return function(data, encoding) {
        var shasum = crypto2.createHash(algorithm);
        shasum.update(data);
        return shasum.digest(encoding);
      };
    };
    exports.createHash = exports.makeHasher;
    exports.md5 = exports.makeHasher("md5");
    exports.createHmac = function(algorithm) {
      return function(data, key, encoding) {
        return crypto2.createHmac(algorithm, key).update(data).digest(encoding);
      };
    };
    exports.sha1 = exports.createHmac("sha1");
    exports.random = function(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    };
    exports.makeNonce = function() {
      var counter = 0;
      var last;
      const machine = os2.hostname();
      const pid = process.pid;
      return function() {
        var val = Math.floor(Math.random() * 1e12);
        if (val === last) {
          counter++;
        } else {
          counter = 0;
        }
        last = val;
        var uid = `${machine}${pid}${val}${counter}`;
        return exports.md5(uid, "hex");
      };
    }();
    exports.pad2 = function(num) {
      if (num < 10) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.pad3 = function(num) {
      if (num < 10) {
        return "00" + num;
      } else if (num < 100) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.getYYYYMMDD = function(date) {
      var YYYY = date.getFullYear();
      var MM = exports.pad2(date.getMonth() + 1);
      var DD = exports.pad2(date.getDate());
      return "" + YYYY + MM + DD;
    };
    exports.sleep = function(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    exports.getIPv4 = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.address;
          }
        }
      }
      return "";
    };
    exports.getMac = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.mac;
          }
        }
      }
      return "00:00:00:00:00:00";
    };
    exports.readAll = function(readable) {
      return new Promise((resolve, reject) => {
        var onError, onData, onEnd;
        var cleanup = function(err) {
          readable.removeListener("error", onError);
          readable.removeListener("data", onData);
          readable.removeListener("end", onEnd);
        };
        var bufs = [];
        var size = 0;
        onData = function(buf) {
          bufs.push(buf);
          size += buf.length;
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        onEnd = function() {
          cleanup();
          resolve(Buffer.concat(bufs, size));
        };
        readable.on("error", onError);
        readable.on("data", onData);
        readable.on("end", onEnd);
      });
    };
  }
});

// node_modules/@alicloud/tea-util/dist/client.js
var require_client = __commonJS({
  "node_modules/@alicloud/tea-util/dist/client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RuntimeOptions = exports.ExtendsParameters = void 0;
    var stream_1 = __require("stream");
    var $tea = __importStar(require_tea());
    var kitx = __importStar(require_lib2());
    var querystring_1 = __importDefault(__require("querystring"));
    var os_1 = __require("os");
    var DEFAULT_USER_AGENT = `AlibabaCloud (${os_1.platform()}; ${os_1.arch()}) Node.js/${process.version} Core/1.0.1 TeaDSL/1`;
    var ExtendsParameters = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          headers: "headers",
          queries: "queries"
        };
      }
      static types() {
        return {
          headers: { "type": "map", "keyType": "string", "valueType": "string" },
          queries: { "type": "map", "keyType": "string", "valueType": "string" }
        };
      }
    };
    exports.ExtendsParameters = ExtendsParameters;
    var RuntimeOptions = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          autoretry: "autoretry",
          ignoreSSL: "ignoreSSL",
          key: "key",
          cert: "cert",
          ca: "ca",
          maxAttempts: "max_attempts",
          backoffPolicy: "backoff_policy",
          backoffPeriod: "backoff_period",
          readTimeout: "readTimeout",
          connectTimeout: "connectTimeout",
          httpProxy: "httpProxy",
          httpsProxy: "httpsProxy",
          noProxy: "noProxy",
          maxIdleConns: "maxIdleConns",
          keepAlive: "keepAlive",
          extendsParameters: "extendsParameters"
        };
      }
      static types() {
        return {
          autoretry: "boolean",
          ignoreSSL: "boolean",
          key: "string",
          cert: "string",
          ca: "string",
          maxAttempts: "number",
          backoffPolicy: "string",
          backoffPeriod: "number",
          readTimeout: "number",
          connectTimeout: "number",
          httpProxy: "string",
          httpsProxy: "string",
          noProxy: "string",
          maxIdleConns: "number",
          keepAlive: "boolean",
          extendsParameters: ExtendsParameters
        };
      }
    };
    exports.RuntimeOptions = RuntimeOptions;
    function read(readable) {
      return new Promise((resolve, reject) => {
        let onData, onError, onEnd;
        var cleanup = function() {
          readable.removeListener("error", onError);
          readable.removeListener("data", onData);
          readable.removeListener("end", onEnd);
        };
        var bufs = [];
        var size = 0;
        onData = function(buf) {
          bufs.push(buf);
          size += buf.length;
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        onEnd = function() {
          cleanup();
          resolve(Buffer.concat(bufs, size));
        };
        readable.on("error", onError);
        readable.on("data", onData);
        readable.on("end", onEnd);
      });
    }
    var Client2 = class _Client {
      static toString(buff) {
        return buff.toString();
      }
      static parseJSON(text) {
        return JSON.parse(text);
      }
      static readAsBytes(stream) {
        return __async(this, null, function* () {
          return yield read(stream);
        });
      }
      static readAsString(stream) {
        return __async(this, null, function* () {
          let buff = yield _Client.readAsBytes(stream);
          return _Client.toString(buff);
        });
      }
      static readAsJSON(stream) {
        return __async(this, null, function* () {
          return _Client.parseJSON(yield _Client.readAsString(stream));
        });
      }
      static getNonce() {
        return kitx.makeNonce();
      }
      static getDateUTCString() {
        const now = /* @__PURE__ */ new Date();
        return now.toUTCString();
      }
      static defaultString(real, defaultValue) {
        return real || defaultValue;
      }
      static defaultNumber(real, defaultValue) {
        return real || defaultValue;
      }
      static toFormString(val) {
        return querystring_1.default.stringify(val);
      }
      static toJSONString(val) {
        if (typeof val === "string") {
          return val;
        }
        return JSON.stringify(val);
      }
      static toBytes(val) {
        return Buffer.from(val);
      }
      static empty(val) {
        return !val;
      }
      static equalString(val1, val2) {
        return val1 === val2;
      }
      static equalNumber(val1, val2) {
        return val1 === val2;
      }
      static isUnset(value) {
        if (typeof value === "undefined") {
          return true;
        }
        if (value === null) {
          return true;
        }
        return false;
      }
      static stringifyMapValue(m) {
        if (!m) {
          return m;
        }
        const result = {};
        for (const [key, value] of Object.entries(m)) {
          if (typeof value === "undefined" || value === null) {
            continue;
          }
          result[key] = String(value);
        }
        return result;
      }
      static anyifyMapValue(m) {
        return m;
      }
      static assertAsBoolean(value) {
        if (typeof value === "boolean") {
          return value;
        }
        throw new Error(`The value is not a boolean`);
      }
      static assertAsString(value) {
        if (typeof value === "string") {
          return value;
        }
        throw new Error(`The value is not a string`);
      }
      static assertAsNumber(value) {
        if (typeof value === "number") {
          return value;
        }
        throw new Error(`The value is not a number`);
      }
      /**
       * Assert a value, if it is a integer, return it, otherwise throws
       * @return the integer value
       */
      static assertAsInteger(value) {
        if (Number.isInteger(value)) {
          return value;
        }
        throw new Error(`The value is not a int number`);
      }
      static assertAsMap(value) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return value;
        }
        throw new Error(`The value is not a object`);
      }
      static assertAsArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        throw new Error(`The value is not array`);
      }
      static assertAsBytes(value) {
        if (Buffer.isBuffer(value)) {
          return value;
        }
        throw new Error(`The value is not bytes`);
      }
      static getUserAgent(userAgent) {
        if (!userAgent || !userAgent.length) {
          return DEFAULT_USER_AGENT;
        }
        return DEFAULT_USER_AGENT + " " + userAgent;
      }
      static is2xx(code) {
        return code >= 200 && code < 300;
      }
      static is3xx(code) {
        return code >= 300 && code < 400;
      }
      static is4xx(code) {
        return code >= 400 && code < 500;
      }
      static is5xx(code) {
        return code >= 500 && code < 600;
      }
      static validateModel(m) {
      }
      static toMap(inputModel) {
        return $tea.toMap(inputModel);
      }
      static sleep(millisecond) {
        return __async(this, null, function* () {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, millisecond);
          });
        });
      }
      static toArray(input) {
        if (!(input instanceof Array)) {
          return null;
        }
        let ret = [];
        input.forEach((model) => {
          if (!model) {
            return;
          }
          ret.push($tea.toMap(model));
        });
        return ret;
      }
      /**
       * Assert a value, if it is a readable, return it, otherwise throws
       * @return the readable value
       */
      static assertAsReadable(value) {
        if (value instanceof stream_1.Readable) {
          return value;
        }
        throw new Error(`The value is not a readable`);
      }
    };
    exports.default = Client2;
  }
});

// node_modules/@alicloud/credentials/dist/src/credential_model.js
var require_credential_model = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/credential_model.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var $tea = __importStar(require_tea());
    var CredentialModel = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          accessKeyId: "accessKeyId",
          accessKeySecret: "accessKeySecret",
          securityToken: "securityToken",
          bearerToken: "bearerToken",
          type: "type"
        };
      }
      static types() {
        return {
          accessKeyId: "string",
          accessKeySecret: "string",
          securityToken: "string",
          bearerToken: "string",
          type: "string"
        };
      }
    };
    exports.default = CredentialModel;
  }
});

// node_modules/@alicloud/credentials/dist/src/default_credential.js
var require_default_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/default_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var credential_model_1 = __importDefault(require_credential_model());
    var DefaultCredential = class {
      constructor(config) {
        this.accessKeyId = config.accessKeyId || "";
        this.accessKeySecret = config.accessKeySecret || "";
        this.securityToken = config.securityToken || "";
        this.bearerToken = config.bearerToken || "";
        this.type = config.type || "";
      }
      getAccessKeyId() {
        return __async(this, null, function* () {
          return this.accessKeyId;
        });
      }
      getAccessKeySecret() {
        return __async(this, null, function* () {
          return this.accessKeySecret;
        });
      }
      getSecurityToken() {
        return __async(this, null, function* () {
          return this.securityToken;
        });
      }
      getBearerToken() {
        return this.bearerToken;
      }
      getType() {
        return this.type;
      }
      getCredential() {
        return __async(this, null, function* () {
          return new credential_model_1.default({
            accessKeyId: this.accessKeyId,
            accessKeySecret: this.accessKeySecret,
            securityToken: this.securityToken,
            bearerToken: this.bearerToken,
            type: this.type
          });
        });
      }
    };
    exports.default = DefaultCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/config.js
var require_config = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/config.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var $tea = __importStar(require_tea());
    var Config2 = class extends $tea.Model {
      constructor(config) {
        super(config);
      }
      static names() {
        return {
          accessKeyId: "accessKeyId",
          accessKeySecret: "accessKeySecret",
          securityToken: "securityToken",
          bearerToken: "bearerToken",
          durationSeconds: "durationSeconds",
          roleArn: "roleArn",
          policy: "policy",
          roleSessionExpiration: "roleSessionExpiration",
          roleSessionName: "roleSessionName",
          publicKeyId: "publicKeyId",
          privateKeyFile: "privateKeyFile",
          roleName: "roleName",
          enableIMDSv2: "enableIMDSv2",
          metadataTokenDuration: "metadataTokenDuration",
          credentialsURI: "credentialsURI",
          oidcProviderArn: "oidcProviderArn",
          oidcTokenFilePath: "oidcTokenFilePath",
          type: "type"
        };
      }
      static types() {
        return {
          accessKeyId: "string",
          accessKeySecret: "string",
          securityToken: "string",
          bearerToken: "string",
          durationSeconds: "number",
          roleArn: "string",
          policy: "string",
          roleSessionExpiration: "number",
          roleSessionName: "string",
          publicKeyId: "string",
          privateKeyFile: "string",
          roleName: "string",
          enableIMDSv2: "boolean",
          metadataTokenDuration: "number",
          credentialsURI: "string",
          oidcProviderArn: "string",
          oidcTokenFilePath: "string",
          type: "string"
        };
      }
    };
    exports.default = Config2;
  }
});

// node_modules/@alicloud/credentials/dist/src/access_key_credential.js
var require_access_key_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/access_key_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_credential_1 = __importDefault(require_default_credential());
    var config_1 = __importDefault(require_config());
    var AccessKeyCredential = class extends default_credential_1.default {
      constructor(accessKeyId, accessKeySecret) {
        if (!accessKeyId) {
          throw new Error("Missing required accessKeyId option in config for access_key");
        }
        if (!accessKeySecret) {
          throw new Error("Missing required accessKeySecret option in config for access_key");
        }
        const conf = new config_1.default({
          type: "access_key",
          accessKeyId,
          accessKeySecret
        });
        super(conf);
      }
    };
    exports.default = AccessKeyCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/sts_token_credential.js
var require_sts_token_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/sts_token_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_credential_1 = __importDefault(require_default_credential());
    var config_1 = __importDefault(require_config());
    var StsTokenCredential = class extends default_credential_1.default {
      constructor(accessKeyId, accessKeySecret, securityToken) {
        if (!accessKeyId) {
          throw new Error("Missing required accessKeyId option in config for sts");
        }
        if (!accessKeySecret) {
          throw new Error("Missing required accessKeySecret option in config for sts");
        }
        if (!securityToken) {
          throw new Error("Missing required securityToken option in config for sts");
        }
        const conf = new config_1.default({
          type: "sts",
          accessKeyId,
          accessKeySecret,
          securityToken
        });
        super(conf);
      }
    };
    exports.default = StsTokenCredential;
  }
});

// node_modules/ini/ini.js
var require_ini = __commonJS({
  "node_modules/ini/ini.js"(exports) {
    exports.parse = exports.decode = decode;
    exports.stringify = exports.encode = encode;
    exports.safe = safe;
    exports.unsafe = unsafe;
    var eol = typeof process !== "undefined" && process.platform === "win32" ? "\r\n" : "\n";
    function encode(obj, opt) {
      var children2 = [];
      var out = "";
      if (typeof opt === "string") {
        opt = {
          section: opt,
          whitespace: false
        };
      } else {
        opt = opt || {};
        opt.whitespace = opt.whitespace === true;
      }
      var separator = opt.whitespace ? " = " : "=";
      Object.keys(obj).forEach(function(k, _, __) {
        var val = obj[k];
        if (val && Array.isArray(val)) {
          val.forEach(function(item) {
            out += safe(k + "[]") + separator + safe(item) + "\n";
          });
        } else if (val && typeof val === "object")
          children2.push(k);
        else
          out += safe(k) + separator + safe(val) + eol;
      });
      if (opt.section && out.length)
        out = "[" + safe(opt.section) + "]" + eol + out;
      children2.forEach(function(k, _, __) {
        var nk = dotSplit(k).join("\\.");
        var section = (opt.section ? opt.section + "." : "") + nk;
        var child = encode(obj[k], {
          section,
          whitespace: opt.whitespace
        });
        if (out.length && child.length)
          out += eol;
        out += child;
      });
      return out;
    }
    function dotSplit(str) {
      return str.replace(/\1/g, "LITERAL\\1LITERAL").replace(/\\\./g, "").split(/\./).map(function(part) {
        return part.replace(/\1/g, "\\.").replace(/\2LITERAL\\1LITERAL\2/g, "");
      });
    }
    function decode(str) {
      var out = {};
      var p = out;
      var section = null;
      var re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
      var lines = str.split(/[\r\n]+/g);
      lines.forEach(function(line, _, __) {
        if (!line || line.match(/^\s*[;#]/))
          return;
        var match = line.match(re);
        if (!match)
          return;
        if (match[1] !== void 0) {
          section = unsafe(match[1]);
          if (section === "__proto__") {
            p = {};
            return;
          }
          p = out[section] = out[section] || {};
          return;
        }
        var key = unsafe(match[2]);
        if (key === "__proto__")
          return;
        var value = match[3] ? unsafe(match[4]) : true;
        switch (value) {
          case "true":
          case "false":
          case "null":
            value = JSON.parse(value);
        }
        if (key.length > 2 && key.slice(-2) === "[]") {
          key = key.substring(0, key.length - 2);
          if (key === "__proto__")
            return;
          if (!p[key])
            p[key] = [];
          else if (!Array.isArray(p[key]))
            p[key] = [p[key]];
        }
        if (Array.isArray(p[key]))
          p[key].push(value);
        else
          p[key] = value;
      });
      Object.keys(out).filter(function(k, _, __) {
        if (!out[k] || typeof out[k] !== "object" || Array.isArray(out[k]))
          return false;
        var parts = dotSplit(k);
        var p2 = out;
        var l = parts.pop();
        var nl = l.replace(/\\\./g, ".");
        parts.forEach(function(part, _2, __2) {
          if (part === "__proto__")
            return;
          if (!p2[part] || typeof p2[part] !== "object")
            p2[part] = {};
          p2 = p2[part];
        });
        if (p2 === out && nl === l)
          return false;
        p2[nl] = out[k];
        return true;
      }).forEach(function(del, _, __) {
        delete out[del];
      });
      return out;
    }
    function isQuoted(val) {
      return val.charAt(0) === '"' && val.slice(-1) === '"' || val.charAt(0) === "'" && val.slice(-1) === "'";
    }
    function safe(val) {
      return typeof val !== "string" || val.match(/[=\r\n]/) || val.match(/^\[/) || val.length > 1 && isQuoted(val) || val !== val.trim() ? JSON.stringify(val) : val.replace(/;/g, "\\;").replace(/#/g, "\\#");
    }
    function unsafe(val, doUnesc) {
      val = (val || "").trim();
      if (isQuoted(val)) {
        if (val.charAt(0) === "'")
          val = val.substr(1, val.length - 2);
        try {
          val = JSON.parse(val);
        } catch (_) {
        }
      } else {
        var esc = false;
        var unesc = "";
        for (var i = 0, l = val.length; i < l; i++) {
          var c = val.charAt(i);
          if (esc) {
            if ("\\;#".indexOf(c) !== -1)
              unesc += c;
            else
              unesc += "\\" + c;
            esc = false;
          } else if (";#".indexOf(c) !== -1)
            break;
          else if (c === "\\")
            esc = true;
          else
            unesc += c;
        }
        if (esc)
          unesc += "\\";
        return unesc.trim();
      }
      return val;
    }
  }
});

// node_modules/@alicloud/credentials/node_modules/kitx/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@alicloud/credentials/node_modules/kitx/lib/index.js"(exports) {
    "use strict";
    var fs2 = __require("fs");
    var os2 = __require("os");
    var crypto2 = __require("crypto");
    exports.loadJSONSync = function(filename) {
      var content = fs2.readFileSync(filename, "utf8");
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      try {
        return JSON.parse(content);
      } catch (err) {
        err.message = filename + ": " + err.message;
        throw err;
      }
    };
    exports.encode = function(str, encoding) {
      if (typeof str !== "string") {
        str = "" + str;
      }
      return Buffer.from(str, encoding);
    };
    exports.makeHasher = function(algorithm) {
      return function(data, encoding) {
        var shasum = crypto2.createHash(algorithm);
        shasum.update(data);
        return shasum.digest(encoding);
      };
    };
    exports.createHash = exports.makeHasher;
    exports.md5 = exports.makeHasher("md5");
    exports.createHmac = function(algorithm) {
      return function(data, key, encoding) {
        return crypto2.createHmac(algorithm, key).update(data).digest(encoding);
      };
    };
    exports.sha1 = exports.createHmac("sha1");
    exports.random = function(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    };
    exports.makeNonce = function() {
      var counter = 0;
      var last;
      const machine = os2.hostname();
      const pid = process.pid;
      return function() {
        var val = Math.floor(Math.random() * 1e12);
        if (val === last) {
          counter++;
        } else {
          counter = 0;
        }
        last = val;
        var uid = `${machine}${pid}${val}${counter}`;
        return exports.md5(uid, "hex");
      };
    }();
    exports.pad2 = function(num) {
      if (num < 10) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.pad3 = function(num) {
      if (num < 10) {
        return "00" + num;
      } else if (num < 100) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.getYYYYMMDD = function(date) {
      var YYYY = date.getFullYear();
      var MM = exports.pad2(date.getMonth() + 1);
      var DD = exports.pad2(date.getDate());
      return "" + YYYY + MM + DD;
    };
    exports.sleep = function(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    exports.getIPv4 = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.address;
          }
        }
      }
      return "";
    };
    exports.getMac = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.mac;
          }
        }
      }
      return "00:00:00:00:00:00";
    };
    exports.readAll = function(readable) {
      return new Promise((resolve, reject) => {
        var onError, onData, onEnd;
        var cleanup = function(err) {
          readable.removeListener("error", onError);
          readable.removeListener("data", onData);
          readable.removeListener("end", onEnd);
        };
        var bufs = [];
        var size = 0;
        onData = function(buf) {
          bufs.push(buf);
          size += buf.length;
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        onEnd = function() {
          cleanup();
          resolve(Buffer.concat(bufs, size));
        };
        readable.on("error", onError);
        readable.on("data", onData);
        readable.on("end", onEnd);
      });
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/util/utils.js
var require_utils = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/util/utils.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseFile = exports.timestamp = void 0;
    var ini = __importStar(require_ini());
    var kitx = __importStar(require_lib3());
    var fs_1 = __importDefault(__require("fs"));
    function timestamp(dateStr, timeChange) {
      let date = new Date(dateStr);
      if (!dateStr || isNaN(date.getTime())) {
        date = /* @__PURE__ */ new Date();
      }
      if (timeChange) {
        date.setTime(date.getTime() + timeChange);
      }
      const YYYY = date.getUTCFullYear();
      const MM = kitx.pad2(date.getUTCMonth() + 1);
      const DD = kitx.pad2(date.getUTCDate());
      const HH = kitx.pad2(date.getUTCHours());
      const mm = kitx.pad2(date.getUTCMinutes());
      const ss = kitx.pad2(date.getUTCSeconds());
      return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}Z`;
    }
    exports.timestamp = timestamp;
    function parseFile(file, ignoreErr = false) {
      try {
        fs_1.default.accessSync(file, fs_1.default.constants.R_OK);
      } catch (e) {
        if (ignoreErr) {
          return null;
        }
        throw new Error("Has no read permission to credentials file");
      }
      return ini.parse(fs_1.default.readFileSync(file, "utf-8"));
    }
    exports.parseFile = parseFile;
  }
});

// node_modules/@alicloud/credentials/dist/src/session_credential.js
var require_session_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/session_credential.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_credential_1 = __importDefault(require_default_credential());
    var utils = __importStar(require_utils());
    var config_1 = __importDefault(require_config());
    var credential_model_1 = __importDefault(require_credential_model());
    var SessionCredential = class extends default_credential_1.default {
      constructor(config) {
        const conf = new config_1.default({
          type: config.type,
          accessKeyId: config.accessKeyId,
          accessKeySecret: config.accessKeySecret,
          securityToken: config.securityToken
        });
        super(conf);
        this.sessionCredential = null;
        this.durationSeconds = config.durationSeconds || 3600;
      }
      updateCredential() {
        return __async(this, null, function* () {
          throw new Error("need implemented in sub-class");
        });
      }
      ensureCredential() {
        return __async(this, null, function* () {
          const needUpdate = this.needUpdateCredential();
          if (needUpdate) {
            yield this.updateCredential();
          }
        });
      }
      getAccessKeyId() {
        return __async(this, null, function* () {
          yield this.ensureCredential();
          return this.sessionCredential.AccessKeyId;
        });
      }
      getAccessKeySecret() {
        return __async(this, null, function* () {
          yield this.ensureCredential();
          return this.sessionCredential.AccessKeySecret;
        });
      }
      getSecurityToken() {
        return __async(this, null, function* () {
          yield this.ensureCredential();
          return this.sessionCredential.SecurityToken;
        });
      }
      needUpdateCredential() {
        if (!this.sessionCredential || !this.sessionCredential.Expiration || !this.sessionCredential.AccessKeyId || !this.sessionCredential.AccessKeySecret || !this.sessionCredential.SecurityToken) {
          return true;
        }
        const expireTime = utils.timestamp(/* @__PURE__ */ new Date(), this.durationSeconds * 0.05 * 1e3);
        if (this.sessionCredential.Expiration < expireTime) {
          return true;
        }
        return false;
      }
      getCredential() {
        return __async(this, null, function* () {
          yield this.ensureCredential();
          return new credential_model_1.default({
            accessKeyId: this.sessionCredential.AccessKeyId,
            accessKeySecret: this.sessionCredential.AccessKeySecret,
            securityToken: this.sessionCredential.SecurityToken,
            bearerToken: this.bearerToken,
            type: this.type
          });
        });
      }
    };
    exports.default = SessionCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/ecs_ram_role_credential.js
var require_ecs_ram_role_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/ecs_ram_role_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var session_credential_1 = __importDefault(require_session_credential());
    var httpx_1 = __importDefault(require_lib());
    var config_1 = __importDefault(require_config());
    var SECURITY_CRED_URL = "http://100.100.100.200/latest/meta-data/ram/security-credentials/";
    var SECURITY_CRED_TOKEN_URL = "http://100.100.100.200/latest/api/token";
    var EcsRamRoleCredential = class extends session_credential_1.default {
      constructor(roleName = "", runtime = {}, enableIMDSv2 = false, metadataTokenDuration = 21600) {
        const conf = new config_1.default({
          type: "ecs_ram_role"
        });
        super(conf);
        this.roleName = roleName;
        this.enableIMDSv2 = enableIMDSv2;
        this.metadataTokenDuration = metadataTokenDuration;
        this.runtime = runtime;
        this.sessionCredential = null;
        this.metadataToken = null;
        this.staleTime = 0;
      }
      getBody(_0) {
        return __async(this, arguments, function* (url, options = {}) {
          const response = yield httpx_1.default.request(url, options);
          return yield httpx_1.default.read(response, "utf8");
        });
      }
      getMetadataToken() {
        return __async(this, null, function* () {
          if (this.needToRefresh()) {
            let tmpTime = (/* @__PURE__ */ new Date()).getTime() + this.metadataTokenDuration * 1e3;
            const response = yield httpx_1.default.request(SECURITY_CRED_TOKEN_URL, {
              headers: {
                "X-aliyun-ecs-metadata-token-ttl-seconds": `${this.metadataTokenDuration}`
              }
            });
            if (response.statusCode !== 200) {
              throw new Error(`Failed to get token from ECS Metadata Service. HttpCode=${response.statusCode}`);
            }
            this.staleTime = tmpTime;
            return yield httpx_1.default.read(response, "utf8");
          }
          return this.metadataToken;
        });
      }
      updateCredential() {
        return __async(this, null, function* () {
          let options = {};
          if (this.enableIMDSv2) {
            this.metadataToken = yield this.getMetadataToken();
            options = {
              headers: {
                "X-aliyun-ecs-metadata-token": this.metadataToken
              }
            };
          }
          const roleName = yield this.getRoleName();
          const url = SECURITY_CRED_URL + roleName;
          const body = yield this.getBody(url, options);
          const json = JSON.parse(body);
          this.sessionCredential = {
            AccessKeyId: json.AccessKeyId,
            AccessKeySecret: json.AccessKeySecret,
            Expiration: json.Expiration,
            SecurityToken: json.SecurityToken
          };
        });
      }
      getRoleName() {
        return __async(this, null, function* () {
          if (this.roleName && this.roleName.length) {
            return this.roleName;
          }
          return yield this.getBody(SECURITY_CRED_URL);
        });
      }
      needToRefresh() {
        return (/* @__PURE__ */ new Date()).getTime() >= this.staleTime;
      }
    };
    exports.default = EcsRamRoleCredential;
  }
});

// node_modules/@alicloud/credentials/dist/package.json
var require_package = __commonJS({
  "node_modules/@alicloud/credentials/dist/package.json"(exports, module) {
    module.exports = {
      name: "@alicloud/credentials",
      version: "2.3.1",
      description: "alibaba cloud node.js sdk credentials",
      main: "dist/src/client.js",
      scripts: {
        prepublishOnly: "tsc",
        build: "tsc",
        lint: "eslint --fix ./src --ext .ts",
        test: "mocha -b -r ts-node/register test/**/*.test.ts test/*.test.ts --timeout 15000",
        cov: "nyc -e .ts -r=html -r=text -r=lcov npm run test",
        ci: "npm run cov",
        "test-integration": "mocha -b -r ts-node/register -R spec test/*.integration.ts",
        clean: "rm -rf coverage"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/aliyun/nodejs-credentials.git"
      },
      keywords: [
        "alibaba cloud",
        "sdk",
        "credentials"
      ],
      author: "Alibaba Cloud SDK",
      license: "MIT",
      devDependencies: {
        "@types/expect.js": "^0.3.29",
        "@types/ini": "^1.3.30",
        "@types/mocha": "^10.0.6",
        "@types/rewire": "^2.5.28",
        "@typescript-eslint/eslint-plugin": "^6.18.1",
        "@typescript-eslint/parser": "^6.18.1",
        eslint: "^8.56.0",
        "expect.js": "^0.3.1",
        mm: "^2.4.1",
        mocha: "^10.1.0",
        nyc: "^15.1.0",
        rewire: "^7.0.0",
        "ts-node": "^10.9.2",
        typescript: "^3.7.5"
      },
      dependencies: {
        "@alicloud/tea-typescript": "^1.5.3",
        httpx: "^2.2.0",
        ini: "^1.3.5",
        kitx: "^2.0.0"
      },
      bugs: {
        url: "https://github.com/aliyun/nodejs-credentials/issues"
      },
      homepage: "https://github.com/aliyun/nodejs-credentials#readme",
      files: [
        "src",
        "dist"
      ]
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/util/helper.js
var require_helper = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/util/helper.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_CLIENT = exports.DEFAULT_UA = void 0;
    var os2 = __importStar(__require("os"));
    var package_json_1 = __importDefault(require_package());
    exports.DEFAULT_UA = `AlibabaCloud (${os2.platform()}; ${os2.arch()}) Node.js/${process.version} Core/${package_json_1.default.version}`;
    exports.DEFAULT_CLIENT = `Node.js(${process.version}), ${package_json_1.default.name}: ${package_json_1.default.version}`;
  }
});

// node_modules/@alicloud/credentials/dist/src/util/http.js
var require_http = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/util/http.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.request = void 0;
    var httpx_1 = __importDefault(require_lib());
    var kitx = __importStar(require_lib3());
    var helper = __importStar(require_helper());
    var utils = __importStar(require_utils());
    var STATUS_CODE = /* @__PURE__ */ new Set([200, "200", "OK", "Success"]);
    function firstLetterUpper(str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
    function formatParams(params) {
      const keys = Object.keys(params);
      const newParams = {};
      for (const key of keys) {
        newParams[firstLetterUpper(key)] = params[key];
      }
      return newParams;
    }
    function encode(str) {
      const result = encodeURIComponent(str);
      return result.replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
    }
    function replaceRepeatList(target, key, repeat) {
      for (let i = 0; i < repeat.length; i++) {
        const item = repeat[i];
        if (item && typeof item === "object") {
          const keys = Object.keys(item);
          for (const itemKey of keys) {
            target[`${key}.${i + 1}.${itemKey}`] = item[itemKey];
          }
        } else {
          target[`${key}.${i + 1}`] = item;
        }
      }
    }
    function flatParams(params) {
      const target = {};
      const keys = Object.keys(params);
      for (const key of keys) {
        const value = params[key];
        if (Array.isArray(value)) {
          replaceRepeatList(target, key, value);
        } else {
          target[key] = value;
        }
      }
      return target;
    }
    function normalize(params) {
      const list = [];
      const flated = flatParams(params);
      const keys = Object.keys(flated).sort();
      for (const key of keys) {
        const value = flated[key];
        list.push([encode(key), encode(value)]);
      }
      return list;
    }
    function canonicalize(normalized) {
      const fields = [];
      for (const [key, value] of normalized) {
        fields.push(key + "=" + value);
      }
      return fields.join("&");
    }
    function _buildParams() {
      const defaultParams = {
        Format: "JSON",
        SignatureMethod: "HMAC-SHA1",
        SignatureNonce: kitx.makeNonce(),
        SignatureVersion: "1.0",
        Timestamp: utils.timestamp(),
        Version: "2015-04-01",
        RegionId: "cn-hangzhou"
      };
      return defaultParams;
    }
    function request(_0) {
      return __async(this, arguments, function* (host, params = {}, opts = {}, accessKeySecret) {
        let options = Object.assign({ headers: {
          "x-sdk-client": helper.DEFAULT_CLIENT,
          "user-agent": helper.DEFAULT_UA
        } }, opts);
        if (options.formatParams !== false) {
          params = formatParams(params);
        }
        params = Object.assign(Object.assign({}, _buildParams()), params);
        const method = (opts.method || "GET").toUpperCase();
        const normalized = normalize(params);
        if (!options.anonymous) {
          const canonicalized = canonicalize(normalized);
          const stringToSign = `${method}&${encode("/")}&${encode(canonicalized)}`;
          const key = accessKeySecret + "&";
          const signature = kitx.sha1(stringToSign, key, "base64");
          normalized.push(["Signature", encode(signature)]);
        }
        const url = opts.method === "POST" ? `${host}/` : `${host}/?${canonicalize(normalized)}`;
        if (opts.method === "POST") {
          opts.headers = opts.headers || {};
          opts.headers["content-type"] = "application/x-www-form-urlencoded";
          opts.data = canonicalize(normalized);
        }
        const response = yield httpx_1.default.request(url, opts);
        const buffer = yield httpx_1.default.read(response, "utf8");
        const json = JSON.parse(buffer);
        if (json.Code && !STATUS_CODE.has(json.Code)) {
          const err = new Error(`${json.Message}`);
          err.name = json.Code + "Error";
          err.data = json;
          err.code = json.Code;
          err.url = url;
          throw err;
        }
        return json;
      });
    }
    exports.request = request;
  }
});

// node_modules/@alicloud/credentials/dist/src/ram_role_arn_credential.js
var require_ram_role_arn_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/ram_role_arn_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var session_credential_1 = __importDefault(require_session_credential());
    var http_1 = require_http();
    var config_1 = __importDefault(require_config());
    var RamRoleArnCredential = class extends session_credential_1.default {
      constructor(config, runtime = {}) {
        if (!config.accessKeyId) {
          throw new Error("Missing required accessKeyId option in config for ram_role_arn");
        }
        if (!config.accessKeySecret) {
          throw new Error("Missing required accessKeySecret option in config for ram_role_arn");
        }
        if (!config.roleArn) {
          throw new Error("Missing required roleArn option in config for ram_role_arn");
        }
        const conf = new config_1.default({
          type: "ram_role_arn",
          accessKeyId: config.accessKeyId,
          accessKeySecret: config.accessKeySecret,
          securityToken: config.securityToken
        });
        super(conf);
        this.roleArn = config.roleArn;
        this.policy = config.policy;
        this.durationSeconds = config.roleSessionExpiration || 3600;
        this.roleSessionName = config.roleSessionName || "role_session_name";
        this.runtime = runtime;
        this.host = "https://sts.aliyuncs.com";
      }
      updateCredential() {
        return __async(this, null, function* () {
          const params = {
            accessKeyId: this.accessKeyId,
            securityToken: this.securityToken,
            roleArn: this.roleArn,
            action: "AssumeRole",
            durationSeconds: this.durationSeconds,
            roleSessionName: this.roleSessionName
          };
          if (this.policy) {
            params.policy = this.policy;
          }
          const json = yield http_1.request(this.host, params, this.runtime, this.accessKeySecret);
          this.sessionCredential = json.Credentials;
        });
      }
    };
    exports.default = RamRoleArnCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/oidc_role_arn_credential.js
var require_oidc_role_arn_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/oidc_role_arn_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var session_credential_1 = __importDefault(require_session_credential());
    var http_1 = require_http();
    var config_1 = __importDefault(require_config());
    var fs_1 = __importDefault(__require("fs"));
    var OidcRoleArnCredential = class extends session_credential_1.default {
      constructor(config, runtime = {}) {
        if (!config.roleArn) {
          config.roleArn = process.env.ALIBABA_CLOUD_ROLE_ARN;
          if (!config.roleArn) {
            throw new Error("roleArn does not exist and env ALIBABA_CLOUD_ROLE_ARN is null.");
          }
        }
        if (!config.oidcProviderArn) {
          config.oidcProviderArn = process.env.ALIBABA_CLOUD_OIDC_PROVIDER_ARN;
          if (!config.oidcProviderArn) {
            throw new Error("oidcProviderArn does not exist and env ALIBABA_CLOUD_OIDC_PROVIDER_ARN is null.");
          }
        }
        if (!config.oidcTokenFilePath) {
          config.oidcTokenFilePath = process.env.ALIBABA_CLOUD_OIDC_TOKEN_FILE;
          if (!config.oidcTokenFilePath) {
            throw new Error("oidcTokenFilePath is not exists and env ALIBABA_CLOUD_OIDC_TOKEN_FILE is null.");
          }
        }
        if (!config.roleSessionName && process.env.ALIBABA_CLOUD_ROLE_SESSION_NAME) {
          config.roleSessionName = process.env.ALIBABA_CLOUD_ROLE_SESSION_NAME;
        }
        const conf = new config_1.default({
          type: "oidc_role_arn"
        });
        super(conf);
        this.oidcTokenFilePath = config.oidcTokenFilePath;
        this.roleArn = config.roleArn;
        this.policy = config.policy;
        this.oidcProviderArn = config.oidcProviderArn;
        this.durationSeconds = config.roleSessionExpiration || 3600;
        this.roleSessionName = config.roleSessionName || "role_session_name";
        runtime.method = "POST";
        runtime.anonymous = true;
        this.runtime = runtime;
        this.host = "https://sts.aliyuncs.com";
      }
      getOdicToken(oidcTokenFilePath) {
        if (!fs_1.default.existsSync(oidcTokenFilePath)) {
          throw new Error(`oidcTokenFilePath ${oidcTokenFilePath}  is not exists.`);
        }
        let oidcToken = null;
        try {
          oidcToken = fs_1.default.readFileSync(oidcTokenFilePath, "utf-8");
        } catch (err) {
          throw new Error(`oidcTokenFilePath ${oidcTokenFilePath} cannot be read.`);
        }
        return oidcToken;
      }
      updateCredential() {
        return __async(this, null, function* () {
          const oidcToken = this.getOdicToken(this.oidcTokenFilePath);
          const params = {
            Action: "AssumeRoleWithOIDC",
            RoleArn: this.roleArn,
            OIDCProviderArn: this.oidcProviderArn,
            OIDCToken: oidcToken,
            DurationSeconds: this.durationSeconds,
            RoleSessionName: this.roleSessionName
          };
          if (this.policy) {
            params.policy = this.policy;
          }
          const json = yield http_1.request(this.host, params, this.runtime);
          this.sessionCredential = json.Credentials;
        });
      }
    };
    exports.default = OidcRoleArnCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/rsa_key_pair_credential.js
var require_rsa_key_pair_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/rsa_key_pair_credential.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = __importDefault(__require("fs"));
    var session_credential_1 = __importDefault(require_session_credential());
    var utils = __importStar(require_utils());
    var http_1 = require_http();
    var config_1 = __importDefault(require_config());
    var SECURITY_CRED_URL = "http://100.100.100.200/latest/meta-data/ram/security-credentials/";
    var RsaKeyPairCredential = class extends session_credential_1.default {
      constructor(publicKeyId, privateKeyFile) {
        if (!publicKeyId) {
          throw new Error("Missing required publicKeyId option in config for rsa_key_pair");
        }
        if (!privateKeyFile) {
          throw new Error("Missing required privateKeyFile option in config for rsa_key_pair");
        }
        if (!fs_1.default.existsSync(privateKeyFile)) {
          throw new Error(`privateKeyFile ${privateKeyFile} cannot be empty`);
        }
        const conf = new config_1.default({
          type: "rsa_key_pair"
        });
        super(conf);
        this.privateKey = utils.parseFile(privateKeyFile);
        this.publicKeyId = publicKeyId;
      }
      updateCredential() {
        return __async(this, null, function* () {
          const url = SECURITY_CRED_URL + this.roleName;
          const json = yield http_1.request(url, {
            accessKeyId: this.publicKeyId,
            action: "GenerateSessionAccessKey",
            durationSeconds: 3600,
            signatureMethod: "SHA256withRSA",
            signatureType: "PRIVATEKEY"
          }, {}, this.privateKey);
          this.sessionCredential = json.Credentials;
        });
      }
    };
    exports.default = RsaKeyPairCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/bearer_token_credential.js
var require_bearer_token_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/bearer_token_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_credential_1 = __importDefault(require_default_credential());
    var config_1 = __importDefault(require_config());
    var BearerTokenCredential = class extends default_credential_1.default {
      constructor(bearerToken) {
        if (!bearerToken) {
          throw new Error("Missing required bearerToken option in config for bearer");
        }
        const conf = new config_1.default({
          type: "bearer"
        });
        super(conf);
        this.bearerToken = bearerToken;
      }
    };
    exports.default = BearerTokenCredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/environment_variable_credentials_provider.js
var require_environment_variable_credentials_provider = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/environment_variable_credentials_provider.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var access_key_credential_1 = __importDefault(require_access_key_credential());
    exports.default = {
      getCredential() {
        const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
        const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
        if (accessKeyId === void 0 || accessKeySecret === void 0) {
          return null;
        }
        if (accessKeyId === null || accessKeyId === "") {
          throw new Error("Environment variable ALIBABA_CLOUD_ACCESS_KEY_ID cannot be empty");
        }
        if (accessKeySecret === null || accessKeySecret === "") {
          throw new Error("Environment variable ALIBABA_CLOUD_ACCESS_KEY_SECRET cannot be empty");
        }
        return new access_key_credential_1.default(accessKeyId, accessKeySecret);
      }
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/profile_credentials_provider.js
var require_profile_credentials_provider = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/profile_credentials_provider.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var access_key_credential_1 = __importDefault(require_access_key_credential());
    var sts_token_credential_1 = __importDefault(require_sts_token_credential());
    var ecs_ram_role_credential_1 = __importDefault(require_ecs_ram_role_credential());
    var ram_role_arn_credential_1 = __importDefault(require_ram_role_arn_credential());
    var oidc_role_arn_credential_1 = __importDefault(require_oidc_role_arn_credential());
    var rsa_key_pair_credential_1 = __importDefault(require_rsa_key_pair_credential());
    var bearer_token_credential_1 = __importDefault(require_bearer_token_credential());
    var utils = __importStar(require_utils());
    var fs_1 = __importDefault(__require("fs"));
    var config_1 = __importDefault(require_config());
    var DEFAULT_PATH = process.env.HOME + "/.alibabacloud/credentials";
    exports.default = {
      getCredential(credentialName = "default") {
        let fileContent = null;
        const credentialFile = process.env.ALIBABA_CLOUD_CREDENTIALS_FILE;
        if (credentialFile === void 0) {
          if (fs_1.default.existsSync(DEFAULT_PATH)) {
            const content = utils.parseFile(DEFAULT_PATH, true);
            if (content) {
              fileContent = content;
            }
          }
        } else {
          if (credentialFile === null || credentialFile === "") {
            throw new Error("Environment variable credentialFile cannot be empty");
          }
          if (!fs_1.default.existsSync(credentialFile)) {
            throw new Error(`credentialFile ${credentialFile} cannot be empty`);
          }
          fileContent = utils.parseFile(credentialFile);
        }
        if (!fileContent) {
          return null;
        }
        const config = fileContent[credentialName] || {};
        if (!config.type) {
          throw new Error("Missing required type option in credentialFile");
        }
        switch (config.type) {
          case "access_key":
            return new access_key_credential_1.default(config.access_key_id, config.access_key_secret);
          case "sts":
            return new sts_token_credential_1.default(config.access_key_id, config.access_key_secret, config.security_token);
          case "ecs_ram_role":
            return new ecs_ram_role_credential_1.default(config.role_name);
          case "ram_role_arn": {
            const conf2 = new config_1.default({
              roleArn: config.role_arn,
              accessKeyId: config.access_key_id,
              accessKeySecret: config.access_key_secret
            });
            return new ram_role_arn_credential_1.default(conf2);
          }
          case "oidc_role_arn":
            const conf = new config_1.default({
              roleArn: config.role_arn,
              oidcProviderArn: config.oidc_provider_arn,
              oidcTokenFilePath: config.oidc_token_file_path
            });
            return new oidc_role_arn_credential_1.default(conf);
          case "rsa_key_pair":
            return new rsa_key_pair_credential_1.default(config.public_key_id, config.private_key_file);
          case "bearer":
            return new bearer_token_credential_1.default(config.bearer_token);
          default:
            throw new Error("Invalid type option, support: access_key, sts, ecs_ram_role, ram_role_arn, oidc_role_arn, rsa_key_pair, bearer");
        }
      }
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/instance_ram_role_credentials_provider.js
var require_instance_ram_role_credentials_provider = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/instance_ram_role_credentials_provider.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ecs_ram_role_credential_1 = __importDefault(require_ecs_ram_role_credential());
    exports.default = {
      getCredential() {
        const roleName = process.env.ALIBABA_CLOUD_ECS_METADATA;
        const enableIMDSv2 = process.env.ALIBABA_CLOUD_ECS_IMDSV2_ENABLE;
        if (roleName && roleName.length) {
          return new ecs_ram_role_credential_1.default(roleName, {}, enableIMDSv2 && enableIMDSv2.toLowerCase() === "true");
        }
        return null;
      }
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/uri_credential.js
var require_uri_credential = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/uri_credential.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var httpx_1 = __importDefault(require_lib());
    var config_1 = __importDefault(require_config());
    var session_credential_1 = __importDefault(require_session_credential());
    var URICredential = class extends session_credential_1.default {
      constructor(uri) {
        const conf = new config_1.default({
          type: "credentials_uri",
          credentialsURI: uri
        });
        super(conf);
        if (!uri) {
          this.credentialsURI = process.env["ALIBABA_CLOUD_CREDENTIALS_URI"];
        } else {
          this.credentialsURI = uri;
        }
        if (!this.credentialsURI) {
          throw new Error("Missing required credentialsURI option in config or environment variable for credentials_uri");
        }
      }
      updateCredential() {
        return __async(this, null, function* () {
          const url = this.credentialsURI;
          const response = yield httpx_1.default.request(url, {});
          if (response.statusCode !== 200) {
            throw new Error(`Get credentials from ${url} failed, status code is ${response.statusCode}`);
          }
          const body = yield httpx_1.default.read(response, "utf8");
          let json;
          try {
            json = JSON.parse(body);
          } catch (ex) {
            throw new Error(`Get credentials from ${url} failed, unmarshal response failed, JSON is: ${body}`);
          }
          if (json.Code !== "Success") {
            throw new Error(`Get credentials from ${url} failed, Code is ${json.Code}`);
          }
          this.sessionCredential = {
            AccessKeyId: json.AccessKeyId,
            AccessKeySecret: json.AccessKeySecret,
            Expiration: json.Expiration,
            SecurityToken: json.SecurityToken
          };
        });
      }
    };
    exports.default = URICredential;
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/credentials_uri_provider.js
var require_credentials_uri_provider = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/credentials_uri_provider.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri_credential_1 = __importDefault(require_uri_credential());
    exports.default = {
      getCredential() {
        const credentialsURI = process.env.ALIBABA_CLOUD_CREDENTIALS_URI;
        if (credentialsURI) {
          return new uri_credential_1.default(credentialsURI);
        }
        return null;
      }
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/oidc_role_arn_credentials_provider.js
var require_oidc_role_arn_credentials_provider = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/oidc_role_arn_credentials_provider.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var oidc_role_arn_credential_1 = __importDefault(require_oidc_role_arn_credential());
    var config_1 = __importDefault(require_config());
    exports.default = {
      getCredential() {
        if (process.env.ALIBABA_CLOUD_ROLE_ARN && process.env.ALIBABA_CLOUD_OIDC_PROVIDER_ARN && process.env.ALIBABA_CLOUD_OIDC_TOKEN_FILE) {
          return new oidc_role_arn_credential_1.default(new config_1.default({}));
        }
        return null;
      }
    };
  }
});

// node_modules/@alicloud/credentials/dist/src/provider/provider_chain.js
var require_provider_chain = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/provider/provider_chain.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCredentials = void 0;
    var environment_variable_credentials_provider_1 = __importDefault(require_environment_variable_credentials_provider());
    var profile_credentials_provider_1 = __importDefault(require_profile_credentials_provider());
    var instance_ram_role_credentials_provider_1 = __importDefault(require_instance_ram_role_credentials_provider());
    var credentials_uri_provider_1 = __importDefault(require_credentials_uri_provider());
    var oidc_role_arn_credentials_provider_1 = __importDefault(require_oidc_role_arn_credentials_provider());
    var defaultProviders = [
      environment_variable_credentials_provider_1.default,
      oidc_role_arn_credentials_provider_1.default,
      profile_credentials_provider_1.default,
      instance_ram_role_credentials_provider_1.default,
      credentials_uri_provider_1.default
    ];
    function getCredentials(providers = null) {
      const providerChain = providers || defaultProviders;
      for (const provider of providerChain) {
        const credential = provider.getCredential();
        if (credential) {
          return credential;
        }
      }
      return null;
    }
    exports.getCredentials = getCredentials;
  }
});

// node_modules/@alicloud/credentials/dist/src/client.js
var require_client2 = __commonJS({
  "node_modules/@alicloud/credentials/dist/src/client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    var access_key_credential_1 = __importDefault(require_access_key_credential());
    var sts_token_credential_1 = __importDefault(require_sts_token_credential());
    var ecs_ram_role_credential_1 = __importDefault(require_ecs_ram_role_credential());
    var ram_role_arn_credential_1 = __importDefault(require_ram_role_arn_credential());
    var oidc_role_arn_credential_1 = __importDefault(require_oidc_role_arn_credential());
    var rsa_key_pair_credential_1 = __importDefault(require_rsa_key_pair_credential());
    var bearer_token_credential_1 = __importDefault(require_bearer_token_credential());
    var DefaultProvider = __importStar(require_provider_chain());
    var config_1 = __importDefault(require_config());
    exports.Config = config_1.default;
    var uri_credential_1 = __importDefault(require_uri_credential());
    var Credential = class {
      constructor(config = null, runtime = {}) {
        this.load(config, runtime);
      }
      getAccessKeyId() {
        return this.credential.getAccessKeyId();
      }
      getAccessKeySecret() {
        return this.credential.getAccessKeySecret();
      }
      getSecurityToken() {
        return this.credential.getSecurityToken();
      }
      getBearerToken() {
        return this.credential.getBearerToken();
      }
      getType() {
        return this.credential.getType();
      }
      getCredential() {
        return this.credential.getCredential();
      }
      load(config, runtime) {
        if (!config) {
          this.credential = DefaultProvider.getCredentials();
          return;
        }
        if (!config.type) {
          throw new Error("Missing required type option");
        }
        switch (config.type) {
          case "access_key":
            this.credential = new access_key_credential_1.default(config.accessKeyId, config.accessKeySecret);
            break;
          case "sts":
            this.credential = new sts_token_credential_1.default(config.accessKeyId, config.accessKeySecret, config.securityToken);
            break;
          case "ecs_ram_role":
            this.credential = new ecs_ram_role_credential_1.default(config.roleName, runtime, config.enableIMDSv2, config.metadataTokenDuration);
            break;
          case "ram_role_arn":
            this.credential = new ram_role_arn_credential_1.default(config, runtime);
            break;
          case "oidc_role_arn":
            this.credential = new oidc_role_arn_credential_1.default(config, runtime);
            break;
          case "rsa_key_pair":
            this.credential = new rsa_key_pair_credential_1.default(config.publicKeyId, config.privateKeyFile);
            break;
          case "bearer":
            this.credential = new bearer_token_credential_1.default(config.bearerToken);
            break;
          case "credentials_uri":
            this.credential = new uri_credential_1.default(config.credentialsURI);
            break;
          default:
            throw new Error("Invalid type option, support: access_key, sts, ecs_ram_role, ram_role_arn, rsa_key_pair, credentials_uri");
        }
      }
    };
    exports.default = Credential;
  }
});

// node_modules/@alicloud/openapi-util/node_modules/kitx/lib/index.js
var require_lib4 = __commonJS({
  "node_modules/@alicloud/openapi-util/node_modules/kitx/lib/index.js"(exports) {
    "use strict";
    var fs2 = __require("fs");
    var os2 = __require("os");
    var crypto2 = __require("crypto");
    exports.loadJSONSync = function(filename) {
      var content = fs2.readFileSync(filename, "utf8");
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      try {
        return JSON.parse(content);
      } catch (err) {
        err.message = filename + ": " + err.message;
        throw err;
      }
    };
    exports.encode = function(str, encoding) {
      if (typeof str !== "string") {
        str = "" + str;
      }
      return Buffer.from(str, encoding);
    };
    exports.makeHasher = function(algorithm) {
      return function(data, encoding) {
        var shasum = crypto2.createHash(algorithm);
        shasum.update(data);
        return shasum.digest(encoding);
      };
    };
    exports.createHash = exports.makeHasher;
    exports.md5 = exports.makeHasher("md5");
    exports.createHmac = function(algorithm) {
      return function(data, key, encoding) {
        return crypto2.createHmac(algorithm, key).update(data).digest(encoding);
      };
    };
    exports.sha1 = exports.createHmac("sha1");
    exports.random = function(min, max) {
      return Math.floor(min + Math.random() * (max - min));
    };
    exports.makeNonce = function() {
      var counter = 0;
      var last;
      const machine = os2.hostname();
      const pid = process.pid;
      return function() {
        var val = Math.floor(Math.random() * 1e12);
        if (val === last) {
          counter++;
        } else {
          counter = 0;
        }
        last = val;
        var uid = `${machine}${pid}${val}${counter}`;
        return exports.md5(uid, "hex");
      };
    }();
    exports.pad2 = function(num) {
      if (num < 10) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.pad3 = function(num) {
      if (num < 10) {
        return "00" + num;
      } else if (num < 100) {
        return "0" + num;
      }
      return "" + num;
    };
    exports.getYYYYMMDD = function(date) {
      var YYYY = date.getFullYear();
      var MM = exports.pad2(date.getMonth() + 1);
      var DD = exports.pad2(date.getDate());
      return "" + YYYY + MM + DD;
    };
    exports.sleep = function(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    exports.getIPv4 = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.address;
          }
        }
      }
      return "";
    };
    exports.getMac = function() {
      var interfaces = os2.networkInterfaces();
      var keys = Object.keys(interfaces);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var addresses = interfaces[key];
        for (var j = 0; j < addresses.length; j++) {
          var item = addresses[j];
          if (!item.internal && item.family === "IPv4") {
            return item.mac;
          }
        }
      }
      return "00:00:00:00:00:00";
    };
    exports.readAll = function(readable) {
      return new Promise((resolve, reject) => {
        var onError, onData, onEnd;
        var cleanup = function(err) {
          readable.removeListener("error", onError);
          readable.removeListener("data", onData);
          readable.removeListener("end", onEnd);
        };
        var bufs = [];
        var size = 0;
        onData = function(buf) {
          bufs.push(buf);
          size += buf.length;
        };
        onError = function(err) {
          cleanup();
          reject(err);
        };
        onEnd = function() {
          cleanup();
          resolve(Buffer.concat(bufs, size));
        };
        readable.on("error", onError);
        readable.on("data", onData);
        readable.on("end", onEnd);
      });
    };
  }
});

// node_modules/@alicloud/openapi-util/dist/client.js
var require_client3 = __commonJS({
  "node_modules/@alicloud/openapi-util/dist/client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var $tea = __importStar(require_tea());
    var tea_util_1 = __importDefault(require_client());
    var kitx_1 = __importDefault(require_lib4());
    var querystring_1 = __importDefault(__require("querystring"));
    var crypto_1 = __importDefault(__require("crypto"));
    var PEM_BEGIN = "-----BEGIN PRIVATE KEY-----\n";
    var PEM_END = "\n-----END PRIVATE KEY-----";
    function replaceRepeatList(target, repeat, prefix) {
      if (prefix) {
        prefix = prefix + ".";
      }
      for (var i = 0; i < repeat.length; i++) {
        var item = repeat[i];
        let key = prefix + (i + 1);
        if (typeof item === "undefined" || item == null) {
          continue;
        }
        if (Array.isArray(item)) {
          replaceRepeatList(target, item, key);
        } else if (item instanceof Object) {
          flatMap(target, item, key);
        } else {
          target[key] = item.toString();
        }
      }
    }
    function flatMap(target, params, prefix = "") {
      if (prefix) {
        prefix = prefix + ".";
      }
      params = toMap(params);
      let keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = params[key];
        key = prefix + key;
        if (typeof value === "undefined" || value == null) {
          continue;
        }
        if (Array.isArray(value)) {
          replaceRepeatList(target, value, key);
        } else if (value instanceof Object) {
          flatMap(target, value, key);
        } else {
          target[key] = value.toString();
        }
      }
      return target;
    }
    function filter(value) {
      return value.replace(/[\t\n\r\f]/g, " ");
    }
    function getCanonicalizedHeaders(headers) {
      const prefix = "x-acs-";
      const keys = Object.keys(headers);
      const canonicalizedKeys = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.startsWith(prefix)) {
          canonicalizedKeys.push(key);
        }
      }
      canonicalizedKeys.sort();
      var result = "";
      for (let i = 0; i < canonicalizedKeys.length; i++) {
        const key = canonicalizedKeys[i];
        result += `${key}:${filter(headers[key]).trim()}
`;
      }
      return result;
    }
    function getCanonicalizedResource(uriPattern, query) {
      const keys = !query ? [] : Object.keys(query).sort();
      if (keys.length === 0) {
        return uriPattern;
      }
      var result = [];
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        result.push(`${key}=${query[key]}`);
      }
      return `${uriPattern}?${result.join("&")}`;
    }
    function getAuthorizationQueryString(query) {
      let canonicalQueryArray = [];
      const keys = !query ? [] : Object.keys(query).sort();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let param = key + "=";
        if (typeof query[key] !== "undefined" && query[key] !== null) {
          param = param + encode(query[key]);
        }
        canonicalQueryArray.push(param);
      }
      return canonicalQueryArray.join("&");
    }
    function getAuthorizationHeaders(header) {
      let canonicalheaders = "";
      let tmp = {};
      const keys = !header ? [] : Object.keys(header);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const lowerKey = keys[i].toLowerCase();
        if (lowerKey.startsWith("x-acs-") || lowerKey === "host" || lowerKey === "content-type") {
          if (tmp[lowerKey]) {
            tmp[lowerKey].push((header[key] || "").trim());
          } else {
            tmp[lowerKey] = [(header[key] || "").trim()];
          }
        }
      }
      var hsKeys = Object.keys(tmp).sort();
      for (let i = 0; i < hsKeys.length; i++) {
        const hsKey = hsKeys[i];
        let listSort = tmp[hsKey].sort();
        canonicalheaders += `${hsKey}:${listSort.join(",")}
`;
      }
      return { canonicalheaders, hsKeys };
    }
    function encode(str) {
      var result = encodeURIComponent(str);
      return result.replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
    }
    function normalize(params) {
      var list = [];
      var flated = {};
      flatMap(flated, params);
      var keys = Object.keys(flated).sort();
      for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = flated[key];
        list.push([encode(key), encode(value)]);
      }
      return list;
    }
    function canonicalize(normalized) {
      var fields = [];
      for (var i = 0; i < normalized.length; i++) {
        var [key, value] = normalized[i];
        fields.push(key + "=" + value);
      }
      return fields.join("&");
    }
    function isModelClass(t) {
      if (!t) {
        return false;
      }
      return typeof t.types === "function" && typeof t.names === "function";
    }
    function isObjectOrArray(t) {
      return Array.isArray(t) || t instanceof Object && typeof t !== "function";
    }
    function toMap(input) {
      if (!isObjectOrArray(input)) {
        return null;
      } else if (input instanceof $tea.Model) {
        return $tea.toMap(input);
      } else if (input && input.toMap && typeof input.toMap === "function") {
        return input.toMap();
      } else if (Array.isArray(input)) {
        const result = [];
        input.forEach((value) => {
          if (isObjectOrArray(value)) {
            result.push(toMap(value));
          } else {
            result.push(value);
          }
        });
        return result;
      } else if (input instanceof Object) {
        const result = {};
        Object.entries(input).forEach(([key, value]) => {
          if (isObjectOrArray(value)) {
            result[key] = toMap(value);
          } else {
            result[key] = value;
          }
        });
        return result;
      }
    }
    var Client2 = class _Client {
      /**
       * Convert all params of body other than type of readable into content
       * @param input source Model
       * @param output target Model
       * @return void
       */
      static convert(input, output) {
        if (!output) {
          return;
        }
        let inputModel = Object.assign({}, input);
        let constructor = output.constructor;
        let types = constructor.types();
        for (let key of Object.keys(constructor.names())) {
          if (inputModel[key] !== null && inputModel[key] !== void 0) {
            if (isModelClass(types[key])) {
              output[key] = new types[key](output[key]);
              _Client.convert(inputModel[key], output[key]);
            } else if (types[key] && types[key].type === "array") {
              output[key] = inputModel[key].map(function(d) {
                if (isModelClass(types[key].itemType)) {
                  var item = new types[key].itemType({});
                  _Client.convert(d, item);
                  return item;
                }
                return d;
              });
            } else if (types[key] && types[key].type === "map") {
              output[key] = {};
              Object.keys(inputModel[key]).map(function(d) {
                if (isModelClass(types[key].valueType)) {
                  var item = new types[key].valueType({});
                  _Client.convert(inputModel[key][d], item);
                  output[key][d] = item;
                } else {
                  output[key][d] = inputModel[key][d];
                }
              });
            } else {
              output[key] = inputModel[key];
            }
          }
        }
      }
      /**
       * Get the string to be signed according to request
       * @param request  which contains signed messages
       * @return the signed string
       */
      static getStringToSign(request) {
        const method = request.method;
        const accept = request.headers["accept"];
        const contentMD5 = request.headers["content-md5"] || "";
        const contentType = request.headers["content-type"] || "";
        const date = request.headers["date"] || "";
        const header = `${method}
${accept}
${contentMD5}
${contentType}
${date}
`;
        const canonicalizedHeaders = getCanonicalizedHeaders(request.headers);
        const canonicalizedResource = getCanonicalizedResource(request.pathname, request.query);
        return `${header}${canonicalizedHeaders}${canonicalizedResource}`;
      }
      /**
       * Get signature according to stringToSign, secret
       * @param stringToSign  the signed string
       * @param secret accesskey secret
       * @return the signature
       */
      static getROASignature(stringToSign, secret) {
        const utf8Buff = Buffer.from(stringToSign, "utf8");
        return kitx_1.default.sha1(utf8Buff, secret, "base64");
      }
      /**
       * Parse filter into a form string
       * @param filter object
       * @return the string
       */
      static toForm(filter2) {
        if (!filter2) {
          return "";
        }
        let target = {};
        flatMap(target, filter2);
        return tea_util_1.default.toFormString(target);
      }
      /**
       * Get timestamp
       * @return the timestamp string
       */
      static getTimestamp() {
        let date = /* @__PURE__ */ new Date();
        let YYYY = date.getUTCFullYear();
        let MM = kitx_1.default.pad2(date.getUTCMonth() + 1);
        let DD = kitx_1.default.pad2(date.getUTCDate());
        let HH = kitx_1.default.pad2(date.getUTCHours());
        let mm = kitx_1.default.pad2(date.getUTCMinutes());
        let ss = kitx_1.default.pad2(date.getUTCSeconds());
        return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}Z`;
      }
      /**
       * Parse filter into a object which's type is map[string]string
       * @param filter query param
       * @return the object
       */
      static query(filter2) {
        if (!filter2) {
          return {};
        }
        let ret = {};
        flatMap(ret, filter2);
        return ret;
      }
      /**
       * Get signature according to signedParams, method and secret
       * @param signedParams params which need to be signed
       * @param method http method e.g. GET
       * @param secret AccessKeySecret
       * @return the signature
       */
      static getRPCSignature(signedParams, method, secret) {
        var normalized = normalize(signedParams);
        var canonicalized = canonicalize(normalized);
        var stringToSign = `${method}&${encode("/")}&${encode(canonicalized)}`;
        const key = secret + "&";
        return kitx_1.default.sha1(stringToSign, key, "base64");
      }
      /**
       * Parse array into a string with specified style
       * @param array the array
       * @param prefix the prefix string
       * @style specified style e.g. repeatList
       * @return the string
       */
      static arrayToStringWithSpecifiedStyle(array, prefix, style) {
        if (!array) {
          return "";
        }
        if (style === "repeatList") {
          let target = {};
          replaceRepeatList(target, array, prefix);
          return querystring_1.default.stringify(target, "&&");
        } else if (style === "json") {
          return JSON.stringify(toMap(array));
        } else if (style === "simple") {
          return array.join(",");
        } else if (style === "spaceDelimited") {
          return array.join(" ");
        } else if (style === "pipeDelimited") {
          return array.join("|");
        } else {
          return "";
        }
      }
      /**
       * Transform input as map.
       */
      static parseToMap(input) {
        return toMap(input);
      }
      static getEndpoint(endpoint, serverUse, endpointType) {
        if (endpointType == "internal") {
          let strs = endpoint.split(".");
          strs[0] += "-internal";
          endpoint = strs.join(".");
        }
        if (serverUse && endpointType == "accelerate") {
          return "oss-accelerate.aliyuncs.com";
        }
        return endpoint;
      }
      /**
      * Encode raw with base16
      * @param raw encoding data
      * @return encoded string
      */
      static hexEncode(raw) {
        return raw.toString("hex");
      }
      /**
       * Hash the raw data with signatureAlgorithm
       * @param raw hashing data
       * @param signatureAlgorithm the autograph method
       * @return hashed bytes
      */
      static hash(raw, signatureAlgorithm) {
        if (signatureAlgorithm === "ACS3-HMAC-SHA256" || signatureAlgorithm === "ACS3-RSA-SHA256") {
          const obj = crypto_1.default.createHash("sha256");
          obj.update(raw);
          return obj.digest();
        } else if (signatureAlgorithm == "ACS3-HMAC-SM3") {
          const obj = crypto_1.default.createHash("sm3");
          obj.update(raw);
          return obj.digest();
        }
      }
      static signatureMethod(secret, source, signatureAlgorithm) {
        if (signatureAlgorithm === "ACS3-HMAC-SHA256") {
          const obj = crypto_1.default.createHmac("sha256", secret);
          obj.update(source);
          return obj.digest();
        } else if (signatureAlgorithm === "ACS3-HMAC-SM3") {
          const obj = crypto_1.default.createHmac("sm3", secret);
          obj.update(source);
          return obj.digest();
        } else if (signatureAlgorithm === "ACS3-RSA-SHA256") {
          if (!secret.startsWith(PEM_BEGIN)) {
            secret = PEM_BEGIN + secret;
          }
          if (!secret.endsWith(PEM_END)) {
            secret = secret + PEM_END;
          }
          var signerObject = crypto_1.default.createSign("RSA-SHA256");
          signerObject.update(source);
          var signature = signerObject.sign({ key: secret, padding: crypto_1.default.constants.RSA_PKCS1_PADDING });
          return signature;
        }
      }
      /**
       * Get the authorization
       * @param request request params
       * @param signatureAlgorithm the autograph method
       * @param payload the hashed request
       * @param acesskey the acesskey string
       * @param accessKeySecret the accessKeySecret string
       * @return authorization string
       */
      static getAuthorization(request, signatureAlgorithm, payload, acesskey, accessKeySecret) {
        const canonicalURI = (request.pathname || "").replace("+", "%20").replace("*", "%2A").replace("%7E", "~");
        const method = request.method;
        const canonicalQueryString = getAuthorizationQueryString(request.query);
        const tuple = getAuthorizationHeaders(request.headers);
        const canonicalheaders = tuple["canonicalheaders"];
        const signedHeaders = tuple["hsKeys"];
        const canonicalRequest = method + "\n" + canonicalURI + "\n" + canonicalQueryString + "\n" + canonicalheaders + "\n" + signedHeaders.join(";") + "\n" + payload;
        let raw = Buffer.from(canonicalRequest);
        const stringToSign = signatureAlgorithm + "\n" + _Client.hexEncode(_Client.hash(raw, signatureAlgorithm));
        const signature = _Client.hexEncode(_Client.signatureMethod(accessKeySecret, stringToSign, signatureAlgorithm));
        const auth = `${signatureAlgorithm} Credential=${acesskey},SignedHeaders=${signedHeaders.join(";")},Signature=${signature}`;
        return auth;
      }
      static getEncodePath(path2) {
        if (typeof path2 === "undefined" || path2 === null) {
          return "";
        }
        let strs = path2.split("/");
        for (let i = 0; i < strs.length; i++) {
          strs[i] = encode(strs[i]);
        }
        return strs.join("/");
      }
      static getEncodeParam(param) {
        if (typeof param === "undefined" || param === null) {
          return "";
        }
        return encode(param);
      }
    };
    exports.default = Client2;
  }
});

// node_modules/@alicloud/gateway-spi/dist/client.js
var require_client4 = __commonJS({
  "node_modules/@alicloud/gateway-spi/dist/client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InterceptorContextResponse = exports.InterceptorContextConfiguration = exports.InterceptorContextRequest = exports.AttributeMap = exports.InterceptorContext = void 0;
    var credentials_1 = __importDefault(require_client2());
    var $tea = __importStar(require_tea());
    var InterceptorContext = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          request: "request",
          configuration: "configuration",
          response: "response"
        };
      }
      static types() {
        return {
          request: InterceptorContextRequest,
          configuration: InterceptorContextConfiguration,
          response: InterceptorContextResponse
        };
      }
    };
    exports.InterceptorContext = InterceptorContext;
    var AttributeMap = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          attributes: "attributes",
          key: "key"
        };
      }
      static types() {
        return {
          attributes: { "type": "map", "keyType": "string", "valueType": "any" },
          key: { "type": "map", "keyType": "string", "valueType": "string" }
        };
      }
    };
    exports.AttributeMap = AttributeMap;
    var InterceptorContextRequest = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          headers: "headers",
          query: "query",
          body: "body",
          stream: "stream",
          hostMap: "hostMap",
          pathname: "pathname",
          productId: "productId",
          action: "action",
          version: "version",
          protocol: "protocol",
          method: "method",
          authType: "authType",
          bodyType: "bodyType",
          reqBodyType: "reqBodyType",
          style: "style",
          credential: "credential",
          signatureVersion: "signatureVersion",
          signatureAlgorithm: "signatureAlgorithm",
          userAgent: "userAgent"
        };
      }
      static types() {
        return {
          headers: { "type": "map", "keyType": "string", "valueType": "string" },
          query: { "type": "map", "keyType": "string", "valueType": "string" },
          body: "any",
          stream: "Readable",
          hostMap: { "type": "map", "keyType": "string", "valueType": "string" },
          pathname: "string",
          productId: "string",
          action: "string",
          version: "string",
          protocol: "string",
          method: "string",
          authType: "string",
          bodyType: "string",
          reqBodyType: "string",
          style: "string",
          credential: credentials_1.default,
          signatureVersion: "string",
          signatureAlgorithm: "string",
          userAgent: "string"
        };
      }
    };
    exports.InterceptorContextRequest = InterceptorContextRequest;
    var InterceptorContextConfiguration = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          regionId: "regionId",
          endpoint: "endpoint",
          endpointRule: "endpointRule",
          endpointMap: "endpointMap",
          endpointType: "endpointType",
          network: "network",
          suffix: "suffix"
        };
      }
      static types() {
        return {
          regionId: "string",
          endpoint: "string",
          endpointRule: "string",
          endpointMap: { "type": "map", "keyType": "string", "valueType": "string" },
          endpointType: "string",
          network: "string",
          suffix: "string"
        };
      }
    };
    exports.InterceptorContextConfiguration = InterceptorContextConfiguration;
    var InterceptorContextResponse = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          statusCode: "statusCode",
          headers: "headers",
          body: "body",
          deserializedBody: "deserializedBody"
        };
      }
      static types() {
        return {
          statusCode: "number",
          headers: { "type": "map", "keyType": "string", "valueType": "string" },
          body: "Readable",
          deserializedBody: "any"
        };
      }
    };
    exports.InterceptorContextResponse = InterceptorContextResponse;
    var Client2 = class {
      constructor() {
      }
    };
    exports.default = Client2;
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/defaults.js"(exports) {
    (function() {
      exports.defaults = {
        "0.1": {
          explicitCharkey: false,
          trim: true,
          normalize: true,
          normalizeTags: false,
          attrkey: "@",
          charkey: "#",
          explicitArray: false,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: false,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          childkey: "@@",
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          emptyTag: ""
        },
        "0.2": {
          explicitCharkey: false,
          trim: false,
          normalize: false,
          normalizeTags: false,
          attrkey: "$",
          charkey: "_",
          explicitArray: true,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: true,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          preserveChildrenOrder: false,
          childkey: "$$",
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          rootName: "root",
          xmldec: {
            "version": "1.0",
            "encoding": "UTF-8",
            "standalone": true
          },
          doctype: null,
          renderOpts: {
            "pretty": true,
            "indent": "  ",
            "newline": "\n"
          },
          headless: false,
          chunkSize: 1e4,
          emptyTag: "",
          cdata: false
        }
      };
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/Utility.js
var require_Utility = __commonJS({
  "node_modules/xmlbuilder/lib/Utility.js"(exports, module) {
    (function() {
      var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, slice = [].slice, hasProp = {}.hasOwnProperty;
      assign = function() {
        var i, key, len, source, sources, target;
        target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        if (isFunction(Object.assign)) {
          Object.assign.apply(null, arguments);
        } else {
          for (i = 0, len = sources.length; i < len; i++) {
            source = sources[i];
            if (source != null) {
              for (key in source) {
                if (!hasProp.call(source, key)) continue;
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
      isFunction = function(val) {
        return !!val && Object.prototype.toString.call(val) === "[object Function]";
      };
      isObject = function(val) {
        var ref;
        return !!val && ((ref = typeof val) === "function" || ref === "object");
      };
      isArray = function(val) {
        if (isFunction(Array.isArray)) {
          return Array.isArray(val);
        } else {
          return Object.prototype.toString.call(val) === "[object Array]";
        }
      };
      isEmpty = function(val) {
        var key;
        if (isArray(val)) {
          return !val.length;
        } else {
          for (key in val) {
            if (!hasProp.call(val, key)) continue;
            return false;
          }
          return true;
        }
      };
      isPlainObject = function(val) {
        var ctor, proto;
        return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
      };
      getValue = function(obj) {
        if (isFunction(obj.valueOf)) {
          return obj.valueOf();
        } else {
          return obj;
        }
      };
      module.exports.assign = assign;
      module.exports.isFunction = isFunction;
      module.exports.isObject = isObject;
      module.exports.isArray = isArray;
      module.exports.isEmpty = isEmpty;
      module.exports.isPlainObject = isPlainObject;
      module.exports.getValue = getValue;
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMImplementation.js
var require_XMLDOMImplementation = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMImplementation.js"(exports, module) {
    (function() {
      var XMLDOMImplementation;
      module.exports = XMLDOMImplementation = function() {
        function XMLDOMImplementation2() {
        }
        XMLDOMImplementation2.prototype.hasFeature = function(feature, version) {
          return true;
        };
        XMLDOMImplementation2.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.createHTMLDocument = function(title) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLDOMImplementation2.prototype.getFeature = function(feature, version) {
          throw new Error("This DOM method is not implemented.");
        };
        return XMLDOMImplementation2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js
var require_XMLDOMErrorHandler = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js"(exports, module) {
    (function() {
      var XMLDOMErrorHandler;
      module.exports = XMLDOMErrorHandler = function() {
        function XMLDOMErrorHandler2() {
        }
        XMLDOMErrorHandler2.prototype.handleError = function(error) {
          throw new Error(error);
        };
        return XMLDOMErrorHandler2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMStringList.js
var require_XMLDOMStringList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMStringList.js"(exports, module) {
    (function() {
      var XMLDOMStringList;
      module.exports = XMLDOMStringList = function() {
        function XMLDOMStringList2(arr) {
          this.arr = arr || [];
        }
        Object.defineProperty(XMLDOMStringList2.prototype, "length", {
          get: function() {
            return this.arr.length;
          }
        });
        XMLDOMStringList2.prototype.item = function(index) {
          return this.arr[index] || null;
        };
        XMLDOMStringList2.prototype.contains = function(str) {
          return this.arr.indexOf(str) !== -1;
        };
        return XMLDOMStringList2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDOMConfiguration.js
var require_XMLDOMConfiguration = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDOMConfiguration.js"(exports, module) {
    (function() {
      var XMLDOMConfiguration, XMLDOMErrorHandler, XMLDOMStringList;
      XMLDOMErrorHandler = require_XMLDOMErrorHandler();
      XMLDOMStringList = require_XMLDOMStringList();
      module.exports = XMLDOMConfiguration = function() {
        function XMLDOMConfiguration2() {
          var clonedSelf;
          this.defaultParams = {
            "canonical-form": false,
            "cdata-sections": false,
            "comments": false,
            "datatype-normalization": false,
            "element-content-whitespace": true,
            "entities": true,
            "error-handler": new XMLDOMErrorHandler(),
            "infoset": true,
            "validate-if-schema": false,
            "namespaces": true,
            "namespace-declarations": true,
            "normalize-characters": false,
            "schema-location": "",
            "schema-type": "",
            "split-cdata-sections": true,
            "validate": false,
            "well-formed": true
          };
          this.params = clonedSelf = Object.create(this.defaultParams);
        }
        Object.defineProperty(XMLDOMConfiguration2.prototype, "parameterNames", {
          get: function() {
            return new XMLDOMStringList(Object.keys(this.defaultParams));
          }
        });
        XMLDOMConfiguration2.prototype.getParameter = function(name) {
          if (this.params.hasOwnProperty(name)) {
            return this.params[name];
          } else {
            return null;
          }
        };
        XMLDOMConfiguration2.prototype.canSetParameter = function(name, value) {
          return true;
        };
        XMLDOMConfiguration2.prototype.setParameter = function(name, value) {
          if (value != null) {
            return this.params[name] = value;
          } else {
            return delete this.params[name];
          }
        };
        return XMLDOMConfiguration2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/NodeType.js
var require_NodeType = __commonJS({
  "node_modules/xmlbuilder/lib/NodeType.js"(exports, module) {
    (function() {
      module.exports = {
        Element: 1,
        Attribute: 2,
        Text: 3,
        CData: 4,
        EntityReference: 5,
        EntityDeclaration: 6,
        ProcessingInstruction: 7,
        Comment: 8,
        Document: 9,
        DocType: 10,
        DocumentFragment: 11,
        NotationDeclaration: 12,
        Declaration: 201,
        Raw: 202,
        AttributeDeclaration: 203,
        ElementDeclaration: 204,
        Dummy: 205
      };
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLAttribute.js
var require_XMLAttribute = __commonJS({
  "node_modules/xmlbuilder/lib/XMLAttribute.js"(exports, module) {
    (function() {
      var NodeType, XMLAttribute, XMLNode;
      NodeType = require_NodeType();
      XMLNode = require_XMLNode();
      module.exports = XMLAttribute = function() {
        function XMLAttribute2(parent, name, value) {
          this.parent = parent;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.value = this.stringify.attValue(value);
          this.type = NodeType.Attribute;
          this.isId = false;
          this.schemaTypeInfo = null;
        }
        Object.defineProperty(XMLAttribute2.prototype, "nodeType", {
          get: function() {
            return this.type;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "ownerElement", {
          get: function() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "textContent", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "namespaceURI", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "prefix", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "localName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLAttribute2.prototype, "specified", {
          get: function() {
            return true;
          }
        });
        XMLAttribute2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLAttribute2.prototype.toString = function(options) {
          return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
        };
        XMLAttribute2.prototype.debugInfo = function(name) {
          name = name || this.name;
          if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else {
            return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
          }
        };
        XMLAttribute2.prototype.isEqualNode = function(node) {
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.value !== this.value) {
            return false;
          }
          return true;
        };
        return XMLAttribute2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLNamedNodeMap.js
var require_XMLNamedNodeMap = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNamedNodeMap.js"(exports, module) {
    (function() {
      var XMLNamedNodeMap;
      module.exports = XMLNamedNodeMap = function() {
        function XMLNamedNodeMap2(nodes) {
          this.nodes = nodes;
        }
        Object.defineProperty(XMLNamedNodeMap2.prototype, "length", {
          get: function() {
            return Object.keys(this.nodes).length || 0;
          }
        });
        XMLNamedNodeMap2.prototype.clone = function() {
          return this.nodes = null;
        };
        XMLNamedNodeMap2.prototype.getNamedItem = function(name) {
          return this.nodes[name];
        };
        XMLNamedNodeMap2.prototype.setNamedItem = function(node) {
          var oldNode;
          oldNode = this.nodes[node.nodeName];
          this.nodes[node.nodeName] = node;
          return oldNode || null;
        };
        XMLNamedNodeMap2.prototype.removeNamedItem = function(name) {
          var oldNode;
          oldNode = this.nodes[name];
          delete this.nodes[name];
          return oldNode || null;
        };
        XMLNamedNodeMap2.prototype.item = function(index) {
          return this.nodes[Object.keys(this.nodes)[index]] || null;
        };
        XMLNamedNodeMap2.prototype.getNamedItemNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLNamedNodeMap2.prototype.setNamedItemNS = function(node) {
          throw new Error("This DOM method is not implemented.");
        };
        XMLNamedNodeMap2.prototype.removeNamedItemNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };
        return XMLNamedNodeMap2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLElement.js
var require_XMLElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLElement.js"(exports, module) {
    (function() {
      var NodeType, XMLAttribute, XMLElement, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, ref, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      ref = require_Utility(), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLAttribute = require_XMLAttribute();
      XMLNamedNodeMap = require_XMLNamedNodeMap();
      module.exports = XMLElement = function(superClass) {
        extend(XMLElement2, superClass);
        function XMLElement2(parent, name, attributes) {
          var child, j, len, ref1;
          XMLElement2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing element name. " + this.debugInfo());
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.Element;
          this.attribs = {};
          this.schemaTypeInfo = null;
          if (attributes != null) {
            this.attribute(attributes);
          }
          if (parent.type === NodeType.Document) {
            this.isRoot = true;
            this.documentObject = parent;
            parent.rootObject = this;
            if (parent.children) {
              ref1 = parent.children;
              for (j = 0, len = ref1.length; j < len; j++) {
                child = ref1[j];
                if (child.type === NodeType.DocType) {
                  child.name = this.name;
                  break;
                }
              }
            }
          }
        }
        Object.defineProperty(XMLElement2.prototype, "tagName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement2.prototype, "namespaceURI", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLElement2.prototype, "prefix", {
          get: function() {
            return "";
          }
        });
        Object.defineProperty(XMLElement2.prototype, "localName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement2.prototype, "id", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "className", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "classList", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement2.prototype, "attributes", {
          get: function() {
            if (!this.attributeMap || !this.attributeMap.nodes) {
              this.attributeMap = new XMLNamedNodeMap(this.attribs);
            }
            return this.attributeMap;
          }
        });
        XMLElement2.prototype.clone = function() {
          var att, attName, clonedSelf, ref1;
          clonedSelf = Object.create(this);
          if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
          }
          clonedSelf.attribs = {};
          ref1 = this.attribs;
          for (attName in ref1) {
            if (!hasProp.call(ref1, attName)) continue;
            att = ref1[attName];
            clonedSelf.attribs[attName] = att.clone();
          }
          clonedSelf.children = [];
          this.children.forEach(function(child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
          });
          return clonedSelf;
        };
        XMLElement2.prototype.attribute = function(name, value) {
          var attName, attValue;
          if (name != null) {
            name = getValue(name);
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName)) continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (this.options.keepNullAttributes && value == null) {
              this.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.attribs[name] = new XMLAttribute(this, name, value);
            }
          }
          return this;
        };
        XMLElement2.prototype.removeAttribute = function(name) {
          var attName, j, len;
          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo());
          }
          name = getValue(name);
          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              attName = name[j];
              delete this.attribs[attName];
            }
          } else {
            delete this.attribs[name];
          }
          return this;
        };
        XMLElement2.prototype.toString = function(options) {
          return this.options.writer.element(this, this.options.writer.filterOptions(options));
        };
        XMLElement2.prototype.att = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.a = function(name, value) {
          return this.attribute(name, value);
        };
        XMLElement2.prototype.getAttribute = function(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].value;
          } else {
            return null;
          }
        };
        XMLElement2.prototype.setAttribute = function(name, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNode = function(name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name];
          } else {
            return null;
          }
        };
        XMLElement2.prototype.setAttributeNode = function(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.removeAttributeNode = function(oldAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagName = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.removeAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setAttributeNodeNS = function(newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.hasAttribute = function(name) {
          return this.attribs.hasOwnProperty(name);
        };
        XMLElement2.prototype.hasAttributeNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setIdAttribute = function(name, isId) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].isId;
          } else {
            return isId;
          }
        };
        XMLElement2.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.setIdAttributeNode = function(idAttr, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagName = function(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.getElementsByClassName = function(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLElement2.prototype.isEqualNode = function(node) {
          var i, j, ref1;
          if (!XMLElement2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }
          if (node.prefix !== this.prefix) {
            return false;
          }
          if (node.localName !== this.localName) {
            return false;
          }
          if (node.attribs.length !== this.attribs.length) {
            return false;
          }
          for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
            if (!this.attribs[i].isEqualNode(node.attribs[i])) {
              return false;
            }
          }
          return true;
        };
        return XMLElement2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLCharacterData.js
var require_XMLCharacterData = __commonJS({
  "node_modules/xmlbuilder/lib/XMLCharacterData.js"(exports, module) {
    (function() {
      var XMLCharacterData, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      module.exports = XMLCharacterData = function(superClass) {
        extend(XMLCharacterData2, superClass);
        function XMLCharacterData2(parent) {
          XMLCharacterData2.__super__.constructor.call(this, parent);
          this.value = "";
        }
        Object.defineProperty(XMLCharacterData2.prototype, "data", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        Object.defineProperty(XMLCharacterData2.prototype, "length", {
          get: function() {
            return this.value.length;
          }
        });
        Object.defineProperty(XMLCharacterData2.prototype, "textContent", {
          get: function() {
            return this.value;
          },
          set: function(value) {
            return this.value = value || "";
          }
        });
        XMLCharacterData2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLCharacterData2.prototype.substringData = function(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.appendData = function(arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.insertData = function(offset, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.deleteData = function(offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.replaceData = function(offset, count, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLCharacterData2.prototype.isEqualNode = function(node) {
          if (!XMLCharacterData2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.data !== this.data) {
            return false;
          }
          return true;
        };
        return XMLCharacterData2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLCData.js
var require_XMLCData = __commonJS({
  "node_modules/xmlbuilder/lib/XMLCData.js"(exports, module) {
    (function() {
      var NodeType, XMLCData, XMLCharacterData, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module.exports = XMLCData = function(superClass) {
        extend(XMLCData2, superClass);
        function XMLCData2(parent, text) {
          XMLCData2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing CDATA text. " + this.debugInfo());
          }
          this.name = "#cdata-section";
          this.type = NodeType.CData;
          this.value = this.stringify.cdata(text);
        }
        XMLCData2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLCData2.prototype.toString = function(options) {
          return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
        };
        return XMLCData2;
      }(XMLCharacterData);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLComment.js
var require_XMLComment = __commonJS({
  "node_modules/xmlbuilder/lib/XMLComment.js"(exports, module) {
    (function() {
      var NodeType, XMLCharacterData, XMLComment, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module.exports = XMLComment = function(superClass) {
        extend(XMLComment2, superClass);
        function XMLComment2(parent, text) {
          XMLComment2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing comment text. " + this.debugInfo());
          }
          this.name = "#comment";
          this.type = NodeType.Comment;
          this.value = this.stringify.comment(text);
        }
        XMLComment2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLComment2.prototype.toString = function(options) {
          return this.options.writer.comment(this, this.options.writer.filterOptions(options));
        };
        return XMLComment2;
      }(XMLCharacterData);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDeclaration.js
var require_XMLDeclaration = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDeclaration.js"(exports, module) {
    (function() {
      var NodeType, XMLDeclaration, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDeclaration = function(superClass) {
        extend(XMLDeclaration2, superClass);
        function XMLDeclaration2(parent, version, encoding, standalone) {
          var ref;
          XMLDeclaration2.__super__.constructor.call(this, parent);
          if (isObject(version)) {
            ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
          }
          if (!version) {
            version = "1.0";
          }
          this.type = NodeType.Declaration;
          this.version = this.stringify.xmlVersion(version);
          if (encoding != null) {
            this.encoding = this.stringify.xmlEncoding(encoding);
          }
          if (standalone != null) {
            this.standalone = this.stringify.xmlStandalone(standalone);
          }
        }
        XMLDeclaration2.prototype.toString = function(options) {
          return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
        };
        return XMLDeclaration2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDAttList.js
var require_XMLDTDAttList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDAttList.js"(exports, module) {
    (function() {
      var NodeType, XMLDTDAttList, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDTDAttList = function(superClass) {
        extend(XMLDTDAttList2, superClass);
        function XMLDTDAttList2(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          XMLDTDAttList2.__super__.constructor.call(this, parent);
          if (elementName == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }
          if (attributeName == null) {
            throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
          }
          if (!attributeType) {
            throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
          }
          if (!defaultValueType) {
            throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
          }
          if (defaultValueType.indexOf("#") !== 0) {
            defaultValueType = "#" + defaultValueType;
          }
          if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
            throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }
          if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
            throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }
          this.elementName = this.stringify.name(elementName);
          this.type = NodeType.AttributeDeclaration;
          this.attributeName = this.stringify.name(attributeName);
          this.attributeType = this.stringify.dtdAttType(attributeType);
          if (defaultValue) {
            this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
          }
          this.defaultValueType = defaultValueType;
        }
        XMLDTDAttList2.prototype.toString = function(options) {
          return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDAttList2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDEntity.js
var require_XMLDTDEntity = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDEntity.js"(exports, module) {
    (function() {
      var NodeType, XMLDTDEntity, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDTDEntity = function(superClass) {
        extend(XMLDTDEntity2, superClass);
        function XMLDTDEntity2(parent, pe, name, value) {
          XMLDTDEntity2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD entity name. " + this.debugInfo(name));
          }
          if (value == null) {
            throw new Error("Missing DTD entity value. " + this.debugInfo(name));
          }
          this.pe = !!pe;
          this.name = this.stringify.name(name);
          this.type = NodeType.EntityDeclaration;
          if (!isObject(value)) {
            this.value = this.stringify.dtdEntityValue(value);
            this.internal = true;
          } else {
            if (!value.pubID && !value.sysID) {
              throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
            }
            if (value.pubID && !value.sysID) {
              throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
            }
            this.internal = false;
            if (value.pubID != null) {
              this.pubID = this.stringify.dtdPubID(value.pubID);
            }
            if (value.sysID != null) {
              this.sysID = this.stringify.dtdSysID(value.sysID);
            }
            if (value.nData != null) {
              this.nData = this.stringify.dtdNData(value.nData);
            }
            if (this.pe && this.nData) {
              throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
            }
          }
        }
        Object.defineProperty(XMLDTDEntity2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "notationName", {
          get: function() {
            return this.nData || null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "inputEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "xmlEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity2.prototype, "xmlVersion", {
          get: function() {
            return null;
          }
        });
        XMLDTDEntity2.prototype.toString = function(options) {
          return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDEntity2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDElement.js
var require_XMLDTDElement = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDElement.js"(exports, module) {
    (function() {
      var NodeType, XMLDTDElement, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDTDElement = function(superClass) {
        extend(XMLDTDElement2, superClass);
        function XMLDTDElement2(parent, name, value) {
          XMLDTDElement2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }
          if (!value) {
            value = "(#PCDATA)";
          }
          if (Array.isArray(value)) {
            value = "(" + value.join(",") + ")";
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.ElementDeclaration;
          this.value = this.stringify.dtdElementValue(value);
        }
        XMLDTDElement2.prototype.toString = function(options) {
          return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDElement2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDTDNotation.js
var require_XMLDTDNotation = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDTDNotation.js"(exports, module) {
    (function() {
      var NodeType, XMLDTDNotation, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDTDNotation = function(superClass) {
        extend(XMLDTDNotation2, superClass);
        function XMLDTDNotation2(parent, name, value) {
          XMLDTDNotation2.__super__.constructor.call(this, parent);
          if (name == null) {
            throw new Error("Missing DTD notation name. " + this.debugInfo(name));
          }
          if (!value.pubID && !value.sysID) {
            throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
          }
          this.name = this.stringify.name(name);
          this.type = NodeType.NotationDeclaration;
          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }
          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
        }
        Object.defineProperty(XMLDTDNotation2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDNotation2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        XMLDTDNotation2.prototype.toString = function(options) {
          return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
        };
        return XMLDTDNotation2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDocType.js
var require_XMLDocType = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocType.js"(exports, module) {
    (function() {
      var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNamedNodeMap, XMLNode, isObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isObject = require_Utility().isObject;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDNotation = require_XMLDTDNotation();
      XMLNamedNodeMap = require_XMLNamedNodeMap();
      module.exports = XMLDocType = function(superClass) {
        extend(XMLDocType2, superClass);
        function XMLDocType2(parent, pubID, sysID) {
          var child, i, len, ref, ref1, ref2;
          XMLDocType2.__super__.constructor.call(this, parent);
          this.type = NodeType.DocType;
          if (parent.children) {
            ref = parent.children;
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              if (child.type === NodeType.Element) {
                this.name = child.name;
                break;
              }
            }
          }
          this.documentObject = parent;
          if (isObject(pubID)) {
            ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
          }
          if (sysID == null) {
            ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
          }
          if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
          }
          if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
          }
        }
        Object.defineProperty(XMLDocType2.prototype, "entities", {
          get: function() {
            var child, i, len, nodes, ref;
            nodes = {};
            ref = this.children;
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              if (child.type === NodeType.EntityDeclaration && !child.pe) {
                nodes[child.name] = child;
              }
            }
            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "notations", {
          get: function() {
            var child, i, len, nodes, ref;
            nodes = {};
            ref = this.children;
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              if (child.type === NodeType.NotationDeclaration) {
                nodes[child.name] = child;
              }
            }
            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "publicId", {
          get: function() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "systemId", {
          get: function() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDocType2.prototype, "internalSubset", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        XMLDocType2.prototype.element = function(name, value) {
          var child;
          child = new XMLDTDElement(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var child;
          child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.entity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, false, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.pEntity = function(name, value) {
          var child;
          child = new XMLDTDEntity(this, true, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.notation = function(name, value) {
          var child;
          child = new XMLDTDNotation(this, name, value);
          this.children.push(child);
          return this;
        };
        XMLDocType2.prototype.toString = function(options) {
          return this.options.writer.docType(this, this.options.writer.filterOptions(options));
        };
        XMLDocType2.prototype.ele = function(name, value) {
          return this.element(name, value);
        };
        XMLDocType2.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        };
        XMLDocType2.prototype.ent = function(name, value) {
          return this.entity(name, value);
        };
        XMLDocType2.prototype.pent = function(name, value) {
          return this.pEntity(name, value);
        };
        XMLDocType2.prototype.not = function(name, value) {
          return this.notation(name, value);
        };
        XMLDocType2.prototype.up = function() {
          return this.root() || this.documentObject;
        };
        XMLDocType2.prototype.isEqualNode = function(node) {
          if (!XMLDocType2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.name !== this.name) {
            return false;
          }
          if (node.publicId !== this.publicId) {
            return false;
          }
          if (node.systemId !== this.systemId) {
            return false;
          }
          return true;
        };
        return XMLDocType2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLRaw.js
var require_XMLRaw = __commonJS({
  "node_modules/xmlbuilder/lib/XMLRaw.js"(exports, module) {
    (function() {
      var NodeType, XMLNode, XMLRaw, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLNode = require_XMLNode();
      module.exports = XMLRaw = function(superClass) {
        extend(XMLRaw2, superClass);
        function XMLRaw2(parent, text) {
          XMLRaw2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing raw text. " + this.debugInfo());
          }
          this.type = NodeType.Raw;
          this.value = this.stringify.raw(text);
        }
        XMLRaw2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLRaw2.prototype.toString = function(options) {
          return this.options.writer.raw(this, this.options.writer.filterOptions(options));
        };
        return XMLRaw2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLText.js
var require_XMLText = __commonJS({
  "node_modules/xmlbuilder/lib/XMLText.js"(exports, module) {
    (function() {
      var NodeType, XMLCharacterData, XMLText, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module.exports = XMLText = function(superClass) {
        extend(XMLText2, superClass);
        function XMLText2(parent, text) {
          XMLText2.__super__.constructor.call(this, parent);
          if (text == null) {
            throw new Error("Missing element text. " + this.debugInfo());
          }
          this.name = "#text";
          this.type = NodeType.Text;
          this.value = this.stringify.text(text);
        }
        Object.defineProperty(XMLText2.prototype, "isElementContentWhitespace", {
          get: function() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLText2.prototype, "wholeText", {
          get: function() {
            var next, prev, str;
            str = "";
            prev = this.previousSibling;
            while (prev) {
              str = prev.data + str;
              prev = prev.previousSibling;
            }
            str += this.data;
            next = this.nextSibling;
            while (next) {
              str = str + next.data;
              next = next.nextSibling;
            }
            return str;
          }
        });
        XMLText2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLText2.prototype.toString = function(options) {
          return this.options.writer.text(this, this.options.writer.filterOptions(options));
        };
        XMLText2.prototype.splitText = function(offset) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLText2.prototype.replaceWholeText = function(content) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        return XMLText2;
      }(XMLCharacterData);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLProcessingInstruction.js
var require_XMLProcessingInstruction = __commonJS({
  "node_modules/xmlbuilder/lib/XMLProcessingInstruction.js"(exports, module) {
    (function() {
      var NodeType, XMLCharacterData, XMLProcessingInstruction, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLCharacterData = require_XMLCharacterData();
      module.exports = XMLProcessingInstruction = function(superClass) {
        extend(XMLProcessingInstruction2, superClass);
        function XMLProcessingInstruction2(parent, target, value) {
          XMLProcessingInstruction2.__super__.constructor.call(this, parent);
          if (target == null) {
            throw new Error("Missing instruction target. " + this.debugInfo());
          }
          this.type = NodeType.ProcessingInstruction;
          this.target = this.stringify.insTarget(target);
          this.name = this.target;
          if (value) {
            this.value = this.stringify.insValue(value);
          }
        }
        XMLProcessingInstruction2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLProcessingInstruction2.prototype.toString = function(options) {
          return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
        };
        XMLProcessingInstruction2.prototype.isEqualNode = function(node) {
          if (!XMLProcessingInstruction2.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }
          if (node.target !== this.target) {
            return false;
          }
          return true;
        };
        return XMLProcessingInstruction2;
      }(XMLCharacterData);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDummy.js
var require_XMLDummy = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDummy.js"(exports, module) {
    (function() {
      var NodeType, XMLDummy, XMLNode, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      module.exports = XMLDummy = function(superClass) {
        extend(XMLDummy2, superClass);
        function XMLDummy2(parent) {
          XMLDummy2.__super__.constructor.call(this, parent);
          this.type = NodeType.Dummy;
        }
        XMLDummy2.prototype.clone = function() {
          return Object.create(this);
        };
        XMLDummy2.prototype.toString = function(options) {
          return "";
        };
        return XMLDummy2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLNodeList.js
var require_XMLNodeList = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNodeList.js"(exports, module) {
    (function() {
      var XMLNodeList;
      module.exports = XMLNodeList = function() {
        function XMLNodeList2(nodes) {
          this.nodes = nodes;
        }
        Object.defineProperty(XMLNodeList2.prototype, "length", {
          get: function() {
            return this.nodes.length || 0;
          }
        });
        XMLNodeList2.prototype.clone = function() {
          return this.nodes = null;
        };
        XMLNodeList2.prototype.item = function(index) {
          return this.nodes[index] || null;
        };
        return XMLNodeList2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/DocumentPosition.js
var require_DocumentPosition = __commonJS({
  "node_modules/xmlbuilder/lib/DocumentPosition.js"(exports, module) {
    (function() {
      module.exports = {
        Disconnected: 1,
        Preceding: 2,
        Following: 4,
        Contains: 8,
        ContainedBy: 16,
        ImplementationSpecific: 32
      };
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLNode.js
var require_XMLNode = __commonJS({
  "node_modules/xmlbuilder/lib/XMLNode.js"(exports, module) {
    (function() {
      var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNamedNodeMap, XMLNode, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref1, hasProp = {}.hasOwnProperty;
      ref1 = require_Utility(), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
      XMLElement = null;
      XMLCData = null;
      XMLComment = null;
      XMLDeclaration = null;
      XMLDocType = null;
      XMLRaw = null;
      XMLText = null;
      XMLProcessingInstruction = null;
      XMLDummy = null;
      NodeType = null;
      XMLNodeList = null;
      XMLNamedNodeMap = null;
      DocumentPosition = null;
      module.exports = XMLNode = function() {
        function XMLNode2(parent1) {
          this.parent = parent1;
          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }
          this.value = null;
          this.children = [];
          this.baseURI = null;
          if (!XMLElement) {
            XMLElement = require_XMLElement();
            XMLCData = require_XMLCData();
            XMLComment = require_XMLComment();
            XMLDeclaration = require_XMLDeclaration();
            XMLDocType = require_XMLDocType();
            XMLRaw = require_XMLRaw();
            XMLText = require_XMLText();
            XMLProcessingInstruction = require_XMLProcessingInstruction();
            XMLDummy = require_XMLDummy();
            NodeType = require_NodeType();
            XMLNodeList = require_XMLNodeList();
            XMLNamedNodeMap = require_XMLNamedNodeMap();
            DocumentPosition = require_DocumentPosition();
          }
        }
        Object.defineProperty(XMLNode2.prototype, "nodeName", {
          get: function() {
            return this.name;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nodeType", {
          get: function() {
            return this.type;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nodeValue", {
          get: function() {
            return this.value;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "parentNode", {
          get: function() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "childNodes", {
          get: function() {
            if (!this.childNodeList || !this.childNodeList.nodes) {
              this.childNodeList = new XMLNodeList(this.children);
            }
            return this.childNodeList;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "firstChild", {
          get: function() {
            return this.children[0] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "lastChild", {
          get: function() {
            return this.children[this.children.length - 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "previousSibling", {
          get: function() {
            var i;
            i = this.parent.children.indexOf(this);
            return this.parent.children[i - 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "nextSibling", {
          get: function() {
            var i;
            i = this.parent.children.indexOf(this);
            return this.parent.children[i + 1] || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "ownerDocument", {
          get: function() {
            return this.document() || null;
          }
        });
        Object.defineProperty(XMLNode2.prototype, "textContent", {
          get: function() {
            var child, j, len, ref2, str;
            if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
              str = "";
              ref2 = this.children;
              for (j = 0, len = ref2.length; j < len; j++) {
                child = ref2[j];
                if (child.textContent) {
                  str += child.textContent;
                }
              }
              return str;
            } else {
              return null;
            }
          },
          set: function(value) {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        XMLNode2.prototype.setParent = function(parent) {
          var child, j, len, ref2, results;
          this.parent = parent;
          if (parent) {
            this.options = parent.options;
            this.stringify = parent.stringify;
          }
          ref2 = this.children;
          results = [];
          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            results.push(child.setParent(this));
          }
          return results;
        };
        XMLNode2.prototype.element = function(name, attributes, text) {
          var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
          lastChild = null;
          if (attributes === null && text == null) {
            ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
          }
          if (attributes == null) {
            attributes = {};
          }
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
          }
          if (name != null) {
            name = getValue(name);
          }
          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              item = name[j];
              lastChild = this.element(item);
            }
          } else if (isFunction(name)) {
            lastChild = this.element(name.apply());
          } else if (isObject(name)) {
            for (key in name) {
              if (!hasProp.call(name, key)) continue;
              val = name[key];
              if (isFunction(val)) {
                val = val.apply();
              }
              if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
              } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
                lastChild = this.dummy();
              } else if (isObject(val) && isEmpty(val)) {
                lastChild = this.element(key);
              } else if (!this.options.keepNullNodes && val == null) {
                lastChild = this.dummy();
              } else if (!this.options.separateArrayItems && Array.isArray(val)) {
                for (k = 0, len1 = val.length; k < len1; k++) {
                  item = val[k];
                  childNode = {};
                  childNode[key] = item;
                  lastChild = this.element(childNode);
                }
              } else if (isObject(val)) {
                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                  lastChild = this.element(val);
                } else {
                  lastChild = this.element(key);
                  lastChild.element(val);
                }
              } else {
                lastChild = this.element(key, val);
              }
            }
          } else if (!this.options.keepNullNodes && text === null) {
            lastChild = this.dummy();
          } else {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.text(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
              lastChild = this.cdata(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
              lastChild = this.comment(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
              lastChild = this.raw(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
              lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
            } else {
              lastChild = this.node(name, attributes, text);
            }
          }
          if (lastChild == null) {
            throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
          }
          return lastChild;
        };
        XMLNode2.prototype.insertBefore = function(name, attributes, text) {
          var child, i, newChild, refChild, removed;
          if (name != null ? name.type : void 0) {
            newChild = name;
            refChild = attributes;
            newChild.setParent(this);
            if (refChild) {
              i = children.indexOf(refChild);
              removed = children.splice(i);
              children.push(newChild);
              Array.prototype.push.apply(children, removed);
            } else {
              children.push(newChild);
            }
            return newChild;
          } else {
            if (this.isRoot) {
              throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
          }
        };
        XMLNode2.prototype.insertAfter = function(name, attributes, text) {
          var child, i, removed;
          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        };
        XMLNode2.prototype.remove = function() {
          var i, ref2;
          if (this.isRoot) {
            throw new Error("Cannot remove the root element. " + this.debugInfo());
          }
          i = this.parent.children.indexOf(this);
          [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref2 = [])), ref2;
          return this.parent;
        };
        XMLNode2.prototype.node = function(name, attributes, text) {
          var child, ref2;
          if (name != null) {
            name = getValue(name);
          }
          attributes || (attributes = {});
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
          }
          child = new XMLElement(this, name, attributes);
          if (text != null) {
            child.text(text);
          }
          this.children.push(child);
          return child;
        };
        XMLNode2.prototype.text = function(value) {
          var child;
          if (isObject(value)) {
            this.element(value);
          }
          child = new XMLText(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.cdata = function(value) {
          var child;
          child = new XMLCData(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.comment = function(value) {
          var child;
          child = new XMLComment(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.commentBefore = function(value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.commentAfter = function(value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.raw = function(value) {
          var child;
          child = new XMLRaw(this, value);
          this.children.push(child);
          return this;
        };
        XMLNode2.prototype.dummy = function() {
          var child;
          child = new XMLDummy(this);
          return child;
        };
        XMLNode2.prototype.instruction = function(target, value) {
          var insTarget, insValue, instruction, j, len;
          if (target != null) {
            target = getValue(target);
          }
          if (value != null) {
            value = getValue(value);
          }
          if (Array.isArray(target)) {
            for (j = 0, len = target.length; j < len; j++) {
              insTarget = target[j];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget)) continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            instruction = new XMLProcessingInstruction(this, target, value);
            this.children.push(instruction);
          }
          return this;
        };
        XMLNode2.prototype.instructionBefore = function(target, value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.instructionAfter = function(target, value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };
        XMLNode2.prototype.declaration = function(version, encoding, standalone) {
          var doc, xmldec;
          doc = this.document();
          xmldec = new XMLDeclaration(doc, version, encoding, standalone);
          if (doc.children.length === 0) {
            doc.children.unshift(xmldec);
          } else if (doc.children[0].type === NodeType.Declaration) {
            doc.children[0] = xmldec;
          } else {
            doc.children.unshift(xmldec);
          }
          return doc.root() || doc;
        };
        XMLNode2.prototype.dtd = function(pubID, sysID) {
          var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
          doc = this.document();
          doctype = new XMLDocType(doc, pubID, sysID);
          ref2 = doc.children;
          for (i = j = 0, len = ref2.length; j < len; i = ++j) {
            child = ref2[i];
            if (child.type === NodeType.DocType) {
              doc.children[i] = doctype;
              return doctype;
            }
          }
          ref3 = doc.children;
          for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
            child = ref3[i];
            if (child.isRoot) {
              doc.children.splice(i, 0, doctype);
              return doctype;
            }
          }
          doc.children.push(doctype);
          return doctype;
        };
        XMLNode2.prototype.up = function() {
          if (this.isRoot) {
            throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
          }
          return this.parent;
        };
        XMLNode2.prototype.root = function() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType.Document) {
              return node.rootObject;
            } else if (node.isRoot) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };
        XMLNode2.prototype.document = function() {
          var node;
          node = this;
          while (node) {
            if (node.type === NodeType.Document) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };
        XMLNode2.prototype.end = function(options) {
          return this.document().end(options);
        };
        XMLNode2.prototype.prev = function() {
          var i;
          i = this.parent.children.indexOf(this);
          if (i < 1) {
            throw new Error("Already at the first node. " + this.debugInfo());
          }
          return this.parent.children[i - 1];
        };
        XMLNode2.prototype.next = function() {
          var i;
          i = this.parent.children.indexOf(this);
          if (i === -1 || i === this.parent.children.length - 1) {
            throw new Error("Already at the last node. " + this.debugInfo());
          }
          return this.parent.children[i + 1];
        };
        XMLNode2.prototype.importDocument = function(doc) {
          var clonedRoot;
          clonedRoot = doc.root().clone();
          clonedRoot.parent = this;
          clonedRoot.isRoot = false;
          this.children.push(clonedRoot);
          return this;
        };
        XMLNode2.prototype.debugInfo = function(name) {
          var ref2, ref3;
          name = name || this.name;
          if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
            return "";
          } else if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
            return "node: <" + name + ">";
          } else {
            return "node: <" + name + ">, parent: <" + this.parent.name + ">";
          }
        };
        XMLNode2.prototype.ele = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.nod = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.txt = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLNode2.prototype.doc = function() {
          return this.document();
        };
        XMLNode2.prototype.dec = function(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };
        XMLNode2.prototype.e = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLNode2.prototype.n = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLNode2.prototype.t = function(value) {
          return this.text(value);
        };
        XMLNode2.prototype.d = function(value) {
          return this.cdata(value);
        };
        XMLNode2.prototype.c = function(value) {
          return this.comment(value);
        };
        XMLNode2.prototype.r = function(value) {
          return this.raw(value);
        };
        XMLNode2.prototype.i = function(target, value) {
          return this.instruction(target, value);
        };
        XMLNode2.prototype.u = function() {
          return this.up();
        };
        XMLNode2.prototype.importXMLBuilder = function(doc) {
          return this.importDocument(doc);
        };
        XMLNode2.prototype.replaceChild = function(newChild, oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.removeChild = function(oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.appendChild = function(newChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.hasChildNodes = function() {
          return this.children.length !== 0;
        };
        XMLNode2.prototype.cloneNode = function(deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.normalize = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isSupported = function(feature, version) {
          return true;
        };
        XMLNode2.prototype.hasAttributes = function() {
          return this.attribs.length !== 0;
        };
        XMLNode2.prototype.compareDocumentPosition = function(other) {
          var ref, res;
          ref = this;
          if (ref === other) {
            return 0;
          } else if (this.document() !== other.document()) {
            res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
            if (Math.random() < 0.5) {
              res |= DocumentPosition.Preceding;
            } else {
              res |= DocumentPosition.Following;
            }
            return res;
          } else if (ref.isAncestor(other)) {
            return DocumentPosition.Contains | DocumentPosition.Preceding;
          } else if (ref.isDescendant(other)) {
            return DocumentPosition.Contains | DocumentPosition.Following;
          } else if (ref.isPreceding(other)) {
            return DocumentPosition.Preceding;
          } else {
            return DocumentPosition.Following;
          }
        };
        XMLNode2.prototype.isSameNode = function(other) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.lookupPrefix = function(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isDefaultNamespace = function(namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.lookupNamespaceURI = function(prefix) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.isEqualNode = function(node) {
          var i, j, ref2;
          if (node.nodeType !== this.nodeType) {
            return false;
          }
          if (node.children.length !== this.children.length) {
            return false;
          }
          for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
            if (!this.children[i].isEqualNode(node.children[i])) {
              return false;
            }
          }
          return true;
        };
        XMLNode2.prototype.getFeature = function(feature, version) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.setUserData = function(key, data, handler) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.getUserData = function(key) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLNode2.prototype.contains = function(other) {
          if (!other) {
            return false;
          }
          return other === this || this.isDescendant(other);
        };
        XMLNode2.prototype.isDescendant = function(node) {
          var child, isDescendantChild, j, len, ref2;
          ref2 = this.children;
          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            if (node === child) {
              return true;
            }
            isDescendantChild = child.isDescendant(node);
            if (isDescendantChild) {
              return true;
            }
          }
          return false;
        };
        XMLNode2.prototype.isAncestor = function(node) {
          return node.isDescendant(this);
        };
        XMLNode2.prototype.isPreceding = function(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos < thisPos;
          }
        };
        XMLNode2.prototype.isFollowing = function(node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);
          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos > thisPos;
          }
        };
        XMLNode2.prototype.treePosition = function(node) {
          var found, pos;
          pos = 0;
          found = false;
          this.foreachTreeNode(this.document(), function(childNode) {
            pos++;
            if (!found && childNode === node) {
              return found = true;
            }
          });
          if (found) {
            return pos;
          } else {
            return -1;
          }
        };
        XMLNode2.prototype.foreachTreeNode = function(node, func) {
          var child, j, len, ref2, res;
          node || (node = this.document());
          ref2 = node.children;
          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            if (res = func(child)) {
              return res;
            } else {
              res = this.foreachTreeNode(child, func);
              if (res) {
                return res;
              }
            }
          }
        };
        return XMLNode2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLStringifier.js
var require_XMLStringifier = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStringifier.js"(exports, module) {
    (function() {
      var XMLStringifier, bind = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      }, hasProp = {}.hasOwnProperty;
      module.exports = XMLStringifier = function() {
        function XMLStringifier2(options) {
          this.assertLegalName = bind(this.assertLegalName, this);
          this.assertLegalChar = bind(this.assertLegalChar, this);
          var key, ref, value;
          options || (options = {});
          this.options = options;
          if (!this.options.version) {
            this.options.version = "1.0";
          }
          ref = options.stringify || {};
          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this[key] = value;
          }
        }
        XMLStringifier2.prototype.name = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalName("" + val || "");
        };
        XMLStringifier2.prototype.text = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.textEscape("" + val || ""));
        };
        XMLStringifier2.prototype.cdata = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          val = val.replace("]]>", "]]]]><![CDATA[>");
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.comment = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.raw = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return "" + val || "";
        };
        XMLStringifier2.prototype.attValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar(this.attEscape(val = "" + val || ""));
        };
        XMLStringifier2.prototype.insTarget = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.insValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.xmlVersion = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
          }
          return val;
        };
        XMLStringifier2.prototype.xmlEncoding = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          val = "" + val || "";
          if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
            throw new Error("Invalid encoding: " + val);
          }
          return this.assertLegalChar(val);
        };
        XMLStringifier2.prototype.xmlStandalone = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          if (val) {
            return "yes";
          } else {
            return "no";
          }
        };
        XMLStringifier2.prototype.dtdPubID = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdSysID = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdElementValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdAttType = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdAttDefault = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdEntityValue = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.dtdNData = function(val) {
          if (this.options.noValidation) {
            return val;
          }
          return this.assertLegalChar("" + val || "");
        };
        XMLStringifier2.prototype.convertAttKey = "@";
        XMLStringifier2.prototype.convertPIKey = "?";
        XMLStringifier2.prototype.convertTextKey = "#text";
        XMLStringifier2.prototype.convertCDataKey = "#cdata";
        XMLStringifier2.prototype.convertCommentKey = "#comment";
        XMLStringifier2.prototype.convertRawKey = "#raw";
        XMLStringifier2.prototype.assertLegalChar = function(str) {
          var regex, res;
          if (this.options.noValidation) {
            return str;
          }
          regex = "";
          if (this.options.version === "1.0") {
            regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          } else if (this.options.version === "1.1") {
            regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          }
          return str;
        };
        XMLStringifier2.prototype.assertLegalName = function(str) {
          var regex;
          if (this.options.noValidation) {
            return str;
          }
          this.assertLegalChar(str);
          regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
          if (!str.match(regex)) {
            throw new Error("Invalid character in name");
          }
          return str;
        };
        XMLStringifier2.prototype.textEscape = function(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
        };
        XMLStringifier2.prototype.attEscape = function(str) {
          var ampregex;
          if (this.options.noValidation) {
            return str;
          }
          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
        };
        return XMLStringifier2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/WriterState.js
var require_WriterState = __commonJS({
  "node_modules/xmlbuilder/lib/WriterState.js"(exports, module) {
    (function() {
      module.exports = {
        None: 0,
        OpenTag: 1,
        InsideTag: 2,
        CloseTag: 3
      };
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLWriterBase.js
var require_XMLWriterBase = __commonJS({
  "node_modules/xmlbuilder/lib/XMLWriterBase.js"(exports, module) {
    (function() {
      var NodeType, WriterState, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLText, XMLWriterBase, assign, hasProp = {}.hasOwnProperty;
      assign = require_Utility().assign;
      NodeType = require_NodeType();
      XMLDeclaration = require_XMLDeclaration();
      XMLDocType = require_XMLDocType();
      XMLCData = require_XMLCData();
      XMLComment = require_XMLComment();
      XMLElement = require_XMLElement();
      XMLRaw = require_XMLRaw();
      XMLText = require_XMLText();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      XMLDummy = require_XMLDummy();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDNotation = require_XMLDTDNotation();
      WriterState = require_WriterState();
      module.exports = XMLWriterBase = function() {
        function XMLWriterBase2(options) {
          var key, ref, value;
          options || (options = {});
          this.options = options;
          ref = options.writer || {};
          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this["_" + key] = this[key];
            this[key] = value;
          }
        }
        XMLWriterBase2.prototype.filterOptions = function(options) {
          var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
          options || (options = {});
          options = assign({}, this.options, options);
          filteredOptions = {
            writer: this
          };
          filteredOptions.pretty = options.pretty || false;
          filteredOptions.allowEmpty = options.allowEmpty || false;
          filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
          filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
          filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
          filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
          filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : "";
          if (filteredOptions.spaceBeforeSlash === true) {
            filteredOptions.spaceBeforeSlash = " ";
          }
          filteredOptions.suppressPrettyCount = 0;
          filteredOptions.user = {};
          filteredOptions.state = WriterState.None;
          return filteredOptions;
        };
        XMLWriterBase2.prototype.indent = function(node, options, level) {
          var indentLevel;
          if (!options.pretty || options.suppressPrettyCount) {
            return "";
          } else if (options.pretty) {
            indentLevel = (level || 0) + options.offset + 1;
            if (indentLevel > 0) {
              return new Array(indentLevel).join(options.indent);
            }
          }
          return "";
        };
        XMLWriterBase2.prototype.endline = function(node, options, level) {
          if (!options.pretty || options.suppressPrettyCount) {
            return "";
          } else {
            return options.newline;
          }
        };
        XMLWriterBase2.prototype.attribute = function(att, options, level) {
          var r;
          this.openAttribute(att, options, level);
          r = " " + att.name + '="' + att.value + '"';
          this.closeAttribute(att, options, level);
          return r;
        };
        XMLWriterBase2.prototype.cdata = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<![CDATA[";
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += "]]>" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.comment = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<!-- ";
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += " -->" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.declaration = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<?xml";
          options.state = WriterState.InsideTag;
          r += ' version="' + node.version + '"';
          if (node.encoding != null) {
            r += ' encoding="' + node.encoding + '"';
          }
          if (node.standalone != null) {
            r += ' standalone="' + node.standalone + '"';
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + "?>";
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.docType = function(node, options, level) {
          var child, i, len, r, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          r += "<!DOCTYPE " + node.root().name;
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.children.length > 0) {
            r += " [";
            r += this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref = node.children;
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              r += this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            r += "]";
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + ">";
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.element = function(node, options, level) {
          var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
          level || (level = 0);
          prettySuppressed = false;
          r = "";
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r += this.indent(node, options, level) + "<" + node.name;
          ref = node.attribs;
          for (name in ref) {
            if (!hasProp.call(ref, name)) continue;
            att = ref[name];
            r += this.attribute(att, options, level);
          }
          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];
          if (childNodeCount === 0 || node.children.every(function(e) {
            return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === "";
          })) {
            if (options.allowEmpty) {
              r += ">";
              options.state = WriterState.CloseTag;
              r += "</" + node.name + ">" + this.endline(node, options, level);
            } else {
              options.state = WriterState.CloseTag;
              r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            r += ">";
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            r += this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            r += "</" + node.name + ">" + this.endline(node, options, level);
          } else {
            if (options.dontPrettyTextNodes) {
              ref1 = node.children;
              for (i = 0, len = ref1.length; i < len; i++) {
                child = ref1[i];
                if ((child.type === NodeType.Text || child.type === NodeType.Raw) && child.value != null) {
                  options.suppressPrettyCount++;
                  prettySuppressed = true;
                  break;
                }
              }
            }
            r += ">" + this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref2 = node.children;
            for (j = 0, len1 = ref2.length; j < len1; j++) {
              child = ref2[j];
              r += this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            r += this.indent(node, options, level) + "</" + node.name + ">";
            if (prettySuppressed) {
              options.suppressPrettyCount--;
            }
            r += this.endline(node, options, level);
            options.state = WriterState.None;
          }
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.writeChildNode = function(node, options, level) {
          switch (node.type) {
            case NodeType.CData:
              return this.cdata(node, options, level);
            case NodeType.Comment:
              return this.comment(node, options, level);
            case NodeType.Element:
              return this.element(node, options, level);
            case NodeType.Raw:
              return this.raw(node, options, level);
            case NodeType.Text:
              return this.text(node, options, level);
            case NodeType.ProcessingInstruction:
              return this.processingInstruction(node, options, level);
            case NodeType.Dummy:
              return "";
            case NodeType.Declaration:
              return this.declaration(node, options, level);
            case NodeType.DocType:
              return this.docType(node, options, level);
            case NodeType.AttributeDeclaration:
              return this.dtdAttList(node, options, level);
            case NodeType.ElementDeclaration:
              return this.dtdElement(node, options, level);
            case NodeType.EntityDeclaration:
              return this.dtdEntity(node, options, level);
            case NodeType.NotationDeclaration:
              return this.dtdNotation(node, options, level);
            default:
              throw new Error("Unknown XML node type: " + node.constructor.name);
          }
        };
        XMLWriterBase2.prototype.processingInstruction = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<?";
          options.state = WriterState.InsideTag;
          r += node.target;
          if (node.value) {
            r += " " + node.value;
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + "?>";
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.raw = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.text = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.dtdAttList = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<!ATTLIST";
          options.state = WriterState.InsideTag;
          r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
          if (node.defaultValueType !== "#DEFAULT") {
            r += " " + node.defaultValueType;
          }
          if (node.defaultValue) {
            r += ' "' + node.defaultValue + '"';
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.dtdElement = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<!ELEMENT";
          options.state = WriterState.InsideTag;
          r += " " + node.name + " " + node.value;
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.dtdEntity = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<!ENTITY";
          options.state = WriterState.InsideTag;
          if (node.pe) {
            r += " %";
          }
          r += " " + node.name;
          if (node.value) {
            r += ' "' + node.value + '"';
          } else {
            if (node.pubID && node.sysID) {
              r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              r += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.nData) {
              r += " NDATA " + node.nData;
            }
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.dtdNotation = function(node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + "<!NOTATION";
          options.state = WriterState.InsideTag;
          r += " " + node.name;
          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.pubID) {
            r += ' PUBLIC "' + node.pubID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };
        XMLWriterBase2.prototype.openNode = function(node, options, level) {
        };
        XMLWriterBase2.prototype.closeNode = function(node, options, level) {
        };
        XMLWriterBase2.prototype.openAttribute = function(att, options, level) {
        };
        XMLWriterBase2.prototype.closeAttribute = function(att, options, level) {
        };
        return XMLWriterBase2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLStringWriter.js
var require_XMLStringWriter = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStringWriter.js"(exports, module) {
    (function() {
      var XMLStringWriter, XMLWriterBase, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      XMLWriterBase = require_XMLWriterBase();
      module.exports = XMLStringWriter = function(superClass) {
        extend(XMLStringWriter2, superClass);
        function XMLStringWriter2(options) {
          XMLStringWriter2.__super__.constructor.call(this, options);
        }
        XMLStringWriter2.prototype.document = function(doc, options) {
          var child, i, len, r, ref;
          options = this.filterOptions(options);
          r = "";
          ref = doc.children;
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            r += this.writeChildNode(child, options, 0);
          }
          if (options.pretty && r.slice(-options.newline.length) === options.newline) {
            r = r.slice(0, -options.newline.length);
          }
          return r;
        };
        return XMLStringWriter2;
      }(XMLWriterBase);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDocument.js
var require_XMLDocument = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocument.js"(exports, module) {
    (function() {
      var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      isPlainObject = require_Utility().isPlainObject;
      XMLDOMImplementation = require_XMLDOMImplementation();
      XMLDOMConfiguration = require_XMLDOMConfiguration();
      XMLNode = require_XMLNode();
      NodeType = require_NodeType();
      XMLStringifier = require_XMLStringifier();
      XMLStringWriter = require_XMLStringWriter();
      module.exports = XMLDocument = function(superClass) {
        extend(XMLDocument2, superClass);
        function XMLDocument2(options) {
          XMLDocument2.__super__.constructor.call(this, null);
          this.name = "#document";
          this.type = NodeType.Document;
          this.documentURI = null;
          this.domConfig = new XMLDOMConfiguration();
          options || (options = {});
          if (!options.writer) {
            options.writer = new XMLStringWriter();
          }
          this.options = options;
          this.stringify = new XMLStringifier(options);
        }
        Object.defineProperty(XMLDocument2.prototype, "implementation", {
          value: new XMLDOMImplementation()
        });
        Object.defineProperty(XMLDocument2.prototype, "doctype", {
          get: function() {
            var child, i, len, ref;
            ref = this.children;
            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              if (child.type === NodeType.DocType) {
                return child;
              }
            }
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "documentElement", {
          get: function() {
            return this.rootObject || null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "inputEncoding", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "strictErrorChecking", {
          get: function() {
            return false;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlEncoding", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].encoding;
            } else {
              return null;
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlStandalone", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].standalone === "yes";
            } else {
              return false;
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "xmlVersion", {
          get: function() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].version;
            } else {
              return "1.0";
            }
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "URL", {
          get: function() {
            return this.documentURI;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "origin", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "compatMode", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "characterSet", {
          get: function() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument2.prototype, "contentType", {
          get: function() {
            return null;
          }
        });
        XMLDocument2.prototype.end = function(writer) {
          var writerOptions;
          writerOptions = {};
          if (!writer) {
            writer = this.options.writer;
          } else if (isPlainObject(writer)) {
            writerOptions = writer;
            writer = this.options.writer;
          }
          return writer.document(this, writer.filterOptions(writerOptions));
        };
        XMLDocument2.prototype.toString = function(options) {
          return this.options.writer.document(this, this.options.writer.filterOptions(options));
        };
        XMLDocument2.prototype.createElement = function(tagName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createDocumentFragment = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createTextNode = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createComment = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createCDATASection = function(data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createProcessingInstruction = function(target, data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createAttribute = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createEntityReference = function(name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByTagName = function(tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.importNode = function(importedNode, deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createElementNS = function(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementById = function(elementId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.adoptNode = function(source) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.normalizeDocument = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.getElementsByClassName = function(classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createEvent = function(eventInterface) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createRange = function() {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createNodeIterator = function(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        XMLDocument2.prototype.createTreeWalker = function(root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };
        return XMLDocument2;
      }(XMLNode);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLDocumentCB.js
var require_XMLDocumentCB = __commonJS({
  "node_modules/xmlbuilder/lib/XMLDocumentCB.js"(exports, module) {
    (function() {
      var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
      ref = require_Utility(), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
      NodeType = require_NodeType();
      XMLDocument = require_XMLDocument();
      XMLElement = require_XMLElement();
      XMLCData = require_XMLCData();
      XMLComment = require_XMLComment();
      XMLRaw = require_XMLRaw();
      XMLText = require_XMLText();
      XMLProcessingInstruction = require_XMLProcessingInstruction();
      XMLDeclaration = require_XMLDeclaration();
      XMLDocType = require_XMLDocType();
      XMLDTDAttList = require_XMLDTDAttList();
      XMLDTDEntity = require_XMLDTDEntity();
      XMLDTDElement = require_XMLDTDElement();
      XMLDTDNotation = require_XMLDTDNotation();
      XMLAttribute = require_XMLAttribute();
      XMLStringifier = require_XMLStringifier();
      XMLStringWriter = require_XMLStringWriter();
      WriterState = require_WriterState();
      module.exports = XMLDocumentCB = function() {
        function XMLDocumentCB2(options, onData, onEnd) {
          var writerOptions;
          this.name = "?xml";
          this.type = NodeType.Document;
          options || (options = {});
          writerOptions = {};
          if (!options.writer) {
            options.writer = new XMLStringWriter();
          } else if (isPlainObject(options.writer)) {
            writerOptions = options.writer;
            options.writer = new XMLStringWriter();
          }
          this.options = options;
          this.writer = options.writer;
          this.writerOptions = this.writer.filterOptions(writerOptions);
          this.stringify = new XMLStringifier(options);
          this.onDataCallback = onData || function() {
          };
          this.onEndCallback = onEnd || function() {
          };
          this.currentNode = null;
          this.currentLevel = -1;
          this.openTags = {};
          this.documentStarted = false;
          this.documentCompleted = false;
          this.root = null;
        }
        XMLDocumentCB2.prototype.createChildNode = function(node) {
          var att, attName, attributes, child, i, len, ref1, ref2;
          switch (node.type) {
            case NodeType.CData:
              this.cdata(node.value);
              break;
            case NodeType.Comment:
              this.comment(node.value);
              break;
            case NodeType.Element:
              attributes = {};
              ref1 = node.attribs;
              for (attName in ref1) {
                if (!hasProp.call(ref1, attName)) continue;
                att = ref1[attName];
                attributes[attName] = att.value;
              }
              this.node(node.name, attributes);
              break;
            case NodeType.Dummy:
              this.dummy();
              break;
            case NodeType.Raw:
              this.raw(node.value);
              break;
            case NodeType.Text:
              this.text(node.value);
              break;
            case NodeType.ProcessingInstruction:
              this.instruction(node.target, node.value);
              break;
            default:
              throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
          }
          ref2 = node.children;
          for (i = 0, len = ref2.length; i < len; i++) {
            child = ref2[i];
            this.createChildNode(child);
            if (child.type === NodeType.Element) {
              this.up();
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.dummy = function() {
          return this;
        };
        XMLDocumentCB2.prototype.node = function(name, attributes, text) {
          var ref1;
          if (name == null) {
            throw new Error("Missing node name.");
          }
          if (this.root && this.currentLevel === -1) {
            throw new Error("Document can only have one root node. " + this.debugInfo(name));
          }
          this.openCurrent();
          name = getValue(name);
          if (attributes == null) {
            attributes = {};
          }
          attributes = getValue(attributes);
          if (!isObject(attributes)) {
            ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
          }
          this.currentNode = new XMLElement(this, name, attributes);
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;
          if (text != null) {
            this.text(text);
          }
          return this;
        };
        XMLDocumentCB2.prototype.element = function(name, attributes, text) {
          var child, i, len, oldValidationFlag, ref1, root;
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            this.dtdElement.apply(this, arguments);
          } else {
            if (Array.isArray(name) || isObject(name) || isFunction(name)) {
              oldValidationFlag = this.options.noValidation;
              this.options.noValidation = true;
              root = new XMLDocument(this.options).element("TEMP_ROOT");
              root.element(name);
              this.options.noValidation = oldValidationFlag;
              ref1 = root.children;
              for (i = 0, len = ref1.length; i < len; i++) {
                child = ref1[i];
                this.createChildNode(child);
                if (child.type === NodeType.Element) {
                  this.up();
                }
              }
            } else {
              this.node(name, attributes, text);
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.attribute = function(name, value) {
          var attName, attValue;
          if (!this.currentNode || this.currentNode.children) {
            throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
          }
          if (name != null) {
            name = getValue(name);
          }
          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName)) continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            if (this.options.keepNullAttributes && value == null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
            }
          }
          return this;
        };
        XMLDocumentCB2.prototype.text = function(value) {
          var node;
          this.openCurrent();
          node = new XMLText(this, value);
          this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.cdata = function(value) {
          var node;
          this.openCurrent();
          node = new XMLCData(this, value);
          this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.comment = function(value) {
          var node;
          this.openCurrent();
          node = new XMLComment(this, value);
          this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.raw = function(value) {
          var node;
          this.openCurrent();
          node = new XMLRaw(this, value);
          this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.instruction = function(target, value) {
          var i, insTarget, insValue, len, node;
          this.openCurrent();
          if (target != null) {
            target = getValue(target);
          }
          if (value != null) {
            value = getValue(value);
          }
          if (Array.isArray(target)) {
            for (i = 0, len = target.length; i < len; i++) {
              insTarget = target[i];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget)) continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }
            node = new XMLProcessingInstruction(this, target, value);
            this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          }
          return this;
        };
        XMLDocumentCB2.prototype.declaration = function(version, encoding, standalone) {
          var node;
          this.openCurrent();
          if (this.documentStarted) {
            throw new Error("declaration() must be the first node.");
          }
          node = new XMLDeclaration(this, version, encoding, standalone);
          this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.doctype = function(root, pubID, sysID) {
          this.openCurrent();
          if (root == null) {
            throw new Error("Missing root node name.");
          }
          if (this.root) {
            throw new Error("dtd() must come before the root node.");
          }
          this.currentNode = new XMLDocType(this, pubID, sysID);
          this.currentNode.rootNodeName = root;
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;
          return this;
        };
        XMLDocumentCB2.prototype.dtdElement = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDElement(this, name, value);
          this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var node;
          this.openCurrent();
          node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.entity = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, false, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.pEntity = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, true, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.notation = function(name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDNotation(this, name, value);
          this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };
        XMLDocumentCB2.prototype.up = function() {
          if (this.currentLevel < 0) {
            throw new Error("The document node has no parent.");
          }
          if (this.currentNode) {
            if (this.currentNode.children) {
              this.closeNode(this.currentNode);
            } else {
              this.openNode(this.currentNode);
            }
            this.currentNode = null;
          } else {
            this.closeNode(this.openTags[this.currentLevel]);
          }
          delete this.openTags[this.currentLevel];
          this.currentLevel--;
          return this;
        };
        XMLDocumentCB2.prototype.end = function() {
          while (this.currentLevel >= 0) {
            this.up();
          }
          return this.onEnd();
        };
        XMLDocumentCB2.prototype.openCurrent = function() {
          if (this.currentNode) {
            this.currentNode.children = true;
            return this.openNode(this.currentNode);
          }
        };
        XMLDocumentCB2.prototype.openNode = function(node) {
          var att, chunk, name, ref1;
          if (!node.isOpen) {
            if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
              this.root = node;
            }
            chunk = "";
            if (node.type === NodeType.Element) {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
              ref1 = node.attribs;
              for (name in ref1) {
                if (!hasProp.call(ref1, name)) continue;
                att = ref1[name];
                chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
              }
              chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
              this.writerOptions.state = WriterState.InsideTag;
            } else {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
              if (node.pubID && node.sysID) {
                chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
              } else if (node.sysID) {
                chunk += ' SYSTEM "' + node.sysID + '"';
              }
              if (node.children) {
                chunk += " [";
                this.writerOptions.state = WriterState.InsideTag;
              } else {
                this.writerOptions.state = WriterState.CloseTag;
                chunk += ">";
              }
              chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
            }
            this.onData(chunk, this.currentLevel);
            return node.isOpen = true;
          }
        };
        XMLDocumentCB2.prototype.closeNode = function(node) {
          var chunk;
          if (!node.isClosed) {
            chunk = "";
            this.writerOptions.state = WriterState.CloseTag;
            if (node.type === NodeType.Element) {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
            } else {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
            }
            this.writerOptions.state = WriterState.None;
            this.onData(chunk, this.currentLevel);
            return node.isClosed = true;
          }
        };
        XMLDocumentCB2.prototype.onData = function(chunk, level) {
          this.documentStarted = true;
          return this.onDataCallback(chunk, level + 1);
        };
        XMLDocumentCB2.prototype.onEnd = function() {
          this.documentCompleted = true;
          return this.onEndCallback();
        };
        XMLDocumentCB2.prototype.debugInfo = function(name) {
          if (name == null) {
            return "";
          } else {
            return "node: <" + name + ">";
          }
        };
        XMLDocumentCB2.prototype.ele = function() {
          return this.element.apply(this, arguments);
        };
        XMLDocumentCB2.prototype.nod = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLDocumentCB2.prototype.txt = function(value) {
          return this.text(value);
        };
        XMLDocumentCB2.prototype.dat = function(value) {
          return this.cdata(value);
        };
        XMLDocumentCB2.prototype.com = function(value) {
          return this.comment(value);
        };
        XMLDocumentCB2.prototype.ins = function(target, value) {
          return this.instruction(target, value);
        };
        XMLDocumentCB2.prototype.dec = function(version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };
        XMLDocumentCB2.prototype.dtd = function(root, pubID, sysID) {
          return this.doctype(root, pubID, sysID);
        };
        XMLDocumentCB2.prototype.e = function(name, attributes, text) {
          return this.element(name, attributes, text);
        };
        XMLDocumentCB2.prototype.n = function(name, attributes, text) {
          return this.node(name, attributes, text);
        };
        XMLDocumentCB2.prototype.t = function(value) {
          return this.text(value);
        };
        XMLDocumentCB2.prototype.d = function(value) {
          return this.cdata(value);
        };
        XMLDocumentCB2.prototype.c = function(value) {
          return this.comment(value);
        };
        XMLDocumentCB2.prototype.r = function(value) {
          return this.raw(value);
        };
        XMLDocumentCB2.prototype.i = function(target, value) {
          return this.instruction(target, value);
        };
        XMLDocumentCB2.prototype.att = function() {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };
        XMLDocumentCB2.prototype.a = function() {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };
        XMLDocumentCB2.prototype.ent = function(name, value) {
          return this.entity(name, value);
        };
        XMLDocumentCB2.prototype.pent = function(name, value) {
          return this.pEntity(name, value);
        };
        XMLDocumentCB2.prototype.not = function(name, value) {
          return this.notation(name, value);
        };
        return XMLDocumentCB2;
      }();
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/XMLStreamWriter.js
var require_XMLStreamWriter = __commonJS({
  "node_modules/xmlbuilder/lib/XMLStreamWriter.js"(exports, module) {
    (function() {
      var NodeType, WriterState, XMLStreamWriter, XMLWriterBase, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      NodeType = require_NodeType();
      XMLWriterBase = require_XMLWriterBase();
      WriterState = require_WriterState();
      module.exports = XMLStreamWriter = function(superClass) {
        extend(XMLStreamWriter2, superClass);
        function XMLStreamWriter2(stream, options) {
          this.stream = stream;
          XMLStreamWriter2.__super__.constructor.call(this, options);
        }
        XMLStreamWriter2.prototype.endline = function(node, options, level) {
          if (node.isLastRootNode && options.state === WriterState.CloseTag) {
            return "";
          } else {
            return XMLStreamWriter2.__super__.endline.call(this, node, options, level);
          }
        };
        XMLStreamWriter2.prototype.document = function(doc, options) {
          var child, i, j, k, len, len1, ref, ref1, results;
          ref = doc.children;
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            child = ref[i];
            child.isLastRootNode = i === doc.children.length - 1;
          }
          options = this.filterOptions(options);
          ref1 = doc.children;
          results = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            child = ref1[k];
            results.push(this.writeChildNode(child, options, 0));
          }
          return results;
        };
        XMLStreamWriter2.prototype.attribute = function(att, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.attribute.call(this, att, options, level));
        };
        XMLStreamWriter2.prototype.cdata = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.cdata.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.comment = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.comment.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.declaration = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.declaration.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.docType = function(node, options, level) {
          var child, j, len, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level));
          this.stream.write("<!DOCTYPE " + node.root().name);
          if (node.pubID && node.sysID) {
            this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
          } else if (node.sysID) {
            this.stream.write(' SYSTEM "' + node.sysID + '"');
          }
          if (node.children.length > 0) {
            this.stream.write(" [");
            this.stream.write(this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref = node.children;
            for (j = 0, len = ref.length; j < len; j++) {
              child = ref[j];
              this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            this.stream.write("]");
          }
          options.state = WriterState.CloseTag;
          this.stream.write(options.spaceBeforeSlash + ">");
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };
        XMLStreamWriter2.prototype.element = function(node, options, level) {
          var att, child, childNodeCount, firstChildNode, j, len, name, prettySuppressed, ref, ref1;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level) + "<" + node.name);
          ref = node.attribs;
          for (name in ref) {
            if (!hasProp.call(ref, name)) continue;
            att = ref[name];
            this.attribute(att, options, level);
          }
          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];
          if (childNodeCount === 0 || node.children.every(function(e) {
            return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === "";
          })) {
            if (options.allowEmpty) {
              this.stream.write(">");
              options.state = WriterState.CloseTag;
              this.stream.write("</" + node.name + ">");
            } else {
              options.state = WriterState.CloseTag;
              this.stream.write(options.spaceBeforeSlash + "/>");
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            this.stream.write(">");
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            this.stream.write("</" + node.name + ">");
          } else {
            this.stream.write(">" + this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref1 = node.children;
            for (j = 0, len = ref1.length; j < len; j++) {
              child = ref1[j];
              this.writeChildNode(child, options, level + 1);
            }
            options.state = WriterState.CloseTag;
            this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
          }
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };
        XMLStreamWriter2.prototype.processingInstruction = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.processingInstruction.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.raw = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.raw.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.text = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.text.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdAttList = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdAttList.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdElement = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdElement.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdEntity = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdEntity.call(this, node, options, level));
        };
        XMLStreamWriter2.prototype.dtdNotation = function(node, options, level) {
          return this.stream.write(XMLStreamWriter2.__super__.dtdNotation.call(this, node, options, level));
        };
        return XMLStreamWriter2;
      }(XMLWriterBase);
    }).call(exports);
  }
});

// node_modules/xmlbuilder/lib/index.js
var require_lib5 = __commonJS({
  "node_modules/xmlbuilder/lib/index.js"(exports, module) {
    (function() {
      var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;
      ref = require_Utility(), assign = ref.assign, isFunction = ref.isFunction;
      XMLDOMImplementation = require_XMLDOMImplementation();
      XMLDocument = require_XMLDocument();
      XMLDocumentCB = require_XMLDocumentCB();
      XMLStringWriter = require_XMLStringWriter();
      XMLStreamWriter = require_XMLStreamWriter();
      NodeType = require_NodeType();
      WriterState = require_WriterState();
      module.exports.create = function(name, xmldec, doctype, options) {
        var doc, root;
        if (name == null) {
          throw new Error("Root element needs a name.");
        }
        options = assign({}, xmldec, doctype, options);
        doc = new XMLDocument(options);
        root = doc.element(name);
        if (!options.headless) {
          doc.declaration(options);
          if (options.pubID != null || options.sysID != null) {
            doc.dtd(options);
          }
        }
        return root;
      };
      module.exports.begin = function(options, onData, onEnd) {
        var ref1;
        if (isFunction(options)) {
          ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
          options = {};
        }
        if (onData) {
          return new XMLDocumentCB(options, onData, onEnd);
        } else {
          return new XMLDocument(options);
        }
      };
      module.exports.stringWriter = function(options) {
        return new XMLStringWriter(options);
      };
      module.exports.streamWriter = function(stream, options) {
        return new XMLStreamWriter(stream, options);
      };
      module.exports.implementation = new XMLDOMImplementation();
      module.exports.nodeType = NodeType;
      module.exports.writerState = WriterState;
    }).call(exports);
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/builder.js
var require_builder = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/builder.js"(exports) {
    (function() {
      "use strict";
      var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA, hasProp = {}.hasOwnProperty;
      builder = require_lib5();
      defaults = require_defaults().defaults;
      requiresCDATA = function(entry) {
        return typeof entry === "string" && (entry.indexOf("&") >= 0 || entry.indexOf(">") >= 0 || entry.indexOf("<") >= 0);
      };
      wrapCDATA = function(entry) {
        return "<![CDATA[" + escapeCDATA(entry) + "]]>";
      };
      escapeCDATA = function(entry) {
        return entry.replace("]]>", "]]]]><![CDATA[>");
      };
      exports.Builder = function() {
        function Builder(opts) {
          var key, ref, value;
          this.options = {};
          ref = defaults["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key)) continue;
            value = opts[key];
            this.options[key] = value;
          }
        }
        Builder.prototype.buildObject = function(rootObj) {
          var attrkey, charkey, render, rootElement, rootName;
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults["0.2"].rootName) {
            rootName = Object.keys(rootObj)[0];
            rootObj = rootObj[rootName];
          } else {
            rootName = this.options.rootName;
          }
          render = /* @__PURE__ */ function(_this) {
            return function(element, obj) {
              var attr, child, entry, index, key, value;
              if (typeof obj !== "object") {
                if (_this.options.cdata && requiresCDATA(obj)) {
                  element.raw(wrapCDATA(obj));
                } else {
                  element.txt(obj);
                }
              } else if (Array.isArray(obj)) {
                for (index in obj) {
                  if (!hasProp.call(obj, index)) continue;
                  child = obj[index];
                  for (key in child) {
                    entry = child[key];
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else {
                for (key in obj) {
                  if (!hasProp.call(obj, key)) continue;
                  child = obj[key];
                  if (key === attrkey) {
                    if (typeof child === "object") {
                      for (attr in child) {
                        value = child[attr];
                        element = element.att(attr, value);
                      }
                    }
                  } else if (key === charkey) {
                    if (_this.options.cdata && requiresCDATA(child)) {
                      element = element.raw(wrapCDATA(child));
                    } else {
                      element = element.txt(child);
                    }
                  } else if (Array.isArray(child)) {
                    for (index in child) {
                      if (!hasProp.call(child, index)) continue;
                      entry = child[index];
                      if (typeof entry === "string") {
                        if (_this.options.cdata && requiresCDATA(entry)) {
                          element = element.ele(key).raw(wrapCDATA(entry)).up();
                        } else {
                          element = element.ele(key, entry).up();
                        }
                      } else {
                        element = render(element.ele(key), entry).up();
                      }
                    }
                  } else if (typeof child === "object") {
                    element = render(element.ele(key), child).up();
                  } else {
                    if (typeof child === "string" && _this.options.cdata && requiresCDATA(child)) {
                      element = element.ele(key).raw(wrapCDATA(child)).up();
                    } else {
                      if (child == null) {
                        child = "";
                      }
                      element = element.ele(key, child.toString()).up();
                    }
                  }
                }
              }
              return element;
            };
          }(this);
          rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
            headless: this.options.headless,
            allowSurrogateChars: this.options.allowSurrogateChars
          });
          return render(rootElement, rootObj).end(this.options.renderOpts);
        };
        return Builder;
      }();
    }).call(exports);
  }
});

// node_modules/sax/lib/sax.js
var require_sax = __commonJS({
  "node_modules/sax/lib/sax.js"(exports) {
    (function(sax) {
      sax.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax.SAXParser = SAXParser;
      sax.SAXStream = SAXStream;
      sax.createStream = createStream;
      sax.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
        parser.attribList = [];
        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        }
        if (parser.opt.unquotedAttributeValues === void 0) {
          parser.opt.unquotedAttributeValues = !strict;
        }
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }
        emit(parser, "onready");
      }
      if (!Object.create) {
        Object.create = function(o) {
          function F() {
          }
          F.prototype = o;
          var newf = new F();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o) {
          var a = [];
          for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
          return a;
        };
      }
      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i = 0, l = buffers.length; i < l; i++) {
          var len = parser[buffers[i]].length;
          if (len > maxAllowed) {
            switch (buffers[i]) {
              case "textNode":
                closeText(parser);
                break;
              case "cdata":
                emitNode(parser, "oncdata", parser.cdata);
                parser.cdata = "";
                break;
              case "script":
                emitNode(parser, "onscript", parser.script);
                parser.script = "";
                break;
              default:
                error(parser, "Max buffer length exceeded: " + buffers[i]);
            }
          }
          maxActual = Math.max(maxActual, len);
        }
        var m = sax.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m + parser.position;
      }
      function clearBuffers(parser) {
        for (var i = 0, l = buffers.length; i < l; i++) {
          parser[buffers[i]] = "";
        }
      }
      function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
          emitNode(parser, "oncdata", parser.cdata);
          parser.cdata = "";
        }
        if (parser.script !== "") {
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = __require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream) Stream = function() {
      };
      var streamWraps = sax.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h) {
              if (!h) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h;
                return h;
              }
              me.on(ev, h);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = __require("string_decoder").StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c) {
        return c === " " || c === "\n" || c === "\r" || c === "	";
      }
      function isQuote(c) {
        return c === '"' || c === "'";
      }
      function isAttribEnd(c) {
        return c === ">" || isWhitespace(c);
      }
      function isMatch(regex, c) {
        return regex.test(c);
      }
      function notMatch(regex, c) {
        return !isMatch(regex, c);
      }
      var S = 0;
      sax.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++
        // <script> ... <
      };
      sax.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax.ENTITIES).forEach(function(key) {
        var e = sax.ENTITIES[key];
        var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
        sax.ENTITIES[key] = s2;
      });
      for (var s in sax.STATE) {
        sax.STATE[sax.STATE[s]] = s;
      }
      S = sax.STATE;
      function emit(parser, event, data) {
        parser[event] && parser[event](data);
      }
      function emitNode(parser, nodeType, data) {
        if (parser.textNode) closeText(parser);
        emit(parser, nodeType, data);
      }
      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode) emit(parser, "ontext", parser.textNode);
        parser.textNode = "";
      }
      function textopts(opt, text) {
        if (opt.trim) text = text.trim();
        if (opt.normalize) text = text.replace(/\s+/g, " ");
        return text;
      }
      function error(parser, er) {
        closeText(parser);
        if (parser.trackPosition) {
          er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
        }
        er = new Error(er);
        parser.error = er;
        emit(parser, "onerror", er);
        return parser;
      }
      function end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
        if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
          error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }
      function strictFail(parser, message) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
          error(parser, message);
        }
      }
      function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = { name: parser.tagName, attributes: {} };
        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i = name.indexOf(":");
        var qualName = i < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = "";
          return;
        }
        if (parser.opt.xmlns) {
          var qn = qname(parser.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser.attribValue;
            }
          }
          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, "onattribute", {
            name: parser.attribName,
            value: parser.attribValue
          });
        }
        parser.attribName = parser.attribValue = "";
      }
      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          var tag = parser.tag;
          var qn = qname(parser.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
            tag.uri = qn.prefix;
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              emitNode(parser, "onopennamespace", {
                prefix: p,
                uri: tag.ns[p]
              });
            });
          }
          for (var i = 0, l = parser.attribList.length; i < l; i++) {
            var nv = parser.attribList[i];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a.uri = prefix;
            }
            parser.tag.attributes[name] = a;
            emitNode(parser, "onattribute", a);
          }
          parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
          if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
            parser.state = S.SCRIPT;
          } else {
            parser.state = S.TEXT;
          }
          parser.tag = null;
          parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
      }
      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, "Weird empty close tag.");
          parser.textNode += "</>";
          parser.state = S.TEXT;
          return;
        }
        if (parser.script) {
          if (parser.tagName !== "script") {
            parser.script += "</" + parser.tagName + ">";
            parser.tagName = "";
            parser.state = S.SCRIPT;
            return;
          }
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
        var t = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t--) {
          var close = parser.tags[t];
          if (close.name !== closeTo) {
            strictFail(parser, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t < 0) {
          strictFail(parser, "Unmatched closing tag: " + parser.tagName);
          parser.textNode += "</" + parser.tagName + ">";
          parser.state = S.TEXT;
          return;
        }
        parser.tagName = tagName;
        var s2 = parser.tags.length;
        while (s2-- > t) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, "onclosetag", parser.tagName);
          var x = {};
          for (var i in tag.ns) {
            x[i] = tag.ns[i];
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p) {
              var n = tag.ns[p];
              emitNode(parser, "onclosenamespace", { prefix: p, uri: n });
            });
          }
        }
        if (t === 0) parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S.TEXT;
      }
      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, "Invalid character entity");
          return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser, c) {
        if (c === "<") {
          parser.state = S.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c)) {
          strictFail(parser, "Non-whitespace before first tag.");
          parser.textNode = c;
          parser.state = S.TEXT;
        }
      }
      function charAt(chunk, i) {
        var result = "";
        if (i < chunk.length) {
          result = chunk.charAt(i);
        }
        return result;
      }
      function write(chunk) {
        var parser = this;
        if (this.error) {
          throw this.error;
        }
        if (parser.closed) {
          return error(
            parser,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i = 0;
        var c = "";
        while (true) {
          c = charAt(chunk, i++);
          parser.c = c;
          if (!c) {
            break;
          }
          if (parser.trackPosition) {
            parser.position++;
            if (c === "\n") {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }
          switch (parser.state) {
            case S.BEGIN:
              parser.state = S.BEGIN_WHITESPACE;
              if (c === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser, c);
              continue;
            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c);
              continue;
            case S.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i - 1;
                while (c && c !== "<" && c !== "&") {
                  c = charAt(chunk, i++);
                  if (c && parser.trackPosition) {
                    parser.position++;
                    if (c === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.textNode += chunk.substring(starti, i - 1);
              }
              if (c === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, "Text data outside of root node.");
                }
                if (c === "&") {
                  parser.state = S.TEXT_ENTITY;
                } else {
                  parser.textNode += c;
                }
              }
              continue;
            case S.SCRIPT:
              if (c === "<") {
                parser.state = S.SCRIPT_ENDING;
              } else {
                parser.script += c;
              }
              continue;
            case S.SCRIPT_ENDING:
              if (c === "/") {
                parser.state = S.CLOSE_TAG;
              } else {
                parser.script += "<" + c;
                parser.state = S.SCRIPT;
              }
              continue;
            case S.OPEN_WAKA:
              if (c === "!") {
                parser.state = S.SGML_DECL;
                parser.sgmlDecl = "";
              } else if (isWhitespace(c)) {
              } else if (isMatch(nameStart, c)) {
                parser.state = S.OPEN_TAG;
                parser.tagName = c;
              } else if (c === "/") {
                parser.state = S.CLOSE_TAG;
                parser.tagName = "";
              } else if (c === "?") {
                parser.state = S.PROC_INST;
                parser.procInstName = parser.procInstBody = "";
              } else {
                strictFail(parser, "Unencoded <");
                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c = new Array(pad).join(" ") + c;
                }
                parser.textNode += "<" + c;
                parser.state = S.TEXT;
              }
              continue;
            case S.SGML_DECL:
              if (parser.sgmlDecl + c === "--") {
                parser.state = S.COMMENT;
                parser.comment = "";
                parser.sgmlDecl = "";
                continue;
              }
              if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                parser.state = S.DOCTYPE_DTD;
                parser.doctype += "<!" + parser.sgmlDecl + c;
                parser.sgmlDecl = "";
              } else if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
                emitNode(parser, "onopencdata");
                parser.state = S.CDATA;
                parser.sgmlDecl = "";
                parser.cdata = "";
              } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                parser.state = S.DOCTYPE;
                if (parser.doctype || parser.sawRoot) {
                  strictFail(
                    parser,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser.doctype = "";
                parser.sgmlDecl = "";
              } else if (c === ">") {
                emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                parser.sgmlDecl = "";
                parser.state = S.TEXT;
              } else if (isQuote(c)) {
                parser.state = S.SGML_DECL_QUOTED;
                parser.sgmlDecl += c;
              } else {
                parser.sgmlDecl += c;
              }
              continue;
            case S.SGML_DECL_QUOTED:
              if (c === parser.q) {
                parser.state = S.SGML_DECL;
                parser.q = "";
              }
              parser.sgmlDecl += c;
              continue;
            case S.DOCTYPE:
              if (c === ">") {
                parser.state = S.TEXT;
                emitNode(parser, "ondoctype", parser.doctype);
                parser.doctype = true;
              } else {
                parser.doctype += c;
                if (c === "[") {
                  parser.state = S.DOCTYPE_DTD;
                } else if (isQuote(c)) {
                  parser.state = S.DOCTYPE_QUOTED;
                  parser.q = c;
                }
              }
              continue;
            case S.DOCTYPE_QUOTED:
              parser.doctype += c;
              if (c === parser.q) {
                parser.q = "";
                parser.state = S.DOCTYPE;
              }
              continue;
            case S.DOCTYPE_DTD:
              if (c === "]") {
                parser.doctype += c;
                parser.state = S.DOCTYPE;
              } else if (c === "<") {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else if (isQuote(c)) {
                parser.doctype += c;
                parser.state = S.DOCTYPE_DTD_QUOTED;
                parser.q = c;
              } else {
                parser.doctype += c;
              }
              continue;
            case S.DOCTYPE_DTD_QUOTED:
              parser.doctype += c;
              if (c === parser.q) {
                parser.state = S.DOCTYPE_DTD;
                parser.q = "";
              }
              continue;
            case S.COMMENT:
              if (c === "-") {
                parser.state = S.COMMENT_ENDING;
              } else {
                parser.comment += c;
              }
              continue;
            case S.COMMENT_ENDING:
              if (c === "-") {
                parser.state = S.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);
                if (parser.comment) {
                  emitNode(parser, "oncomment", parser.comment);
                }
                parser.comment = "";
              } else {
                parser.comment += "-" + c;
                parser.state = S.COMMENT;
              }
              continue;
            case S.COMMENT_ENDED:
              if (c !== ">") {
                strictFail(parser, "Malformed comment");
                parser.comment += "--" + c;
                parser.state = S.COMMENT;
              } else if (parser.doctype && parser.doctype !== true) {
                parser.state = S.DOCTYPE_DTD;
              } else {
                parser.state = S.TEXT;
              }
              continue;
            case S.CDATA:
              if (c === "]") {
                parser.state = S.CDATA_ENDING;
              } else {
                parser.cdata += c;
              }
              continue;
            case S.CDATA_ENDING:
              if (c === "]") {
                parser.state = S.CDATA_ENDING_2;
              } else {
                parser.cdata += "]" + c;
                parser.state = S.CDATA;
              }
              continue;
            case S.CDATA_ENDING_2:
              if (c === ">") {
                if (parser.cdata) {
                  emitNode(parser, "oncdata", parser.cdata);
                }
                emitNode(parser, "onclosecdata");
                parser.cdata = "";
                parser.state = S.TEXT;
              } else if (c === "]") {
                parser.cdata += "]";
              } else {
                parser.cdata += "]]" + c;
                parser.state = S.CDATA;
              }
              continue;
            case S.PROC_INST:
              if (c === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c)) {
                parser.state = S.PROC_INST_BODY;
              } else {
                parser.procInstName += c;
              }
              continue;
            case S.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c)) {
                continue;
              } else if (c === "?") {
                parser.state = S.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c;
              }
              continue;
            case S.PROC_INST_ENDING:
              if (c === ">") {
                emitNode(parser, "onprocessinginstruction", {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = "";
                parser.state = S.TEXT;
              } else {
                parser.procInstBody += "?" + c;
                parser.state = S.PROC_INST_BODY;
              }
              continue;
            case S.OPEN_TAG:
              if (isMatch(nameBody, c)) {
                parser.tagName += c;
              } else {
                newTag(parser);
                if (c === ">") {
                  openTag(parser);
                } else if (c === "/") {
                  parser.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser, "Invalid character in tag name");
                  }
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.OPEN_TAG_SLASH:
              if (c === ">") {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, "Forward-slash in opening tag not followed by >");
                parser.state = S.ATTRIB;
              }
              continue;
            case S.ATTRIB:
              if (isWhitespace(c)) {
                continue;
              } else if (c === ">") {
                openTag(parser);
              } else if (c === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                parser.attribName = c;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME:
              if (c === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (c === ">") {
                strictFail(parser, "Attribute without value");
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c)) {
                parser.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c)) {
                parser.attribName += c;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_NAME_SAW_WHITE:
              if (c === "=") {
                parser.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c)) {
                continue;
              } else {
                strictFail(parser, "Attribute without value");
                parser.tag.attributes[parser.attribName] = "";
                parser.attribValue = "";
                emitNode(parser, "onattribute", {
                  name: parser.attribName,
                  value: ""
                });
                parser.attribName = "";
                if (c === ">") {
                  openTag(parser);
                } else if (isMatch(nameStart, c)) {
                  parser.attribName = c;
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                  parser.state = S.ATTRIB;
                }
              }
              continue;
            case S.ATTRIB_VALUE:
              if (isWhitespace(c)) {
                continue;
              } else if (isQuote(c)) {
                parser.q = c;
                parser.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                if (!parser.opt.unquotedAttributeValues) {
                  error(parser, "Unquoted attribute value");
                }
                parser.state = S.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c;
              }
              continue;
            case S.ATTRIB_VALUE_QUOTED:
              if (c !== parser.q) {
                if (c === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c;
                }
                continue;
              }
              attrib(parser);
              parser.q = "";
              parser.state = S.ATTRIB_VALUE_CLOSED;
              continue;
            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c)) {
                parser.state = S.ATTRIB;
              } else if (c === ">") {
                openTag(parser);
              } else if (c === "/") {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                strictFail(parser, "No whitespace between attributes");
                parser.attribName = c;
                parser.attribValue = "";
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c)) {
                if (c === "&") {
                  parser.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c;
                }
                continue;
              }
              attrib(parser);
              if (c === ">") {
                openTag(parser);
              } else {
                parser.state = S.ATTRIB;
              }
              continue;
            case S.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c)) {
                  continue;
                } else if (notMatch(nameStart, c)) {
                  if (parser.script) {
                    parser.script += "</" + c;
                    parser.state = S.SCRIPT;
                  } else {
                    strictFail(parser, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser.tagName = c;
                }
              } else if (c === ">") {
                closeTag(parser);
              } else if (isMatch(nameBody, c)) {
                parser.tagName += c;
              } else if (parser.script) {
                parser.script += "</" + parser.tagName;
                parser.tagName = "";
                parser.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c)) {
                  strictFail(parser, "Invalid tagname in closing tag");
                }
                parser.state = S.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c)) {
                continue;
              }
              if (c === ">") {
                closeTag(parser);
              } else {
                strictFail(parser, "Invalid characters in closing tag");
              }
              continue;
            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;
              switch (parser.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = "textNode";
                  break;
                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = "attribValue";
                  break;
                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = "attribValue";
                  break;
              }
              if (c === ";") {
                var parsedEntity = parseEntity(parser);
                if (parser.opt.unparsedEntities && !Object.values(sax.XML_ENTITIES).includes(parsedEntity)) {
                  parser.entity = "";
                  parser.state = returnState;
                  parser.write(parsedEntity);
                } else {
                  parser[buffer] += parsedEntity;
                  parser.entity = "";
                  parser.state = returnState;
                }
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                parser.entity += c;
              } else {
                strictFail(parser, "Invalid character in entity name");
                parser[buffer] += "&" + parser.entity + c;
                parser.entity = "";
                parser.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser, "Unknown state: " + parser.state);
            }
          }
        }
        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }
        return parser;
      }
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(typeof exports === "undefined" ? exports.sax = {} : exports);
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/bom.js
var require_bom = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/bom.js"(exports) {
    (function() {
      "use strict";
      exports.stripBOM = function(str) {
        if (str[0] === "\uFEFF") {
          return str.substring(1);
        } else {
          return str;
        }
      };
    }).call(exports);
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/processors.js
var require_processors = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/processors.js"(exports) {
    (function() {
      "use strict";
      var prefixMatch;
      prefixMatch = new RegExp(/(?!xmlns)^.*:/);
      exports.normalize = function(str) {
        return str.toLowerCase();
      };
      exports.firstCharLowerCase = function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      };
      exports.stripPrefix = function(str) {
        return str.replace(prefixMatch, "");
      };
      exports.parseNumbers = function(str) {
        if (!isNaN(str)) {
          str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
        }
        return str;
      };
      exports.parseBooleans = function(str) {
        if (/^(?:true|false)$/i.test(str)) {
          str = str.toLowerCase() === "true";
        }
        return str;
      };
    }).call(exports);
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/parser.js
var require_parser = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/parser.js"(exports) {
    (function() {
      "use strict";
      var bom, defaults, defineProperty, events, isEmpty, processItem, processors, sax, setImmediate, bind = function(fn, me) {
        return function() {
          return fn.apply(me, arguments);
        };
      }, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      sax = require_sax();
      events = __require("events");
      bom = require_bom();
      processors = require_processors();
      setImmediate = __require("timers").setImmediate;
      defaults = require_defaults().defaults;
      isEmpty = function(thing) {
        return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
      };
      processItem = function(processors2, item, key) {
        var i, len, process2;
        for (i = 0, len = processors2.length; i < len; i++) {
          process2 = processors2[i];
          item = process2(item, key);
        }
        return item;
      };
      defineProperty = function(obj, key, value) {
        var descriptor;
        descriptor = /* @__PURE__ */ Object.create(null);
        descriptor.value = value;
        descriptor.writable = true;
        descriptor.enumerable = true;
        descriptor.configurable = true;
        return Object.defineProperty(obj, key, descriptor);
      };
      exports.Parser = function(superClass) {
        extend(Parser, superClass);
        function Parser(opts) {
          this.parseStringPromise = bind(this.parseStringPromise, this);
          this.parseString = bind(this.parseString, this);
          this.reset = bind(this.reset, this);
          this.assignOrPush = bind(this.assignOrPush, this);
          this.processAsync = bind(this.processAsync, this);
          var key, ref, value;
          if (!(this instanceof exports.Parser)) {
            return new exports.Parser(opts);
          }
          this.options = {};
          ref = defaults["0.2"];
          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this.options[key] = value;
          }
          for (key in opts) {
            if (!hasProp.call(opts, key)) continue;
            value = opts[key];
            this.options[key] = value;
          }
          if (this.options.xmlns) {
            this.options.xmlnskey = this.options.attrkey + "ns";
          }
          if (this.options.normalizeTags) {
            if (!this.options.tagNameProcessors) {
              this.options.tagNameProcessors = [];
            }
            this.options.tagNameProcessors.unshift(processors.normalize);
          }
          this.reset();
        }
        Parser.prototype.processAsync = function() {
          var chunk, err;
          try {
            if (this.remaining.length <= this.options.chunkSize) {
              chunk = this.remaining;
              this.remaining = "";
              this.saxParser = this.saxParser.write(chunk);
              return this.saxParser.close();
            } else {
              chunk = this.remaining.substr(0, this.options.chunkSize);
              this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
              this.saxParser = this.saxParser.write(chunk);
              return setImmediate(this.processAsync);
            }
          } catch (error1) {
            err = error1;
            if (!this.saxParser.errThrown) {
              this.saxParser.errThrown = true;
              return this.emit(err);
            }
          }
        };
        Parser.prototype.assignOrPush = function(obj, key, newValue) {
          if (!(key in obj)) {
            if (!this.options.explicitArray) {
              return defineProperty(obj, key, newValue);
            } else {
              return defineProperty(obj, key, [newValue]);
            }
          } else {
            if (!(obj[key] instanceof Array)) {
              defineProperty(obj, key, [obj[key]]);
            }
            return obj[key].push(newValue);
          }
        };
        Parser.prototype.reset = function() {
          var attrkey, charkey, ontext, stack;
          this.removeAllListeners();
          this.saxParser = sax.parser(this.options.strict, {
            trim: false,
            normalize: false,
            xmlns: this.options.xmlns
          });
          this.saxParser.errThrown = false;
          this.saxParser.onerror = /* @__PURE__ */ function(_this) {
            return function(error) {
              _this.saxParser.resume();
              if (!_this.saxParser.errThrown) {
                _this.saxParser.errThrown = true;
                return _this.emit("error", error);
              }
            };
          }(this);
          this.saxParser.onend = /* @__PURE__ */ function(_this) {
            return function() {
              if (!_this.saxParser.ended) {
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          this.saxParser.ended = false;
          this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
          this.resultObject = null;
          stack = [];
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;
          this.saxParser.onopentag = /* @__PURE__ */ function(_this) {
            return function(node) {
              var key, newValue, obj, processedKey, ref;
              obj = {};
              obj[charkey] = "";
              if (!_this.options.ignoreAttrs) {
                ref = node.attributes;
                for (key in ref) {
                  if (!hasProp.call(ref, key)) continue;
                  if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                    obj[attrkey] = {};
                  }
                  newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
                  processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
                  if (_this.options.mergeAttrs) {
                    _this.assignOrPush(obj, processedKey, newValue);
                  } else {
                    defineProperty(obj[attrkey], processedKey, newValue);
                  }
                }
              }
              obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
              if (_this.options.xmlns) {
                obj[_this.options.xmlnskey] = {
                  uri: node.uri,
                  local: node.local
                };
              }
              return stack.push(obj);
            };
          }(this);
          this.saxParser.onclosetag = /* @__PURE__ */ function(_this) {
            return function() {
              var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
              obj = stack.pop();
              nodeName = obj["#name"];
              if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
                delete obj["#name"];
              }
              if (obj.cdata === true) {
                cdata = obj.cdata;
                delete obj.cdata;
              }
              s = stack[stack.length - 1];
              if (obj[charkey].match(/^\s*$/) && !cdata) {
                emptyStr = obj[charkey];
                delete obj[charkey];
              } else {
                if (_this.options.trim) {
                  obj[charkey] = obj[charkey].trim();
                }
                if (_this.options.normalize) {
                  obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
                }
                obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
                if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                  obj = obj[charkey];
                }
              }
              if (isEmpty(obj)) {
                if (typeof _this.options.emptyTag === "function") {
                  obj = _this.options.emptyTag();
                } else {
                  obj = _this.options.emptyTag !== "" ? _this.options.emptyTag : emptyStr;
                }
              }
              if (_this.options.validator != null) {
                xpath = "/" + function() {
                  var i, len, results;
                  results = [];
                  for (i = 0, len = stack.length; i < len; i++) {
                    node = stack[i];
                    results.push(node["#name"]);
                  }
                  return results;
                }().concat(nodeName).join("/");
                (function() {
                  var err;
                  try {
                    return obj = _this.options.validator(xpath, s && s[nodeName], obj);
                  } catch (error1) {
                    err = error1;
                    return _this.emit("error", err);
                  }
                })();
              }
              if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === "object") {
                if (!_this.options.preserveChildrenOrder) {
                  node = {};
                  if (_this.options.attrkey in obj) {
                    node[_this.options.attrkey] = obj[_this.options.attrkey];
                    delete obj[_this.options.attrkey];
                  }
                  if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                    node[_this.options.charkey] = obj[_this.options.charkey];
                    delete obj[_this.options.charkey];
                  }
                  if (Object.getOwnPropertyNames(obj).length > 0) {
                    node[_this.options.childkey] = obj;
                  }
                  obj = node;
                } else if (s) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  objClone = {};
                  for (key in obj) {
                    if (!hasProp.call(obj, key)) continue;
                    defineProperty(objClone, key, obj[key]);
                  }
                  s[_this.options.childkey].push(objClone);
                  delete obj["#name"];
                  if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                    obj = obj[charkey];
                  }
                }
              }
              if (stack.length > 0) {
                return _this.assignOrPush(s, nodeName, obj);
              } else {
                if (_this.options.explicitRoot) {
                  old = obj;
                  obj = {};
                  defineProperty(obj, nodeName, old);
                }
                _this.resultObject = obj;
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);
          ontext = /* @__PURE__ */ function(_this) {
            return function(text) {
              var charChild, s;
              s = stack[stack.length - 1];
              if (s) {
                s[charkey] += text;
                if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, "").trim() !== "")) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  charChild = {
                    "#name": "__text__"
                  };
                  charChild[charkey] = text;
                  if (_this.options.normalize) {
                    charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
                  }
                  s[_this.options.childkey].push(charChild);
                }
                return s;
              }
            };
          }(this);
          this.saxParser.ontext = ontext;
          return this.saxParser.oncdata = /* @__PURE__ */ function(_this) {
            return function(text) {
              var s;
              s = ontext(text);
              if (s) {
                return s.cdata = true;
              }
            };
          }(this);
        };
        Parser.prototype.parseString = function(str, cb) {
          var err;
          if (cb != null && typeof cb === "function") {
            this.on("end", function(result) {
              this.reset();
              return cb(null, result);
            });
            this.on("error", function(err2) {
              this.reset();
              return cb(err2);
            });
          }
          try {
            str = str.toString();
            if (str.trim() === "") {
              this.emit("end", null);
              return true;
            }
            str = bom.stripBOM(str);
            if (this.options.async) {
              this.remaining = str;
              setImmediate(this.processAsync);
              return this.saxParser;
            }
            return this.saxParser.write(str).close();
          } catch (error1) {
            err = error1;
            if (!(this.saxParser.errThrown || this.saxParser.ended)) {
              this.emit("error", err);
              return this.saxParser.errThrown = true;
            } else if (this.saxParser.ended) {
              throw err;
            }
          }
        };
        Parser.prototype.parseStringPromise = function(str) {
          return new Promise(/* @__PURE__ */ function(_this) {
            return function(resolve, reject) {
              return _this.parseString(str, function(err, value) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(value);
                }
              });
            };
          }(this));
        };
        return Parser;
      }(events);
      exports.parseString = function(str, a, b) {
        var cb, options, parser;
        if (b != null) {
          if (typeof b === "function") {
            cb = b;
          }
          if (typeof a === "object") {
            options = a;
          }
        } else {
          if (typeof a === "function") {
            cb = a;
          }
          options = {};
        }
        parser = new exports.Parser(options);
        return parser.parseString(str, cb);
      };
      exports.parseStringPromise = function(str, a) {
        var options, parser;
        if (typeof a === "object") {
          options = a;
        }
        parser = new exports.Parser(options);
        return parser.parseStringPromise(str);
      };
    }).call(exports);
  }
});

// node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/xml2js.js
var require_xml2js = __commonJS({
  "node_modules/@alicloud/tea-xml/node_modules/xml2js/lib/xml2js.js"(exports) {
    (function() {
      "use strict";
      var builder, defaults, parser, processors, extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      }, hasProp = {}.hasOwnProperty;
      defaults = require_defaults();
      builder = require_builder();
      parser = require_parser();
      processors = require_processors();
      exports.defaults = defaults.defaults;
      exports.processors = processors;
      exports.ValidationError = function(superClass) {
        extend(ValidationError, superClass);
        function ValidationError(message) {
          this.message = message;
        }
        return ValidationError;
      }(Error);
      exports.Builder = builder.Builder;
      exports.Parser = parser.Parser;
      exports.parseString = parser.parseString;
      exports.parseStringPromise = parser.parseStringPromise;
    }).call(exports);
  }
});

// node_modules/@alicloud/tea-xml/dist/client.js
var require_client5 = __commonJS({
  "node_modules/@alicloud/tea-xml/dist/client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var xml2js_1 = require_xml2js();
    var Client2 = class {
      static parseXml(body, response) {
        let ret = this._parseXML(body);
        if (response !== null && typeof response !== "undefined") {
          ret = this._xmlCast(ret, response);
        }
        return ret;
      }
      static toXML(body) {
        const builder = new xml2js_1.Builder();
        return builder.buildObject(body);
      }
      static _parseXML(body) {
        let parser = new xml2js_1.Parser({ explicitArray: false });
        let result = {};
        parser.parseString(body, function(err, output) {
          result.err = err;
          result.output = output;
        });
        if (result.err) {
          throw result.err;
        }
        return result.output;
      }
      static _xmlCast(obj, clazz) {
        obj = obj || {};
        let ret = {};
        let clz = clazz;
        let names = clz.names();
        let types = clz.types();
        Object.keys(names).forEach((key) => {
          let originName = names[key];
          let value = obj[originName];
          let type = types[key];
          switch (type) {
            case "boolean":
              if (!value) {
                ret[originName] = false;
                return;
              }
              ret[originName] = value === "false" ? false : true;
              return;
            case "number":
              if (value != 0 && !value) {
                ret[originName] = NaN;
                return;
              }
              ret[originName] = +value;
              return;
            case "string":
              if (!value) {
                ret[originName] = "";
                return;
              }
              ret[originName] = value.toString();
              return;
            default:
              if (type.type === "array") {
                if (!value) {
                  ret[originName] = [];
                  return;
                }
                if (!Array.isArray(value)) {
                  value = [value];
                }
                if (typeof type.itemType === "function") {
                  ret[originName] = value.map((d) => {
                    return this._xmlCast(d, type.itemType);
                  });
                } else {
                  ret[originName] = value;
                }
              } else if (typeof type === "function") {
                if (!value) {
                  value = {};
                }
                ret[originName] = this._xmlCast(value, type);
              } else {
                ret[originName] = value;
              }
          }
        });
        return ret;
      }
    };
    exports.default = Client2;
  }
});

// node_modules/@alicloud/openapi-client/dist/client.js
var require_client6 = __commonJS({
  "node_modules/@alicloud/openapi-client/dist/client.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Params = exports.OpenApiRequest = exports.Config = exports.GlobalParameters = void 0;
    var tea_util_1 = __importDefault(require_client());
    var credentials_1 = __importStar(require_client2());
    var $Credential = credentials_1;
    var openapi_util_1 = __importDefault(require_client3());
    var $SPI = __importStar(require_client4());
    var tea_xml_1 = __importDefault(require_client5());
    var $tea = __importStar(require_tea());
    var GlobalParameters = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          headers: "headers",
          queries: "queries"
        };
      }
      static types() {
        return {
          headers: { "type": "map", "keyType": "string", "valueType": "string" },
          queries: { "type": "map", "keyType": "string", "valueType": "string" }
        };
      }
    };
    exports.GlobalParameters = GlobalParameters;
    var Config2 = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          accessKeyId: "accessKeyId",
          accessKeySecret: "accessKeySecret",
          securityToken: "securityToken",
          bearerToken: "bearerToken",
          protocol: "protocol",
          method: "method",
          regionId: "regionId",
          readTimeout: "readTimeout",
          connectTimeout: "connectTimeout",
          httpProxy: "httpProxy",
          httpsProxy: "httpsProxy",
          credential: "credential",
          endpoint: "endpoint",
          noProxy: "noProxy",
          maxIdleConns: "maxIdleConns",
          network: "network",
          userAgent: "userAgent",
          suffix: "suffix",
          socks5Proxy: "socks5Proxy",
          socks5NetWork: "socks5NetWork",
          endpointType: "endpointType",
          openPlatformEndpoint: "openPlatformEndpoint",
          type: "type",
          signatureVersion: "signatureVersion",
          signatureAlgorithm: "signatureAlgorithm",
          globalParameters: "globalParameters",
          key: "key",
          cert: "cert",
          ca: "ca",
          disableHttp2: "disableHttp2"
        };
      }
      static types() {
        return {
          accessKeyId: "string",
          accessKeySecret: "string",
          securityToken: "string",
          bearerToken: "string",
          protocol: "string",
          method: "string",
          regionId: "string",
          readTimeout: "number",
          connectTimeout: "number",
          httpProxy: "string",
          httpsProxy: "string",
          credential: credentials_1.default,
          endpoint: "string",
          noProxy: "string",
          maxIdleConns: "number",
          network: "string",
          userAgent: "string",
          suffix: "string",
          socks5Proxy: "string",
          socks5NetWork: "string",
          endpointType: "string",
          openPlatformEndpoint: "string",
          type: "string",
          signatureVersion: "string",
          signatureAlgorithm: "string",
          globalParameters: GlobalParameters,
          key: "string",
          cert: "string",
          ca: "string",
          disableHttp2: "boolean"
        };
      }
    };
    exports.Config = Config2;
    var OpenApiRequest = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          headers: "headers",
          query: "query",
          body: "body",
          stream: "stream",
          hostMap: "hostMap",
          endpointOverride: "endpointOverride"
        };
      }
      static types() {
        return {
          headers: { "type": "map", "keyType": "string", "valueType": "string" },
          query: { "type": "map", "keyType": "string", "valueType": "string" },
          body: "any",
          stream: "Readable",
          hostMap: { "type": "map", "keyType": "string", "valueType": "string" },
          endpointOverride: "string"
        };
      }
    };
    exports.OpenApiRequest = OpenApiRequest;
    var Params = class extends $tea.Model {
      constructor(map) {
        super(map);
      }
      static names() {
        return {
          action: "action",
          version: "version",
          protocol: "protocol",
          pathname: "pathname",
          method: "method",
          authType: "authType",
          bodyType: "bodyType",
          reqBodyType: "reqBodyType",
          style: "style"
        };
      }
      static types() {
        return {
          action: "string",
          version: "string",
          protocol: "string",
          pathname: "string",
          method: "string",
          authType: "string",
          bodyType: "string",
          reqBodyType: "string",
          style: "string"
        };
      }
    };
    exports.Params = Params;
    var Client2 = class _Client {
      /**
       * Init client with Config
       * @param config config contains the necessary information to create a client
       */
      constructor(config) {
        if (tea_util_1.default.isUnset(config)) {
          throw $tea.newError({
            code: "ParameterMissing",
            message: "'config' can not be unset"
          });
        }
        if (!tea_util_1.default.empty(config.accessKeyId) && !tea_util_1.default.empty(config.accessKeySecret)) {
          if (!tea_util_1.default.empty(config.securityToken)) {
            config.type = "sts";
          } else {
            config.type = "access_key";
          }
          let credentialConfig = new $Credential.Config({
            accessKeyId: config.accessKeyId,
            type: config.type,
            accessKeySecret: config.accessKeySecret
          });
          credentialConfig.securityToken = config.securityToken;
          this._credential = new credentials_1.default(credentialConfig);
        } else if (!tea_util_1.default.empty(config.bearerToken)) {
          let cc = new $Credential.Config({
            type: "bearer",
            bearerToken: config.bearerToken
          });
          this._credential = new credentials_1.default(cc);
        } else if (!tea_util_1.default.isUnset(config.credential)) {
          this._credential = config.credential;
        }
        this._endpoint = config.endpoint;
        this._endpointType = config.endpointType;
        this._network = config.network;
        this._suffix = config.suffix;
        this._protocol = config.protocol;
        this._method = config.method;
        this._regionId = config.regionId;
        this._userAgent = config.userAgent;
        this._readTimeout = config.readTimeout;
        this._connectTimeout = config.connectTimeout;
        this._httpProxy = config.httpProxy;
        this._httpsProxy = config.httpsProxy;
        this._noProxy = config.noProxy;
        this._socks5Proxy = config.socks5Proxy;
        this._socks5NetWork = config.socks5NetWork;
        this._maxIdleConns = config.maxIdleConns;
        this._signatureVersion = config.signatureVersion;
        this._signatureAlgorithm = config.signatureAlgorithm;
        this._globalParameters = config.globalParameters;
        this._key = config.key;
        this._cert = config.cert;
        this._ca = config.ca;
        this._disableHttp2 = config.disableHttp2;
      }
      /**
       * Encapsulate the request and invoke the network
       * @param action api name
       * @param version product version
       * @param protocol http or https
       * @param method e.g. GET
       * @param authType authorization type e.g. AK
       * @param bodyType response body type e.g. String
       * @param request object of OpenApiRequest
       * @param runtime which controls some details of call api, such as retry times
       * @return the response
       */
      doRPCRequest(action, version, protocol, method, authType, bodyType, request, runtime) {
        return __async(this, null, function* () {
          let _runtime = {
            timeouted: "retry",
            key: tea_util_1.default.defaultString(runtime.key, this._key),
            cert: tea_util_1.default.defaultString(runtime.cert, this._cert),
            ca: tea_util_1.default.defaultString(runtime.ca, this._ca),
            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
              retryable: runtime.autoretry,
              maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3)
            },
            backoff: {
              policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
              period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1)
            },
            ignoreSSL: runtime.ignoreSSL
          };
          let _lastRequest = null;
          let _now = Date.now();
          let _retryTimes = 0;
          while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
            if (_retryTimes > 0) {
              let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
              if (_backoffTime > 0) {
                yield $tea.sleep(_backoffTime);
              }
            }
            _retryTimes = _retryTimes + 1;
            try {
              let request_ = new $tea.Request();
              request_.protocol = tea_util_1.default.defaultString(this._protocol, protocol);
              request_.method = method;
              request_.pathname = "/";
              let globalQueries = {};
              let globalHeaders = {};
              if (!tea_util_1.default.isUnset(this._globalParameters)) {
                let globalParams = this._globalParameters;
                if (!tea_util_1.default.isUnset(globalParams.queries)) {
                  globalQueries = globalParams.queries;
                }
                if (!tea_util_1.default.isUnset(globalParams.headers)) {
                  globalHeaders = globalParams.headers;
                }
              }
              let extendsHeaders = {};
              let extendsQueries = {};
              if (!tea_util_1.default.isUnset(runtime.extendsParameters)) {
                let extendsParameters = runtime.extendsParameters;
                if (!tea_util_1.default.isUnset(extendsParameters.headers)) {
                  extendsHeaders = extendsParameters.headers;
                }
                if (!tea_util_1.default.isUnset(extendsParameters.queries)) {
                  extendsQueries = extendsParameters.queries;
                }
              }
              request_.query = Object.assign(Object.assign(Object.assign({ Action: action, Format: "json", Version: version, Timestamp: openapi_util_1.default.getTimestamp(), SignatureNonce: tea_util_1.default.getNonce() }, globalQueries), extendsQueries), request.query);
              let headers = this.getRpcHeaders();
              if (tea_util_1.default.isUnset(headers)) {
                request_.headers = Object.assign(Object.assign({ host: this._endpoint, "x-acs-version": version, "x-acs-action": action, "user-agent": this.getUserAgent() }, globalHeaders), extendsHeaders);
              } else {
                request_.headers = Object.assign(Object.assign(Object.assign({ host: this._endpoint, "x-acs-version": version, "x-acs-action": action, "user-agent": this.getUserAgent() }, globalHeaders), extendsHeaders), headers);
              }
              if (!tea_util_1.default.isUnset(request.body)) {
                let m = tea_util_1.default.assertAsMap(request.body);
                let tmp = tea_util_1.default.anyifyMapValue(openapi_util_1.default.query(m));
                request_.body = new $tea.BytesReadable(tea_util_1.default.toFormString(tmp));
                request_.headers["content-type"] = "application/x-www-form-urlencoded";
              }
              if (!tea_util_1.default.equalString(authType, "Anonymous")) {
                let credentialModel = yield this._credential.getCredential();
                let credentialType = credentialModel.type;
                if (tea_util_1.default.equalString(credentialType, "bearer")) {
                  let bearerToken = credentialModel.bearerToken;
                  request_.query["BearerToken"] = bearerToken;
                  request_.query["SignatureType"] = "BEARERTOKEN";
                } else {
                  let accessKeyId = credentialModel.accessKeyId;
                  let accessKeySecret = credentialModel.accessKeySecret;
                  let securityToken = credentialModel.securityToken;
                  if (!tea_util_1.default.empty(securityToken)) {
                    request_.query["SecurityToken"] = securityToken;
                  }
                  request_.query["SignatureMethod"] = "HMAC-SHA1";
                  request_.query["SignatureVersion"] = "1.0";
                  request_.query["AccessKeyId"] = accessKeyId;
                  let t = null;
                  if (!tea_util_1.default.isUnset(request.body)) {
                    t = tea_util_1.default.assertAsMap(request.body);
                  }
                  let signedParam = Object.assign(Object.assign({}, request_.query), openapi_util_1.default.query(t));
                  request_.query["Signature"] = openapi_util_1.default.getRPCSignature(signedParam, request_.method, accessKeySecret);
                }
              }
              _lastRequest = request_;
              let response_ = yield $tea.doAction(request_, _runtime);
              if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                let _res = yield tea_util_1.default.readAsJSON(response_.body);
                let err = tea_util_1.default.assertAsMap(_res);
                let requestId = _Client.defaultAny(err["RequestId"], err["requestId"]);
                err["statusCode"] = response_.statusCode;
                throw $tea.newError({
                  code: `${_Client.defaultAny(err["Code"], err["code"])}`,
                  message: `code: ${response_.statusCode}, ${_Client.defaultAny(err["Message"], err["message"])} request id: ${requestId}`,
                  data: err,
                  description: `${_Client.defaultAny(err["Description"], err["description"])}`,
                  accessDeniedDetail: _Client.defaultAny(err["AccessDeniedDetail"], err["accessDeniedDetail"])
                });
              }
              if (tea_util_1.default.equalString(bodyType, "binary")) {
                let resp = {
                  body: response_.body,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
                return resp;
              } else if (tea_util_1.default.equalString(bodyType, "byte")) {
                let byt = yield tea_util_1.default.readAsBytes(response_.body);
                return {
                  body: byt,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "string")) {
                let str = yield tea_util_1.default.readAsString(response_.body);
                return {
                  body: str,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "json")) {
                let obj = yield tea_util_1.default.readAsJSON(response_.body);
                let res = tea_util_1.default.assertAsMap(obj);
                return {
                  body: res,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "array")) {
                let arr = yield tea_util_1.default.readAsJSON(response_.body);
                return {
                  body: arr,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else {
                return {
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              }
            } catch (ex) {
              if ($tea.isRetryable(ex)) {
                continue;
              }
              throw ex;
            }
          }
          throw $tea.newUnretryableError(_lastRequest);
        });
      }
      /**
       * Encapsulate the request and invoke the network
       * @param action api name
       * @param version product version
       * @param protocol http or https
       * @param method e.g. GET
       * @param authType authorization type e.g. AK
       * @param pathname pathname of every api
       * @param bodyType response body type e.g. String
       * @param request object of OpenApiRequest
       * @param runtime which controls some details of call api, such as retry times
       * @return the response
       */
      doROARequest(action, version, protocol, method, authType, pathname, bodyType, request, runtime) {
        return __async(this, null, function* () {
          let _runtime = {
            timeouted: "retry",
            key: tea_util_1.default.defaultString(runtime.key, this._key),
            cert: tea_util_1.default.defaultString(runtime.cert, this._cert),
            ca: tea_util_1.default.defaultString(runtime.ca, this._ca),
            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
              retryable: runtime.autoretry,
              maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3)
            },
            backoff: {
              policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
              period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1)
            },
            ignoreSSL: runtime.ignoreSSL
          };
          let _lastRequest = null;
          let _now = Date.now();
          let _retryTimes = 0;
          while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
            if (_retryTimes > 0) {
              let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
              if (_backoffTime > 0) {
                yield $tea.sleep(_backoffTime);
              }
            }
            _retryTimes = _retryTimes + 1;
            try {
              let request_ = new $tea.Request();
              request_.protocol = tea_util_1.default.defaultString(this._protocol, protocol);
              request_.method = method;
              request_.pathname = pathname;
              let globalQueries = {};
              let globalHeaders = {};
              if (!tea_util_1.default.isUnset(this._globalParameters)) {
                let globalParams = this._globalParameters;
                if (!tea_util_1.default.isUnset(globalParams.queries)) {
                  globalQueries = globalParams.queries;
                }
                if (!tea_util_1.default.isUnset(globalParams.headers)) {
                  globalHeaders = globalParams.headers;
                }
              }
              let extendsHeaders = {};
              let extendsQueries = {};
              if (!tea_util_1.default.isUnset(runtime.extendsParameters)) {
                let extendsParameters = runtime.extendsParameters;
                if (!tea_util_1.default.isUnset(extendsParameters.headers)) {
                  extendsHeaders = extendsParameters.headers;
                }
                if (!tea_util_1.default.isUnset(extendsParameters.queries)) {
                  extendsQueries = extendsParameters.queries;
                }
              }
              request_.headers = Object.assign(Object.assign(Object.assign({ date: tea_util_1.default.getDateUTCString(), host: this._endpoint, accept: "application/json", "x-acs-signature-nonce": tea_util_1.default.getNonce(), "x-acs-signature-method": "HMAC-SHA1", "x-acs-signature-version": "1.0", "x-acs-version": version, "x-acs-action": action, "user-agent": tea_util_1.default.getUserAgent(this._userAgent) }, globalHeaders), extendsHeaders), request.headers);
              if (!tea_util_1.default.isUnset(request.body)) {
                request_.body = new $tea.BytesReadable(tea_util_1.default.toJSONString(request.body));
                request_.headers["content-type"] = "application/json; charset=utf-8";
              }
              request_.query = Object.assign(Object.assign({}, globalQueries), extendsQueries);
              if (!tea_util_1.default.isUnset(request.query)) {
                request_.query = Object.assign(Object.assign({}, request_.query), request.query);
              }
              if (!tea_util_1.default.equalString(authType, "Anonymous")) {
                let credentialModel = yield this._credential.getCredential();
                let credentialType = credentialModel.type;
                if (tea_util_1.default.equalString(credentialType, "bearer")) {
                  let bearerToken = credentialModel.bearerToken;
                  request_.headers["x-acs-bearer-token"] = bearerToken;
                  request_.headers["x-acs-signature-type"] = "BEARERTOKEN";
                } else {
                  let accessKeyId = credentialModel.accessKeyId;
                  let accessKeySecret = credentialModel.accessKeySecret;
                  let securityToken = credentialModel.securityToken;
                  if (!tea_util_1.default.empty(securityToken)) {
                    request_.headers["x-acs-accesskey-id"] = accessKeyId;
                    request_.headers["x-acs-security-token"] = securityToken;
                  }
                  let stringToSign = openapi_util_1.default.getStringToSign(request_);
                  request_.headers["authorization"] = `acs ${accessKeyId}:${openapi_util_1.default.getROASignature(stringToSign, accessKeySecret)}`;
                }
              }
              _lastRequest = request_;
              let response_ = yield $tea.doAction(request_, _runtime);
              if (tea_util_1.default.equalNumber(response_.statusCode, 204)) {
                return {
                  headers: response_.headers
                };
              }
              if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                let _res = yield tea_util_1.default.readAsJSON(response_.body);
                let err = tea_util_1.default.assertAsMap(_res);
                let requestId = _Client.defaultAny(err["RequestId"], err["requestId"]);
                requestId = _Client.defaultAny(requestId, err["requestid"]);
                err["statusCode"] = response_.statusCode;
                throw $tea.newError({
                  code: `${_Client.defaultAny(err["Code"], err["code"])}`,
                  message: `code: ${response_.statusCode}, ${_Client.defaultAny(err["Message"], err["message"])} request id: ${requestId}`,
                  data: err,
                  description: `${_Client.defaultAny(err["Description"], err["description"])}`,
                  accessDeniedDetail: _Client.defaultAny(err["AccessDeniedDetail"], err["accessDeniedDetail"])
                });
              }
              if (tea_util_1.default.equalString(bodyType, "binary")) {
                let resp = {
                  body: response_.body,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
                return resp;
              } else if (tea_util_1.default.equalString(bodyType, "byte")) {
                let byt = yield tea_util_1.default.readAsBytes(response_.body);
                return {
                  body: byt,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "string")) {
                let str = yield tea_util_1.default.readAsString(response_.body);
                return {
                  body: str,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "json")) {
                let obj = yield tea_util_1.default.readAsJSON(response_.body);
                let res = tea_util_1.default.assertAsMap(obj);
                return {
                  body: res,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "array")) {
                let arr = yield tea_util_1.default.readAsJSON(response_.body);
                return {
                  body: arr,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else {
                return {
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              }
            } catch (ex) {
              if ($tea.isRetryable(ex)) {
                continue;
              }
              throw ex;
            }
          }
          throw $tea.newUnretryableError(_lastRequest);
        });
      }
      /**
       * Encapsulate the request and invoke the network with form body
       * @param action api name
       * @param version product version
       * @param protocol http or https
       * @param method e.g. GET
       * @param authType authorization type e.g. AK
       * @param pathname pathname of every api
       * @param bodyType response body type e.g. String
       * @param request object of OpenApiRequest
       * @param runtime which controls some details of call api, such as retry times
       * @return the response
       */
      doROARequestWithForm(action, version, protocol, method, authType, pathname, bodyType, request, runtime) {
        return __async(this, null, function* () {
          let _runtime = {
            timeouted: "retry",
            key: tea_util_1.default.defaultString(runtime.key, this._key),
            cert: tea_util_1.default.defaultString(runtime.cert, this._cert),
            ca: tea_util_1.default.defaultString(runtime.ca, this._ca),
            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
              retryable: runtime.autoretry,
              maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3)
            },
            backoff: {
              policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
              period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1)
            },
            ignoreSSL: runtime.ignoreSSL
          };
          let _lastRequest = null;
          let _now = Date.now();
          let _retryTimes = 0;
          while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
            if (_retryTimes > 0) {
              let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
              if (_backoffTime > 0) {
                yield $tea.sleep(_backoffTime);
              }
            }
            _retryTimes = _retryTimes + 1;
            try {
              let request_ = new $tea.Request();
              request_.protocol = tea_util_1.default.defaultString(this._protocol, protocol);
              request_.method = method;
              request_.pathname = pathname;
              let globalQueries = {};
              let globalHeaders = {};
              if (!tea_util_1.default.isUnset(this._globalParameters)) {
                let globalParams = this._globalParameters;
                if (!tea_util_1.default.isUnset(globalParams.queries)) {
                  globalQueries = globalParams.queries;
                }
                if (!tea_util_1.default.isUnset(globalParams.headers)) {
                  globalHeaders = globalParams.headers;
                }
              }
              let extendsHeaders = {};
              let extendsQueries = {};
              if (!tea_util_1.default.isUnset(runtime.extendsParameters)) {
                let extendsParameters = runtime.extendsParameters;
                if (!tea_util_1.default.isUnset(extendsParameters.headers)) {
                  extendsHeaders = extendsParameters.headers;
                }
                if (!tea_util_1.default.isUnset(extendsParameters.queries)) {
                  extendsQueries = extendsParameters.queries;
                }
              }
              request_.headers = Object.assign(Object.assign(Object.assign({ date: tea_util_1.default.getDateUTCString(), host: this._endpoint, accept: "application/json", "x-acs-signature-nonce": tea_util_1.default.getNonce(), "x-acs-signature-method": "HMAC-SHA1", "x-acs-signature-version": "1.0", "x-acs-version": version, "x-acs-action": action, "user-agent": tea_util_1.default.getUserAgent(this._userAgent) }, globalHeaders), extendsHeaders), request.headers);
              if (!tea_util_1.default.isUnset(request.body)) {
                let m = tea_util_1.default.assertAsMap(request.body);
                request_.body = new $tea.BytesReadable(openapi_util_1.default.toForm(m));
                request_.headers["content-type"] = "application/x-www-form-urlencoded";
              }
              request_.query = Object.assign(Object.assign({}, globalQueries), extendsQueries);
              if (!tea_util_1.default.isUnset(request.query)) {
                request_.query = Object.assign(Object.assign({}, request_.query), request.query);
              }
              if (!tea_util_1.default.equalString(authType, "Anonymous")) {
                let credentialModel = yield this._credential.getCredential();
                let credentialType = credentialModel.type;
                if (tea_util_1.default.equalString(credentialType, "bearer")) {
                  let bearerToken = credentialModel.bearerToken;
                  request_.headers["x-acs-bearer-token"] = bearerToken;
                  request_.headers["x-acs-signature-type"] = "BEARERTOKEN";
                } else {
                  let accessKeyId = credentialModel.accessKeyId;
                  let accessKeySecret = credentialModel.accessKeySecret;
                  let securityToken = credentialModel.securityToken;
                  if (!tea_util_1.default.empty(securityToken)) {
                    request_.headers["x-acs-accesskey-id"] = accessKeyId;
                    request_.headers["x-acs-security-token"] = securityToken;
                  }
                  let stringToSign = openapi_util_1.default.getStringToSign(request_);
                  request_.headers["authorization"] = `acs ${accessKeyId}:${openapi_util_1.default.getROASignature(stringToSign, accessKeySecret)}`;
                }
              }
              _lastRequest = request_;
              let response_ = yield $tea.doAction(request_, _runtime);
              if (tea_util_1.default.equalNumber(response_.statusCode, 204)) {
                return {
                  headers: response_.headers
                };
              }
              if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                let _res = yield tea_util_1.default.readAsJSON(response_.body);
                let err = tea_util_1.default.assertAsMap(_res);
                err["statusCode"] = response_.statusCode;
                throw $tea.newError({
                  code: `${_Client.defaultAny(err["Code"], err["code"])}`,
                  message: `code: ${response_.statusCode}, ${_Client.defaultAny(err["Message"], err["message"])} request id: ${_Client.defaultAny(err["RequestId"], err["requestId"])}`,
                  data: err,
                  description: `${_Client.defaultAny(err["Description"], err["description"])}`,
                  accessDeniedDetail: _Client.defaultAny(err["AccessDeniedDetail"], err["accessDeniedDetail"])
                });
              }
              if (tea_util_1.default.equalString(bodyType, "binary")) {
                let resp = {
                  body: response_.body,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
                return resp;
              } else if (tea_util_1.default.equalString(bodyType, "byte")) {
                let byt = yield tea_util_1.default.readAsBytes(response_.body);
                return {
                  body: byt,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "string")) {
                let str = yield tea_util_1.default.readAsString(response_.body);
                return {
                  body: str,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "json")) {
                let obj = yield tea_util_1.default.readAsJSON(response_.body);
                let res = tea_util_1.default.assertAsMap(obj);
                return {
                  body: res,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(bodyType, "array")) {
                let arr = yield tea_util_1.default.readAsJSON(response_.body);
                return {
                  body: arr,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else {
                return {
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              }
            } catch (ex) {
              if ($tea.isRetryable(ex)) {
                continue;
              }
              throw ex;
            }
          }
          throw $tea.newUnretryableError(_lastRequest);
        });
      }
      /**
       * Encapsulate the request and invoke the network
       * @param action api name
       * @param version product version
       * @param protocol http or https
       * @param method e.g. GET
       * @param authType authorization type e.g. AK
       * @param bodyType response body type e.g. String
       * @param request object of OpenApiRequest
       * @param runtime which controls some details of call api, such as retry times
       * @return the response
       */
      doRequest(params, request, runtime) {
        return __async(this, null, function* () {
          let _runtime = {
            timeouted: "retry",
            key: tea_util_1.default.defaultString(runtime.key, this._key),
            cert: tea_util_1.default.defaultString(runtime.cert, this._cert),
            ca: tea_util_1.default.defaultString(runtime.ca, this._ca),
            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
              retryable: runtime.autoretry,
              maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3)
            },
            backoff: {
              policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
              period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1)
            },
            ignoreSSL: runtime.ignoreSSL
          };
          let _lastRequest = null;
          let _now = Date.now();
          let _retryTimes = 0;
          while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
            if (_retryTimes > 0) {
              let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
              if (_backoffTime > 0) {
                yield $tea.sleep(_backoffTime);
              }
            }
            _retryTimes = _retryTimes + 1;
            try {
              let request_ = new $tea.Request();
              request_.protocol = tea_util_1.default.defaultString(this._protocol, params.protocol);
              request_.method = params.method;
              request_.pathname = params.pathname;
              let globalQueries = {};
              let globalHeaders = {};
              if (!tea_util_1.default.isUnset(this._globalParameters)) {
                let globalParams = this._globalParameters;
                if (!tea_util_1.default.isUnset(globalParams.queries)) {
                  globalQueries = globalParams.queries;
                }
                if (!tea_util_1.default.isUnset(globalParams.headers)) {
                  globalHeaders = globalParams.headers;
                }
              }
              let extendsHeaders = {};
              let extendsQueries = {};
              if (!tea_util_1.default.isUnset(runtime.extendsParameters)) {
                let extendsParameters = runtime.extendsParameters;
                if (!tea_util_1.default.isUnset(extendsParameters.headers)) {
                  extendsHeaders = extendsParameters.headers;
                }
                if (!tea_util_1.default.isUnset(extendsParameters.queries)) {
                  extendsQueries = extendsParameters.queries;
                }
              }
              request_.query = Object.assign(Object.assign(Object.assign({}, globalQueries), extendsQueries), request.query);
              request_.headers = Object.assign(Object.assign(Object.assign({ host: this._endpoint, "x-acs-version": params.version, "x-acs-action": params.action, "user-agent": this.getUserAgent(), "x-acs-date": openapi_util_1.default.getTimestamp(), "x-acs-signature-nonce": tea_util_1.default.getNonce(), accept: "application/json" }, globalHeaders), extendsHeaders), request.headers);
              if (tea_util_1.default.equalString(params.style, "RPC")) {
                let headers = this.getRpcHeaders();
                if (!tea_util_1.default.isUnset(headers)) {
                  request_.headers = Object.assign(Object.assign({}, request_.headers), headers);
                }
              }
              let signatureAlgorithm = tea_util_1.default.defaultString(this._signatureAlgorithm, "ACS3-HMAC-SHA256");
              let hashedRequestPayload = openapi_util_1.default.hexEncode(openapi_util_1.default.hash(tea_util_1.default.toBytes(""), signatureAlgorithm));
              if (!tea_util_1.default.isUnset(request.stream)) {
                let tmp = yield tea_util_1.default.readAsBytes(request.stream);
                hashedRequestPayload = openapi_util_1.default.hexEncode(openapi_util_1.default.hash(tmp, signatureAlgorithm));
                request_.body = new $tea.BytesReadable(tmp);
                request_.headers["content-type"] = "application/octet-stream";
              } else {
                if (!tea_util_1.default.isUnset(request.body)) {
                  if (tea_util_1.default.equalString(params.reqBodyType, "byte")) {
                    let byteObj = tea_util_1.default.assertAsBytes(request.body);
                    hashedRequestPayload = openapi_util_1.default.hexEncode(openapi_util_1.default.hash(byteObj, signatureAlgorithm));
                    request_.body = new $tea.BytesReadable(byteObj);
                  } else if (tea_util_1.default.equalString(params.reqBodyType, "json")) {
                    let jsonObj = tea_util_1.default.toJSONString(request.body);
                    hashedRequestPayload = openapi_util_1.default.hexEncode(openapi_util_1.default.hash(tea_util_1.default.toBytes(jsonObj), signatureAlgorithm));
                    request_.body = new $tea.BytesReadable(jsonObj);
                    request_.headers["content-type"] = "application/json; charset=utf-8";
                  } else {
                    let m = tea_util_1.default.assertAsMap(request.body);
                    let formObj = openapi_util_1.default.toForm(m);
                    hashedRequestPayload = openapi_util_1.default.hexEncode(openapi_util_1.default.hash(tea_util_1.default.toBytes(formObj), signatureAlgorithm));
                    request_.body = new $tea.BytesReadable(formObj);
                    request_.headers["content-type"] = "application/x-www-form-urlencoded";
                  }
                }
              }
              request_.headers["x-acs-content-sha256"] = hashedRequestPayload;
              if (!tea_util_1.default.equalString(params.authType, "Anonymous")) {
                let credentialModel = yield this._credential.getCredential();
                let authType = credentialModel.type;
                if (tea_util_1.default.equalString(authType, "bearer")) {
                  let bearerToken = credentialModel.bearerToken;
                  request_.headers["x-acs-bearer-token"] = bearerToken;
                  if (tea_util_1.default.equalString(params.style, "RPC")) {
                    request_.query["SignatureType"] = "BEARERTOKEN";
                  } else {
                    request_.headers["x-acs-signature-type"] = "BEARERTOKEN";
                  }
                } else {
                  let accessKeyId = credentialModel.accessKeyId;
                  let accessKeySecret = credentialModel.accessKeySecret;
                  let securityToken = credentialModel.securityToken;
                  if (!tea_util_1.default.empty(securityToken)) {
                    request_.headers["x-acs-accesskey-id"] = accessKeyId;
                    request_.headers["x-acs-security-token"] = securityToken;
                  }
                  request_.headers["Authorization"] = openapi_util_1.default.getAuthorization(request_, signatureAlgorithm, hashedRequestPayload, accessKeyId, accessKeySecret);
                }
              }
              _lastRequest = request_;
              let response_ = yield $tea.doAction(request_, _runtime);
              if (tea_util_1.default.is4xx(response_.statusCode) || tea_util_1.default.is5xx(response_.statusCode)) {
                let err = {};
                if (!tea_util_1.default.isUnset(response_.headers["content-type"]) && tea_util_1.default.equalString(response_.headers["content-type"], "text/xml;charset=utf-8")) {
                  let _str = yield tea_util_1.default.readAsString(response_.body);
                  let respMap = tea_xml_1.default.parseXml(_str, null);
                  err = tea_util_1.default.assertAsMap(respMap["Error"]);
                } else {
                  let _res = yield tea_util_1.default.readAsJSON(response_.body);
                  err = tea_util_1.default.assertAsMap(_res);
                }
                err["statusCode"] = response_.statusCode;
                throw $tea.newError({
                  code: `${_Client.defaultAny(err["Code"], err["code"])}`,
                  message: `code: ${response_.statusCode}, ${_Client.defaultAny(err["Message"], err["message"])} request id: ${_Client.defaultAny(err["RequestId"], err["requestId"])}`,
                  data: err,
                  description: `${_Client.defaultAny(err["Description"], err["description"])}`,
                  accessDeniedDetail: _Client.defaultAny(err["AccessDeniedDetail"], err["accessDeniedDetail"])
                });
              }
              if (tea_util_1.default.equalString(params.bodyType, "binary")) {
                let resp = {
                  body: response_.body,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
                return resp;
              } else if (tea_util_1.default.equalString(params.bodyType, "byte")) {
                let byt = yield tea_util_1.default.readAsBytes(response_.body);
                return {
                  body: byt,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(params.bodyType, "string")) {
                let str = yield tea_util_1.default.readAsString(response_.body);
                return {
                  body: str,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(params.bodyType, "json")) {
                let obj = yield tea_util_1.default.readAsJSON(response_.body);
                let res = tea_util_1.default.assertAsMap(obj);
                return {
                  body: res,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else if (tea_util_1.default.equalString(params.bodyType, "array")) {
                let arr = yield tea_util_1.default.readAsJSON(response_.body);
                return {
                  body: arr,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              } else {
                let anything = yield tea_util_1.default.readAsString(response_.body);
                return {
                  body: anything,
                  headers: response_.headers,
                  statusCode: response_.statusCode
                };
              }
            } catch (ex) {
              if ($tea.isRetryable(ex)) {
                continue;
              }
              throw ex;
            }
          }
          throw $tea.newUnretryableError(_lastRequest);
        });
      }
      /**
       * Encapsulate the request and invoke the network
       * @param action api name
       * @param version product version
       * @param protocol http or https
       * @param method e.g. GET
       * @param authType authorization type e.g. AK
       * @param bodyType response body type e.g. String
       * @param request object of OpenApiRequest
       * @param runtime which controls some details of call api, such as retry times
       * @return the response
       */
      execute(params, request, runtime) {
        return __async(this, null, function* () {
          let _runtime = {
            timeouted: "retry",
            key: tea_util_1.default.defaultString(runtime.key, this._key),
            cert: tea_util_1.default.defaultString(runtime.cert, this._cert),
            ca: tea_util_1.default.defaultString(runtime.ca, this._ca),
            readTimeout: tea_util_1.default.defaultNumber(runtime.readTimeout, this._readTimeout),
            connectTimeout: tea_util_1.default.defaultNumber(runtime.connectTimeout, this._connectTimeout),
            httpProxy: tea_util_1.default.defaultString(runtime.httpProxy, this._httpProxy),
            httpsProxy: tea_util_1.default.defaultString(runtime.httpsProxy, this._httpsProxy),
            noProxy: tea_util_1.default.defaultString(runtime.noProxy, this._noProxy),
            socks5Proxy: tea_util_1.default.defaultString(runtime.socks5Proxy, this._socks5Proxy),
            socks5NetWork: tea_util_1.default.defaultString(runtime.socks5NetWork, this._socks5NetWork),
            maxIdleConns: tea_util_1.default.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
            retry: {
              retryable: runtime.autoretry,
              maxAttempts: tea_util_1.default.defaultNumber(runtime.maxAttempts, 3)
            },
            backoff: {
              policy: tea_util_1.default.defaultString(runtime.backoffPolicy, "no"),
              period: tea_util_1.default.defaultNumber(runtime.backoffPeriod, 1)
            },
            ignoreSSL: runtime.ignoreSSL,
            disableHttp2: _Client.defaultAny(this._disableHttp2, false)
          };
          let _lastRequest = null;
          let _now = Date.now();
          let _retryTimes = 0;
          while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
            if (_retryTimes > 0) {
              let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
              if (_backoffTime > 0) {
                yield $tea.sleep(_backoffTime);
              }
            }
            _retryTimes = _retryTimes + 1;
            try {
              let request_ = new $tea.Request();
              let headers = this.getRpcHeaders();
              let globalQueries = {};
              let globalHeaders = {};
              if (!tea_util_1.default.isUnset(this._globalParameters)) {
                let globalParams = this._globalParameters;
                if (!tea_util_1.default.isUnset(globalParams.queries)) {
                  globalQueries = globalParams.queries;
                }
                if (!tea_util_1.default.isUnset(globalParams.headers)) {
                  globalHeaders = globalParams.headers;
                }
              }
              let extendsHeaders = {};
              let extendsQueries = {};
              if (!tea_util_1.default.isUnset(runtime.extendsParameters)) {
                let extendsParameters = runtime.extendsParameters;
                if (!tea_util_1.default.isUnset(extendsParameters.headers)) {
                  extendsHeaders = extendsParameters.headers;
                }
                if (!tea_util_1.default.isUnset(extendsParameters.queries)) {
                  extendsQueries = extendsParameters.queries;
                }
              }
              let requestContext = new $SPI.InterceptorContextRequest({
                headers: Object.assign(Object.assign(Object.assign(Object.assign({}, globalHeaders), extendsHeaders), request.headers), headers),
                query: Object.assign(Object.assign(Object.assign({}, globalQueries), extendsQueries), request.query),
                body: request.body,
                stream: request.stream,
                hostMap: request.hostMap,
                pathname: params.pathname,
                productId: this._productId,
                action: params.action,
                version: params.version,
                protocol: tea_util_1.default.defaultString(this._protocol, params.protocol),
                method: tea_util_1.default.defaultString(this._method, params.method),
                authType: params.authType,
                bodyType: params.bodyType,
                reqBodyType: params.reqBodyType,
                style: params.style,
                credential: this._credential,
                signatureVersion: this._signatureVersion,
                signatureAlgorithm: this._signatureAlgorithm,
                userAgent: this.getUserAgent()
              });
              let configurationContext = new $SPI.InterceptorContextConfiguration({
                regionId: this._regionId,
                endpoint: tea_util_1.default.defaultString(request.endpointOverride, this._endpoint),
                endpointRule: this._endpointRule,
                endpointMap: this._endpointMap,
                endpointType: this._endpointType,
                network: this._network,
                suffix: this._suffix
              });
              let interceptorContext = new $SPI.InterceptorContext({
                request: requestContext,
                configuration: configurationContext
              });
              let attributeMap = new $SPI.AttributeMap({});
              yield this._spi.modifyConfiguration(interceptorContext, attributeMap);
              yield this._spi.modifyRequest(interceptorContext, attributeMap);
              request_.protocol = interceptorContext.request.protocol;
              request_.method = interceptorContext.request.method;
              request_.pathname = interceptorContext.request.pathname;
              request_.query = interceptorContext.request.query;
              request_.body = interceptorContext.request.stream;
              request_.headers = interceptorContext.request.headers;
              _lastRequest = request_;
              let response_ = yield $tea.doAction(request_, _runtime);
              let responseContext = new $SPI.InterceptorContextResponse({
                statusCode: response_.statusCode,
                headers: response_.headers,
                body: response_.body
              });
              interceptorContext.response = responseContext;
              yield this._spi.modifyResponse(interceptorContext, attributeMap);
              return {
                headers: interceptorContext.response.headers,
                statusCode: interceptorContext.response.statusCode,
                body: interceptorContext.response.deserializedBody
              };
            } catch (ex) {
              if ($tea.isRetryable(ex)) {
                continue;
              }
              throw ex;
            }
          }
          throw $tea.newUnretryableError(_lastRequest);
        });
      }
      callApi(params, request, runtime) {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(params)) {
            throw $tea.newError({
              code: "ParameterMissing",
              message: "'params' can not be unset"
            });
          }
          if (tea_util_1.default.isUnset(this._signatureAlgorithm) || !tea_util_1.default.equalString(this._signatureAlgorithm, "v2")) {
            return yield this.doRequest(params, request, runtime);
          } else if (tea_util_1.default.equalString(params.style, "ROA") && tea_util_1.default.equalString(params.reqBodyType, "json")) {
            return yield this.doROARequest(params.action, params.version, params.protocol, params.method, params.authType, params.pathname, params.bodyType, request, runtime);
          } else if (tea_util_1.default.equalString(params.style, "ROA")) {
            return yield this.doROARequestWithForm(params.action, params.version, params.protocol, params.method, params.authType, params.pathname, params.bodyType, request, runtime);
          } else {
            return yield this.doRPCRequest(params.action, params.version, params.protocol, params.method, params.authType, params.bodyType, request, runtime);
          }
        });
      }
      /**
       * Get user agent
       * @return user agent
       */
      getUserAgent() {
        let userAgent = tea_util_1.default.getUserAgent(this._userAgent);
        return userAgent;
      }
      /**
       * Get accesskey id by using credential
       * @return accesskey id
       */
      getAccessKeyId() {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(this._credential)) {
            return "";
          }
          let accessKeyId = yield this._credential.getAccessKeyId();
          return accessKeyId;
        });
      }
      /**
       * Get accesskey secret by using credential
       * @return accesskey secret
       */
      getAccessKeySecret() {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(this._credential)) {
            return "";
          }
          let secret = yield this._credential.getAccessKeySecret();
          return secret;
        });
      }
      /**
       * Get security token by using credential
       * @return security token
       */
      getSecurityToken() {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(this._credential)) {
            return "";
          }
          let token = yield this._credential.getSecurityToken();
          return token;
        });
      }
      /**
       * Get bearer token by credential
       * @return bearer token
       */
      getBearerToken() {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(this._credential)) {
            return "";
          }
          let token = this._credential.getBearerToken();
          return token;
        });
      }
      /**
       * Get credential type by credential
       * @return credential type e.g. access_key
       */
      getType() {
        return __async(this, null, function* () {
          if (tea_util_1.default.isUnset(this._credential)) {
            return "";
          }
          let authType = this._credential.getType();
          return authType;
        });
      }
      /**
       * If inputValue is not null, return it or return defaultValue
       * @param inputValue  users input value
       * @param defaultValue default value
       * @return the final result
       */
      static defaultAny(inputValue, defaultValue) {
        if (tea_util_1.default.isUnset(inputValue)) {
          return defaultValue;
        }
        return inputValue;
      }
      /**
       * If the endpointRule and config.endpoint are empty, throw error
       * @param config config contains the necessary information to create a client
       */
      checkConfig(config) {
        if (tea_util_1.default.empty(this._endpointRule) && tea_util_1.default.empty(config.endpoint)) {
          throw $tea.newError({
            code: "ParameterMissing",
            message: "'config.endpoint' can not be empty"
          });
        }
      }
      /**
       * set gateway client
       * @param spi.
       */
      setGatewayClient(spi) {
        this._spi = spi;
      }
      /**
       * set RPC header for debug
       * @param headers headers for debug, this header can be used only once.
       */
      setRpcHeaders(headers) {
        this._headers = headers;
      }
      /**
       * get RPC header for debug
       */
      getRpcHeaders() {
        let headers = this._headers;
        this._headers = null;
        return headers;
      }
    };
    exports.default = Client2;
  }
});

// node_modules/dotenv/package.json
var require_package2 = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    var fs2 = __require("fs");
    var path2 = __require("path");
    var os2 = __require("os");
    var crypto2 = __require("crypto");
    var packageJson = require_package2();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/schema/register.ts
import {
  EAS,
  SchemaRegistry
} from "@ethereum-attestation-service/eas-sdk";
var initEAS = (provider, BASContractAddress) => {
  const bas = new EAS(BASContractAddress);
  bas.connect(provider);
};
var registerSchema = (signer, schemaRegistryAddress, params) => __async(void 0, null, function* () {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(signer);
  const transaction = yield schemaRegistry.register({
    schema: params.schema,
    resolverAddress: params.resolverAddress,
    revocable: params.revocable
  });
  const schemaUID = yield transaction.wait();
  return schemaUID;
});
var getSchemaByUID = (provider, schemaRegistryAddress, schemaUID) => __async(void 0, null, function* () {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(provider);
  const schemaRecord = yield schemaRegistry.getSchema({ uid: schemaUID });
  return schemaRecord;
});

// src/attestation/createAttestation.ts
import {
  EAS as EAS2
} from "@ethereum-attestation-service/eas-sdk";
import { Signature as Signature2 } from "ethers";

// src/attestation/encodedOspData.ts
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
var OspDataType = /* @__PURE__ */ ((OspDataType2) => {
  OspDataType2[OspDataType2["None"] = 0] = "None";
  OspDataType2[OspDataType2["Profile"] = 1] = "Profile";
  OspDataType2[OspDataType2["Follow"] = 2] = "Follow";
  OspDataType2[OspDataType2["Followed"] = 3] = "Followed";
  OspDataType2[OspDataType2["Community"] = 4] = "Community";
  OspDataType2[OspDataType2["Join"] = 5] = "Join";
  OspDataType2[OspDataType2["Joined"] = 6] = "Joined";
  return OspDataType2;
})(OspDataType || {});
var ProfileSchemaUID = "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
var FollowSchemaUID = "0xc21ba57124d1c884e89d561c9ba60a80a98733d2553d000d06cc5a98a0534b11";
var FollowedSchemaUID = "0xa0d8de56036149d7613854b8e58ce2bcc402cd065bae55a96d7a5f86095d5221";
var CommunitySchemaUID = "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
var JoinSchemaUID = "0x15ce785a4cd0951c813f27917308bb632162855f33d4a93b3bf05e35a70c8510";
var JoinedSchemaUID = "0xe1685d5f5e58134cbcd44a1f3250027c2192a2c9552cb1fbe048ad3e6e999ed6";
var OspDataTypeMap = /* @__PURE__ */ new Map([
  [1 /* Profile */, ProfileSchemaUID],
  [2 /* Follow */, FollowSchemaUID],
  [3 /* Followed */, FollowedSchemaUID],
  [4 /* Community */, CommunitySchemaUID],
  [5 /* Join */, JoinSchemaUID],
  [6 /* Joined */, JoinedSchemaUID]
]);
var ProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
var FollowSchema = "bytes32 followTx, address follower, address followedAddress, uint256 followedProfileId";
var FollowedSchema = "bytes32 followTx, string type, address follower, address followedAddress, uint256 followedProfileId";
var CommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
var JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId, address communityOwner";
var JoinedSchema = "bytes32 joinTx, string type, address joiner, uint256 communityId, address communityOwner";
var OspSchemaMap = /* @__PURE__ */ new Map([
  [1 /* Profile */, ProfileSchema],
  [2 /* Follow */, FollowSchema],
  [3 /* Followed */, FollowedSchema],
  [4 /* Community */, CommunitySchema],
  [5 /* Join */, JoinSchema],
  [6 /* Joined */, JoinedSchema]
]);
var encodeFollowData = (param) => {
  const schemaEncoder = new SchemaEncoder(FollowSchema);
  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" }
  ]);
};
var encodeFollowedData = (param) => {
  const schemaEncoder = new SchemaEncoder(FollowedSchema);
  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "type", value: "followed", type: "string" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" }
  ]);
};
var encodeProfileData = (param) => {
  const schemaEncoder = new SchemaEncoder(ProfileSchema);
  return schemaEncoder.encodeData([
    { name: "createProfileTx", value: param.createProfileTx, type: "bytes32" },
    { name: "profileOwner", value: param.profileOwner, type: "address" },
    { name: "profileId", value: param.profileId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" }
  ]);
};
var encodeCommunityData = (param) => {
  const schemaEncoder = new SchemaEncoder(CommunitySchema);
  const encodedData = schemaEncoder.encodeData([
    {
      name: "createCommunityTx",
      value: param.createCommunityTx,
      type: "bytes32"
    },
    { name: "communityOwner", value: param.communityOwner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" },
    { name: "joinNFT", value: param.joinNFT, type: "address" }
  ]);
  return encodedData;
};
var encodeJoinData = (param) => {
  const schemaEncoder = new SchemaEncoder(JoinSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" }
  ]);
  return encodedData;
};
var encodeJoinedData = (param) => {
  const schemaEncoder = new SchemaEncoder(JoinedSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "type", value: "joined", type: "string" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" }
  ]);
  return encodedData;
};

// src/greenfield/utils.ts
import { hashMessage, getAddress, ethers, Signature } from "ethers";
import crypto from "crypto";
var encodeAddrToBucketName = (prefix, addr) => {
  return `${prefix}-${hashMessage(getAddress(addr)).substring(2, 42)}`;
};
var getSps = (client2) => __async(void 0, null, function* () {
  const sps = yield client2.sp.getStorageProviders();
  const finalSps = (sps != null ? sps : []).filter((v) => v.endpoint.includes("nodereal"));
  return finalSps;
});
var getAllSps = (client2) => __async(void 0, null, function* () {
  const sps = yield getSps(client2);
  return sps.map((sp) => {
    var _a;
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: (_a = sp.description) == null ? void 0 : _a.moniker
    };
  });
});
var selectSp = (client2) => __async(void 0, null, function* () {
  var _a;
  const finalSps = yield getSps(client2);
  const selectIndex = Math.floor(Math.random() * finalSps.length);
  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1)
  ].map((item) => item.operatorAddress);
  const selectSpInfo = {
    //@ts-ignore
    id: finalSps[selectIndex].id || 0,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: (_a = finalSps[selectIndex]) == null ? void 0 : _a.operatorAddress,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses
  };
  return selectSpInfo;
});
function serializeJsonString(data) {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}
function getOffchainUIDBAS(version, schema, recipient, time, expirationTime, revocable, refUID, data) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  return ethers.solidityPackedKeccak256(
    [
      "uint16",
      "bytes",
      "address",
      "address",
      "uint64",
      "uint64",
      "bool",
      "bytes32",
      "bytes",
      "uint32"
    ],
    [
      version,
      schema,
      recipient,
      ZERO_ADDRESS,
      time,
      expirationTime,
      revocable,
      refUID,
      data,
      0
    ]
  );
}
function getAttestationBAS(signer, attestation) {
  return __async(this, null, function* () {
    attestation.types = {
      Attest: [
        { name: "version", type: "uint16" },
        { name: "schema", type: "bytes32" },
        { name: "recipient", type: "address" },
        { name: "time", type: "uint64" },
        { name: "expirationTime", type: "uint64" },
        { name: "revocable", type: "bool" },
        { name: "refUID", type: "bytes32" },
        { name: "data", type: "bytes" },
        { name: "nonce", type: "uint64" }
      ]
    };
    attestation.domain.name = "BAS Attestation";
    const signature = yield signer.signTypedData(
      attestation.domain,
      attestation.types,
      attestation.message
    );
    const new_signature = {
      v: Signature.from(signature).v,
      r: Signature.from(signature).r,
      s: Signature.from(signature).s
    };
    attestation.signature = new_signature;
    const uid = getOffchainUIDBAS(
      attestation.message.version,
      attestation.message.schema,
      attestation.message.recipient,
      attestation.message.time,
      attestation.message.expirationTime,
      attestation.message.revocable,
      attestation.message.refUID,
      attestation.message.data
    );
    attestation.uid = uid;
    return attestation;
  });
}
function getbBundleUID(attestationUIDs) {
  attestationUIDs.sort();
  const rr = attestationUIDs.join("");
  return sha256(rr);
}
function sha256(input) {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return "0x" + hash.digest("hex");
}

// src/kms/kms_client.ts
var $OpenApi = __toESM(require_client6());
import Kms20160120, * as $Kms20160120 from "@alicloud/kms20160120";
var KmsClient = class _KmsClient {
  constructor(params) {
    this.client = _KmsClient.createClient(
      params.accessKeyId,
      params.accessKeySecret,
      params.regionId
    );
    this.keyId = params.keyId;
  }
  static createClient(accessKeyId, accessKeySecret, regionId) {
    let config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret,
      regionId
    });
    return new Kms20160120(config);
  }
  decrypt(ciphertextBlob, encryptionContext) {
    return __async(this, null, function* () {
      let request = new $Kms20160120.DecryptRequest({
        ciphertextBlob,
        encryptionContext
      });
      return yield this.client.decrypt(request);
    });
  }
  encrypt(plaintext, encryptionContext) {
    return __async(this, null, function* () {
      let request = new $Kms20160120.EncryptRequest({
        plaintext,
        keyId: this.keyId,
        encryptionContext
      });
      return yield this.client.encrypt(request);
    });
  }
};

// src/config/config.ts
var greenfieldConfig;
var kmsCryptConfig;
var basConfig;
var privateKey = "";
var getGreenfieldConfig = () => {
  if (greenfieldConfig === void 0) {
    return null;
  }
  return greenfieldConfig;
};
var setGreenfieldConfig = (config) => {
  greenfieldConfig = config;
};
var getKmsCryptConfig = () => {
  if (kmsCryptConfig === void 0) {
    return null;
  }
  return kmsCryptConfig;
};
var setKmsCryptConfig = (config) => {
  kmsCryptConfig = config;
};
var getBasConfig = () => {
  if (basConfig === void 0) {
    return null;
  }
  return basConfig;
};
var setBasConfig = (config) => {
  basConfig = config;
};
var getPrivateKey = () => {
  return privateKey;
};
var setPrivateKey = (key) => {
  privateKey = key;
};
function getPrivateKeyByKms() {
  return __async(this, null, function* () {
    try {
      console.log("init KmsClient");
      const kmsConfig = getKmsCryptConfig();
      if (kmsConfig === null) {
        console.log("kms config is null");
        return "";
      }
      const client2 = new KmsClient({
        accessKeyId: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_ID,
        accessKeySecret: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        regionId: kmsConfig.ALIBABA_CLOUD_REGION_ID,
        keyId: kmsConfig.ALIBABA_CLOUD_KMS_KEY_ID
      });
      const greenfieldConfig2 = getGreenfieldConfig();
      if (greenfieldConfig2 === null) {
        console.log("greenfield config is null");
        return "";
      }
      let decryptRes = yield client2.decrypt(
        greenfieldConfig2.GREEN_PAYMENT_PRIVATE_KEY_KMS_CIPHERTEXT,
        {}
      );
      return decryptRes.body.plaintext;
    } catch (e) {
      console.log(e);
      return "";
    }
  });
}
function setPrivateKeyByKms(ciphertextBlob) {
  return __async(this, null, function* () {
    try {
      const kmsConfig = getKmsCryptConfig();
      if (kmsConfig === null) {
        console.log("kms config is null");
        return false;
      }
      const client2 = new KmsClient({
        accessKeyId: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_ID,
        accessKeySecret: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
        regionId: kmsConfig.ALIBABA_CLOUD_REGION_ID,
        keyId: kmsConfig.ALIBABA_CLOUD_KMS_KEY_ID
      });
      let decryptRes = yield client2.decrypt(ciphertextBlob, {});
      setPrivateKey(decryptRes.body.plaintext);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  });
}
var setOspBasSdkConfig = (config) => __async(void 0, null, function* () {
  setBasConfig(config.basConfig);
  setKmsCryptConfig(config.kmsCryptConfig);
  setGreenfieldConfig(config.greenfieldConfig);
  const privateKey2 = yield getPrivateKeyByKms();
  setPrivateKey(privateKey2);
  return true;
});

// src/attestation/createAttestation.ts
var getAttestationOffChain = (offchain, signer, params) => __async(void 0, null, function* () {
  const timestamp = Math.floor(Date.now() / 1e3);
  const attestation = yield offchain.signOffchainAttestation(
    {
      recipient: params.recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(0),
      // Unix timestamp of current time
      time: BigInt(timestamp),
      revocable: true,
      version: 1,
      // Fixed value
      nonce: BigInt(0),
      // Fixed value
      schema: params.schemaUID,
      refUID: params.refUID,
      data: params.encodedData
    },
    signer
  );
  return attestation;
});
var getAttestationOffChainV1 = (offchain, signer, params) => __async(void 0, null, function* () {
  const timestamp = Math.floor(Date.now() / 1e3);
  const temp_domain = offchain.getDomainTypedData();
  const message = {
    recipient: params.recipient,
    // Unix timestamp of when attestation expires. (0 for no expiration)
    expirationTime: BigInt(0),
    // Unix timestamp of current time
    time: BigInt(timestamp),
    revocable: true,
    version: 1,
    // Fixed value
    nonce: BigInt(0),
    // Fixed value
    schema: params.schemaUID,
    refUID: params.refUID,
    data: params.encodedData
  };
  const types = {
    Attest: [
      { name: "version", type: "uint16" },
      { name: "schema", type: "bytes32" },
      { name: "recipient", type: "address" },
      { name: "time", type: "uint64" },
      { name: "expirationTime", type: "uint64" },
      { name: "revocable", type: "bool" },
      { name: "refUID", type: "bytes32" },
      { name: "data", type: "bytes" },
      { name: "nonce", type: "uint64" }
    ]
  };
  const domain = {
    name: "BAS Attestation",
    version: temp_domain.version,
    chainId: temp_domain.chainId,
    verifyingContract: temp_domain.verifyingContract
  };
  const signature = yield signer.signTypedData(domain, types, message);
  const new_signature = {
    v: Signature2.from(signature).v,
    r: Signature2.from(signature).r,
    s: Signature2.from(signature).s
  };
  const uid = getOffchainUIDBAS(
    message.version,
    message.schema,
    message.recipient,
    message.time,
    message.expirationTime,
    message.revocable,
    message.refUID,
    message.data
  );
  const attestation = {
    domain,
    primaryType: "Attest",
    message,
    types,
    signature: new_signature,
    uid
  };
  return attestation;
});
var getSigatureByDelegation = (bas, params, signer) => __async(void 0, null, function* () {
  if (signer.provider == null) {
    throw new Error("Signer provider is not defined");
  }
  bas.connect(signer);
  const delegated = yield bas.getDelegated();
  const params_ = {
    schema: params.schemaUID,
    recipient: params.recipient,
    expirationTime: BigInt(0),
    revocable: true,
    refUID: params.refUID,
    data: params.encodedData,
    value: BigInt(0),
    deadline: params.deadline,
    nonce: params.nonce
  };
  const attestation = yield delegated.signDelegatedAttestation(params_, signer);
  return attestation.signature;
});
var getAttestationRequestData = (recipient, encodedData) => {
  const attestationRequestData = {
    recipient,
    expirationTime: BigInt(0),
    revocable: true,
    data: encodedData,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    value: BigInt(0)
  };
  return attestationRequestData;
};
var getAttestParamsOffChain = (dataType, recipient, encodedData) => {
  const params = {
    schemaUID: OspDataTypeMap.get(dataType),
    encodedData,
    recipient,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000"
  };
  return params;
};
var getMulAttestParams = (params) => {
  const groupedParams = {};
  params.forEach((param) => {
    if (!groupedParams[param.dataType]) {
      groupedParams[param.dataType] = [];
    }
    groupedParams[param.dataType].push(param);
  });
  const result = Object.keys(groupedParams).map(
    (dataTypeStr) => ({
      schema: OspDataTypeMap.get(parseInt(dataTypeStr)),
      data: groupedParams[parseInt(dataTypeStr)].map(
        (param) => param.requestData
      )
    })
  );
  return result;
};
var multiAttestBASOnChain = (signer, params) => __async(void 0, null, function* () {
  try {
    const basConfig2 = getBasConfig();
    if (basConfig2 == null) {
      throw new Error("basConfig is null");
    }
    const basAddress = basConfig2.BAS_ADDRESS;
    if (basAddress == null || basAddress == "") {
      throw new Error("BAS_ADDRESS is null");
    }
    const bas = new EAS2(basAddress);
    bas.connect(signer);
    const txs = yield bas.multiAttest(params);
    const attestUIDs = yield txs.wait();
    return attestUIDs;
  } catch (error) {
    console.log(error);
    return null;
  }
});
var multiAttestBASOffChain = (signer, unHandleDatas) => __async(void 0, null, function* () {
  const basConfig2 = getBasConfig();
  if (basConfig2 == null) {
    throw new Error("basConfig is null");
  }
  const offchain = yield new EAS2(basConfig2.BAS_ADDRESS).connect(signer).getOffchain();
  const attestations = [];
  try {
    for (let i = 0; i < unHandleDatas.length; i++) {
      const data = unHandleDatas[i];
      if (data.dataType == 0 /* None */) {
        continue;
      }
      const attestation_new = yield getAttestationOffChainV1(
        offchain,
        signer,
        data.requestData
      );
      attestations.push(attestation_new);
    }
    return attestations;
  } catch (error) {
    console.log(error);
    return null;
  }
});

// src/greenfield/create.ts
import {
  bytesFromBase64,
  Client,
  Long,
  RedundancyType,
  VisibilityType
} from "@bnb-chain/greenfield-js-sdk";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
var rs = new ReedSolomon();
var GreenFieldClientTS = class {
  /**
   * @param url greenfield rpc url
   * @param chainId greenfield chainId
   * @param creator creator address
   */
  constructor(url, chainId, creator) {
    // chainId = null;
    this.address = null;
    this.client = Client.create(url, chainId);
    this.address = creator;
  }
  /**
   * create bucket
   * @param bucketName bucket name
   * @param privateKey creator private key
   * @returns boolean
   */
  createBucket(bucketName, privateKey2) {
    return __async(this, null, function* () {
      const spInfo = yield selectSp(this.client);
      if (!privateKey2.startsWith("0x")) {
        privateKey2 = "0x" + privateKey2;
      }
      try {
        const bucketMeta = yield this.client.bucket.getBucketMeta({ bucketName });
        return true;
      } catch (error) {
      }
      let res;
      try {
        const createBucketTx = yield this.client.bucket.createBucket({
          bucketName,
          creator: this.address,
          visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          chargedReadQuota: Long.fromString("0"),
          paymentAddress: this.address,
          primarySpAddress: spInfo.primarySpAddress
        });
        const simulateInfo = yield createBucketTx.simulate({
          denom: "BNB"
        });
        res = yield createBucketTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo == null ? void 0 : simulateInfo.gasLimit),
          gasPrice: (simulateInfo == null ? void 0 : simulateInfo.gasPrice) || "5000000000",
          payer: this.address,
          granter: "",
          privateKey: privateKey2
        });
        console.log("transactionHash", res.transactionHash);
        return true;
      } catch (error) {
      }
      return false;
    });
  }
  /**
   * create object
   * @param bucketName bucket name
   * @param attestation attestation is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  createObject(bucketName, attestation, privateKey2, isPrivate = false) {
    return __async(this, null, function* () {
      if (!privateKey2.startsWith("0x")) {
        privateKey2 = "0x" + privateKey2;
      }
      const attest = JSON.parse(attestation);
      const fileName = `${attest.message.schema}.${attest.uid}`;
      const fileBuffer = Buffer.from(attestation);
      const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
      try {
        console.log("trying...");
        const createObjectTx = yield this.client.object.createObject({
          bucketName,
          objectName: fileName,
          creator: this.address,
          visibility: isPrivate ? VisibilityType.VISIBILITY_TYPE_PRIVATE : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          contentType: "Document",
          redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
          payloadSize: Long.fromInt(fileBuffer.byteLength),
          expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x))
        });
        const simulateInfo = yield createObjectTx.simulate({
          denom: "BNB"
        });
        const { transactionHash } = yield createObjectTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo.gasLimit),
          gasPrice: simulateInfo.gasPrice,
          payer: this.address,
          granter: "",
          privateKey: privateKey2
        });
        const uploadRes = yield this.client.object.uploadObject(
          {
            bucketName,
            objectName: fileName,
            body: createFile(fileName, fileBuffer),
            txnHash: transactionHash
          },
          // highlight-start
          {
            type: "ECDSA",
            privateKey: privateKey2
          }
          // highlight-end
        );
        console.log("uploadRes", uploadRes);
        if (uploadRes.code === 0) {
          return transactionHash;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    });
  }
  createObjectByBundle(bucketName, fileName, bundleBuffer, privateKey2, isPrivate = false) {
    return __async(this, null, function* () {
      if (!privateKey2.startsWith("0x")) {
        privateKey2 = "0x" + privateKey2;
      }
      const expectCheckSums = rs.encode(Uint8Array.from(bundleBuffer));
      try {
        console.log("trying...");
        const createObjectTx = yield this.client.object.createObject({
          bucketName,
          objectName: fileName,
          creator: this.address,
          visibility: isPrivate ? VisibilityType.VISIBILITY_TYPE_PRIVATE : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          contentType: "Document",
          redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
          payloadSize: Long.fromInt(bundleBuffer.byteLength),
          expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x))
        });
        const simulateInfo = yield createObjectTx.simulate({
          denom: "BNB"
        });
        const { transactionHash } = yield createObjectTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo.gasLimit),
          gasPrice: simulateInfo.gasPrice,
          payer: this.address,
          granter: "",
          privateKey: privateKey2
        });
        const uploadRes = yield this.client.object.uploadObject(
          {
            bucketName,
            objectName: fileName,
            body: createFile(fileName, bundleBuffer),
            txnHash: transactionHash
          },
          // highlight-start
          {
            type: "ECDSA",
            privateKey: privateKey2
          }
          // highlight-end
        );
        console.log("uploadRes", uploadRes);
        if (uploadRes.code === 0) {
          return transactionHash;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
      return null;
    });
  }
  /**
   * create object multiple attestations
   * @param bucketName bucket name
   * @param attestations attestations is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  createObjectMulAttest(bucketName, attestations, fileName, privateKey2, isPrivate = false) {
    return __async(this, null, function* () {
      if (!privateKey2.startsWith("0x")) {
        privateKey2 = "0x" + privateKey2;
      }
      const fileBuffer = Buffer.from(attestations);
      const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
      const createObjectTx = yield this.client.object.createObject({
        bucketName,
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate ? VisibilityType.VISIBILITY_TYPE_PRIVATE : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "json",
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: Long.fromInt(fileBuffer.byteLength),
        expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x))
      });
      const simulateInfo = yield createObjectTx.simulate({
        denom: "BNB"
      });
      try {
        const { transactionHash } = yield createObjectTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo.gasLimit),
          gasPrice: simulateInfo.gasPrice,
          payer: this.address,
          granter: "",
          privateKey: privateKey2
        });
        const uploadRes = yield this.client.object.uploadObject(
          {
            bucketName,
            objectName: fileName,
            body: createFile(fileName, fileBuffer),
            txnHash: transactionHash
          },
          // highlight-start
          {
            type: "ECDSA",
            privateKey: privateKey2
          }
          // highlight-end
        );
        if (uploadRes.code === 0) {
          return transactionHash;
        }
      } catch (error) {
        return null;
      }
      return null;
    });
  }
};
function createFile(fileName, fileBuffer) {
  return {
    name: fileName,
    type: "",
    size: fileBuffer.byteLength,
    content: fileBuffer
  };
}

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/bundle/bundle.ts
import { Buffer as Buffer2 } from "buffer";
import * as fs from "fs";
import * as path from "path";
import * as os from "node:os";

// src/bundle/proto/meta.ts
import * as pb_1 from "google-protobuf";
var _one_of_decls;
var _ObjectMeta = class _ObjectMeta extends pb_1.Message {
  constructor(data) {
    super();
    __privateAdd(this, _one_of_decls, []);
    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __privateGet(this, _one_of_decls));
    if (!Array.isArray(data) && typeof data == "object") {
      if ("name" in data && data.name != void 0) {
        this.name = data.name;
      }
      if ("offset" in data && data.offset != void 0) {
        this.offset = data.offset;
      }
      if ("size" in data && data.size != void 0) {
        this.size = data.size;
      }
      if ("hash_algo" in data && data.hash_algo != void 0) {
        this.hash_algo = data.hash_algo;
      }
      if ("hash" in data && data.hash != void 0) {
        this.hash = data.hash;
      }
      if ("content_type" in data && data.content_type != void 0) {
        this.content_type = data.content_type;
      }
      if ("tags" in data && data.tags != void 0) {
        this.tags = data.tags;
      }
    }
    if (!this.tags)
      this.tags = /* @__PURE__ */ new Map();
  }
  get name() {
    return pb_1.Message.getFieldWithDefault(this, 1, "");
  }
  set name(value) {
    pb_1.Message.setField(this, 1, value);
  }
  get offset() {
    return pb_1.Message.getFieldWithDefault(this, 2, 0);
  }
  set offset(value) {
    pb_1.Message.setField(this, 2, value);
  }
  get size() {
    return pb_1.Message.getFieldWithDefault(this, 3, 0);
  }
  set size(value) {
    pb_1.Message.setField(this, 3, value);
  }
  get hash_algo() {
    return pb_1.Message.getFieldWithDefault(this, 4, 0 /* Unknown */);
  }
  set hash_algo(value) {
    pb_1.Message.setField(this, 4, value);
  }
  get hash() {
    return pb_1.Message.getFieldWithDefault(this, 5, new Uint8Array(0));
  }
  set hash(value) {
    pb_1.Message.setField(this, 5, value);
  }
  get content_type() {
    return pb_1.Message.getFieldWithDefault(this, 6, "");
  }
  set content_type(value) {
    pb_1.Message.setField(this, 6, value);
  }
  get tags() {
    return pb_1.Message.getField(this, 7);
  }
  set tags(value) {
    pb_1.Message.setField(this, 7, value);
  }
  static fromObject(data) {
    const message = new _ObjectMeta({});
    if (data.name != null) {
      message.name = data.name;
    }
    if (data.offset != null) {
      message.offset = data.offset;
    }
    if (data.size != null) {
      message.size = data.size;
    }
    if (data.hash_algo != null) {
      message.hash_algo = data.hash_algo;
    }
    if (data.hash != null) {
      message.hash = data.hash;
    }
    if (data.content_type != null) {
      message.content_type = data.content_type;
    }
    if (typeof data.tags == "object") {
      message.tags = new Map(Object.entries(data.tags));
    }
    return message;
  }
  toObject() {
    const data = {};
    if (this.name != null) {
      data.name = this.name;
    }
    if (this.offset != null) {
      data.offset = this.offset;
    }
    if (this.size != null) {
      data.size = this.size;
    }
    if (this.hash_algo != null) {
      data.hash_algo = this.hash_algo;
    }
    if (this.hash != null) {
      data.hash = this.hash;
    }
    if (this.content_type != null) {
      data.content_type = this.content_type;
    }
    if (this.tags != null) {
      data.tags = Object.fromEntries(this.tags);
    }
    return data;
  }
  serialize(w) {
    const writer = w || new pb_1.BinaryWriter();
    if (this.name.length)
      writer.writeString(1, this.name);
    if (this.offset != 0)
      writer.writeUint64(2, this.offset);
    if (this.size != 0)
      writer.writeUint64(3, this.size);
    if (this.hash_algo != 0 /* Unknown */)
      writer.writeEnum(4, this.hash_algo);
    if (this.hash.length)
      writer.writeBytes(5, this.hash);
    if (this.content_type.length)
      writer.writeString(6, this.content_type);
    for (const [key, value] of this.tags) {
      writer.writeMessage(7, this.tags, () => {
        writer.writeString(1, key);
        writer.writeString(2, value);
      });
    }
    if (!w)
      return writer.getResultBuffer();
  }
  static deserialize(bytes) {
    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new _ObjectMeta();
    while (reader.nextField()) {
      if (reader.isEndGroup())
        break;
      switch (reader.getFieldNumber()) {
        case 1:
          message.name = reader.readString();
          break;
        case 2:
          message.offset = reader.readUint64();
          break;
        case 3:
          message.size = reader.readUint64();
          break;
        case 4:
          message.hash_algo = reader.readEnum();
          break;
        case 5:
          message.hash = reader.readBytes();
          break;
        case 6:
          message.content_type = reader.readString();
          break;
        case 7:
          reader.readMessage(message, () => pb_1.Map.deserializeBinary(message.tags, reader, reader.readString, reader.readString));
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary() {
    return this.serialize();
  }
  static deserializeBinary(bytes) {
    return _ObjectMeta.deserialize(bytes);
  }
};
_one_of_decls = new WeakMap();
var ObjectMeta = _ObjectMeta;
var _one_of_decls2;
var _BundleMeta = class _BundleMeta extends pb_1.Message {
  constructor(data) {
    super();
    __privateAdd(this, _one_of_decls2, []);
    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __privateGet(this, _one_of_decls2));
    if (!Array.isArray(data) && typeof data == "object") {
      if ("meta" in data && data.meta != void 0) {
        this.meta = data.meta;
      }
    }
  }
  get meta() {
    return pb_1.Message.getRepeatedWrapperField(this, ObjectMeta, 1);
  }
  set meta(value) {
    pb_1.Message.setRepeatedWrapperField(this, 1, value);
  }
  static fromObject(data) {
    const message = new _BundleMeta({});
    if (data.meta != null) {
      message.meta = data.meta.map((item) => ObjectMeta.fromObject(item));
    }
    return message;
  }
  toObject() {
    const data = {};
    if (this.meta != null) {
      data.meta = this.meta.map((item) => item.toObject());
    }
    return data;
  }
  serialize(w) {
    const writer = w || new pb_1.BinaryWriter();
    if (this.meta.length)
      writer.writeRepeatedMessage(1, this.meta, (item) => item.serialize(writer));
    if (!w)
      return writer.getResultBuffer();
  }
  static deserialize(bytes) {
    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new _BundleMeta();
    while (reader.nextField()) {
      if (reader.isEndGroup())
        break;
      switch (reader.getFieldNumber()) {
        case 1:
          reader.readMessage(message.meta, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ObjectMeta.deserialize(reader), ObjectMeta));
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary() {
    return this.serialize();
  }
  static deserializeBinary(bytes) {
    return _BundleMeta.deserialize(bytes);
  }
};
_one_of_decls2 = new WeakMap();
var BundleMeta = _BundleMeta;

// src/bundle/bundle.ts
var Bundle = class _Bundle {
  constructor(options) {
    if (options) {
      this.version = options.version;
      this.metaSize = options.metaSize;
      this.meta = options.meta;
      this.writeFile = options.writeFile;
      this.readFile = options.readFile;
      this.bundleFileName = options.bundleFileName;
    } else {
      this.version = 0 /* V1 */;
      this.metaSize = 0;
      this.meta = { meta: [] };
      this.writeFile = null;
      this.readFile = null;
      this.bundleFileName = "";
    }
    this.dataSize = 0;
    this.finalized = false;
  }
  static newBundle() {
    return __async(this, null, function* () {
      const tempDir = path.join(process.env.TEMP || os.tmpdir(), "tempBundleDir");
      yield fs.promises.mkdir(tempDir, { recursive: true });
      const bundleFile = path.join(tempDir, `tempFile-${Date.now()}.tmp`);
      const fd = yield fs.promises.open(bundleFile, "w");
      const readFile = fs.createReadStream(bundleFile);
      const bundle = new _Bundle({
        version: 0 /* V1 */,
        metaSize: 0,
        meta: { meta: [] },
        writeFile: fs.createWriteStream(bundleFile),
        readFile,
        bundleFileName: bundleFile,
        dataSize: 0,
        finalized: false
      });
      return { bundle, fd };
    });
  }
  static newBundleFromFile(path2) {
    return __async(this, null, function* () {
      const bundleFile = yield fs.promises.open(path2, "r");
      const stat = yield fs.promises.stat(path2);
      const dataSize = stat.size;
      const seekPosition = dataSize - (8 + 8);
      const buf = Buffer2.alloc(16);
      yield bundleFile.read(buf, seekPosition);
      const version = buf.readBigUInt64BE(8);
      if (version !== BigInt(0 /* V1 */)) {
        throw new Error("Invalid version");
      }
      const metaSize = buf.readBigUInt64BE(0);
      if (metaSize === BigInt(0)) {
        throw new Error("Empty bundle");
      }
      const metaBuf = Buffer2.alloc(Number(metaSize));
      yield bundleFile.read(metaBuf, dataSize - (Number(metaSize) + 8 + 8));
      const bundle = new _Bundle({
        version: Number(version),
        metaSize: Number(metaSize),
        meta: { meta: [] },
        writeFile: null,
        readFile: fs.createReadStream(path2),
        bundleFileName: path2,
        dataSize: stat.size,
        finalized: true
      });
      bundle.meta = BundleMeta.deserialize(metaBuf).toObject();
      return bundle;
    });
  }
  appendObject(name, reader, options) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      if (this.finalized) {
        throw new Error("Append not allowed");
      }
      const objMeta = this.getObjectMeta(name);
      if (objMeta) {
        throw new Error("Duplicated name");
      }
      const written = yield new Promise((resolve, reject) => {
        const readerDefault = reader.getReader();
        let totalWritten = 0;
        const readStream = () => __async(this, null, function* () {
          let result = yield readerDefault.read();
          while (!result.done) {
            try {
              this.writeFile.write(result.value);
              totalWritten += result.value.length;
              result = yield readerDefault.read();
            } catch (e) {
              console.error("!!!!!!!!!!");
            }
          }
          if (result.value) {
            this.writeFile.write(result.value);
            totalWritten += result.value.length;
          }
          resolve(totalWritten);
        });
        readStream().catch(reject);
      });
      const objMetaNew = {
        name,
        offset: this.dataSize,
        size: written,
        hash_algo: 0 /* Unknown */,
        hash: new Uint8Array(0),
        content_type: "",
        tags: {}
      };
      if (options) {
        objMetaNew.hash_algo = (_a = options.hashAlgo) != null ? _a : 0 /* Unknown */;
        objMetaNew.hash = (_b = options.hash) != null ? _b : new Uint8Array(0);
        objMetaNew.content_type = (_c = options.contentType) != null ? _c : "";
        objMetaNew.tags = (_d = options.tags) != null ? _d : {};
      }
      this.dataSize += written;
      this.meta.meta.push(objMetaNew);
      return objMetaNew;
    });
  }
  getObjectMeta(name) {
    return this.meta.meta.find((objMeta) => objMeta.name === name) || null;
  }
  getBundledObject() {
    return fs.createReadStream(this.bundleFileName);
  }
  finalizeBundle() {
    return __async(this, null, function* () {
      if (this.finalized) {
        throw new Error("Bundle finalized");
      }
      if (this.dataSize === 0) {
        throw new Error("Empty bundle");
      }
      let metaData = Buffer2.from(BundleMeta.fromObject(this.meta).serialize());
      this.metaSize = metaData.length;
      const buf = Buffer2.alloc(16);
      buf.writeBigUInt64BE(BigInt(this.metaSize), 0);
      buf.writeBigUInt64BE(BigInt(this.version), 8);
      metaData = Buffer2.concat([metaData, buf]);
      this.writeFile.write(metaData);
      this.dataSize += this.metaSize + 16;
      this.finalized = true;
      return this.getBundledObject();
    });
  }
  close() {
    if (this.writeFile) {
      this.writeFile.close();
    }
    if (this.readFile) {
      this.readFile.close();
    }
  }
  getBundleMetaSize() {
    return this.metaSize;
  }
  getBundleObjectsMeta() {
    return this.meta.meta;
  }
  getBundleSize() {
    return this.dataSize;
  }
  getBundleVersion() {
    return this.version;
  }
};

// src/bundle/utils.ts
function readStreamToBuffer(stream) {
  return __async(this, null, function* () {
    const chunks = [];
    try {
      for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
        const chunk = temp.value;
        chunks.push(Buffer.from(chunk));
      }
    } catch (temp) {
      error = [temp];
    } finally {
      try {
        more && (temp = iter.return) && (yield temp.call(iter));
      } finally {
        if (error)
          throw error[0];
      }
    }
    return Buffer.concat(chunks);
  });
}
function getBundleBuffer(schemaUid, attestations) {
  return __async(this, null, function* () {
    let objs = [];
    let attestationUids = [];
    for (let attestation of attestations) {
      attestationUids.push(attestation.uid);
      objs.push({
        Name: attestation.uid,
        Data: Buffer.from(serializeJsonString(attestation))
      });
    }
    const bundle = yield _getBundle(objs);
    const bundleUid = getbBundleUID(attestationUids);
    const objectName = `bundle.${schemaUid}.` + bundleUid;
    const buffer = yield readStreamToBuffer(bundle);
    console.log(`buffer size is ${buffer.length}`);
    return { objectName, buffer };
  });
}
function bufferToReadableStream(bufferData) {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(bufferData);
      controller.close();
    }
  });
  return readable;
}
function _getBundle(objs) {
  return __async(this, null, function* () {
    const { bundle, fd } = yield Bundle.newBundle();
    yield new Promise((resolve) => setTimeout(resolve, 0));
    try {
      try {
        for (var iter = __forAwait(objs), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const object = temp.value;
          const data = object.Data;
          const readableStream = bufferToReadableStream(data);
          yield bundle.appendObject(object.Name, readableStream);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      const result = yield bundle.finalizeBundle();
      yield fd.close();
      return result;
    } catch (err) {
      console.log(err);
    }
    return null;
  });
}

// src/greenfield/createObjectOSP.ts
var client = null;
function getGreenFieldClientTS() {
  console.log("init greenfield client");
  const greenfieldConfig2 = getGreenfieldConfig();
  if (greenfieldConfig2 === null) {
    console.log("greenfield config is null");
    return null;
  }
  const client_gf = new GreenFieldClientTS(
    greenfieldConfig2.GREEN_RPC_URL,
    greenfieldConfig2.GREEN_CHAIN_ID,
    greenfieldConfig2.GREEN_PAYMENT_ADDRESS
  );
  return client_gf;
}
var createObjectAttestOSP = (bucketName, attestation, privateKey2, isPrivate = false) => __async(void 0, null, function* () {
  if (client === null) {
    client = getGreenFieldClientTS();
  }
  const txHash = yield client.createObject(
    bucketName,
    serializeJsonString(attestation),
    privateKey2,
    isPrivate
  );
  return txHash !== null;
});
var createObjectMulAttestOSP = (bucketName, schemaUID, attestations, privateKey2, isPrivate = false) => __async(void 0, null, function* () {
  if (client === null) {
    client = getGreenFieldClientTS();
  }
  const { objectName, buffer } = yield getBundleBuffer(schemaUID, attestations);
  if (buffer.length === 0) {
    return false;
  }
  const txHash = yield client.createObjectByBundle(
    bucketName,
    objectName,
    buffer,
    privateKey2,
    isPrivate
  );
  if (txHash === null) {
    return false;
  }
  return true;
});

// src/bas/index.ts
import {
  EAS as BaseEAS,
  SchemaEncoder as BaseSchemaEncoder
} from "@ethereum-attestation-service/eas-sdk";
var BAS = BaseEAS;
var SchemaEncoder3 = BaseSchemaEncoder;

// src/bas/offchainAttestations.ts
import { ethers as ethers3 } from "ethers";
var multiAttestBasUploadGreenField = (bucketName, schemaUID, unHandleDatas, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey2 = getPrivateKey();
    if (privateKey2 == "") {
      console.log("private key is null");
      return false;
    }
    const basConfig2 = getBasConfig();
    if (basConfig2 === null) {
      console.log("bas config is null");
      return false;
    }
    const signer = new ethers3.Wallet(
      privateKey2,
      new ethers3.JsonRpcProvider(basConfig2.RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(signer, unHandleDatas);
    const success = yield createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey2,
      isPrivate
    );
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
});
var oneAttestBasUploadGreenField = (bucketName, unHandleData, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey2 = getPrivateKey();
    if (privateKey2 == "") {
      console.log("private key is null");
      return false;
    }
    const basConfig2 = getBasConfig();
    if (basConfig2 === null) {
      console.log("bas config is null");
      return false;
    }
    const signer = new ethers3.Wallet(
      privateKey2,
      new ethers3.JsonRpcProvider(basConfig2.RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(signer, [unHandleData]);
    const success = yield createObjectAttestOSP(
      bucketName,
      attestations[0],
      privateKey2,
      isPrivate
    );
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
});
var multiAttestBasUploadGreenField_String = (bucketName, schemaUID, unHandleDatas, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey2 = getPrivateKey();
    if (privateKey2 == "") {
      console.log("private key is null");
      return false;
    }
    const basConfig2 = getBasConfig();
    if (basConfig2 === null) {
      console.log("bas config is null");
      return false;
    }
    const signer = new ethers3.Wallet(
      privateKey2,
      new ethers3.JsonRpcProvider(basConfig2.RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(
      signer,
      JSON.parse(unHandleDatas)
    );
    const success = yield createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey2,
      isPrivate
    );
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
});

// src/kms/kms_signer.ts
import { AwsKmsSigner } from "@cuonghx.gu-tech/ethers-aws-kms-signer";
import { ethers as ethers4 } from "ethers";
var getDeployer = () => __async(void 0, null, function* () {
  const provider = new ethers4.JsonRpcProvider(process.env.RPC_URL);
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    },
    provider
  );
  yield signer.getAddress();
  return signer;
});
var getKmsSigner = (provider) => {
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    },
    provider
  );
  return signer;
};

// src/handle/handleOsp.ts
var handleOspRequestData = (chainId, jsonData) => {
  const data = JSON.parse(jsonData);
  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      const encodedData = encodeFollowData({
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedAddress: data.referencedUserAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      });
      return {
        dataType: 2 /* Follow */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        communityOwner: data.communityOwnerAddress
      });
      return {
        dataType: 5 /* Join */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle
      });
      return {
        dataType: 1 /* Profile */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT
      });
      return {
        dataType: 4 /* Community */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    }
  }
  return {
    dataType: 0 /* None */,
    requestData: null
  };
};
var handleOspRequestPrepareOffChain = (chainId, jsonData) => {
  const data = JSON.parse(jsonData);
  let handledDatas = new Array();
  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      const followData = {
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedAddress: data.referencedUserAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      };
      const encodedFollowData = encodeFollowData(followData);
      handledDatas.push({
        dataType: 2 /* Follow */,
        requestData: getAttestParamsOffChain(
          2 /* Follow */,
          data.userAddress,
          encodedFollowData
        )
      });
      const encodedFollowedData = encodeFollowedData(followData);
      handledDatas.push({
        dataType: 3 /* Followed */,
        requestData: getAttestParamsOffChain(
          3 /* Followed */,
          data.referencedUserAddress,
          encodedFollowedData
        )
      });
    } else if (data.name === "JoinNFTTransferred") {
      const joinData = {
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        communityOwner: data.communityOwnerAddress
      };
      const encodedJoinData = encodeJoinData(joinData);
      handledDatas.push({
        dataType: 5 /* Join */,
        requestData: getAttestParamsOffChain(
          5 /* Join */,
          data.userAddress,
          encodedJoinData
        )
      });
      const encodedJoinedData = encodeJoinedData(joinData);
      handledDatas.push({
        dataType: 6 /* Joined */,
        requestData: getAttestParamsOffChain(
          6 /* Joined */,
          data.communityOwnerAddress,
          encodedJoinedData
        )
      });
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle
      });
      handledDatas.push({
        dataType: 1 /* Profile */,
        requestData: getAttestParamsOffChain(
          1 /* Profile */,
          data.userAddress,
          encodedData
        )
      });
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT
      });
      handledDatas.push({
        dataType: 4 /* Community */,
        requestData: getAttestParamsOffChain(
          4 /* Community */,
          data.userAddress,
          encodedData
        )
      });
    }
  } else {
    handledDatas.push({
      dataType: 0 /* None */,
      requestData: null
    });
  }
  return handledDatas;
};
export {
  BAS,
  CommunitySchema,
  CommunitySchemaUID,
  FollowSchema,
  FollowSchemaUID,
  FollowedSchema,
  FollowedSchemaUID,
  GreenFieldClientTS,
  JoinSchema,
  JoinSchemaUID,
  JoinedSchema,
  JoinedSchemaUID,
  OspDataType,
  OspDataTypeMap,
  OspSchemaMap,
  ProfileSchema,
  ProfileSchemaUID,
  SchemaEncoder3 as SchemaEncoder,
  createObjectAttestOSP,
  createObjectMulAttestOSP,
  encodeAddrToBucketName,
  encodeCommunityData,
  encodeFollowData,
  encodeFollowedData,
  encodeJoinData,
  encodeJoinedData,
  encodeProfileData,
  getAllSps,
  getAttestParamsOffChain,
  getAttestationBAS,
  getAttestationOffChain,
  getAttestationOffChainV1,
  getAttestationRequestData,
  getBasConfig,
  getDeployer,
  getGreenfieldConfig,
  getKmsCryptConfig,
  getKmsSigner,
  getMulAttestParams,
  getOffchainUIDBAS,
  getPrivateKey,
  getPrivateKeyByKms,
  getSchemaByUID,
  getSigatureByDelegation,
  getSps,
  getbBundleUID,
  handleOspRequestData,
  handleOspRequestPrepareOffChain,
  initEAS,
  multiAttestBASOffChain,
  multiAttestBASOnChain,
  multiAttestBasUploadGreenField,
  multiAttestBasUploadGreenField_String,
  oneAttestBasUploadGreenField,
  registerSchema,
  selectSp,
  serializeJsonString,
  setBasConfig,
  setGreenfieldConfig,
  setKmsCryptConfig,
  setOspBasSdkConfig,
  setPrivateKey,
  setPrivateKeyByKms
};
/*! Bundled license information:

sax/lib/sax.js:
  (*! http://mths.be/fromcodepoint v0.1.0 by @mathias *)
*/
