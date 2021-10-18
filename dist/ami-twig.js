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
  return amiTwig;
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIiwiLi4vc3JjL3Rva2VuaXplci5qcyIsIi4uL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlX2NvbXBpbGVyLmpzIiwiLi4vc3JjL2VuZ2luZS5qcyIsIi4uL3NyYy9jYWNoZS5qcyIsIi4uL3NyYy9zdGRsaWIuanMiLCIuLi9zcmMvaW50ZXJwcmV0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQSxNQUFNLE9BQU8sR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFO0FBRE0sR0FBaEI7O0FBTUssTUFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDQTs7QUN4QkQsRUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQjtBQUduQixJQUFBLFFBQVEsRUFBRSxrQkFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixTQUE3QixFQUF3QyxVQUF4QyxFQUFvRCxLQUFwRCxFQUNWO0FBQ0MsVUFBRyxTQUFTLENBQUMsTUFBVixLQUFxQixVQUFVLENBQUMsTUFBbkMsRUFDQTtBQUNDLGNBQU0seUNBQU47QUFDQTs7QUFFRCxVQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUNBLFVBQU0sWUFBWSxHQUFHLEVBQXJCO0FBQ0EsVUFBTSxZQUFZLEdBQUcsRUFBckI7QUFFQSxVQUFJLENBQUMsR0FBRyxXQUFSO0FBQ0EsVUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQWY7QUFFQSxVQUFJLElBQUksR0FBRyxFQUFYO0FBQUEsVUFBZSxLQUFmO0FBQUEsVUFBc0IsQ0FBdEI7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QUFBLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBaEI7QUFDQTtBQTFDRjs7QUErQ0EsWUFBQSxJQUFJLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQVA7QUFDQSxZQUFBLEtBQUssR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsU0FBakIsQ0FBUjtBQUVBLG1CQUFPLE1BQU0sSUFBTixHQUFhLFFBQWIsR0FBd0IsS0FBeEIsR0FBZ0MsR0FBdkM7QUFDQTs7QUE1VEg7QUFrVUQsS0E3VTBCO0FBaVYxQixJQUFBLEtBQUssRUFBRSxlQUFTLElBQVQsRUFDUDtBQUNDLGFBQU8sMkJBQTJCLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxRQUFqQixDQUEzQixHQUF3RCxNQUEvRDtBQUNELEtBcFYwQjtBQXdWMUIsSUFBQSxJQUFJLEVBQUUsZUFBUyxJQUFULEVBQWUsQ0FBZixFQUNOO0FBQ0MsVUFBRSxDQUFFLENBQUosRUFBTyxDQUFDLEdBQUcsRUFBSjtBQUVQLGFBQU8sSUFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBRCxDQUFKLENBQXVCLElBQXZCLENBQTRCLENBQTVCLEVBQStCLENBQS9CLENBQVA7QUFDRDtBQTdWMEIsR0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC17e1lFQVJ9fSBDTlJTIC8gTFBTQ1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjIuMCdcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiovIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxue1xuXHR3aW5kb3cuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5lbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKVxue1xuXHRnbG9iYWwuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRva2VuaXplciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci50b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5JU19YWFggPSBbXG5cdFx0XHR0aGlzLkRFRklORUQsXG5cdFx0XHR0aGlzLk5VTEwsXG5cdFx0XHR0aGlzLkVNUFRZLFxuXHRcdFx0dGhpcy5JVEVSQUJMRSxcblx0XHRcdHRoaXMuRVZFTixcblx0XHRcdHRoaXMuT0RELFxuXHRcdF07XG5cblx0XHR0aGlzLlhYWF9XSVRIID0gW1xuXHRcdFx0dGhpcy5TVEFSVFNfV0lUSCxcblx0XHRcdHRoaXMuRU5EU19XSVRILFxuXHRcdF07XG5cblx0XHR0aGlzLlBMVVNfTUlOVVMgPSBbXG5cdFx0XHR0aGlzLkNPTkNBVCxcblx0XHRcdHRoaXMuUExVUyxcblx0XHRcdHRoaXMuTUlOVVMsXG5cdFx0XTtcblxuXHRcdHRoaXMuTVVMX0ZMRElWX0RJVl9NT0QgPSBbXG5cdFx0XHR0aGlzLk1VTCxcblx0XHRcdHRoaXMuRkxESVYsXG5cdFx0XHR0aGlzLkRJVixcblx0XHRcdHRoaXMuTU9ELFxuXHRcdF07XG5cblx0XHR0aGlzLlJYID0gW1xuXHRcdFx0dGhpcy5SUCxcblx0XHRcdHRoaXMuUkIxLFxuXHRcdF07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcbiBcdERPVUJMRV9RVUVTVElPTjogMTI3LFxuIFx0UVVFU1RJT046IDEyOCxcblx0Q09MT046IDEyOSxcblx0RE9UOiAxMzAsXG5cdENPTU1BOiAxMzEsXG5cdFBJUEU6IDEzMixcblx0TFA6IDEzMyxcblx0UlA6IDEzNCxcblx0TEIxOiAxMzUsXG5cdFJCMTogMTM2LFxuXHRMQjI6IDEzNyxcblx0UkIyOiAxMzgsXG5cdFNJRDogMTM5LFxuXHRURVJNSU5BTDogMTQwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zLiRpbml0KCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLlRva2VuaXplciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnPz8nLFxuXHRcdCc/Jyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlblR5cGVzID0gW1xuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OT1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OVUxMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFksXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5PREQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUExVUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1JTlVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NVUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5GTERJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1PRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlFVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdCA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVG9rZW4gPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOdWxsQ29hbGVzY2luZzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE51bGxDb2FsZXNjaW5nIDogTG9naWNhbE9yICgnPz8nIExvZ2ljYWxPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbE9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbEFuZCA6IEJpdHdpc2VPciAoJ2FuZCcgQml0d2lzZU9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZVhvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlQW5kIDogTm90ICgnYi1hbmQnIE5vdCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ29tcCA6IEFkZFN1YiAnaXMnICdub3QnPyAoJ2RlZmluZWQnIHwgJ251bGwnIHwgLi4uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJz09PScgfCAnPT0nIHwgLi4uKSBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCdzdGFydHMnIHwgJ2VuZHMnKSBgd2l0aGAgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ21hdGNoZXMnIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnaW4nIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBZGRTdWI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU11bERpdigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU11bERpdigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBNdWxEaXYgOiBQbHVzTWludXMgKCgnKicgfCAnLy8nIHwgJy8nIHwgJyUnKSBQbHVzTWludXMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRmlsdGVyKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRmlsdGVyICgnKionIEZpbHRlcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDEoKSwgbm9kZSwgdGVtcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBEb3QxICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZURvdDEodHJ1ZSk7XG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0dGVtcC5saXN0LnVuc2hpZnQobGVmdCk7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsZXQgdGVtcCA9IG5vZGU7XG5cblx0XHRcdGZvcig7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCAnLicpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MyA6IFggKCdbJyBOdWxsQ29hbGVzY2luZyAnXScpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFggOiBHcm91cCB8IEFycmF5IHwgT2JqZWN0IHwgRnVuVmFyIHwgVGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU1lOVEFYIEVSUk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHR1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRTVEFURU1FTlRfUkU6IC9cXHslXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJVxcfS8sXG5cblx0Q09NTUVOVF9SRTogL1xceyNcXHMqKCg/Oi58XFxuKSo/KVxccyojXFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmVuZ2luZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRWQVJJQUJMRV9SRTogL1xce1xce1xccyooLio/KVxccypcXH1cXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLygoPzpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXC4pKlthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBtWzFdLnNwbGl0KCcuJyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRcdGxldCBwYXJlbnQsIGo7XG5cblx0XHRcdFx0aWYocGFydHNbMF0gPT09ICd3aW5kb3cnXG5cdFx0XHRcdCAgIHx8XG5cdFx0XHRcdCAgIHBhcnRzWzBdID09PSAnZ2xvYmFsJ1xuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0LyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gd2luZG93O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBnbG9iYWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJlbnQgPSBkaWN0O1xuXG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGZvcih2YXIgaSA9IGo7IGkgPCBsOyBpKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBgJyArIG1bMV0gKyAnYCBub3QgZGVjbGFyZWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50W3BhcnRzW2ldXSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKG1bMl0sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpZic6XG5cdFx0XHRjYXNlICdAcm9vdCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBibG9jay5saXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBibG9jay5saXN0W2ldLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBzeW0xO1xuXHRcdFx0XHRsZXQgc3ltMjtcblx0XHRcdFx0bGV0IGV4cHI7XG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKixcXHMqKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0XHRzeW0yID0gbnVsbDtcblx0XHRcdFx0XHRcdGV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRzeW0yID0gbVsyXTtcblx0XHRcdFx0XHRleHByID0gbVszXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnVmFsdWUpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGl0ZXJWYWx1ZTtcblxuXHRcdFx0XHRpZih0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBzeW0yID8gT2JqZWN0LmVudHJpZXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IG9yaWdWYWx1ZTtcblxuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBba2V5LCB2YWxdIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGtleTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCB2YWwgb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuY2FjaGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGY7XG5cblx0XHRpZihleHByZXNzaW9uIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXSA9IGV2YWwoXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5pbnRlcnByZXRlci5nZXRKUyhcblx0XHRcdFx0XHRuZXcgYW1pVHdpZy5leHByLkNvbXBpbGVyKGV4cHJlc3Npb24sIGxpbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYiA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNVbmRlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOb3ROdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiB4Lmxlbmd0aCA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJyAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzU3RyaW5nJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0l0ZXJhYmxlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBJVEVSQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5SYW5nZSc6IGZ1bmN0aW9uKHgsIHgxLCB4Milcblx0e1xuXHRcdGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoLyotLS0qL3gvKi0tLSovID49IC8qLS0tKi94MS8qLS0tKi8pXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoLyotLS0qL3gvKi0tLSovIDw9IC8qLS0tKi94Mi8qLS0tKi8pXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKHguY2hhckNvZGVBdCgwKSA+PSB4MS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKHguY2hhckNvZGVBdCgwKSA8PSB4Mi5jaGFyQ29kZUF0KDApKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NvbHVtbic6IGZ1bmN0aW9uKHgsIGtleSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4Lm1hcCgodmFsKSA9PiB2YWxba2V5XSkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYmF0Y2gnOiBmdW5jdGlvbih4LCBuLCBtaXNzaW5nID0gJycpXG5cdHtcblx0ICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKG4pXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgbCA9IHgubGVuZ3RoO1xuXG5cdFx0XHRpZihsID4gMClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGxhc3Q7XG5cblx0XHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IG4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gbDsgaSA8IG07IGkgKz0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhc3QucHVzaChtaXNzaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMClcblx0XHR7XG5cdFx0XHRjb25zdCBwID0gcy5zdWJzdHJpbmcoaSk7XG5cblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCBtOyBqICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHAuaW5kZXhPZihvbGRTdHJzW2pdKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG5ld1N0cnNbal0pO1xuXG5cdFx0XHRcdFx0aSArPSBvbGRTdHJzW2pdLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnB1c2gocy5jaGFyQXQoaSsrKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgIF0sXG5cdCdfdGV4dFRvSnNvblN0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIiddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbmwyYnInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc3BsaXQnOiBmdW5jdGlvbihzLCBzZXAsIG1heClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5zcGxpdChzZXAsIG1heClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9hYnMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF4JzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5kb20nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgeSA9IE1hdGgucmFuZG9tKCk7XG5cblx0XHRpZih4KVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdFx0ICAgfHxcblx0XHRcdCAgIHRoaXMuaXNPYmplY3QoeClcblx0XHRcdCApIHtcblx0XHRcdCBcdGNvbnN0IFggPSBPYmplY3Qua2V5cyh4KTtcblxuXHRcdFx0XHRyZXR1cm4geFtcblx0XHRcdFx0XHRYW01hdGguZmxvb3IoWC5sZW5ndGggKiB5KV1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyh4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHhbTWF0aC5mbG9vcih4Lmxlbmd0aCAqIHkpXTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc051bWJlcih4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmludGVycHJldGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXRKUzogZnVuY3Rpb24obm9kZSlcblx0e1xuXHRcdGxldCBMO1xuXHRcdGxldCB4O1xuXHRcdGxldCBsZWZ0O1xuXHRcdGxldCByaWdodDtcblx0XHRsZXQgb3BlcmF0b3I7XG5cblx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIExTVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MU1Q6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgvKi0tLS0tKi8gdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goaSArICc6JyArIHRoaXMuX2dldEpTKG5vZGUuZGljdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRlVOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCh0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZSArICcoJyArIEwuam9pbignLCcpICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5WQVI6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIEwubGVuZ3RoID4gMCA/IG5vZGUubm9kZVZhbHVlICsgTC5qb2luKCcnKSA6IG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFRFUk1JTkFMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTDpcblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNEZWZpbmVkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEw6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzTnVsbCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTVBUWTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFbXB0eSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJdGVyYWJsZSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FVkVOOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0V2ZW4oJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuT0REOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc09kZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklOOlxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luT2JqZWN0KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdFx0bGVmdCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVMZWZ0Lm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRyaWdodCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVSaWdodC5ub2RlVmFsdWU7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5SYW5nZSgnICsgeCArICcsJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNUQVJUU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuc3RhcnRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVORFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmVuZHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTUFUQ0hFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLm1hdGNoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5yYW5nZSgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1Q6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRpZihub2RlLm5vZGVWYWx1ZVswXSA9PT0gJy4nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnLicgKyByaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICdbJyArIHJpZ2h0ICsgJ10nO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRkxESVYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLmZsb29yKCcgKyBsZWZ0ICsgJy8nICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUE9XRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLnBvdygnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVUJMRV9RVUVTVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT046XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJygoJyArIGxlZnQgKyAnKSB8fCAoJyArIHJpZ2h0ICsgJykpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVOSUFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQklOQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3x8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICdeJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgbGVmdCArIG9wZXJhdG9yICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SlM6IGZ1bmN0aW9uKGV4cHIpXG5cdHtcblx0XHRyZXR1cm4gJyhmdW5jdGlvbihfKSB7IHJldHVybiAnICsgdGhpcy5fZ2V0SlMoZXhwci5yb290Tm9kZSkgKyAnOyB9KSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIl19
