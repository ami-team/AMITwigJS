function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  'use strict';
  /*!
   * AMI Twig Engine
   *
   * Copyright (c) 2014-{{YEAR}} CNRS / LPSC
   *
   * This file must be used under the terms of the CeCILL-C:
   * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
   * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
   *
   */

  var amiTwig = {
    version: '1.2.0'
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports.amiTwig = amiTwig;
  } else if (typeof window !== 'undefined') {
    window.amiTwig = amiTwig;
  } else if (typeof global !== 'undefined') {
    global.amiTwig = amiTwig;
  }

  amiTwig.tokenizer = {
    tokenize: function tokenize(code, line, spaces, tokenDefs, tokenTypes, error) {
      if (tokenDefs.length !== tokenTypes.length) {
        throw '`tokenDefs.length != tokenTypes.length`';
      }

      var result_tokens = [];
      var result_types = [];
      var result_lines = [];
      var i = 0x000000000;
      var l = code.length;
      var word = '',
          token,
          c;

      __l0: while (i < l) {
        c = code.charAt(0);

        if (c === '\n') {
          line++;
        }

        if (spaces.indexOf(c) >= 0) {
          if (word) {
            if (error) {
              throw 'invalid token `' + word + '`';
            }

            result_tokens.push(word);
            result_types.push(-1);
            result_lines.push(line);
            word = '';
          }

          code = code.substring(1);
          i += 1;
          continue __l0;
        }

        for (var j in tokenDefs) {
          token = this._match(code, tokenDefs[j]);

          if (token) {
            if (word) {
              if (error) {
                throw 'invalid token `' + word + '`';
              }

              result_tokens.push(word);
              result_types.push(-1);
              result_lines.push(line);
              word = '';
            }

            result_tokens.push(token);
            result_types.push(tokenTypes[j]);
            result_lines.push(line);
            code = code.substring(token.length);
            i += token.length;
            continue __l0;
          }
        }

        word += c;
        code = code.substring(1);
        i += 1;
      }

      if (word) {
        if (error) {
          throw 'invalid token `' + word + '`';
        }

        result_tokens.push(word);
        result_types.push(-1);
        result_lines.push(line);
      }

      return {
        tokens: result_tokens,
        types: result_types,
        lines: result_lines
      };
    },
    _match: function _match(s, stringOrRegExp) {
      var m;

      if (stringOrRegExp instanceof RegExp) {
        m = s.match(stringOrRegExp);
        return m !== null && this._checkNextChar(s, m[0]) ? m[0] : null;
      } else {
        m = s.indexOf(stringOrRegExp);
        return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
      }
    },
    _alnum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    _checkNextChar: function _checkNextChar(s, token) {
      var length = token.length;
      var charCode2 = s.charCodeAt(length - 0);
      var charCode1 = s.charCodeAt(length - 1);
      return isNaN(charCode2) || this._alnum[charCode2] === 0 || this._alnum[charCode1] === 0;
    }
  };
  amiTwig.expr = {};
  amiTwig.expr.tokens = {
    $init: function $init() {
      this.IS_XXX = [this.DEFINED, this.NULL, this.EMPTY, this.ITERABLE, this.EVEN, this.ODD];
      this.XXX_WITH = [this.STARTS_WITH, this.ENDS_WITH];
      this.PLUS_MINUS = [this.CONCAT, this.PLUS, this.MINUS];
      this.MUL_FLDIV_DIV_MOD = [this.MUL, this.FLDIV, this.DIV, this.MOD];
      this.RX = [this.RP, this.RB1];
    },
    LOGICAL_OR: 100,
    LOGICAL_AND: 101,
    BITWISE_OR: 102,
    BITWISE_XOR: 103,
    BITWISE_AND: 104,
    NOT: 105,
    IS: 106,
    DEFINED: 107,
    NULL: 108,
    EMPTY: 109,
    ITERABLE: 110,
    EVEN: 111,
    ODD: 112,
    CMP_OP: 113,
    STARTS_WITH: 114,
    ENDS_WITH: 115,
    MATCHES: 116,
    IN: 117,
    RANGE: 118,
    CONCAT: 119,
    PLUS: 120,
    MINUS: 121,
    POWER: 122,
    MUL: 123,
    FLDIV: 124,
    DIV: 125,
    MOD: 126,
    DOUBLE_QUESTION: 127,
    QUESTION: 128,
    COLON: 129,
    DOT: 130,
    COMMA: 131,
    PIPE: 132,
    LP: 133,
    RP: 134,
    LB1: 135,
    RB1: 136,
    LB2: 137,
    RB2: 138,
    SID: 139,
    TERMINAL: 140,
    LST: 200,
    DIC: 201,
    FUN: 202,
    VAR: 203
  };
  amiTwig.expr.tokens.$init();

  amiTwig.expr.Tokenizer = function (code, line) {
    this._spaces = [' ', '\t', '\n', '\r'];
    this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', '??', '?', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];
    this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.DOUBLE_QUESTION, amiTwig.expr.tokens.QUESTION, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];

    this.$init = function (code, line) {
      var result = amiTwig.tokenizer.tokenize(code, line, this._spaces, this._tokenDefs, this._tokenTypes, true);
      this.tokens = result.tokens;
      this.types = result.types;
      this.i = 0;
    };

    this.next = function (n) {
      if (n === void 0) {
        n = 1;
      }

      this.i += n;
    };

    this.isEmpty = function () {
      return this.i >= this.tokens.length;
    };

    this.peekToken = function () {
      return this.tokens[this.i];
    };

    this.peekType = function () {
      return this.types[this.i];
    };

    this.checkType = function (type) {
      if (this.i < this.tokens.length) {
        var TYPE = this.types[this.i];
        return type instanceof Array ? type.indexOf(TYPE) >= 0 : type === TYPE;
      }

      return false;
    };

    this.$init(code, line);
  };

  amiTwig.expr.Compiler = function (code, line) {
    this.$init(code, line);
  };

  amiTwig.expr.Compiler.prototype = {
    $init: function $init(code, line) {
      this.tokenizer = new amiTwig.expr.Tokenizer(this.code = code, this.line = line);
      this.rootNode = this.parseNullCoalescing();

      if (this.tokenizer.isEmpty() === false) {
        throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
      }
    },
    dump: function dump() {
      return this.rootNode.dump();
    },
    parseNullCoalescing: function parseNullCoalescing() {
      var left = this.parseLogicalOr(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.DOUBLE_QUESTION)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseLogicalOr();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseLogicalOr: function parseLogicalOr() {
      var left = this.parseLogicalAnd(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseLogicalAnd();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseLogicalAnd: function parseLogicalAnd() {
      var left = this.parseBitwiseOr(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseOr();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseBitwiseOr: function parseBitwiseOr() {
      var left = this.parseBitwiseXor(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseXor();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseBitwiseXor: function parseBitwiseXor() {
      var left = this.parseBitwiseAnd(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseAnd();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseBitwiseAnd: function parseBitwiseAnd() {
      var left = this.parseNot(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseNot();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseNot: function parseNot() {
      var right, node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseComp();
        node.nodeLeft = null;
        node.nodeRight = right;
        return node;
      }

      return this.parseComp();
    },
    parseComp: function parseComp() {
      var left = this.parseAddSub(),
          right,
          node,
          swap;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.IS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        swap = node;

        if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
          node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();
          node.nodeLeft = null;
          node.nodeRight = swap;
        }

        if (this.tokenizer.checkType(amiTwig.expr.tokens.IS_XXX)) {
          right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();
          swap.nodeLeft = left;
          swap.nodeRight = right;
        } else {
          throw 'syntax error, line `' + this.line + '`, keyword `defined`, `null`, `empty`, `iterable`, `even` or `odd` expected';
        }

        left = node;
      } else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      } else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      } else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      } else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseAddSub: function parseAddSub() {
      var left = this.parseMulDiv(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseMulDiv();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseMulDiv: function parseMulDiv() {
      var left = this.parsePlusMinus(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parsePlusMinus();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parsePlusMinus: function parsePlusMinus() {
      var right, node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parsePower();
        node.nodeLeft = null;
        node.nodeRight = right;
        return node;
      }

      return this.parsePower();
    },
    parsePower: function parsePower() {
      var left = this.parseFilter(),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseFilter();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseFilter: function parseFilter() {
      var left = this.parseDot1(),
          node,
          temp;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.PIPE)) {
        this.tokenizer.next();
        node = this.parseDot1(true);

        for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
          ;
        }

        temp.list.unshift(left);
        left = node;
      }

      return left;
    },
    parseDot1: function parseDot1(isFilter) {
      var node = this.parseDot2(isFilter);

      if (node) {
        var temp = node;

        for (; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
          ;
        }

        if (temp.q) {
          if (temp.nodeType === amiTwig.expr.tokens.FUN) {
            if (temp.nodeValue in amiTwig.stdlib) {
              temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
            } else {
              temp.nodeValue = '_.' + temp.nodeValue;
            }
          } else if (temp.nodeType === amiTwig.expr.tokens.VAR) {
            temp.nodeValue = '_.' + temp.nodeValue;
          }

          temp.q = false;
        }
      }

      return node;
    },
    parseDot2: function parseDot2(isFilter) {
      var left = this.parseDot3(isFilter),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.DOT)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
        this.tokenizer.next();
        right = this.parseDot3(isFilter);
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      return left;
    },
    parseDot3: function parseDot3(isFilter) {
      var left = this.parseX(isFilter),
          right,
          node;

      while (this.tokenizer.checkType(amiTwig.expr.tokens.LB1)) {
        this.tokenizer.next();
        right = this.parseNullCoalescing();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RB1)) {
          this.tokenizer.next();
          node = new amiTwig.expr.Node(amiTwig.expr.tokens.DOT, '[]');
          node.nodeLeft = left;
          node.nodeRight = right;
          left = node;
        } else {
          throw 'syntax error, line `' + this.line + '`, `]` expected';
        }
      }

      return left;
    },
    parseX: function parseX(isFilter) {
      var node;

      if (node = this.parseGroup()) {
        return node;
      }

      if (node = this.parseArray()) {
        return node;
      }

      if (node = this.parseObject()) {
        return node;
      }

      if (node = this.parseFunVar(isFilter)) {
        return node;
      }

      if (node = this.parseTerminal()) {
        return node;
      }

      throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';
    },
    parseGroup: function parseGroup() {
      var node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
        this.tokenizer.next();
        node = this.parseNullCoalescing();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
          this.tokenizer.next();
          return node;
        } else {
          throw 'syntax error, line `' + this.line + '`, `)` expected';
        }
      }

      return null;
    },
    parseArray: function parseArray() {
      var node, list;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.LB1)) {
        this.tokenizer.next();
        list = this._parseSinglets();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RB1)) {
          this.tokenizer.next();
          node = new amiTwig.expr.Node(amiTwig.expr.tokens.LST, 'Array');
          node.list = list;
          return node;
        } else {
          throw 'syntax error, line `' + this.line + '`, `]` expected';
        }
      }

      return null;
    },
    parseObject: function parseObject() {
      var node, dict;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.LB2)) {
        this.tokenizer.next();
        dict = this._parseDoublets();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RB2)) {
          this.tokenizer.next();
          node = new amiTwig.expr.Node(amiTwig.expr.tokens.DIC, 'Object');
          node.dict = dict;
          return node;
        } else {
          throw 'syntax error, line `' + this.line + '`, `}` expected';
        }
      }

      return null;
    },
    parseFunVar: function parseFunVar(isFilter) {
      var node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.SID)) {
        node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());
        node.q = true;
        this.tokenizer.next();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
          this.tokenizer.next();
          node.list = this._parseSinglets();

          if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
            this.tokenizer.next();
            node.nodeType = amiTwig.expr.tokens.FUN;
          } else {
            throw 'syntax error, line `' + this.line + '`, `)` expected';
          }
        } else {
          node.nodeType = isFilter ? amiTwig.expr.tokens.FUN : amiTwig.expr.tokens.VAR;
          node.list = [];
        }

        return node;
      }

      return null;
    },
    _parseSinglets: function _parseSinglets() {
      var result = [];

      while (this.tokenizer.checkType(amiTwig.expr.tokens.RX) === false) {
        this._parseSinglet(result);

        if (this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true) {
          this.tokenizer.next();
        } else {
          break;
        }
      }

      return result;
    },
    _parseDoublets: function _parseDoublets() {
      var result = {};

      while (this.tokenizer.checkType(amiTwig.expr.tokens.RB2) === false) {
        this._parseDoublet(result);

        if (this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true) {
          this.tokenizer.next();
        } else {
          break;
        }
      }

      return result;
    },
    _parseSinglet: function _parseSinglet(result) {
      result.push(this.parseNullCoalescing());
    },
    _parseDoublet: function _parseDoublet(result) {
      if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
        var key = this.tokenizer.peekToken();
        this.tokenizer.next();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
          this.tokenizer.next();
          result[key] = this.parseNullCoalescing();
        } else {
          throw 'syntax error, line `' + this.line + '`, `:` expected';
        }
      } else {
        throw 'syntax error, line `' + this.line + '`, terminal expected';
      }
    },
    parseTerminal: function parseTerminal() {
      var left, right, node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
        left = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.RANGE)) {
          node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
          this.tokenizer.next();

          if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
            right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
            this.tokenizer.next();
            node.nodeLeft = left;
            node.nodeRight = right;
            return node;
          }
        } else {
          return left;
        }
      }

      return null;
    }
  };

  amiTwig.expr.Node = function (nodeType, nodeValue) {
    this.$init(nodeType, nodeValue);
  };

  amiTwig.expr.Node.prototype = {
    $init: function $init(nodeType, nodeValue) {
      this.nodeType = nodeType;
      this.nodeValue = nodeValue;
      this.nodeLeft = null;
      this.nodeRight = null;
      this.list = null;
      this.dict = null;
    },
    _dump: function _dump(nodes, edges, pCnt) {
      var CNT;
      var cnt = pCnt[0];
      nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

      if (this.nodeLeft) {
        CNT = ++pCnt[0];
        edges.push('\tnode' + cnt + ' -> node' + CNT + ';');

        this.nodeLeft._dump(nodes, edges, pCnt);
      }

      if (this.nodeRight) {
        CNT = ++pCnt[0];
        edges.push('\tnode' + cnt + ' -> node' + CNT + ';');

        this.nodeRight._dump(nodes, edges, pCnt);
      }

      if (this.list) {
        for (var i in this.list) {
          CNT = ++pCnt[0];
          edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');

          this.list[i]._dump(nodes, edges, pCnt);
        }
      }

      if (this.dict) {
        for (var _i in this.dict) {
          CNT = ++pCnt[0];
          edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + _i.replace(/"/g, '\\"') + ']"];');

          this.dict[_i]._dump(nodes, edges, pCnt);
        }
      }
    },
    dump: function dump() {
      var nodes = [];
      var edges = [];

      this._dump(nodes, edges, [0]);

      return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
    }
  };
  amiTwig.tmpl = {};

  amiTwig.tmpl.Compiler = function (tmpl) {
    this.$init(tmpl);
  };

  amiTwig.tmpl.Compiler.prototype = {
    STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%\}/,
    COMMENT_RE: /\{#\s*((?:.|\n)*?)\s*#\}/g,
    _count: function _count(s) {
      var result = 0;
      var l = s.length;

      for (var i = 0; i < l; i++) {
        if (s[i] === '\n') result++;
      }

      return result;
    },
    $init: function $init(tmpl) {
      var line = 1;
      var column;
      var COLUMN;
      this.rootNode = {
        line: line,
        keyword: '@root',
        expression: '',
        blocks: [{
          expression: '@true',
          list: []
        }],
        value: ''
      };
      var stack1 = [this.rootNode];
      var stack2 = [0x00000000000];
      var item;

      for (tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN)) {
        var curr = stack1[stack1.length - 1];
        var indx = stack2[stack2.length - 1];
        var m = tmpl.match(this.STATEMENT_RE);

        if (m === null) {
          line += this._count(tmpl);
          curr.blocks[indx].list.push({
            line: line,
            keyword: '@text',
            expression: '',
            blocks: [],
            value: tmpl
          });
          var errors = [];

          for (var i = stack1.length - 1; i > 0; i--) {
            if (stack1[i].keyword === 'if') {
              errors.push('missing keyword `endif`');
            } else if (stack1[i].keyword === 'for') {
              errors.push('missing keyword `endfor`');
            }
          }

          if (errors.length > 0) {
            throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
          }

          break;
        }

        var match = m[0];
        var keyword = m[1];
        var expression = m[2];
        column = m.index + 0x0000000000;
        COLUMN = m.index + match.length;
        var value = tmpl.substr(0, column);
        var VALUE = tmpl.substr(0, COLUMN);
        line += this._count(VALUE);

        if (value) {
          item = {
            line: line,
            keyword: '@text',
            expression: '',
            blocks: [],
            value: value
          };
          curr.blocks[indx].list.push(item);
        }

        switch (keyword) {
          case 'flush':
          case 'autoescape':
          case 'spaceless':
          case 'verbatim':
            break;

          case 'do':
          case 'set':
          case 'include':
            item = {
              line: line,
              keyword: keyword,
              expression: expression,
              blocks: [],
              value: ''
            };
            curr.blocks[indx].list.push(item);
            break;

          case 'if':
          case 'for':
            item = {
              line: line,
              keyword: keyword,
              blocks: [{
                expression: expression,
                list: []
              }],
              value: ''
            };
            curr.blocks[indx].list.push(item);
            stack1.push(item);
            stack2.push(0x00);
            break;

          case 'elseif':
            if (curr['keyword'] !== 'if') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `elseif`';
            }

            indx = curr.blocks.length;
            curr.blocks.push({
              expression: expression,
              list: []
            });
            stack2[stack2.length - 1] = indx;
            break;

          case 'else':
            if (curr['keyword'] !== 'if' && curr['keyword'] !== 'for') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
            }

            indx = curr.blocks.length;
            curr.blocks.push({
              expression: '@true',
              list: []
            });
            stack2[stack2.length - 1] = indx;
            break;

          case 'endif':
            if (curr['keyword'] !== 'if') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
            }

            stack1.pop();
            stack2.pop();
            break;

          case 'endfor':
            if (curr['keyword'] !== 'for') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
            }

            stack1.pop();
            stack2.pop();
            break;

          default:
            throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';
        }
      }
    },
    dump: function dump() {
      return JSON.stringify(this.rootNode, null, 2);
    }
  };
  amiTwig.engine = {
    VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,
    _render: function _render(result, item, dict, tmpls) {
      var _this = this;

      if (dict === void 0) {
        dict = {};
      }

      if (tmpls === void 0) {
        tmpls = {};
      }

      var m;
      var expression;
      this.dict = dict;
      this.tmpls = tmpls;

      switch (item.keyword) {
        case 'do':
          {
            amiTwig.expr.cache.eval(item.expression, item.line, dict);
            break;
          }

        case 'set':
          {
            m = item.expression.match(/((?:[a-zA-Z_$][a-zA-Z0-9_$]*\.)*[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

            if (!m) {
              throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
            }

            var parts = m[1].split('.'),
                l = parts.length - 1;
            var parent, j;

            if (parts[0] === 'window' || parts[0] === 'global') {
              if (typeof window !== 'undefined') {
                parent = window;
              } else if (typeof global !== 'undefined') {
                parent = global;
              } else {
                throw 'internal error';
              }

              j = 1;
            } else {
              parent = dict;
              j = 0;
            }

            for (var i = j; i < l; i++) {
              if (parent[parts[i]]) {
                parent = parent[parts[i]];
              } else {
                throw 'runtime error, line `' + item.line + '`, `' + m[1] + '` not declared';
              }
            }

            parent[parts[i]] = amiTwig.expr.cache.eval(m[2], item.line, dict);
            break;
          }

        case '@text':
          {
            result.push(item.value.replace(this.VARIABLE_RE, function (match, expression) {
              var value = amiTwig.expr.cache.eval(expression, item.line, dict);
              return value !== null && value !== undefined ? value : '';
            }));
            break;
          }

        case 'if':
        case '@root':
          {
            item.blocks.every(function (block) {
              expression = block.expression;

              if (expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict)) {
                for (var _i2 in block.list) {
                  _this._render(result, block.list[_i2], dict, tmpls);
                }

                return false;
              }

              return true;
            });
            break;
          }

        case 'for':
          {
            var sym1;
            var sym2;
            var expr;
            m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

            if (!m) {
              m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

              if (!m) {
                throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
              } else {
                sym1 = m[1];
                sym2 = null;
                expr = m[2];
              }
            } else {
              sym1 = m[1];
              sym2 = m[2];
              expr = m[3];
            }

            var origValue = amiTwig.expr.cache.eval(expr, item.line, dict);
            var typeName = Object.prototype.toString.call(origValue);
            var iterValue;

            if (typeName === '[object Object]') {
              iterValue = sym2 ? Object.entries(origValue) : Object.keys(origValue);
            } else {
              iterValue = origValue;

              if (typeName !== '[object Array]' && typeName !== '[object String]') {
                throw 'syntax error, line `' + item.line + '`, right operande not iterable';
              }

              if (sym2) {
                throw 'syntax error, line `' + item.line + '`, right operande not an object';
              }
            }

            var _l = iterValue.length;

            if (_l > 0) {
              var k = 0x00000000000000;
              var list = item.blocks[0].list;

              if (sym2) {
                var old1 = dict[sym1];
                var old2 = dict[sym2];
                var old3 = dict['loop'];
                dict.loop = {
                  length: _l,
                  parent: dict['loop']
                };

                for (var _iterator = _createForOfIteratorHelperLoose(iterValue), _step; !(_step = _iterator()).done;) {
                  var _step$value = _step.value,
                      key = _step$value[0],
                      val = _step$value[1];
                  dict[sym1] = key;
                  dict[sym2] = val;
                  dict.loop.first = k === 0 - 0;
                  dict.loop.last = k === _l - 1;
                  dict.loop.revindex0 = _l - k;
                  dict.loop.index0 = k;
                  k++;
                  dict.loop.revindex = _l - k;
                  dict.loop.index = k;

                  for (var _j in list) {
                    this._render(result, list[_j], dict, tmpls);
                  }
                }

                dict['loop'] = old3;
                dict[sym2] = old2;
                dict[sym1] = old1;
              } else {
                var _old = dict[sym1];
                var _old2 = dict['loop'];
                dict.loop = {
                  length: _l,
                  parent: dict['loop']
                };

                for (var _iterator2 = _createForOfIteratorHelperLoose(iterValue), _step2; !(_step2 = _iterator2()).done;) {
                  var _val = _step2.value;
                  dict[sym1] = _val;
                  dict.loop.first = k === 0 - 0;
                  dict.loop.last = k === _l - 1;
                  dict.loop.revindex0 = _l - k;
                  dict.loop.index0 = k;
                  k++;
                  dict.loop.revindex = _l - k;
                  dict.loop.index = k;

                  for (var _j2 in list) {
                    this._render(result, list[_j2], dict, tmpls);
                  }
                }

                dict['loop'] = _old2;
                dict[sym1] = _old;
              }
            } else {
              if (item.blocks.length > 1) {
                var _list = item.blocks[1].list;

                for (var _j3 in _list) {
                  this._render(result, _list[_j3], dict, tmpls);
                }
              }
            }

            break;
          }

        case 'include':
          {
            var m_1_ = item.expression,
                with_subexpr,
                with_context;

            if (m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)) {
              expression = m[1];
              with_subexpr = m[2];
              with_context = false;
            } else if (m = m_1_.match(/(.+)\s+with\s+(.+)$/)) {
              expression = m[1];
              with_subexpr = m[2];
              with_context = true;
            } else if (m = m_1_.match(/(.+)\s+only$/)) {
              expression = m[1];
              with_subexpr = '{}';
              with_context = false;
            } else {
              expression = m_1_;
              with_subexpr = '{}';
              with_context = true;
            }

            var fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

            if (Object.prototype.toString.call(fileName) !== '[object String]') {
              throw 'runtime error, line `' + item.line + '`, string expected';
            }

            var variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

            if (Object.prototype.toString.call(variables) !== '[object Object]') {
              throw 'runtime error, line `' + item.line + '`, object expected';
            }

            result.push(amiTwig.stdlib.include(fileName, variables, with_context, false));
            break;
          }
      }
    },
    render: function render(tmpl, dict, tmpls) {
      if (dict === void 0) {
        dict = {};
      }

      if (tmpls === void 0) {
        tmpls = {};
      }

      var result = [];

      switch (Object.prototype.toString.call(tmpl)) {
        case '[object String]':
          this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict, tmpls);

          break;

        case '[object Object]':
          this._render(result, tmpl, dict, tmpls);

          break;
      }

      return result.join('');
    }
  };
  amiTwig.expr.cache = {
    dict: {},
    eval: function _eval(expression, line, _) {
      var f;

      if (expression in this.dict) {
        f = this.dict[expression];
      } else {
        f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler(expression, line)));
      }

      if (!_) _ = {};
      return f.call(_, _);
    }
  };
  amiTwig.stdlib = {
    'isUndefined': function isUndefined(x) {
      return x === undefined;
    },
    'isDefined': function isDefined(x) {
      return x !== undefined;
    },
    'isNull': function isNull(x) {
      return x === null;
    },
    'isNotNull': function isNotNull(x) {
      return x !== null;
    },
    'isEmpty': function isEmpty(x) {
      if (x === null || x === false || x === '') {
        return true;
      }

      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object Array]' && x.length === 0 || typeName === '[object Object]' && Object.keys(x).length === 0;
    },
    'isNumber': function isNumber(x) {
      return Object.prototype.toString.call(x) === '[object Number]';
    },
    'isString': function isString(x) {
      return Object.prototype.toString.call(x) === '[object String]';
    },
    'isArray': function isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },
    'isObject': function isObject(x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },
    'isIterable': function isIterable(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]';
    },
    'isEven': function isEven(x) {
      return this.isNumber(x) && (x & 1) === 0;
    },
    'isOdd': function isOdd(x) {
      return this.isNumber(x) && (x & 1) === 1;
    },
    'isInObject': function isInObject(x, y) {
      if (this.isArray(y) || this.isString(y)) {
        return y.indexOf(x) >= 0;
      }

      if (this.isObject(y)) {
        return x in y;
      }

      return false;
    },
    'isInRange': function isInRange(x, x1, x2) {
      if (this.isNumber(x1) && this.isNumber(x2)) {
        return x >= x1 && x <= x2;
      }

      if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
        return x.charCodeAt(0) >= x1.charCodeAt(0) && x.charCodeAt(0) <= x2.charCodeAt(0);
      }

      return false;
    },
    'range': function range(x1, x2, step) {
      if (step === void 0) {
        step = 1;
      }

      var result = [];

      if (this.isNumber(x1) && this.isNumber(x2)) {
        for (var i = x1; i <= x2; i += step) {
          result.push(i);
        }
      } else if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
        for (var _i3 = x1.charCodeAt(0); _i3 <= x2.charCodeAt(0); _i3 += step) {
          result.push(String.fromCharCode(_i3));
        }
      }

      return result;
    },
    'filter_length': function filter_length(x) {
      if (this.isString(x) || this.isArray(x)) {
        return x.length;
      }

      if (this.isObject(x)) {
        return Object.keys(x).length;
      }

      return 0;
    },
    'filter_first': function filter_first(x) {
      return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
    },
    'filter_last': function filter_last(x) {
      return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
    },
    'filter_slice': function filter_slice(x, idx1, idx2) {
      return this.isString(x) || this.isArray(x) ? x.slice(idx1, idx2) : null;
    },
    'filter_merge': function filter_merge() {
      if (arguments.length > 1) {
        if (this.isString(arguments[0])) {
          var L = [];

          for (var i in arguments) {
            var item = arguments[i];

            if (!this.isString(item)) {
              return null;
            }

            L.push(arguments[i]);
          }

          return L.join('');
        }

        if (this.isArray(arguments[0])) {
          var _L = [];

          for (var _i4 in arguments) {
            var _item = arguments[_i4];

            if (!this.isArray(_item)) {
              return null;
            }

            for (var j in _item) {
              _L.push(_item[j]);
            }
          }

          return _L;
        }

        if (this.isObject(arguments[0])) {
          var D = {};

          for (var _i5 in arguments) {
            var _item2 = arguments[_i5];

            if (!this.isObject(_item2)) {
              return null;
            }

            for (var _j4 in _item2) {
              D[_j4] = _item2[_j4];
            }
          }

          return D;
        }
      }

      return null;
    },
    'filter_sort': function filter_sort(x) {
      return this.isArray(x) ? x.sort() : [];
    },
    'filter_reverse': function filter_reverse(x) {
      return this.isArray(x) ? x.reverse() : [];
    },
    'filter_join': function filter_join(x, sep) {
      return this.isArray(x) ? x.join(sep) : '';
    },
    'filter_keys': function filter_keys(x) {
      return this.isObject(x) ? Object.keys(x) : [];
    },
    'filter_column': function filter_column(x, key) {
      return this.isArray(x) ? x.map(function (val) {
        return val[key];
      }) : [];
    },
    'filter_batch': function filter_batch(x, n, missing) {
      if (missing === void 0) {
        missing = '';
      }

      var result = [];

      if (this.isArray(x) && this.isNumber(n)) {
        var l = x.length;

        if (l > 0) {
          var last;
          var m = Math.ceil(l / n) * n;

          for (var i = 0; i < l; i += n) {
            result.push(last = x.slice(i, i + n));
          }

          for (var _i6 = l; _i6 < m; _i6 += 1) {
            last.push(missing);
          }
        }
      }

      return result;
    },
    'startsWith': function startsWith(s1, s2) {
      if (this.isString(s1) && this.isString(s2)) {
        var base = 0x0000000000000000000;
        return s1.indexOf(s2, base) === base;
      }

      return false;
    },
    'endsWith': function endsWith(s1, s2) {
      if (this.isString(s1) && this.isString(s2)) {
        var base = s1.length - s2.length;
        return s1.indexOf(s2, base) === base;
      }

      return false;
    },
    'match': function match(s, regex) {
      if (this.isString(s) && this.isString(regex)) {
        var idx1 = regex.indexOf('/');
        var idx2 = regex.lastIndexOf('/');

        if (idx1 === 0 || idx1 < idx2) {
          try {
            return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
          } catch (err) {}
        }
      }

      return false;
    },
    'filter_default': function filter_default(s1, s2) {
      return s1 || s2 || '';
    },
    'filter_lower': function filter_lower(s) {
      return this.isString(s) ? s.toLowerCase() : '';
    },
    'filter_upper': function filter_upper(s) {
      return this.isString(s) ? s.toUpperCase() : '';
    },
    'filter_capitalize': function filter_capitalize(s) {
      if (this.isString(s)) {
        return s.trim().toLowerCase().replace(/^\S/g, function (c) {
          return c.toUpperCase();
        });
      }

      return '';
    },
    'filter_title': function filter_title(s) {
      if (this.isString(s)) {
        return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function (c) {
          return c.toUpperCase();
        });
      }

      return '';
    },
    'filter_trim': function filter_trim(s) {
      return this.isString(s) ? s.trim() : '';
    },
    '_replace': function _replace(s, oldStrs, newStrs) {
      var result = [];
      var l = s.length;
      var m = oldStrs.length;
      var n = newStrs.length;

      if (m != n) {
        throw 'internal error';
      }

      __l0: for (var i = 0; i < l; i += 0) {
        var p = s.substring(i);

        for (var j = 0; j < m; j += 1) {
          if (p.indexOf(oldStrs[j]) === 0) {
            result.push(newStrs[j]);
            i += oldStrs[j].length;
            continue __l0;
          }
        }

        result.push(s.charAt(i++));
      }

      return result.join('');
    },
    '_textToHtmlX': ['&', '"', '<', '>'],
    '_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],
    '_textToStringX': ['\\', '\n', '"', '\''],
    '_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],
    '_textToJsonStringX': ['\\', '\n', '"'],
    '_textToJsonStringY': ['\\\\', '\\n', '\\"'],
    'filter_escape': function filter_escape(s, mode) {
      if (this.isString(s)) {
        switch (mode || 'html') {
          case 'html':
          case 'html_attr':
            return this._replace(s, this._textToHtmlX, this._textToHtmlY);

          case 'js':
          case 'string':
            return this._replace(s, this._textToStringX, this._textToStringY);

          case 'json':
            return this._replace(s, this._textToJsonStringX, this._textToJsonStringY);

          case 'url':
            return encodeURIComponent(s);

          default:
            return s;
        }
      }

      return '';
    },
    'filter_url_encode': function filter_url_encode(s) {
      return this.isString(s) ? encodeURIComponent(s) : '';
    },
    'filter_nl2br': function filter_nl2br(s) {
      return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
    },
    'filter_raw': function filter_raw(s) {
      return this.isString(s) ? s : '';
    },
    'filter_replace': function filter_replace(s, dict) {
      return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict)) : '';
    },
    'filter_split': function filter_split(s, sep, max) {
      return this.isString(s) ? s.split(sep, max) : [];
    },
    'filter_abs': function filter_abs(x) {
      return Math.abs(x);
    },
    'filter_round': function filter_round(x, mode) {
      switch (mode) {
        case 'ceil':
          return Math.ceil(x);

        case 'floor':
          return Math.floor(x);

        default:
          return Math.round(x);
      }
    },
    'min': function min() {
      var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
      var result = Number.POSITIVE_INFINITY;

      for (var i in args) {
        if (!this.isNumber(args[i])) {
          return Number.NaN;
        }

        if (result > args[i]) {
          result = args[i];
        }
      }

      return result;
    },
    'max': function max() {
      var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
      var result = Number.NEGATIVE_INFINITY;

      for (var i in args) {
        if (!this.isNumber(args[i])) {
          return Number.NaN;
        }

        if (result < args[i]) {
          result = args[i];
        }
      }

      return result;
    },
    'random': function random(x) {
      var y = Math.random();

      if (x) {
        if (this.isArray(x) || this.isObject(x)) {
          var X = Object.keys(x);
          return x[X[Math.floor(X.length * y)]];
        }

        if (this.isString(x)) {
          return x[Math.floor(x.length * y)];
        }

        if (this.isNumber(x)) {
          return Math.floor(x * y);
        }
      }

      x = Number.MAX_SAFE_INTEGER;
      return Math.floor(x * y);
    },
    'filter_json_encode': function filter_json_encode(x, indent) {
      return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
    },
    'filter_json_jspath': function filter_json_jspath(x, path) {
      return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
    },
    'include': function include(fileName, variables, withContext, ignoreMissing) {
      if (variables === void 0) {
        variables = {};
      }

      if (withContext === void 0) {
        withContext = true;
      }

      if (ignoreMissing === void 0) {
        ignoreMissing = false;
      }

      if (fileName in amiTwig.engine.tmpls) {
        var temp = {};

        if (withContext) {
          for (var i in amiTwig.engine.dict) {
            temp[i] = amiTwig.engine.dict[i];
          }
        }

        if (variables) {
          for (var _i7 in variables) {
            temp[_i7] = variables[_i7];
          }
        }

        return amiTwig.engine.render(amiTwig.engine.tmpls[fileName], temp);
      }

      if (!ignoreMissing) {
        throw 'runtime error, could not open `' + fileName + '`';
      }

      return '';
    }
  };
  amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;
  amiTwig.expr.interpreter = {
    _getJS: function _getJS(node) {
      var L;
      var x;
      var left;
      var right;
      var operator;

      switch (node.nodeType) {
        case amiTwig.expr.tokens.LST:
          L = [];

          for (var i in node.list) {
            L.push(this._getJS(node.list[i]));
          }

          return '[' + L.join(',') + ']';

        case amiTwig.expr.tokens.DIC:
          L = [];

          for (var _i8 in node.dict) {
            L.push(_i8 + ':' + this._getJS(node.dict[_i8]));
          }

          return '{' + L.join(',') + '}';

        case amiTwig.expr.tokens.FUN:
          L = [];

          for (var _i9 in node.list) {
            L.push(this._getJS(node.list[_i9]));
          }

          return node.nodeValue + '(' + L.join(',') + ')';

        case amiTwig.expr.tokens.VAR:
          L = [];

          for (var _i10 in node.list) {
            L.push('[' + this._getJS(node.list[_i10]) + ']');
          }

          return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

        case amiTwig.expr.tokens.TERMINAL:
          return node.nodeValue;

        case amiTwig.expr.tokens.IS:
          left = this._getJS(node.nodeLeft);

          switch (node.nodeRight.nodeType) {
            case amiTwig.expr.tokens.DEFINED:
              return 'amiTwig.stdlib.isDefined(' + left + ')';

            case amiTwig.expr.tokens.NULL:
              return 'amiTwig.stdlib.isNull(' + left + ')';

            case amiTwig.expr.tokens.EMPTY:
              return 'amiTwig.stdlib.isEmpty(' + left + ')';

            case amiTwig.expr.tokens.ITERABLE:
              return 'amiTwig.stdlib.isIterable(' + left + ')';

            case amiTwig.expr.tokens.EVEN:
              return 'amiTwig.stdlib.isEven(' + left + ')';

            case amiTwig.expr.tokens.ODD:
              return 'amiTwig.stdlib.isOdd(' + left + ')';

            default:
              throw 'internal error';
          }

        case amiTwig.expr.tokens.IN:
          if (node.nodeRight.nodeType !== amiTwig.expr.tokens.RANGE) {
            left = this._getJS(node.nodeLeft);
            right = this._getJS(node.nodeRight);
            return 'amiTwig.stdlib.isInObject(' + left + ',' + right + ')';
          } else {
            x = this._getJS(node.nodeLeft);
            left = node.nodeRight.nodeLeft.nodeValue;
            right = node.nodeRight.nodeRight.nodeValue;
            return 'amiTwig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
          }

        case amiTwig.expr.tokens.STARTS_WITH:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

        case amiTwig.expr.tokens.ENDS_WITH:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

        case amiTwig.expr.tokens.MATCHES:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

        case amiTwig.expr.tokens.RANGE:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

        case amiTwig.expr.tokens.DOT:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);

          if (node.nodeValue[0] === '.') {
            return left + '.' + right;
          } else {
            return left + '[' + right + ']';
          }

        case amiTwig.expr.tokens.FLDIV:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'Math.floor(' + left + '/' + right + ')';

        case amiTwig.expr.tokens.POWER:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'Math.pow(' + left + ',' + right + ')';

        case amiTwig.expr.tokens.DOUBLE_QUESTION:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return '((' + left + ') || (' + right + '))';

        default:
          if (node.nodeLeft === null && node.nodeRight !== null) {
            operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
            return operator + '(' + this._getJS(node.nodeRight) + ')';
          }

          if (node.nodeLeft !== null && node.nodeRight === null) {
            operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
            return '(' + this._getJS(node.nodeLeft) + ')' + operator;
          }

          if (node.nodeLeft !== null && node.nodeRight !== null) {
            switch (node.nodeType) {
              case amiTwig.expr.tokens.LOGICAL_OR:
                operator = '||';
                break;

              case amiTwig.expr.tokens.LOGICAL_AND:
                operator = '&&';
                break;

              case amiTwig.expr.tokens.BITWISE_OR:
                operator = '|';
                break;

              case amiTwig.expr.tokens.BITWISE_XOR:
                operator = '^';
                break;

              case amiTwig.expr.tokens.BITWISE_AND:
                operator = '&';
                break;

              case amiTwig.expr.tokens.CONCAT:
                operator = '+';
                break;

              default:
                operator = node.nodeValue;
                break;
            }

            left = this._getJS(node.nodeLeft);
            right = this._getJS(node.nodeRight);
            return '(' + left + operator + right + ')';
          }

      }
    },
    getJS: function getJS(expr) {
      return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
    },
    eval: function _eval(expr, _) {
      if (!_) _ = {};
      return eval(this.getJS(expr)).call(_, _);
    }
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsImNhY2hlIiwiZXZhbCIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJldmVyeSIsImJsb2NrIiwic3ltMSIsInN5bTIiLCJvcmlnVmFsdWUiLCJ0eXBlTmFtZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZXJWYWx1ZSIsImVudHJpZXMiLCJrZXlzIiwiayIsIm9sZDEiLCJvbGQyIiwib2xkMyIsImxvb3AiLCJ2YWwiLCJmaXJzdCIsImxhc3QiLCJyZXZpbmRleDAiLCJpbmRleDAiLCJyZXZpbmRleCIsIm1fMV8iLCJ3aXRoX3N1YmV4cHIiLCJ3aXRoX2NvbnRleHQiLCJmaWxlTmFtZSIsInZhcmlhYmxlcyIsImluY2x1ZGUiLCJyZW5kZXIiLCJfIiwiZiIsImludGVycHJldGVyIiwiZ2V0SlMiLCJ4IiwiaXNOdW1iZXIiLCJ5IiwiaXNBcnJheSIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJ4MSIsIngyIiwic3RlcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImlkeDEiLCJpZHgyIiwic2xpY2UiLCJhcmd1bWVudHMiLCJMIiwiRCIsInNvcnQiLCJyZXZlcnNlIiwic2VwIiwibWFwIiwibWlzc2luZyIsIk1hdGgiLCJjZWlsIiwiczEiLCJzMiIsImJhc2UiLCJyZWdleCIsImxhc3RJbmRleE9mIiwidGVzdCIsImVyciIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ0cmltIiwib2xkU3RycyIsIm5ld1N0cnMiLCJwIiwibW9kZSIsIl9yZXBsYWNlIiwiX3RleHRUb0h0bWxYIiwiX3RleHRUb0h0bWxZIiwiX3RleHRUb1N0cmluZ1giLCJfdGV4dFRvU3RyaW5nWSIsIl90ZXh0VG9Kc29uU3RyaW5nWCIsIl90ZXh0VG9Kc29uU3RyaW5nWSIsImVuY29kZVVSSUNvbXBvbmVudCIsInZhbHVlcyIsIm1heCIsImFicyIsImZsb29yIiwicm91bmQiLCJhcmdzIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJOYU4iLCJORUdBVElWRV9JTkZJTklUWSIsInJhbmRvbSIsIlgiLCJNQVhfU0FGRV9JTlRFR0VSIiwiaW5kZW50IiwicGF0aCIsIkpTUGF0aCIsImFwcGx5Iiwid2l0aENvbnRleHQiLCJpZ25vcmVNaXNzaW5nIiwiZmlsdGVyX2UiLCJmaWx0ZXJfZXNjYXBlIiwiX2dldEpTIiwib3BlcmF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLENBQUMsWUFBVztBQUNaO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBTUEsTUFBTUEsT0FBTyxHQUFHO0FBQ2ZDLElBQUFBLE9BQU8sRUFBRTtBQURNLEdBQWhCOztBQU1LLE1BQUcsT0FBT0MsTUFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPQSxNQUFNLENBQUNDLE9BQWQsS0FBMEIsUUFBM0QsRUFDTDtBQUNDRCxJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsT0FBZixHQUF5QkEsT0FBekI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPSSxNQUFQLEtBQWtCLFdBQXJCLEVBQ0w7QUFDQ0EsSUFBQUEsTUFBTSxDQUFDSixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBLEdBSEksTUFJQSxJQUFHLE9BQU9LLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDQSxJQUFBQSxNQUFNLENBQUNMLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0E7O0FBWURBLEVBQUFBLE9BQU8sQ0FBQ00sU0FBUixHQUFvQjtBQUduQkMsSUFBQUEsUUFBUSxFQUFFLGtCQUFTQyxJQUFULEVBQWVDLElBQWYsRUFBcUJDLE1BQXJCLEVBQTZCQyxTQUE3QixFQUF3Q0MsVUFBeEMsRUFBb0RDLEtBQXBELEVBQ1Y7QUFDQyxVQUFHRixTQUFTLENBQUNHLE1BQVYsS0FBcUJGLFVBQVUsQ0FB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eEIsR0FBZ0MsR0FBdkM7QUFDQTs7QUE1VEg7QUFrVUEsS0E3VXlCO0FBaVYxQmlILElBQUFBLEtBQUssRUFBRSxlQUFTMUwsSUFBVCxFQUNQO0FBQ0MsYUFBTywyQkFBMkIsS0FBSzhQLE1BQUwsQ0FBWTlQLElBQUksQ0FBQ29FLFFBQWpCLENBQTNCLEdBQXdELE1BQS9EO0FBQ0EsS0FwVnlCO0FBd1YxQmdGLElBQUFBLElBQUksRUFBRSxlQUFTcEosSUFBVCxFQUFldUwsQ0FBZixFQUNOO0FBQ0MsVUFBRyxDQUFDQSxDQUFKLEVBQU9BLENBQUMsR0FBRyxFQUFKO0FBRVAsYUFBT25DLElBQUksQ0FBQyxLQUFLc0MsS0FBTCxDQUFXMUwsSUFBWCxDQUFELENBQUosQ0FBdUJpSyxJQUF2QixDQUE0QnNCLENBQTVCLEVBQStCQSxDQUEvQixDQUFQO0FBQ0E7QUE3VnlCLEdBQTNCO0FBbVdDLENBOTlHRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQte3tZRUFSfX0gQ05SUyAvIExQU0NcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBhbWlUd2lnID0ge1xuXHR2ZXJzaW9uOiAnMS4yLjAnXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqLyBpZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5hbWlUd2lnID0gYW1pVHdpZztcbn1cbmVsc2UgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdHdpbmRvdy5hbWlUd2lnID0gYW1pVHdpZztcbn1cbmVsc2UgaWYodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGdsb2JhbC5hbWlUd2lnID0gYW1pVHdpZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFtaVR3aWc7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG9rZW5pemVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRva2VuaXplOiBmdW5jdGlvbihjb2RlLCBsaW5lLCBzcGFjZXMsIHRva2VuRGVmcywgdG9rZW5UeXBlcywgZXJyb3IpXG5cdHtcblx0XHRpZih0b2tlbkRlZnMubGVuZ3RoICE9PSB0b2tlblR5cGVzLmxlbmd0aClcblx0XHR7XG5cdFx0XHR0aHJvdyAnYHRva2VuRGVmcy5sZW5ndGggIT0gdG9rZW5UeXBlcy5sZW5ndGhgJztcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHRfdG9rZW5zID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X3R5cGVzID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X2xpbmVzID0gW107XG5cblx0XHRsZXQgaSA9IDB4MDAwMDAwMDAwO1xuXHRcdGNvbnN0IGwgPSBjb2RlLmxlbmd0aDtcblxuXHRcdGxldCB3b3JkID0gJycsIHRva2VuLCBjO1xuXG5fX2wwOlx0XHR3aGlsZShpIDwgbClcblx0XHR7XG5cdFx0XHRjID0gY29kZS5jaGFyQXQoMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoYyA9PT0gJ1xcbicpXG5cdFx0XHR7XG5cdFx0XHRcdGxpbmUrKztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihzcGFjZXMuaW5kZXhPZihjKSA+PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0XHRpICs9IDE7XG5cblx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IoY29uc3QgaiBpbiB0b2tlbkRlZnMpXG5cdFx0XHR7XG5cdFx0XHRcdHRva2VuID0gdGhpcy5fbWF0Y2goY29kZSwgdG9rZW5EZWZzW2pdKTtcblxuXHRcdFx0XHRpZih0b2tlbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHRva2VuKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCh0b2tlblR5cGVzW2pdKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblxuXHRcdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZyh0b2tlbi5sZW5ndGgpO1xuXHRcdFx0XHRcdGkgKz0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdvcmQgKz0gYztcblxuXHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0aSArPSAxO1xuXG4vKlx0XHRcdGNvbnRpbnVlIF9fbDA7XG4gKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9tYXRjaDogZnVuY3Rpb24ocywgc3RyaW5nT3JSZWdFeHApXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGlmKHN0cmluZ09yUmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdG0gPSBzLm1hdGNoKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gIT09IG51bGwgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCAvKi0qL21bMF0vKi0qLykgPyAvKi0qL21bMF0vKi0qLyA6IG51bGw7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRtID0gcy5pbmRleE9mKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gPT09IDB4MDAgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCBzdHJpbmdPclJlZ0V4cCkgPyBzdHJpbmdPclJlZ0V4cCA6IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2FsbnVtOiBbXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDEsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XSxcblxuXHRfY2hlY2tOZXh0Q2hhcjogZnVuY3Rpb24ocywgdG9rZW4pXG5cdHtcblx0XHRjb25zdCBsZW5ndGggPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRjb25zdCBjaGFyQ29kZTIgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMCk7XG5cdFx0Y29uc3QgY2hhckNvZGUxID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpO1xuXG5cdFx0cmV0dXJuIGlzTmFOKGNoYXJDb2RlMilcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUyXSA9PT0gMFxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTFdID09PSAwXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJFQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG4gXHRET1VCTEVfUVVFU1RJT046IDEyNyxcbiBcdFFVRVNUSU9OOiAxMjgsXG5cdENPTE9OOiAxMjksXG5cdERPVDogMTMwLFxuXHRDT01NQTogMTMxLFxuXHRQSVBFOiAxMzIsXG5cdExQOiAxMzMsXG5cdFJQOiAxMzQsXG5cdExCMTogMTM1LFxuXHRSQjE6IDEzNixcblx0TEIyOiAxMzcsXG5cdFJCMjogMTM4LFxuXHRTSUQ6IDEzOSxcblx0VEVSTUlOQUw6IDE0MCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWSVJUVUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlbkRlZnMgPSBbXG5cdFx0J29yJyxcblx0XHQnYW5kJyxcblx0XHQnYi1vcicsXG5cdFx0J2IteG9yJyxcblx0XHQnYi1hbmQnLFxuXHRcdCdub3QnLFxuXHRcdCdpcycsXG5cdFx0J2RlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnZW1wdHknLFxuXHRcdCdpdGVyYWJsZScsXG5cdFx0J2V2ZW4nLFxuXHRcdCdvZGQnLFxuXHRcdCc9PT0nLFxuXHRcdCc9PScsXG5cdFx0JyE9PScsXG5cdFx0JyE9Jyxcblx0XHQnPD0nLFxuXHRcdCc+PScsXG5cdFx0JzwnLFxuXHRcdCc+Jyxcblx0XHQvXnN0YXJ0c1xccyt3aXRoLyxcblx0XHQvXmVuZHNcXHMrd2l0aC8sXG5cdFx0J21hdGNoZXMnLFxuXHRcdCdpbicsXG5cdFx0Jy4uJyxcblx0XHQnficsXG5cdFx0JysnLFxuXHRcdCctJyxcblx0XHQnKionLFxuXHRcdCcqJyxcblx0XHQnLy8nLFxuXHRcdCcvJyxcblx0XHQnJScsXG5cdFx0Jz8/Jyxcblx0XHQnPycsXG5cdFx0JzonLFxuXHRcdCcuJyxcblx0XHQnLCcsXG5cdFx0J3wnLFxuXHRcdCcoJyxcblx0XHQnKScsXG5cdFx0J1snLFxuXHRcdCddJyxcblx0XHQneycsXG5cdFx0J30nLFxuXHRcdCd0cnVlJyxcblx0XHQnZmFsc2UnLFxuXHRcdC9eWzAtOV0rXFwuWzAtOV0rLyxcblx0XHQvXlswLTldKy8sXG5cdFx0L14nKFxcXFwnfFteJ10pKicvLFxuXHRcdC9eXCIoXFxcXFwifFteXCJdKSpcIi8sXG5cdFx0L15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSovLFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QSVBFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTFAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5zID0gcmVzdWx0LnRva2Vucztcblx0XHR0aGlzLnR5cGVzID0gcmVzdWx0LnR5cGVzO1xuXG5cdFx0dGhpcy5pID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pID49IHRoaXMudG9rZW5zLmxlbmd0aDtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSlcblx0e1xuXHRcdGlmKHRoaXMuaSA8IHRoaXMudG9rZW5zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRjb25zdCBUWVBFID0gdGhpcy50eXBlc1t0aGlzLmldO1xuXG5cdFx0XHRyZXR1cm4gKHR5cGUgaW5zdGFuY2VvZiBBcnJheSkgPyAodHlwZS5pbmRleE9mKFRZUEUpID49IDApIDogKHR5cGUgPT09IFRZUEUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5pc0VtcHR5KCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdW5leHBlY3RlZCB0b2tlbiBgJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpICsgJ2AnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTnVsbENvYWxlc2Npbmc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOdWxsQ29hbGVzY2luZyA6IExvZ2ljYWxPciAoJz8/JyBMb2dpY2FsT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbEFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZU9yIDogQml0d2lzZVhvciAoJ2Itb3InIEJpdHdpc2VYb3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VOb3QoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTm90KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE5vdCA6ICdub3QnIENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICB8IENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQ29tcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQWRkU3ViKCksIHJpZ2h0LCBub2RlLCBzd2FwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXHRcdFx0c3dhcCA9IG5vZGU7XG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gc3dhcDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVNfWFhYKSlcblx0XHRcdHtcblx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0c3dhcC5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdHN3YXAubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwga2V5d29yZCBgZGVmaW5lZGAsIGBudWxsYCwgYGVtcHR5YCwgYGl0ZXJhYmxlYCwgYGV2ZW5gIG9yIGBvZGRgIGV4cGVjdGVkJztcblx0XHRcdH1cblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5YWFhfV0lUSCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklOKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTXVsRGl2OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VQbHVzTWludXMoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1VTF9GTERJVl9ESVZfTU9EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBsdXNNaW51cyA6ICgnLScgfCAnKycpIFBvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICAgIHwgRG90MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUG93ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUZpbHRlcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQb3dlciA6IEZpbHRlciAoJyoqJyBGaWx0ZXIpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRmlsdGVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogRG90MSAoJ3wnIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MTogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRjb25zdCBub2RlID0gdGhpcy5wYXJzZURvdDIoaXNGaWx0ZXIpO1xuXG5cdFx0aWYobm9kZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDM6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlWChpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDMgOiBYICgnWycgTnVsbENvYWxlc2NpbmcgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgfCBYICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlWDogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlR3JvdXAoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUFycmF5KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VPYmplY3QoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUZ1blZhcihpc0ZpbHRlcikpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VUZXJtaW5hbCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHN5bnRheCBlcnJvciBvciB0dW5jYXRlZCBleHByZXNzaW9uJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdyb3VwIDogJygnIE51bGxDb2FsZXNjaW5nICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFycmF5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgbGlzdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuTFNULCAnQXJyYXknKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBsaXN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogT2JqZWN0IDogJ3snIERvdWJsZXRzICd9JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJYKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VTaW5nbGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGA6YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHRlcm1pbmFsIGV4cGVjdGVkJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKSB7XG5cblx0dGhpcy4kaW5pdChub2RlVHlwZSwgbm9kZVZhbHVlKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wOiBmdW5jdGlvbihub2RlcywgZWRnZXMsIHBDbnQpXG5cdHtcblx0XHRsZXQgQ05UO1xuXG5cdFx0Y29uc3QgY250ID0gcENudFswXTtcblxuXHRcdG5vZGVzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyBbbGFiZWw9XCInICsgdGhpcy5ub2RlVmFsdWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXTsnKTtcblxuXHRcdGlmKHRoaXMubm9kZUxlZnQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZUxlZnQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm5vZGVSaWdodClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlUmlnaHQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmxpc3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5saXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmxpc3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmRpY3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRTVEFURU1FTlRfUkU6IC9cXHslXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJVxcfS8sXG5cblx0Q09NTUVOVF9SRTogL1xceyNcXHMqKCg/Oi58XFxuKSo/KVxccyojXFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZW5naW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFZBUklBQkxFX1JFOiAvXFx7XFx7XFxzKiguKj8pXFxzKlxcfVxcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBpdGVtLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGxldCBleHByZXNzaW9uO1xuXG5cdFx0dGhpcy5kaWN0ID0gZGljdDtcblx0XHR0aGlzLnRtcGxzID0gdG1wbHM7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGl0ZW0uZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKCg/OlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcLikqW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyo9XFxzKiguKykvKTtcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBwYXJ0cyA9IG1bMV0uc3BsaXQoJy4nKSwgbCA9IHBhcnRzLmxlbmd0aCAtIDE7XG5cblx0XHRcdFx0bGV0IHBhcmVudCwgajtcblxuXHRcdFx0XHRpZihwYXJ0c1swXSA9PT0gJ3dpbmRvdydcblx0XHRcdFx0ICAgfHxcblx0XHRcdFx0ICAgcGFydHNbMF0gPT09ICdnbG9iYWwnXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHQvKiovIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSB3aW5kb3c7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IGdsb2JhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGogPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHBhcmVudCA9IGRpY3Q7XG5cblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Zm9yKHZhciBpID0gajsgaSA8IGw7IGkrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGAnICsgbVsxXSArICdgIG5vdCBkZWNsYXJlZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnRbcGFydHNbaV1dID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwobVsyXSwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ0B0ZXh0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElGICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdGNhc2UgJ0Byb290Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpdGVtLmJsb2Nrcy5ldmVyeSgoYmxvY2spID0+IHtcblxuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBibG9jay5leHByZXNzaW9uO1xuXG5cdFx0XHRcdFx0aWYoZXhwcmVzc2lvbiA9PT0gJ0B0cnVlJyB8fCBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGJsb2NrLmxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGJsb2NrLmxpc3RbaV0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2Zvcic6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHN5bTE7XG5cdFx0XHRcdGxldCBzeW0yO1xuXHRcdFx0XHRsZXQgZXhwcjtcblxuXHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqLFxccyooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRcdHN5bTIgPSBudWxsO1xuXHRcdFx0XHRcdFx0ZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdHN5bTIgPSBtWzJdO1xuXHRcdFx0XHRcdGV4cHIgPSBtWzNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdWYWx1ZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaXRlclZhbHVlO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IHN5bTIgPyBPYmplY3QuZW50cmllcyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gb3JpZ1ZhbHVlO1xuXG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZGUgbm90IGFuIG9iamVjdCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBsID0gaXRlclZhbHVlLmxlbmd0aDtcblxuXHRcdFx0XHRpZihsID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBrID0gMHgwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1swXS5saXN0O1xuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0WyhzeW0yKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQzID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IFtrZXksIHZhbF0gb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0ga2V5O1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTJdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQzO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMildID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IHZhbCBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoaXRlbS5ibG9ja3MubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMV0ubGlzdDtcblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkgfHwgJyc7XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpbGVOYW1lKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBzdHJpbmcgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbCh3aXRoX3N1YmV4cHIsIGl0ZW0ubGluZSwgZGljdCkgfHwge307XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlcykgIT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgb2JqZWN0IGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odG1wbCwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRtcGwpKVxuXHRcdHtcblx0XHRcdGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIG5ldyBhbWlUd2lnLnRtcGwuQ29tcGlsZXIodG1wbCkucm9vdE5vZGUsIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIC8qLS0tLS0tLS0tLS0tLS0qL3RtcGwvKi0tLS0tLS0tLS0tLS0tKi8sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmNhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwcmVzc2lvbiwgbGluZSwgXylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZi5jYWxsKF8sIF8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYiA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNVbmRlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOb3ROdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzU3RyaW5nJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0l0ZXJhYmxlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBJVEVSQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5SYW5nZSc6IGZ1bmN0aW9uKHgsIHgxLCB4Milcblx0e1xuXHRcdGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoLyotLS0qL3gvKi0tLSovID49IC8qLS0tKi94MS8qLS0tKi8pXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoLyotLS0qL3gvKi0tLSovIDw9IC8qLS0tKi94Mi8qLS0tKi8pXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKHguY2hhckNvZGVBdCgwKSA+PSB4MS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKHguY2hhckNvZGVBdCgwKSA8PSB4Mi5jaGFyQ29kZUF0KDApKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NvbHVtbic6IGZ1bmN0aW9uKHgsIGtleSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4Lm1hcCgodmFsKSA9PiB2YWxba2V5XSkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYmF0Y2gnOiBmdW5jdGlvbih4LCBuLCBtaXNzaW5nID0gJycpXG5cdHtcblx0ICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKG4pXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgbCA9IHgubGVuZ3RoO1xuXG5cdFx0XHRpZihsID4gMClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGxhc3Q7XG5cblx0XHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IG4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gbDsgaSA8IG07IGkgKz0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhc3QucHVzaChtaXNzaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMClcblx0XHR7XG5cdFx0XHRjb25zdCBwID0gcy5zdWJzdHJpbmcoaSk7XG5cblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCBtOyBqICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHAuaW5kZXhPZihvbGRTdHJzW2pdKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG5ld1N0cnNbal0pO1xuXG5cdFx0XHRcdFx0aSArPSBvbGRTdHJzW2pdLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnB1c2gocy5jaGFyQXQoaSsrKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgIF0sXG5cdCdfdGV4dFRvSnNvblN0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIiddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbmwyYnInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc3BsaXQnOiBmdW5jdGlvbihzLCBzZXAsIG1heClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5zcGxpdChzZXAsIG1heClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9hYnMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF4JzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5kb20nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgeSA9IE1hdGgucmFuZG9tKCk7XG5cblx0XHRpZih4KVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdFx0ICAgfHxcblx0XHRcdCAgIHRoaXMuaXNPYmplY3QoeClcblx0XHRcdCApIHtcblx0XHRcdCBcdGNvbnN0IFggPSBPYmplY3Qua2V5cyh4KTtcblxuXHRcdFx0XHRyZXR1cm4geFtcblx0XHRcdFx0XHRYW01hdGguZmxvb3IoWC5sZW5ndGggKiB5KV1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyh4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHhbTWF0aC5mbG9vcih4Lmxlbmd0aCAqIHkpXTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc051bWJlcih4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5JQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGV2YWwodGhpcy5nZXRKUyhleHByKSkuY2FsbChfLCBfKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KSgpOyJdfQ==
