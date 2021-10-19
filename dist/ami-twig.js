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
    _alnum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    _checkNextChar: function _checkNextChar(s, token) {
      var length = token.length;
      var charCode2 = s.charCodeAt(length - 0);
      var charCode1 = s.charCodeAt(length - 1);
      return isNaN(charCode2) || this._alnum[charCode2] === 0 || this._alnum[charCode1] === 0;
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


      throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';
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
    STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%\}/,
    COMMENT_RE: /\{#\s*((?:.|\n)*?)\s*#\}/g,

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
    VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

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


            for (var i = j; i < l; i++) {
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
                throw 'syntax error, line `' + item.line + '`, right operande not iterable';
              }

              if (sym2) {
                throw 'syntax error, line `' + item.line + '`, right operande not an object';
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


      if (!_) _ = {};
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

          /* UNIARY OPERATOR                                                                                    */

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
      if (!_) _ = {};
      return eval(this.getJS(expr)).call(_, _);
    }
    /*----------------------------------------------------------------------------------------------------------------*/

  };
  /*--------------------------------------------------------------------------------------------------------------------*/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsImNhY2hlIiwiZXZhbCIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJldmVyeSIsImJsb2NrIiwic3ltMSIsInN5bTIiLCJvcmlnVmFsdWUiLCJ0eXBlTmFtZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZXJWYWx1ZSIsImVudHJpZXMiLCJrZXlzIiwiayIsIm9sZDEiLCJvbGQyIiwib2xkMyIsImxvb3AiLCJ2YWwiLCJmaXJzdCIsImxhc3QiLCJyZXZpbmRleDAiLCJpbmRleDAiLCJyZXZpbmRleCIsIm1fMV8iLCJ3aXRoX3N1YmV4cHIiLCJ3aXRoX2NvbnRleHQiLCJmaWxlTmFtZSIsInZhcmlhYmxlcyIsImluY2x1ZGUiLCJyZW5kZXIiLCJfIiwiZiIsImludGVycHJldGVyIiwiZ2V0SlMiLCJ4IiwiaXNOdW1iZXIiLCJ5IiwiaXNBcnJheSIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJ4MSIsIngyIiwic3RlcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImlkeDEiLCJpZHgyIiwic2xpY2UiLCJhcmd1bWVudHMiLCJMIiwiRCIsInNvcnQiLCJyZXZlcnNlIiwic2VwIiwibWFwIiwibWlzc2luZyIsIk1hdGgiLCJjZWlsIiwiczEiLCJzMiIsImJhc2UiLCJyZWdleCIsImxhc3RJbmRleE9mIiwidGVzdCIsImVyciIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ0cmltIiwib2xkU3RycyIsIm5ld1N0cnMiLCJwIiwibW9kZSIsIl9yZXBsYWNlIiwiX3RleHRUb0h0bWxYIiwiX3RleHRUb0h0bWxZIiwiX3RleHRUb1N0cmluZ1giLCJfdGV4dFRvU3RyaW5nWSIsIl90ZXh0VG9Kc29uU3RyaW5nWCIsIl90ZXh0VG9Kc29uU3RyaW5nWSIsImVuY29kZVVSSUNvbXBvbmVudCIsInZhbHVlcyIsIm1heCIsImFicyIsImZsb29yIiwicm91bmQiLCJhcmdzIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJOYU4iLCJORUdBVElWRV9JTkZJTklUWSIsInJhbmRvbSIsIlgiLCJNQVhfU0FGRV9JTlRFR0VSIiwiaW5kZW50IiwicGF0aCIsIkpTUGF0aCIsImFwcGx5Iiwid2l0aENvbnRleHQiLCJpZ25vcmVNaXNzaW5nIiwiZmlsdGVyX2UiLCJmaWx0ZXJfZXNjYXBlIiwiX2dldEpTIiwib3BlcmF0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxDQUFDLFlBQVc7QUFDWjtBQUVBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLE9BQU8sR0FBRztBQUNmQyxJQUFBQSxPQUFPLEVBQUU7QUFETSxHQUFoQjtBQUlBOztBQUVBOztBQUFLLE1BQUcsT0FBT0MsTUFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPQSxNQUFNLENBQUNDLE9BQWQsS0FBMEIsUUFBM0QsRUFDTDtBQUNDRCxJQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsT0FBZixHQUF5QkEsT0FBekI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPSSxNQUFQLEtBQWtCLFdBQXJCLEVBQ0w7QUFDQ0EsSUFBQUEsTUFBTSxDQUFDSixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBLEdBSEksTUFJQSxJQUFHLE9BQU9LLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDQSxJQUFBQSxNQUFNLENBQUNMLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0E7QUFFRDtBQUVBOztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7QUFFQUEsRUFBQUEsT0FBTyxDQUFDTSxTQUFSLEdBQW9CO0FBQ25CO0FBRUFDLElBQUFB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QUFELENBQUosQ0FBdUJpSyxJQUF2QixDQUE0QnNCLENBQTVCLEVBQStCQSxDQUEvQixDQUFQO0FBQ0E7QUFFRDs7QUEvVjBCLEdBQTNCO0FBa1dBO0FBQ0MsQ0FuOUdEIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC0yMDIxIENOUlMvTFBTQ1xuICpcbiAqIEF1dGhvcjogSsOpcsO0bWUgT0RJRVIgKGplcm9tZS5vZGllckBscHNjLmluMnAzLmZyKVxuICpcbiAqIFJlcG9zaXRvcmllczogaHR0cHM6Ly9naXRsYWIuaW4ycDMuZnIvYW1pLXRlYW0vQU1JVHdpZ0pTL1xuICogICAgICAgICAgICAgICBodHRwczovL3d3dy5naXRodWIuY29tL2FtaS10ZWFtL0FNSVR3aWdKUy9cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGEgY29tcHV0ZXIgcHJvZ3JhbSB3aG9zZSBwdXJwb3NlIGlzIHRvIHByb3ZpZGUgYVxuICogSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2Vuc2lvTGFicydzIFRXSUcgdGVtcGxhdGUgZW5naW5lLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgZ292ZXJuZWQgYnkgdGhlIENlQ0lMTC1DIGxpY2Vuc2UgdW5kZXIgRnJlbmNoIGxhdyBhbmRcbiAqIGFiaWRpbmcgYnkgdGhlIHJ1bGVzIG9mIGRpc3RyaWJ1dGlvbiBvZiBmcmVlIHNvZnR3YXJlLiBZb3UgY2FuIHVzZSxcbiAqIG1vZGlmeSBhbmQvb3IgcmVkaXN0cmlidXRlIHRoZSBzb2Z0d2FyZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DXG4gKiBsaWNlbnNlIGFzIGNpcmN1bGF0ZWQgYnkgQ0VBLCBDTlJTIGFuZCBJTlJJQSBhdCB0aGUgZm9sbG93aW5nIFVSTFxuICogXCJodHRwOi8vd3d3LmNlY2lsbC5pbmZvXCIuXG4gKlxuICogVGhlIGZhY3QgdGhhdCB5b3UgYXJlIHByZXNlbnRseSByZWFkaW5nIHRoaXMgbWVhbnMgdGhhdCB5b3UgaGF2ZSBoYWRcbiAqIGtub3dsZWRnZSBvZiB0aGUgQ2VDSUxMLUMgbGljZW5zZSBhbmQgdGhhdCB5b3UgYWNjZXB0IGl0cyB0ZXJtcy5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjIuMCdcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiovIGlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpXG57XG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbntcblx0d2luZG93LmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJylcbntcblx0Z2xvYmFsLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy9leHBvcnQgZGVmYXVsdCBhbWlUd2lnO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRva2VuaXplciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdFx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbG51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FsbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLnRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENPTVBPU0lURSBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLklTX1hYWCA9IFtcblx0XHRcdHRoaXMuREVGSU5FRCxcblx0XHRcdHRoaXMuTlVMTCxcblx0XHRcdHRoaXMuRU1QVFksXG5cdFx0XHR0aGlzLklURVJBQkxFLFxuXHRcdFx0dGhpcy5FVkVOLFxuXHRcdFx0dGhpcy5PREQsXG5cdFx0XTtcblxuXHRcdHRoaXMuWFhYX1dJVEggPSBbXG5cdFx0XHR0aGlzLlNUQVJUU19XSVRILFxuXHRcdFx0dGhpcy5FTkRTX1dJVEgsXG5cdFx0XTtcblxuXHRcdHRoaXMuUExVU19NSU5VUyA9IFtcblx0XHRcdHRoaXMuQ09OQ0FULFxuXHRcdFx0dGhpcy5QTFVTLFxuXHRcdFx0dGhpcy5NSU5VUyxcblx0XHRdO1xuXG5cdFx0dGhpcy5NVUxfRkxESVZfRElWX01PRCA9IFtcblx0XHRcdHRoaXMuTVVMLFxuXHRcdFx0dGhpcy5GTERJVixcblx0XHRcdHRoaXMuRElWLFxuXHRcdFx0dGhpcy5NT0QsXG5cdFx0XTtcblxuXHRcdHRoaXMuUlggPSBbXG5cdFx0XHR0aGlzLlJQLFxuXHRcdFx0dGhpcy5SQjEsXG5cdFx0XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExPR0lDQUxfT1I6IDEwMCxcblx0TE9HSUNBTF9BTkQ6IDEwMSxcblx0QklUV0lTRV9PUjogMTAyLFxuXHRCSVRXSVNFX1hPUjogMTAzLFxuXHRCSVRXSVNFX0FORDogMTA0LFxuXHROT1Q6IDEwNSxcblx0SVM6IDEwNixcblx0REVGSU5FRDogMTA3LFxuXHROVUxMOiAxMDgsXG5cdEVNUFRZOiAxMDksXG5cdElURVJBQkxFOiAxMTAsXG5cdEVWRU46IDExMSxcblx0T0REOiAxMTIsXG5cdENNUF9PUDogMTEzLFxuXHRTVEFSVFNfV0lUSDogMTE0LFxuXHRFTkRTX1dJVEg6IDExNSxcblx0TUFUQ0hFUzogMTE2LFxuXHRJTjogMTE3LFxuXHRSQU5HRTogMTE4LFxuXHRDT05DQVQ6IDExOSxcblx0UExVUzogMTIwLFxuXHRNSU5VUzogMTIxLFxuXHRQT1dFUjogMTIyLFxuXHRNVUw6IDEyMyxcblx0RkxESVY6IDEyNCxcblx0RElWOiAxMjUsXG5cdE1PRDogMTI2LFxuIFx0RE9VQkxFX1FVRVNUSU9OOiAxMjcsXG4gXHRRVUVTVElPTjogMTI4LFxuXHRDT0xPTjogMTI5LFxuXHRET1Q6IDEzMCxcblx0Q09NTUE6IDEzMSxcblx0UElQRTogMTMyLFxuXHRMUDogMTMzLFxuXHRSUDogMTM0LFxuXHRMQjE6IDEzNSxcblx0UkIxOiAxMzYsXG5cdExCMjogMTM3LFxuXHRSQjI6IDEzOCxcblx0U0lEOiAxMzksXG5cdFRFUk1JTkFMOiAxNDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMU1Q6IDIwMCxcblx0RElDOiAyMDEsXG5cdEZVTjogMjAyLFxuXHRWQVI6IDIwMyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMuJGluaXQoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuVG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuVG9rZW5pemVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3NwYWNlcyA9IFsnICcsICdcXHQnLCAnXFxuJywgJ1xcciddO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc/PycsXG5cdFx0Jz8nLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuVHlwZXMgPSBbXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTVBUWSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk9ERCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QTFVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUlOVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QT1dFUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1VTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTU9ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0ID0gZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGFtaVR3aWcudG9rZW5pemVyLnRva2VuaXplKFxuXHRcdFx0Y29kZSxcblx0XHRcdGxpbmUsXG5cdFx0XHR0aGlzLl9zcGFjZXMsXG5cdFx0XHR0aGlzLl90b2tlbkRlZnMsXG5cdFx0XHR0aGlzLl90b2tlblR5cGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLm5leHQgPSBmdW5jdGlvbihuID0gMSlcblx0e1xuXHRcdHRoaXMuaSArPSBuO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUb2tlbiA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVHlwZSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnR5cGVzW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VuaXplciA9IG5ldyBhbWlUd2lnLmV4cHIuVG9rZW5pemVyKFxuXHRcdFx0dGhpcy5jb2RlID0gY29kZSxcblx0XHRcdHRoaXMubGluZSA9IGxpbmVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yb290Tm9kZS5kdW1wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU51bGxDb2FsZXNjaW5nOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTnVsbENvYWxlc2NpbmcgOiBMb2dpY2FsT3IgKCc/PycgTG9naWNhbE9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbE9yIDogTG9naWNhbEFuZCAoJ29yJyBMb2dpY2FsQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsQW5kIDogQml0d2lzZU9yICgnYW5kJyBCaXR3aXNlT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZU9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlWG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VYb3IgOiBCaXR3aXNlQW5kICgnYi14b3InIEJpdHdpc2VBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VBbmQgOiBOb3QgKCdiLWFuZCcgTm90KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOb3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQ29tcCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDb21wIDogQWRkU3ViICdpcycgJ25vdCc/ICgnZGVmaW5lZCcgfCAnbnVsbCcgfCAuLi4pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnPT09JyB8ICc9PScgfCAuLi4pIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJ3N0YXJ0cycgfCAnZW5kcycpIGB3aXRoYCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnbWF0Y2hlcycgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdpbicgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFkZFN1YjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTXVsRGl2KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFkZFN1YiA6IE11bERpdiAoKCcrJyB8ICctJykgTXVsRGl2KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTXVsRGl2KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE11bERpdiA6IFBsdXNNaW51cyAoKCcqJyB8ICcvLycgfCAnLycgfCAnJScpIFBsdXNNaW51cykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQbHVzTWludXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBvd2VyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZVBvd2VyKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VGaWx0ZXIoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBGaWx0ZXIgKCcqKicgRmlsdGVyKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90MSgpLCBub2RlLCB0ZW1wO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEZpbHRlciA6IERvdDEgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QSVBFKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRG90MSh0cnVlKTtcblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpO1xuXG5cdFx0XHR0ZW1wLmxpc3QudW5zaGlmdChsZWZ0KTtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxldCB0ZW1wID0gbm9kZTtcblxuXHRcdFx0Zm9yKDsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRlbXAucSlcblx0XHRcdHtcblx0XHRcdFx0LyoqLyBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHRlbXAubm9kZVZhbHVlIGluIGFtaVR3aWcuc3RkbGliKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gJ2FtaVR3aWcuc3RkbGliLicgKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5WQVIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGVtcC5xID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QyIDogRG90MyAoJy4nIERvdDMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksICcuJyk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QzIDogWCAoJ1snIE51bGxDb2FsZXNjaW5nICddJykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULCAnW10nKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogWCA6IEdyb3VwIHwgQXJyYXkgfCBPYmplY3QgfCBGdW5WYXIgfCBUZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTWU5UQVggRVJST1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUdyb3VwOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBOdWxsQ29hbGVzY2luZyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQXJyYXkgOiAnWycgU2luZ2xldHMgJ10nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBkaWN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjIpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0ZGljdCA9IHRoaXMuX3BhcnNlRG91YmxldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ESUMsICdPYmplY3QnKTtcblxuXHRcdFx0XHRub2RlLmRpY3QgPSBkaWN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGB9YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZ1blZhcjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSgwLCBpc0ZpbHRlciA/ICdmaWx0ZXJfJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpIDogdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXG5cdFx0XHRub2RlLnEgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRnVuVmFyIDogU0lEICcoJyBTaW5nbGV0cyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qICAgICAgICB8IFNJRCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGlzRmlsdGVyID8gYW1pVHdpZy5leHByLnRva2Vucy5GVU5cblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pVHdpZy5leHByLnRva2Vucy5WQVJcblx0XHRcdFx0O1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlRG91YmxldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdHJlc3VsdC5wdXNoKHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04pKVxuXHRcdFx0e1xuLypcdFx0XHRcdGNvbnN0IGNvbG9uID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG4gKi9cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VUZXJtaW5hbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQsIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFRlcm1pbmFsIDogVEVSTUlOQUwgfCBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0bGVmdCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBsZWZ0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ob2RlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKVxuXHR7XG5cdFx0dGhpcy5ub2RlVHlwZSA9IG5vZGVUeXBlO1xuXHRcdHRoaXMubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuXHRcdHRoaXMubm9kZUxlZnQgPSBudWxsO1xuXHRcdHRoaXMubm9kZVJpZ2h0ID0gbnVsbDtcblx0XHR0aGlzLmxpc3QgPSBudWxsO1xuXHRcdHRoaXMuZGljdCA9IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZXMgPSBbXTtcblx0XHRjb25zdCBlZGdlcyA9IFtdO1xuXG5cdFx0dGhpcy5fZHVtcChub2RlcywgZWRnZXMsIFswXSk7XG5cblx0XHRyZXR1cm4gJ2RpZ3JhcGggYXN0IHtcXG5cXHRyYW5rZGlyPVRCO1xcbicgKyBub2Rlcy5qb2luKCdcXG4nKSArICdcXG4nICsgZWRnZXMuam9pbignXFxuJykgKyAnXFxufSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbC5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAvXFx7JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiVcXH0vLFxuXG5cdENPTU1FTlRfUkU6IC9cXHsjXFxzKigoPzoufFxcbikqPylcXHMqI1xcfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHRtcGwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc3RhY2sxID0gW3RoaXMucm9vdE5vZGVdO1xuXHRcdGNvbnN0IHN0YWNrMiA9IFsweDAwMDAwMDAwMDAwXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG0gPSB0bXBsLm1hdGNoKHRoaXMuU1RBVEVNRU5UX1JFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaCh7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHRtcGwsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG1hdGNoID0gbVswXTtcblx0XHRcdGNvbnN0IGtleXdvcmQgPSBtWzFdO1xuXHRcdFx0Y29uc3QgZXhwcmVzc2lvbiA9IG1bMl07XG5cblx0XHRcdGNvbHVtbiA9IG0uaW5kZXggKyAweDAwMDAwMDAwMDA7XG5cdFx0XHRDT0xVTU4gPSBtLmluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRtcGwuc3Vic3RyKDAsIGNvbHVtbik7XG5cdFx0XHRjb25zdCBWQUxVRSA9IHRtcGwuc3Vic3RyKDAsIENPTFVNTik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHN3aXRjaChrZXl3b3JkKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0XHRjYXNlICdmb3InOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRzdGFjazEucHVzaChpdGVtKTtcblx0XHRcdFx0XHRzdGFjazIucHVzaCgweDAwKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgY3Vyclsna2V5d29yZCddICE9PSAnZm9yJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGZvcic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kZm9yYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmVuZ2luZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRWQVJJQUJMRV9SRTogL1xce1xce1xccyooLio/KVxccypcXH1cXH0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLygoPzpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXC4pKlthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBtWzFdLnNwbGl0KCcuJyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRcdGxldCBwYXJlbnQsIGo7XG5cblx0XHRcdFx0aWYocGFydHNbMF0gPT09ICd3aW5kb3cnXG5cdFx0XHRcdCAgIHx8XG5cdFx0XHRcdCAgIHBhcnRzWzBdID09PSAnZ2xvYmFsJ1xuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0LyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gd2luZG93O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBnbG9iYWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJlbnQgPSBkaWN0O1xuXG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGZvcih2YXIgaSA9IGo7IGkgPCBsOyBpKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBgJyArIG1bMV0gKyAnYCBub3QgZGVjbGFyZWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50W3BhcnRzW2ldXSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKG1bMl0sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpZic6XG5cdFx0XHRjYXNlICdAcm9vdCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBibG9jay5saXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBibG9jay5saXN0W2ldLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBzeW0xO1xuXHRcdFx0XHRsZXQgc3ltMjtcblx0XHRcdFx0bGV0IGV4cHI7XG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKixcXHMqKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0XHRzeW0yID0gbnVsbDtcblx0XHRcdFx0XHRcdGV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRzeW0yID0gbVsyXTtcblx0XHRcdFx0XHRleHByID0gbVszXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnVmFsdWUpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGl0ZXJWYWx1ZTtcblxuXHRcdFx0XHRpZih0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBzeW0yID8gT2JqZWN0LmVudHJpZXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IG9yaWdWYWx1ZTtcblxuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmRlIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBba2V5LCB2YWxdIG9mIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGtleTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IHZhbDtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCB2YWwgb2YgaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gdmFsO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkaWN0OiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighXykgXyA9IHt9O1xuXG5cdFx0cmV0dXJuIGYuY2FsbChfLCBfKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5zdGRsaWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZBUklBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0VtcHR5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHggPT09IG51bGxcblx0XHQgICB8fFxuXHRcdCAgIHggPT09IGZhbHNlXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSAoKCcnKSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiAodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID09PSAwKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bWJlcic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0FycmF5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPYmplY3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRXZlbic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2RkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJbk9iamVjdCc6IGZ1bmN0aW9uKHgsIHkpXG5cdHtcblx0XHRpZih0aGlzLmlzQXJyYXkoeSlcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geS5pbmRleE9mKHgpID49IDA7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh5KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4geCBpbiB5O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZ2UnOiBmdW5jdGlvbih4MSwgeDIsIHN0ZXAgPSAxKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKiovIGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAvKi0tLSoveDEvKi0tLSovOyBpIDw9IC8qLS0tKi94Mi8qLS0tKi87IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0qLyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0geDEuY2hhckNvZGVBdCgwKTsgaSA8PSB4Mi5jaGFyQ29kZUF0KDApOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xlbmd0aCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHgpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzQXJyYXkoeClcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc09iamVjdCh4KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeCkubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9maXJzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4WzB4MDAwMDAwMDAwMF0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGFzdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSAmJiB4Lmxlbmd0aCA+IDAgPyB4W3gubGVuZ3RoIC0gMV0gOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfc2xpY2UnOiBmdW5jdGlvbih4LCBpZHgxLCBpZHgyKVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgPyB4LnNsaWNlKGlkeDEsIGlkeDIpIDogbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbWVyZ2UnOiBmdW5jdGlvbigpXG5cdHtcblx0XHRpZihhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzU3RyaW5nKGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdEwucHVzaChhcmd1bWVudHNbaV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEwuam9pbignJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc0FycmF5KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIEwucHVzaChpdGVtW2pdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zb3J0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnNvcnQoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qb2luJzogZnVuY3Rpb24oeCwgc2VwKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguam9pbihzZXApIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2tleXMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNPYmplY3QoeCkgPyBPYmplY3Qua2V5cyh4KSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jb2x1bW4nOiBmdW5jdGlvbih4LCBrZXkpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5tYXAoKHZhbCkgPT4gdmFsW2tleV0pIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2JhdGNoJzogZnVuY3Rpb24oeCwgbiwgbWlzc2luZyA9ICcnKVxuXHR7XG5cdCAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcihuKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGwgPSB4Lmxlbmd0aDtcblxuXHRcdFx0aWYobCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBsYXN0O1xuXG5cdFx0XHRcdGNvbnN0IG0gPSBNYXRoLmNlaWwobCAvIG4pICogbjtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSBuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobGFzdCA9IHguc2xpY2UoaSwgaSArIG4pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQgaSA9IGw7IGkgPCBtOyBpICs9IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYXN0LnB1c2gobWlzc2luZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3N0YXJ0c1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXRjaCc6IGZ1bmN0aW9uKHMsIHJlZ2V4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZygoKHMpKSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcocmVnZXgpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgaWR4MSA9IHJlZ2V4LiAgaW5kZXhPZiAgKCcvJyk7XG5cdFx0XHRjb25zdCBpZHgyID0gcmVnZXgubGFzdEluZGV4T2YoJy8nKTtcblxuXHRcdFx0aWYoaWR4MSA9PT0gMCB8fCBpZHgxIDwgaWR4Milcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChyZWdleC5zdWJzdHJpbmcoaWR4MSArIDEsIGlkeDIpLCByZWdleC5zdWJzdHJpbmcoaWR4MiArIDEpKS50ZXN0KHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kZWZhdWx0JzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0cmV0dXJuIHMxIHx8IHMyIHx8ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cHBlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9VcHBlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jYXBpdGFsaXplJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXlxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RyaW0nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRyaW0oKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBvbGRTdHJzLCBuZXdTdHJzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRjb25zdCBsID0gKCgocykpKS5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9sZFN0cnMubGVuZ3RoO1xuXHRcdGNvbnN0IG4gPSBuZXdTdHJzLmxlbmd0aDtcblxuXHRcdGlmKG0gIT0gbilcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuX19sMDpcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb1N0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0J190ZXh0VG9TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZXNjYXBlJzogZnVuY3Rpb24ocywgbW9kZSlcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0c3dpdGNoKG1vZGUgfHwgJ2h0bWwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0Y2FzZSAnaHRtbF9hdHRyJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzJzpcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWCwgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ3VybCc6XG5cdFx0XHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXJsX2VuY29kZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IGVuY29kZVVSSUNvbXBvbmVudChzKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yYXcnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIGRpY3QpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSAmJiB0aGlzLmlzT2JqZWN0KGRpY3QpID8gdGhpcy5fcmVwbGFjZShzLCBPYmplY3Qua2V5cyhkaWN0KSwgT2JqZWN0LnZhbHVlcyhkaWN0KSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcm91bmQnOiBmdW5jdGlvbih4LCBtb2RlKVxuXHR7XG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnY2VpbCc6XG5cdFx0XHRcdHJldHVybiBNYXRoLmNlaWwoeCk7XG5cblx0XHRcdGNhc2UgJ2Zsb29yJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtaW4nOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0ID4gYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPCBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkFORE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSlNPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fZW5jb2RlJzogZnVuY3Rpb24oeCwgaW5kZW50KVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHgsIG51bGwsIHRoaXMuaXNOdW1iZXIoaW5kZW50KSA/IGluZGVudCA6IDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2pzcGF0aCc6IGZ1bmN0aW9uKHgsIHBhdGgpXG5cdHtcblx0XHRyZXR1cm4gdHlwZW9mIEpTUGF0aCAhPT0gJ3VuZGVmaW5lZCcgPyBKU1BhdGguYXBwbHkocGF0aCwgeClcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBURU1QTEFURVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpbmNsdWRlJzogZnVuY3Rpb24oZmlsZU5hbWUsIHZhcmlhYmxlcyA9IHt9LCB3aXRoQ29udGV4dCA9IHRydWUsIGlnbm9yZU1pc3NpbmcgPSBmYWxzZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKGZpbGVOYW1lIGluIGFtaVR3aWcuZW5naW5lLnRtcGxzKVxuXHRcdHtcblx0XHRcdGNvbnN0IHRlbXAgPSB7fTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHdpdGhDb250ZXh0KVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhbWlUd2lnLmVuZ2luZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IGFtaVR3aWcuZW5naW5lLmRpY3RbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhcmlhYmxlcylcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gLyotKi92YXJpYWJsZXMvKi0qLylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSAvKi0qL3ZhcmlhYmxlcy8qLSovW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gYW1pVHdpZy5lbmdpbmUucmVuZGVyKGFtaVR3aWcuZW5naW5lLnRtcGxzW2ZpbGVOYW1lXSwgdGVtcCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKCFpZ25vcmVNaXNzaW5nKVxuXHRcdHtcblx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBjb3VsZCBub3Qgb3BlbiBgJyArIGZpbGVOYW1lICsgJ2AnO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliLmZpbHRlcl9lID0gYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2VzY2FwZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmludGVycHJldGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmludGVycHJldGVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9nZXRKUzogZnVuY3Rpb24obm9kZSlcblx0e1xuXHRcdGxldCBMO1xuXHRcdGxldCB4O1xuXHRcdGxldCBsZWZ0O1xuXHRcdGxldCByaWdodDtcblx0XHRsZXQgb3BlcmF0b3I7XG5cblx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIExTVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MU1Q6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgvKi0tLS0tKi8gdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAnWycgKyBMLmpvaW4oJywnKSArICddJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBESUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRElDOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goaSArICc6JyArIHRoaXMuX2dldEpTKG5vZGUuZGljdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ3snICsgTC5qb2luKCcsJykgKyAnfSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRlVOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjpcblx0XHQgXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCh0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHQgXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZSArICcoJyArIEwuam9pbignLCcpICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFZBUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5WQVI6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUubGlzdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaCgnWycgKyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pICsgJ10nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIEwubGVuZ3RoID4gMCA/IG5vZGUubm9kZVZhbHVlICsgTC5qb2luKCcnKSA6IG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFRFUk1JTkFMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTDpcblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNEZWZpbmVkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEw6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzTnVsbCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTVBUWTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFbXB0eSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRTpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJdGVyYWJsZSgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FVkVOOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0V2ZW4oJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuT0REOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc09kZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklOOlxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luT2JqZWN0KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdFx0bGVmdCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVMZWZ0Lm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRyaWdodCA9IG5vZGUubm9kZVJpZ2h0Lm5vZGVSaWdodC5ub2RlVmFsdWU7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5SYW5nZSgnICsgeCArICcsJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNUQVJUU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuc3RhcnRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVORFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmVuZHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTUFUQ0hFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLm1hdGNoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5yYW5nZSgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1Q6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRpZihub2RlLm5vZGVWYWx1ZVswXSA9PT0gJy4nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnLicgKyByaWdodDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICdbJyArIHJpZ2h0ICsgJ10nO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRkxESVYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLmZsb29yKCcgKyBsZWZ0ICsgJy8nICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogUE9XRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdNYXRoLnBvdygnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPVUJMRV9RVUVTVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT046XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJygoJyArIGxlZnQgKyAnKSB8fCAoJyArIHJpZ2h0ICsgJykpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIFVOSUFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCA9PT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gb3BlcmF0b3IgKyAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCkgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ID09PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KSArICcpJyArIG9wZXJhdG9yO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogQklOQVJZIE9QRVJBVE9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ICE9PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5ub2RlVHlwZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3x8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICdeJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJyYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJysnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgbGVmdCArIG9wZXJhdG9yICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0Z2V0SlM6IGZ1bmN0aW9uKGV4cHIpXG5cdHtcblx0XHRyZXR1cm4gJyhmdW5jdGlvbihfKSB7IHJldHVybiAnICsgdGhpcy5fZ2V0SlMoZXhwci5yb290Tm9kZSkgKyAnOyB9KSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByLCBfKVxuXHR7XG5cdFx0aWYoIV8pIF8gPSB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSkoKTsiXX0=
