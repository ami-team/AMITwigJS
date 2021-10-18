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

  if (typeof window !== 'undefined') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIndpbmRvdyIsImdsb2JhbCIsInRva2VuaXplciIsInRva2VuaXplIiwiY29kZSIsImxpbmUiLCJzcGFjZXMiLCJ0b2tlbkRlZnMiLCJ0b2tlblR5cGVzIiwiZXJyb3IiLCJsZW5ndGgiLCJyZXN1bHRfdG9rZW5zIiwicmVzdWx0X3R5cGVzIiwicmVzdWx0X2xpbmVzIiwiaSIsImwiLCJ3b3JkIiwidG9rZW4iLCJjIiwiX19sMCIsImNoYXJBdCIsImluZGV4T2YiLCJwdXNoIiwic3Vic3RyaW5nIiwiaiIsIl9tYXRjaCIsInRva2VucyIsInR5cGVzIiwibGluZXMiLCJzIiwic3RyaW5nT3JSZWdFeHAiLCJtIiwiUmVnRXhwIiwibWF0Y2giLCJfY2hlY2tOZXh0Q2hhciIsIl9hbG51bSIsImNoYXJDb2RlMiIsImNoYXJDb2RlQXQiLCJjaGFyQ29kZTEiLCJpc05hTiIsImV4cHIiLCIkaW5pdCIsIklTX1hYWCIsIkRFRklORUQiLCJOVUxMIiwiRU1QVFkiLCJJVEVSQUJMRSIsIkVWRU4iLCJPREQiLCJYWFhfV0lUSCIsIlNUQVJUU19XSVRIIiwiRU5EU19XSVRIIiwiUExVU19NSU5VUyIsIkNPTkNBVCIsIlBMVVMiLCJNSU5VUyIsIk1VTF9GTERJVl9ESVZfTU9EIiwiTVVMIiwiRkxESVYiLCJESVYiLCJNT0QiLCJSWCIsIlJQIiwiUkIxIiwiTE9HSUNBTF9PUiIsIkxPR0lDQUxfQU5EIiwiQklUV0lTRV9PUiIsIkJJVFdJU0VfWE9SIiwiQklUV0lTRV9BTkQiLCJOT1QiLCJJUyIsIkNNUF9PUCIsIk1BVENIRVMiLCJJTiIsIlJBTkdFIiwiUE9XRVIiLCJET1VCTEVfUVVFU1RJT04iLCJRVUVTVElPTiIsIkNPTE9OIiwiRE9UIiwiQ09NTUEiLCJQSVBFIiwiTFAiLCJMQjEiLCJMQjIiLCJSQjIiLCJTSUQiLCJURVJNSU5BTCIsIkxTVCIsIkRJQyIsIkZVTiIsIlZBUiIsIlRva2VuaXplciIsIl9zcGFjZXMiLCJfdG9rZW5EZWZzIiwiX3Rva2VuVHlwZXMiLCJyZXN1bHQiLCJuZXh0IiwibiIsImlzRW1wdHkiLCJwZWVrVG9rZW4iLCJwZWVrVHlwZSIsImNoZWNrVHlwZSIsInR5cGUiLCJUWVBFIiwiQXJyYXkiLCJDb21waWxlciIsInByb3RvdHlwZSIsInJvb3ROb2RlIiwicGFyc2VOdWxsQ29hbGVzY2luZyIsImR1bXAiLCJsZWZ0IiwicGFyc2VMb2dpY2FsT3IiLCJyaWdodCIsIm5vZGUiLCJOb2RlIiwibm9kZUxlZnQiLCJub2RlUmlnaHQiLCJwYXJzZUxvZ2ljYWxBbmQiLCJwYXJzZUJpdHdpc2VPciIsInBhcnNlQml0d2lzZVhvciIsInBhcnNlQml0d2lzZUFuZCIsInBhcnNlTm90IiwicGFyc2VDb21wIiwicGFyc2VBZGRTdWIiLCJzd2FwIiwicGFyc2VNdWxEaXYiLCJwYXJzZVBsdXNNaW51cyIsInBhcnNlUG93ZXIiLCJwYXJzZUZpbHRlciIsInBhcnNlRG90MSIsInRlbXAiLCJub2RlVHlwZSIsImxpc3QiLCJ1bnNoaWZ0IiwiaXNGaWx0ZXIiLCJwYXJzZURvdDIiLCJxIiwibm9kZVZhbHVlIiwic3RkbGliIiwicGFyc2VEb3QzIiwicGFyc2VYIiwicGFyc2VHcm91cCIsInBhcnNlQXJyYXkiLCJwYXJzZU9iamVjdCIsInBhcnNlRnVuVmFyIiwicGFyc2VUZXJtaW5hbCIsIl9wYXJzZVNpbmdsZXRzIiwiZGljdCIsIl9wYXJzZURvdWJsZXRzIiwiX3BhcnNlU2luZ2xldCIsIl9wYXJzZURvdWJsZXQiLCJrZXkiLCJfZHVtcCIsIm5vZGVzIiwiZWRnZXMiLCJwQ250IiwiQ05UIiwiY250IiwicmVwbGFjZSIsImpvaW4iLCJ0bXBsIiwiU1RBVEVNRU5UX1JFIiwiQ09NTUVOVF9SRSIsIl9jb3VudCIsImNvbHVtbiIsIkNPTFVNTiIsImtleXdvcmQiLCJleHByZXNzaW9uIiwiYmxvY2tzIiwidmFsdWUiLCJzdGFjazEiLCJzdGFjazIiLCJpdGVtIiwic3Vic3RyIiwiY3VyciIsImluZHgiLCJlcnJvcnMiLCJpbmRleCIsIlZBTFVFIiwicG9wIiwiSlNPTiIsInN0cmluZ2lmeSIsImVuZ2luZSIsIlZBUklBQkxFX1JFIiwiX3JlbmRlciIsInRtcGxzIiwiY2FjaGUiLCJldmFsIiwicGFydHMiLCJzcGxpdCIsInBhcmVudCIsInVuZGVmaW5lZCIsImV2ZXJ5IiwiYmxvY2siLCJzeW0xIiwic3ltMiIsIm9yaWdWYWx1ZSIsInR5cGVOYW1lIiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwiaXRlclZhbHVlIiwiZW50cmllcyIsImtleXMiLCJrIiwib2xkMSIsIm9sZDIiLCJvbGQzIiwibG9vcCIsInZhbCIsImZpcnN0IiwibGFzdCIsInJldmluZGV4MCIsImluZGV4MCIsInJldmluZGV4IiwibV8xXyIsIndpdGhfc3ViZXhwciIsIndpdGhfY29udGV4dCIsImZpbGVOYW1lIiwidmFyaWFibGVzIiwiaW5jbHVkZSIsInJlbmRlciIsIl8iLCJmIiwiaW50ZXJwcmV0ZXIiLCJnZXRKUyIsIngiLCJpc051bWJlciIsInkiLCJpc0FycmF5IiwiaXNTdHJpbmciLCJpc09iamVjdCIsIngxIiwieDIiLCJzdGVwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiaWR4MSIsImlkeDIiLCJzbGljZSIsImFyZ3VtZW50cyIsIkwiLCJEIiwic29ydCIsInJldmVyc2UiLCJzZXAiLCJtYXAiLCJtaXNzaW5nIiwiTWF0aCIsImNlaWwiLCJzMSIsInMyIiwiYmFzZSIsInJlZ2V4IiwibGFzdEluZGV4T2YiLCJ0ZXN0IiwiZXJyIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsInRyaW0iLCJvbGRTdHJzIiwibmV3U3RycyIsInAiLCJtb2RlIiwiX3JlcGxhY2UiLCJfdGV4dFRvSHRtbFgiLCJfdGV4dFRvSHRtbFkiLCJfdGV4dFRvU3RyaW5nWCIsIl90ZXh0VG9TdHJpbmdZIiwiX3RleHRUb0pzb25TdHJpbmdYIiwiX3RleHRUb0pzb25TdHJpbmdZIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidmFsdWVzIiwibWF4IiwiYWJzIiwiZmxvb3IiLCJyb3VuZCIsImFyZ3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsIk5hTiIsIk5FR0FUSVZFX0lORklOSVRZIiwicmFuZG9tIiwiWCIsIk1BWF9TQUZFX0lOVEVHRVIiLCJpbmRlbnQiLCJwYXRoIiwiSlNQYXRoIiwiYXBwbHkiLCJ3aXRoQ29udGV4dCIsImlnbm9yZU1pc3NpbmciLCJmaWx0ZXJfZSIsImZpbHRlcl9lc2NhcGUiLCJfZ2V0SlMiLCJvcGVyYXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQ0FBQyxZQUFXO0FBQ1o7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQSxNQUFNQSxPQUFPLEdBQUc7QUFDZkMsSUFBQUEsT0FBTyxFQUFFO0FBRE0sR0FBaEI7O0FBTUssTUFBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQXJCLEVBQ0w7QUFDQ0EsSUFBQUEsTUFBTSxDQUFDRixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBLEdBSEksTUFJQSxJQUFHLE9BQU9HLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDQSxJQUFBQSxNQUFNLENBQUNILE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0E7O0FBWURBLEVBQUFBLE9BQU8sQ0FBQ0ksU0FBUixHQUFvQjtBQUduQkMsSUFBQUEsUUFBUSxFQUFFLGtCQUFTQyxJQUFULEVBQWVDLElBQWYsRUFBcUJDLE1BQXJCLEVBQTZCQyxTQUE3QixFQUF3Q0MsVUFBeEMsRUFBb0RDLEtBQXBELEVBQ1Y7QUFDQyxVQUFHRixTQUFTLENBQUNHLE1BQVYsS0FBcUJGLFVBQVUsQ0FBQ0UsTUFBbkMsRUFDQTtBQUNDLGNBQU0seUNBQU47QUFDQTs7QUFFRCxVQUFNQyxhQUFhLEdBQUcsRUFBdEI7QUFDQSxVQUFNQyxZQUFZLEdBQUcsRUFBckI7QUFDQSxVQUFNQyxZQUFZLEdBQUcsRUFBckI7QUFFQSxVQUFJQyxDQUFDLEdBQUcsV0FBUjtBQUNBLFVBQU1DLENBQUMs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S0FwVnlCO0FBd1YxQmdGLElBQUFBLElBQUksRUFBRSxlQUFTcEosSUFBVCxFQUFldUwsQ0FBZixFQUNOO0FBQ0MsVUFBRyxDQUFDQSxDQUFKLEVBQU9BLENBQUMsR0FBRyxFQUFKO0FBRVAsYUFBT25DLElBQUksQ0FBQyxLQUFLc0MsS0FBTCxDQUFXMUwsSUFBWCxDQUFELENBQUosQ0FBdUJpSyxJQUF2QixDQUE0QnNCLENBQTVCLEVBQStCQSxDQUEvQixDQUFQO0FBQ0E7QUE3VnlCLEdBQTNCO0FBbVdDLENBMTlHRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQte3tZRUFSfX0gQ05SUyAvIExQU0NcbiAqXG4gKiBUaGlzIGZpbGUgbXVzdCBiZSB1c2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUM6XG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZW4uaHRtbFxuICogaHR0cDovL3d3dy5jZWNpbGwuaW5mby9saWNlbmNlcy9MaWNlbmNlX0NlQ0lMTC1DX1YxLWZyLmh0bWxcbiAqXG4gKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBhbWlUd2lnID0ge1xuXHR2ZXJzaW9uOiAnMS4yLjAnXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbntcblx0d2luZG93LmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJylcbntcblx0Z2xvYmFsLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy8gZXhwb3J0IGRlZmF1bHQgYW1pVHdpZztcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHRcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDT1VOVCBMSU5FUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRUdFWEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFTUFJTklORyBDSEFSQUNURVJFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0aWYod29yZClcblx0XHR7XG5cdFx0XHRpZihlcnJvcilcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcbi8qXHRcdFx0d29yZCA9ICcnO1xuICovXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnM6IHJlc3VsdF90b2tlbnMsXG5cdFx0XHR0eXBlczogcmVzdWx0X3R5cGVzLFxuXHRcdFx0bGluZXM6IHJlc3VsdF9saW5lcyxcblx0XHR9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci50b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5JU19YWFggPSBbXG5cdFx0XHR0aGlzLkRFRklORUQsXG5cdFx0XHR0aGlzLk5VTEwsXG5cdFx0XHR0aGlzLkVNUFRZLFxuXHRcdFx0dGhpcy5JVEVSQUJMRSxcblx0XHRcdHRoaXMuRVZFTixcblx0XHRcdHRoaXMuT0RELFxuXHRcdF07XG5cblx0XHR0aGlzLlhYWF9XSVRIID0gW1xuXHRcdFx0dGhpcy5TVEFSVFNfV0lUSCxcblx0XHRcdHRoaXMuRU5EU19XSVRILFxuXHRcdF07XG5cblx0XHR0aGlzLlBMVVNfTUlOVVMgPSBbXG5cdFx0XHR0aGlzLkNPTkNBVCxcblx0XHRcdHRoaXMuUExVUyxcblx0XHRcdHRoaXMuTUlOVVMsXG5cdFx0XTtcblxuXHRcdHRoaXMuTVVMX0ZMRElWX0RJVl9NT0QgPSBbXG5cdFx0XHR0aGlzLk1VTCxcblx0XHRcdHRoaXMuRkxESVYsXG5cdFx0XHR0aGlzLkRJVixcblx0XHRcdHRoaXMuTU9ELFxuXHRcdF07XG5cblx0XHR0aGlzLlJYID0gW1xuXHRcdFx0dGhpcy5SUCxcblx0XHRcdHRoaXMuUkIxLFxuXHRcdF07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcbiBcdERPVUJMRV9RVUVTVElPTjogMTI3LFxuIFx0UVVFU1RJT046IDEyOCxcblx0Q09MT046IDEyOSxcblx0RE9UOiAxMzAsXG5cdENPTU1BOiAxMzEsXG5cdFBJUEU6IDEzMixcblx0TFA6IDEzMyxcblx0UlA6IDEzNCxcblx0TEIxOiAxMzUsXG5cdFJCMTogMTM2LFxuXHRMQjI6IDEzNyxcblx0UkIyOiAxMzgsXG5cdFNJRDogMTM5LFxuXHRURVJNSU5BTDogMTQwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zLiRpbml0KCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLlRva2VuaXplciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnPz8nLFxuXHRcdCc/Jyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlblR5cGVzID0gW1xuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OT1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OVUxMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFksXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5PREQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUExVUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1JTlVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NVUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5GTERJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1PRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlFVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdCA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVG9rZW4gPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOdWxsQ29hbGVzY2luZzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE51bGxDb2FsZXNjaW5nIDogTG9naWNhbE9yICgnPz8nIExvZ2ljYWxPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbE9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbEFuZCA6IEJpdHdpc2VPciAoJ2FuZCcgQml0d2lzZU9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZVhvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlQW5kIDogTm90ICgnYi1hbmQnIE5vdCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ29tcCA6IEFkZFN1YiAnaXMnICdub3QnPyAoJ2RlZmluZWQnIHwgJ251bGwnIHwgLi4uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJz09PScgfCAnPT0nIHwgLi4uKSBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCdzdGFydHMnIHwgJ2VuZHMnKSBgd2l0aGAgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ21hdGNoZXMnIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnaW4nIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBZGRTdWI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU11bERpdigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU11bERpdigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBNdWxEaXYgOiBQbHVzTWludXMgKCgnKicgfCAnLy8nIHwgJy8nIHwgJyUnKSBQbHVzTWludXMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRmlsdGVyKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRmlsdGVyICgnKionIEZpbHRlcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDEoKSwgbm9kZSwgdGVtcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBEb3QxICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZURvdDEodHJ1ZSk7XG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0dGVtcC5saXN0LnVuc2hpZnQobGVmdCk7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGVtcCA9IG5vZGU7XG5cblx0XHRcdGZvcig7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCAnLicpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MyA6IFggKCdbJyBOdWxsQ29hbGVzY2luZyAnXScpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFggOiBHcm91cCB8IEFycmF5IHwgT2JqZWN0IHwgRnVuVmFyIHwgVGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU1lOVEFYIEVSUk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHR1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIgPSBmdW5jdGlvbih0bXBsKSB7XG5cblx0dGhpcy4kaW5pdCh0bXBsKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFNUQVRFTUVOVF9SRTogL1xceyVcXHMqKFthLXpBLVpdKylcXHMqKCg/Oi58XFxuKSo/KVxccyolXFx9LyxcblxuXHRDT01NRU5UX1JFOiAvXFx7I1xccyooKD86LnxcXG4pKj8pXFxzKiNcXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jb3VudDogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCByZXN1bHQgPSAwO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkrKylcblx0XHR7XG5cdFx0XHRpZihzW2ldID09PSAnXFxuJykgcmVzdWx0Kys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGxpbmUgPSAxO1xuXG5cdFx0bGV0IGNvbHVtbjtcblx0XHRsZXQgQ09MVU1OO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHtcblx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRrZXl3b3JkOiAnQHJvb3QnLFxuXHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0fV0sXG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcih0bXBsID0gdG1wbC5yZXBsYWNlKHRoaXMuQ09NTUVOVF9SRSwgJycpOzsgdG1wbCA9IHRtcGwuc3Vic3RyKENPTFVNTikpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGN1cnIgPSBzdGFjazFbc3RhY2sxLmxlbmd0aCAtIDFdO1xuXHRcdFx0IGxldCAgaW5keCA9IHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihtID09PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQodG1wbCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGVycm9ycyA9IFtdO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YWNrMS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyoqLyBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRpZmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdCBcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGZvcmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihlcnJvcnMubGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsICcgKyBlcnJvcnMuam9pbignLCAnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGluZSArPSB0aGlzLl9jb3VudChWQUxVRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YWx1ZSlcblx0XHRcdHtcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdmbHVzaCc6XG5cdFx0XHRcdGNhc2UgJ2F1dG9lc2NhcGUnOlxuXHRcdFx0XHRjYXNlICdzcGFjZWxlc3MnOlxuXHRcdFx0XHRjYXNlICd2ZXJiYXRpbSc6XG5cblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0XHRjYXNlICdpbmNsdWRlJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2VpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZSc6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZidcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2Zvcidcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmtub3duIGtleXdvcmQgYCcgKyBrZXl3b3JkICsgJ2AnO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnJvb3ROb2RlLCBudWxsLCAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5lbmdpbmUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXHRcdHRoaXMudG1wbHMgPSB0bXBscztcblxuXHRcdHN3aXRjaChpdGVtLmtleXdvcmQpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdkbyc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRtID0gaXRlbS5leHByZXNzaW9uLm1hdGNoKC8oKD86W2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFwuKSpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBzZXRgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gbVsxXS5zcGxpdCgnLicpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRcdFx0XHRsZXQgcGFyZW50LCBqO1xuXG5cdFx0XHRcdGlmKHBhcnRzWzBdID09PSAnd2luZG93J1xuXHRcdFx0XHQgICB8fFxuXHRcdFx0XHQgICBwYXJ0c1swXSA9PT0gJ2dsb2JhbCdcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdC8qKi8gaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHdpbmRvdztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gZ2xvYmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aiA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cGFyZW50ID0gZGljdDtcblxuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRmb3IodmFyIGkgPSBqOyBpIDwgbDsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgYCcgKyBtWzFdICsgJ2Agbm90IGRlY2xhcmVkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudFtwYXJ0c1tpXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQFRFWFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUucmVwbGFjZSh0aGlzLlZBUklBQkxFX1JFLCBmdW5jdGlvbihtYXRjaCwgZXhwcmVzc2lvbikge1xuXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYmxvY2subGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgYmxvY2subGlzdFtpXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgc3ltMTtcblx0XHRcdFx0bGV0IHN5bTI7XG5cdFx0XHRcdGxldCBleHByO1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyosXFxzKihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0XHRpZighbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYGZvcmAgc3RhdGVtZW50Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdFx0c3ltMiA9IG51bGw7XG5cdFx0XHRcdFx0XHRleHByID0gbVsyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0c3ltMiA9IG1bMl07XG5cdFx0XHRcdFx0ZXhwciA9IG1bM107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG9yaWdWYWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHIsIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JpZ1ZhbHVlKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpdGVyVmFsdWU7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gc3ltMiA/IE9iamVjdC5lbnRyaWVzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBvcmlnVmFsdWU7XG5cblx0XHRcdFx0XHRpZih0eXBlTmFtZSAhPT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgdHlwZU5hbWUgIT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgaXRlcmFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgYW4gb2JqZWN0Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGwgPSBpdGVyVmFsdWUubGVuZ3RoO1xuXG5cdFx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbKHN5bTIpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDMgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgW2tleSwgdmFsXSBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMl0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDM7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0yKV0gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgdmFsIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihpdGVtLmJsb2Nrcy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1sxXS5saXN0O1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTkNMVURFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpbmNsdWRlJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgbV8xXyA9IGl0ZW0uZXhwcmVzc2lvbiwgd2l0aF9zdWJleHByLCB3aXRoX2NvbnRleHQ7XG5cblx0XHRcdFx0LyoqLyBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKykkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbV8xXztcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKHdpdGhfc3ViZXhwciwgaXRlbS5saW5lLCBkaWN0KSB8fCB7fTtcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGVzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBvYmplY3QgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChhbWlUd2lnLnN0ZGxpYi5pbmNsdWRlKFxuXHRcdFx0XHRcdGZpbGVOYW1lLFxuXHRcdFx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQsXG5cdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgLyotLS0tLS0tLS0tLS0tLSovdG1wbC8qLS0tLS0tLS0tLS0tLS0qLywgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuY2FjaGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGY7XG5cblx0XHRpZihleHByZXNzaW9uIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXSA9IGV2YWwoXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5pbnRlcnByZXRlci5nZXRKUyhcblx0XHRcdFx0XHRuZXcgYW1pVHdpZy5leHByLkNvbXBpbGVyKGV4cHJlc3Npb24sIGxpbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuc3RkbGliICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWQVJJQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFbXB0eSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih4ID09PSBudWxsXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSBmYWxzZVxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gKCgnJykpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gKHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nICYmIHgubGVuZ3RoID09PSAwKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICAodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gMClcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNBcnJheSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0V2ZW4nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmdlJzogZnVuY3Rpb24oeDEsIHgyLCBzdGVwID0gMSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyoqLyBpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0gLyotLS0qL3gxLyotLS0qLzsgaSA8PSAvKi0tLSoveDIvKi0tLSovOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tKi8oaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IHgxLmNoYXJDb2RlQXQoMCk7IGkgPD0geDIuY2hhckNvZGVBdCgwKTsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xhc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFt4Lmxlbmd0aCAtIDFdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc1N0cmluZyhpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRMLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMLmpvaW4oJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgRCA9IHt9O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc09iamVjdChpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBEW2pdID0gaXRlbVtqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBEO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmV2ZXJzZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5yZXZlcnNlKCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfam9pbic6IGZ1bmN0aW9uKHgsIHNlcClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LmpvaW4oc2VwKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY29sdW1uJzogZnVuY3Rpb24oeCwga2V5KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgubWFwKCh2YWwpID0+IHZhbFtrZXldKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9iYXRjaCc6IGZ1bmN0aW9uKHgsIG4sIG1pc3NpbmcgPSAnJylcblx0e1xuXHQgICAgY29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIobilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBsID0geC5sZW5ndGg7XG5cblx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbGFzdDtcblxuXHRcdFx0XHRjb25zdCBtID0gTWF0aC5jZWlsKGwgLyBuKSAqIG47XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGxhc3QgPSB4LnNsaWNlKGksIGkgKyBuKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IobGV0IGkgPSBsOyBpIDwgbTsgaSArPSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFzdC5wdXNoKG1pc3NpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVFJJTkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdlbmRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSBzMS5sZW5ndGggLSBzMi5sZW5ndGg7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF0Y2gnOiBmdW5jdGlvbihzLCByZWdleClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoKChzKSkpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHJlZ2V4KVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGlkeDEgPSByZWdleC4gIGluZGV4T2YgICgnLycpO1xuXHRcdFx0Y29uc3QgaWR4MiA9IHJlZ2V4Lmxhc3RJbmRleE9mKCcvJyk7XG5cblx0XHRcdGlmKGlkeDEgPT09IDAgfHwgaWR4MSA8IGlkeDIpXG5cdFx0XHR7XG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAocmVnZXguc3Vic3RyaW5nKGlkeDEgKyAxLCBpZHgyKSwgcmVnZXguc3Vic3RyaW5nKGlkeDIgKyAxKSkudGVzdChzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbG93ZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXBwZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvVXBwZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RpdGxlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90cmltJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50cmltKClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAwKVxuXHRcdHtcblx0XHRcdGNvbnN0IHAgPSBzLnN1YnN0cmluZyhpKTtcblxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IG07IGogKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0aWYocC5pbmRleE9mKG9sZFN0cnNbal0pID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3U3Ryc1tqXSk7XG5cblx0XHRcdFx0XHRpICs9IG9sZFN0cnNbal0ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucHVzaChzLmNoYXJBdChpKyspKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9IdG1sWCc6IFsnJicgICAgLCAnXCInICAgICAsICc8JyAgICwgJz4nICAgXSxcblx0J190ZXh0VG9IdG1sWSc6IFsnJmFtcDsnLCAnJnF1b3Q7JywgJyZsdDsnLCAnJmd0OyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSnNvblN0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2VzY2FwZSc6IGZ1bmN0aW9uKHMsIG1vZGUpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHN3aXRjaChtb2RlIHx8ICdodG1sJylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XG5cdFx0XHRcdGNhc2UgJ2h0bWxfYXR0cic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblxuXHRcdFx0XHRjYXNlICdqcyc6XG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAnanNvbic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1gsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICd1cmwnOlxuXHRcdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmF3JzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gc1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc09iamVjdChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JvdW5kJzogZnVuY3Rpb24oeCwgbW9kZSlcblx0e1xuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ2NlaWwnOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHgpO1xuXG5cdFx0XHRjYXNlICdmbG9vcic6XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHgpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh4KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA+IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJBTkRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc09iamVjdCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2VuY29kZSc6IGZ1bmN0aW9uKHgsIGluZGVudClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBudWxsLCB0aGlzLmlzTnVtYmVyKGluZGVudCkgPyBpbmRlbnQgOiAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9qc3BhdGgnOiBmdW5jdGlvbih4LCBwYXRoKVxuXHR7XG5cdFx0cmV0dXJuIHR5cGVvZiBKU1BhdGggIT09ICd1bmRlZmluZWQnID8gSlNQYXRoLmFwcGx5KHBhdGgsIHgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaW5jbHVkZSc6IGZ1bmN0aW9uKGZpbGVOYW1lLCB2YXJpYWJsZXMgPSB7fSwgd2l0aENvbnRleHQgPSB0cnVlLCBpZ25vcmVNaXNzaW5nID0gZmFsc2UpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihmaWxlTmFtZSBpbiBhbWlUd2lnLmVuZ2luZS50bXBscylcblx0XHR7XG5cdFx0XHRjb25zdCB0ZW1wID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih3aXRoQ29udGV4dClcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYW1pVHdpZy5lbmdpbmUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSBhbWlUd2lnLmVuZ2luZS5kaWN0W2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YXJpYWJsZXMpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIC8qLSovdmFyaWFibGVzLyotKi8pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gLyotKi92YXJpYWJsZXMvKi0qL1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcihhbWlUd2lnLmVuZ2luZS50bXBsc1tmaWxlTmFtZV0sIHRlbXApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighaWdub3JlTWlzc2luZylcblx0XHR7XG5cdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZSA9IGFtaVR3aWcuc3RkbGliLmZpbHRlcl9lc2NhcGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5pbnRlcnByZXRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5pbnRlcnByZXRlciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0SlM6IGZ1bmN0aW9uKG5vZGUpXG5cdHtcblx0XHRsZXQgTDtcblx0XHRsZXQgeDtcblx0XHRsZXQgbGVmdDtcblx0XHRsZXQgcmlnaHQ7XG5cdFx0bGV0IG9wZXJhdG9yO1xuXG5cdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTFNUOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ1snICsgTC5qb2luKCcsJykgKyAnXSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRElDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRJQzpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICd7JyArIEwuam9pbignLCcpICsgJ30nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZVTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GVU46XG5cdFx0IFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2godGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0IFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBWQVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJ1snICsgdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSArICddJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBMLmxlbmd0aCA+IDAgPyBub2RlLm5vZGVWYWx1ZSArIEwuam9pbignJykgOiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUw6XG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRGVmaW5lZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5OVUxMOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc051bGwoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFk6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRW1wdHkoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSXRlcmFibGUoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTjpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFdmVuKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk9ERDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNPZGQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JTjpcblxuXHRcdFx0XHRpZihub2RlLm5vZGVSaWdodC5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJbk9iamVjdCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHggPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRcdGxlZnQgPSBub2RlLm5vZGVSaWdodC5ub2RlTGVmdC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0cmlnaHQgPSBub2RlLm5vZGVSaWdodC5ub2RlUmlnaHQubm9kZVZhbHVlO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luUmFuZ2UoJyArIHggKyAnLCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnN0YXJ0c1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5lbmRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5tYXRjaCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRTpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIucmFuZ2UoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlVmFsdWVbMF0gPT09ICcuJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJy4nICsgcmlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnWycgKyByaWdodCArICddJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GTERJVjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5mbG9vcignICsgbGVmdCArICcvJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5wb3coJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1VCTEVfUVVFU1RJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICcoKCcgKyBsZWZ0ICsgJykgfHwgKCcgKyByaWdodCArICcpKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBVTklBUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgPT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yICsgJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCA9PT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCkgKyAnKScgKyBvcGVyYXRvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEJJTkFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8fCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3wnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnXic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FUOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcrJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwciwgXylcblx0e1xuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZXZhbCh0aGlzLmdldEpTKGV4cHIpKS5jYWxsKF8sIF8pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn0pKCk7Il19
