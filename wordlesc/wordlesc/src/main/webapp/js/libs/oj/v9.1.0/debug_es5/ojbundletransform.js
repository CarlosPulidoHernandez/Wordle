(function() {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(['exports'], function (exports) {
  'use strict';

  var TYPE;

  (function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */

    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */

    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */

    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */

    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */

    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */

    TYPE[TYPE["plural"] = 6] = "plural";
    /**
     * Only possible within plural argument.
     * This is the `#` symbol that will be substituted with the count.
     */

    TYPE[TYPE["pound"] = 7] = "pound";
    /**
     * XML-like tag
     */

    TYPE[TYPE["tag"] = 8] = "tag";
  })(TYPE || (TYPE = {}));

  var SKELETON_TYPE;

  (function (SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
  })(SKELETON_TYPE || (SKELETON_TYPE = {}));
  /**
   * Type Guards
   */


  function isLiteralElement(el) {
    return el.type === TYPE.literal;
  }

  function isArgumentElement(el) {
    return el.type === TYPE.argument;
  }

  function isNumberElement(el) {
    return el.type === TYPE.number;
  }

  function isDateElement(el) {
    return el.type === TYPE.date;
  }

  function isTimeElement(el) {
    return el.type === TYPE.time;
  }

  function isSelectElement(el) {
    return el.type === TYPE.select;
  }

  function isPluralElement(el) {
    return el.type === TYPE.plural;
  }

  function isPoundElement(el) {
    return el.type === TYPE.pound;
  }

  function isTagElement(el) {
    return el.type === TYPE.tag;
  }

  function isNumberSkeleton(el) {
    return !!(el && _typeof(el) === 'object' && el.type === 0
    /* number */
    );
  }

  function isDateTimeSkeleton(el) {
    return !!(el && _typeof(el) === 'object' && el.type === 1
    /* dateTime */
    );
  }

  function createLiteralElement(value) {
    return {
      type: TYPE.literal,
      value: value
    };
  }

  function createNumberElement(value, style) {
    return {
      type: TYPE.number,
      value: value,
      style: style
    };
  } // @ts-nocheck


  var __extends = null && null.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var __assign = null && null.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  var SyntaxError =
  /** @class */
  function (_super) {
    __extends(SyntaxError, _super);

    function SyntaxError(message, expected, found, location) {
      var _this = _super.call(this) || this;

      _this.message = message;
      _this.expected = expected;
      _this.found = found;
      _this.location = location;
      _this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(_this, SyntaxError);
      }

      return _this;
    }

    SyntaxError.buildMessage = function (expected, found) {
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }

      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
          return "\\x" + hex(ch);
        });
      }

      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
          return "\\x" + hex(ch);
        });
      }

      function describeExpectation(expectation) {
        switch (expectation.type) {
          case "literal":
            return "\"" + literalEscape(expectation.text) + "\"";

          case "class":
            var escapedParts = expectation.parts.map(function (part) {
              return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
            });
            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";

          case "any":
            return "any character";

          case "end":
            return "end of input";

          case "other":
            return expectation.description;
        }
      }

      function describeExpected(expected1) {
        var descriptions = expected1.map(describeExpectation);
        var i;
        var j;
        descriptions.sort();

        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }

          descriptions.length = j;
        }

        switch (descriptions.length) {
          case 1:
            return descriptions[0];

          case 2:
            return descriptions[0] + " or " + descriptions[1];

          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }

      function describeFound(found1) {
        return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
      }

      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };

    return SyntaxError;
  }(Error);

  function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$startRuleFunctions = {
      start: peg$parsestart
    };
    var peg$startRuleFunction = peg$parsestart;

    var peg$c0 = function peg$c0() {
      return !ignoreTag;
    };

    var peg$c1 = function peg$c1(x) {
      return x;
    };

    var peg$c2 = function peg$c2() {
      return ignoreTag;
    };

    var peg$c3 = "<";
    var peg$c4 = peg$literalExpectation("<", false);

    var peg$c5 = function peg$c5(parts) {
      return parts.join('');
    };

    var peg$c6 = function peg$c6() {
      return '<';
    };

    var peg$c7 = function peg$c7(messageText) {
      return __assign({
        type: TYPE.literal,
        value: messageText
      }, insertLocation());
    };

    var peg$c8 = "#";
    var peg$c9 = peg$literalExpectation("#", false);

    var peg$c10 = function peg$c10() {
      return __assign({
        type: TYPE.pound
      }, insertLocation());
    };

    var peg$c11 = peg$otherExpectation("tagElement");

    var peg$c12 = function peg$c12(open, children, close) {
      if (open !== close) {
        error("Mismatch tag \"" + open + "\" !== \"" + close + "\"", location());
      }

      return __assign({
        type: TYPE.tag,
        value: open,
        children: children
      }, insertLocation());
    };

    var peg$c13 = "/>";
    var peg$c14 = peg$literalExpectation("/>", false);

    var peg$c15 = function peg$c15(value) {
      return __assign({
        type: TYPE.literal,
        value: value.join('')
      }, insertLocation());
    };

    var peg$c16 = ">";
    var peg$c17 = peg$literalExpectation(">", false);

    var peg$c18 = function peg$c18(tag) {
      return tag;
    };

    var peg$c19 = "</";
    var peg$c20 = peg$literalExpectation("</", false);
    var peg$c21 = peg$otherExpectation("argumentElement");
    var peg$c22 = "{";
    var peg$c23 = peg$literalExpectation("{", false);
    var peg$c24 = "}";
    var peg$c25 = peg$literalExpectation("}", false);

    var peg$c26 = function peg$c26(value) {
      return __assign({
        type: TYPE.argument,
        value: value
      }, insertLocation());
    };

    var peg$c27 = peg$otherExpectation("numberSkeletonId");
    var peg$c28 = /^['\/{}]/;
    var peg$c29 = peg$classExpectation(["'", "/", "{", "}"], false, false);
    var peg$c30 = peg$anyExpectation();
    var peg$c31 = peg$otherExpectation("numberSkeletonTokenOption");
    var peg$c32 = "/";
    var peg$c33 = peg$literalExpectation("/", false);

    var peg$c34 = function peg$c34(option) {
      return option;
    };

    var peg$c35 = peg$otherExpectation("numberSkeletonToken");

    var peg$c36 = function peg$c36(stem, options) {
      return {
        stem: stem,
        options: options
      };
    };

    var peg$c37 = function peg$c37(tokens) {
      return __assign({
        type: 0
        /* number */
        ,
        tokens: tokens
      }, insertLocation());
    };

    var peg$c38 = "::";
    var peg$c39 = peg$literalExpectation("::", false);

    var peg$c40 = function peg$c40(skeleton) {
      return skeleton;
    };

    var peg$c41 = function peg$c41() {
      messageCtx.push('numberArgStyle');
      return true;
    };

    var peg$c42 = function peg$c42(style) {
      messageCtx.pop();
      return style.replace(/\s*$/, '');
    };

    var peg$c43 = ",";
    var peg$c44 = peg$literalExpectation(",", false);
    var peg$c45 = "number";
    var peg$c46 = peg$literalExpectation("number", false);

    var peg$c47 = function peg$c47(value, type, style) {
      return __assign({
        type: type === 'number' ? TYPE.number : type === 'date' ? TYPE.date : TYPE.time,
        style: style && style[2],
        value: value
      }, insertLocation());
    };

    var peg$c48 = "'";
    var peg$c49 = peg$literalExpectation("'", false);
    var peg$c50 = /^[^']/;
    var peg$c51 = peg$classExpectation(["'"], true, false);
    var peg$c52 = /^[^a-zA-Z'{}]/;
    var peg$c53 = peg$classExpectation([["a", "z"], ["A", "Z"], "'", "{", "}"], true, false);
    var peg$c54 = /^[a-zA-Z]/;
    var peg$c55 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);

    var peg$c56 = function peg$c56(pattern) {
      return __assign({
        type: 1
        /* dateTime */
        ,
        pattern: pattern
      }, insertLocation());
    };

    var peg$c57 = function peg$c57() {
      messageCtx.push('dateOrTimeArgStyle');
      return true;
    };

    var peg$c58 = "date";
    var peg$c59 = peg$literalExpectation("date", false);
    var peg$c60 = "time";
    var peg$c61 = peg$literalExpectation("time", false);
    var peg$c62 = "plural";
    var peg$c63 = peg$literalExpectation("plural", false);
    var peg$c64 = "selectordinal";
    var peg$c65 = peg$literalExpectation("selectordinal", false);
    var peg$c66 = "offset:";
    var peg$c67 = peg$literalExpectation("offset:", false);

    var peg$c68 = function peg$c68(value, pluralType, offset, options) {
      return __assign({
        type: TYPE.plural,
        pluralType: pluralType === 'plural' ? 'cardinal' : 'ordinal',
        value: value,
        offset: offset ? offset[2] : 0,
        options: options.reduce(function (all, _a) {
          var id = _a.id,
              value = _a.value,
              optionLocation = _a.location;

          if (id in all) {
            error("Duplicate option \"" + id + "\" in plural element: \"" + text() + "\"", location());
          }

          all[id] = {
            value: value,
            location: optionLocation
          };
          return all;
        }, {})
      }, insertLocation());
    };

    var peg$c69 = "select";
    var peg$c70 = peg$literalExpectation("select", false);

    var peg$c71 = function peg$c71(value, options) {
      return __assign({
        type: TYPE.select,
        value: value,
        options: options.reduce(function (all, _a) {
          var id = _a.id,
              value = _a.value,
              optionLocation = _a.location;

          if (id in all) {
            error("Duplicate option \"" + id + "\" in select element: \"" + text() + "\"", location());
          }

          all[id] = {
            value: value,
            location: optionLocation
          };
          return all;
        }, {})
      }, insertLocation());
    };

    var peg$c72 = "=";
    var peg$c73 = peg$literalExpectation("=", false);

    var peg$c74 = function peg$c74(id) {
      messageCtx.push('select');
      return true;
    };

    var peg$c75 = function peg$c75(id, value) {
      messageCtx.pop();
      return __assign({
        id: id,
        value: value
      }, insertLocation());
    };

    var peg$c76 = function peg$c76(id) {
      messageCtx.push('plural');
      return true;
    };

    var peg$c77 = function peg$c77(id, value) {
      messageCtx.pop();
      return __assign({
        id: id,
        value: value
      }, insertLocation());
    };

    var peg$c78 = peg$otherExpectation("whitespace");
    var peg$c79 = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
    var peg$c80 = peg$classExpectation([["\t", "\r"], " ", "\x85", "\xA0", "\u1680", ["\u2000", "\u200A"], "\u2028", "\u2029", "\u202F", "\u205F", "\u3000"], false, false);
    var peg$c81 = peg$otherExpectation("syntax pattern");
    var peg$c82 = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/;
    var peg$c83 = peg$classExpectation([["!", "/"], [":", "@"], ["[", "^"], "`", ["{", "~"], ["\xA1", "\xA7"], "\xA9", "\xAB", "\xAC", "\xAE", "\xB0", "\xB1", "\xB6", "\xBB", "\xBF", "\xD7", "\xF7", ["\u2010", "\u2027"], ["\u2030", "\u203E"], ["\u2041", "\u2053"], ["\u2055", "\u205E"], ["\u2190", "\u245F"], ["\u2500", "\u2775"], ["\u2794", "\u2BFF"], ["\u2E00", "\u2E7F"], ["\u3001", "\u3003"], ["\u3008", "\u3020"], "\u3030", "\uFD3E", "\uFD3F", "\uFE45", "\uFE46"], false, false);
    var peg$c84 = peg$otherExpectation("optional whitespace");
    var peg$c85 = peg$otherExpectation("number");
    var peg$c86 = "-";
    var peg$c87 = peg$literalExpectation("-", false);

    var peg$c88 = function peg$c88(negative, num) {
      return num ? negative ? -num : num : 0;
    };

    var peg$c89 = peg$otherExpectation("apostrophe");
    var peg$c90 = peg$otherExpectation("double apostrophes");
    var peg$c91 = "''";
    var peg$c92 = peg$literalExpectation("''", false);

    var peg$c93 = function peg$c93() {
      return "'";
    };

    var peg$c94 = function peg$c94(escapedChar, quotedChars) {
      return escapedChar + quotedChars.replace("''", "'");
    };

    var peg$c95 = function peg$c95(x) {
      return x !== '<' && x !== '{' && !(isInPluralOption() && x === '#') && !(isNestedMessageText() && x === '}');
    };

    var peg$c96 = "\n";
    var peg$c97 = peg$literalExpectation("\n", false);

    var peg$c98 = function peg$c98(x) {
      return x === '<' || x === '>' || x === '{' || x === '}' || isInPluralOption() && x === '#';
    };

    var peg$c99 = peg$otherExpectation("argNameOrNumber");
    var peg$c100 = peg$otherExpectation("validTag");
    var peg$c101 = peg$otherExpectation("argNumber");
    var peg$c102 = "0";
    var peg$c103 = peg$literalExpectation("0", false);

    var peg$c104 = function peg$c104() {
      return 0;
    };

    var peg$c105 = /^[1-9]/;
    var peg$c106 = peg$classExpectation([["1", "9"]], false, false);
    var peg$c107 = /^[0-9]/;
    var peg$c108 = peg$classExpectation([["0", "9"]], false, false);

    var peg$c109 = function peg$c109(digits) {
      return parseInt(digits.join(''), 10);
    };

    var peg$c110 = peg$otherExpectation("argName");
    var peg$c111 = peg$otherExpectation("tagName");
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{
      line: 1,
      column: 1
    }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$result;

    if (options.startRule !== undefined) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location1) {
      location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }

    function error(message, location1) {
      location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
      throw peg$buildSimpleError(message, location1);
    }

    function peg$literalExpectation(text1, ignoreCase) {
      return {
        type: "literal",
        text: text1,
        ignoreCase: ignoreCase
      };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts: parts,
        inverted: inverted,
        ignoreCase: ignoreCase
      };
    }

    function peg$anyExpectation() {
      return {
        type: "any"
      };
    }

    function peg$endExpectation() {
      return {
        type: "end"
      };
    }

    function peg$otherExpectation(description) {
      return {
        type: "other",
        description: description
      };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos];
      var p;

      if (details) {
        return details;
      } else {
        p = pos - 1;

        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos);
      var endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected1) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected1);
    }

    function peg$buildSimpleError(message, location1) {
      return new SyntaxError(message, [], "", location1);
    }

    function peg$buildStructuredError(expected1, found, location1) {
      return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }

    function peg$parsestart() {
      var s0;
      s0 = peg$parsemessage();
      return s0;
    }

    function peg$parsemessage() {
      var s0, s1;
      s0 = [];
      s1 = peg$parsemessageElement();

      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parsemessageElement();
      }

      return s0;
    }

    function peg$parsemessageElement() {
      var s0, s1, s2;
      s0 = peg$currPos;
      peg$savedPos = peg$currPos;
      s1 = peg$c0();

      if (s1) {
        s1 = undefined;
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsetagElement();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseliteralElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();

          if (s0 === peg$FAILED) {
            s0 = peg$parsesimpleFormatElement();

            if (s0 === peg$FAILED) {
              s0 = peg$parsepluralElement();

              if (s0 === peg$FAILED) {
                s0 = peg$parseselectElement();

                if (s0 === peg$FAILED) {
                  s0 = peg$parsepoundElement();
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      peg$savedPos = peg$currPos;
      s1 = peg$c2();

      if (s1) {
        s1 = undefined;
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsedoubleApostrophes();

        if (s3 === peg$FAILED) {
          s3 = peg$parsequotedString();

          if (s3 === peg$FAILED) {
            s3 = peg$parseunquotedString();

            if (s3 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 60) {
                s3 = peg$c3;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          }
        }

        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsedoubleApostrophes();

            if (s3 === peg$FAILED) {
              s3 = peg$parsequotedString();

              if (s3 === peg$FAILED) {
                s3 = peg$parseunquotedString();

                if (s3 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 60) {
                    s3 = peg$c3;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c4);
                    }
                  }
                }
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c5(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsedoubleApostrophes();

        if (s2 === peg$FAILED) {
          s2 = peg$parsequotedString();

          if (s2 === peg$FAILED) {
            s2 = peg$parseunquotedString();

            if (s2 === peg$FAILED) {
              s2 = peg$parsenonTagStartingAngleBracket();
            }
          }
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsedoubleApostrophes();

            if (s2 === peg$FAILED) {
              s2 = peg$parsequotedString();

              if (s2 === peg$FAILED) {
                s2 = peg$parseunquotedString();

                if (s2 === peg$FAILED) {
                  s2 = peg$parsenonTagStartingAngleBracket();
                }
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c5(s1);
        }

        s0 = s1;
      }

      return s0;
    }

    function peg$parsenonTagStartingAngleBracket() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseopeningTag();

      if (s2 === peg$FAILED) {
        s2 = peg$parseclosingTag();

        if (s2 === peg$FAILED) {
          s2 = peg$parseselfClosingTag();
        }
      }

      peg$silentFails--;

      if (s2 === peg$FAILED) {
        s1 = undefined;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c3;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c4);
          }
        }

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c6();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseliteralElement() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsemessageText();

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c7(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsepoundElement() {
      var s0, s1;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c8;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c9);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c10();
      }

      s0 = s1;
      return s0;
    }

    function peg$parsetagElement() {
      var s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$parseselfClosingTag();

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseopeningTag();

        if (s1 !== peg$FAILED) {
          s2 = peg$parsemessage();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseclosingTag();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c12(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c11);
        }
      }

      return s0;
    }

    function peg$parseselfClosingTag() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 60) {
        s2 = peg$c3;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c4);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsevalidTag();

        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();

          if (s4 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c13) {
              s5 = peg$c13;
              peg$currPos += 2;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c14);
              }
            }

            if (s5 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c15(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseopeningTag() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c3;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c4);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalidTag();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c16;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseclosingTag() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalidTag();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c16;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5;
      peg$silentFails++;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c22;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargNameOrNumber();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c24;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c25);
                }
              }

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c26(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c21);
        }
      }

      return s0;
    }

    function peg$parsenumberSkeletonId() {
      var s0, s1, s2, s3, s4;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parsewhiteSpace();

      if (s4 === peg$FAILED) {
        if (peg$c28.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
      }

      peg$silentFails--;

      if (s4 === peg$FAILED) {
        s3 = undefined;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsewhiteSpace();

          if (s4 === peg$FAILED) {
            if (peg$c28.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }
          }

          peg$silentFails--;

          if (s4 === peg$FAILED) {
            s3 = undefined;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c30);
              }
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }

      return s0;
    }

    function peg$parsenumberSkeletonTokenOption() {
      var s0, s1, s2;
      peg$silentFails++;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c32;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumberSkeletonId();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c34(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }

      return s0;
    }

    function peg$parsenumberSkeletonToken() {
      var s0, s1, s2, s3, s4;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumberSkeletonId();

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsenumberSkeletonTokenOption();

          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsenumberSkeletonTokenOption();
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c36(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }

      return s0;
    }

    function peg$parsenumberSkeleton() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsenumberSkeletonToken();

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsenumberSkeletonToken();
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c37(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsenumberArgStyle() {
      var s0, s1, s2;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c38) {
        s1 = peg$c38;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumberSkeleton();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        peg$savedPos = peg$currPos;
        s1 = peg$c41();

        if (s1) {
          s1 = undefined;
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parsemessageText();

          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c42(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsenumberFormatElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c22;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargNameOrNumber();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c43;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c44);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();

                if (s6 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c45) {
                    s7 = peg$c45;
                    peg$currPos += 6;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c46);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();

                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;

                      if (input.charCodeAt(peg$currPos) === 44) {
                        s10 = peg$c43;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c44);
                        }
                      }

                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse_();

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parsenumberArgStyle();

                          if (s12 !== peg$FAILED) {
                            s10 = [s10, s11, s12];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }

                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();

                        if (s10 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 125) {
                            s11 = peg$c24;
                            peg$currPos++;
                          } else {
                            s11 = peg$FAILED;

                            if (peg$silentFails === 0) {
                              peg$fail(peg$c25);
                            }
                          }

                          if (s11 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c47(s3, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedateTimeSkeletonLiteral() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c48;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c49);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsedoubleApostrophes();

        if (s3 === peg$FAILED) {
          if (peg$c50.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }
        }

        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsedoubleApostrophes();

            if (s3 === peg$FAILED) {
              if (peg$c50.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c51);
                }
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c48;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c49);
            }
          }

          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = [];
        s1 = peg$parsedoubleApostrophes();

        if (s1 === peg$FAILED) {
          if (peg$c52.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c53);
            }
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parsedoubleApostrophes();

            if (s1 === peg$FAILED) {
              if (peg$c52.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c53);
                }
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsedateTimeSkeletonPattern() {
      var s0, s1;
      s0 = [];

      if (peg$c54.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c55);
        }
      }

      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);

          if (peg$c54.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c55);
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedateTimeSkeleton() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsedateTimeSkeletonLiteral();

      if (s3 === peg$FAILED) {
        s3 = peg$parsedateTimeSkeletonPattern();
      }

      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsedateTimeSkeletonLiteral();

          if (s3 === peg$FAILED) {
            s3 = peg$parsedateTimeSkeletonPattern();
          }
        }
      } else {
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        s1 = input.substring(s1, peg$currPos);
      } else {
        s1 = s2;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c56(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsedateOrTimeArgStyle() {
      var s0, s1, s2;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c38) {
        s1 = peg$c38;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsedateTimeSkeleton();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        peg$savedPos = peg$currPos;
        s1 = peg$c57();

        if (s1) {
          s1 = undefined;
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parsemessageText();

          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c42(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsedateOrTimeFormatElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c22;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargNameOrNumber();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c43;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c44);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();

                if (s6 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c58) {
                    s7 = peg$c58;
                    peg$currPos += 4;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c59);
                    }
                  }

                  if (s7 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c60) {
                      s7 = peg$c60;
                      peg$currPos += 4;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c61);
                      }
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();

                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;

                      if (input.charCodeAt(peg$currPos) === 44) {
                        s10 = peg$c43;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c44);
                        }
                      }

                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse_();

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parsedateOrTimeArgStyle();

                          if (s12 !== peg$FAILED) {
                            s10 = [s10, s11, s12];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }

                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();

                        if (s10 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 125) {
                            s11 = peg$c24;
                            peg$currPos++;
                          } else {
                            s11 = peg$FAILED;

                            if (peg$silentFails === 0) {
                              peg$fail(peg$c25);
                            }
                          }

                          if (s11 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c47(s3, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsesimpleFormatElement() {
      var s0;
      s0 = peg$parsenumberFormatElement();

      if (s0 === peg$FAILED) {
        s0 = peg$parsedateOrTimeFormatElement();
      }

      return s0;
    }

    function peg$parsepluralElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c22;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargNameOrNumber();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c43;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c44);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();

                if (s6 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c62) {
                    s7 = peg$c62;
                    peg$currPos += 6;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s7 === peg$FAILED) {
                    if (input.substr(peg$currPos, 13) === peg$c64) {
                      s7 = peg$c64;
                      peg$currPos += 13;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c65);
                      }
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();

                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s9 = peg$c43;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c44);
                        }
                      }

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();

                        if (s10 !== peg$FAILED) {
                          s11 = peg$currPos;

                          if (input.substr(peg$currPos, 7) === peg$c66) {
                            s12 = peg$c66;
                            peg$currPos += 7;
                          } else {
                            s12 = peg$FAILED;

                            if (peg$silentFails === 0) {
                              peg$fail(peg$c67);
                            }
                          }

                          if (s12 !== peg$FAILED) {
                            s13 = peg$parse_();

                            if (s13 !== peg$FAILED) {
                              s14 = peg$parsenumber();

                              if (s14 !== peg$FAILED) {
                                s12 = [s12, s13, s14];
                                s11 = s12;
                              } else {
                                peg$currPos = s11;
                                s11 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s11;
                              s11 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }

                          if (s11 === peg$FAILED) {
                            s11 = null;
                          }

                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();

                            if (s12 !== peg$FAILED) {
                              s13 = [];
                              s14 = peg$parsepluralOption();

                              if (s14 !== peg$FAILED) {
                                while (s14 !== peg$FAILED) {
                                  s13.push(s14);
                                  s14 = peg$parsepluralOption();
                                }
                              } else {
                                s13 = peg$FAILED;
                              }

                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();

                                if (s14 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 125) {
                                    s15 = peg$c24;
                                    peg$currPos++;
                                  } else {
                                    s15 = peg$FAILED;

                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c25);
                                    }
                                  }

                                  if (s15 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c68(s3, s7, s11, s13);
                                    s0 = s1;
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c22;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargNameOrNumber();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s5 = peg$c43;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c44);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();

                if (s6 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c69) {
                    s7 = peg$c69;
                    peg$currPos += 6;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c70);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();

                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s9 = peg$c43;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c44);
                        }
                      }

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();

                        if (s10 !== peg$FAILED) {
                          s11 = [];
                          s12 = peg$parseselectOption();

                          if (s12 !== peg$FAILED) {
                            while (s12 !== peg$FAILED) {
                              s11.push(s12);
                              s12 = peg$parseselectOption();
                            }
                          } else {
                            s11 = peg$FAILED;
                          }

                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();

                            if (s12 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 125) {
                                s13 = peg$c24;
                                peg$currPos++;
                              } else {
                                s13 = peg$FAILED;

                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c25);
                                }
                              }

                              if (s13 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c71(s3, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralRuleSelectValue() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c72;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c73);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parseargName();
      }

      return s0;
    }

    function peg$parseselectOption() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        s2 = peg$parseargName();

        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c22;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }

            if (s4 !== peg$FAILED) {
              peg$savedPos = peg$currPos;
              s5 = peg$c74(s2);

              if (s5) {
                s5 = undefined;
              } else {
                s5 = peg$FAILED;
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessage();

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c24;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c25);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c75(s2, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralOption() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsepluralRuleSelectValue();

        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c22;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }

            if (s4 !== peg$FAILED) {
              peg$savedPos = peg$currPos;
              s5 = peg$c76(s2);

              if (s5) {
                s5 = undefined;
              } else {
                s5 = peg$FAILED;
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessage();

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c24;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c25);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c77(s2, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsewhiteSpace() {
      var s0, s1;
      peg$silentFails++;

      if (peg$c79.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c80);
        }
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c78);
        }
      }

      return s0;
    }

    function peg$parsepatternSyntax() {
      var s0, s1;
      peg$silentFails++;

      if (peg$c82.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c83);
        }
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c81);
        }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewhiteSpace();

      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewhiteSpace();
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c84);
        }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2;
      peg$silentFails++;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c86;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c87);
        }
      }

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseargNumber();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c88(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c85);
        }
      }

      return s0;
    }

    function peg$parseapostrophe() {
      var s0, s1;
      peg$silentFails++;

      if (input.charCodeAt(peg$currPos) === 39) {
        s0 = peg$c48;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c49);
        }
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c89);
        }
      }

      return s0;
    }

    function peg$parsedoubleApostrophes() {
      var s0, s1;
      peg$silentFails++;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 2) === peg$c91) {
        s1 = peg$c91;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c92);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c93();
      }

      s0 = s1;
      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c90);
        }
      }

      return s0;
    }

    function peg$parsequotedString() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c48;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c49);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseescapedChar();

        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = [];

          if (input.substr(peg$currPos, 2) === peg$c91) {
            s5 = peg$c91;
            peg$currPos += 2;
          } else {
            s5 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }

          if (s5 === peg$FAILED) {
            if (peg$c50.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c51);
              }
            }
          }

          while (s5 !== peg$FAILED) {
            s4.push(s5);

            if (input.substr(peg$currPos, 2) === peg$c91) {
              s5 = peg$c91;
              peg$currPos += 2;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c92);
              }
            }

            if (s5 === peg$FAILED) {
              if (peg$c50.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c51);
                }
              }
            }
          }

          if (s4 !== peg$FAILED) {
            s3 = input.substring(s3, peg$currPos);
          } else {
            s3 = s4;
          }

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c48;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c49);
              }
            }

            if (s4 === peg$FAILED) {
              s4 = null;
            }

            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c94(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseunquotedString() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s3 = peg$c95(s2);

        if (s3) {
          s3 = undefined;
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s1 = peg$c96;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c97);
          }
        }
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseescapedChar() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c30);
        }
      }

      if (s2 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s3 = peg$c98(s2);

        if (s3) {
          s3 = undefined;
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseargNameOrNumber() {
      var s0, s1;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseargNumber();

      if (s1 === peg$FAILED) {
        s1 = peg$parseargName();
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c99);
        }
      }

      return s0;
    }

    function peg$parsevalidTag() {
      var s0, s1;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseargNumber();

      if (s1 === peg$FAILED) {
        s1 = peg$parsetagName();
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c100);
        }
      }

      return s0;
    }

    function peg$parseargNumber() {
      var s0, s1, s2, s3, s4;
      peg$silentFails++;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c102;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c103);
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c104();
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (peg$c105.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c106);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = [];

          if (peg$c107.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c108);
            }
          }

          while (s4 !== peg$FAILED) {
            s3.push(s4);

            if (peg$c107.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c108);
              }
            }
          }

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c109(s1);
        }

        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c101);
        }
      }

      return s0;
    }

    function peg$parseargName() {
      var s0, s1, s2, s3, s4;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parsewhiteSpace();

      if (s4 === peg$FAILED) {
        s4 = peg$parsepatternSyntax();
      }

      peg$silentFails--;

      if (s4 === peg$FAILED) {
        s3 = undefined;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c30);
          }
        }

        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parsewhiteSpace();

          if (s4 === peg$FAILED) {
            s4 = peg$parsepatternSyntax();
          }

          peg$silentFails--;

          if (s4 === peg$FAILED) {
            s3 = undefined;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c30);
              }
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c110);
        }
      }

      return s0;
    }

    function peg$parsetagName() {
      var s0, s1, s2, s3, s4;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];

      if (input.charCodeAt(peg$currPos) === 45) {
        s2 = peg$c86;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c87);
        }
      }

      if (s2 === peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parsewhiteSpace();

        if (s4 === peg$FAILED) {
          s4 = peg$parsepatternSyntax();
        }

        peg$silentFails--;

        if (s4 === peg$FAILED) {
          s3 = undefined;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }

          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);

          if (input.charCodeAt(peg$currPos) === 45) {
            s2 = peg$c86;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c87);
            }
          }

          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$currPos;
            peg$silentFails++;
            s4 = peg$parsewhiteSpace();

            if (s4 === peg$FAILED) {
              s4 = peg$parsepatternSyntax();
            }

            peg$silentFails--;

            if (s4 === peg$FAILED) {
              s3 = undefined;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c30);
                }
              }

              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c111);
        }
      }

      return s0;
    }

    var messageCtx = ['root'];

    function isNestedMessageText() {
      return messageCtx.length > 1;
    }

    function isInPluralOption() {
      return messageCtx[messageCtx.length - 1] === 'plural';
    }

    function insertLocation() {
      return options && options.captureLocation ? {
        location: location()
      } : {};
    }

    var ignoreTag = options && options.ignoreTag;
    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  var pegParse = peg$parse;

  var __spreadArrays = null && null.__spreadArrays || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
      s += arguments[i].length;
    }

    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];
      }
    }

    return r;
  };

  var PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g;
  /**
   * Whether to convert `#` in plural rule options
   * to `{var, number}`
   * @param el AST Element
   * @param pluralStack current plural stack
   */

  function normalizeHashtagInPlural(els) {
    els.forEach(function (el) {
      // If we're encountering a plural el
      if (!isPluralElement(el) && !isSelectElement(el)) {
        return;
      } // Go down the options and search for # in any literal element


      Object.keys(el.options).forEach(function (id) {
        var _a;

        var opt = el.options[id]; // If we got a match, we have to split this
        // and inject a NumberElement in the middle

        var matchingLiteralElIndex = -1;
        var literalEl = undefined;

        for (var i = 0; i < opt.value.length; i++) {
          var el_1 = opt.value[i];

          if (isLiteralElement(el_1) && PLURAL_HASHTAG_REGEX.test(el_1.value)) {
            matchingLiteralElIndex = i;
            literalEl = el_1;
            break;
          }
        }

        if (literalEl) {
          var newValue = literalEl.value.replace(PLURAL_HASHTAG_REGEX, "$1{" + el.value + ", number}");
          var newEls = pegParse(newValue);

          (_a = opt.value).splice.apply(_a, __spreadArrays([matchingLiteralElIndex, 1], newEls));
        }

        normalizeHashtagInPlural(opt.value);
      });
    });
  }

  var __assign$1 = null && null.__assign || function () {
    __assign$1 = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return __assign$1.apply(this, arguments);
  };
  /**
   * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
   * with some tweaks
   */


  var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  /**
   * Parse Date time skeleton into Intl.DateTimeFormatOptions
   * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * @public
   * @param skeleton skeleton string
   */

  function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function (match) {
      var len = match.length;

      switch (match[0]) {
        // Era
        case 'G':
          result.era = len === 4 ? 'long' : len === 5 ? 'narrow' : 'short';
          break;
        // Year

        case 'y':
          result.year = len === 2 ? '2-digit' : 'numeric';
          break;

        case 'Y':
        case 'u':
        case 'U':
        case 'r':
          throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
        // Quarter

        case 'q':
        case 'Q':
          throw new RangeError('`q/Q` (quarter) patterns are not supported');
        // Month

        case 'M':
        case 'L':
          result.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1];
          break;
        // Week

        case 'w':
        case 'W':
          throw new RangeError('`w/W` (week) patterns are not supported');

        case 'd':
          result.day = ['numeric', '2-digit'][len - 1];
          break;

        case 'D':
        case 'F':
        case 'g':
          throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
        // Weekday

        case 'E':
          result.weekday = len === 4 ? 'short' : len === 5 ? 'narrow' : 'short';
          break;

        case 'e':
          if (len < 4) {
            throw new RangeError('`e..eee` (weekday) patterns are not supported');
          }

          result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
          break;

        case 'c':
          if (len < 4) {
            throw new RangeError('`c..ccc` (weekday) patterns are not supported');
          }

          result.weekday = ['short', 'long', 'narrow', 'short'][len - 4];
          break;
        // Period

        case 'a':
          // AM, PM
          result.hour12 = true;
          break;

        case 'b': // am, pm, noon, midnight

        case 'B':
          // flexible day periods
          throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
        // Hour

        case 'h':
          result.hourCycle = 'h12';
          result.hour = ['numeric', '2-digit'][len - 1];
          break;

        case 'H':
          result.hourCycle = 'h23';
          result.hour = ['numeric', '2-digit'][len - 1];
          break;

        case 'K':
          result.hourCycle = 'h11';
          result.hour = ['numeric', '2-digit'][len - 1];
          break;

        case 'k':
          result.hourCycle = 'h24';
          result.hour = ['numeric', '2-digit'][len - 1];
          break;

        case 'j':
        case 'J':
        case 'C':
          throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
        // Minute

        case 'm':
          result.minute = ['numeric', '2-digit'][len - 1];
          break;
        // Second

        case 's':
          result.second = ['numeric', '2-digit'][len - 1];
          break;

        case 'S':
        case 'A':
          throw new RangeError('`S/A` (second) pattenrs are not supported, use `s` instead');
        // Zone

        case 'z':
          // 1..3, 4: specific non-location format
          result.timeZoneName = len < 4 ? 'short' : 'long';
          break;

        case 'Z': // 1..3, 4, 5: The ISO8601 varios formats

        case 'O': // 1, 4: miliseconds in day short, long

        case 'v': // 1, 4: generic non-location format

        case 'V': // 1, 2, 3, 4: time zone ID or city

        case 'X': // 1, 2, 3, 4: The ISO8601 varios formats

        case 'x':
          // 1, 2, 3, 4: The ISO8601 varios formats
          throw new RangeError('`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead');
      }

      return '';
    });
    return result;
  }

  function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, '');
  }

  var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
  var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?$/g;

  function parseSignificantPrecision(str) {
    var result = {};
    str.replace(SIGNIFICANT_PRECISION_REGEX, function (_, g1, g2) {
      // @@@ case
      if (typeof g2 !== 'string') {
        result.minimumSignificantDigits = g1.length;
        result.maximumSignificantDigits = g1.length;
      } // @@@+ case
      else if (g2 === '+') {
          result.minimumSignificantDigits = g1.length;
        } // .### case
        else if (g1[0] === '#') {
            result.maximumSignificantDigits = g1.length;
          } // .@@## or .@@@ case
          else {
              result.minimumSignificantDigits = g1.length;
              result.maximumSignificantDigits = g1.length + (typeof g2 === 'string' ? g2.length : 0);
            }

      return '';
    });
    return result;
  }

  function parseSign(str) {
    switch (str) {
      case 'sign-auto':
        return {
          signDisplay: 'auto'
        };

      case 'sign-accounting':
        return {
          currencySign: 'accounting'
        };

      case 'sign-always':
        return {
          signDisplay: 'always'
        };

      case 'sign-accounting-always':
        return {
          signDisplay: 'always',
          currencySign: 'accounting'
        };

      case 'sign-except-zero':
        return {
          signDisplay: 'exceptZero'
        };

      case 'sign-accounting-except-zero':
        return {
          signDisplay: 'exceptZero',
          currencySign: 'accounting'
        };

      case 'sign-never':
        return {
          signDisplay: 'never'
        };
    }
  }

  function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);

    if (signOpts) {
      return signOpts;
    }

    return result;
  }
  /**
   * https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#skeleton-stems-and-options
   */


  function convertNumberSkeletonToNumberFormatOptions(tokens) {
    var result = {};

    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];

      switch (token.stem) {
        case 'percent':
          result.style = 'percent';
          continue;

        case 'currency':
          result.style = 'currency';
          result.currency = token.options[0];
          continue;

        case 'group-off':
          result.useGrouping = false;
          continue;

        case 'precision-integer':
        case '.':
          result.maximumFractionDigits = 0;
          continue;

        case 'measure-unit':
          result.style = 'unit';
          result.unit = icuUnitToEcma(token.options[0]);
          continue;

        case 'compact-short':
          result.notation = 'compact';
          result.compactDisplay = 'short';
          continue;

        case 'compact-long':
          result.notation = 'compact';
          result.compactDisplay = 'long';
          continue;

        case 'scientific':
          result = __assign$1(__assign$1(__assign$1({}, result), {
            notation: 'scientific'
          }), token.options.reduce(function (all, opt) {
            return __assign$1(__assign$1({}, all), parseNotationOptions(opt));
          }, {}));
          continue;

        case 'engineering':
          result = __assign$1(__assign$1(__assign$1({}, result), {
            notation: 'engineering'
          }), token.options.reduce(function (all, opt) {
            return __assign$1(__assign$1({}, all), parseNotationOptions(opt));
          }, {}));
          continue;

        case 'notation-simple':
          result.notation = 'standard';
          continue;
        // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h

        case 'unit-width-narrow':
          result.currencyDisplay = 'narrowSymbol';
          result.unitDisplay = 'narrow';
          continue;

        case 'unit-width-short':
          result.currencyDisplay = 'code';
          result.unitDisplay = 'short';
          continue;

        case 'unit-width-full-name':
          result.currencyDisplay = 'name';
          result.unitDisplay = 'long';
          continue;

        case 'unit-width-iso-code':
          result.currencyDisplay = 'symbol';
          continue;
      } // Precision
      // https://github.com/unicode-org/icu/blob/master/docs/userguide/format_parse/numbers/skeletons.md#fraction-precision
      // precision-integer case


      if (FRACTION_PRECISION_REGEX.test(token.stem)) {
        if (token.options.length > 1) {
          throw new RangeError('Fraction-precision stems only accept a single optional option');
        }

        token.stem.replace(FRACTION_PRECISION_REGEX, function (_, g1, g2, g3, g4, g5) {
          // .000* case (before ICU67 it was .000+)
          if (g2 === '*') {
            result.minimumFractionDigits = g1.length;
          } // .### case
          else if (g3 && g3[0] === '#') {
              result.maximumFractionDigits = g3.length;
            } // .00## case
            else if (g4 && g5) {
                result.minimumFractionDigits = g4.length;
                result.maximumFractionDigits = g4.length + g5.length;
              } else {
                result.minimumFractionDigits = g1.length;
                result.maximumFractionDigits = g1.length;
              }

          return '';
        });

        if (token.options.length) {
          result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.options[0]));
        }

        continue;
      }

      if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
        result = __assign$1(__assign$1({}, result), parseSignificantPrecision(token.stem));
        continue;
      }

      var signOpts = parseSign(token.stem);

      if (signOpts) {
        result = __assign$1(__assign$1({}, result), signOpts);
      }
    }

    return result;
  }

  function parse(input, opts) {
    var els = pegParse(input, opts);

    if (!opts || opts.normalizeHashtagInPlural !== false) {
      normalizeHashtagInPlural(els);
    }

    return els;
  }
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */


  var __spreadArrays$1 = null && null.__spreadArrays || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
      s += arguments[i].length;
    }

    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];
      }
    }

    return r;
  }; // -- Utilities ----------------------------------------------------------------


  function getCacheId(inputs) {
    return JSON.stringify(inputs.map(function (input) {
      return input && _typeof(input) === 'object' ? orderedProps(input) : input;
    }));
  }

  function orderedProps(obj) {
    return Object.keys(obj).sort().map(function (k) {
      var _a;

      return _a = {}, _a[k] = obj[k], _a;
    });
  }

  var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
    if (cache === void 0) {
      cache = {};
    }

    return function () {
      var _a;

      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var cacheId = getCacheId(args);
      var format = cacheId && cache[cacheId];

      if (!format) {
        format = new ((_a = FormatConstructor).bind.apply(_a, __spreadArrays$1([void 0], args)))();

        if (cacheId) {
          cache[cacheId] = format;
        }
      }

      return format;
    };
  };

  var __extends$1 = null && null.__extends || function () {
    var _extendStatics2 = function extendStatics(d, b) {
      _extendStatics2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics2(d, b);
    };

    return function (d, b) {
      _extendStatics2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var ErrorCode;

  (function (ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE"; // When value supplied is invalid

    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE"; // When we need specific Intl API but it's not available

    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
  })(ErrorCode || (ErrorCode = {}));

  var FormatError =
  /** @class */
  function (_super) {
    __extends$1(FormatError, _super);

    function FormatError(msg, code, originalMessage) {
      var _this = _super.call(this, msg) || this;

      _this.code = code;
      _this.originalMessage = originalMessage;
      return _this;
    }

    FormatError.prototype.toString = function () {
      return "[formatjs Error: " + this.code + "] " + this.message;
    };

    return FormatError;
  }(Error);

  var InvalidValueError =
  /** @class */
  function (_super) {
    __extends$1(InvalidValueError, _super);

    function InvalidValueError(variableId, value, options, originalMessage) {
      return _super.call(this, "Invalid values for \"" + variableId + "\": \"" + value + "\". Options are \"" + Object.keys(options).join('", "') + "\"", "INVALID_VALUE"
      /* INVALID_VALUE */
      , originalMessage) || this;
    }

    return InvalidValueError;
  }(FormatError);

  var InvalidValueTypeError =
  /** @class */
  function (_super) {
    __extends$1(InvalidValueTypeError, _super);

    function InvalidValueTypeError(value, type, originalMessage) {
      return _super.call(this, "Value for \"" + value + "\" must be of type " + type, "INVALID_VALUE"
      /* INVALID_VALUE */
      , originalMessage) || this;
    }

    return InvalidValueTypeError;
  }(FormatError);

  var MissingValueError =
  /** @class */
  function (_super) {
    __extends$1(MissingValueError, _super);

    function MissingValueError(variableId, originalMessage) {
      return _super.call(this, "The intl string context variable \"" + variableId + "\" was not provided to the string \"" + originalMessage + "\"", "MISSING_VALUE"
      /* MISSING_VALUE */
      , originalMessage) || this;
    }

    return MissingValueError;
  }(FormatError);

  var PART_TYPE;

  (function (PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
  })(PART_TYPE || (PART_TYPE = {}));

  function mergeLiteral(parts) {
    if (parts.length < 2) {
      return parts;
    }

    return parts.reduce(function (all, part) {
      var lastPart = all[all.length - 1];

      if (!lastPart || lastPart.type !== 0
      /* literal */
      || part.type !== 0
      /* literal */
      ) {
          all.push(part);
        } else {
        lastPart.value += part.value;
      }

      return all;
    }, []);
  }

  function isFormatXMLElementFn(el) {
    return typeof el === 'function';
  } // TODO(skeleton): add skeleton support


  function formatToParts(els, locales, formatters, formats, values, currentPluralValue, // For debugging
  originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
      return [{
        type: 0
        /* literal */
        ,
        value: els[0].value
      }];
    }

    var result = [];

    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
      var el = els_1[_i]; // Exit early for string parts.

      if (isLiteralElement(el)) {
        result.push({
          type: 0
          /* literal */
          ,
          value: el.value
        });
        continue;
      } // TODO: should this part be literal type?
      // Replace `#` in plural rules with the actual numeric value.


      if (isPoundElement(el)) {
        if (typeof currentPluralValue === 'number') {
          result.push({
            type: 0
            /* literal */
            ,
            value: formatters.getNumberFormat(locales).format(currentPluralValue)
          });
        }

        continue;
      }

      var varName = el.value; // Enforce that all required values are provided by the caller.

      if (!(values && varName in values)) {
        throw new MissingValueError(varName, originalMessage);
      }

      var value = values[varName];

      if (isArgumentElement(el)) {
        if (!value || typeof value === 'string' || typeof value === 'number') {
          value = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
        }

        result.push({
          type: typeof value === 'string' ? 0
          /* literal */
          : 1
          /* object */
          ,
          value: value
        });
        continue;
      } // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.


      if (isDateElement(el)) {
        var style = typeof el.style === 'string' ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? parseDateTimeSkeleton(el.style.pattern) : undefined;
        result.push({
          type: 0
          /* literal */
          ,
          value: formatters.getDateTimeFormat(locales, style).format(value)
        });
        continue;
      }

      if (isTimeElement(el)) {
        var style = typeof el.style === 'string' ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? parseDateTimeSkeleton(el.style.pattern) : undefined;
        result.push({
          type: 0
          /* literal */
          ,
          value: formatters.getDateTimeFormat(locales, style).format(value)
        });
        continue;
      }

      if (isNumberElement(el)) {
        var style = typeof el.style === 'string' ? formats.number[el.style] : isNumberSkeleton(el.style) ? convertNumberSkeletonToNumberFormatOptions(el.style.tokens) : undefined;
        result.push({
          type: 0
          /* literal */
          ,
          value: formatters.getNumberFormat(locales, style).format(value)
        });
        continue;
      }

      if (isTagElement(el)) {
        var children = el.children,
            value_1 = el.value;
        var formatFn = values[value_1];

        if (!isFormatXMLElementFn(formatFn)) {
          throw new InvalidValueTypeError(value_1, 'function', originalMessage);
        }

        var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
        var chunks = formatFn.apply(void 0, parts.map(function (p) {
          return p.value;
        }));

        if (!Array.isArray(chunks)) {
          chunks = [chunks];
        }

        result.push.apply(result, chunks.map(function (c) {
          return {
            type: typeof c === 'string' ? 0
            /* literal */
            : 1
            /* object */
            ,
            value: c
          };
        }));
      }

      if (isSelectElement(el)) {
        var opt = el.options[value] || el.options.other;

        if (!opt) {
          throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
        }

        result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
        continue;
      }

      if (isPluralElement(el)) {
        var opt = el.options["=" + value];

        if (!opt) {
          if (!Intl.PluralRules) {
            throw new FormatError("Intl.PluralRules is not available in this environment.\nTry polyfilling it using \"@formatjs/intl-pluralrules\"\n", "MISSING_INTL_API"
            /* MISSING_INTL_API */
            , originalMessage);
          }

          var rule = formatters.getPluralRules(locales, {
            type: el.pluralType
          }).select(value - (el.offset || 0));
          opt = el.options[rule] || el.options.other;
        }

        if (!opt) {
          throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
        }

        result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
        continue;
      }
    }

    return mergeLiteral(result);
  }
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */


  var __assign$2 = null && null.__assign || function () {
    __assign$2 = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return __assign$2.apply(this, arguments);
  }; // -- MessageFormat --------------------------------------------------------


  function mergeConfig(c1, c2) {
    if (!c2) {
      return c1;
    }

    return __assign$2(__assign$2(__assign$2({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function (all, k) {
      all[k] = __assign$2(__assign$2({}, c1[k]), c2[k] || {});
      return all;
    }, {}));
  }

  function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
      return defaultConfig;
    }

    return Object.keys(defaultConfig).reduce(function (all, k) {
      all[k] = mergeConfig(defaultConfig[k], configs[k]);
      return all;
    }, __assign$2({}, defaultConfig));
  }

  function createDefaultFormatters(cache) {
    if (cache === void 0) {
      cache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      };
    }

    return {
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat, cache.number),
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat, cache.dateTime),
      getPluralRules: memoizeFormatConstructor(Intl.PluralRules, cache.pluralRules)
    };
  }

  var IntlMessageFormat =
  /** @class */
  function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
      var _this = this;

      if (locales === void 0) {
        locales = IntlMessageFormat.defaultLocale;
      }

      this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      };

      this.format = function (values) {
        var parts = _this.formatToParts(values); // Hot path for straight simple msg translations


        if (parts.length === 1) {
          return parts[0].value;
        }

        var result = parts.reduce(function (all, part) {
          if (!all.length || part.type !== 0
          /* literal */
          || typeof all[all.length - 1] !== 'string') {
            all.push(part.value);
          } else {
            all[all.length - 1] += part.value;
          }

          return all;
        }, []);

        if (result.length <= 1) {
          return result[0] || '';
        }

        return result;
      };

      this.formatToParts = function (values) {
        return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, undefined, _this.message);
      };

      this.resolvedOptions = function () {
        return {
          locale: Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
        };
      };

      this.getAst = function () {
        return _this.ast;
      };

      if (typeof message === 'string') {
        this.message = message;

        if (!IntlMessageFormat.__parse) {
          throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
        } // Parse string messages into an AST.


        this.ast = IntlMessageFormat.__parse(message, {
          normalizeHashtagInPlural: false,
          ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag
        });
      } else {
        this.ast = message;
      }

      if (!Array.isArray(this.ast)) {
        throw new TypeError('A message must be provided as a String or AST.');
      } // Creates a new object with the specified `formats` merged with the default
      // formats.


      this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats); // Defined first because it's used to build the format pattern.

      this.locales = locales;
      this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
    }

    Object.defineProperty(IntlMessageFormat, "defaultLocale", {
      get: function get() {
        if (!IntlMessageFormat.memoizedDefaultLocale) {
          IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
        }

        return IntlMessageFormat.memoizedDefaultLocale;
      },
      enumerable: true,
      configurable: true
    });
    IntlMessageFormat.memoizedDefaultLocale = null;
    IntlMessageFormat.__parse = parse; // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.

    IntlMessageFormat.formats = {
      number: {
        currency: {
          style: 'currency'
        },
        percent: {
          style: 'percent'
        }
      },
      date: {
        short: {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        medium: {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        long: {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        full: {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        short: {
          hour: 'numeric',
          minute: 'numeric'
        },
        medium: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        long: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        full: {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    };
    return IntlMessageFormat;
  }();
  /*
  Copyright (c) 2014, Yahoo! Inc. All rights reserved.
  Copyrights licensed under the New BSD License.
  See the accompanying LICENSE file for terms.
  */


  function _getFormatter(pattern, locale) {
    return function (values) {
      return new IntlMessageFormat(pattern, locale).format(values);
    };
  }

  function convertBundle(bundle, locale) {
    return Object.keys(bundle).reduce(function (acc, key) {
      if (!key.startsWith('@')) {
        acc[key] = _getFormatter(bundle[key], locale);
      }

      return acc;
    }, {});
  }

  exports.convertBundle = convertBundle;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
}())