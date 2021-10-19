function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*!
 * AMI Twig Engine
 *
 * Copyright © 2014-2021 CNRS/LPSC
 *
 * Author: Jérôme ODIER (jerome.odier@lpsc.in2p3.fr)
 *
 * Repositories: https://gitlab.in2p3.fr/ami-team/AMITwigJS/
 *               https://www.github.com/ami-team/AMITwigJS/
 *
 * This software is a computer program whose purpose is to provide a
 * JavaScript implementation of the SensioLabs's TWIG template engine.
 *
 * This software is governed by the CeCILL-C license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/or redistribute the software under the terms of the CeCILL-C
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-C license and that you accept its terms.
 *
 */
(function () {
  'use strict';
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig                                                                                                            */

  /*--------------------------------------------------------------------------------------------------------------------*/

  var amiTwig = {
    version: '1.2.0'
  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /**/

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports.amiTwig = amiTwig;
  } else if (typeof window !== 'undefined') {
    window.amiTwig = amiTwig;
  } else if (typeof global !== 'undefined') {
    global.amiTwig = amiTwig;
  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  //export default amiTwig;

  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.tokenizer                                                                                                  */

  /*--------------------------------------------------------------------------------------------------------------------*/


  amiTwig.tokenizer = {
    /*----------------------------------------------------------------------------------------------------------------*/
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
        /*--------------------------------------------------------------------------------------------------------*/

        /* COUNT LINES                                                                                            */

        /*--------------------------------------------------------------------------------------------------------*/

        if (c === '\n') {
          line++;
        }
        /*--------------------------------------------------------------------------------------------------------*/

        /* EAT SPACES                                                                                             */

        /*--------------------------------------------------------------------------------------------------------*/


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
        /*--------------------------------------------------------------------------------------------------------*/

        /* EAT REGEXES                                                                                            */

        /*--------------------------------------------------------------------------------------------------------*/


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
        /*--------------------------------------------------------------------------------------------------------*/

        /* EAT REMAINING CHARACTERES                                                                              */

        /*--------------------------------------------------------------------------------------------------------*/


        word += c;
        code = code.substring(1);
        i += 1;
        /*			continue __l0;
         */

        /*--------------------------------------------------------------------------------------------------------*/
      }

      if (word) {
        if (error) {
          throw 'invalid token `' + word + '`';
        }

        result_tokens.push(word);
        result_types.push(-1);
        result_lines.push(line);
        /*			word = '';
         */
      }

      return {
        tokens: result_tokens,
        types: result_types,
        lines: result_lines
      };
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    _match: function _match(s, stringOrRegExp) {
      var m;

      if (stringOrRegExp instanceof RegExp) {
        m = s.match(stringOrRegExp);
        return m !== null && this._checkNextChar(s,
        /*-*/
        m[0]
        /*-*/
        ) ?
        /*-*/
        m[0]
        /*-*/
        : null;
      } else {
        m = s.indexOf(stringOrRegExp);
        return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
      }
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    _alphanum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    _checkNextChar: function _checkNextChar(s, token) {
      var length = token.length;
      var charCode2 = s.charCodeAt(length - 0);
      var charCode1 = s.charCodeAt(length - 1);
      return isNaN(charCode2) || this._alphanum[charCode2] === 0 || this._alphanum[charCode1] === 0;
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr                                                                                                       */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr = {};
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.tokens                                                                                                */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.tokens = {
    /*----------------------------------------------------------------------------------------------------------------*/
    $init: function $init() {
      /*------------------------------------------------------------------------------------------------------------*/

      /* COMPOSITE TOKENS                                                                                           */

      /*------------------------------------------------------------------------------------------------------------*/
      this.IS_XXX = [this.DEFINED, this.NULL, this.EMPTY, this.ITERABLE, this.EVEN, this.ODD];
      this.XXX_WITH = [this.STARTS_WITH, this.ENDS_WITH];
      this.PLUS_MINUS = [this.CONCAT, this.PLUS, this.MINUS];
      this.MUL_FLDIV_DIV_MOD = [this.MUL, this.FLDIV, this.DIV, this.MOD];
      this.RX = [this.RP, this.RB1];
      /*------------------------------------------------------------------------------------------------------------*/
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /* REAL TOKENS                                                                                                    */

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/

    /* VIRTUAL TOKENS                                                                                                 */

    /*----------------------------------------------------------------------------------------------------------------*/
    LST: 200,
    DIC: 201,
    FUN: 202,
    VAR: 203
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.tokens.$init();
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.Tokenizer                                                                                             */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.Tokenizer = function (code, line) {
    /*----------------------------------------------------------------------------------------------------------------*/
    this._spaces = [' ', '\t', '\n', '\r'];
    /*----------------------------------------------------------------------------------------------------------------*/

    this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', '??', '?', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];
    /*----------------------------------------------------------------------------------------------------------------*/

    this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.DOUBLE_QUESTION, amiTwig.expr.tokens.QUESTION, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];
    /*----------------------------------------------------------------------------------------------------------------*/

    this.$init = function (code, line) {
      /*------------------------------------------------------------------------------------------------------------*/
      var result = amiTwig.tokenizer.tokenize(code, line, this._spaces, this._tokenDefs, this._tokenTypes, true);
      /*------------------------------------------------------------------------------------------------------------*/

      this.tokens = result.tokens;
      this.types = result.types;
      this.i = 0;
      /*------------------------------------------------------------------------------------------------------------*/
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.next = function (n) {
      if (n === void 0) {
        n = 1;
      }

      this.i += n;
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.isEmpty = function () {
      return this.i >= this.tokens.length;
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.peekToken = function () {
      return this.tokens[this.i];
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.peekType = function () {
      return this.types[this.i];
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.checkType = function (type) {
      if (this.i < this.tokens.length) {
        var TYPE = this.types[this.i];
        return type instanceof Array ? type.indexOf(TYPE) >= 0 : type === TYPE;
      }

      return false;
    };
    /*----------------------------------------------------------------------------------------------------------------*/


    this.$init(code, line);
    /*----------------------------------------------------------------------------------------------------------------*/
  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.Compiler                                                                                              */

  /*--------------------------------------------------------------------------------------------------------------------*/


  amiTwig.expr.Compiler = function (code, line) {
    this.$init(code, line);
  };
  /*--------------------------------------------------------------------------------------------------------------------*/


  amiTwig.expr.Compiler.prototype = {
    /*----------------------------------------------------------------------------------------------------------------*/
    $init: function $init(code, line) {
      /*------------------------------------------------------------------------------------------------------------*/
      this.tokenizer = new amiTwig.expr.Tokenizer(this.code = code, this.line = line);
      /*------------------------------------------------------------------------------------------------------------*/

      this.rootNode = this.parseNullCoalescing();
      /*------------------------------------------------------------------------------------------------------------*/

      if (this.tokenizer.isEmpty() === false) {
        throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
      }
      /*------------------------------------------------------------------------------------------------------------*/

    },

    /*----------------------------------------------------------------------------------------------------------------*/
    dump: function dump() {
      return this.rootNode.dump();
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseNullCoalescing: function parseNullCoalescing() {
      var left = this.parseLogicalOr(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* NullCoalescing : LogicalOr ('??' LogicalOr)*                                                               */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.DOUBLE_QUESTION)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseLogicalOr();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseLogicalOr: function parseLogicalOr() {
      var left = this.parseLogicalAnd(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* LogicalOr : LogicalAnd ('or' LogicalAnd)*                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseLogicalAnd();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseLogicalAnd: function parseLogicalAnd() {
      var left = this.parseBitwiseOr(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* LogicalAnd : BitwiseOr ('and' BitwiseOr)*                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseOr();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseBitwiseOr: function parseBitwiseOr() {
      var left = this.parseBitwiseXor(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*                                                                */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseXor();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseBitwiseXor: function parseBitwiseXor() {
      var left = this.parseBitwiseAnd(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*                                                              */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseBitwiseAnd();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseBitwiseAnd: function parseBitwiseAnd() {
      var left = this.parseNot(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* BitwiseAnd : Not ('b-and' Not)*                                                                            */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseNot();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseNot: function parseNot() {
      var right, node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Not : 'not' Comp                                                                                           */

      /*------------------------------------------------------------------------------------------------------------*/

      if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseComp();
        node.nodeLeft = null;
        node.nodeRight = right;
        return node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*     | Comp                                                                                                 */

      /*------------------------------------------------------------------------------------------------------------*/


      return this.parseComp();
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseComp: function parseComp() {
      var left = this.parseAddSub(),
          right,
          node,
          swap;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)                                                       */

      /*------------------------------------------------------------------------------------------------------------*/

      /**/

      if (this.tokenizer.checkType(amiTwig.expr.tokens.IS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        /* swap 'is' and 'not' */

        swap = node;
        /* swap 'is' and 'not' */

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
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*      | AddSub ('===' | '==' | ...) AddSub                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/
      else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*      | AddSub ('starts' | 'ends') `with` AddSub                                                            */

      /*------------------------------------------------------------------------------------------------------------*/
      else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*      | AddSub 'matches' AddSub                                                                             */

      /*------------------------------------------------------------------------------------------------------------*/
      else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*      | AddSub 'in' AddSub                                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/
      else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*      | AddSub                                                                                              */

      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseAddSub: function parseAddSub() {
      var left = this.parseMulDiv(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* AddSub : MulDiv (('+' | '-') MulDiv)*                                                                      */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseMulDiv();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseMulDiv: function parseMulDiv() {
      var left = this.parsePlusMinus(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)*                                                   */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parsePlusMinus();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parsePlusMinus: function parsePlusMinus() {
      var right, node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* PlusMinus : ('-' | '+') Power                                                                              */

      /*------------------------------------------------------------------------------------------------------------*/

      if (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parsePower();
        node.nodeLeft = null;
        node.nodeRight = right;
        return node;
      }
      /*------------------------------------------------------------------------------------------------------------*/

      /*           | Dot1                                                                                           */

      /*------------------------------------------------------------------------------------------------------------*/


      return this.parsePower();
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parsePower: function parsePower() {
      var left = this.parseFilter(),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Power : Filter ('**' Filter)*                                                                              */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseFilter();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseFilter: function parseFilter() {
      var left = this.parseDot1(),
          node,
          temp;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Filter : Dot1 ('|' Dot1)*                                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.PIPE)) {
        this.tokenizer.next();
        node = this.parseDot1(true);

        for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
          ;
        }

        temp.list.unshift(left);
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseDot1: function parseDot1(isFilter) {
      var node = this.parseDot2(isFilter);

      if (node) {
        /*--------------------------------------------------------------------------------------------------------*/
        var temp = node;

        for (; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {
          ;
        }
        /*--------------------------------------------------------------------------------------------------------*/


        if (temp.q) {
          /**/
          if (temp.nodeType === amiTwig.expr.tokens.FUN) {
            if (temp.nodeValue in amiTwig.stdlib) {
              temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
            } else {
              temp.nodeValue =
              /*---*/
              '_.'
              /*---*/
              + temp.nodeValue;
            }
          } else if (temp.nodeType === amiTwig.expr.tokens.VAR) {
            temp.nodeValue =
            /*---*/
            '_.'
            /*---*/
            + temp.nodeValue;
          }

          temp.q = false;
        }
        /*--------------------------------------------------------------------------------------------------------*/

      }

      return node;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseDot2: function parseDot2(isFilter) {
      var left = this.parseDot3(isFilter),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Dot2 : Dot3 ('.' Dot3)*                                                                                    */

      /*------------------------------------------------------------------------------------------------------------*/

      while (this.tokenizer.checkType(amiTwig.expr.tokens.DOT)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
        this.tokenizer.next();
        right = this.parseDot3(isFilter);
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseDot3: function parseDot3(isFilter) {
      var left = this.parseX(isFilter),
          right,
          node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Dot3 : X ('[' NullCoalescing ']')*                                                                         */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/

      /*         | X                                                                                                */

      /*------------------------------------------------------------------------------------------------------------*/


      return left;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseX: function parseX(isFilter) {
      var node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* X : Group | Array | Object | FunVar | Terminal                                                             */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/

      /* SYNTAX ERROR                                                                                               */

      /*------------------------------------------------------------------------------------------------------------*/


      throw 'syntax error, line `' + this.line + '`, syntax error or truncated expression';
      /*------------------------------------------------------------------------------------------------------------*/
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseGroup: function parseGroup() {
      var node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Group : '(' NullCoalescing ')'                                                                             */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/


      return null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseArray: function parseArray() {
      var node, list;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Array : '[' Singlets ']'                                                                                   */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/


      return null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseObject: function parseObject() {
      var node, dict;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Object : '{' Doublets '}'                                                                                  */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/


      return null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseFunVar: function parseFunVar(isFilter) {
      var node;

      if (this.tokenizer.checkType(amiTwig.expr.tokens.SID)) {
        node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());
        node.q = true;
        this.tokenizer.next();
        /*--------------------------------------------------------------------------------------------------------*/

        /* FunVar : SID '(' Singlets ')'                                                                          */

        /*--------------------------------------------------------------------------------------------------------*/

        /**/

        if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
          this.tokenizer.next();
          node.list = this._parseSinglets();

          if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
            this.tokenizer.next();
            node.nodeType = amiTwig.expr.tokens.FUN;
          } else {
            throw 'syntax error, line `' + this.line + '`, `)` expected';
          }
        }
        /*--------------------------------------------------------------------------------------------------------*/

        /*        | SID                                                                                           */

        /*--------------------------------------------------------------------------------------------------------*/
        else {
          node.nodeType = isFilter ? amiTwig.expr.tokens.FUN : amiTwig.expr.tokens.VAR;
          node.list = [];
        }
        /*--------------------------------------------------------------------------------------------------------*/


        return node;
      }

      return null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/
    _parseSinglet: function _parseSinglet(result) {
      result.push(this.parseNullCoalescing());
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    _parseDoublet: function _parseDoublet(result) {
      if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
        var key = this.tokenizer.peekToken();
        this.tokenizer.next();

        if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
          /*				const colon = this.tokenizer.peekToken();
           */
          this.tokenizer.next();
          /*----------------------------------------------------------------------------------------------------*/

          result[key] = this.parseNullCoalescing();
          /*----------------------------------------------------------------------------------------------------*/
        } else {
          throw 'syntax error, line `' + this.line + '`, `:` expected';
        }
      } else {
        throw 'syntax error, line `' + this.line + '`, terminal expected';
      }
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    parseTerminal: function parseTerminal() {
      var left, right, node;
      /*------------------------------------------------------------------------------------------------------------*/

      /* Terminal : TERMINAL | RANGE                                                                                */

      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/


      return null;
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.Node                                                                                                  */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.Node = function (nodeType, nodeValue) {
    this.$init(nodeType, nodeValue);
  };
  /*--------------------------------------------------------------------------------------------------------------------*/


  amiTwig.expr.Node.prototype = {
    /*----------------------------------------------------------------------------------------------------------------*/
    $init: function $init(nodeType, nodeValue) {
      this.nodeType = nodeType;
      this.nodeValue = nodeValue;
      this.nodeLeft = null;
      this.nodeRight = null;
      this.list = null;
      this.dict = null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/
    dump: function dump() {
      var nodes = [];
      var edges = [];

      this._dump(nodes, edges, [0]);

      return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.tmpl                                                                                                       */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.tmpl = {};
  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.tmpl.Compiler                                                                                              */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.tmpl.Compiler = function (tmpl) {
    this.$init(tmpl);
  };
  /*--------------------------------------------------------------------------------------------------------------------*/


  amiTwig.tmpl.Compiler.prototype = {
    /*----------------------------------------------------------------------------------------------------------------*/
    STATEMENT_RE: /{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%}/,
    COMMENT_RE: /{#\s*((?:.|\n)*?)\s*#}/g,

    /*----------------------------------------------------------------------------------------------------------------*/
    _count: function _count(s) {
      var result = 0;
      var l = s.length;

      for (var i = 0; i < l; i++) {
        if (s[i] === '\n') result++;
      }

      return result;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    $init: function $init(tmpl) {
      /*------------------------------------------------------------------------------------------------------------*/
      var line = 1;
      var column;
      var COLUMN;
      /*------------------------------------------------------------------------------------------------------------*/

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
      /*------------------------------------------------------------------------------------------------------------*/

      var stack1 = [this.rootNode];
      var stack2 = [0x00000000000];
      var item;
      /*------------------------------------------------------------------------------------------------------------*/

      for (tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN)) {
        /*--------------------------------------------------------------------------------------------------------*/
        var curr = stack1[stack1.length - 1];
        var indx = stack2[stack2.length - 1];
        /*--------------------------------------------------------------------------------------------------------*/

        var m = tmpl.match(this.STATEMENT_RE);
        /*--------------------------------------------------------------------------------------------------------*/

        if (m === null) {
          /*----------------------------------------------------------------------------------------------------*/
          line += this._count(tmpl);
          /*----------------------------------------------------------------------------------------------------*/

          curr.blocks[indx].list.push({
            line: line,
            keyword: '@text',
            expression: '',
            blocks: [],
            value: tmpl
          });
          /*----------------------------------------------------------------------------------------------------*/

          var errors = [];

          for (var i = stack1.length - 1; i > 0; i--) {
            /**/
            if (stack1[i].keyword === 'if') {
              errors.push('missing keyword `endif`');
            } else if (stack1[i].keyword === 'for') {
              errors.push('missing keyword `endfor`');
            }
          }

          if (errors.length > 0) {
            throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
          }
          /*----------------------------------------------------------------------------------------------------*/


          break;
        }
        /*--------------------------------------------------------------------------------------------------------*/


        var match = m[0];
        var keyword = m[1];
        var expression = m[2];
        column = m.index + 0x0000000000;
        COLUMN = m.index + match.length;
        var value = tmpl.substr(0, column);
        var VALUE = tmpl.substr(0, COLUMN);
        /*--------------------------------------------------------------------------------------------------------*/

        line += this._count(VALUE);
        /*--------------------------------------------------------------------------------------------------------*/

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
        /*--------------------------------------------------------------------------------------------------------*/


        switch (keyword) {
          /*----------------------------------------------------------------------------------------------------*/
          case 'flush':
          case 'autoescape':
          case 'spaceless':
          case 'verbatim':
            /* IGNORE */
            break;

          /*----------------------------------------------------------------------------------------------------*/

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

          /*----------------------------------------------------------------------------------------------------*/

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

          /*----------------------------------------------------------------------------------------------------*/

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

          /*----------------------------------------------------------------------------------------------------*/

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

          /*----------------------------------------------------------------------------------------------------*/

          case 'endif':
            if (curr['keyword'] !== 'if') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
            }

            stack1.pop();
            stack2.pop();
            break;

          /*----------------------------------------------------------------------------------------------------*/

          case 'endfor':
            if (curr['keyword'] !== 'for') {
              throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
            }

            stack1.pop();
            stack2.pop();
            break;

          /*----------------------------------------------------------------------------------------------------*/

          default:
            throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

          /*----------------------------------------------------------------------------------------------------*/
        }
        /*--------------------------------------------------------------------------------------------------------*/

      }
      /*------------------------------------------------------------------------------------------------------------*/

    },

    /*----------------------------------------------------------------------------------------------------------------*/
    dump: function dump() {
      return JSON.stringify(this.rootNode, null, 2);
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.engine                                                                                                     */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.engine = {
    /*----------------------------------------------------------------------------------------------------------------*/
    VARIABLE_RE: /{{\s*(.*?)\s*}}/g,

    /*----------------------------------------------------------------------------------------------------------------*/
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
        /*--------------------------------------------------------------------------------------------------------*/

        /* DO                                                                                                     */

        /*--------------------------------------------------------------------------------------------------------*/
        case 'do':
          {
            /*----------------------------------------------------------------------------------------------------*/
            amiTwig.expr.cache.eval(item.expression, item.line, dict);
            /*----------------------------------------------------------------------------------------------------*/

            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* SET                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case 'set':
          {
            /*----------------------------------------------------------------------------------------------------*/
            m = item.expression.match(/((?:[a-zA-Z_$][a-zA-Z0-9_$]*\.)*[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

            if (!m) {
              throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
            }
            /*----------------------------------------------------------------------------------------------------*/


            var parts = m[1].split('.'),
                l = parts.length - 1;
            var parent, j;

            if (parts[0] === 'window' || parts[0] === 'global') {
              /**/
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
            /*----------------------------------------------------------------------------------------------------*/


            var i;

            for (i = j; i < l; i++) {
              if (parent[parts[i]]) {
                parent = parent[parts[i]];
              } else {
                throw 'runtime error, line `' + item.line + '`, `' + m[1] + '` not declared';
              }
            }
            /*----------------------------------------------------------------------------------------------------*/


            parent[parts[i]] = amiTwig.expr.cache.eval(m[2], item.line, dict);
            /*----------------------------------------------------------------------------------------------------*/

            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* @TEXT                                                                                                  */

        /*--------------------------------------------------------------------------------------------------------*/

        case '@text':
          {
            /*----------------------------------------------------------------------------------------------------*/
            result.push(item.value.replace(this.VARIABLE_RE, function (match, expression) {
              var value = amiTwig.expr.cache.eval(expression, item.line, dict);
              return value !== null && value !== undefined ? value : '';
            }));
            /*----------------------------------------------------------------------------------------------------*/

            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* IF                                                                                                     */

        /*--------------------------------------------------------------------------------------------------------*/

        case 'if':
        case '@root':
          {
            /*----------------------------------------------------------------------------------------------------*/
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
            /*----------------------------------------------------------------------------------------------------*/

            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* FOR                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case 'for':
          {
            /*----------------------------------------------------------------------------------------------------*/
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
            /*----------------------------------------------------------------------------------------------------*/


            var origValue = amiTwig.expr.cache.eval(expr, item.line, dict);
            var typeName = Object.prototype.toString.call(origValue);
            /*----------------------------------------------------------------------------------------------------*/

            var iterValue;

            if (typeName === '[object Object]') {
              iterValue = sym2 ? Object.entries(origValue) : Object.keys(origValue);
            } else {
              iterValue = origValue;

              if (typeName !== '[object Array]' && typeName !== '[object String]') {
                throw 'syntax error, line `' + item.line + '`, right operand not iterable';
              }

              if (sym2) {
                throw 'syntax error, line `' + item.line + '`, right operand not an object';
              }
            }
            /*----------------------------------------------------------------------------------------------------*/


            var _l = iterValue.length;

            if (_l > 0) {
              var k = 0x00000000000000;
              var list = item.blocks[0].list;

              if (sym2) {
                /*--------------------------------------------------------------------------------------------*/
                var old1 = dict[sym1];
                var old2 = dict[sym2];
                var old3 = dict['loop'];
                /*--------------------------------------------------------------------------------------------*/

                dict.loop = {
                  length: _l,
                  parent: dict['loop']
                };
                /*--------------------------------------------------------------------------------------------*/

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
                /*--------------------------------------------------------------------------------------------*/


                dict['loop'] = old3;
                dict[sym2] = old2;
                dict[sym1] = old1;
                /*--------------------------------------------------------------------------------------------*/
              } else {
                /*--------------------------------------------------------------------------------------------*/
                var _old = dict[sym1];
                var _old2 = dict['loop'];
                /*--------------------------------------------------------------------------------------------*/

                dict.loop = {
                  length: _l,
                  parent: dict['loop']
                };
                /*--------------------------------------------------------------------------------------------*/

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
                /*--------------------------------------------------------------------------------------------*/


                dict['loop'] = _old2;
                dict[sym1] = _old;
                /*--------------------------------------------------------------------------------------------*/
              }
            } else {
              if (item.blocks.length > 1) {
                var _list = item.blocks[1].list;

                for (var _j3 in _list) {
                  this._render(result, _list[_j3], dict, tmpls);
                }
              }
            }
            /*----------------------------------------------------------------------------------------------------*/


            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* INCLUDE                                                                                                */

        /*--------------------------------------------------------------------------------------------------------*/

        case 'include':
          {
            /*----------------------------------------------------------------------------------------------------*/
            var m_1_ = item.expression,
                with_subexpr,
                with_context;
            /**/

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
            /*----------------------------------------------------------------------------------------------------*/


            var fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

            if (Object.prototype.toString.call(fileName) !== '[object String]') {
              throw 'runtime error, line `' + item.line + '`, string expected';
            }
            /*----------------------------------------------------------------------------------------------------*/


            var variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

            if (Object.prototype.toString.call(variables) !== '[object Object]') {
              throw 'runtime error, line `' + item.line + '`, object expected';
            }
            /*----------------------------------------------------------------------------------------------------*/


            result.push(amiTwig.stdlib.include(fileName, variables, with_context, false));
            /*----------------------------------------------------------------------------------------------------*/

            break;
          }

        /*--------------------------------------------------------------------------------------------------------*/
      }
      /*------------------------------------------------------------------------------------------------------------*/

    },

    /*----------------------------------------------------------------------------------------------------------------*/
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
          this._render(result,
          /*--------------*/
          tmpl
          /*--------------*/
          , dict, tmpls);

          break;
      }

      return result.join('');
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.cache                                                                                                 */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.cache = {
    /*----------------------------------------------------------------------------------------------------------------*/
    dict: {},

    /*----------------------------------------------------------------------------------------------------------------*/
    eval: function _eval(expression, line, _) {
      /*------------------------------------------------------------------------------------------------------------*/
      var f;

      if (expression in this.dict) {
        f = this.dict[expression];
      } else {
        f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler(expression, line)));
      }
      /*------------------------------------------------------------------------------------------------------------*/


      _ = _ || {};
      return f.call(_, _);
      /*------------------------------------------------------------------------------------------------------------*/
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.stdlib                                                                                                     */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.stdlib = {
    /*----------------------------------------------------------------------------------------------------------------*/

    /* VARIABLES                                                                                                      */

    /*----------------------------------------------------------------------------------------------------------------*/
    'isUndefined': function isUndefined(x) {
      return x === undefined;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isDefined': function isDefined(x) {
      return x !== undefined;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isNull': function isNull(x) {
      return x === null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isNotNull': function isNotNull(x) {
      return x !== null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isEmpty': function isEmpty(x) {
      if (x === null || x === false || x === '') {
        return true;
      }

      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object Array]' && x.length === 0 || typeName === '[object Object]' && Object.keys(x).length === 0;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isNumber': function isNumber(x) {
      return Object.prototype.toString.call(x) === '[object Number]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isString': function isString(x) {
      return Object.prototype.toString.call(x) === '[object String]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isArray': function isArray(x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isObject': function isObject(x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isIterable': function isIterable(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isEven': function isEven(x) {
      return this.isNumber(x) && (x & 1) === 0;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isOdd': function isOdd(x) {
      return this.isNumber(x) && (x & 1) === 1;
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /* ITERABLES                                                                                                      */

    /*----------------------------------------------------------------------------------------------------------------*/
    'isInObject': function isInObject(x, y) {
      if (this.isArray(y) || this.isString(y)) {
        return y.indexOf(x) >= 0;
      }

      if (this.isObject(y)) {
        return x in y;
      }

      return false;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isInRange': function isInRange(x, x1, x2) {
      if (this.isNumber(x1) && this.isNumber(x2)) {
        return (
          /*---*/
          x
          /*---*/
          >=
          /*---*/
          x1
          /*---*/
          &&
          /*---*/
          x
          /*---*/
          <=
          /*---*/
          x2
          /*---*/

        );
      }

      if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
        return x.charCodeAt(0) >= x1.charCodeAt(0) && x.charCodeAt(0) <= x2.charCodeAt(0);
      }

      return false;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'range': function range(x1, x2, step) {
      if (step === void 0) {
        step = 1;
      }

      var result = [];
      /**/

      if (this.isNumber(x1) && this.isNumber(x2)) {
        for (var i =
        /*---*/
        x1
        /*---*/
        ; i <=
        /*---*/
        x2
        /*---*/
        ; i += step) {
          result.push(
          /*---------------*/
          i);
        }
      } else if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
        for (var _i3 = x1.charCodeAt(0); _i3 <= x2.charCodeAt(0); _i3 += step) {
          result.push(String.fromCharCode(_i3));
        }
      }

      return result;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_length': function filter_length(x) {
      if (this.isString(x) || this.isArray(x)) {
        return x.length;
      }

      if (this.isObject(x)) {
        return Object.keys(x).length;
      }

      return 0;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_first': function filter_first(x) {
      return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_last': function filter_last(x) {
      return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_slice': function filter_slice(x, idx1, idx2) {
      return this.isString(x) || this.isArray(x) ? x.slice(idx1, idx2) : null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_merge': function filter_merge() {
      if (arguments.length > 1) {
        /*--------------------------------------------------------------------------------------------------------*/
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
        /*--------------------------------------------------------------------------------------------------------*/


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
        /*--------------------------------------------------------------------------------------------------------*/


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
        /*--------------------------------------------------------------------------------------------------------*/

      }

      return null;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_sort': function filter_sort(x) {
      return this.isArray(x) ? x.sort() : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_reverse': function filter_reverse(x) {
      return this.isArray(x) ? x.reverse() : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_join': function filter_join(x, sep) {
      return this.isArray(x) ? x.join(sep) : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_keys': function filter_keys(x) {
      return this.isObject(x) ? Object.keys(x) : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_column': function filter_column(x, key) {
      return this.isArray(x) ? x.map(function (val) {
        return val[key];
      }) : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/

    /* STRINGS                                                                                                        */

    /*----------------------------------------------------------------------------------------------------------------*/
    'startsWith': function startsWith(s1, s2) {
      if (this.isString(s1) && this.isString(s2)) {
        var base = 0x0000000000000000000;
        return s1.indexOf(s2, base) === base;
      }

      return false;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'endsWith': function endsWith(s1, s2) {
      if (this.isString(s1) && this.isString(s2)) {
        var base = s1.length - s2.length;
        return s1.indexOf(s2, base) === base;
      }

      return false;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'match': function match(s, regex) {
      if (this.isString(s) && this.isString(regex)) {
        var idx1 = regex.indexOf('/');
        var idx2 = regex.lastIndexOf('/');

        if (idx1 === 0 || idx1 < idx2) {
          try {
            return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
          } catch (err) {
            /* IGNORE */
          }
        }
      }

      return false;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_default': function filter_default(s1, s2) {
      return s1 || s2 || '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_lower': function filter_lower(s) {
      return this.isString(s) ? s.toLowerCase() : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_upper': function filter_upper(s) {
      return this.isString(s) ? s.toUpperCase() : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_capitalize': function filter_capitalize(s) {
      if (this.isString(s)) {
        return s.trim().toLowerCase().replace(/^\S/g, function (c) {
          return c.toUpperCase();
        });
      }

      return '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_title': function filter_title(s) {
      if (this.isString(s)) {
        return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function (c) {
          return c.toUpperCase();
        });
      }

      return '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_trim': function filter_trim(s) {
      return this.isString(s) ? s.trim() : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    '_replace': function _replace(s, oldStrs, newStrs) {
      var result = [];
      var l = s.length;
      var m = oldStrs.length;
      var n = newStrs.length;

      if (m !== n) {
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

    /*----------------------------------------------------------------------------------------------------------------*/
    '_textToHtmlX': ['&', '"', '<', '>'],
    '_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

    /*----------------------------------------------------------------------------------------------------------------*/
    '_textToStringX': ['\\', '\n', '"', '\''],
    '_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

    /*----------------------------------------------------------------------------------------------------------------*/
    '_textToJsonStringX': ['\\', '\n', '"'],
    '_textToJsonStringY': ['\\\\', '\\n', '\\"'],

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_url_encode': function filter_url_encode(s) {
      return this.isString(s) ? encodeURIComponent(s) : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_nl2br': function filter_nl2br(s) {
      return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_raw': function filter_raw(s) {
      return this.isString(s) ? s : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_replace': function filter_replace(s, dict) {
      return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict)) : '';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_split': function filter_split(s, sep, max) {
      return this.isString(s) ? s.split(sep, max) : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /* NUMBERS                                                                                                        */

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_abs': function filter_abs(x) {
      return Math.abs(x);
    },

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/
    'min': function min() {
      /*------------------------------------------------------------------------------------------------------------*/
      var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
      /*------------------------------------------------------------------------------------------------------------*/

      var result = Number.POSITIVE_INFINITY;

      for (var i in args) {
        if (!this.isNumber(args[i])) {
          return Number.NaN;
        }

        if (result > args[i]) {
          result = args[i];
        }
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return result;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'max': function max() {
      /*------------------------------------------------------------------------------------------------------------*/
      var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;
      /*------------------------------------------------------------------------------------------------------------*/

      var result = Number.NEGATIVE_INFINITY;

      for (var i in args) {
        if (!this.isNumber(args[i])) {
          return Number.NaN;
        }

        if (result < args[i]) {
          result = args[i];
        }
      }
      /*------------------------------------------------------------------------------------------------------------*/


      return result;
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /* RANDOM                                                                                                         */

    /*----------------------------------------------------------------------------------------------------------------*/
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

    /*----------------------------------------------------------------------------------------------------------------*/

    /* JSON                                                                                                           */

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_json_encode': function filter_json_encode(x, indent) {
      return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_json_jspath': function filter_json_jspath(x, path) {
      return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
    },

    /*----------------------------------------------------------------------------------------------------------------*/

    /* TEMPLATES                                                                                                      */

    /*----------------------------------------------------------------------------------------------------------------*/
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

      /*------------------------------------------------------------------------------------------------------------*/
      if (fileName in amiTwig.engine.tmpls) {
        var temp = {};
        /*--------------------------------------------------------------------------------------------------------*/

        if (withContext) {
          for (var i in amiTwig.engine.dict) {
            temp[i] = amiTwig.engine.dict[i];
          }
        }
        /*--------------------------------------------------------------------------------------------------------*/


        if (variables) {
          for (var _i7 in
          /*-*/
          variables
          /*-*/
          ) {
            temp[_i7] =
            /*-*/
            variables
            /*-*/
            [_i7];
          }
        }
        /*--------------------------------------------------------------------------------------------------------*/


        return amiTwig.engine.render(amiTwig.engine.tmpls[fileName], temp);
        /*--------------------------------------------------------------------------------------------------------*/
      }
      /*------------------------------------------------------------------------------------------------------------*/


      if (!ignoreMissing) {
        throw 'runtime error, could not open `' + fileName + '`';
      }

      return '';
      /*------------------------------------------------------------------------------------------------------------*/
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;
  /*--------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------*/

  /* amiTwig.expr.interpreter                                                                                           */

  /*--------------------------------------------------------------------------------------------------------------------*/

  amiTwig.expr.interpreter = {
    /*----------------------------------------------------------------------------------------------------------------*/
    _getJS: function _getJS(node) {
      var L;
      var x;
      var left;
      var right;
      var operator;

      switch (node.nodeType) {
        /*--------------------------------------------------------------------------------------------------------*/

        /* LST                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/
        case amiTwig.expr.tokens.LST:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var i in node.list) {
            L.push(
            /*-----*/
            this._getJS(node.list[i]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return '[' + L.join(',') + ']';

        /*--------------------------------------------------------------------------------------------------------*/

        /* DIC                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.DIC:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i8 in node.dict) {
            L.push(_i8 + ':' + this._getJS(node.dict[_i8]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return '{' + L.join(',') + '}';

        /*--------------------------------------------------------------------------------------------------------*/

        /* FUN                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.FUN:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i9 in node.list) {
            L.push(this._getJS(node.list[_i9]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return node.nodeValue + '(' + L.join(',') + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* VAR                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.VAR:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i10 in node.list) {
            L.push('[' + this._getJS(node.list[_i10]) + ']');
          }
          /*----------------------------------------------------------------------------------------------------*/


          return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

        /*--------------------------------------------------------------------------------------------------------*/

        /* TERMINAL                                                                                               */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.TERMINAL:
          return node.nodeValue;

        /*--------------------------------------------------------------------------------------------------------*/

        /* IS                                                                                                     */

        /*--------------------------------------------------------------------------------------------------------*/

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

        /*--------------------------------------------------------------------------------------------------------*/

        /* IN                                                                                                     */

        /*--------------------------------------------------------------------------------------------------------*/

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

        /*--------------------------------------------------------------------------------------------------------*/

        /* STARTS_WITH                                                                                            */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.STARTS_WITH:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* ENDS_WITH                                                                                              */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.ENDS_WITH:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* MATCHES                                                                                                */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.MATCHES:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* RANGE                                                                                                  */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.RANGE:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* DOT                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.DOT:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);

          if (node.nodeValue[0] === '.') {
            return left + '.' + right;
          } else {
            return left + '[' + right + ']';
          }

        /*--------------------------------------------------------------------------------------------------------*/

        /* FLDIV                                                                                                  */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.FLDIV:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'Math.floor(' + left + '/' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* POWER                                                                                                  */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.POWER:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return 'Math.pow(' + left + ',' + right + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* DOUBLE_QUESTION                                                                                        */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.DOUBLE_QUESTION:
          left = this._getJS(node.nodeLeft);
          right = this._getJS(node.nodeRight);
          return '((' + left + ') || (' + right + '))';

        /*--------------------------------------------------------------------------------------------------------*/

        default:
          /*----------------------------------------------------------------------------------------------------*/

          /* UNARY OPERATOR                                                                                     */

          /*----------------------------------------------------------------------------------------------------*/
          if (node.nodeLeft === null && node.nodeRight !== null) {
            operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
            return operator + '(' + this._getJS(node.nodeRight) + ')';
          }

          if (node.nodeLeft !== null && node.nodeRight === null) {
            operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';
            return '(' + this._getJS(node.nodeLeft) + ')' + operator;
          }
          /*----------------------------------------------------------------------------------------------------*/

          /* BINARY OPERATOR                                                                                    */

          /*----------------------------------------------------------------------------------------------------*/


          if (node.nodeLeft !== null && node.nodeRight !== null) {
            switch (node.nodeType) {
              /*--------------------------------------------------------------------------------------------*/
              case amiTwig.expr.tokens.LOGICAL_OR:
                operator = '||';
                break;

              /*--------------------------------------------------------------------------------------------*/

              case amiTwig.expr.tokens.LOGICAL_AND:
                operator = '&&';
                break;

              /*--------------------------------------------------------------------------------------------*/

              case amiTwig.expr.tokens.BITWISE_OR:
                operator = '|';
                break;

              /*--------------------------------------------------------------------------------------------*/

              case amiTwig.expr.tokens.BITWISE_XOR:
                operator = '^';
                break;

              /*--------------------------------------------------------------------------------------------*/

              case amiTwig.expr.tokens.BITWISE_AND:
                operator = '&';
                break;

              /*--------------------------------------------------------------------------------------------*/

              case amiTwig.expr.tokens.CONCAT:
                operator = '+';
                break;

              /*--------------------------------------------------------------------------------------------*/

              default:
                operator = node.nodeValue;
                break;

              /*--------------------------------------------------------------------------------------------*/
            }

            left = this._getJS(node.nodeLeft);
            right = this._getJS(node.nodeRight);
            return '(' + left + operator + right + ')';
          }

        /*--------------------------------------------------------------------------------------------------------*/
      }
      /*------------------------------------------------------------------------------------------------------------*/

    },

    /*----------------------------------------------------------------------------------------------------------------*/
    getJS: function getJS(expr) {
      return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    eval: function _eval(expr, _) {
      _ = _ || {};
      return eval(this.getJS(expr)).call(_, _);
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxwaGFudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsImNhY2hlIiwiZXZhbCIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJldmVyeSIsImJsb2NrIiwic3ltMSIsInN5bTIiLCJvcmlnVmFsdWUiLCJ0eXBlTmFtZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZXJWYWx1ZSIsImVudHJpZXMiLCJrZXlzIiwiayIsIm9sZDEiLCJvbGQyIiwib2xkMyIsImxvb3AiLCJ2YWwiLCJmaXJzdCIsImxhc3QiLCJyZXZpbmRleDAiLCJpbmRleDAiLCJyZXZpbmRleCIsIm1fMV8iLCJ3aXRoX3N1YmV4cHIiLCJ3aXRoX2NvbnRleHQiLCJmaWxlTmFtZSIsInZhcmlhYmxlcyIsImluY2x1ZGUiLCJyZW5kZXIiLCJfIiwiZiIsImludGVycHJldGVyIiwiZ2V0SlMiLCJ4IiwiaXNOdW1iZXIiLCJ5IiwiaXNBcnJheSIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJ4MSIsIngyIiwic3RlcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImlkeDEiLCJpZHgyIiwic2xpY2UiLCJhcmd1bWVudHMiLCJMIiwiRCIsInNvcnQiLCJyZXZlcnNlIiwic2VwIiwibWFwIiwibWlzc2luZyIsIk1hdGgiLCJjZWlsIiwiczEiLCJzMiIsImJhc2UiLCJyZWdleCIsImxhc3RJbmRleE9mIiwidGVzdCIsImVyciIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ0cmltIiwib2xkU3RycyIsIm5ld1N0cnMiLCJwIiwibW9kZSIsIl9yZXBsYWNlIiwiX3RleHRUb0h0bWxYIiwiX3RleHRUb0h0bWxZIiwiX3RleHRUb1N0cmluZ1giLCJfdGV4dFRvU3RyaW5nWSIsIl90ZXh0VG9Kc29uU3RyaW5nWCIsIl90ZXh0VG9Kc29uU3RyaW5nWSIsImVuY29kZVVSSUNvbXBvbmVudCIsInZhbHVlcyIsIm1heCIsImFicyIsImZsb29yIiwicm91bmQiLCJhcmdzIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJOYU4iLCJORUdBVElWRV9JTkZJTklUWSIsInJhbmRvbSIsIlgiLCJNQVhfU0FGRV9JTlRFR0VSIiwiaW5kZW50IiwicGF0aCIsIkpTUGF0aCIsImFwcGx5Iiwid2l0aENvbnRleHQiLCJpZ25vcmVNaXNzaW5nIiwiZmlsdGVyX2UiLCJmaWx0ZXJfZXNjYXBlIiwiX2dldEpTIiwib3BlcmF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxDQUFDLFlBQVc7QUFDWjtBQUVBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLE9BQU8sR0FBRztBQUNmQyxJQUFBQSxPQUFPLEVBQUU7QUFETSxHQUFoQjtBQUlBOztBQUVBOztBQUFLLE1BQUcsT0FBT0MsTUFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPQSxNQUFNLENBQUNDLE9BQWQsS0FBMEIsUUFBM0QsRUFDTDtBQUNDRCxJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsT0FBZixHQUF5QkEsT0FBekI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPSSxNQUFQLEtBQWtCLFdBQXJCLEVBQ0w7QUFDQ0EsSUFBQUEsTUFBTSxDQUFDSixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBLEdBSEksTUFJQSxJQUFHLE9BQU9LLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDQSxJQUFBQSxNQUFNLENBQUNMLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0E7QUFFRDtBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7QUFFQUEsRUFBQUEsT0FBTyxDQUFDTSxTQUFSLEdBQW9CO0FBQ25CO0FBRUFDLElB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QTRCc0IsQ0FBNUIsRUFBK0JBLENBQS9CLENBQVA7QUFDQTtBQUVEOztBQS9WMEIsR0FBM0I7QUFrV0E7QUFDQyxDQXI5R0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEFNSSBUd2lnIEVuZ2luZVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LTIwMjEgQ05SUy9MUFNDXG4gKlxuICogQXV0aG9yOiBKw6lyw7RtZSBPRElFUiAoamVyb21lLm9kaWVyQGxwc2MuaW4ycDMuZnIpXG4gKlxuICogUmVwb3NpdG9yaWVzOiBodHRwczovL2dpdGxhYi5pbjJwMy5mci9hbWktdGVhbS9BTUlUd2lnSlMvXG4gKiAgICAgICAgICAgICAgIGh0dHBzOi8vd3d3LmdpdGh1Yi5jb20vYW1pLXRlYW0vQU1JVHdpZ0pTL1xuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgYSBjb21wdXRlciBwcm9ncmFtIHdob3NlIHB1cnBvc2UgaXMgdG8gcHJvdmlkZSBhXG4gKiBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZW5zaW9MYWJzJ3MgVFdJRyB0ZW1wbGF0ZSBlbmdpbmUuXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBnb3Zlcm5lZCBieSB0aGUgQ2VDSUxMLUMgbGljZW5zZSB1bmRlciBGcmVuY2ggbGF3IGFuZFxuICogYWJpZGluZyBieSB0aGUgcnVsZXMgb2YgZGlzdHJpYnV0aW9uIG9mIGZyZWUgc29mdHdhcmUuIFlvdSBjYW4gdXNlLFxuICogbW9kaWZ5IGFuZC9vciByZWRpc3RyaWJ1dGUgdGhlIHNvZnR3YXJlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgQ2VDSUxMLUNcbiAqIGxpY2Vuc2UgYXMgY2lyY3VsYXRlZCBieSBDRUEsIENOUlMgYW5kIElOUklBIGF0IHRoZSBmb2xsb3dpbmcgVVJMXG4gKiBcImh0dHA6Ly93d3cuY2VjaWxsLmluZm9cIi5cbiAqXG4gKiBUaGUgZmFjdCB0aGF0IHlvdSBhcmUgcHJlc2VudGx5IHJlYWRpbmcgdGhpcyBtZWFucyB0aGF0IHlvdSBoYXZlIGhhZFxuICoga25vd2xlZGdlIG9mIHRoZSBDZUNJTEwtQyBsaWNlbnNlIGFuZCB0aGF0IHlvdSBhY2NlcHQgaXRzIHRlcm1zLlxuICpcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMi4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKi8gaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jylcbntcblx0bW9kdWxlLmV4cG9ydHMuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5lbHNlIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxue1xuXHR3aW5kb3cuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5lbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKVxue1xuXHRnbG9iYWwuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vL2V4cG9ydCBkZWZhdWx0IGFtaVR3aWc7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG9rZW5pemVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRva2VuaXplOiBmdW5jdGlvbihjb2RlLCBsaW5lLCBzcGFjZXMsIHRva2VuRGVmcywgdG9rZW5UeXBlcywgZXJyb3IpXG5cdHtcblx0XHRpZih0b2tlbkRlZnMubGVuZ3RoICE9PSB0b2tlblR5cGVzLmxlbmd0aClcblx0XHR7XG5cdFx0XHR0aHJvdyAnYHRva2VuRGVmcy5sZW5ndGggIT0gdG9rZW5UeXBlcy5sZW5ndGhgJztcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHRfdG9rZW5zID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X3R5cGVzID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X2xpbmVzID0gW107XG5cblx0XHRsZXQgaSA9IDB4MDAwMDAwMDAwO1xuXHRcdGNvbnN0IGwgPSBjb2RlLmxlbmd0aDtcblxuXHRcdGxldCB3b3JkID0gJycsIHRva2VuLCBjO1xuXG5fX2wwOlx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbHBoYW51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FscGhhbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxwaGFudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLnRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENPTVBPU0lURSBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLklTX1hYWCA9IFtcblx0XHRcdHRoaXMuREVGSU5FRCxcblx0XHRcdHRoaXMuTlVMTCxcblx0XHRcdHRoaXMuRU1QVFksXG5cdFx0XHR0aGlzLklURVJBQkxFLFxuXHRcdFx0dGhpcy5FVkVOLFxuXHRcdFx0dGhpcy5PREQsXG5cdFx0XTtcblxuXHRcdHRoaXMuWFhYX1dJVEggPSBbXG5cdFx0XHR0aGlzLlNUQVJUU19XSVRILFxuXHRcdFx0dGhpcy5FTkRTX1dJVEgsXG5cdFx0XTtcblxuXHRcdHRoaXMuUExVU19NSU5VUyA9IFtcblx0XHRcdHRoaXMuQ09OQ0FULFxuXHRcdFx0dGhpcy5QTFVTLFxuXHRcdFx0dGhpcy5NSU5VUyxcblx0XHRdO1xuXG5cdFx0dGhpcy5NVUxfRkxESVZfRElWX01PRCA9IFtcblx0XHRcdHRoaXMuTVVMLFxuXHRcdFx0dGhpcy5GTERJVixcblx0XHRcdHRoaXMuRElWLFxuXHRcdFx0dGhpcy5NT0QsXG5cdFx0XTtcblxuXHRcdHRoaXMuUlggPSBbXG5cdFx0XHR0aGlzLlJQLFxuXHRcdFx0dGhpcy5SQjEsXG5cdFx0XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExPR0lDQUxfT1I6IDEwMCxcblx0TE9HSUNBTF9BTkQ6IDEwMSxcblx0QklUV0lTRV9PUjogMTAyLFxuXHRCSVRXSVNFX1hPUjogMTAzLFxuXHRCSVRXSVNFX0FORDogMTA0LFxuXHROT1Q6IDEwNSxcblx0SVM6IDEwNixcblx0REVGSU5FRDogMTA3LFxuXHROVUxMOiAxMDgsXG5cdEVNUFRZOiAxMDksXG5cdElURVJBQkxFOiAxMTAsXG5cdEVWRU46IDExMSxcblx0T0REOiAxMTIsXG5cdENNUF9PUDogMTEzLFxuXHRTVEFSVFNfV0lUSDogMTE0LFxuXHRFTkRTX1dJVEg6IDExNSxcblx0TUFUQ0hFUzogMTE2LFxuXHRJTjogMTE3LFxuXHRSQU5HRTogMTE4LFxuXHRDT05DQVQ6IDExOSxcblx0UExVUzogMTIwLFxuXHRNSU5VUzogMTIxLFxuXHRQT1dFUjogMTIyLFxuXHRNVUw6IDEyMyxcblx0RkxESVY6IDEyNCxcblx0RElWOiAxMjUsXG5cdE1PRDogMTI2LFxuIFx0RE9VQkxFX1FVRVNUSU9OOiAxMjcsXG4gXHRRVUVTVElPTjogMTI4LFxuXHRDT0xPTjogMTI5LFxuXHRET1Q6IDEzMCxcblx0Q09NTUE6IDEzMSxcblx0UElQRTogMTMyLFxuXHRMUDogMTMzLFxuXHRSUDogMTM0LFxuXHRMQjE6IDEzNSxcblx0UkIxOiAxMzYsXG5cdExCMjogMTM3LFxuXHRSQjI6IDEzOCxcblx0U0lEOiAxMzksXG5cdFRFUk1JTkFMOiAxNDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMU1Q6IDIwMCxcblx0RElDOiAyMDEsXG5cdEZVTjogMjAyLFxuXHRWQVI6IDIwMyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMuJGluaXQoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuVG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuVG9rZW5pemVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3NwYWNlcyA9IFsnICcsICdcXHQnLCAnXFxuJywgJ1xcciddO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc/PycsXG5cdFx0Jz8nLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuVHlwZXMgPSBbXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTVBUWSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk9ERCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QTFVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUlOVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QT1dFUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1VTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTU9ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0ID0gZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGFtaVR3aWcudG9rZW5pemVyLnRva2VuaXplKFxuXHRcdFx0Y29kZSxcblx0XHRcdGxpbmUsXG5cdFx0XHR0aGlzLl9zcGFjZXMsXG5cdFx0XHR0aGlzLl90b2tlbkRlZnMsXG5cdFx0XHR0aGlzLl90b2tlblR5cGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLm5leHQgPSBmdW5jdGlvbihuID0gMSlcblx0e1xuXHRcdHRoaXMuaSArPSBuO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUb2tlbiA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVHlwZSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnR5cGVzW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VuaXplciA9IG5ldyBhbWlUd2lnLmV4cHIuVG9rZW5pemVyKFxuXHRcdFx0dGhpcy5jb2RlID0gY29kZSxcblx0XHRcdHRoaXMubGluZSA9IGxpbmVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yb290Tm9kZS5kdW1wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU51bGxDb2FsZXNjaW5nOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTnVsbENvYWxlc2NpbmcgOiBMb2dpY2FsT3IgKCc/PycgTG9naWNhbE9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbE9yIDogTG9naWNhbEFuZCAoJ29yJyBMb2dpY2FsQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsQW5kIDogQml0d2lzZU9yICgnYW5kJyBCaXR3aXNlT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZU9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlWG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VYb3IgOiBCaXR3aXNlQW5kICgnYi14b3InIEJpdHdpc2VBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VBbmQgOiBOb3QgKCdiLWFuZCcgTm90KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOb3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQ29tcCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDb21wIDogQWRkU3ViICdpcycgJ25vdCc/ICgnZGVmaW5lZCcgfCAnbnVsbCcgfCAuLi4pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnPT09JyB8ICc9PScgfCAuLi4pIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJ3N0YXJ0cycgfCAnZW5kcycpIGB3aXRoYCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnbWF0Y2hlcycgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdpbicgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFkZFN1YjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTXVsRGl2KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFkZFN1YiA6IE11bERpdiAoKCcrJyB8ICctJykgTXVsRGl2KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTXVsRGl2KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE11bERpdiA6IFBsdXNNaW51cyAoKCcqJyB8ICcvLycgfCAnLycgfCAnJScpIFBsdXNNaW51cykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQbHVzTWludXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBvd2VyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZVBvd2VyKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VGaWx0ZXIoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBGaWx0ZXIgKCcqKicgRmlsdGVyKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90MSgpLCBub2RlLCB0ZW1wO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEZpbHRlciA6IERvdDEgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QSVBFKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRG90MSh0cnVlKTtcblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHR0ZW1wLmxpc3QudW5zaGlmdChsZWZ0KTtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0ZW1wID0gbm9kZTtcblxuXHRcdFx0Zm9yKDsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRlbXAucSlcblx0XHRcdHtcblx0XHRcdFx0LyoqLyBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHRlbXAubm9kZVZhbHVlIGluIGFtaVR3aWcuc3RkbGliKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gJ2FtaVR3aWcuc3RkbGliLicgKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5WQVIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGVtcC5xID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QyIDogRG90MyAoJy4nIERvdDMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksICcuJyk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QzIDogWCAoJ1snIE51bGxDb2FsZXNjaW5nICddJykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULCAnW10nKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogWCA6IEdyb3VwIHwgQXJyYXkgfCBPYmplY3QgfCBGdW5WYXIgfCBUZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTWU5UQVggRVJST1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHJ1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIgPSBmdW5jdGlvbih0bXBsKSB7XG5cblx0dGhpcy4kaW5pdCh0bXBsKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFNUQVRFTUVOVF9SRTogL3slXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJX0vLFxuXG5cdENPTU1FTlRfUkU6IC97I1xccyooKD86LnxcXG4pKj8pXFxzKiN9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZW5naW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFZBUklBQkxFX1JFOiAve3tcXHMqKC4qPylcXHMqfX0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLygoPzpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXC4pKlthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBtWzFdLnNwbGl0KCcuJyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRcdGxldCBwYXJlbnQsIGo7XG5cblx0XHRcdFx0aWYocGFydHNbMF0gPT09ICd3aW5kb3cnXG5cdFx0XHRcdCAgIHx8XG5cdFx0XHRcdCAgIHBhcnRzWzBdID09PSAnZ2xvYmFsJ1xuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0LyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gd2luZG93O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBnbG9iYWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJlbnQgPSBkaWN0O1xuXG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpO1xuXG5cdFx0XHRcdGZvcihpID0gajsgaSA8IGw7IGkrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGAnICsgbVsxXSArICdgIG5vdCBkZWNsYXJlZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnRbcGFydHNbaV1dID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwobVsyXSwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ0B0ZXh0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElGICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdGNhc2UgJ0Byb290Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpdGVtLmJsb2Nrcy5ldmVyeSgoYmxvY2spID0+IHtcblxuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBibG9jay5leHByZXNzaW9uO1xuXG5cdFx0XHRcdFx0aWYoZXhwcmVzc2lvbiA9PT0gJ0B0cnVlJyB8fCBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGJsb2NrLmxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGJsb2NrLmxpc3RbaV0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2Zvcic6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHN5bTE7XG5cdFx0XHRcdGxldCBzeW0yO1xuXHRcdFx0XHRsZXQgZXhwcjtcblxuXHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqLFxccyooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRcdHN5bTIgPSBudWxsO1xuXHRcdFx0XHRcdFx0ZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdHN5bTIgPSBtWzJdO1xuXHRcdFx0XHRcdGV4cHIgPSBtWzNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdWYWx1ZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaXRlclZhbHVlO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IHN5bTIgPyBPYmplY3QuZW50cmllcyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gb3JpZ1ZhbHVlO1xuXG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZCBub3QgaXRlcmFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBba2V5LCB2YWxdIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGtleTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCB2YWwgb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkaWN0OiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRfID0gXyB8fCB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuc3RkbGliICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWQVJJQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFbXB0eSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih4ID09PSBudWxsXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSBmYWxzZVxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gKCgnJykpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gKHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nICYmIHgubGVuZ3RoID09PSAwKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICAodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gMClcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgTnVtYmVyXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNBcnJheSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2JqZWN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0V2ZW4nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHggaW4geTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmdlJzogZnVuY3Rpb24oeDEsIHgyLCBzdGVwID0gMSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyoqLyBpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0gLyotLS0qL3gxLyotLS0qLzsgaSA8PSAvKi0tLSoveDIvKi0tLSovOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tKi8oaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IHgxLmNoYXJDb2RlQXQoMCk7IGkgPD0geDIuY2hhckNvZGVBdCgwKTsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNPYmplY3QoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xhc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFt4Lmxlbmd0aCAtIDFdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc1N0cmluZyhpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRMLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMLmpvaW4oJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBMLnB1c2goaXRlbVtqXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgRCA9IHt9O1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc09iamVjdChpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBpdGVtKSBEW2pdID0gaXRlbVtqXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBEO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc29ydCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5zb3J0KCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmV2ZXJzZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5yZXZlcnNlKCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfam9pbic6IGZ1bmN0aW9uKHgsIHNlcClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LmpvaW4oc2VwKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9rZXlzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzT2JqZWN0KHgpID8gT2JqZWN0LmtleXMoeCkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY29sdW1uJzogZnVuY3Rpb24oeCwga2V5KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgubWFwKCh2YWwpID0+IHZhbFtrZXldKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9iYXRjaCc6IGZ1bmN0aW9uKHgsIG4sIG1pc3NpbmcgPSAnJylcblx0e1xuXHQgICAgY29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIobilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBsID0geC5sZW5ndGg7XG5cblx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgbGFzdDtcblxuXHRcdFx0XHRjb25zdCBtID0gTWF0aC5jZWlsKGwgLyBuKSAqIG47XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKGxhc3QgPSB4LnNsaWNlKGksIGkgKyBuKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IobGV0IGkgPSBsOyBpIDwgbTsgaSArPSAxKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGFzdC5wdXNoKG1pc3NpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBTVFJJTkdTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdzdGFydHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IDB4MDAwMDAwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdlbmRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSBzMS5sZW5ndGggLSBzMi5sZW5ndGg7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF0Y2gnOiBmdW5jdGlvbihzLCByZWdleClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoKChzKSkpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHJlZ2V4KVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGlkeDEgPSByZWdleC4gIGluZGV4T2YgICgnLycpO1xuXHRcdFx0Y29uc3QgaWR4MiA9IHJlZ2V4Lmxhc3RJbmRleE9mKCcvJyk7XG5cblx0XHRcdGlmKGlkeDEgPT09IDAgfHwgaWR4MSA8IGlkeDIpXG5cdFx0XHR7XG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAocmVnZXguc3Vic3RyaW5nKGlkeDEgKyAxLCBpZHgyKSwgcmVnZXguc3Vic3RyaW5nKGlkeDIgKyAxKSkudGVzdChzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlcnIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZGVmYXVsdCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdHJldHVybiBzMSB8fCBzMiB8fCAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbG93ZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvTG93ZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXBwZXInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRvVXBwZXJDYXNlKCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15cXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RpdGxlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90cmltJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50cmltKClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J19yZXBsYWNlJzogZnVuY3Rpb24ocywgb2xkU3RycywgbmV3U3Rycylcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0Y29uc3QgbCA9ICgoKHMpKSkubGVuZ3RoO1xuXHRcdGNvbnN0IG0gPSBvbGRTdHJzLmxlbmd0aDtcblx0XHRjb25zdCBuID0gbmV3U3Rycy5sZW5ndGg7XG5cblx0XHRpZihtICE9PSBuKVxuXHRcdHtcblx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0fVxuXG5fX2wwOlx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkgKz0gMClcblx0XHR7XG5cdFx0XHRjb25zdCBwID0gcy5zdWJzdHJpbmcoaSk7XG5cblx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCBtOyBqICs9IDEpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHAuaW5kZXhPZihvbGRTdHJzW2pdKSA9PT0gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlc3VsdC5wdXNoKG5ld1N0cnNbal0pO1xuXG5cdFx0XHRcdFx0aSArPSBvbGRTdHJzW2pdLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0LnB1c2gocy5jaGFyQXQoaSsrKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSHRtbFgnOiBbJyYnICAgICwgJ1wiJyAgICAgLCAnPCcgICAsICc+JyAgIF0sXG5cdCdfdGV4dFRvSHRtbFknOiBbJyZhbXA7JywgJyZxdW90OycsICcmbHQ7JywgJyZndDsnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgIF0sXG5cdCdfdGV4dFRvSnNvblN0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxuJywgJ1xcXFxcIiddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9lc2NhcGUnOiBmdW5jdGlvbihzLCBtb2RlKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRzd2l0Y2gobW9kZSB8fCAnaHRtbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ2h0bWwnOlxuXHRcdFx0XHRjYXNlICdodG1sX2F0dHInOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0h0bWxYLCB0aGlzLl90ZXh0VG9IdG1sWSk7XG5cblx0XHRcdFx0Y2FzZSAnanMnOlxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb1N0cmluZ1gsIHRoaXMuX3RleHRUb1N0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9yZXBsYWNlKHMsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdYLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAndXJsJzpcblx0XHRcdFx0XHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuIHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cmxfZW5jb2RlJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gZW5jb2RlVVJJQ29tcG9uZW50KHMpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbmwyYnInOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnJlcGxhY2UoL1xcbi9nLCAnPGJyLz4nKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3Jhdyc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXBsYWNlJzogZnVuY3Rpb24ocywgZGljdClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpICYmIHRoaXMuaXNPYmplY3QoZGljdCkgPyB0aGlzLl9yZXBsYWNlKHMsIE9iamVjdC5rZXlzKGRpY3QpLCBPYmplY3QudmFsdWVzKGRpY3QpKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc3BsaXQnOiBmdW5jdGlvbihzLCBzZXAsIG1heClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5zcGxpdChzZXAsIG1heClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIE5VTUJFUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9hYnMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE1hdGguYWJzKHgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yb3VuZCc6IGZ1bmN0aW9uKHgsIG1vZGUpXG5cdHtcblx0XHRzd2l0Y2gobW9kZSlcblx0XHR7XG5cdFx0XHRjYXNlICdjZWlsJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCh4KTtcblxuXHRcdFx0Y2FzZSAnZmxvb3InOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4KTtcblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoeCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21pbic6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPiBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWF4JzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA8IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSQU5ET00gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5kb20nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgeSA9IE1hdGgucmFuZG9tKCk7XG5cblx0XHRpZih4KVxuXHRcdHtcblx0XHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdFx0ICAgfHxcblx0XHRcdCAgIHRoaXMuaXNPYmplY3QoeClcblx0XHRcdCApIHtcblx0XHRcdCBcdGNvbnN0IFggPSBPYmplY3Qua2V5cyh4KTtcblxuXHRcdFx0XHRyZXR1cm4geFtcblx0XHRcdFx0XHRYW01hdGguZmxvb3IoWC5sZW5ndGggKiB5KV1cblx0XHRcdFx0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyh4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHhbTWF0aC5mbG9vcih4Lmxlbmd0aCAqIHkpXTtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5pc051bWJlcih4KSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHggPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcblxuXHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRfID0gXyB8fCB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSkoKTsiXX0=
