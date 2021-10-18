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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIiwiLi4vc3JjL3Rva2VuaXplci5qcyIsIi4uL3NyYy9leHByZXNzaW9uX2NvbXBpbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlX2NvbXBpbGVyLmpzIiwiLi4vc3JjL2VuZ2luZS5qcyIsIi4uL3NyYy9jYWNoZS5qcyIsIi4uL3NyYy9zdGRsaWIuanMiLCIuLi9zcmMvaW50ZXJwcmV0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQSxNQUFNLE9BQU8sR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFO0FBRE0sR0FBaEI7O0FBUUssTUFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDLElBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDQTs7QUMxQkQsRUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQjtBQUduQixJQUFBLFFBQVEsRUFBRSxrQkFBUyxJQUFULEVBQWUsSUFBZixFQUFxQixNQUFyQixFQUE2QixTQUE3QixFQUF3QyxVQUF4QyxFQUFvRCxLQUFwRCxFQUNWO0FBQ0MsVUFBRyxTQUFTLENBQUMsTUFBVixLQUFxQixVQUFVLENBQUMsTUFBbkMsRUFDQTtBQUNDLGNBQU0seUNBQU47QUFDQTs7QUFFRCxVQUFNLGFBQWEsR0FBRyxFQUF0QjtBQUNBLFVBQU0sWUFBWSxHQUFHLEVBQXJCO0FBQ0EsVUFBTSxZQUFZLEdBQUcsRUFBckI7QUFFQSxVQUFJLENBQUMsR0FBRyxXQUFSO0FBQ0EsVUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQWY7QUFFQSxVQUFJLElBQUksR0FBRyxFQUFYO0FBQUEsVUFBZSxLQUFmO0FBQUEsVUFBc0IsQ0FBdEI7O0FBRUYsTUFBQSxJQUFJLEVBQUcsT0FBTSxDQUFDLEdBQUcsQ0FBVixFQUNMO0FBQ0MsUUFBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFaLENBQUo7O0FBTUEsWUFBRyxDQUFDLEtBQUssSUFBVCxFQUNBO0FBQ0MsVUFBQSxJQUFJO0FBQ0o7O0FBTUQsWUFBRyxNQUFNLENBQUMsT0FBUCxDQUFlLENBQWYsS0FBcUIsQ0FBeEIsRUFDQTtBQUNDLGNBQUcsSUFBSCxFQUNBO0FBQ0MsZ0JBQUcsS0FBSCxFQUNBO0FBQ0Msb0JBQU0sb0JBQW9CLElBQXBCLEdBQTJCLEdBQWpDO0FBQ0E7O0FBRUQsWUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFuQjtBQUNBLFlBQUEsWUFBWSxDQUFDLElBQWIsQ0FBaUIsQ0FBRSxDQUFuQjtBQUNBLFlBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFDQSxZQUFBLElBQUksR0FBRyxFQUFQO0FBQ0E7O0FBRUQsVUFBQSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLENBQVA7QUFDQSxVQUFBLENBQUMsSUFBSSxDQUFMO0FBRUEsbUJBQVMsSUFBVDtBQUNBOztBQU1ELGFBQUksSUFBTSxDQUFWLElBQWUsU0FBZixFQUNBO0FBQ0MsVUFBQSxLQUFLLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBWixFQUFrQixTQUFTLENBQUMsQ0FBRCxDQUEzQixDQUFSOztBQUVBLGNBQUcsS0FBSCxFQUNBO0FBQ0MsZ0JBQUcsSUFBSCxFQUNBO0FBQ0Msa0JBQUcsS0FBSCxFQUNBO0FBQ0Msc0JBQU0sb0JBQW9CLElBQXBCLEdBQTJCLEdBQWpDO0FBQ0E7O0FBRUQsY0FBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFuQjtBQUNBLGNBQUEsWUFBWSxDQUFDLElBQWIsQ0FBaUIsQ0FBRSxDQUFuQjtBQUNBLGNBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEI7QUFDQSxjQUFBLElBQUksR0FBRyxFQUFQO0FBQ0E7O0FBRUQsWUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixLQUFuQjtBQUNBLFlBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsVUFBVSxDQUFDLENBQUQsQ0FBNUI7QUFDQSxZQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCO0FBRUEsWUFBQSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFLLENBQUMsTUFBckIsQ0FBUDtBQUNBLFlBQUEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFYO0FBRUEscUJBQVMsSUFBVDtBQUNBO0FBQ0Q7O0FBTUQsUUFBQSxJQUFJLElBQUksQ0FBUjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFMLENBQWUsQ0FBZixDQUFQO0FBQ0EsUUFBQSxDQUFDLElBQUksQ0FBTDtBQUtBOztBQUVELFVBQUcsSUFBSCxFQUNBO0FBQ0MsWUFBRyxLQUFILEVBQ0E7QUFDQyxnQkFBTSxvQkFBb0IsSUFBcEIsR0FBMkIsR0FBakM7QUFDQTs7QUFFRCxRQUFBLGFBQWEsQ0FBQyxJQUFkLENBQW1CLElBQW5CO0FBQ0EsUUFBQSxZQUFZLENBQUMsSUFBYixDQUFpQixDQUFFLENBQW5CO0FBQ0EsUUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixJQUFsQjtBQUVHOztBQUVKLGFBQU87QUFDTixRQUFBLE1BQU0sRUFBRSxhQURGO0FBRU4sUUFBQSxLQUFLLEVBQUUsWUFGRDtBQUdOLFFBQUEsS0FBSyxFQUFFO0FBSEQsT0FBUDtBQUtELEtBM0htQjtBQStIbkIsSUFBQSxNQUFNLEVBQUUsZ0JBQVMsQ0FBVCxFQUFZLGNBQVosRUFDUjtBQUNDLFVBQUksQ0FBSjs7QUFFQSxVQUFHLGNBQWMsWUFBWSxNQUE3QixFQUNBO0FBQ0MsUUFBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxjQUFSLENBQUo7QUFFQSxlQUFPLENBQUMsS0FBSyxJQUFOLElBQWMsS0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQTRCLENBQUMsQ0FBQyxDQUFELENBQTdCLENBQWQsR0FBNEQsQ0FBQyxDQUFDLENBQUQsQ0FBN0QsR0FBd0UsSUFBL0U7QUFDQSxPQUxELE1BT0E7QUFDQyxRQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBRixDQUFVLGNBQVYsQ0FBSjtBQUVBLGVBQU8sQ0FBQyxLQUFLLElBQU4sSUFBYyxLQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsY0FBdkIsQ0FBZCxHQUF1RCxjQUF2RCxHQUF3RSxJQUEvRTtBQUNBO0FBQ0YsS0EvSW1CO0FBbUpuQixJQUFBLE1BQU0sRUFBRSxDQUNQLENBRE8sRUFDSixDQURJLEVBQ0QsQ0FEQyxFQUNFLENBREYsRUFDSyxDQURMLEVBQ1EsQ0FEUixFQUNXLENBRFgsRUFDYyxDQURkLEVBQ2lCLENBRGpCLEVBQ29CLENBRHBCLEVBQ3VCLENBRHZCLEVBQzBCLENBRDFCLEVBQzZCLENBRDdCLEVBQ2dDLENBRGhDLEVBQ21DLENBRG5DLEVBQ3NDLENBRHRDLEVBRVAsQ0FGTyxFQUVKLENBRkksRUFFRCxDQUZDLEVBRUUsQ0FGRixFQUVLLENBRkwsRUFFUSxDQUZSLEVBRVcsQ0FGWCxFQUVjLENBRmQsRUFFaUIsQ0FGakIsRUFFb0IsQ0FGcEIsRUFFdUIsQ0FGdkIsRUFFMEIsQ0FGMUIsRUFFNkIsQ0FGN0IsRUFFZ0MsQ0FGaEMsRUFFbUMsQ0FGbkMsRUFFc0MsQ0FGdEMsRUFHUCxDQUhPLEVBR0osQ0FISSxFQUdELENBSEMsRUFHRSxDQUhGLEVBR0ssQ0FITCxFQUdRLENBSFIsRUFHVyxDQUhYLEVBR2MsQ0FIZCxFQUdpQixDQUhqQixFQUdvQixDQUhwQixFQUd1QixDQUh2QixFQUcwQixDQUgxQixFQUc2QixDQUg3QixFQUdnQyxDQUhoQyxFQUdtQyxDQUhuQyxFQUdzQyxDQUh0QyxFQUlQLENBSk8sRUFJSixDQUpJLEVBSUQsQ0FKQyxFQUlFLENBSkYsRUFJSyxDQUpMLEVBSVEsQ0FKUixFQUlXLENBSlgsRUFJYyxDQUpkLEVBSWlCLENBSmpCLEVBSW9CLENBSnBCLEVBSXVCLENBSnZCLEVBSTBCLENBSjFCLEVBSTZCLENBSjdCLEVBSWdDLENBSmhDLEVBSW1DLENBSm5DLEVBSXNDLENBSnRDLEVBS1AsQ0FMTyxFQUtKLENBTEksRUFLRCxDQUxDLEVBS0UsQ0FMRixFQUtLLENBTEwsRUFLUSxDQUxSLEVBS1csQ0FMWCxFQUtjLENBTGQsRUFLaUIsQ0FMakIsRUFLb0IsQ0FMcEIsRUFLdUIsQ0FMdkIsRUFLMEIsQ0FMMUIsRUFLNkIsQ0FMN0IsRUFLZ0MsQ0FMaEMsRUFLbUMsQ0FMbkMsRUFLc0MsQ0FMdEMsRUFNUCxDQU5PLEVBTUosQ0FOSSxFQU1ELENBTkMsRUFNRSxDQU5GLEVBTUssQ0FOTCxFQU1RLENBTlIsRUFNVyxDQU5YLEVBTWMsQ0FOZCxFQU1pQixDQU5qQixFQU1vQixDQU5wQixFQU11QixDQU52QixFQU0wQixDQU4xQixFQU02QixDQU43QixFQU1nQyxDQU5oQyxFQU1tQyxDQU5uQyxFQU1zQyxDQU50QyxFQU9QLENBUE8sRUFPSixDQVBJLEVBT0QsQ0FQQyxFQU9FLENBUEYsRUFPSyxDQVBMLEVBT1EsQ0FQUixFQU9XLENBUFgsRUFPYyxDQVBkLEVBT2lCLENBUGpCLEVBT29CLENBUHBCLEVBT3VCLENBUHZCLEVBTzBCLENBUDFCLEVBTzZCLENBUDdCLEVBT2dDLENBUGhDLEVBT21DLENBUG5DLEVBT3NDLENBUHRDLEVBUVAsQ0FSTyxFQVFKLENBUkksRUFRRCxDQVJDLEVBUUUsQ0FSRixFQVFLLENBUkwsRUFRUSxDQVJSLEVBUVcsQ0FSWCxFQVFjLENBUmQsRUFRaUIsQ0FSakIsRUFRb0IsQ0FScEIsRUFRdUIsQ0FSdkIsRUFRMEIsQ0FSMUIsRUFRNkIsQ0FSN0IsRUFRZ0MsQ0FSaEMsRUFRbUMsQ0FSbkMsRUFRc0MsQ0FSdEMsRUFTUCxDQVRPLEVBU0osQ0FUSSxFQVNELENBVEMsRUFTRSxDQVRGLEVBU0ssQ0FUTCxFQVNRLENBVFIsRUFTVyxDQVRYLEVBU2MsQ0FUZCxFQVNpQixDQVRqQixFQVNvQixDQVRwQixFQVN1QixDQVR2QixFQVMwQixDQVQxQixFQVM2QixDQVQ3QixFQVNnQyxDQVRoQyxFQVNtQyxDQVRuQyxFQVNzQyxDQVR0QyxFQVVQLENBVk8sRUFVSixDQVZJLEVBVUQsQ0FWQyxFQVVFLENBVkYsRUFVSyxDQVZMLEVBVVEsQ0FWUixFQVVXLENBVlgsRUFVYyxDQVZkLEVBVWlCLENBVmpCLEVBVW9CLENBVnBCLEVBVXVCLENBVnZCLEVBVTBCLENBVjFCLEVBVTZCLENBVjdCLEVBVWdDLENBVmhDLEVBVW1DLENBVm5DLEVBVXNDLENBVnRDLEVBV1AsQ0FYTyxFQVdKLENBWEksRUFXRCxDQVhDLEVBV0UsQ0FYRixFQVdLLENBWEwsRUFXUSxDQVhSLEVBV1csQ0FYWCxFQVdjLENBWGQsRUFXaUIsQ0FYakIsRUFXb0IsQ0FYcEIsRUFXdUIsQ0FYdkIsRUFXMEIsQ0FYMUIsRUFXNkIsQ0FYN0IsRUFXZ0MsQ0FYaEMsRUFXbUMsQ0FYbkMsRUFXc0MsQ0FYdEMsRUFZUCxDQVpPLEVBWUosQ0FaSSxFQVlELENBWkMsRUFZRSxDQVpGLEVBWUssQ0FaTCxFQVlRLENBWlIsRUFZVyxDQVpYLEVBWWMsQ0FaZCxFQVlpQixDQVpqQixFQVlvQixDQVpwQixFQVl1QixDQVp2QixFQVkwQixDQVoxQixFQVk2QixDQVo3QixFQVlnQyxDQVpoQyxFQVltQyxDQVpuQyxFQVlzQyxDQVp0QyxFQWFQLENBYk8sRUFhSixDQWJJLEVBYUQsQ0FiQyxFQWFFLENBYkYsRUFhSyxDQWJMLEVBYVEsQ0FiUixFQWFXLENBYlgsRUFhYyxDQWJkLEVBYWlCLENBYmpCLEVBYW9CLENBYnBCLEVBYXVCLENBYnZCLEVBYTBCLENBYjFCLEVBYTZCLENBYjdCLEVBYWdDLENBYmhDLEVBYW1DLENBYm5DLEVBYXNDLENBYnRDLEVBY1AsQ0FkTyxFQWNKLENBZEksRUFjRCxDQWRDLEVBY0UsQ0FkRixFQWNLLENBZEwsRUFjUSxDQWRSLEVBY1csQ0FkWCxFQWNjLENBZGQsRUFjaUIsQ0FkakIsRUFjb0IsQ0FkcEIsRUFjdUIsQ0FkdkIsRUFjMEIsQ0FkMUIsRUFjNkIsQ0FkN0IsRUFjZ0MsQ0FkaEMsRUFjbUMsQ0FkbkMsRUFjc0MsQ0FkdEMsRUFlUCxDQWZPLEVBZUosQ0FmSSxFQWVELENBZkMsRUFlRSxDQWZGLEVBZUssQ0FmTCxFQWVRLENBZlIsRUFlVyxDQWZYLEVBZWMsQ0FmZCxFQWVpQixDQWZqQixFQWVvQixDQWZwQixFQWV1QixDQWZ2QixFQWUwQixDQWYxQixFQWU2QixDQWY3QixFQWVnQyxDQWZoQyxFQWVtQyxDQWZuQyxFQWVzQyxDQWZ0QyxFQWdCUCxDQWhCTyxFQWdCSixDQWhCSSxFQWdCRCxDQWhCQyxFQWdCRSxDQWhCRixFQWdCSyxDQWhCTCxFQWdCUSxDQWhCUixFQWdCVyxDQWhCWCxFQWdCYyxDQWhCZCxFQWdCaUIsQ0FoQmpCLEVBZ0JvQixDQWhCcEIsRUFnQnVCLENBaEJ2QixFQWdCMEIsQ0FoQjFCLEVBZ0I2QixDQWhCN0IsRUFnQmdDLENBaEJoQyxFQWdCbUMsQ0FoQm5DLEVBZ0JzQyxDQWhCdEMsQ0FuSlc7QUFzS25CLElBQUEsY0FBYyxFQUFFLHdCQUFTLENBQVQsRUFBWSxLQUFaLEVBQ2hCO0FBQ0MsVUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQXJCO0FBRUEsVUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFVBQUYsQ0FBYSxNQUFNLEdBQUcsQ0FBdEIsQ0FBbEI7QUFDQSxVQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsVUFBRixDQUFhLE1BQU0sR0FBRyxDQUF0QixDQUFsQjtBQUVBLGFBQU8sS0FBSyxDQUFDLFNBQUQsQ0FBTCxJQUVBLEtBQUssTUFBTCxDQUFZLFNBQVosTUFBMkIsQ0FGM0IsSUFJQSxLQUFLLE1BQUwsQ0FBWSxTQUFaLE1BQTJCLENBSmxDO0FBTUQ7QUFuTG1CLEdBQXBCO0FDQUEsRUFBQSxPQUFPLENBQUMsSUFBUixHQUFlLEVBQWY7QUFNQSxFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixHQUFzQjtBQUdyQixJQUFBLEtBQUssRUFBRSxpQkFDUDtBQUtDLFdBQUssTUFBTCxHQUFjLENBQ2IsS0FBSyxPQURRLEVBRWIsS0FBSyxJQUZRLEVBR2IsS0FBSyxLQUhRLEVBSWIsS0FBSyxRQUpRLEVBS2IsS0FBSyxJQUxRLEVBTWIsS0FBSyxHQU5RLENBQWQ7QUFTQSxXQUFLLFFBQUwsR0FBZ0IsQ0FDZixLQUFLLFdBRFUsRUFFZixLQUFLLFNBRlUsQ0FBaEI7QUFLQSxXQUFLLFVBQUwsR0FBa0IsQ0FDakIsS0FBSyxNQURZLEVBRWpCLEtBQUssSUFGWSxFQUdqQixLQUFLLEtBSFksQ0FBbEI7QUFNQSxXQUFLLGlCQUFMLEdBQXlCLENBQ3hCLEtBQUssR0FEbUIsRUFFeEIsS0FBSyxLQUZtQixFQUd4QixLQUFLLEdBSG1CLEVBSXhCLEtBQUssR0FKbUIsQ0FBekI7QUFPQSxXQUFLLEVBQUwsR0FBVSxDQUNULEtBQUssRUFESSxFQUVULEtBQUssR0FGSSxDQUFWO0FBTUQsS0ExQ3FCO0FBZ0RyQixJQUFBLFVBQVUsRUFBRSxHQWhEUztBQWlEckIsSUFBQSxXQUFXLEVBQUUsR0FqRFE7QUFrRHJCLElBQUEsVUFBVSxFQUFFLEdBbERTO0FBbURyQixJQUFBLFdBQVcsRUFBRSxHQW5EUTtBQW9EckIsSUFBQSxXQUFXLEVBQUUsR0FwRFE7QUFxRHJCLElBQUEsR0FBRyxFQUFFLEdBckRnQjtBQXNEckIsSUFBQSxFQUFFLEVBQUUsR0F0RGlCO0FBdURyQixJQUFBLE9BQU8sRUFBRSxHQXZEWTtBQXdEckIsSUFBQSxJQUFJLEVBQUUsR0F4RGU7QUF5RHJCLElBQUEsS0FBSyxFQUFFLEdBekRjO0FBMERyQixJQUFBLFFBQVEsRUFBRSxHQTFEVztBQTJEckIsSUFBQSxJQUFJLEVBQUUsR0EzRGU7QUE0RHJCLElBQUEsR0FBRyxFQUFFLEdBNURnQjtBQTZEckIsSUFBQSxNQUFNLEVBQUUsR0E3RGE7QUE4RHJCLElBQUEsV0FBVyxFQUFFLEdBOURRO0FBK0RyQixJQUFBLFNBQVMsRUFBRSxHQS9EVTtBQWdFckIsSUFBQSxPQUFPLEVBQUUsR0FoRVk7QUFpRXJCLElBQUEsRUFBRSxFQUFFLEdBakVpQjtBQWtFckIsSUFBQSxLQUFLLEVBQUUsR0FsRWM7QUFtRXJCLElBQUEsTUFBTSxFQUFFLEdBbkVhO0FBb0VyQixJQUFBLElBQUksRUFBRSxHQXBFZTtBQXFFckIsSUFBQSxLQUFLLEVBQUUsR0FyRWM7QUFzRXJCLElBQUEsS0FBSyxFQUFFLEdBdEVjO0FBdUVyQixJQUFBLEdBQUcsRUFBRSxHQXZFZ0I7QUF3RXJCLElBQUEsS0FBSyxFQUFFLEdBeEVjO0FBeUVyQixJQUFBLEdBQUcsRUFBRSxHQXpFZ0I7QUEwRXJCLElBQUEsR0FBRyxFQUFFLEdBMUVnQjtBQTJFcEIsSUFBQSxlQUFlLEVBQUUsR0EzRUc7QUE0RXBCLElBQUEsUUFBUSxFQUFFLEdBNUVVO0FBNkVyQixJQUFBLEtBQUssRUFBRSxHQTdFYztBQThFckIsSUFBQSxHQUFHLEVBQUUsR0E5RWdCO0FBK0VyQixJQUFBLEtBQUssRUFBRSxHQS9FYztBQWdGckIsSUFBQSxJQUFJLEVBQUUsR0FoRmU7QUFpRnJCLElBQUEsRUFBRSxFQUFFLEdBakZpQjtBQWtGckIsSUFBQSxFQUFFLEVBQUUsR0FsRmlCO0FBbUZyQixJQUFBLEdBQUcsRUFBRSxHQW5GZ0I7QUFvRnJCLElBQUEsR0FBRyxFQUFFLEdBcEZnQjtBQXFGckIsSUFBQSxHQUFHLEVBQUUsR0FyRmdCO0FBc0ZyQixJQUFBLEdBQUcsRUFBRSxHQXRGZ0I7QUF1RnJCLElBQUEsR0FBRyxFQUFFLEdBdkZnQjtBQXdGckIsSUFBQSxRQUFRLEVBQUUsR0F4Rlc7QUE4RnJCLElBQUEsR0FBRyxFQUFFLEdBOUZnQjtBQStGckIsSUFBQSxHQUFHLEVBQUUsR0EvRmdCO0FBZ0dyQixJQUFBLEdBQUcsRUFBRSxHQWhHZ0I7QUFpR3JCLElBQUEsR0FBRyxFQUFFO0FBakdnQixHQUF0QjtBQXdHQSxFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFtQixLQUFuQjs7QUFNQSxFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsU0FBYixHQUF5QixVQUFTLElBQVQsRUFBZSxJQUFmLEVBQXFCO0FBRzdDLFNBQUssT0FBTCxHQUFlLENBQUEsR0FBQSxFQUFNLElBQU4sRUFBWSxJQUFaLEVBQWtCLElBQWxCLENBQWY7QUFJQSxTQUFLLFVBQUwsR0FBa0IsQ0FDakIsSUFEaUIsRUFFakIsS0FGaUIsRUFHakIsTUFIaUIsRUFJakIsT0FKaUIsRUFLakIsT0FMaUIsRUFNakIsS0FOaUIsRUFPakIsSUFQaUIsRUFRakIsU0FSaUIsRUFTakIsTUFUaUIsRUFVakIsT0FWaUIsRUFXakIsVUFYaUIsRUFZakIsTUFaaUIsRUFhakIsS0FiaUIsRUFjakIsS0FkaUIsRUFlakIsSUFmaUIsRUFnQmpCLEtBaEJpQixFQWlCakIsSUFqQmlCLEVBa0JqQixJQWxCaUIsRUFtQmpCLElBbkJpQixFQW9CakIsR0FwQmlCLEVBcUJqQixHQXJCaUIsRUFzQmpCLGdCQXRCaUIsRUF1QmpCLGNBdkJpQixFQXdCakIsU0F4QmlCLEVBeUJqQixJQXpCaUIsRUEwQmpCLElBMUJpQixFQTJCakIsR0EzQmlCLEVBNEJqQixHQTVCaUIsRUE2QmpCLEdBN0JpQixFQThCakIsSUE5QmlCLEVBK0JqQixHQS9CaUIsRUFnQ2pCLElBaENpQixFQWlDakIsR0FqQ2lCLEVBa0NqQixHQWxDaUIsRUFtQ2pCLElBbkNpQixFQW9DakIsR0FwQ2lCLEVBcUNqQixHQXJDaUIsRUFzQ2pCLEdBdENpQixFQXVDakIsR0F2Q2lCLEVBd0NqQixHQXhDaUIsRUF5Q2pCLEdBekNpQixFQTBDakIsR0ExQ2lCLEVBMkNqQixHQTNDaUIsRUE0Q2pCLEdBNUNpQixFQTZDakIsR0E3Q2lCLEVBOENqQixHQTlDaUIsRUErQ2pCLE1BL0NpQixFQWdEakIsT0FoRGlCLEVBaURqQixpQkFqRGlCLEVBa0RqQixTQWxEaUIsRUFtRGpCLGdCQW5EaUIsRUFvRGpCLGdCQXBEaUIsRUFxRGpCLDJCQXJEaUIsQ0FBbEI7QUEwREEsU0FBSyxXQUFMLEdBQW1CLENBQ2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixVQURGLEVBRWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUZGLEVBR2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixVQUhGLEVBSWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUpGLEVBS2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUxGLEVBTWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQU5GLEVBT2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQVBGLEVBUWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixPQVJGLEVBU2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixJQVRGLEVBVWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQVZGLEVBV2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQVhGLEVBWWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixJQVpGLEVBYWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQWJGLEVBY2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQWRGLEVBZWxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQWZGLEVBZ0JsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsTUFoQkYsRUFpQmxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQWpCRixFQWtCbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BbEJGLEVBbUJsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsTUFuQkYsRUFvQmxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQXBCRixFQXFCbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BckJGLEVBc0JsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsV0F0QkYsRUF1QmxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixTQXZCRixFQXdCbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE9BeEJGLEVBeUJsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsRUF6QkYsRUEwQmxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQTFCRixFQTJCbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BM0JGLEVBNEJsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsSUE1QkYsRUE2QmxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQTdCRixFQThCbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBOUJGLEVBK0JsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0EvQkYsRUFnQ2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQWhDRixFQWlDbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBakNGLEVBa0NsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FsQ0YsRUFtQ2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixlQW5DRixFQW9DbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBcENGLEVBcUNsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0FyQ0YsRUFzQ2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQXRDRixFQXVDbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBdkNGLEVBd0NsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsSUF4Q0YsRUF5Q2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQXpDRixFQTBDbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBMUNGLEVBMkNsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0EzQ0YsRUE0Q2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQTVDRixFQTZDbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBN0NGLEVBOENsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0E5Q0YsRUErQ2xCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQS9DRixFQWdEbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBaERGLEVBaURsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFqREYsRUFrRGxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQWxERixFQW1EbEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBbkRGLEVBb0RsQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFwREYsRUFxRGxCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQXJERixDQUFuQjs7QUEwREEsU0FBSSxLQUFKLEdBQWEsVUFBUyxJQUFULEVBQWUsSUFBZixFQUNiO0FBR0MsVUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsUUFBbEIsQ0FDZCxJQURjLEVBRWQsSUFGYyxFQUdkLEtBQUssT0FIUyxFQUlkLEtBQUssVUFKUyxFQUtkLEtBQUssV0FMUyxFQU1kLElBTmMsQ0FBZjtBQVdBLFdBQUssTUFBTCxHQUFjLE1BQU0sQ0FBQyxNQUFyQjtBQUNBLFdBQUssS0FBTCxHQUFhLE1BQU0sQ0FBQyxLQUFwQjtBQUVBLFdBQUssQ0FBTCxHQUFTLENBQVQ7QUFHRCxLQXJCQTs7QUF5QkEsU0FBSyxJQUFMLEdBQVksVUFBUyxDQUFULEVBQ1o7QUFBQSxVQURxQixDQUNyQjtBQURxQixRQUFBLENBQ3JCLEdBRHlCLENBQ3pCO0FBQUE7O0FBQ0MsV0FBSyxDQUFMLElBQVUsQ0FBVjtBQUNELEtBSEE7O0FBT0EsU0FBSyxPQUFMLEdBQWUsWUFDZjtBQUNDLGFBQU8sS0FBSyxDQUFMLElBQVUsS0FBSyxNQUFMLENBQVksTUFBN0I7QUFDRCxLQUhBOztBQU9BLFNBQUssU0FBTCxHQUFpQixZQUNqQjtBQUNDLGFBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxDQUFqQixDQUFQO0FBQ0QsS0FIQTs7QUFPQSxTQUFLLFFBQUwsR0FBZ0IsWUFDaEI7QUFDQyxhQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsQ0FBUDtBQUNELEtBSEE7O0FBT0EsU0FBSyxTQUFMLEdBQWlCLFVBQVMsSUFBVCxFQUNqQjtBQUNDLFVBQUcsS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFMLENBQVksTUFBeEIsRUFDQTtBQUNDLFlBQU0sSUFBSSxHQUFHLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBaEIsQ0FBYjtBQUVBLGVBQVEsSUFBSSxZQUFZLEtBQWpCLEdBQTJCLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBYixLQUFzQixDQUFqRCxHQUF1RCxJQUFJLEtBQUssSUFBdkU7QUFDQTs7QUFFRCxhQUFPLEtBQVA7QUFDRCxLQVZBOztBQWNBLFNBQUksS0FBSixDQUFXLElBQVgsRUFBaUIsSUFBakI7QUFHRCxHQWpNQTs7QUF1TUEsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQWIsR0FBd0IsVUFBUyxJQUFULEVBQWUsSUFBZixFQUFxQjtBQUU1QyxTQUFJLEtBQUosQ0FBVyxJQUFYLEVBQWlCLElBQWpCO0FBQ0QsR0FIQTs7QUFPQSxFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBYixDQUFzQixTQUF0QixHQUFrQztBQUdqQyxJQUFBLEtBQUssRUFBRSxlQUFTLElBQVQsRUFBZSxJQUFmLEVBQ1A7QUFHQyxXQUFLLFNBQUwsR0FBaUIsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLFNBQWpCLENBQ2hCLEtBQUssSUFBTCxHQUFZLElBREksRUFFaEIsS0FBSyxJQUFMLEdBQVksSUFGSSxDQUFqQjtBQU9BLFdBQUssUUFBTCxHQUFnQixLQUFLLG1CQUFMLEVBQWhCOztBQUlBLFVBQUcsS0FBSyxTQUFMLENBQWUsT0FBZixPQUE2QixLQUFoQyxFQUNBO0FBQ0MsY0FBTSx5QkFBeUIsS0FBSyxJQUE5QixHQUFxQyx1QkFBckMsR0FBK0QsS0FBSyxTQUFMLENBQWUsU0FBZixFQUEvRCxHQUE0RixHQUFsRztBQUNBO0FBR0YsS0F4QmlDO0FBNEJqQyxJQUFBLElBQUksRUFBRSxnQkFDTjtBQUNDLGFBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxFQUFQO0FBQ0QsS0EvQmlDO0FBbUNqQyxJQUFBLG1CQUFtQixFQUFFLCtCQUNyQjtBQUNDLFVBQUksSUFBSSxHQUFHLEtBQUssY0FBTCxFQUFYO0FBQUEsVUFBa0MsS0FBbEM7QUFBQSxVQUF5QyxJQUF6Qzs7QUFNQSxhQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLGVBQTdDLENBQU4sRUFDQTtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUDtBQUNBLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLEtBQUssR0FBRyxLQUFLLGNBQUwsRUFBUjtBQUVBLFFBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsUUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBOztBQUlELGFBQU8sSUFBUDtBQUNELEtBM0RpQztBQStEakMsSUFBQSxjQUFjLEVBQUUsMEJBQ2hCO0FBQ0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxlQUFMLEVBQVg7QUFBQSxVQUFtQyxLQUFuQztBQUFBLFVBQTBDLElBQTFDOztBQU1BLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsVUFBN0MsQ0FBTixFQUNBO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFFBQUEsS0FBSyxHQUFHLEtBQUssZUFBTCxFQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0F2RmlDO0FBMkZqQyxJQUFBLGVBQWUsRUFBRSwyQkFDakI7QUFDQyxVQUFJLElBQUksR0FBRyxLQUFLLGNBQUwsRUFBWDtBQUFBLFVBQWtDLEtBQWxDO0FBQUEsVUFBeUMsSUFBekM7O0FBTUEsYUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUE3QyxDQUFOLEVBQ0E7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxjQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFJRCxhQUFPLElBQVA7QUFDRCxLQW5IaUM7QUF1SGpDLElBQUEsY0FBYyxFQUFFLDBCQUNoQjtBQUNDLFVBQUksSUFBSSxHQUFHLEtBQUssZUFBTCxFQUFYO0FBQUEsVUFBbUMsS0FBbkM7QUFBQSxVQUEwQyxJQUExQzs7QUFNQSxhQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFVBQTdDLENBQU4sRUFDQTtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUDtBQUNBLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLEtBQUssR0FBRyxLQUFLLGVBQUwsRUFBUjtBQUVBLFFBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsUUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBOztBQUlELGFBQU8sSUFBUDtBQUNELEtBL0lpQztBQW1KakMsSUFBQSxlQUFlLEVBQUUsMkJBQ2pCO0FBQ0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxlQUFMLEVBQVg7QUFBQSxVQUFtQyxLQUFuQztBQUFBLFVBQTBDLElBQTFDOztBQU1BLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsV0FBN0MsQ0FBTixFQUNBO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFFBQUEsS0FBSyxHQUFHLEtBQUssZUFBTCxFQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0EzS2lDO0FBK0tqQyxJQUFBLGVBQWUsRUFBRSwyQkFDakI7QUFDQyxVQUFJLElBQUksR0FBRyxLQUFLLFFBQUwsRUFBWDtBQUFBLFVBQTRCLEtBQTVCO0FBQUEsVUFBbUMsSUFBbkM7O0FBTUEsYUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUE3QyxDQUFOLEVBQ0E7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxRQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFJRCxhQUFPLElBQVA7QUFDRCxLQXZNaUM7QUEyTWpDLElBQUEsUUFBUSxFQUFFLG9CQUNWO0FBQ0MsVUFBSSxLQUFKLEVBQVcsSUFBWDs7QUFNQSxVQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQTdDLENBQUgsRUFDQTtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUDtBQUNBLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLEtBQUssR0FBRyxLQUFLLFNBQUwsRUFBUjtBQUVBLFFBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsZUFBTyxJQUFQO0FBQ0E7O0FBTUQsYUFBTyxLQUFLLFNBQUwsRUFBUDtBQUNELEtBck9pQztBQXlPakMsSUFBQSxTQUFTLEVBQUUscUJBQ1g7QUFDQyxVQUFJLElBQUksR0FBRyxLQUFLLFdBQUwsRUFBWDtBQUFBLFVBQStCLEtBQS9CO0FBQUEsVUFBc0MsSUFBdEM7QUFBQSxVQUE0QyxJQUE1Qzs7QUFNSyxVQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBQTdDLENBQUgsRUFDTDtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUDtBQUNBLGFBQUssU0FBTCxDQUFlLElBQWY7QUFHQSxRQUFBLElBQUksR0FBRyxJQUFQOztBQUdBLFlBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBN0MsQ0FBSCxFQUNBO0FBQ0MsVUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsZUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFVBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxVQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0E7O0FBRUQsWUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQUE3QyxDQUFILEVBQ0E7QUFDQyxVQUFBLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVI7QUFDQSxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsVUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFVBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQVBELE1BU0E7QUFDQyxnQkFBTSx5QkFBeUIsS0FBSyxJQUE5QixHQUFxQyw2RUFBM0M7QUFDQTs7QUFFRCxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0EsT0FoQ0ksTUFzQ0EsSUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixNQUE3QyxDQUFILEVBQ0w7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxXQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQSxPQVhJLE1BaUJBLElBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFBN0MsQ0FBSCxFQUNMO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFFBQUEsS0FBSyxHQUFHLEtBQUssV0FBTCxFQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0EsT0FYSSxNQWlCQSxJQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE9BQTdDLENBQUgsRUFDTDtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUDtBQUNBLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLEtBQUssR0FBRyxLQUFLLFdBQUwsRUFBUjtBQUVBLFFBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxRQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsUUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBLE9BWEksTUFpQkEsSUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQUE3QyxDQUFILEVBQ0w7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxXQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFNRCxhQUFPLElBQVA7QUFDRCxLQTVWaUM7QUFnV2pDLElBQUEsV0FBVyxFQUFFLHVCQUNiO0FBQ0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxXQUFMLEVBQVg7QUFBQSxVQUErQixLQUEvQjtBQUFBLFVBQXNDLElBQXRDOztBQU1BLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsVUFBN0MsQ0FBTixFQUNBO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFFBQUEsS0FBSyxHQUFHLEtBQUssV0FBTCxFQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0F4WGlDO0FBNFhqQyxJQUFBLFdBQVcsRUFBRSx1QkFDYjtBQUNDLFVBQUksSUFBSSxHQUFHLEtBQUssY0FBTCxFQUFYO0FBQUEsVUFBa0MsS0FBbEM7QUFBQSxVQUF5QyxJQUF6Qzs7QUFNQSxhQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLGlCQUE3QyxDQUFOLEVBQ0E7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxjQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFJRCxhQUFPLElBQVA7QUFDRCxLQXBaaUM7QUF3WmpDLElBQUEsY0FBYyxFQUFFLDBCQUNoQjtBQUNDLFVBQUksS0FBSixFQUFXLElBQVg7O0FBTUEsVUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixVQUE3QyxDQUFILEVBQ0E7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxVQUFMLEVBQVI7QUFFQSxRQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsUUFBQSxJQUFJLENBQUMsU0FBTCxHQUFpQixLQUFqQjtBQUVBLGVBQU8sSUFBUDtBQUNBOztBQU1ELGFBQU8sS0FBSyxVQUFMLEVBQVA7QUFDRCxLQWxiaUM7QUFzYmpDLElBQUEsVUFBVSxFQUFFLHNCQUNaO0FBQ0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxXQUFMLEVBQVg7QUFBQSxVQUErQixLQUEvQjtBQUFBLFVBQXNDLElBQXRDOztBQU1BLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0FBN0MsQ0FBTixFQUNBO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFFBQUEsS0FBSyxHQUFHLEtBQUssV0FBTCxFQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0E5Y2lDO0FBa2RqQyxJQUFBLFdBQVcsRUFBRSx1QkFDYjtBQUNDLFVBQUksSUFBSSxHQUFHLEtBQUssU0FBTCxFQUFYO0FBQUEsVUFBNkIsSUFBN0I7QUFBQSxVQUFtQyxJQUFuQzs7QUFNQSxhQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLElBQTdDLENBQU4sRUFDQTtBQUNDLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLElBQUksR0FBRyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVA7O0FBRUEsYUFBSSxJQUFJLEdBQUcsSUFBWCxFQUFpQixJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBdkQsRUFBNEQsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUF4RTtBQUFnRjtBQUFoRjs7QUFFQSxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsT0FBVixDQUFrQixJQUFsQjtBQUVBLFFBQUEsSUFBSSxHQUFHLElBQVA7QUFDQTs7QUFJRCxhQUFPLElBQVA7QUFDRCxLQTFlaUM7QUE4ZWpDLElBQUEsU0FBUyxFQUFFLG1CQUFTLFFBQVQsRUFDWDtBQUNDLFVBQU0sSUFBSSxHQUFHLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBYjs7QUFFQSxVQUFHLElBQUgsRUFDQTtBQUdDLFlBQUksSUFBSSxHQUFHLElBQVg7O0FBRUEsZUFBTSxJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBNUMsRUFBaUQsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUE3RDtBQUFxRTtBQUFyRTs7QUFJQSxZQUFHLElBQUksQ0FBQyxDQUFSLEVBQ0E7QUFDTSxjQUFHLElBQUksQ0FBQyxRQUFMLEtBQWtCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUF6QyxFQUNMO0FBQ0MsZ0JBQUcsSUFBSSxDQUFDLFNBQUwsSUFBa0IsT0FBTyxDQUFDLE1BQTdCLEVBQ0E7QUFDQyxjQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLG9CQUFvQixJQUFJLENBQUMsU0FBMUM7QUFDQSxhQUhELE1BS0E7QUFDQyxjQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLE9BQXFCLElBQUksQ0FBQyxTQUEzQztBQUNBO0FBQ0QsV0FWSSxNQVdBLElBQUcsSUFBSSxDQUFDLFFBQUwsS0FBa0IsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQXpDLEVBQ0w7QUFDQyxZQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLE9BQXFCLElBQUksQ0FBQyxTQUEzQztBQUNBOztBQUVELFVBQUEsSUFBSSxDQUFDLENBQUwsR0FBUyxLQUFUO0FBQ0E7QUFHRDs7QUFFRCxhQUFPLElBQVA7QUFDRCxLQXJoQmlDO0FBeWhCakMsSUFBQSxTQUFTLEVBQUUsbUJBQVMsUUFBVCxFQUNYO0FBQ0MsVUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFMLENBQWUsUUFBZixDQUFYO0FBQUEsVUFBcUMsS0FBckM7QUFBQSxVQUE0QyxJQUE1Qzs7QUFNQSxhQUFNLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQTdDLENBQU4sRUFDQTtBQUNDLFFBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEdBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxTQUFMLENBQWUsUUFBZixDQUFSO0FBRUEsUUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFFBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxRQUFBLElBQUksR0FBRyxJQUFQO0FBQ0E7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0FqakJpQztBQXFqQmpDLElBQUEsU0FBUyxFQUFFLG1CQUFTLFFBQVQsRUFDWDtBQUNDLFVBQUksSUFBSSxHQUFHLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBWDtBQUFBLFVBQWtDLEtBQWxDO0FBQUEsVUFBeUMsSUFBekM7O0FBTUEsYUFBTSxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUE3QyxDQUFOLEVBQ0E7QUFDQyxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxLQUFLLEdBQUcsS0FBSyxtQkFBTCxFQUFSOztBQUVBLFlBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBN0MsQ0FBSCxFQUNBO0FBQ0MsZUFBSyxTQUFMLENBQWUsSUFBZjtBQUVBLFVBQUEsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBMUMsRUFBK0MsSUFBL0MsQ0FBUDtBQUVBLFVBQUEsSUFBSSxDQUFDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxVQUFBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQWpCO0FBRUEsVUFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBLFNBVkQsTUFZQTtBQUNDLGdCQUFNLHlCQUF5QixLQUFLLElBQTlCLEdBQXFDLGlCQUEzQztBQUNBO0FBQ0Q7O0FBTUQsYUFBTyxJQUFQO0FBQ0QsS0F6bEJpQztBQTZsQmpDLElBQUEsTUFBTSxFQUFFLGdCQUFTLFFBQVQsRUFDUjtBQUNDLFVBQUksSUFBSjs7QUFNQSxVQUFJLElBQUksR0FBRyxLQUFLLFVBQUwsRUFBWCxFQUErQjtBQUM5QixlQUFPLElBQVA7QUFDQTs7QUFFRCxVQUFJLElBQUksR0FBRyxLQUFLLFVBQUwsRUFBWCxFQUErQjtBQUM5QixlQUFPLElBQVA7QUFDQTs7QUFFRCxVQUFJLElBQUksR0FBRyxLQUFLLFdBQUwsRUFBWCxFQUFnQztBQUMvQixlQUFPLElBQVA7QUFDQTs7QUFFRCxVQUFJLElBQUksR0FBRyxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBWCxFQUF3QztBQUN2QyxlQUFPLElBQVA7QUFDQTs7QUFFRCxVQUFJLElBQUksR0FBRyxLQUFLLGFBQUwsRUFBWCxFQUFrQztBQUNqQyxlQUFPLElBQVA7QUFDQTs7QUFNRCxZQUFNLHlCQUF5QixLQUFLLElBQTlCLEdBQXFDLHdDQUEzQztBQUdELEtBaG9CaUM7QUFvb0JqQyxJQUFBLFVBQVUsRUFBRSxzQkFDWjtBQUNDLFVBQUksSUFBSjs7QUFNQSxVQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBQTdDLENBQUgsRUFDQTtBQUNDLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLElBQUksR0FBRyxLQUFLLG1CQUFMLEVBQVA7O0FBRUEsWUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQUE3QyxDQUFILEVBQ0E7QUFDQyxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsaUJBQU8sSUFBUDtBQUNBLFNBTEQsTUFPQTtBQUNDLGdCQUFNLHlCQUF5QixLQUFLLElBQTlCLEdBQXFDLGlCQUEzQztBQUNBO0FBQ0Q7O0FBSUQsYUFBTyxJQUFQO0FBQ0QsS0FqcUJpQztBQXFxQmpDLElBQUEsVUFBVSxFQUFFLHNCQUNaO0FBQ0MsVUFBSSxJQUFKLEVBQVUsSUFBVjs7QUFNQSxVQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQTdDLENBQUgsRUFDQTtBQUNDLGFBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxRQUFBLElBQUksR0FBRyxLQUFLLGNBQUwsRUFBUDs7QUFFQSxZQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQTdDLENBQUgsRUFDQTtBQUNDLGVBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxVQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQTFDLEVBQStDLE9BQS9DLENBQVA7QUFFQSxVQUFBLElBQUksQ0FBQyxJQUFMLEdBQVksSUFBWjtBQUVBLGlCQUFPLElBQVA7QUFDQSxTQVRELE1BV0E7QUFDQyxnQkFBTSx5QkFBeUIsS0FBSyxJQUE5QixHQUFxQyxpQkFBM0M7QUFDQTtBQUNEOztBQUlELGFBQU8sSUFBUDtBQUNELEtBdHNCaUM7QUEwc0JqQyxJQUFBLFdBQVcsRUFBRSx1QkFDYjtBQUNDLFVBQUksSUFBSixFQUFVLElBQVY7O0FBTUEsVUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUE3QyxDQUFILEVBQ0E7QUFDQyxhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsUUFBQSxJQUFJLEdBQUcsS0FBSyxjQUFMLEVBQVA7O0FBRUEsWUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUE3QyxDQUFILEVBQ0E7QUFDQyxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsVUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUExQyxFQUErQyxRQUEvQyxDQUFQO0FBRUEsVUFBQSxJQUFJLENBQUMsSUFBTCxHQUFZLElBQVo7QUFFQSxpQkFBTyxJQUFQO0FBQ0EsU0FURCxNQVdBO0FBQ0MsZ0JBQU0seUJBQXlCLEtBQUssSUFBOUIsR0FBcUMsaUJBQTNDO0FBQ0E7QUFDRDs7QUFJRCxhQUFPLElBQVA7QUFDRCxLQTN1QmlDO0FBK3VCakMsSUFBQSxXQUFXLEVBQUUscUJBQVMsUUFBVCxFQUNiO0FBQ0MsVUFBSSxJQUFKOztBQUVBLFVBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBN0MsQ0FBSCxFQUNBO0FBQ0MsUUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLENBQXRCLEVBQXlCLFFBQVEsR0FBRyxZQUFZLEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBZixHQUE0QyxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQTdFLENBQVA7QUFFQSxRQUFBLElBQUksQ0FBQyxDQUFMLEdBQVMsSUFBVDtBQUVBLGFBQUssU0FBTCxDQUFlLElBQWY7O0FBTUssWUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixFQUE3QyxDQUFILEVBQ0w7QUFDQyxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsVUFBQSxJQUFJLENBQUMsSUFBTCxHQUFZLEtBQUssY0FBTCxFQUFaOztBQUVBLGNBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsRUFBN0MsQ0FBSCxFQUNBO0FBQ0MsaUJBQUssU0FBTCxDQUFlLElBQWY7QUFFQSxZQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUFwQztBQUNBLFdBTEQsTUFPQTtBQUNDLGtCQUFNLHlCQUF5QixLQUFLLElBQTlCLEdBQXFDLGlCQUEzQztBQUNBO0FBQ0QsU0FoQkksTUF1Qkw7QUFDQyxVQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBdkIsR0FDRyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FEL0M7QUFJQSxVQUFBLElBQUksQ0FBQyxJQUFMLEdBQVksRUFBWjtBQUNBOztBQUlELGVBQU8sSUFBUDtBQUNBOztBQUVELGFBQU8sSUFBUDtBQUNELEtBcHlCaUM7QUF3eUJqQyxJQUFBLGNBQWMsRUFBRSwwQkFDaEI7QUFDQyxVQUFNLE1BQU0sR0FBRyxFQUFmOztBQUVBLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsRUFBN0MsTUFBcUQsS0FBM0QsRUFDQTtBQUNDLGFBQUssYUFBTCxDQUFtQixNQUFuQjs7QUFFQSxZQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQTdDLE1BQXdELElBQTNELEVBQ0E7QUFDQyxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQ0EsU0FIRCxNQUtBO0FBQ0M7QUFDQTtBQUNEOztBQUVELGFBQU8sTUFBUDtBQUNELEtBM3pCaUM7QUErekJqQyxJQUFBLGNBQWMsRUFBRSwwQkFDaEI7QUFDQyxVQUFNLE1BQU0sR0FBRyxFQUFmOztBQUVBLGFBQU0sS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBN0MsTUFBc0QsS0FBNUQsRUFDQTtBQUNDLGFBQUssYUFBTCxDQUFtQixNQUFuQjs7QUFFQSxZQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQTdDLE1BQXdELElBQTNELEVBQ0E7QUFDQyxlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQ0EsU0FIRCxNQUtBO0FBQ0M7QUFDQTtBQUNEOztBQUVELGFBQU8sTUFBUDtBQUNELEtBbDFCaUM7QUFzMUJqQyxJQUFBLGFBQWEsRUFBRSx1QkFBUyxNQUFULEVBQ2Y7QUFDQyxNQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBSyxtQkFBTCxFQUFaO0FBQ0QsS0F6MUJpQztBQTYxQmpDLElBQUEsYUFBYSxFQUFFLHVCQUFTLE1BQVQsRUFDZjtBQUNDLFVBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsUUFBN0MsQ0FBSCxFQUNBO0FBQ0MsWUFBTSxHQUFHLEdBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFaO0FBQ0EsYUFBSyxTQUFMLENBQWUsSUFBZjs7QUFFQSxZQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQTdDLENBQUgsRUFDQTtBQUVJLGVBQUssU0FBTCxDQUFlLElBQWY7QUFJSCxVQUFBLE1BQU0sQ0FBQyxHQUFELENBQU4sR0FBYyxLQUFLLG1CQUFMLEVBQWQ7QUFHQSxTQVZELE1BWUE7QUFDQyxnQkFBTSx5QkFBeUIsS0FBSyxJQUE5QixHQUFxQyxpQkFBM0M7QUFDQTtBQUNELE9BcEJELE1Bc0JBO0FBQ0MsY0FBTSx5QkFBeUIsS0FBSyxJQUE5QixHQUFxQyxzQkFBM0M7QUFDQTtBQUNGLEtBeDNCaUM7QUE0M0JqQyxJQUFBLGFBQWEsRUFBRSx5QkFDZjtBQUNDLFVBQUksSUFBSixFQUFVLEtBQVYsRUFBaUIsSUFBakI7O0FBTUEsVUFBRyxLQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQUE3QyxDQUFILEVBQ0E7QUFDQyxRQUFBLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBakIsQ0FBc0IsS0FBSyxTQUFMLENBQWUsUUFBZixFQUF0QixFQUFpRCxLQUFLLFNBQUwsQ0FBZSxTQUFmLEVBQWpELENBQVA7QUFDQSxhQUFLLFNBQUwsQ0FBZSxJQUFmOztBQUVBLFlBQUcsS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0FBN0MsQ0FBSCxFQUNBO0FBQ0MsVUFBQSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWpCLENBQXNCLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBdEIsRUFBaUQsS0FBSyxTQUFMLENBQWUsU0FBZixFQUFqRCxDQUFQO0FBQ0EsZUFBSyxTQUFMLENBQWUsSUFBZjs7QUFFQSxjQUFHLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFFBQTdDLENBQUgsRUFDQTtBQUNDLFlBQUEsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFqQixDQUFzQixLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQXRCLEVBQWlELEtBQUssU0FBTCxDQUFlLFNBQWYsRUFBakQsQ0FBUjtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxJQUFmO0FBRUEsWUFBQSxJQUFJLENBQUMsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFlBQUEsSUFBSSxDQUFDLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxtQkFBTyxJQUFQO0FBQ0E7QUFDRCxTQWZELE1BaUJBO0FBQ0MsaUJBQU8sSUFBUDtBQUNBO0FBQ0Q7O0FBSUQsYUFBTyxJQUFQO0FBQ0Q7QUFsNkJpQyxHQUFsQzs7QUEyNkJBLEVBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFiLEdBQW9CLFVBQVMsUUFBVCxFQUFtQixTQUFuQixFQUE4QjtBQUVqRCxTQUFJLEtBQUosQ0FBVyxRQUFYLEVBQXFCLFNBQXJCO0FBQ0QsR0FIQTs7QUFPQSxFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFrQixTQUFsQixHQUE4QjtBQUc3QixJQUFBLEtBQUssRUFBRSxlQUFTLFFBQVQsRUFBbUIsU0FBbkIsRUFDUDtBQUNDLFdBQUssUUFBTCxHQUFnQixRQUFoQjtBQUNBLFdBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLFdBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUssU0FBTCxHQUFpQixJQUFqQjtBQUNBLFdBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0QsS0FYNkI7QUFlN0IsSUFBQSxLQUFLLEVBQUUsZUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLElBQXZCLEVBQ1A7QUFDQyxVQUFJLEdBQUo7QUFFQSxVQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBRCxDQUFoQjtBQUVBLE1BQUEsS0FBSyxDQUFDLElBQU4sQ0FBVSxXQUFZLEdBQVosR0FBa0IsV0FBbEIsR0FBZ0MsS0FBSyxTQUFMLENBQWUsT0FBZixDQUFzQixJQUF0QixFQUE2QixLQUE3QixDQUFoQyxHQUFzRSxLQUFoRjs7QUFFQSxVQUFHLEtBQUssUUFBUixFQUNBO0FBQ0MsUUFBQSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBRCxDQUFaO0FBQ0EsUUFBQSxLQUFLLENBQUMsSUFBTixDQUFVLFdBQVksR0FBWixHQUFrQixVQUFsQixHQUErQixHQUEvQixHQUFxQyxHQUEvQzs7QUFDQSxhQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLEtBQXBCLEVBQTJCLEtBQTNCLEVBQWtDLElBQWxDO0FBQ0E7O0FBRUQsVUFBRyxLQUFLLFNBQVIsRUFDQTtBQUNDLFFBQUEsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUQsQ0FBWjtBQUNBLFFBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVSxXQUFZLEdBQVosR0FBa0IsVUFBbEIsR0FBK0IsR0FBL0IsR0FBcUMsR0FBL0M7O0FBQ0EsYUFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixLQUFyQixFQUE0QixLQUE1QixFQUFtQyxJQUFuQztBQUNBOztBQUVELFVBQUcsS0FBSyxJQUFSLEVBQ0E7QUFDQyxhQUFJLElBQU0sQ0FBVixJQUFlLEtBQUssSUFBcEIsRUFDQTtBQUNDLFVBQUEsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUQsQ0FBWjtBQUNBLFVBQUEsS0FBSyxDQUFDLElBQU4sQ0FBVSxXQUFZLEdBQVosR0FBa0IsVUFBbEIsR0FBK0IsR0FBL0IsR0FBcUMsWUFBckMsR0FBb0QsQ0FBQyxDQUFDLE9BQUYsQ0FBUyxJQUFULEVBQWdCLEtBQWhCLENBQXBELEdBQTZFLE1BQXZGOztBQUNBLGVBQUssSUFBTCxDQUFVLENBQVYsRUFBYSxLQUFiLENBQW1CLEtBQW5CLEVBQTBCLEtBQTFCLEVBQWlDLElBQWpDO0FBQ0E7QUFDRDs7QUFFRCxVQUFHLEtBQUssSUFBUixFQUNBO0FBQ0MsYUFBSSxJQUFNLEVBQVYsSUFBZSxLQUFLLElBQXBCLEVBQ0E7QUFDQyxVQUFBLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFELENBQVo7QUFDQSxVQUFBLEtBQUssQ0FBQyxJQUFOLENBQVUsV0FBWSxHQUFaLEdBQWtCLFVBQWxCLEdBQStCLEdBQS9CLEdBQXFDLFlBQXJDLEdBQW9ELEVBQUMsQ0FBQyxPQUFGLENBQVMsSUFBVCxFQUFnQixLQUFoQixDQUFwRCxHQUE2RSxNQUF2Rjs7QUFDQSxlQUFLLElBQUwsQ0FBVSxFQUFWLEVBQWEsS0FBYixDQUFtQixLQUFuQixFQUEwQixLQUExQixFQUFpQyxJQUFqQztBQUNBO0FBQ0Q7QUFDRixLQXhENkI7QUE0RDdCLElBQUEsSUFBSSxFQUFFLGdCQUNOO0FBQ0MsVUFBTSxLQUFLLEdBQUcsRUFBZDtBQUNBLFVBQU0sS0FBSyxHQUFHLEVBQWQ7O0FBRUEsV0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixLQUFsQixFQUF5QixDQUFDLENBQUQsQ0FBekI7O0FBRUEsYUFBTyxtQ0FBbUMsS0FBSyxDQUFDLElBQU4sQ0FBVSxJQUFWLENBQW5DLEdBQXNELElBQXRELEdBQTZELEtBQUssQ0FBQyxJQUFOLENBQVUsSUFBVixDQUE3RCxHQUFnRixLQUF2RjtBQUNEO0FBcEU2QixHQUE5QjtBQ3B2Q0EsRUFBQSxPQUFPLENBQUMsSUFBUixHQUFlLEVBQWY7O0FBTUEsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQWIsR0FBd0IsVUFBUyxJQUFULEVBQWU7QUFFdEMsU0FBSSxLQUFKLENBQVcsSUFBWDtBQUNELEdBSEE7O0FBT0EsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQWIsQ0FBc0IsU0FBdEIsR0FBa0M7QUFHakMsSUFBQSxZQUFZLEVBQUUsd0NBSG1CO0FBS2pDLElBQUEsVUFBVSxFQUFFLDJCQUxxQjtBQVNqQyxJQUFBLE1BQU0sRUFBRSxnQkFBUyxDQUFULEVBQ1I7QUFDQyxVQUFJLE1BQU0sR0FBRyxDQUFiO0FBRUEsVUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVo7O0FBRUEsV0FBSSxJQUFJLENBQUMsR0FBRyxDQUFaLEVBQWUsQ0FBQyxHQUFHLENBQW5CLEVBQXNCLENBQUMsRUFBdkIsRUFDQTtBQUNDLFlBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBRCxLQUFTLElBQVosRUFBa0IsTUFBTTtBQUN4Qjs7QUFFRCxhQUFPLE1BQVA7QUFDRCxLQXJCaUM7QUF5QmpDLElBQUEsS0FBSyxFQUFFLGVBQVMsSUFBVCxFQUNQO0FBR0MsVUFBSSxJQUFJLEdBQUcsQ0FBWDtBQUVBLFVBQUksTUFBSjtBQUNBLFVBQUksTUFBSjtBQUlBLFdBQUssUUFBTCxHQUFnQjtBQUNmLFFBQUEsSUFBSSxFQUFFLElBRFM7QUFFZixRQUFBLE9BQU8sRUFBRSxPQUZNO0FBR2YsUUFBQSxVQUFVLEVBQUUsRUFIRztBQUlmLFFBQUEsTUFBTSxFQUFFLENBQUE7QUFDUCxVQUFBLFVBQVUsRUFBRSxPQURMO0FBRVAsVUFBQSxJQUFJLEVBQUU7QUFGQyxTQUFBLENBSk87QUFRZixRQUFBLEtBQUssRUFBRTtBQVJRLE9BQWhCO0FBYUEsVUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLFFBQU4sQ0FBZjtBQUNBLFVBQU0sTUFBTSxHQUFHLENBQUMsYUFBRCxDQUFmO0FBRUEsVUFBSSxJQUFKOztBQUlBLFdBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFMLENBQWEsS0FBSyxVQUFsQixFQUE4QixFQUE5QixDQUFYLEdBQStDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTCxDQUFZLE1BQVosQ0FBdEQsRUFDQTtBQUdDLFlBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFqQixDQUFuQjtBQUNDLFlBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFqQixDQUFsQjtBQUlELFlBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBSyxZQUFoQixDQUFWOztBQUlBLFlBQUcsQ0FBQyxLQUFLLElBQVQsRUFDQTtBQUdDLFVBQUEsSUFBSSxJQUFJLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBUjtBQUlBLFVBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTJCO0FBQzFCLFlBQUEsSUFBSSxFQUFFLElBRG9CO0FBRTFCLFlBQUEsT0FBTyxFQUFFLE9BRmlCO0FBRzFCLFlBQUEsVUFBVSxFQUFFLEVBSGM7QUFJMUIsWUFBQSxNQUFNLEVBQUUsRUFKa0I7QUFLMUIsWUFBQSxLQUFLLEVBQUU7QUFMbUIsV0FBM0I7QUFVQSxjQUFNLE1BQU0sR0FBRyxFQUFmOztBQUVBLGVBQUksSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBNUIsRUFBK0IsQ0FBQyxHQUFHLENBQW5DLEVBQXNDLENBQUMsRUFBdkMsRUFDQTtBQUNNLGdCQUFHLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVSxPQUFWLEtBQXNCLElBQXpCLEVBQ0w7QUFDQyxjQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVcseUJBQVg7QUFDQSxhQUhJLE1BSUEsSUFBRyxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVUsT0FBVixLQUFzQixLQUF6QixFQUNMO0FBQ0UsY0FBQSxNQUFNLENBQUMsSUFBUCxDQUFXLDBCQUFYO0FBQ0Q7QUFDRDs7QUFFRCxjQUFHLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQW5CLEVBQ0E7QUFDQyxrQkFBTSx5QkFBeUIsSUFBekIsR0FBZ0MsS0FBaEMsR0FBd0MsTUFBTSxDQUFDLElBQVAsQ0FBVyxJQUFYLENBQTlDO0FBQ0E7O0FBSUQ7QUFDQTs7QUFJRCxZQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFmO0FBQ0EsWUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBakI7QUFDQSxZQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFwQjtBQUVBLFFBQUEsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFGLEdBQVUsWUFBbkI7QUFDQSxRQUFBLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBRixHQUFVLEtBQUssQ0FBQyxNQUF6QjtBQUVBLFlBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLE1BQWYsQ0FBZDtBQUNBLFlBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLE1BQWYsQ0FBZDtBQUlBLFFBQUEsSUFBSSxJQUFJLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBUjs7QUFJQSxZQUFHLEtBQUgsRUFDQTtBQUNDLFVBQUEsSUFBSSxHQUFHO0FBQ04sWUFBQSxJQUFJLEVBQUUsSUFEQTtBQUVOLFlBQUEsT0FBTyxFQUFFLE9BRkg7QUFHTixZQUFBLFVBQVUsRUFBRSxFQUhOO0FBSU4sWUFBQSxNQUFNLEVBQUUsRUFKRjtBQUtOLFlBQUEsS0FBSyxFQUFFO0FBTEQsV0FBUDtBQVFBLFVBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTRCLElBQTVCO0FBQ0E7O0FBSUQsZ0JBQU8sT0FBUDtBQUlDLGVBQUssT0FBTDtBQUNBLGVBQUssWUFBTDtBQUNBLGVBQUssV0FBTDtBQUNBLGVBQUssVUFBTDtBQUlDOztBQUlELGVBQUssSUFBTDtBQUNBLGVBQUssS0FBTDtBQUNBLGVBQUssU0FBTDtBQUVDLFlBQUEsSUFBSSxHQUFHO0FBQ04sY0FBQSxJQUFJLEVBQUUsSUFEQTtBQUVOLGNBQUEsT0FBTyxFQUFFLE9BRkg7QUFHTixjQUFBLFVBQVUsRUFBRSxVQUhOO0FBSU4sY0FBQSxNQUFNLEVBQUUsRUFKRjtBQUtOLGNBQUEsS0FBSyxFQUFFO0FBTEQsYUFBUDtBQVFBLFlBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTRCLElBQTVCO0FBRUE7O0FBSUQsZUFBSyxJQUFMO0FBQ0EsZUFBSyxLQUFMO0FBRUMsWUFBQSxJQUFJLEdBQUc7QUFDTixjQUFBLElBQUksRUFBRSxJQURBO0FBRU4sY0FBQSxPQUFPLEVBQUUsT0FGSDtBQUdOLGNBQUEsTUFBTSxFQUFFLENBQUE7QUFDUCxnQkFBQSxVQUFVLEVBQUUsVUFETDtBQUVQLGdCQUFBLElBQUksRUFBRTtBQUZDLGVBQUEsQ0FIRjtBQU9OLGNBQUEsS0FBSyxFQUFFO0FBUEQsYUFBUDtBQVVBLFlBQUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQTRCLElBQTVCO0FBRUEsWUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLElBQVo7QUFDQSxZQUFBLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWjtBQUVBOztBQUlELGVBQUssUUFBTDtBQUVDLGdCQUFHLElBQUksQ0FBQSxTQUFBLENBQUosS0FBb0IsSUFBdkIsRUFDQTtBQUNDLG9CQUFNLHlCQUF5QixJQUF6QixHQUFnQyxnQ0FBdEM7QUFDQTs7QUFFRCxZQUFBLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTCxDQUFZLE1BQW5CO0FBRUEsWUFBQSxJQUFJLENBQUMsTUFBTCxDQUFZLElBQVosQ0FBZ0I7QUFDZixjQUFBLFVBQVUsRUFBRSxVQURHO0FBRWYsY0FBQSxJQUFJLEVBQUU7QUFGUyxhQUFoQjtBQUtBLFlBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQWpCLENBQU4sR0FBNEIsSUFBNUI7QUFFQTs7QUFJRCxlQUFLLE1BQUw7QUFFQyxnQkFBRyxJQUFJLENBQUEsU0FBQSxDQUFKLEtBQW9CLElBQXBCLElBRUEsSUFBSSxDQUFBLFNBQUEsQ0FBSixLQUFvQixLQUZ2QixFQUdHO0FBQ0Ysb0JBQU0seUJBQXlCLElBQXpCLEdBQWdDLDhCQUF0QztBQUNBOztBQUVELFlBQUEsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFMLENBQVksTUFBbkI7QUFFQSxZQUFBLElBQUksQ0FBQyxNQUFMLENBQVksSUFBWixDQUFnQjtBQUNmLGNBQUEsVUFBVSxFQUFFLE9BREc7QUFFZixjQUFBLElBQUksRUFBRTtBQUZTLGFBQWhCO0FBS0EsWUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBakIsQ0FBTixHQUE0QixJQUE1QjtBQUVBOztBQUlELGVBQUssT0FBTDtBQUVDLGdCQUFHLElBQUksQ0FBQSxTQUFBLENBQUosS0FBb0IsSUFBdkIsRUFDQTtBQUNDLG9CQUFNLHlCQUF5QixJQUF6QixHQUFnQywrQkFBdEM7QUFDQTs7QUFFRCxZQUFBLE1BQU0sQ0FBQyxHQUFQO0FBQ0EsWUFBQSxNQUFNLENBQUMsR0FBUDtBQUVBOztBQUlELGVBQUssUUFBTDtBQUVDLGdCQUFHLElBQUksQ0FBQSxTQUFBLENBQUosS0FBb0IsS0FBdkIsRUFDQTtBQUNDLG9CQUFNLHlCQUF5QixJQUF6QixHQUFnQyxnQ0FBdEM7QUFDQTs7QUFFRCxZQUFBLE1BQU0sQ0FBQyxHQUFQO0FBQ0EsWUFBQSxNQUFNLENBQUMsR0FBUDtBQUVBOztBQUlEO0FBRUMsa0JBQU0seUJBQXlCLElBQXpCLEdBQWdDLHNCQUFoQyxHQUF5RCxPQUF6RCxHQUFtRSxHQUF6RTtBQS9IRjtBQXFJQTtBQUdGLEtBeFJpQztBQTRSakMsSUFBQSxJQUFJLEVBQUUsZ0JBQ047QUFDQyxhQUFPLElBQUksQ0FBQyxTQUFMLENBQWUsS0FBSyxRQUFwQixFQUE4QixJQUE5QixFQUFvQyxDQUFwQyxDQUFQO0FBQ0Q7QUEvUmlDLEdBQWxDO0FDYkEsRUFBQSxPQUFPLENBQUMsTUFBUixHQUFpQjtBQUdoQixJQUFBLFdBQVcsRUFBRSxzQkFIRztBQU9oQixJQUFBLE9BQU8sRUFBRSxpQkFBUyxNQUFULEVBQWlCLElBQWpCLEVBQXVCLElBQXZCLEVBQWtDLEtBQWxDLEVBQ1Q7QUFBQTs7QUFBQSxVQURnQyxJQUNoQztBQURnQyxRQUFBLElBQ2hDLEdBRHVDLEVBQ3ZDO0FBQUE7O0FBQUEsVUFEMkMsS0FDM0M7QUFEMkMsUUFBQSxLQUMzQyxHQURtRCxFQUNuRDtBQUFBOztBQUNDLFVBQUksQ0FBSjtBQUVBLFVBQUksVUFBSjtBQUVBLFdBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBLGNBQU8sSUFBSSxDQUFDLE9BQVo7QUFNQyxhQUFLLElBQUw7QUFDQTtBQUdDLFlBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxLQUFiLENBQW1CLElBQW5CLENBQXdCLElBQUksQ0FBQyxVQUE3QixFQUF5QyxJQUFJLENBQUMsSUFBOUMsRUFBb0QsSUFBcEQ7QUFJQTtBQUNBOztBQU1ELGFBQUssS0FBTDtBQUNBO0FBR0MsWUFBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBcUIsc0VBQXJCLENBQUo7O0FBRUEsZ0JBQUUsQ0FBRSxDQUFKLEVBQ0E7QUFDQyxvQkFBTSx5QkFBeUIsSUFBSSxDQUFDLElBQTlCLEdBQXFDLDRCQUEzQztBQUNBOztBQUlELGdCQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUssS0FBTCxDQUFVLEdBQVYsQ0FBZDtBQUFBLGdCQUErQixDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFsRDtBQUVBLGdCQUFJLE1BQUosRUFBWSxDQUFaOztBQUVBLGdCQUFHLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBYSxRQUFiLElBRUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxLQUFhLFFBRmhCLEVBR0c7QUFDRyxrQkFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFBa0M7QUFDdEMsZ0JBQUEsTUFBTSxHQUFHLE1BQVQ7QUFDQSxlQUZJLE1BR0EsSUFBRyxPQUFPLE1BQVAsS0FBa0IsV0FBckIsRUFBa0M7QUFDdEMsZ0JBQUEsTUFBTSxHQUFHLE1BQVQ7QUFDQSxlQUZJLE1BR0E7QUFDSixzQkFBTSxnQkFBTjtBQUNBOztBQUVELGNBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQSxhQWZELE1BaUJBO0FBQ0MsY0FBQSxNQUFNLEdBQUcsSUFBVDtBQUVBLGNBQUEsQ0FBQyxHQUFHLENBQUo7QUFDQTs7QUFJRCxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFaLEVBQWUsQ0FBQyxHQUFHLENBQW5CLEVBQXNCLENBQUMsRUFBdkIsRUFDQTtBQUNDLGtCQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBRCxDQUFOLENBQVQsRUFDQTtBQUNDLGdCQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUQsQ0FBTixDQUFmO0FBQ0EsZUFIRCxNQUtBO0FBQ0Msc0JBQU0sMEJBQTBCLElBQUksQ0FBQyxJQUEvQixHQUFzQyxNQUF0QyxHQUErQyxDQUFDLENBQUMsQ0FBRCxDQUFoRCxHQUFzRCxnQkFBNUQ7QUFDQTtBQUNEOztBQUlELFlBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFELENBQU4sQ0FBTixHQUFtQixPQUFPLENBQUMsSUFBUixDQUFhLEtBQWIsQ0FBbUIsSUFBbkIsQ0FBd0IsQ0FBQyxDQUFDLENBQUQsQ0FBekIsRUFBOEIsSUFBSSxDQUFDLElBQW5DLEVBQXlDLElBQXpDLENBQW5CO0FBSUE7QUFDQTs7QUFNRCxhQUFLLE9BQUw7QUFDQTtBQUdDLFlBQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLENBQUMsS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyxXQUF4QixFQUFxQyxVQUFTLEtBQVQsRUFBZ0IsVUFBaEIsRUFBNEI7QUFFNUUsa0JBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFSLENBQWEsS0FBYixDQUFtQixJQUFuQixDQUF3QixVQUF4QixFQUFvQyxJQUFJLENBQUMsSUFBekMsRUFBK0MsSUFBL0MsQ0FBWjtBQUVBLHFCQUFPLEtBQUssS0FBSyxJQUFWLElBQWtCLEtBQUssS0FBSyxTQUE1QixHQUF3QyxLQUF4QyxHQUFnRCxFQUF2RDtBQUNELGFBTFksQ0FBWjtBQVNBO0FBQ0E7O0FBTUQsYUFBSyxJQUFMO0FBQ0EsYUFBSyxPQUFMO0FBQ0E7QUFHQyxZQUFBLElBQUksQ0FBQyxNQUFMLENBQVksS0FBWixDQUFpQixVQUFFLEtBQUYsRUFBWTtBQUU1QixjQUFBLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBbkI7O0FBRUEsa0JBQUcsVUFBVSxLQUFLLE9BQWYsSUFBMEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxLQUFiLENBQW1CLElBQW5CLENBQXdCLFVBQXhCLEVBQW9DLElBQUksQ0FBQyxJQUF6QyxFQUErQyxJQUEvQyxDQUE3QixFQUNBO0FBQ0MscUJBQUksSUFBTSxHQUFWLElBQWUsS0FBSyxDQUFDLElBQXJCLEVBQ0E7QUFDQyxrQkFBQSxLQUFJLENBQUMsT0FBTCxDQUFhLE1BQWIsRUFBcUIsS0FBSyxDQUFDLElBQU4sQ0FBVyxHQUFYLENBQXJCLEVBQW9DLElBQXBDLEVBQTBDLEtBQTFDO0FBQ0E7O0FBRUQsdUJBQU8sS0FBUDtBQUNBOztBQUVELHFCQUFPLElBQVA7QUFDRCxhQWZBO0FBbUJBO0FBQ0E7O0FBTUQsYUFBSyxLQUFMO0FBQ0E7QUFHQyxnQkFBSSxJQUFKO0FBQ0EsZ0JBQUksSUFBSjtBQUNBLGdCQUFJLElBQUo7QUFFQSxZQUFBLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosRUFBZSxVQUFmLENBQTBCLEtBQTFCLENBQStCLHlFQUEvQixDQUFKOztBQUVBLGdCQUFFLENBQUUsQ0FBSixFQUNBO0FBQ0MsY0FBQSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFaLEVBQWUsVUFBZixDQUEwQixLQUExQixDQUErQix3Q0FBL0IsQ0FBSjs7QUFFQSxrQkFBRSxDQUFFLENBQUosRUFDQTtBQUNDLHNCQUFNLHlCQUF5QixJQUFJLENBQUMsSUFBOUIsR0FBcUMsNEJBQTNDO0FBQ0EsZUFIRCxNQUtBO0FBQ0MsZ0JBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFELENBQVI7QUFDQSxnQkFBQSxJQUFJLEdBQUcsSUFBUDtBQUNBLGdCQUFBLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFSO0FBQ0E7QUFDRCxhQWRELE1BZ0JBO0FBQ0MsY0FBQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBUjtBQUNBLGNBQUEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFELENBQVI7QUFDQSxjQUFBLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFSO0FBQ0E7O0FBSUQsZ0JBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFSLENBQWEsS0FBYixDQUFtQixJQUFuQixDQUF3QixJQUF4QixFQUE4QixJQUFJLENBQUMsSUFBbkMsRUFBeUMsSUFBekMsQ0FBbEI7QUFFQSxnQkFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsU0FBL0IsQ0FBakI7QUFJQSxnQkFBSSxTQUFKOztBQUVBLGdCQUFHLFFBQVEsS0FBSyxpQkFBaEIsRUFDQTtBQUNDLGNBQUEsU0FBUyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsT0FBUCxDQUFlLFNBQWYsQ0FBSCxHQUNHLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBWixDQURuQjtBQUdBLGFBTEQsTUFPQTtBQUNDLGNBQUEsU0FBUyxHQUFHLFNBQVo7O0FBRUEsa0JBQUcsUUFBUSxLQUFLLGdCQUFiLElBRUEsUUFBUSxLQUFLLGlCQUZoQixFQUdHO0FBQ0Ysc0JBQU0seUJBQXlCLElBQUksQ0FBQyxJQUE5QixHQUFxQyxnQ0FBM0M7QUFDQTs7QUFFRCxrQkFBRyxJQUFILEVBQ0E7QUFDQyxzQkFBTSx5QkFBeUIsSUFBSSxDQUFDLElBQTlCLEdBQXFDLGlDQUEzQztBQUNBO0FBQ0Q7O0FBSUQsZ0JBQU0sRUFBQyxHQUFHLFNBQVMsQ0FBQyxNQUFwQjs7QUFFQSxnQkFBRyxFQUFDLEdBQUcsQ0FBUCxFQUNBO0FBQ0Msa0JBQUksQ0FBQyxHQUFHLGdCQUFSO0FBRUEsa0JBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLElBQTVCOztBQUVBLGtCQUFHLElBQUgsRUFDQTtBQUdDLG9CQUFNLElBQUksR0FBRyxJQUFJLENBQUUsSUFBRixDQUFqQjtBQUNBLG9CQUFNLElBQUksR0FBRyxJQUFJLENBQUUsSUFBRixDQUFqQjtBQUNBLG9CQUFNLElBQUksR0FBRyxJQUFJLENBQUEsTUFBQSxDQUFqQjtBQUlBLGdCQUFBLElBQUksQ0FBQyxJQUFMLEdBQVk7QUFBQyxrQkFBQSxNQUFNLEVBQUUsRUFBVDtBQUFZLGtCQUFBLE1BQU0sRUFBRSxJQUFJLENBQUEsTUFBQTtBQUF4QixpQkFBWjs7QUFJQSxxRUFBd0IsU0FBeEIsd0NBQ0E7QUFBQTtBQUFBLHNCQURXLEdBQ1g7QUFBQSxzQkFEZ0IsR0FDaEI7QUFDQyxrQkFBQSxJQUFJLENBQUMsSUFBRCxDQUFKLEdBQWEsR0FBYjtBQUNBLGtCQUFBLElBQUksQ0FBQyxJQUFELENBQUosR0FBYSxHQUFiO0FBRUEsa0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEdBQW1CLENBQUMsS0FBTSxJQUFJLENBQTlCO0FBQ0Esa0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFWLEdBQWtCLENBQUMsS0FBTSxFQUFDLEdBQUcsQ0FBN0I7QUFFQSxrQkFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsR0FBc0IsRUFBQyxHQUFHLENBQTFCO0FBQ0Esa0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxNQUFWLEdBQW1CLENBQW5CO0FBQ0Esa0JBQUEsQ0FBQztBQUNELGtCQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsUUFBVixHQUFxQixFQUFDLEdBQUcsQ0FBekI7QUFDQSxrQkFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsR0FBa0IsQ0FBbEI7O0FBRUEsdUJBQUksSUFBTSxFQUFWLElBQWUsSUFBZixFQUNBO0FBQ0MseUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsSUFBSSxDQUFDLEVBQUQsQ0FBekIsRUFBOEIsSUFBOUIsRUFBb0MsS0FBcEM7QUFDQTtBQUNEOztBQUlELGdCQUFBLElBQUksQ0FBQSxNQUFBLENBQUosR0FBZSxJQUFmO0FBQ0EsZ0JBQUEsSUFBSSxDQUFFLElBQUYsQ0FBSixHQUFlLElBQWY7QUFDQSxnQkFBQSxJQUFJLENBQUUsSUFBRixDQUFKLEdBQWUsSUFBZjtBQUdBLGVBekNELE1BMkNBO0FBR0Msb0JBQU0sSUFBSSxHQUFHLElBQUksQ0FBRSxJQUFGLENBQWpCO0FBQ0Esb0JBQU0sS0FBSSxHQUFHLElBQUksQ0FBQSxNQUFBLENBQWpCO0FBSUEsZ0JBQUEsSUFBSSxDQUFDLElBQUwsR0FBWTtBQUFDLGtCQUFBLE1BQU0sRUFBRSxFQUFUO0FBQVksa0JBQUEsTUFBTSxFQUFFLElBQUksQ0FBQSxNQUFBO0FBQXhCLGlCQUFaOztBQUlBLHNFQUFpQixTQUFqQiwyQ0FDQTtBQUFBLHNCQURVLElBQ1Y7QUFDQyxrQkFBQSxJQUFJLENBQUMsSUFBRCxDQUFKLEdBQWEsSUFBYjtBQUVBLGtCQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsS0FBVixHQUFtQixDQUFDLEtBQU0sSUFBSSxDQUE5QjtBQUNBLGtCQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixHQUFrQixDQUFDLEtBQU0sRUFBQyxHQUFHLENBQTdCO0FBRUEsa0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEdBQXNCLEVBQUMsR0FBRyxDQUExQjtBQUNBLGtCQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsTUFBVixHQUFtQixDQUFuQjtBQUNBLGtCQUFBLENBQUM7QUFDRCxrQkFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLFFBQVYsR0FBcUIsRUFBQyxHQUFHLENBQXpCO0FBQ0Esa0JBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFWLEdBQWtCLENBQWxCOztBQUVBLHVCQUFJLElBQU0sR0FBVixJQUFlLElBQWYsRUFDQTtBQUNDLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLElBQUksQ0FBQyxHQUFELENBQXpCLEVBQThCLElBQTlCLEVBQW9DLEtBQXBDO0FBQ0E7QUFDRDs7QUFJRCxnQkFBQSxJQUFJLENBQUEsTUFBQSxDQUFKLEdBQWUsS0FBZjtBQUNBLGdCQUFBLElBQUksQ0FBRSxJQUFGLENBQUosR0FBZSxJQUFmO0FBR0E7QUFDRCxhQXZGRCxNQXlGQTtBQUNDLGtCQUFHLElBQUksQ0FBQyxNQUFMLENBQVksTUFBWixHQUFxQixDQUF4QixFQUNBO0FBQ0Msb0JBQU0sS0FBSSxHQUFHLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLElBQTVCOztBQUVBLHFCQUFJLElBQU0sR0FBVixJQUFlLEtBQWYsRUFDQTtBQUNDLHVCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLEtBQUksQ0FBQyxHQUFELENBQXpCLEVBQThCLElBQTlCLEVBQW9DLEtBQXBDO0FBQ0E7QUFDRDtBQUNEOztBQUlEO0FBQ0E7O0FBTUQsYUFBSyxTQUFMO0FBQ0E7QUFHQyxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQWhCO0FBQUEsZ0JBQTRCLFlBQTVCO0FBQUEsZ0JBQTBDLFlBQTFDOztBQUVLLGdCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBTCxDQUFVLDRCQUFWLENBQVIsRUFDTDtBQUNDLGNBQUEsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFELENBQWQ7QUFDQSxjQUFBLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFoQjtBQUNBLGNBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQSxhQUxJLE1BTUEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVSxxQkFBVixDQUFSLEVBQ0w7QUFDQyxjQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFkO0FBQ0EsY0FBQSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUQsQ0FBaEI7QUFDQSxjQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0EsYUFMSSxNQU1BLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVUsY0FBVixDQUFSLEVBQ0w7QUFDQyxjQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRCxDQUFkO0FBQ0EsY0FBQSxZQUFZLEdBQUcsSUFBZjtBQUNBLGNBQUEsWUFBWSxHQUFHLEtBQWY7QUFDQSxhQUxJLE1BT0w7QUFDQyxjQUFBLFVBQVUsR0FBRyxJQUFiO0FBQ0EsY0FBQSxZQUFZLEdBQUcsSUFBZjtBQUNBLGNBQUEsWUFBWSxHQUFHLElBQWY7QUFDQTs7QUFJRCxnQkFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQVIsQ0FBYSxLQUFiLENBQW1CLElBQW5CLENBQXdCLFVBQXhCLEVBQW9DLElBQUksQ0FBQyxJQUF6QyxFQUErQyxJQUEvQyxLQUF3RCxFQUF6RTs7QUFFQSxnQkFBRyxNQUFNLENBQUMsU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixRQUEvQixNQUE2QyxpQkFBaEQsRUFDQTtBQUNDLG9CQUFNLDBCQUEwQixJQUFJLENBQUMsSUFBL0IsR0FBc0Msb0JBQTVDO0FBQ0E7O0FBSUQsZ0JBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFSLENBQWEsS0FBYixDQUFtQixJQUFuQixDQUF3QixZQUF4QixFQUFzQyxJQUFJLENBQUMsSUFBM0MsRUFBaUQsSUFBakQsS0FBMEQsRUFBNUU7O0FBRUEsZ0JBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsU0FBL0IsTUFBOEMsaUJBQWpELEVBQ0E7QUFDQyxvQkFBTSwwQkFBMEIsSUFBSSxDQUFDLElBQS9CLEdBQXNDLG9CQUE1QztBQUNBOztBQUlELFlBQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsTUFBUixDQUFlLE9BQWYsQ0FDWCxRQURXLEVBRVgsU0FGVyxFQUdYLFlBSFcsRUFJWCxLQUpXLENBQVo7QUFTQTtBQUNBO0FBM1hGO0FBaVlELEtBalpnQjtBQXFaaEIsSUFBQSxNQUFNLEVBQUUsZ0JBQVMsSUFBVCxFQUFlLElBQWYsRUFBMEIsS0FBMUIsRUFDUjtBQUFBLFVBRHVCLElBQ3ZCO0FBRHVCLFFBQUEsSUFDdkIsR0FEOEIsRUFDOUI7QUFBQTs7QUFBQSxVQURrQyxLQUNsQztBQURrQyxRQUFBLEtBQ2xDLEdBRDBDLEVBQzFDO0FBQUE7O0FBQ0MsVUFBTSxNQUFNLEdBQUcsRUFBZjs7QUFFQSxjQUFPLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQVA7QUFFQyxhQUFLLGlCQUFMO0FBQ0MsZUFBSyxPQUFMLENBQWEsTUFBYixFQUFxQixJQUFJLE9BQU8sQ0FBQyxJQUFSLENBQWEsUUFBakIsQ0FBMEIsSUFBMUIsRUFBZ0MsUUFBckQsRUFBK0QsSUFBL0QsRUFBcUUsS0FBckU7O0FBQ0E7O0FBRUQsYUFBSyxpQkFBTDtBQUNDLGVBQUssT0FBTCxDQUFhLE1BQWIsRUFBdUMsSUFBdkMsRUFBK0QsSUFBL0QsRUFBcUUsS0FBckU7O0FBQ0E7QUFSRjs7QUFXQSxhQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVcsRUFBWCxDQUFQO0FBQ0Q7QUFyYWdCLEdBQWpCO0FDQUEsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLEtBQWIsR0FBcUI7QUFHcEIsSUFBQSxJQUFJLEVBQUUsRUFIYztBQU9wQixJQUFBLElBQUksRUFBRSxlQUFTLFVBQVQsRUFBcUIsSUFBckIsRUFBMkIsQ0FBM0IsRUFDTjtBQUdDLFVBQUksQ0FBSjs7QUFFQSxVQUFHLFVBQVUsSUFBSSxLQUFLLElBQXRCLEVBQ0E7QUFDQyxRQUFBLENBQUMsR0FBRyxLQUFLLElBQUwsQ0FBVSxVQUFWLENBQUo7QUFDQSxPQUhELE1BS0E7QUFDQyxRQUFBLENBQUMsR0FBRyxLQUFLLElBQUwsQ0FBVSxVQUFWLElBQXdCLElBQUksQ0FDL0IsT0FBTyxDQUFDLElBQVIsQ0FBYSxXQUFiLENBQXlCLEtBQXpCLENBQ0MsSUFBSSxPQUFPLENBQUMsSUFBUixDQUFhLFFBQWpCLENBQTBCLFVBQTFCLEVBQXNDLElBQXRDLENBREQsQ0FEK0IsQ0FBaEM7QUFLQTs7QUFJRCxVQUFFLENBQUUsQ0FBSixFQUFPLENBQUMsR0FBRyxFQUFKO0FBRVAsYUFBTyxDQUFDLENBQUMsSUFBRixDQUFPLENBQVAsRUFBVSxDQUFWLENBQVA7QUFHRDtBQWpDb0IsR0FBckI7QUNBQSxFQUFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCO0FBS2hCLG1CQUFlLHFCQUFTLENBQVQsRUFDZjtBQUNDLGFBQU8sQ0FBQyxLQUFLLFNBQWI7QUFDRCxLQVJnQjtBQVloQixpQkFBYSxtQkFBUyxDQUFULEVBQ2I7QUFDQyxhQUFPLENBQUMsS0FBSyxTQUFiO0FBQ0QsS0FmZ0I7QUFtQmhCLGNBQVUsZ0JBQVMsQ0FBVCxFQUNWO0FBQ0MsYUFBTyxDQUFDLEtBQUssSUFBYjtBQUNELEtBdEJnQjtBQTBCaEIsaUJBQWEsbUJBQVMsQ0FBVCxFQUNiO0FBQ0MsYUFBTyxDQUFDLEtBQUssSUFBYjtBQUNELEtBN0JnQjtBQWlDaEIsZUFBVyxpQkFBUyxDQUFULEVBQ1g7QUFDQyxVQUFHLENBQUMsS0FBSyxJQUFOLElBRUEsQ0FBQyxLQUFLLEtBRk4sSUFJQSxDQUFDLEtBQUssRUFKVCxFQUtHO0FBQ0YsZUFBTyxJQUFQO0FBQ0E7O0FBRUQsVUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsQ0FBL0IsQ0FBakI7QUFFQSxhQUFRLFFBQVEsS0FBSyxnQkFBYixJQUFpQyxDQUFDLENBQUMsTUFBRixLQUFhLENBQS9DLElBRUMsUUFBUSxLQUFLLGlCQUFiLElBQWtDLE1BQU0sQ0FBQyxJQUFQLENBQVksQ0FBWixFQUFlLE1BQWYsS0FBMEIsQ0FGcEU7QUFJRCxLQWxEZ0I7QUFzRGhCLGdCQUFZLGtCQUFTLENBQVQsRUFDWjtBQUNDLGFBQU8sTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsQ0FBL0IsTUFBc0MsaUJBQTdDO0FBQ0QsS0F6RGdCO0FBNkRoQixnQkFBWSxrQkFBUyxDQUFULEVBQ1o7QUFDQyxhQUFPLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLENBQS9CLE1BQXNDLGlCQUE3QztBQUNELEtBaEVnQjtBQW9FaEIsZUFBVyxpQkFBUyxDQUFULEVBQ1g7QUFDQyxhQUFPLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLENBQS9CLE1BQXNDLGdCQUE3QztBQUNELEtBdkVnQjtBQTJFaEIsZ0JBQVksa0JBQVMsQ0FBVCxFQUNaO0FBQ0MsYUFBTyxNQUFNLENBQUMsU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixDQUEvQixNQUFzQyxpQkFBN0M7QUFDRCxLQTlFZ0I7QUFrRmhCLGtCQUFjLG9CQUFTLENBQVQsRUFDZDtBQUNDLFVBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLENBQS9CLENBQWpCO0FBRUEsYUFBTyxRQUFRLEtBQUssaUJBQWIsSUFFQSxRQUFRLEtBQUssZ0JBRmIsSUFJQSxRQUFRLEtBQUssaUJBSnBCO0FBTUQsS0E1RmdCO0FBZ0doQixjQUFVLGdCQUFTLENBQVQsRUFDVjtBQUNDLGFBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxLQUFvQixDQUFDLENBQUMsR0FBRyxDQUFMLE1BQVksQ0FBdkM7QUFDRCxLQW5HZ0I7QUF1R2hCLGFBQVMsZUFBUyxDQUFULEVBQ1Q7QUFDQyxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBTCxNQUFZLENBQXZDO0FBQ0QsS0ExR2dCO0FBZ0hoQixrQkFBYyxvQkFBUyxDQUFULEVBQVksQ0FBWixFQUNkO0FBQ0MsVUFBRyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEtBRUEsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUZILEVBR0c7QUFDRixlQUFPLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBVixLQUFnQixDQUF2QjtBQUNBOztBQUVELFVBQUcsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFILEVBQ0E7QUFDQyxlQUFPLENBQUMsSUFBSSxDQUFaO0FBQ0E7O0FBRUQsYUFBTyxLQUFQO0FBQ0QsS0EvSGdCO0FBbUloQixpQkFBYSxtQkFBUyxDQUFULEVBQVksRUFBWixFQUFnQixFQUFoQixFQUNiO0FBQ0MsVUFBRyxLQUFLLFFBQUwsQ0FBYyxFQUFkLEtBRUEsS0FBSyxRQUFMLENBQWMsRUFBZCxDQUZILEVBR0c7QUFDRixlQUFlLENBQUMsSUFBa0IsRUFBM0IsSUFFUSxDQUFDLElBQWtCLEVBRmxDO0FBSUE7O0FBRUQsVUFBRyxLQUFLLFFBQUwsQ0FBYyxFQUFkLEtBQXFCLEVBQUUsQ0FBQyxNQUFILEtBQWMsQ0FBbkMsSUFFQSxLQUFLLFFBQUwsQ0FBYyxFQUFkLENBRkEsSUFFcUIsRUFBRSxDQUFDLE1BQUgsS0FBYyxDQUZ0QyxFQUdHO0FBQ0YsZUFBUSxDQUFDLENBQUMsVUFBRixDQUFhLENBQWIsS0FBbUIsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLENBQXBCLElBRUMsQ0FBQyxDQUFDLFVBQUYsQ0FBYSxDQUFiLEtBQW1CLEVBQUUsQ0FBQyxVQUFILENBQWMsQ0FBZCxDQUYzQjtBQUlBOztBQUVELGFBQU8sS0FBUDtBQUNELEtBMUpnQjtBQThKaEIsYUFBUyxlQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLElBQWpCLEVBQ1Q7QUFBQSxVQUQwQixJQUMxQjtBQUQwQixRQUFBLElBQzFCLEdBRGlDLENBQ2pDO0FBQUE7O0FBQ0MsVUFBTSxNQUFNLEdBQUcsRUFBZjs7QUFFSyxVQUFHLEtBQUssUUFBTCxDQUFjLEVBQWQsS0FFQSxLQUFLLFFBQUwsQ0FBYyxFQUFkLENBRkgsRUFHRjtBQUNGLGFBQUksSUFBSSxDQUFDLEdBQVUsRUFBbkIsRUFBOEIsQ0FBQyxJQUFXLEVBQTFDLEVBQXFELENBQUMsSUFBSSxJQUExRCxFQUNBO0FBQ0MsVUFBQSxNQUFNLENBQUMsSUFBUCxDQUFnQyxDQUFoQztBQUNBO0FBQ0QsT0FSSSxNQVNBLElBQUcsS0FBSyxRQUFMLENBQWMsRUFBZCxLQUFxQixFQUFFLENBQUMsTUFBSCxLQUFjLENBQW5DLElBRUEsS0FBSyxRQUFMLENBQWMsRUFBZCxDQUZBLElBRXFCLEVBQUUsQ0FBQyxNQUFILEtBQWMsQ0FGdEMsRUFHRjtBQUNGLGFBQUksSUFBSSxHQUFDLEdBQUcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxDQUFkLENBQVosRUFBOEIsR0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFILENBQWMsQ0FBZCxDQUFuQyxFQUFxRCxHQUFDLElBQUksSUFBMUQsRUFDQTtBQUNDLFVBQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFNLENBQUMsWUFBUCxDQUFvQixHQUFwQixDQUFaO0FBQ0E7QUFDRDs7QUFFRCxhQUFPLE1BQVA7QUFDRCxLQXRMZ0I7QUEwTGhCLHFCQUFpQix1QkFBUyxDQUFULEVBQ2pCO0FBQ0MsVUFBRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEtBRUEsS0FBSyxPQUFMLENBQWEsQ0FBYixDQUZILEVBR0c7QUFDRixlQUFPLENBQUMsQ0FBQyxNQUFUO0FBQ0E7O0FBRUQsVUFBRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQUgsRUFDQTtBQUNDLGVBQU8sTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFaLEVBQWUsTUFBdEI7QUFDQTs7QUFFRCxhQUFPLENBQVA7QUFDRCxLQXpNZ0I7QUE2TWhCLG9CQUFnQixzQkFBUyxDQUFULEVBQ2hCO0FBQ0MsYUFBTyxDQUFDLEtBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsS0FBSyxPQUFMLENBQWEsQ0FBYixDQUFyQixLQUF5QyxDQUFDLENBQUMsTUFBRixHQUFXLENBQXBELEdBQXdELENBQUMsQ0FBQyxZQUFELENBQXpELEdBQTBFLEVBQWpGO0FBQ0QsS0FoTmdCO0FBb05oQixtQkFBZSxxQkFBUyxDQUFULEVBQ2Y7QUFDQyxhQUFPLENBQUMsS0FBSyxRQUFMLENBQWMsQ0FBZCxLQUFvQixLQUFLLE9BQUwsQ0FBYSxDQUFiLENBQXJCLEtBQXlDLENBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBcEQsR0FBd0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFGLEdBQVcsQ0FBWixDQUF6RCxHQUEwRSxFQUFqRjtBQUNELEtBdk5nQjtBQTJOaEIsb0JBQWdCLHNCQUFTLENBQVQsRUFBWSxJQUFaLEVBQWtCLElBQWxCLEVBQ2hCO0FBQ0MsYUFBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEtBQW9CLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBckIsR0FBd0MsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLEVBQWMsSUFBZCxDQUF4QyxHQUE4RCxJQUFyRTtBQUNELEtBOU5nQjtBQWtPaEIsb0JBQWdCLHdCQUNoQjtBQUNDLFVBQUcsU0FBUyxDQUFDLE1BQVYsR0FBbUIsQ0FBdEIsRUFDQTtBQUdDLFlBQUcsS0FBSyxRQUFMLENBQWMsU0FBUyxDQUFDLENBQUQsQ0FBdkIsQ0FBSCxFQUNBO0FBQ0MsY0FBTSxDQUFDLEdBQUcsRUFBVjs7QUFFQSxlQUFJLElBQU0sQ0FBVixJQUFlLFNBQWYsRUFDQTtBQUNDLGdCQUFNLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUF0Qjs7QUFFQSxnQkFBRSxDQUFFLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBSixFQUNBO0FBQ0MscUJBQU8sSUFBUDtBQUNBOztBQUVELFlBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxTQUFTLENBQUMsQ0FBRCxDQUFoQjtBQUNBOztBQUVELGlCQUFPLENBQUMsQ0FBQyxJQUFGLENBQU0sRUFBTixDQUFQO0FBQ0E7O0FBSUQsWUFBRyxLQUFLLE9BQUwsQ0FBYSxTQUFTLENBQUMsQ0FBRCxDQUF0QixDQUFILEVBQ0E7QUFDQyxjQUFNLEVBQUMsR0FBRyxFQUFWOztBQUVBLGVBQUksSUFBTSxHQUFWLElBQWUsU0FBZixFQUNBO0FBQ0MsZ0JBQU0sS0FBSSxHQUFHLFNBQVMsQ0FBQyxHQUFELENBQXRCOztBQUVBLGdCQUFFLENBQUUsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFKLEVBQ0E7QUFDQyxxQkFBTyxJQUFQO0FBQ0E7O0FBRUQsaUJBQUksSUFBTSxDQUFWLElBQWUsS0FBZjtBQUFxQixjQUFBLEVBQUMsQ0FBQyxJQUFGLENBQU8sS0FBSSxDQUFDLENBQUQsQ0FBWDtBQUFyQjtBQUNBOztBQUVELGlCQUFPLEVBQVA7QUFDQTs7QUFJRCxZQUFHLEtBQUssUUFBTCxDQUFjLFNBQVMsQ0FBQyxDQUFELENBQXZCLENBQUgsRUFDQTtBQUNDLGNBQU0sQ0FBQyxHQUFHLEVBQVY7O0FBRUEsZUFBSSxJQUFNLEdBQVYsSUFBZSxTQUFmLEVBQ0E7QUFDQyxnQkFBTSxNQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUQsQ0FBdEI7O0FBRUEsZ0JBQUUsQ0FBRSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQUosRUFDQTtBQUNDLHFCQUFPLElBQVA7QUFDQTs7QUFFRCxpQkFBSSxJQUFNLEdBQVYsSUFBZSxNQUFmO0FBQXFCLGNBQUEsQ0FBQyxDQUFDLEdBQUQsQ0FBRCxHQUFPLE1BQUksQ0FBQyxHQUFELENBQVg7QUFBckI7QUFDQTs7QUFFRCxpQkFBTyxDQUFQO0FBQ0E7QUFHRDs7QUFFRCxhQUFPLElBQVA7QUFDRCxLQXpTZ0I7QUE2U2hCLG1CQUFlLHFCQUFTLENBQVQsRUFDZjtBQUNDLGFBQU8sS0FBSyxPQUFMLENBQWEsQ0FBYixJQUFrQixDQUFDLENBQUMsSUFBRixFQUFsQixHQUE2QixFQUFwQztBQUNELEtBaFRnQjtBQW9UaEIsc0JBQWtCLHdCQUFTLENBQVQsRUFDbEI7QUFDQyxhQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsSUFBa0IsQ0FBQyxDQUFDLE9BQUYsRUFBbEIsR0FBZ0MsRUFBdkM7QUFDRCxLQXZUZ0I7QUEyVGhCLG1CQUFlLHFCQUFTLENBQVQsRUFBWSxHQUFaLEVBQ2Y7QUFDQyxhQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsSUFBa0IsQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLENBQWxCLEdBQWdDLEVBQXZDO0FBQ0QsS0E5VGdCO0FBa1VoQixtQkFBZSxxQkFBUyxDQUFULEVBQ2Y7QUFDQyxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFaLENBQW5CLEdBQW9DLEVBQTNDO0FBQ0QsS0FyVWdCO0FBeVVoQixxQkFBaUIsdUJBQVMsQ0FBVCxFQUFZLEdBQVosRUFDakI7QUFDQyxhQUFPLEtBQUssT0FBTCxDQUFhLENBQWIsSUFBa0IsQ0FBQyxDQUFDLEdBQUYsQ0FBSyxVQUFFLEdBQUY7QUFBQSxlQUFVLEdBQUcsQ0FBQyxHQUFELENBQWI7QUFBQSxPQUFMLENBQWxCLEdBQTZDLEVBQXBEO0FBQ0QsS0E1VWdCO0FBZ1ZoQixvQkFBZ0Isc0JBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxPQUFmLEVBQ2hCO0FBQUEsVUFEK0IsT0FDL0I7QUFEK0IsUUFBQSxPQUMvQixHQUR5QyxFQUN6QztBQUFBOztBQUNJLFVBQU0sTUFBTSxHQUFHLEVBQWY7O0FBRUgsVUFBRyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEtBRUEsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUZILEVBR0c7QUFDRixZQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBWjs7QUFFQSxZQUFHLENBQUMsR0FBRyxDQUFQLEVBQ0E7QUFDQyxjQUFJLElBQUo7QUFFQSxjQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBTCxDQUFVLENBQUMsR0FBRyxDQUFkLElBQW1CLENBQTdCOztBQUVBLGVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBWixFQUFlLENBQUMsR0FBRyxDQUFuQixFQUFzQixDQUFDLElBQUksQ0FBM0IsRUFDQTtBQUNDLFlBQUEsTUFBTSxDQUFDLElBQVAsQ0FBWSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxDQUFSLEVBQVcsQ0FBQyxHQUFHLENBQWYsQ0FBbkI7QUFDQTs7QUFFRCxlQUFJLElBQUksR0FBQyxHQUFHLENBQVosRUFBZSxHQUFDLEdBQUcsQ0FBbkIsRUFBc0IsR0FBQyxJQUFJLENBQTNCLEVBQ0E7QUFDQyxZQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsT0FBVjtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxhQUFPLE1BQVA7QUFDRCxLQTdXZ0I7QUFtWGhCLGtCQUFjLG9CQUFTLEVBQVQsRUFBYSxFQUFiLEVBQ2Q7QUFDQyxVQUFHLEtBQUssUUFBTCxDQUFjLEVBQWQsS0FFQSxLQUFLLFFBQUwsQ0FBYyxFQUFkLENBRkgsRUFHRztBQUNGLFlBQU0sSUFBSSxHQUFHLHFCQUFiO0FBRUEsZUFBTyxFQUFFLENBQUMsT0FBSCxDQUFXLEVBQVgsRUFBZSxJQUFmLE1BQXlCLElBQWhDO0FBQ0E7O0FBRUQsYUFBTyxLQUFQO0FBQ0QsS0EvWGdCO0FBbVloQixnQkFBWSxrQkFBUyxFQUFULEVBQWEsRUFBYixFQUNaO0FBQ0MsVUFBRyxLQUFLLFFBQUwsQ0FBYyxFQUFkLEtBRUEsS0FBSyxRQUFMLENBQWMsRUFBZCxDQUZILEVBR0c7QUFDRixZQUFNLElBQUksR0FBRyxFQUFFLENBQUMsTUFBSCxHQUFZLEVBQUUsQ0FBQyxNQUE1QjtBQUVBLGVBQU8sRUFBRSxDQUFDLE9BQUgsQ0FBVyxFQUFYLEVBQWUsSUFBZixNQUF5QixJQUFoQztBQUNBOztBQUVELGFBQU8sS0FBUDtBQUNELEtBL1lnQjtBQW1aaEIsYUFBUyxlQUFTLENBQVQsRUFBWSxLQUFaLEVBQ1Q7QUFDQyxVQUFHLEtBQUssUUFBTCxDQUFnQixDQUFoQixLQUVBLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FGSCxFQUdHO0FBQ0YsWUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFHLE9BQVIsQ0FBaUIsR0FBakIsQ0FBYjtBQUNBLFlBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxXQUFOLENBQWlCLEdBQWpCLENBQWI7O0FBRUEsWUFBRyxJQUFJLEtBQUssQ0FBVCxJQUFjLElBQUksR0FBRyxJQUF4QixFQUNBO0FBQ0MsY0FDQTtBQUNDLG1CQUFPLElBQUksTUFBSixDQUFXLEtBQUssQ0FBQyxTQUFOLENBQWdCLElBQUksR0FBRyxDQUF2QixFQUEwQixJQUExQixDQUFYLEVBQTRDLEtBQUssQ0FBQyxTQUFOLENBQWdCLElBQUksR0FBRyxDQUF2QixDQUE1QyxFQUF1RSxJQUF2RSxDQUE0RSxDQUE1RSxDQUFQO0FBQ0EsV0FIRCxDQUlBLE9BQU0sR0FBTixFQUNBLENBRUM7QUFDRDtBQUNEOztBQUVELGFBQU8sS0FBUDtBQUNELEtBMWFnQjtBQThhaEIsc0JBQWtCLHdCQUFTLEVBQVQsRUFBYSxFQUFiLEVBQ2xCO0FBQ0MsYUFBTyxFQUFFLElBQUksRUFBTixJQUFZLEVBQW5CO0FBQ0QsS0FqYmdCO0FBcWJoQixvQkFBZ0Isc0JBQVMsQ0FBVCxFQUNoQjtBQUNDLGFBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixDQUFDLENBQUMsV0FBRixFQUFuQixHQUFxQyxFQUE1QztBQUNELEtBeGJnQjtBQTRiaEIsb0JBQWdCLHNCQUFTLENBQVQsRUFDaEI7QUFDQyxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsQ0FBQyxDQUFDLFdBQUYsRUFBbkIsR0FBcUMsRUFBNUM7QUFDRCxLQS9iZ0I7QUFtY2hCLHlCQUFxQiwyQkFBUyxDQUFULEVBQ3JCO0FBQ0MsVUFBRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQUgsRUFDQTtBQUNDLGVBQU8sQ0FBQyxDQUFDLElBQUYsR0FBUyxXQUFULEdBQXVCLE9BQXZCLENBQThCLE1BQTlCLEVBQXVDLFVBQVMsQ0FBVCxFQUFZO0FBRXpELGlCQUFPLENBQUMsQ0FBQyxXQUFGLEVBQVA7QUFDRCxTQUhPLENBQVA7QUFJQTs7QUFFRCxhQUFPLEVBQVA7QUFDRCxLQTljZ0I7QUFrZGhCLG9CQUFnQixzQkFBUyxDQUFULEVBQ2hCO0FBQ0MsVUFBRyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQUgsRUFDQTtBQUNDLGVBQU8sQ0FBQyxDQUFDLElBQUYsR0FBUyxXQUFULEdBQXVCLE9BQXZCLENBQThCLGFBQTlCLEVBQThDLFVBQVMsQ0FBVCxFQUFZO0FBRWhFLGlCQUFPLENBQUMsQ0FBQyxXQUFGLEVBQVA7QUFDRCxTQUhPLENBQVA7QUFJQTs7QUFFRCxhQUFPLEVBQVA7QUFDRCxLQTdkZ0I7QUFpZWhCLG1CQUFlLHFCQUFTLENBQVQsRUFDZjtBQUNDLGFBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixDQUFDLENBQUMsSUFBRixFQUFuQixHQUNtQixFQUQxQjtBQUdELEtBdGVnQjtBQTBlaEIsZ0JBQVksa0JBQVMsQ0FBVCxFQUFZLE9BQVosRUFBcUIsT0FBckIsRUFDWjtBQUNDLFVBQU0sTUFBTSxHQUFHLEVBQWY7QUFFQSxVQUFNLENBQUMsR0FBTSxDQUFILENBQVEsTUFBbEI7QUFDQSxVQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBbEI7QUFDQSxVQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBbEI7O0FBRUEsVUFBRyxDQUFDLElBQUksQ0FBUixFQUNBO0FBQ0MsY0FBTSxnQkFBTjtBQUNBOztBQUVILE1BQUEsSUFBSSxFQUFFLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBWixFQUFlLENBQUMsR0FBRyxDQUFuQixFQUFzQixDQUFDLElBQUksQ0FBM0IsRUFDSjtBQUNDLFlBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFGLENBQVksQ0FBWixDQUFWOztBQUVBLGFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBWixFQUFlLENBQUMsR0FBRyxDQUFuQixFQUFzQixDQUFDLElBQUksQ0FBM0IsRUFDQTtBQUNDLGNBQUcsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxPQUFPLENBQUMsQ0FBRCxDQUFqQixNQUEwQixDQUE3QixFQUNBO0FBQ0MsWUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxDQUFELENBQW5CO0FBRUEsWUFBQSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXLE1BQWhCO0FBRUEscUJBQVMsSUFBVDtBQUNBO0FBQ0Q7O0FBRUQsUUFBQSxNQUFNLENBQUMsSUFBUCxDQUFZLENBQUMsQ0FBQyxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQVo7QUFDQTs7QUFFRCxhQUFPLE1BQU0sQ0FBQyxJQUFQLENBQVcsRUFBWCxDQUFQO0FBQ0QsS0EzZ0JnQjtBQStnQmhCLG9CQUFnQixDQUFBLEdBQUEsRUFBVSxHQUFWLEVBQW9CLEdBQXBCLEVBQTRCLEdBQTVCLENBL2dCQTtBQWdoQmhCLG9CQUFnQixDQUFBLE9BQUEsRUFBVSxRQUFWLEVBQW9CLE1BQXBCLEVBQTRCLE1BQTVCLENBaGhCQTtBQW9oQmhCLHNCQUFrQixDQUFBLElBQUEsRUFBUyxJQUFULEVBQWdCLEdBQWhCLEVBQXVCLElBQXZCLENBcGhCRjtBQXFoQmhCLHNCQUFrQixDQUFBLE1BQUEsRUFBUyxLQUFULEVBQWdCLEtBQWhCLEVBQXVCLE1BQXZCLENBcmhCRjtBQXloQmhCLDBCQUFzQixDQUFBLElBQUEsRUFBUyxJQUFULEVBQWdCLEdBQWhCLENBemhCTjtBQTBoQmhCLDBCQUFzQixDQUFBLE1BQUEsRUFBUyxLQUFULEVBQWdCLEtBQWhCLENBMWhCTjtBQThoQmhCLHFCQUFpQix1QkFBUyxDQUFULEVBQVksSUFBWixFQUNqQjtBQUNDLFVBQUcsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFILEVBQ0E7QUFDQyxnQkFBTyxJQUFJLElBQUksTUFBZjtBQUVDLGVBQUssTUFBTDtBQUNBLGVBQUssV0FBTDtBQUNDLG1CQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBSyxZQUF0QixFQUFvQyxLQUFLLFlBQXpDLENBQVA7O0FBRUQsZUFBSyxJQUFMO0FBQ0EsZUFBSyxRQUFMO0FBQ0MsbUJBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixLQUFLLGNBQXRCLEVBQXNDLEtBQUssY0FBM0MsQ0FBUDs7QUFFRCxlQUFLLE1BQUw7QUFDQyxtQkFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLEtBQUssa0JBQXRCLEVBQTBDLEtBQUssa0JBQS9DLENBQVA7O0FBRUQsZUFBSyxLQUFMO0FBQ0MsbUJBQU8sa0JBQWtCLENBQUMsQ0FBRCxDQUF6Qjs7QUFFRDtBQUNDLG1CQUFPLENBQVA7QUFqQkY7QUFtQkE7O0FBRUQsYUFBTyxFQUFQO0FBQ0QsS0F4akJnQjtBQTRqQmhCLHlCQUFxQiwyQkFBUyxDQUFULEVBQ3JCO0FBQ0MsYUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLGtCQUFrQixDQUFDLENBQUQsQ0FBckMsR0FDbUIsRUFEMUI7QUFHRCxLQWprQmdCO0FBcWtCaEIsb0JBQWdCLHNCQUFTLENBQVQsRUFDaEI7QUFDQyxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsSUFBbUIsQ0FBQyxDQUFDLE9BQUYsQ0FBUyxLQUFULEVBQWlCLE9BQWpCLENBQW5CLEdBQ21CLEVBRDFCO0FBR0QsS0Exa0JnQjtBQThrQmhCLGtCQUFjLG9CQUFTLENBQVQsRUFDZDtBQUNDLGFBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxJQUFtQixDQUFuQixHQUNtQixFQUQxQjtBQUdELEtBbmxCZ0I7QUF1bEJoQixzQkFBa0Isd0JBQVMsQ0FBVCxFQUFZLElBQVosRUFDbEI7QUFDQyxhQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFwQixHQUEwQyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWixDQUFqQixFQUFvQyxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQsQ0FBcEMsQ0FBMUMsR0FDMEMsRUFEakQ7QUFHRCxLQTVsQmdCO0FBZ21CaEIsb0JBQWdCLHNCQUFTLENBQVQsRUFBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQ2hCO0FBQ0MsYUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLElBQW1CLENBQUMsQ0FBQyxLQUFGLENBQVEsR0FBUixFQUFhLEdBQWIsQ0FBbkIsR0FDbUIsRUFEMUI7QUFHRCxLQXJtQmdCO0FBMm1CaEIsa0JBQWMsb0JBQVMsQ0FBVCxFQUNkO0FBQ0MsYUFBTyxJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQsQ0FBUDtBQUNELEtBOW1CZ0I7QUFrbkJoQixvQkFBZ0Isc0JBQVMsQ0FBVCxFQUFZLElBQVosRUFDaEI7QUFDQyxjQUFPLElBQVA7QUFFQyxhQUFLLE1BQUw7QUFDQyxpQkFBTyxJQUFJLENBQUMsSUFBTCxDQUFVLENBQVYsQ0FBUDs7QUFFRCxhQUFLLE9BQUw7QUFDQyxpQkFBTyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FBUDs7QUFFRDtBQUNDLGlCQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBWCxDQUFQO0FBVEY7QUFXRCxLQS9uQmdCO0FBbW9CaEIsV0FBTyxlQUNQO0FBR0MsVUFBTSxJQUFJLEdBQUksU0FBUyxDQUFDLE1BQVYsS0FBcUIsQ0FBdEIsS0FBNkIsS0FBSyxPQUFMLENBQWEsU0FBUyxDQUFDLENBQUQsQ0FBdEIsS0FBOEIsS0FBSyxRQUFMLENBQWMsU0FBUyxDQUFDLENBQUQsQ0FBdkIsQ0FBM0QsSUFBMEYsU0FBUyxDQUFDLENBQUQsQ0FBbkcsR0FDMEYsU0FEdkc7QUFNQSxVQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsaUJBQXBCOztBQUVBLFdBQUksSUFBTSxDQUFWLElBQWUsSUFBZixFQUNBO0FBQ0MsWUFBRSxDQUFFLEtBQUssUUFBTCxDQUFjLElBQUksQ0FBQyxDQUFELENBQWxCLENBQUosRUFDQTtBQUNDLGlCQUFPLE1BQU0sQ0FBQyxHQUFkO0FBQ0E7O0FBRUQsWUFBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUQsQ0FBaEIsRUFDQTtBQUNDLFVBQUEsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFELENBQWI7QUFDQTtBQUNEOztBQUlELGFBQU8sTUFBUDtBQUNELEtBL3BCZ0I7QUFtcUJoQixXQUFPLGVBQ1A7QUFHQyxVQUFNLElBQUksR0FBSSxTQUFTLENBQUMsTUFBVixLQUFxQixDQUF0QixLQUE2QixLQUFLLE9BQUwsQ0FBYSxTQUFTLENBQUMsQ0FBRCxDQUF0QixLQUE4QixLQUFLLFFBQUwsQ0FBYyxTQUFTLENBQUMsQ0FBRCxDQUF2QixDQUEzRCxJQUEwRixTQUFTLENBQUMsQ0FBRCxDQUFuRyxHQUMwRixTQUR2RztBQU1BLFVBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxpQkFBcEI7O0FBRUEsV0FBSSxJQUFNLENBQVYsSUFBZSxJQUFmLEVBQ0E7QUFDQyxZQUFFLENBQUUsS0FBSyxRQUFMLENBQWMsSUFBSSxDQUFDLENBQUQsQ0FBbEIsQ0FBSixFQUNBO0FBQ0MsaUJBQU8sTUFBTSxDQUFDLEdBQWQ7QUFDQTs7QUFFRCxZQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBRCxDQUFoQixFQUNBO0FBQ0MsVUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUQsQ0FBYjtBQUNBO0FBQ0Q7O0FBSUQsYUFBTyxNQUFQO0FBQ0QsS0EvckJnQjtBQXFzQmhCLGNBQVUsZ0JBQVMsQ0FBVCxFQUNWO0FBQ0MsVUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQUwsRUFBVjs7QUFFQSxVQUFHLENBQUgsRUFDQTtBQUNDLFlBQUcsS0FBSyxPQUFMLENBQWEsQ0FBYixLQUVBLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FGSCxFQUdHO0FBQ0QsY0FBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQVAsQ0FBWSxDQUFaLENBQVY7QUFFRCxpQkFBTyxDQUFDLENBQ1AsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQyxDQUFDLE1BQUYsR0FBVyxDQUF0QixDQUFELENBRE0sQ0FBUjtBQUdBOztBQUVELFlBQUcsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFILEVBQ0E7QUFDQyxpQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFDLENBQUMsTUFBRixHQUFXLENBQXRCLENBQUQsQ0FBUjtBQUNBOztBQUVELFlBQUcsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFILEVBQ0E7QUFDQyxpQkFBTyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsR0FBRyxDQUFmLENBQVA7QUFDQTtBQUNEOztBQUVELE1BQUEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxnQkFBWDtBQUVBLGFBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFDLEdBQUcsQ0FBZixDQUFQO0FBQ0QsS0FwdUJnQjtBQTB1QmhCLDBCQUFzQiw0QkFBUyxDQUFULEVBQVksTUFBWixFQUN0QjtBQUNDLGFBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLElBQWxCLEVBQXdCLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBd0IsTUFBeEIsR0FBaUMsQ0FBekQsQ0FBUDtBQUNELEtBN3VCZ0I7QUFpdkJoQiwwQkFBc0IsNEJBQVMsQ0FBVCxFQUFZLElBQVosRUFDdEI7QUFDQyxhQUFPLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxNQUFNLENBQUMsS0FBUCxDQUFhLElBQWIsRUFBbUIsQ0FBbkIsQ0FBaEMsR0FDZ0MsRUFEdkM7QUFHRCxLQXR2QmdCO0FBNHZCaEIsZUFBVyxpQkFBUyxRQUFULEVBQW1CLFNBQW5CLEVBQW1DLFdBQW5DLEVBQXVELGFBQXZELEVBQ1g7QUFBQSxVQUQ4QixTQUM5QjtBQUQ4QixRQUFBLFNBQzlCLEdBRDBDLEVBQzFDO0FBQUE7O0FBQUEsVUFEOEMsV0FDOUM7QUFEOEMsUUFBQSxXQUM5QyxHQUQ0RCxJQUM1RDtBQUFBOztBQUFBLFVBRGtFLGFBQ2xFO0FBRGtFLFFBQUEsYUFDbEUsR0FEa0YsS0FDbEY7QUFBQTs7QUFHQyxVQUFHLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBUixDQUFlLEtBQTlCLEVBQ0E7QUFDQyxZQUFNLElBQUksR0FBRyxFQUFiOztBQUlBLFlBQUcsV0FBSCxFQUNBO0FBQ0MsZUFBSSxJQUFNLENBQVYsSUFBZSxPQUFPLENBQUMsTUFBUixDQUFlLElBQTlCLEVBQ0E7QUFDQyxZQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsQ0FBb0IsQ0FBcEIsQ0FBVjtBQUNBO0FBQ0Q7O0FBSUQsWUFBRyxTQUFILEVBQ0E7QUFDQyxlQUFJLElBQU0sR0FBVixJQUFvQixTQUFwQixFQUNBO0FBQ0MsWUFBQSxJQUFJLENBQUMsR0FBRCxDQUFKLEdBQWUsU0FBUyxDQUFNLEdBQU4sQ0FBeEI7QUFDQTtBQUNEOztBQUlELGVBQU8sT0FBTyxDQUFDLE1BQVIsQ0FBZSxNQUFmLENBQXNCLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixDQUFxQixRQUFyQixDQUF0QixFQUFzRCxJQUF0RCxDQUFQO0FBR0E7O0FBSUQsVUFBRSxDQUFFLGFBQUosRUFDQTtBQUNDLGNBQU0sb0NBQW9DLFFBQXBDLEdBQStDLEdBQXJEO0FBQ0E7O0FBRUQsYUFBTyxFQUFQO0FBR0Q7QUF6eUJnQixHQUFqQjtBQWd6QkEsRUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLFFBQWYsR0FBMEIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxhQUF6QztBQ2h6QkEsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFdBQWIsR0FBMkI7QUFHMUIsSUFBQSxNQUFNLEVBQUUsZ0JBQVMsSUFBVCxFQUNSO0FBQ0MsVUFBSSxDQUFKO0FBQ0EsVUFBSSxDQUFKO0FBQ0EsVUFBSSxJQUFKO0FBQ0EsVUFBSSxLQUFKO0FBQ0EsVUFBSSxRQUFKOztBQUVBLGNBQU8sSUFBSSxDQUFDLFFBQVo7QUFNQyxhQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixHQUF6QjtBQUdDLFVBQUEsQ0FBQyxHQUFHLEVBQUo7O0FBRUEsZUFBSSxJQUFNLENBQVYsSUFBZSxJQUFJLENBQUMsSUFBcEIsRUFDQTtBQUNDLFlBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBaUIsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLElBQUwsQ0FBVSxDQUFWLENBQVosQ0FBakI7QUFDQTs7QUFJRCxpQkFBTyxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU0sR0FBTixDQUFOLEdBQW9CLEdBQTNCOztBQU1ELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQXpCO0FBR0MsVUFBQSxDQUFDLEdBQUcsRUFBSjs7QUFFQSxlQUFJLElBQU0sR0FBVixJQUFlLElBQUksQ0FBQyxJQUFwQixFQUNBO0FBQ0MsWUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLEdBQUMsR0FBRyxHQUFKLEdBQVUsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLElBQUwsQ0FBVSxHQUFWLENBQVosQ0FBakI7QUFDQTs7QUFJRCxpQkFBTyxNQUFNLENBQUMsQ0FBQyxJQUFGLENBQU0sR0FBTixDQUFOLEdBQW9CLEdBQTNCOztBQU1ELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQXpCO0FBR0MsVUFBQSxDQUFDLEdBQUcsRUFBSjs7QUFFQSxlQUFJLElBQU0sR0FBVixJQUFlLElBQUksQ0FBQyxJQUFwQixFQUNBO0FBQ0MsWUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixDQUFaLENBQVA7QUFDQTs7QUFJRCxpQkFBTyxJQUFJLENBQUMsU0FBTCxHQUFpQixHQUFqQixHQUF1QixDQUFDLENBQUMsSUFBRixDQUFNLEdBQU4sQ0FBdkIsR0FBcUMsR0FBNUM7O0FBTUQsYUFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBekI7QUFHQyxVQUFBLENBQUMsR0FBRyxFQUFKOztBQUVBLGVBQUksSUFBTSxJQUFWLElBQWUsSUFBSSxDQUFDLElBQXBCLEVBQ0E7QUFDQyxZQUFBLENBQUMsQ0FBQyxJQUFGLENBQU0sTUFBTyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsQ0FBWixDQUFQLEdBQW1DLEdBQXpDO0FBQ0E7O0FBSUQsaUJBQU8sQ0FBQyxDQUFDLE1BQUYsR0FBVyxDQUFYLEdBQWUsSUFBSSxDQUFDLFNBQUwsR0FBaUIsQ0FBQyxDQUFDLElBQUYsQ0FBTSxFQUFOLENBQWhDLEdBQTZDLElBQUksQ0FBQyxTQUF6RDs7QUFNRCxhQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQUF6QjtBQUVDLGlCQUFPLElBQUksQ0FBQyxTQUFaOztBQU1ELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBQXpCO0FBRUMsVUFBQSxJQUFJLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQVA7O0FBRUEsa0JBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZSxRQUF0QjtBQUVDLGlCQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixPQUF6QjtBQUNDLHFCQUFPLDhCQUE4QixJQUE5QixHQUFxQyxHQUE1Qzs7QUFFRCxpQkFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsSUFBekI7QUFDQyxxQkFBTywyQkFBMkIsSUFBM0IsR0FBa0MsR0FBekM7O0FBRUQsaUJBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQXpCO0FBQ0MscUJBQU8sNEJBQTRCLElBQTVCLEdBQW1DLEdBQTFDOztBQUVELGlCQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixRQUF6QjtBQUNDLHFCQUFPLCtCQUErQixJQUEvQixHQUFzQyxHQUE3Qzs7QUFFRCxpQkFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsSUFBekI7QUFDQyxxQkFBTywyQkFBMkIsSUFBM0IsR0FBa0MsR0FBekM7O0FBRUQsaUJBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEdBQXpCO0FBQ0MscUJBQU8sMEJBQTBCLElBQTFCLEdBQWlDLEdBQXhDOztBQUVEO0FBQ0Msb0JBQU0sZ0JBQU47QUFyQkY7O0FBNEJELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEVBQXpCO0FBRUMsY0FBRyxJQUFJLENBQUMsU0FBTCxDQUFlLFFBQWYsS0FBNEIsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQW5ELEVBQ0E7QUFDQyxZQUFBLElBQUksR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsUUFBakIsQ0FBUDtBQUNBLFlBQUEsS0FBSyxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxTQUFqQixDQUFSO0FBRUEsbUJBQU8sK0JBQStCLElBQS9CLEdBQXNDLEdBQXRDLEdBQTRDLEtBQTVDLEdBQW9ELEdBQTNEO0FBQ0EsV0FORCxNQVFBO0FBQ0MsWUFBQSxDQUFDLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQUo7QUFFQSxZQUFBLElBQUksR0FBRyxJQUFJLENBQUMsU0FBTCxDQUFlLFFBQWYsQ0FBd0IsU0FBL0I7QUFDQSxZQUFBLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBTCxDQUFlLFNBQWYsQ0FBeUIsU0FBakM7QUFFQSxtQkFBTyw4QkFBOEIsQ0FBOUIsR0FBa0MsR0FBbEMsR0FBd0MsSUFBeEMsR0FBK0MsR0FBL0MsR0FBcUQsS0FBckQsR0FBNkQsR0FBcEU7QUFDQTs7QUFNRixhQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUF6QjtBQUVDLFVBQUEsSUFBSSxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxRQUFqQixDQUFQO0FBQ0EsVUFBQSxLQUFLLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFNBQWpCLENBQVI7QUFFQSxpQkFBTywrQkFBK0IsSUFBL0IsR0FBc0MsR0FBdEMsR0FBNEMsS0FBNUMsR0FBb0QsR0FBM0Q7O0FBTUQsYUFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsU0FBekI7QUFFQyxVQUFBLElBQUksR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsUUFBakIsQ0FBUDtBQUNBLFVBQUEsS0FBSyxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxTQUFqQixDQUFSO0FBRUEsaUJBQU8sNkJBQTZCLElBQTdCLEdBQW9DLEdBQXBDLEdBQTBDLEtBQTFDLEdBQWtELEdBQXpEOztBQU1ELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE9BQXpCO0FBRUMsVUFBQSxJQUFJLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQVA7QUFDQSxVQUFBLEtBQUssR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsU0FBakIsQ0FBUjtBQUVBLGlCQUFPLDBCQUEwQixJQUExQixHQUFpQyxHQUFqQyxHQUF1QyxLQUF2QyxHQUErQyxHQUF0RDs7QUFNRCxhQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixLQUF6QjtBQUVDLFVBQUEsSUFBSSxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxRQUFqQixDQUFQO0FBQ0EsVUFBQSxLQUFLLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFNBQWpCLENBQVI7QUFFQSxpQkFBTywwQkFBMEIsSUFBMUIsR0FBaUMsR0FBakMsR0FBdUMsS0FBdkMsR0FBK0MsR0FBdEQ7O0FBTUQsYUFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBekI7QUFFQyxVQUFBLElBQUksR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsUUFBakIsQ0FBUDtBQUNBLFVBQUEsS0FBSyxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxTQUFqQixDQUFSOztBQUVBLGNBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLE1BQXNCLEdBQXpCLEVBQ0E7QUFDQyxtQkFBTyxJQUFJLEdBQUcsR0FBUCxHQUFhLEtBQXBCO0FBQ0EsV0FIRCxNQUtBO0FBQ0MsbUJBQU8sSUFBSSxHQUFHLEdBQVAsR0FBYSxLQUFiLEdBQXFCLEdBQTVCO0FBQ0E7O0FBTUYsYUFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsS0FBekI7QUFFQyxVQUFBLElBQUksR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsUUFBakIsQ0FBUDtBQUNBLFVBQUEsS0FBSyxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxTQUFqQixDQUFSO0FBRUEsaUJBQU8sZ0JBQWdCLElBQWhCLEdBQXVCLEdBQXZCLEdBQTZCLEtBQTdCLEdBQXFDLEdBQTVDOztBQU1ELGFBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLEtBQXpCO0FBRUMsVUFBQSxJQUFJLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQVA7QUFDQSxVQUFBLEtBQUssR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsU0FBakIsQ0FBUjtBQUVBLGlCQUFPLGNBQWMsSUFBZCxHQUFxQixHQUFyQixHQUEyQixLQUEzQixHQUFtQyxHQUExQzs7QUFNRCxhQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixlQUF6QjtBQUVDLFVBQUEsSUFBSSxHQUFHLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxRQUFqQixDQUFQO0FBQ0EsVUFBQSxLQUFLLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFNBQWpCLENBQVI7QUFFQSxpQkFBTyxPQUFPLElBQVAsR0FBYyxRQUFkLEdBQXlCLEtBQXpCLEdBQWlDLElBQXhDOztBQUlEO0FBS0MsY0FBRyxJQUFJLENBQUMsUUFBTCxLQUFrQixJQUFsQixJQUVBLElBQUksQ0FBQyxTQUFMLEtBQW1CLElBRnRCLEVBR0c7QUFDRixZQUFBLFFBQVEsR0FBSSxJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBdkMsR0FBOEMsSUFBSSxDQUFDLFNBQW5ELEdBQStELEdBQTFFO0FBRUEsbUJBQU8sUUFBUSxHQUFHLEdBQVgsR0FBaUIsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFNBQWpCLENBQWpCLEdBQStDLEdBQXREO0FBQ0E7O0FBRUQsY0FBRyxJQUFJLENBQUMsUUFBTCxLQUFrQixJQUFsQixJQUVBLElBQUksQ0FBQyxTQUFMLEtBQW1CLElBRnRCLEVBR0c7QUFDRixZQUFBLFFBQVEsR0FBSSxJQUFJLENBQUMsUUFBTCxLQUFrQixPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsR0FBdkMsR0FBOEMsSUFBSSxDQUFDLFNBQW5ELEdBQStELEdBQTFFO0FBRUEsbUJBQU8sTUFBTSxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsUUFBakIsQ0FBTixHQUFtQyxHQUFuQyxHQUF5QyxRQUFoRDtBQUNBOztBQU1ELGNBQUcsSUFBSSxDQUFDLFFBQUwsS0FBa0IsSUFBbEIsSUFFQSxJQUFJLENBQUMsU0FBTCxLQUFtQixJQUZ0QixFQUdHO0FBQ0Ysb0JBQU8sSUFBSSxDQUFDLFFBQVo7QUFJQyxtQkFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsVUFBekI7QUFDQyxnQkFBQSxRQUFRLEdBQUcsSUFBWDtBQUNBOztBQUlELG1CQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUF6QjtBQUNDLGdCQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0E7O0FBSUQsbUJBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLFVBQXpCO0FBQ0MsZ0JBQUEsUUFBUSxHQUFHLEdBQVg7QUFDQTs7QUFJRCxtQkFBSyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FBb0IsV0FBekI7QUFDQyxnQkFBQSxRQUFRLEdBQUcsR0FBWDtBQUNBOztBQUlELG1CQUFLLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBYixDQUFvQixXQUF6QjtBQUNDLGdCQUFBLFFBQVEsR0FBRyxHQUFYO0FBQ0E7O0FBSUQsbUJBQUssT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQW9CLE1BQXpCO0FBQ0MsZ0JBQUEsUUFBUSxHQUFHLEdBQVg7QUFDQTs7QUFJRDtBQUNDLGdCQUFBLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBaEI7QUFDQTtBQTFDRjs7QUErQ0EsWUFBQSxJQUFJLEdBQUcsS0FBSyxNQUFMLENBQVksSUFBSSxDQUFDLFFBQWpCLENBQVA7QUFDQSxZQUFBLEtBQUssR0FBRyxLQUFLLE1BQUwsQ0FBWSxJQUFJLENBQUMsU0FBakIsQ0FBUjtBQUVBLG1CQUFPLE1BQU0sSUFBTixHQUFhLFFBQWIsR0FBd0IsS0FBeEIsR0FBZ0MsR0FBdkM7QUFDQTs7QUE1VEg7QUFrVUQsS0E3VTBCO0FBaVYxQixJQUFBLEtBQUssRUFBRSxlQUFTLElBQVQsRUFDUDtBQUNDLGFBQU8sMkJBQTJCLEtBQUssTUFBTCxDQUFZLElBQUksQ0FBQyxRQUFqQixDQUEzQixHQUF3RCxNQUEvRDtBQUNELEtBcFYwQjtBQXdWMUIsSUFBQSxJQUFJLEVBQUUsZUFBUyxJQUFULEVBQWUsQ0FBZixFQUNOO0FBQ0MsVUFBRSxDQUFFLENBQUosRUFBTyxDQUFDLEdBQUcsRUFBSjtBQUVQLGFBQU8sSUFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBRCxDQUFKLENBQXVCLElBQXZCLENBQTRCLENBQTVCLEVBQStCLENBQS9CLENBQVA7QUFDRDtBQTdWMEIsR0FBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC17e1lFQVJ9fSBDTlJTIC8gTFBTQ1xuICpcbiAqIFRoaXMgZmlsZSBtdXN0IGJlIHVzZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQzpcbiAqIGh0dHA6Ly93d3cuY2VjaWxsLmluZm8vbGljZW5jZXMvTGljZW5jZV9DZUNJTEwtQ19WMS1lbi5odG1sXG4gKiBodHRwOi8vd3d3LmNlY2lsbC5pbmZvL2xpY2VuY2VzL0xpY2VuY2VfQ2VDSUxMLUNfVjEtZnIuaHRtbFxuICpcbiAqL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjIuMCdcbn07XG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbntcblx0d2luZG93LmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJylcbntcblx0Z2xvYmFsLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHRcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDT1VOVCBMSU5FUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRUdFWEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFTUFJTklORyBDSEFSQUNURVJFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0aWYod29yZClcblx0XHR7XG5cdFx0XHRpZihlcnJvcilcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcbi8qXHRcdFx0d29yZCA9ICcnO1xuICovXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnM6IHJlc3VsdF90b2tlbnMsXG5cdFx0XHR0eXBlczogcmVzdWx0X3R5cGVzLFxuXHRcdFx0bGluZXM6IHJlc3VsdF9saW5lcyxcblx0XHR9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbG51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJFQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG4gXHRET1VCTEVfUVVFU1RJT046IDEyNyxcbiBcdFFVRVNUSU9OOiAxMjgsXG5cdENPTE9OOiAxMjksXG5cdERPVDogMTMwLFxuXHRDT01NQTogMTMxLFxuXHRQSVBFOiAxMzIsXG5cdExQOiAxMzMsXG5cdFJQOiAxMzQsXG5cdExCMTogMTM1LFxuXHRSQjE6IDEzNixcblx0TEIyOiAxMzcsXG5cdFJCMjogMTM4LFxuXHRTSUQ6IDEzOSxcblx0VEVSTUlOQUw6IDE0MCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWSVJUVUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlbkRlZnMgPSBbXG5cdFx0J29yJyxcblx0XHQnYW5kJyxcblx0XHQnYi1vcicsXG5cdFx0J2IteG9yJyxcblx0XHQnYi1hbmQnLFxuXHRcdCdub3QnLFxuXHRcdCdpcycsXG5cdFx0J2RlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnZW1wdHknLFxuXHRcdCdpdGVyYWJsZScsXG5cdFx0J2V2ZW4nLFxuXHRcdCdvZGQnLFxuXHRcdCc9PT0nLFxuXHRcdCc9PScsXG5cdFx0JyE9PScsXG5cdFx0JyE9Jyxcblx0XHQnPD0nLFxuXHRcdCc+PScsXG5cdFx0JzwnLFxuXHRcdCc+Jyxcblx0XHQvXnN0YXJ0c1xccyt3aXRoLyxcblx0XHQvXmVuZHNcXHMrd2l0aC8sXG5cdFx0J21hdGNoZXMnLFxuXHRcdCdpbicsXG5cdFx0Jy4uJyxcblx0XHQnficsXG5cdFx0JysnLFxuXHRcdCctJyxcblx0XHQnKionLFxuXHRcdCcqJyxcblx0XHQnLy8nLFxuXHRcdCcvJyxcblx0XHQnJScsXG5cdFx0Jz8/Jyxcblx0XHQnPycsXG5cdFx0JzonLFxuXHRcdCcuJyxcblx0XHQnLCcsXG5cdFx0J3wnLFxuXHRcdCcoJyxcblx0XHQnKScsXG5cdFx0J1snLFxuXHRcdCddJyxcblx0XHQneycsXG5cdFx0J30nLFxuXHRcdCd0cnVlJyxcblx0XHQnZmFsc2UnLFxuXHRcdC9eWzAtOV0rXFwuWzAtOV0rLyxcblx0XHQvXlswLTldKy8sXG5cdFx0L14nKFxcXFwnfFteJ10pKicvLFxuXHRcdC9eXCIoXFxcXFwifFteXCJdKSpcIi8sXG5cdFx0L15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSovLFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QSVBFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTFAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5zID0gcmVzdWx0LnRva2Vucztcblx0XHR0aGlzLnR5cGVzID0gcmVzdWx0LnR5cGVzO1xuXG5cdFx0dGhpcy5pID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pID49IHRoaXMudG9rZW5zLmxlbmd0aDtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSlcblx0e1xuXHRcdGlmKHRoaXMuaSA8IHRoaXMudG9rZW5zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRjb25zdCBUWVBFID0gdGhpcy50eXBlc1t0aGlzLmldO1xuXG5cdFx0XHRyZXR1cm4gKHR5cGUgaW5zdGFuY2VvZiBBcnJheSkgPyAodHlwZS5pbmRleE9mKFRZUEUpID49IDApIDogKHR5cGUgPT09IFRZUEUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5pc0VtcHR5KCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdW5leHBlY3RlZCB0b2tlbiBgJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpICsgJ2AnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTnVsbENvYWxlc2Npbmc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOdWxsQ29hbGVzY2luZyA6IExvZ2ljYWxPciAoJz8/JyBMb2dpY2FsT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbEFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZU9yIDogQml0d2lzZVhvciAoJ2Itb3InIEJpdHdpc2VYb3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VOb3QoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTm90KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE5vdCA6ICdub3QnIENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICB8IENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQ29tcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQWRkU3ViKCksIHJpZ2h0LCBub2RlLCBzd2FwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXHRcdFx0c3dhcCA9IG5vZGU7XG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gc3dhcDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVNfWFhYKSlcblx0XHRcdHtcblx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0c3dhcC5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdHN3YXAubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwga2V5d29yZCBgZGVmaW5lZGAsIGBudWxsYCwgYGVtcHR5YCwgYGl0ZXJhYmxlYCwgYGV2ZW5gIG9yIGBvZGRgIGV4cGVjdGVkJztcblx0XHRcdH1cblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5YWFhfV0lUSCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklOKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTXVsRGl2OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VQbHVzTWludXMoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1VTF9GTERJVl9ESVZfTU9EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBsdXNNaW51cyA6ICgnLScgfCAnKycpIFBvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICAgIHwgRG90MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUG93ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUZpbHRlcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQb3dlciA6IEZpbHRlciAoJyoqJyBGaWx0ZXIpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRmlsdGVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogRG90MSAoJ3wnIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCk7XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MTogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRjb25zdCBub2RlID0gdGhpcy5wYXJzZURvdDIoaXNGaWx0ZXIpO1xuXG5cdFx0aWYobm9kZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGV0IHRlbXAgPSBub2RlO1xuXG5cdFx0XHRmb3IoOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDM6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlWChpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDMgOiBYICgnWycgTnVsbENvYWxlc2NpbmcgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgfCBYICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlWDogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlR3JvdXAoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUFycmF5KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VPYmplY3QoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUZ1blZhcihpc0ZpbHRlcikpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VUZXJtaW5hbCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHN5bnRheCBlcnJvciBvciB0dW5jYXRlZCBleHByZXNzaW9uJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdyb3VwIDogJygnIE51bGxDb2FsZXNjaW5nICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFycmF5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgbGlzdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuTFNULCAnQXJyYXknKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBsaXN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogT2JqZWN0IDogJ3snIERvdWJsZXRzICd9JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJYKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VTaW5nbGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGA6YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHRlcm1pbmFsIGV4cGVjdGVkJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKSB7XG5cblx0dGhpcy4kaW5pdChub2RlVHlwZSwgbm9kZVZhbHVlKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wOiBmdW5jdGlvbihub2RlcywgZWRnZXMsIHBDbnQpXG5cdHtcblx0XHRsZXQgQ05UO1xuXG5cdFx0Y29uc3QgY250ID0gcENudFswXTtcblxuXHRcdG5vZGVzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyBbbGFiZWw9XCInICsgdGhpcy5ub2RlVmFsdWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXTsnKTtcblxuXHRcdGlmKHRoaXMubm9kZUxlZnQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZUxlZnQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm5vZGVSaWdodClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlUmlnaHQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmxpc3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5saXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmxpc3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmRpY3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbC5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHRtcGwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc3RhY2sxID0gW3RoaXMucm9vdE5vZGVdO1xuXHRcdGNvbnN0IHN0YWNrMiA9IFsweDAwMDAwMDAwMDAwXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG0gPSB0bXBsLm1hdGNoKHRoaXMuU1RBVEVNRU5UX1JFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaCh7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHRtcGwsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG1hdGNoID0gbVswXTtcblx0XHRcdGNvbnN0IGtleXdvcmQgPSBtWzFdO1xuXHRcdFx0Y29uc3QgZXhwcmVzc2lvbiA9IG1bMl07XG5cblx0XHRcdGNvbHVtbiA9IG0uaW5kZXggKyAweDAwMDAwMDAwMDA7XG5cdFx0XHRDT0xVTU4gPSBtLmluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRtcGwuc3Vic3RyKDAsIGNvbHVtbik7XG5cdFx0XHRjb25zdCBWQUxVRSA9IHRtcGwuc3Vic3RyKDAsIENPTFVNTik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHN3aXRjaChrZXl3b3JkKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0XHRjYXNlICdmb3InOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRzdGFjazEucHVzaChpdGVtKTtcblx0XHRcdFx0XHRzdGFjazIucHVzaCgweDAwKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgY3Vyclsna2V5d29yZCddICE9PSAnZm9yJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGZvcic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kZm9yYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5lbmdpbmUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC9cXHtcXHtcXHMqKC4qPylcXHMqXFx9XFx9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXHRcdHRoaXMudG1wbHMgPSB0bXBscztcblxuXHRcdHN3aXRjaChpdGVtLmtleXdvcmQpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdkbyc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRtID0gaXRlbS5leHByZXNzaW9uLm1hdGNoKC8oKD86W2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFwuKSpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBzZXRgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gbVsxXS5zcGxpdCgnLicpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRcdFx0XHRsZXQgcGFyZW50LCBqO1xuXG5cdFx0XHRcdGlmKHBhcnRzWzBdID09PSAnd2luZG93J1xuXHRcdFx0XHQgICB8fFxuXHRcdFx0XHQgICBwYXJ0c1swXSA9PT0gJ2dsb2JhbCdcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdC8qKi8gaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHdpbmRvdztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gZ2xvYmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aiA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cGFyZW50ID0gZGljdDtcblxuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRmb3IodmFyIGkgPSBqOyBpIDwgbDsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgYCcgKyBtWzFdICsgJ2Agbm90IGRlY2xhcmVkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudFtwYXJ0c1tpXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQFRFWFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUucmVwbGFjZSh0aGlzLlZBUklBQkxFX1JFLCBmdW5jdGlvbihtYXRjaCwgZXhwcmVzc2lvbikge1xuXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYmxvY2subGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgYmxvY2subGlzdFtpXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgc3ltMTtcblx0XHRcdFx0bGV0IHN5bTI7XG5cdFx0XHRcdGxldCBleHByO1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyosXFxzKihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0XHRpZighbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYGZvcmAgc3RhdGVtZW50Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdFx0c3ltMiA9IG51bGw7XG5cdFx0XHRcdFx0XHRleHByID0gbVsyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0c3ltMiA9IG1bMl07XG5cdFx0XHRcdFx0ZXhwciA9IG1bM107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG9yaWdWYWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHIsIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JpZ1ZhbHVlKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpdGVyVmFsdWU7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gc3ltMiA/IE9iamVjdC5lbnRyaWVzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBvcmlnVmFsdWU7XG5cblx0XHRcdFx0XHRpZih0eXBlTmFtZSAhPT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgdHlwZU5hbWUgIT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgaXRlcmFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kZSBub3QgYW4gb2JqZWN0Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGwgPSBpdGVyVmFsdWUubGVuZ3RoO1xuXG5cdFx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbKHN5bTIpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDMgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgW2tleSwgdmFsXSBvZiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSBrZXk7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMl0gPSB2YWw7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDM7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0yKV0gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgdmFsIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihpdGVtLmJsb2Nrcy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1sxXS5saXN0O1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTkNMVURFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpbmNsdWRlJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgbV8xXyA9IGl0ZW0uZXhwcmVzc2lvbiwgd2l0aF9zdWJleHByLCB3aXRoX2NvbnRleHQ7XG5cblx0XHRcdFx0LyoqLyBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKykkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbV8xXztcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKHdpdGhfc3ViZXhwciwgaXRlbS5saW5lLCBkaWN0KSB8fCB7fTtcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGVzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBvYmplY3QgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChhbWlUd2lnLnN0ZGxpYi5pbmNsdWRlKFxuXHRcdFx0XHRcdGZpbGVOYW1lLFxuXHRcdFx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQsXG5cdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgLyotLS0tLS0tLS0tLS0tLSovdG1wbC8qLS0tLS0tLS0tLS0tLS0qLywgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmNhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwcmVzc2lvbiwgbGluZSwgXylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZi5jYWxsKF8sIF8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiIsIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5zdGRsaWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZBUklBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0VtcHR5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHggPT09IG51bGxcblx0XHQgICB8fFxuXHRcdCAgIHggPT09IGZhbHNlXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSAoKCcnKSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiAodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID09PSAwKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bWJlcic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0FycmF5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPYmplY3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRXZlbic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2RkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJbk9iamVjdCc6IGZ1bmN0aW9uKHgsIHkpXG5cdHtcblx0XHRpZih0aGlzLmlzQXJyYXkoeSlcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geS5pbmRleE9mKHgpID49IDA7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh5KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4geCBpbiB5O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZ2UnOiBmdW5jdGlvbih4MSwgeDIsIHN0ZXAgPSAxKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKiovIGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAvKi0tLSoveDEvKi0tLSovOyBpIDw9IC8qLS0tKi94Mi8qLS0tKi87IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0qLyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0geDEuY2hhckNvZGVBdCgwKTsgaSA8PSB4Mi5jaGFyQ29kZUF0KDApOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xlbmd0aCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHgpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzQXJyYXkoeClcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh4KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeCkubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGFzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4W3gubGVuZ3RoIC0gMV0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc2xpY2UnOiBmdW5jdGlvbih4LCBpZHgxLCBpZHgyKVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgPyB4LnNsaWNlKGlkeDEsIGlkeDIpIDogbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzU3RyaW5nKGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdEwucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEwuam9pbignJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc0FycmF5KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIEwucHVzaChpdGVtW2pdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zb3J0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnNvcnQoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qb2luJzogZnVuY3Rpb24oeCwgc2VwKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguam9pbihzZXApIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2tleXMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNPYmplY3QoeCkgPyBPYmplY3Qua2V5cyh4KSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jb2x1bW4nOiBmdW5jdGlvbih4LCBrZXkpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5tYXAoKHZhbCkgPT4gdmFsW2tleV0pIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2JhdGNoJzogZnVuY3Rpb24oeCwgbiwgbWlzc2luZyA9ICcnKVxuXHR7XG5cdCAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcihuKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGwgPSB4Lmxlbmd0aDtcblxuXHRcdFx0aWYobCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBsYXN0O1xuXG5cdFx0XHRcdGNvbnN0IG0gPSBNYXRoLmNlaWwobCAvIG4pICogbjtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSBuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobGFzdCA9IHguc2xpY2UoaSwgaSArIG4pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQgaSA9IGw7IGkgPCBtOyBpICs9IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYXN0LnB1c2gobWlzc2luZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3N0YXJ0c1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXRjaCc6IGZ1bmN0aW9uKHMsIHJlZ2V4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZygoKHMpKSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcocmVnZXgpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgaWR4MSA9IHJlZ2V4LiAgaW5kZXhPZiAgKCcvJyk7XG5cdFx0XHRjb25zdCBpZHgyID0gcmVnZXgubGFzdEluZGV4T2YoJy8nKTtcblxuXHRcdFx0aWYoaWR4MSA9PT0gMCB8fCBpZHgxIDwgaWR4Milcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChyZWdleC5zdWJzdHJpbmcoaWR4MSArIDEsIGlkeDIpLCByZWdleC5zdWJzdHJpbmcoaWR4MiArIDEpKS50ZXN0KHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kZWZhdWx0JzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0cmV0dXJuIHMxIHx8IHMyIHx8ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cHBlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9VcHBlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jYXBpdGFsaXplJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXlxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RyaW0nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRyaW0oKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBvbGRTdHJzLCBuZXdTdHJzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRjb25zdCBsID0gKCgocykpKS5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9sZFN0cnMubGVuZ3RoO1xuXHRcdGNvbnN0IG4gPSBuZXdTdHJzLmxlbmd0aDtcblxuXHRcdGlmKG0gIT0gbilcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuX19sMDpcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb1N0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0J190ZXh0VG9TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZXNjYXBlJzogZnVuY3Rpb24ocywgbW9kZSlcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0c3dpdGNoKG1vZGUgfHwgJ2h0bWwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0Y2FzZSAnaHRtbF9hdHRyJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzJzpcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWCwgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ3VybCc6XG5cdFx0XHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXJsX2VuY29kZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IGVuY29kZVVSSUNvbXBvbmVudChzKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yYXcnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIGRpY3QpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSAmJiB0aGlzLmlzT2JqZWN0KGRpY3QpID8gdGhpcy5fcmVwbGFjZShzLCBPYmplY3Qua2V5cyhkaWN0KSwgT2JqZWN0LnZhbHVlcyhkaWN0KSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcm91bmQnOiBmdW5jdGlvbih4LCBtb2RlKVxuXHR7XG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnY2VpbCc6XG5cdFx0XHRcdHJldHVybiBNYXRoLmNlaWwoeCk7XG5cblx0XHRcdGNhc2UgJ2Zsb29yJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtaW4nOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0ID4gYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPCBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkFORE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2pzcGF0aCc6IGZ1bmN0aW9uKHgsIHBhdGgpXG5cdHtcblx0XHRyZXR1cm4gdHlwZW9mIEpTUGF0aCAhPT0gJ3VuZGVmaW5lZCcgPyBKU1BhdGguYXBwbHkocGF0aCwgeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBURU1QTEFURVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpbmNsdWRlJzogZnVuY3Rpb24oZmlsZU5hbWUsIHZhcmlhYmxlcyA9IHt9LCB3aXRoQ29udGV4dCA9IHRydWUsIGlnbm9yZU1pc3NpbmcgPSBmYWxzZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGZpbGVOYW1lIGluIGFtaVR3aWcuZW5naW5lLnRtcGxzKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRlbXAgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHdpdGhDb250ZXh0KVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IGFtaVR3aWcuZW5naW5lLmRpY3RbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhcmlhYmxlcylcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSAvKi0qL3ZhcmlhYmxlcy8qLSovW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKGFtaVR3aWcuZW5naW5lLnRtcGxzW2ZpbGVOYW1lXSwgdGVtcCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFpZ25vcmVNaXNzaW5nKVxuXHRcdHtcblx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBjb3VsZCBub3Qgb3BlbiBgJyArIGZpbGVOYW1lICsgJ2AnO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliLmZpbHRlcl9lID0gYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2VzY2FwZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5pbnRlcnByZXRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5pbnRlcnByZXRlciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0SlM6IGZ1bmN0aW9uKG5vZGUpXG5cdHtcblx0XHRsZXQgTDtcblx0XHRsZXQgeDtcblx0XHRsZXQgbGVmdDtcblx0XHRsZXQgcmlnaHQ7XG5cdFx0bGV0IG9wZXJhdG9yO1xuXG5cdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTFNUOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ1snICsgTC5qb2luKCcsJykgKyAnXSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRElDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRJQzpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICd7JyArIEwuam9pbignLCcpICsgJ30nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZVTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GVU46XG5cdFx0IFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2godGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0IFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBWQVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJ1snICsgdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSArICddJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBMLmxlbmd0aCA+IDAgPyBub2RlLm5vZGVWYWx1ZSArIEwuam9pbignJykgOiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUw6XG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRGVmaW5lZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5OVUxMOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc051bGwoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFk6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRW1wdHkoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSXRlcmFibGUoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTjpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFdmVuKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk9ERDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNPZGQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JTjpcblxuXHRcdFx0XHRpZihub2RlLm5vZGVSaWdodC5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJbk9iamVjdCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHggPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRcdGxlZnQgPSBub2RlLm5vZGVSaWdodC5ub2RlTGVmdC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0cmlnaHQgPSBub2RlLm5vZGVSaWdodC5ub2RlUmlnaHQubm9kZVZhbHVlO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luUmFuZ2UoJyArIHggKyAnLCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnN0YXJ0c1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5lbmRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5tYXRjaCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRTpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIucmFuZ2UoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlVmFsdWVbMF0gPT09ICcuJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJy4nICsgcmlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnWycgKyByaWdodCArICddJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GTERJVjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5mbG9vcignICsgbGVmdCArICcvJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5wb3coJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1VCTEVfUVVFU1RJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICcoKCcgKyBsZWZ0ICsgJykgfHwgKCcgKyByaWdodCArICcpKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBVTklBUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgPT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yICsgJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCA9PT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCkgKyAnKScgKyBvcGVyYXRvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEJJTkFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8fCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3wnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnXic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FUOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcrJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwciwgXylcblx0e1xuXHRcdGlmKCFfKSBfID0ge307XG5cblx0XHRyZXR1cm4gZXZhbCh0aGlzLmdldEpTKGV4cHIpKS5jYWxsKF8sIF8pO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbiJdfQ==
