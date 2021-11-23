/*!
 * AMI Twig Engine 1.2.0
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

        for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {} // eslint-disable-line no-empty


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
        var temp;
        /*--------------------------------------------------------------------------------------------------------*/

        for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {} // eslint-disable-line no-empty

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

                for (var _i3 in iterValue) {
                  dict[sym1] = iterValue[_i3][0];
                  dict[sym2] = iterValue[_i3][1];
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

                for (var _i4 in iterValue) {
                  dict[sym1] = iterValue[_i4];
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
      return typeName === '[object Array]' && x.length === 0 || (typeName === '[object Set]' || typeName === '[object WeakSet]') && x.size === 0 || (typeName === '[object Object]' || typeName === '[object Map]' || typeName === '[object WeakMap]') && Object.keys(x).length === 0;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isNumber': function isNumber(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object Number]' || typeName === '[object BigInt]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isString': function isString(x) {
      return Object.prototype.toString.call(x) === '[object String]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isDate': function isDate(x) {
      return Object.prototype.toString.call(x) === '[object Date]';
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
    'isSet': function isSet(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object Set]' || typeName === '[object WeakSet]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isMap': function isMap(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object Object]' || typeName === '[object Map]' || typeName === '[object WeakMap]';
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'isIterable': function isIterable(x) {
      var typeName = Object.prototype.toString.call(x);
      return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]' || typeName === '[object Set]' || typeName === '[object WeakSet]' || typeName === '[object Map]' || typeName === '[object WeakMap]';
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

      if (this.isSet(y)) {
        return y.has(x);
      }

      if (this.isMap(y)) {
        return Object.prototype.hasOwnProperty.call(y, x);
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
        for (var _i5 = x1.charCodeAt(0); _i5 <= x2.charCodeAt(0); _i5 += step) {
          result.push(String.fromCharCode(_i5));
        }
      }

      return result;
    },

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_length': function filter_length(x) {
      if (this.isString(x) || this.isArray(x) || this.isSet(x)) {
        return x.length;
      }

      if (this.isSet(x)) {
        return x.size;
      }

      if (this.isMap(x)) {
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
      var _arguments = arguments,
          _this2 = this;

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
          var _ret = function () {
            var L = [];

            for (var _i6 in _arguments) {
              var _item = _arguments[_i6];

              if (!_this2.isArray(_item)) {
                return {
                  v: null
                };
              }

              _item.forEach(function (x) {
                return L.push(x);
              });
            }

            return {
              v: L
            };
          }();

          if (typeof _ret === "object") return _ret.v;
        }
        /*--------------------------------------------------------------------------------------------------------*/


        if (this.isSet(arguments[0])) {
          var _ret2 = function () {
            var L = [];

            for (var _i7 in _arguments) {
              var _item2 = _arguments[_i7];

              if (!_this2.isSet(_item2)) {
                return {
                  v: null
                };
              }

              _item2.forEach(function (x) {
                return L.add(x);
              });
            }

            return {
              v: L
            };
          }();

          if (typeof _ret2 === "object") return _ret2.v;
        }
        /*--------------------------------------------------------------------------------------------------------*/


        if (this.isObject(arguments[0])) {
          var D = {};

          for (var _i8 in arguments) {
            var _item3 = arguments[_i8];

            if (!this.isObject(_item3)) {
              return null;
            }

            for (var j in _item3) {
              D[j] = _item3[j];
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
      return this.isMap(x) ? Object.keys(x) : [];
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

          for (var _i9 = l; _i9 < m; _i9 += 1) {
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
      return this.isString(s) && this.isMap(dict) ? this._replace(s, Object.keys(dict), Object.values(dict)) : '';
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
        if (this.isArray(x) || this.isMap(x)) {
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

    /* DATE                                                                                                           */

    /*----------------------------------------------------------------------------------------------------------------*/
    'filter_date': function filter_date(date, format, timezone) {
      if (typeof moment !== 'undefined' && (this.isDate(date) || this.isString(date)) && this.isString(format)) {
        if (typeof moment.tz !== 'undefined' && this.isString(timezone)) {
          return moment(date).tz(timezone).format(format);
        } else {
          return moment(date).format(format);
        }
      }

      return '';
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
          for (var _i10 in
          /*-*/
          variables
          /*-*/
          ) {
            temp[_i10] =
            /*-*/
            variables
            /*-*/
            [_i10];
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

          for (var _i11 in node.dict) {
            L.push(_i11 + ':' + this._getJS(node.dict[_i11]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return '{' + L.join(',') + '}';

        /*--------------------------------------------------------------------------------------------------------*/

        /* FUN                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.FUN:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i12 in node.list) {
            L.push(this._getJS(node.list[_i12]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return node.nodeValue + '(' + L.join(',') + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* VAR                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.VAR:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i13 in node.list) {
            L.push('[' + this._getJS(node.list[_i13]) + ']');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxwaGFudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsImNhY2hlIiwiZXZhbCIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJldmVyeSIsImJsb2NrIiwic3ltMSIsInN5bTIiLCJvcmlnVmFsdWUiLCJ0eXBlTmFtZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZXJWYWx1ZSIsImVudHJpZXMiLCJrZXlzIiwiayIsIm9sZDEiLCJvbGQyIiwib2xkMyIsImxvb3AiLCJmaXJzdCIsImxhc3QiLCJyZXZpbmRleDAiLCJpbmRleDAiLCJyZXZpbmRleCIsIm1fMV8iLCJ3aXRoX3N1YmV4cHIiLCJ3aXRoX2NvbnRleHQiLCJmaWxlTmFtZSIsInZhcmlhYmxlcyIsImluY2x1ZGUiLCJyZW5kZXIiLCJfIiwiZiIsImludGVycHJldGVyIiwiZ2V0SlMiLCJ4Iiwic2l6ZSIsImlzTnVtYmVyIiwieSIsImlzQXJyYXkiLCJpc1N0cmluZyIsImlzU2V0IiwiaGFzIiwiaXNNYXAiLCJoYXNPd25Qcm9wZXJ0eSIsIngxIiwieDIiLCJzdGVwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiaWR4MSIsImlkeDIiLCJzbGljZSIsImFyZ3VtZW50cyIsIkwiLCJmb3JFYWNoIiwiYWRkIiwiaXNPYmplY3QiLCJEIiwic29ydCIsInJldmVyc2UiLCJzZXAiLCJtYXAiLCJ2YWwiLCJtaXNzaW5nIiwiTWF0aCIsImNlaWwiLCJzMSIsInMyIiwiYmFzZSIsInJlZ2V4IiwibGFzdEluZGV4T2YiLCJ0ZXN0IiwiZXJyIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsInRyaW0iLCJvbGRTdHJzIiwibmV3U3RycyIsInAiLCJtb2RlIiwiX3JlcGxhY2UiLCJfdGV4dFRvSHRtbFgiLCJfdGV4dFRvSHRtbFkiLCJfdGV4dFRvU3RyaW5nWCIsIl90ZXh0VG9TdHJpbmdZIiwiX3RleHRUb0pzb25TdHJpbmdYIiwiX3RleHRUb0pzb25TdHJpbmdZIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidmFsdWVzIiwibWF4IiwiYWJzIiwiZmxvb3IiLCJyb3VuZCIsImFyZ3MiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsIk5hTiIsIk5FR0FUSVZFX0lORklOSVRZIiwicmFuZG9tIiwiWCIsIk1BWF9TQUZFX0lOVEVHRVIiLCJkYXRlIiwiZm9ybWF0IiwidGltZXpvbmUiLCJtb21lbnQiLCJpc0RhdGUiLCJ0eiIsImluZGVudCIsInBhdGgiLCJKU1BhdGgiLCJhcHBseSIsIndpdGhDb250ZXh0IiwiaWdub3JlTWlzc2luZyIsImZpbHRlcl9lIiwiZmlsdGVyX2VzY2FwZSIsIl9nZXRKUyIsIm9wZXJhdG9yIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxZQUFXO0FBQ1o7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxPQUFPLEdBQUc7QUFDZkMsSUFBQUEsT0FBTyxFQUFFO0FBRE0sR0FBaEI7QUFJQTs7QUFFQTs7QUFBSyxNQUFHLE9BQU9DLE1BQVAsS0FBa0IsUUFBbEIsSUFBOEIsT0FBT0EsTUFBTSxDQUFDQyxPQUFkLEtBQTBCLFFBQTNELEVBQ0w7QUFDQ0QsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVILE9BQWYsR0FBeUJBLE9BQXpCO0FBQ0EsR0FISSxNQUlBLElBQUcsT0FBT0ksTUFBUCxLQUFrQixXQUFyQixFQUNMO0FBQ0NBLElBQUFBLE1BQU0sQ0FBQ0osT0FBUCxHQUFpQkEsT0FBakI7QUFDQSxHQUhJLE1BSUEsSUFBRyxPQUFPSyxNQUFQLEtBQWtCLFdBQXJCLEVBQ0w7QUFDQ0EsSUFBQUEsTUFBTSxDQUFDTCxP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QUFMLENBQVlqTSxJQUFJLENBQUNHLFNBQWpCLENBQVI7QUFFQSxtQkFBTyxNQUFNTixJQUFOLEdBQWFxTSxRQUFiLEdBQXdCbk0sS0FBeEIsR0FBZ0MsR0FBdkM7QUFDQTs7QUFFRjtBQTlURDtBQWlVQTs7QUFDQSxLQTdVeUI7O0FBK1UxQjtBQUVBZ0gsSUFBQUEsS0FBSyxFQUFFLGVBQVN6TCxJQUFULEVBQ1A7QUFDQyxhQUFPLDJCQUEyQixLQUFLMlEsTUFBTCxDQUFZM1EsSUFBSSxDQUFDb0UsUUFBakIsQ0FBM0IsR0FBd0QsTUFBL0Q7QUFDQSxLQXBWeUI7O0FBc1YxQjtBQUVBZ0YsSUFBQUEsSUFBSSxFQUFFLGVBQVNwSixJQUFULEVBQWVzTCxDQUFmLEVBQ047QUFDQ0EsTUFBQUEsQ0FBQyxHQUFHQSxDQUFDLElBQUksRUFBVDtBQUVBLGFBQU9sQyxJQUFJLENBQUMsS0FBS3FDLEtBQUwsQ0FBV3pMLElBQVgsQ0FBRCxDQUFKLENBQXVCaUssSUFBdkIsQ0FBNEJxQixDQUE1QixFQUErQkEsQ0FBL0IsQ0FBUDtBQUNBO0FBRUQ7O0FBL1YwQixHQUEzQjtBQWtXQTtBQUNDLENBM2pIRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQU1JIFR3aWcgRW5naW5lIDEuMi4wXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtMjAyMSBDTlJTL0xQU0NcbiAqXG4gKiBBdXRob3I6IErDqXLDtG1lIE9ESUVSIChqZXJvbWUub2RpZXJAbHBzYy5pbjJwMy5mcilcbiAqXG4gKiBSZXBvc2l0b3JpZXM6IGh0dHBzOi8vZ2l0bGFiLmluMnAzLmZyL2FtaS10ZWFtL0FNSVR3aWdKUy9cbiAqICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cuZ2l0aHViLmNvbS9hbWktdGVhbS9BTUlUd2lnSlMvXG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyBhIGNvbXB1dGVyIHByb2dyYW0gd2hvc2UgcHVycG9zZSBpcyB0byBwcm92aWRlIGFcbiAqIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlbnNpb0xhYnMncyBUV0lHIHRlbXBsYXRlIGVuZ2luZS5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGdvdmVybmVkIGJ5IHRoZSBDZUNJTEwtQyBsaWNlbnNlIHVuZGVyIEZyZW5jaCBsYXcgYW5kXG4gKiBhYmlkaW5nIGJ5IHRoZSBydWxlcyBvZiBkaXN0cmlidXRpb24gb2YgZnJlZSBzb2Z0d2FyZS4gWW91IGNhbiB1c2UsXG4gKiBtb2RpZnkgYW5kL29yIHJlZGlzdHJpYnV0ZSB0aGUgc29mdHdhcmUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBDZUNJTEwtQ1xuICogbGljZW5zZSBhcyBjaXJjdWxhdGVkIGJ5IENFQSwgQ05SUyBhbmQgSU5SSUEgYXQgdGhlIGZvbGxvd2luZyBVUkxcbiAqIFwiaHR0cDovL3d3dy5jZWNpbGwuaW5mb1wiLlxuICpcbiAqIFRoZSBmYWN0IHRoYXQgeW91IGFyZSBwcmVzZW50bHkgcmVhZGluZyB0aGlzIG1lYW5zIHRoYXQgeW91IGhhdmUgaGFkXG4gKiBrbm93bGVkZ2Ugb2YgdGhlIENlQ0lMTC1DIGxpY2Vuc2UgYW5kIHRoYXQgeW91IGFjY2VwdCBpdHMgdGVybXMuXG4gKlxuICovXG4oZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuY29uc3QgYW1pVHdpZyA9IHtcblx0dmVyc2lvbjogJzEuMi4wJ1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKi8gaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jylcbntcblx0bW9kdWxlLmV4cG9ydHMuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5lbHNlIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxue1xuXHR3aW5kb3cuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5lbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKVxue1xuXHRnbG9iYWwuYW1pVHdpZyA9IGFtaVR3aWc7XG59XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vL2V4cG9ydCBkZWZhdWx0IGFtaVR3aWc7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG9rZW5pemVyID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRva2VuaXplOiBmdW5jdGlvbihjb2RlLCBsaW5lLCBzcGFjZXMsIHRva2VuRGVmcywgdG9rZW5UeXBlcywgZXJyb3IpXG5cdHtcblx0XHRpZih0b2tlbkRlZnMubGVuZ3RoICE9PSB0b2tlblR5cGVzLmxlbmd0aClcblx0XHR7XG5cdFx0XHR0aHJvdyAnYHRva2VuRGVmcy5sZW5ndGggIT0gdG9rZW5UeXBlcy5sZW5ndGhgJztcblx0XHR9XG5cblx0XHRjb25zdCByZXN1bHRfdG9rZW5zID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X3R5cGVzID0gW107XG5cdFx0Y29uc3QgcmVzdWx0X2xpbmVzID0gW107XG5cblx0XHRsZXQgaSA9IDB4MDAwMDAwMDAwO1xuXHRcdGNvbnN0IGwgPSBjb2RlLmxlbmd0aDtcblxuXHRcdGxldCB3b3JkID0gJycsIHRva2VuLCBjO1xuXG5fX2wwOlx0d2hpbGUoaSA8IGwpXG5cdFx0e1xuXHRcdFx0YyA9IGNvZGUuY2hhckF0KDApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIENPVU5UIExJTkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKGMgPT09ICdcXG4nKVxuXHRcdFx0e1xuXHRcdFx0XHRsaW5lKys7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFNQQUNFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoc3BhY2VzLmluZGV4T2YoYykgPj0gMClcblx0XHRcdHtcblx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFR0VYRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKGNvbnN0IGogaW4gdG9rZW5EZWZzKVxuXHRcdFx0e1xuXHRcdFx0XHR0b2tlbiA9IHRoaXMuX21hdGNoKGNvZGUsIHRva2VuRGVmc1tqXSk7XG5cblx0XHRcdFx0aWYodG9rZW4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh0b2tlbik7XG5cdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2godG9rZW5UeXBlc1tqXSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cblx0XHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcodG9rZW4ubGVuZ3RoKTtcblx0XHRcdFx0XHRpICs9IHRva2VuLmxlbmd0aDtcblxuXHRcdFx0XHRcdGNvbnRpbnVlIF9fbDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVNQUlOSU5HIENIQVJBQ1RFUkVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHR3b3JkICs9IGM7XG5cblx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZygxKTtcblx0XHRcdGkgKz0gMTtcblxuLypcdFx0XHRjb250aW51ZSBfX2wwO1xuICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRpZih3b3JkKVxuXHRcdHtcblx0XHRcdGlmKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuLypcdFx0XHR3b3JkID0gJyc7XG4gKi9cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRva2VuczogcmVzdWx0X3Rva2Vucyxcblx0XHRcdHR5cGVzOiByZXN1bHRfdHlwZXMsXG5cdFx0XHRsaW5lczogcmVzdWx0X2xpbmVzLFxuXHRcdH07XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfbWF0Y2g6IGZ1bmN0aW9uKHMsIHN0cmluZ09yUmVnRXhwKVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRpZihzdHJpbmdPclJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0XHR7XG5cdFx0XHRtID0gcy5tYXRjaChzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtICE9PSBudWxsICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgLyotKi9tWzBdLyotKi8pID8gLyotKi9tWzBdLyotKi8gOiBudWxsO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0bSA9IHMuaW5kZXhPZihzdHJpbmdPclJlZ0V4cCk7XG5cblx0XHRcdHJldHVybiBtID09PSAweDAwICYmIHRoaXMuX2NoZWNrTmV4dENoYXIocywgc3RyaW5nT3JSZWdFeHApID8gc3RyaW5nT3JSZWdFeHAgOiBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9hbHBoYW51bTogW1xuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAxLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdF0sXG5cblx0X2NoZWNrTmV4dENoYXI6IGZ1bmN0aW9uKHMsIHRva2VuKVxuXHR7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0Y29uc3QgY2hhckNvZGUyID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDApO1xuXHRcdGNvbnN0IGNoYXJDb2RlMSA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAxKTtcblxuXHRcdHJldHVybiBpc05hTihjaGFyQ29kZTIpXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FscGhhbnVtW2NoYXJDb2RlMl0gPT09IDBcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxwaGFudW1bY2hhckNvZGUxXSA9PT0gMFxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLnRva2VucyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2VucyA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENPTVBPU0lURSBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLklTX1hYWCA9IFtcblx0XHRcdHRoaXMuREVGSU5FRCxcblx0XHRcdHRoaXMuTlVMTCxcblx0XHRcdHRoaXMuRU1QVFksXG5cdFx0XHR0aGlzLklURVJBQkxFLFxuXHRcdFx0dGhpcy5FVkVOLFxuXHRcdFx0dGhpcy5PREQsXG5cdFx0XTtcblxuXHRcdHRoaXMuWFhYX1dJVEggPSBbXG5cdFx0XHR0aGlzLlNUQVJUU19XSVRILFxuXHRcdFx0dGhpcy5FTkRTX1dJVEgsXG5cdFx0XTtcblxuXHRcdHRoaXMuUExVU19NSU5VUyA9IFtcblx0XHRcdHRoaXMuQ09OQ0FULFxuXHRcdFx0dGhpcy5QTFVTLFxuXHRcdFx0dGhpcy5NSU5VUyxcblx0XHRdO1xuXG5cdFx0dGhpcy5NVUxfRkxESVZfRElWX01PRCA9IFtcblx0XHRcdHRoaXMuTVVMLFxuXHRcdFx0dGhpcy5GTERJVixcblx0XHRcdHRoaXMuRElWLFxuXHRcdFx0dGhpcy5NT0QsXG5cdFx0XTtcblxuXHRcdHRoaXMuUlggPSBbXG5cdFx0XHR0aGlzLlJQLFxuXHRcdFx0dGhpcy5SQjEsXG5cdFx0XTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBSRUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExPR0lDQUxfT1I6IDEwMCxcblx0TE9HSUNBTF9BTkQ6IDEwMSxcblx0QklUV0lTRV9PUjogMTAyLFxuXHRCSVRXSVNFX1hPUjogMTAzLFxuXHRCSVRXSVNFX0FORDogMTA0LFxuXHROT1Q6IDEwNSxcblx0SVM6IDEwNixcblx0REVGSU5FRDogMTA3LFxuXHROVUxMOiAxMDgsXG5cdEVNUFRZOiAxMDksXG5cdElURVJBQkxFOiAxMTAsXG5cdEVWRU46IDExMSxcblx0T0REOiAxMTIsXG5cdENNUF9PUDogMTEzLFxuXHRTVEFSVFNfV0lUSDogMTE0LFxuXHRFTkRTX1dJVEg6IDExNSxcblx0TUFUQ0hFUzogMTE2LFxuXHRJTjogMTE3LFxuXHRSQU5HRTogMTE4LFxuXHRDT05DQVQ6IDExOSxcblx0UExVUzogMTIwLFxuXHRNSU5VUzogMTIxLFxuXHRQT1dFUjogMTIyLFxuXHRNVUw6IDEyMyxcblx0RkxESVY6IDEyNCxcblx0RElWOiAxMjUsXG5cdE1PRDogMTI2LFxuIFx0RE9VQkxFX1FVRVNUSU9OOiAxMjcsXG4gXHRRVUVTVElPTjogMTI4LFxuXHRDT0xPTjogMTI5LFxuXHRET1Q6IDEzMCxcblx0Q09NTUE6IDEzMSxcblx0UElQRTogMTMyLFxuXHRMUDogMTMzLFxuXHRSUDogMTM0LFxuXHRMQjE6IDEzNSxcblx0UkIxOiAxMzYsXG5cdExCMjogMTM3LFxuXHRSQjI6IDEzOCxcblx0U0lEOiAxMzksXG5cdFRFUk1JTkFMOiAxNDAsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVklSVFVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMU1Q6IDIwMCxcblx0RElDOiAyMDEsXG5cdEZVTjogMjAyLFxuXHRWQVI6IDIwMyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMuJGluaXQoKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuVG9rZW5pemVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuVG9rZW5pemVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3NwYWNlcyA9IFsnICcsICdcXHQnLCAnXFxuJywgJ1xcciddO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5EZWZzID0gW1xuXHRcdCdvcicsXG5cdFx0J2FuZCcsXG5cdFx0J2Itb3InLFxuXHRcdCdiLXhvcicsXG5cdFx0J2ItYW5kJyxcblx0XHQnbm90Jyxcblx0XHQnaXMnLFxuXHRcdCdkZWZpbmVkJyxcblx0XHQnbnVsbCcsXG5cdFx0J2VtcHR5Jyxcblx0XHQnaXRlcmFibGUnLFxuXHRcdCdldmVuJyxcblx0XHQnb2RkJyxcblx0XHQnPT09Jyxcblx0XHQnPT0nLFxuXHRcdCchPT0nLFxuXHRcdCchPScsXG5cdFx0Jzw9Jyxcblx0XHQnPj0nLFxuXHRcdCc8Jyxcblx0XHQnPicsXG5cdFx0L15zdGFydHNcXHMrd2l0aC8sXG5cdFx0L15lbmRzXFxzK3dpdGgvLFxuXHRcdCdtYXRjaGVzJyxcblx0XHQnaW4nLFxuXHRcdCcuLicsXG5cdFx0J34nLFxuXHRcdCcrJyxcblx0XHQnLScsXG5cdFx0JyoqJyxcblx0XHQnKicsXG5cdFx0Jy8vJyxcblx0XHQnLycsXG5cdFx0JyUnLFxuXHRcdCc/PycsXG5cdFx0Jz8nLFxuXHRcdCc6Jyxcblx0XHQnLicsXG5cdFx0JywnLFxuXHRcdCd8Jyxcblx0XHQnKCcsXG5cdFx0JyknLFxuXHRcdCdbJyxcblx0XHQnXScsXG5cdFx0J3snLFxuXHRcdCd9Jyxcblx0XHQndHJ1ZScsXG5cdFx0J2ZhbHNlJyxcblx0XHQvXlswLTldK1xcLlswLTldKy8sXG5cdFx0L15bMC05XSsvLFxuXHRcdC9eJyhcXFxcJ3xbXiddKSonLyxcblx0XHQvXlwiKFxcXFxcInxbXlwiXSkqXCIvLFxuXHRcdC9eW2EtekEtWl8kXVthLXpBLVowLTlfJF0qLyxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuVHlwZXMgPSBbXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuREVGSU5FRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk5VTEwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTVBUWSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk9ERCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRILFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLklOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT05DQVQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QTFVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTUlOVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QT1dFUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1VTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkZMRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRElWLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTU9ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT0xPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUlAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQjIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TSUQsXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0ID0gZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHJlc3VsdCA9IGFtaVR3aWcudG9rZW5pemVyLnRva2VuaXplKFxuXHRcdFx0Y29kZSxcblx0XHRcdGxpbmUsXG5cdFx0XHR0aGlzLl9zcGFjZXMsXG5cdFx0XHR0aGlzLl90b2tlbkRlZnMsXG5cdFx0XHR0aGlzLl90b2tlblR5cGVzLFxuXHRcdFx0dHJ1ZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VucyA9IHJlc3VsdC50b2tlbnM7XG5cdFx0dGhpcy50eXBlcyA9IHJlc3VsdC50eXBlcztcblxuXHRcdHRoaXMuaSA9IDA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLm5leHQgPSBmdW5jdGlvbihuID0gMSlcblx0e1xuXHRcdHRoaXMuaSArPSBuO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5pc0VtcHR5ID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaSA+PSB0aGlzLnRva2Vucy5sZW5ndGg7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUb2tlbiA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVHlwZSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnR5cGVzW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpXG5cdHtcblx0XHRpZih0aGlzLmkgPCB0aGlzLnRva2Vucy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0Y29uc3QgVFlQRSA9IHRoaXMudHlwZXNbdGhpcy5pXTtcblxuXHRcdFx0cmV0dXJuICh0eXBlIGluc3RhbmNlb2YgQXJyYXkpID8gKHR5cGUuaW5kZXhPZihUWVBFKSA+PSAwKSA6ICh0eXBlID09PSBUWVBFKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblxuXHR0aGlzLiRpbml0KGNvZGUsIGxpbmUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnRva2VuaXplciA9IG5ldyBhbWlUd2lnLmV4cHIuVG9rZW5pemVyKFxuXHRcdFx0dGhpcy5jb2RlID0gY29kZSxcblx0XHRcdHRoaXMubGluZSA9IGxpbmVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuaXNFbXB0eSgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHVuZXhwZWN0ZWQgdG9rZW4gYCcgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSArICdgJztcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5yb290Tm9kZS5kdW1wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU51bGxDb2FsZXNjaW5nOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTnVsbENvYWxlc2NpbmcgOiBMb2dpY2FsT3IgKCc/PycgTG9naWNhbE9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbE9yIDogTG9naWNhbEFuZCAoJ29yJyBMb2dpY2FsQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsQW5kIDogQml0d2lzZU9yICgnYW5kJyBCaXR3aXNlT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZU9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VPciA6IEJpdHdpc2VYb3IgKCdiLW9yJyBCaXR3aXNlWG9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlWG9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VYb3IgOiBCaXR3aXNlQW5kICgnYi14b3InIEJpdHdpc2VBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZUFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTm90KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEJpdHdpc2VBbmQgOiBOb3QgKCdiLWFuZCcgTm90KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU5vdCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOb3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOb3QgOiAnbm90JyBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQ29tcCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgfCBDb21wICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUNvbXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUFkZFN1YigpLCByaWdodCwgbm9kZSwgc3dhcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDb21wIDogQWRkU3ViICdpcycgJ25vdCc/ICgnZGVmaW5lZCcgfCAnbnVsbCcgfCAuLi4pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblx0XHRcdHN3YXAgPSBub2RlO1xuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHN3YXA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTX1hYWCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHN3YXAubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRzd2FwLm5vZGVSaWdodCA9IHJpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGtleXdvcmQgYGRlZmluZWRgLCBgbnVsbGAsIGBlbXB0eWAsIGBpdGVyYWJsZWAsIGBldmVuYCBvciBgb2RkYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnPT09JyB8ICc9PScgfCAuLi4pIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1ApKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJ3N0YXJ0cycgfCAnZW5kcycpIGB3aXRoYCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuWFhYX1dJVEgpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnbWF0Y2hlcycgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdpbicgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JTikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFkZFN1YjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTXVsRGl2KCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFkZFN1YiA6IE11bERpdiAoKCcrJyB8ICctJykgTXVsRGl2KSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTXVsRGl2KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU11bERpdjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE11bERpdiA6IFBsdXNNaW51cyAoKCcqJyB8ICcvLycgfCAnLycgfCAnJScpIFBsdXNNaW51cykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NVUxfRkxESVZfRElWX01PRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQbHVzTWludXM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQbHVzTWludXMgOiAoJy0nIHwgJysnKSBQb3dlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZVBvd2VyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgICB8IERvdDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZVBvd2VyKCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBvd2VyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VGaWx0ZXIoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUG93ZXIgOiBGaWx0ZXIgKCcqKicgRmlsdGVyKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRmlsdGVyKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZpbHRlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90MSgpLCBub2RlLCB0ZW1wO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEZpbHRlciA6IERvdDEgKCd8JyBEb3QxKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QSVBFKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlRG90MSh0cnVlKTtcblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcblxuXHRcdFx0dGVtcC5saXN0LnVuc2hpZnQobGVmdCk7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QxOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlRG90Mihpc0ZpbHRlcik7XG5cblx0XHRpZihub2RlKVxuXHRcdHtcblx0XHRcdGxldCB0ZW1wO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Zm9yKHRlbXAgPSBub2RlOyB0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDsgdGVtcCA9IHRlbXAubm9kZUxlZnQpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRlbXAucSlcblx0XHRcdHtcblx0XHRcdFx0LyoqLyBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHRlbXAubm9kZVZhbHVlIGluIGFtaVR3aWcuc3RkbGliKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gJ2FtaVR3aWcuc3RkbGliLicgKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5WQVIpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGVtcC5xID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QyIDogRG90MyAoJy4nIERvdDMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9UKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksICcuJyk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZURvdDMoaXNGaWx0ZXIpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VEb3QzOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVgoaXNGaWx0ZXIpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBEb3QzIDogWCAoJ1snIE51bGxDb2FsZXNjaW5nICddJykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULCAnW10nKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgIHwgWCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVg6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogWCA6IEdyb3VwIHwgQXJyYXkgfCBPYmplY3QgfCBGdW5WYXIgfCBUZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUdyb3VwKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VBcnJheSgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlT2JqZWN0KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VGdW5WYXIoaXNGaWx0ZXIpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlVGVybWluYWwoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBTWU5UQVggRVJST1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBzeW50YXggZXJyb3Igb3IgdHJ1bmNhdGVkIGV4cHJlc3Npb24nO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VHcm91cDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogR3JvdXAgOiAnKCcgTnVsbENvYWxlc2NpbmcgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdG5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQXJyYXk6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBsaXN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEFycmF5IDogJ1snIFNpbmdsZXRzICddJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5MU1QsICdBcnJheScpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IGxpc3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlT2JqZWN0OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgZGljdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBPYmplY3QgOiAneycgRG91YmxldHMgJ30nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIyKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGRpY3QgPSB0aGlzLl9wYXJzZURvdWJsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuRElDLCAnT2JqZWN0Jyk7XG5cblx0XHRcdFx0bm9kZS5kaWN0ID0gZGljdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgfWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGdW5WYXI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IG5vZGU7XG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5TSUQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoMCwgaXNGaWx0ZXIgPyAnZmlsdGVyXycgKyB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSA6IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblxuXHRcdFx0bm9kZS5xID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZ1blZhciA6IFNJRCAnKCcgU2luZ2xldHMgJyknICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiAgICAgICAgfCBTSUQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUubm9kZVR5cGUgPSBpc0ZpbHRlciA/IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOXG5cdFx0XHRcdCAgICAgICAgICAgICAgICAgICAgICAgICA6IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSXG5cdFx0XHRcdDtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlgpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZVNpbmdsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0ge307XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpID09PSBmYWxzZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9wYXJzZURvdWJsZXQocmVzdWx0KTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEpID09PSB0cnVlKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRyZXN1bHQucHVzaCh0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VEb3VibGV0OiBmdW5jdGlvbihyZXN1bHQpXG5cdHtcblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OKSlcblx0XHRcdHtcbi8qXHRcdFx0XHRjb25zdCBjb2xvbiA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuICovXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHRba2V5XSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYDpgIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdGVybWluYWwgZXhwZWN0ZWQnO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlVGVybWluYWw6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0LCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBUZXJtaW5hbCA6IFRFUk1JTkFMIHwgUkFOR0UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGxlZnQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuTm9kZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZSA9IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpIHtcblxuXHR0aGlzLiRpbml0KG5vZGVUeXBlLCBub2RlVmFsdWUpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSlcblx0e1xuXHRcdHRoaXMubm9kZVR5cGUgPSBub2RlVHlwZTtcblx0XHR0aGlzLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcblx0XHR0aGlzLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHR0aGlzLm5vZGVSaWdodCA9IG51bGw7XG5cdFx0dGhpcy5saXN0ID0gbnVsbDtcblx0XHR0aGlzLmRpY3QgPSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2R1bXA6IGZ1bmN0aW9uKG5vZGVzLCBlZGdlcywgcENudClcblx0e1xuXHRcdGxldCBDTlQ7XG5cblx0XHRjb25zdCBjbnQgPSBwQ250WzBdO1xuXG5cdFx0bm9kZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIFtsYWJlbD1cIicgKyB0aGlzLm5vZGVWYWx1ZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCJdOycpO1xuXG5cdFx0aWYodGhpcy5ub2RlTGVmdClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlTGVmdC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubm9kZVJpZ2h0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVSaWdodC5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubGlzdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmxpc3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMubGlzdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmb3IoY29uc3QgaSBpbiB0aGlzLmRpY3QpXG5cdFx0XHR7XG5cdFx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJyBbbGFiZWw9XCJbJyArIGkucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ11cIl07Jyk7XG5cdFx0XHRcdHRoaXMuZGljdFtpXS5fZHVtcChub2RlcywgZWRnZXMsIHBDbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IG5vZGVzID0gW107XG5cdFx0Y29uc3QgZWRnZXMgPSBbXTtcblxuXHRcdHRoaXMuX2R1bXAobm9kZXMsIGVkZ2VzLCBbMF0pO1xuXG5cdFx0cmV0dXJuICdkaWdyYXBoIGFzdCB7XFxuXFx0cmFua2Rpcj1UQjtcXG4nICsgbm9kZXMuam9pbignXFxuJykgKyAnXFxuJyArIGVkZ2VzLmpvaW4oJ1xcbicpICsgJ1xcbn0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRtcGwuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIgPSBmdW5jdGlvbih0bXBsKSB7XG5cblx0dGhpcy4kaW5pdCh0bXBsKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRtcGwuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFNUQVRFTUVOVF9SRTogL3slXFxzKihbYS16QS1aXSspXFxzKigoPzoufFxcbikqPylcXHMqJX0vLFxuXG5cdENPTU1FTlRfUkU6IC97I1xccyooKD86LnxcXG4pKj8pXFxzKiN9L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfY291bnQ6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRsZXQgcmVzdWx0ID0gMDtcblxuXHRcdGNvbnN0IGwgPSBzLmxlbmd0aDtcblxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYoc1tpXSA9PT0gJ1xcbicpIHJlc3VsdCsrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24odG1wbClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBsaW5lID0gMTtcblxuXHRcdGxldCBjb2x1bW47XG5cdFx0bGV0IENPTFVNTjtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB7XG5cdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0a2V5d29yZDogJ0Byb290Jyxcblx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdH1dLFxuXHRcdFx0dmFsdWU6ICcnLFxuXHRcdH07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBzdGFjazEgPSBbdGhpcy5yb290Tm9kZV07XG5cdFx0Y29uc3Qgc3RhY2syID0gWzB4MDAwMDAwMDAwMDBdO1xuXG5cdFx0bGV0IGl0ZW07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRmb3IodG1wbCA9IHRtcGwucmVwbGFjZSh0aGlzLkNPTU1FTlRfUkUsICcnKTs7IHRtcGwgPSB0bXBsLnN1YnN0cihDT0xVTU4pKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBjdXJyID0gc3RhY2sxW3N0YWNrMS5sZW5ndGggLSAxXTtcblx0XHRcdCBsZXQgIGluZHggPSBzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbSA9IHRtcGwubWF0Y2godGhpcy5TVEFURU1FTlRfUkUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYobSA9PT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KHRtcGwpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdG1wbCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBlcnJvcnMgPSBbXTtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSBzdGFjazEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qKi8gaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kaWZgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYoc3RhY2sxW2ldLmtleXdvcmQgPT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHQgXHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRmb3JgJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoZXJyb3JzLmxlbmd0aCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCAnICsgZXJyb3JzLmpvaW4oJywgJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBtWzBdO1xuXHRcdFx0Y29uc3Qga2V5d29yZCA9IG1bMV07XG5cdFx0XHRjb25zdCBleHByZXNzaW9uID0gbVsyXTtcblxuXHRcdFx0Y29sdW1uID0gbS5pbmRleCArIDB4MDAwMDAwMDAwMDtcblx0XHRcdENPTFVNTiA9IG0uaW5kZXggKyBtYXRjaC5sZW5ndGg7XG5cblx0XHRcdGNvbnN0IHZhbHVlID0gdG1wbC5zdWJzdHIoMCwgY29sdW1uKTtcblx0XHRcdGNvbnN0IFZBTFVFID0gdG1wbC5zdWJzdHIoMCwgQ09MVU1OKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQoVkFMVUUpO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFsdWUpXG5cdFx0XHR7XG5cdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0c3dpdGNoKGtleXdvcmQpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZmx1c2gnOlxuXHRcdFx0XHRjYXNlICdhdXRvZXNjYXBlJzpcblx0XHRcdFx0Y2FzZSAnc3BhY2VsZXNzJzpcblx0XHRcdFx0Y2FzZSAndmVyYmF0aW0nOlxuXG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdpZic6XG5cdFx0XHRcdGNhc2UgJ2Zvcic6XG5cblx0XHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRcdGtleXdvcmQ6IGtleXdvcmQsXG5cdFx0XHRcdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdFx0fV0sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdHN0YWNrMS5wdXNoKGl0ZW0pO1xuXHRcdFx0XHRcdHN0YWNrMi5wdXNoKDB4MDApO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2UnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICBjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5keCA9IGN1cnIuYmxvY2tzLmxlbmd0aDtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzLnB1c2goe1xuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0c3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXSA9IGluZHg7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGlmYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kZm9yJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRmb3JgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRkZWZhdWx0OlxuXG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5rbm93biBrZXl3b3JkIGAnICsga2V5d29yZCArICdgJztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5yb290Tm9kZSwgbnVsbCwgMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZW5naW5lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZW5naW5lID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFZBUklBQkxFX1JFOiAve3tcXHMqKC4qPylcXHMqfX0vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9yZW5kZXI6IGZ1bmN0aW9uKHJlc3VsdCwgaXRlbSwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0bGV0IG07XG5cblx0XHRsZXQgZXhwcmVzc2lvbjtcblxuXHRcdHRoaXMuZGljdCA9IGRpY3Q7XG5cdFx0dGhpcy50bXBscyA9IHRtcGxzO1xuXG5cdFx0c3dpdGNoKGl0ZW0ua2V5d29yZClcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERPICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2RvJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChpdGVtLmV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTRVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdG0gPSBpdGVtLmV4cHJlc3Npb24ubWF0Y2goLygoPzpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXC4pKlthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqPVxccyooLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYHNldGAgc3RhdGVtZW50Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgcGFydHMgPSBtWzFdLnNwbGl0KCcuJyksIGwgPSBwYXJ0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRcdGxldCBwYXJlbnQsIGo7XG5cblx0XHRcdFx0aWYocGFydHNbMF0gPT09ICd3aW5kb3cnXG5cdFx0XHRcdCAgIHx8XG5cdFx0XHRcdCAgIHBhcnRzWzBdID09PSAnZ2xvYmFsJ1xuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0LyoqLyBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gd2luZG93O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBnbG9iYWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRqID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJlbnQgPSBkaWN0O1xuXG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpO1xuXG5cdFx0XHRcdGZvcihpID0gajsgaSA8IGw7IGkrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHBhcmVudFtwYXJ0c1tpXV0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50W3BhcnRzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGAnICsgbVsxXSArICdgIG5vdCBkZWNsYXJlZCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRwYXJlbnRbcGFydHNbaV1dID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwobVsyXSwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEBURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ0B0ZXh0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtLnZhbHVlLnJlcGxhY2UodGhpcy5WQVJJQUJMRV9SRSwgZnVuY3Rpb24obWF0Y2gsIGV4cHJlc3Npb24pIHtcblxuXHRcdFx0XHRcdGxldCB2YWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogJyc7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElGICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdGNhc2UgJ0Byb290Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpdGVtLmJsb2Nrcy5ldmVyeSgoYmxvY2spID0+IHtcblxuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBibG9jay5leHByZXNzaW9uO1xuXG5cdFx0XHRcdFx0aWYoZXhwcmVzc2lvbiA9PT0gJ0B0cnVlJyB8fCBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGJsb2NrLmxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGJsb2NrLmxpc3RbaV0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2Zvcic6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IHN5bTE7XG5cdFx0XHRcdGxldCBzeW0yO1xuXHRcdFx0XHRsZXQgZXhwcjtcblxuXHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMqLFxccyooW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtID0gaXRlbS5ibG9ja3NbMF0uZXhwcmVzc2lvbi5tYXRjaCgvKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdFx0aWYoIW0pXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBmb3JgIHN0YXRlbWVudCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRcdHN5bTIgPSBudWxsO1xuXHRcdFx0XHRcdFx0ZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdHN5bTIgPSBtWzJdO1xuXHRcdFx0XHRcdGV4cHIgPSBtWzNdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdWYWx1ZSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaXRlclZhbHVlO1xuXG5cdFx0XHRcdGlmKHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IHN5bTIgPyBPYmplY3QuZW50cmllcyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gb3JpZ1ZhbHVlO1xuXG5cdFx0XHRcdFx0aWYodHlwZU5hbWUgIT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIHR5cGVOYW1lICE9PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZCBub3QgaXRlcmFibGUnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kIG5vdCBhbiBvYmplY3QnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgbCA9IGl0ZXJWYWx1ZS5sZW5ndGg7XG5cblx0XHRcdFx0aWYobCA+IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgayA9IDB4MDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMF0ubGlzdDtcblxuXHRcdFx0XHRcdGlmKHN5bTIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsoc3ltMildO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMyA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGl0ZXJWYWx1ZVtpXVswXTtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0yXSA9IGl0ZXJWYWx1ZVtpXVsxXTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMztcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTIpXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbJ2xvb3AnXTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3QubG9vcCA9IHtsZW5ndGg6IGwsIHBhcmVudDogZGljdFsnbG9vcCddfTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBpIGluIGl0ZXJWYWx1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0ZGljdFtzeW0xXSA9IGl0ZXJWYWx1ZVtpXTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuZmlyc3QgPSAoayA9PT0gKDAgLSAwKSk7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5sYXN0ID0gKGsgPT09IChsIC0gMSkpO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleDAgPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4MCA9IGs7XG5cdFx0XHRcdFx0XHRcdGsrKztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4ID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleCA9IGs7XG5cblx0XHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdFsnbG9vcCddID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihpdGVtLmJsb2Nrcy5sZW5ndGggPiAxKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1sxXS5saXN0O1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTkNMVURFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpbmNsdWRlJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgbV8xXyA9IGl0ZW0uZXhwcmVzc2lvbiwgd2l0aF9zdWJleHByLCB3aXRoX2NvbnRleHQ7XG5cblx0XHRcdFx0LyoqLyBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKykkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gbVsyXTtcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK29ubHkkLykpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1bMV07XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbV8xXztcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGZpbGVOYW1lID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSB8fCAnJztcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZmlsZU5hbWUpICE9PSAnW29iamVjdCBTdHJpbmddJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHN0cmluZyBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKHdpdGhfc3ViZXhwciwgaXRlbS5saW5lLCBkaWN0KSB8fCB7fTtcblxuXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGVzKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBvYmplY3QgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXN1bHQucHVzaChhbWlUd2lnLnN0ZGxpYi5pbmNsdWRlKFxuXHRcdFx0XHRcdGZpbGVOYW1lLFxuXHRcdFx0XHRcdHZhcmlhYmxlcyxcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQsXG5cdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cmVuZGVyOiBmdW5jdGlvbih0bXBsLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodG1wbCkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnW29iamVjdCBTdHJpbmddJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbmV3IGFtaVR3aWcudG1wbC5Db21waWxlcih0bXBsKS5yb290Tm9kZSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnW29iamVjdCBPYmplY3RdJzpcblx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgLyotLS0tLS0tLS0tLS0tLSovdG1wbC8qLS0tLS0tLS0tLS0tLS0qLywgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuY2FjaGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuY2FjaGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZGljdDoge30sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRldmFsOiBmdW5jdGlvbihleHByZXNzaW9uLCBsaW5lLCBfKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGY7XG5cblx0XHRpZihleHByZXNzaW9uIGluIHRoaXMuZGljdClcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXSA9IGV2YWwoXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5pbnRlcnByZXRlci5nZXRKUyhcblx0XHRcdFx0XHRuZXcgYW1pVHdpZy5leHByLkNvbXBpbGVyKGV4cHJlc3Npb24sIGxpbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XyA9IF8gfHwge307XG5cblx0XHRyZXR1cm4gZi5jYWxsKF8sIF8pO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnN0ZGxpYiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYiA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVkFSSUFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNVbmRlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RlZmluZWQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IHVuZGVmaW5lZDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggPT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOb3ROdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRW1wdHknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYoeCA9PT0gbnVsbFxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gZmFsc2Vcblx0XHQgICB8fFxuXHRcdCAgIHggPT09ICgoJycpKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuICgodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScpICYmIHgubGVuZ3RoID09PSAwKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICAoKHR5cGVOYW1lID09PSAnW29iamVjdCBTZXRdJyB8fCB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgV2Vha1NldF0nKSAmJiB4LnNpemUgPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICgodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IHR5cGVOYW1lID09PSAnW29iamVjdCBNYXBdJyB8fCB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgV2Vha01hcF0nKSAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVtYmVyJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBOdW1iZXJdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQmlnSW50XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTdHJpbmcnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEYXRlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IERhdGVdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0FycmF5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPYmplY3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNTZXQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFNldF0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBXZWFrU2V0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNNYXAnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBNYXBdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgV2Vha01hcF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSXRlcmFibGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBBcnJheV0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBPYmplY3RdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU2V0XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IFdlYWtTZXRdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgTWFwXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IFdlYWtNYXBdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0V2ZW4nOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09kZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAxO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIElURVJBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5PYmplY3QnOiBmdW5jdGlvbih4LCB5KVxuXHR7XG5cdFx0aWYodGhpcy5pc0FycmF5KHkpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU3RyaW5nKHkpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHkuaW5kZXhPZih4KSA+PSAwO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTZXQoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHkuaGFzKHgpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNNYXAoeSkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh5LCB4KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJblJhbmdlJzogZnVuY3Rpb24oeCwgeDEsIHgyKVxuXHR7XG5cdFx0aWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICgvKi0tLSoveC8qLS0tKi8gPj0gLyotLS0qL3gxLyotLS0qLylcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICgvKi0tLSoveC8qLS0tKi8gPD0gLyotLS0qL3gyLyotLS0qLylcblx0XHRcdDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoeC5jaGFyQ29kZUF0KDApID49IHgxLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoeC5jaGFyQ29kZUF0KDApIDw9IHgyLmNoYXJDb2RlQXQoMCkpXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmdlJzogZnVuY3Rpb24oeDEsIHgyLCBzdGVwID0gMSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0LyoqLyBpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNOdW1iZXIoeDIpXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0gLyotLS0qL3gxLyotLS0qLzsgaSA8PSAvKi0tLSoveDIvKi0tLSovOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKC8qLS0tLS0tLS0tLS0tLS0tKi8oaSkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICAgICAgJiZcblx0XHQgICAgICAgIHRoaXMuaXNTdHJpbmcoeDIpICYmIHgyLmxlbmd0aCA9PT0gMVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IHgxLmNoYXJDb2RlQXQoMCk7IGkgPD0geDIuY2hhckNvZGVBdCgwKTsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sZW5ndGgnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyh4KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzU2V0KHgpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHgubGVuZ3RoO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTZXQoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHguc2l6ZTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzTWFwKHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aXRlbS5mb3JFYWNoKHggPT4gTC5wdXNoKHgpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc1NldChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzU2V0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGl0ZW0uZm9yRWFjaCh4ID0+IEwuYWRkKHgpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBEID0ge307XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzT2JqZWN0KGl0ZW0pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGl0ZW0pIERbal0gPSBpdGVtW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zb3J0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnNvcnQoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yZXZlcnNlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4LnJldmVyc2UoKSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qb2luJzogZnVuY3Rpb24oeCwgc2VwKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguam9pbihzZXApIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2tleXMnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNNYXAoeCkgPyBPYmplY3Qua2V5cyh4KSA6IFtdO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jb2x1bW4nOiBmdW5jdGlvbih4LCBrZXkpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5tYXAoKHZhbCkgPT4gdmFsW2tleV0pIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2JhdGNoJzogZnVuY3Rpb24oeCwgbiwgbWlzc2luZyA9ICcnKVxuXHR7XG5cdCAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGlmKHRoaXMuaXNBcnJheSh4KVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcihuKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGwgPSB4Lmxlbmd0aDtcblxuXHRcdFx0aWYobCA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBsYXN0O1xuXG5cdFx0XHRcdGNvbnN0IG0gPSBNYXRoLmNlaWwobCAvIG4pICogbjtcblxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSBuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobGFzdCA9IHguc2xpY2UoaSwgaSArIG4pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvcihsZXQgaSA9IGw7IGkgPCBtOyBpICs9IDEpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYXN0LnB1c2gobWlzc2luZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFNUUklOR1MgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3N0YXJ0c1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gMHgwMDAwMDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2VuZHNXaXRoJzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzMSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoczIpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgYmFzZSA9IHMxLmxlbmd0aCAtIHMyLmxlbmd0aDtcblxuXHRcdFx0cmV0dXJuIHMxLmluZGV4T2YoczIsIGJhc2UpID09PSBiYXNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXRjaCc6IGZ1bmN0aW9uKHMsIHJlZ2V4KVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZygoKHMpKSlcblx0XHQgICAmJlxuXHRcdCAgIHRoaXMuaXNTdHJpbmcocmVnZXgpXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgaWR4MSA9IHJlZ2V4LiAgaW5kZXhPZiAgKCcvJyk7XG5cdFx0XHRjb25zdCBpZHgyID0gcmVnZXgubGFzdEluZGV4T2YoJy8nKTtcblxuXHRcdFx0aWYoaWR4MSA9PT0gMCB8fCBpZHgxIDwgaWR4Milcblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cChyZWdleC5zdWJzdHJpbmcoaWR4MSArIDEsIGlkeDIpLCByZWdleC5zdWJzdHJpbmcoaWR4MiArIDEpKS50ZXN0KHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoKGVycilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kZWZhdWx0JzogZnVuY3Rpb24oczEsIHMyKVxuXHR7XG5cdFx0cmV0dXJuIHMxIHx8IHMyIHx8ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sb3dlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9Mb3dlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl91cHBlcic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudG9VcHBlckNhc2UoKSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9jYXBpdGFsaXplJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHMudHJpbSgpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXlxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdGl0bGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oPzpefFxccylcXFMvZywgZnVuY3Rpb24oYykge1xuXG5cdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3RyaW0nOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnRyaW0oKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBvbGRTdHJzLCBuZXdTdHJzKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRjb25zdCBsID0gKCgocykpKS5sZW5ndGg7XG5cdFx0Y29uc3QgbSA9IG9sZFN0cnMubGVuZ3RoO1xuXHRcdGNvbnN0IG4gPSBuZXdTdHJzLmxlbmd0aDtcblxuXHRcdGlmKG0gIT09IG4pXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHR9XG5cbl9fbDA6XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAwKVxuXHRcdHtcblx0XHRcdGNvbnN0IHAgPSBzLnN1YnN0cmluZyhpKTtcblxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IG07IGogKz0gMSlcblx0XHRcdHtcblx0XHRcdFx0aWYocC5pbmRleE9mKG9sZFN0cnNbal0pID09PSAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3U3Ryc1tqXSk7XG5cblx0XHRcdFx0XHRpICs9IG9sZFN0cnNbal0ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucHVzaChzLmNoYXJBdChpKyspKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9IdG1sWCc6IFsnJicgICAgLCAnXCInICAgICAsICc8JyAgICwgJz4nICAgXSxcblx0J190ZXh0VG9IdG1sWSc6IFsnJmFtcDsnLCAnJnF1b3Q7JywgJyZsdDsnLCAnJmd0OyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxuJyAsICdcIicgICwgJ1xcJycgIF0sXG5cdCdfdGV4dFRvU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJywgJ1xcXFxcXCcnXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfdGV4dFRvSnNvblN0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2VzY2FwZSc6IGZ1bmN0aW9uKHMsIG1vZGUpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHN3aXRjaChtb2RlIHx8ICdodG1sJylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XG5cdFx0XHRcdGNhc2UgJ2h0bWxfYXR0cic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblxuXHRcdFx0XHRjYXNlICdqcyc6XG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAnanNvbic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1gsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICd1cmwnOlxuXHRcdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmF3JzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gc1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc01hcChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JvdW5kJzogZnVuY3Rpb24oeCwgbW9kZSlcblx0e1xuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ2NlaWwnOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHgpO1xuXG5cdFx0XHRjYXNlICdmbG9vcic6XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHgpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh4KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA+IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJBTkRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc01hcCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIERBVEUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kYXRlJzogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0LCB0aW1lem9uZSlcblx0e1xuXHRcdGlmKHR5cGVvZiBtb21lbnQgIT09ICd1bmRlZmluZWQnICYmICh0aGlzLmlzRGF0ZShkYXRlKSB8fCB0aGlzLmlzU3RyaW5nKGRhdGUpKSAmJiB0aGlzLmlzU3RyaW5nKGZvcm1hdCkpXG5cdFx0e1xuXHRcdFx0aWYodHlwZW9mIG1vbWVudC50eiAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5pc1N0cmluZyh0aW1lem9uZSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBtb21lbnQoZGF0ZSkudHoodGltZXpvbmUpLmZvcm1hdChmb3JtYXQpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRfID0gXyB8fCB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSkoKTsiXX0=
