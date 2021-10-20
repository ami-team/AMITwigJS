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
                  dict[sym1] =
                  /*-----*/
                  _i3;
                  dict[sym2] = iterValue[_i3];
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
        for (var _i5 = x1.charCodeAt(0); _i5 <= x2.charCodeAt(0); _i5 += step) {
          result.push(String.fromCharCode(_i5));
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

          for (var _i6 in arguments) {
            var _item = arguments[_i6];

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

          for (var _i7 in arguments) {
            var _item2 = arguments[_i7];

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

          for (var _i8 = l; _i8 < m; _i8 += 1) {
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
          for (var _i9 in
          /*-*/
          variables
          /*-*/
          ) {
            temp[_i9] =
            /*-*/
            variables
            /*-*/
            [_i9];
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

          for (var _i10 in node.dict) {
            L.push(_i10 + ':' + this._getJS(node.dict[_i10]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return '{' + L.join(',') + '}';

        /*--------------------------------------------------------------------------------------------------------*/

        /* FUN                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.FUN:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i11 in node.list) {
            L.push(this._getJS(node.list[_i11]));
          }
          /*----------------------------------------------------------------------------------------------------*/


          return node.nodeValue + '(' + L.join(',') + ')';

        /*--------------------------------------------------------------------------------------------------------*/

        /* VAR                                                                                                    */

        /*--------------------------------------------------------------------------------------------------------*/

        case amiTwig.expr.tokens.VAR:
          /*----------------------------------------------------------------------------------------------------*/
          L = [];

          for (var _i12 in node.list) {
            L.push('[' + this._getJS(node.list[_i12]) + ']');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFtaS10d2lnLmVzNi5qcyJdLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxwaGFudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsImNhY2hlIiwiZXZhbCIsInBhcnRzIiwic3BsaXQiLCJwYXJlbnQiLCJ1bmRlZmluZWQiLCJldmVyeSIsImJsb2NrIiwic3ltMSIsInN5bTIiLCJvcmlnVmFsdWUiLCJ0eXBlTmFtZSIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZXJWYWx1ZSIsImVudHJpZXMiLCJrZXlzIiwiayIsIm9sZDEiLCJvbGQyIiwib2xkMyIsImxvb3AiLCJmaXJzdCIsImxhc3QiLCJyZXZpbmRleDAiLCJpbmRleDAiLCJyZXZpbmRleCIsIm1fMV8iLCJ3aXRoX3N1YmV4cHIiLCJ3aXRoX2NvbnRleHQiLCJmaWxlTmFtZSIsInZhcmlhYmxlcyIsImluY2x1ZGUiLCJyZW5kZXIiLCJfIiwiZiIsImludGVycHJldGVyIiwiZ2V0SlMiLCJ4IiwiaXNOdW1iZXIiLCJ5IiwiaXNBcnJheSIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJ4MSIsIngyIiwic3RlcCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImlkeDEiLCJpZHgyIiwic2xpY2UiLCJhcmd1bWVudHMiLCJMIiwiRCIsInNvcnQiLCJyZXZlcnNlIiwic2VwIiwibWFwIiwidmFsIiwibWlzc2luZyIsIk1hdGgiLCJjZWlsIiwiczEiLCJzMiIsImJhc2UiLCJyZWdleCIsImxhc3RJbmRleE9mIiwidGVzdCIsImVyciIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ0cmltIiwib2xkU3RycyIsIm5ld1N0cnMiLCJwIiwibW9kZSIsIl9yZXBsYWNlIiwiX3RleHRUb0h0bWxYIiwiX3RleHRUb0h0bWxZIiwiX3RleHRUb1N0cmluZ1giLCJfdGV4dFRvU3RyaW5nWSIsIl90ZXh0VG9Kc29uU3RyaW5nWCIsIl90ZXh0VG9Kc29uU3RyaW5nWSIsImVuY29kZVVSSUNvbXBvbmVudCIsInZhbHVlcyIsIm1heCIsImFicyIsImZsb29yIiwicm91bmQiLCJhcmdzIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJOYU4iLCJORUdBVElWRV9JTkZJTklUWSIsInJhbmRvbSIsIlgiLCJNQVhfU0FGRV9JTlRFR0VSIiwiZGF0ZSIsImZvcm1hdCIsInRpbWV6b25lIiwibW9tZW50IiwiaXNEYXRlIiwidHoiLCJpbmRlbnQiLCJwYXRoIiwiSlNQYXRoIiwiYXBwbHkiLCJ3aXRoQ29udGV4dCIsImlnbm9yZU1pc3NpbmciLCJmaWx0ZXJfZSIsImZpbHRlcl9lc2NhcGUiLCJfZ2V0SlMiLCJvcGVyYXRvciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBQUMsWUFBVztBQUNaO0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsT0FBTyxHQUFHO0FBQ2ZDLElBQUFBLE9BQU8sRUFBRTtBQURNLEdBQWhCO0FBSUE7O0FBRUE7O0FBQUssTUFBRyxPQUFPQyxNQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU9BLE1BQU0sQ0FBQ0MsT0FBZCxLQUEwQixRQUEzRCxFQUNMO0FBQ0NELElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSCxPQUFmLEdBQXlCQSxPQUF6QjtBQUNBLEdBSEksTUFJQSxJQUFHLE9BQU9JLE1BQVAsS0FBa0IsV0FBckIsRUFDTDtBQUNDQSxJQUFBQSxNQUFNLENBQUNKLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0EsR0FISSxNQUlBLElBQUcsT0FBT0ssTUFBUCxLQUFrQixXQUFyQixFQUNMO0FBQ0NBLElBQUFBLE1BQU0sQ0FBQ0wsT0FBUCxHQUFpQkEsT0FBakI7QUFDQTtBQUVEO0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7OztBQUVB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O0FBQ0N5TyxnQkFBQUEsUUFBUSxHQUFHLEdBQVg7QUFDQTs7QUFFRDs7QUFFQSxtQkFBS2pULE9BQU8sQ0FBQzRDLElBQVIsQ0FBYWQsTUFBYixDQUFvQjJCLE1BQXpCO0FBQ0N3UCxnQkFBQUEsUUFBUSxHQUFHLEdBQVg7QUFDQTs7QUFFRDs7QUFFQTtBQUNDQSxnQkFBQUEsUUFBUSxHQUFHM0wsSUFBSSxDQUFDd0IsU0FBaEI7QUFDQTs7QUFFRDtBQTVDRDs7QUErQ0EzQixZQUFBQSxJQUFJLEdBQUcsS0FBSzZMLE1BQUwsQ0FBWTFMLElBQUksQ0FBQ0UsUUFBakIsQ0FBUDtBQUNBSCxZQUFBQSxLQUFLLEdBQUcsS0FBSzJMLE1BQUwsQ0FBWTFMLElBQUksQ0FBQ0csU0FBakIsQ0FBUjtBQUVBLG1CQUFPLE1BQU1OLElBQU4sR0FBYThMLFFBQWIsR0FBd0I1TCxLQUF4QixHQUFnQyxHQUF2QztBQUNBOztBQUVGO0FBOVREO0FBaVVBOztBQUNBLEtBN1V5Qjs7QUErVTFCO0FBRUFnSCxJQUFBQSxLQUFLLEVBQUUsZUFBU3pMLElBQVQsRUFDUDtBQUNDLGFBQU8sMkJBQTJCLEtBQUtvUSxNQUFMLENBQVlwUSxJQUFJLENBQUNvRSxRQUFqQixDQUEzQixHQUF3RCxNQUEvRDtBQUNBLEtBcFZ5Qjs7QUFzVjFCO0FBRUFnRixJQUFBQSxJQUFJLEVBQUUsZUFBU3BKLElBQVQsRUFBZXNMLENBQWYsRUFDTjtBQUNDQSxNQUFBQSxDQUFDLEdBQUdBLENBQUMsSUFBSSxFQUFUO0FBRUEsYUFBT2xDLElBQUksQ0FBQyxLQUFLcUMsS0FBTCxDQUFXekwsSUFBWCxDQUFELENBQUosQ0FBdUJpSyxJQUF2QixDQUE0QnFCLENBQTVCLEVBQStCQSxDQUEvQixDQUFQO0FBQ0E7QUFFRDs7QUEvVjBCLEdBQTNCO0FBa1dBO0FBQ0MsQ0FqL0dEIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmVcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC0yMDIxIENOUlMvTFBTQ1xuICpcbiAqIEF1dGhvcjogSsOpcsO0bWUgT0RJRVIgKGplcm9tZS5vZGllckBscHNjLmluMnAzLmZyKVxuICpcbiAqIFJlcG9zaXRvcmllczogaHR0cHM6Ly9naXRsYWIuaW4ycDMuZnIvYW1pLXRlYW0vQU1JVHdpZ0pTL1xuICogICAgICAgICAgICAgICBodHRwczovL3d3dy5naXRodWIuY29tL2FtaS10ZWFtL0FNSVR3aWdKUy9cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGEgY29tcHV0ZXIgcHJvZ3JhbSB3aG9zZSBwdXJwb3NlIGlzIHRvIHByb3ZpZGUgYVxuICogSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2Vuc2lvTGFicydzIFRXSUcgdGVtcGxhdGUgZW5naW5lLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgZ292ZXJuZWQgYnkgdGhlIENlQ0lMTC1DIGxpY2Vuc2UgdW5kZXIgRnJlbmNoIGxhdyBhbmRcbiAqIGFiaWRpbmcgYnkgdGhlIHJ1bGVzIG9mIGRpc3RyaWJ1dGlvbiBvZiBmcmVlIHNvZnR3YXJlLiBZb3UgY2FuIHVzZSxcbiAqIG1vZGlmeSBhbmQvb3IgcmVkaXN0cmlidXRlIHRoZSBzb2Z0d2FyZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DXG4gKiBsaWNlbnNlIGFzIGNpcmN1bGF0ZWQgYnkgQ0VBLCBDTlJTIGFuZCBJTlJJQSBhdCB0aGUgZm9sbG93aW5nIFVSTFxuICogXCJodHRwOi8vd3d3LmNlY2lsbC5pbmZvXCIuXG4gKlxuICogVGhlIGZhY3QgdGhhdCB5b3UgYXJlIHByZXNlbnRseSByZWFkaW5nIHRoaXMgbWVhbnMgdGhhdCB5b3UgaGF2ZSBoYWRcbiAqIGtub3dsZWRnZSBvZiB0aGUgQ2VDSUxMLUMgbGljZW5zZSBhbmQgdGhhdCB5b3UgYWNjZXB0IGl0cyB0ZXJtcy5cbiAqXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGFtaVR3aWcgPSB7XG5cdHZlcnNpb246ICcxLjIuMCdcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKiovIGlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpXG57XG5cdG1vZHVsZS5leHBvcnRzLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJylcbntcblx0d2luZG93LmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJylcbntcblx0Z2xvYmFsLmFtaVR3aWcgPSBhbWlUd2lnO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLy9leHBvcnQgZGVmYXVsdCBhbWlUd2lnO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLnRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnRva2VuaXplciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0b2tlbml6ZTogZnVuY3Rpb24oY29kZSwgbGluZSwgc3BhY2VzLCB0b2tlbkRlZnMsIHRva2VuVHlwZXMsIGVycm9yKVxuXHR7XG5cdFx0aWYodG9rZW5EZWZzLmxlbmd0aCAhPT0gdG9rZW5UeXBlcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ2B0b2tlbkRlZnMubGVuZ3RoICE9IHRva2VuVHlwZXMubGVuZ3RoYCc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzdWx0X3Rva2VucyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF90eXBlcyA9IFtdO1xuXHRcdGNvbnN0IHJlc3VsdF9saW5lcyA9IFtdO1xuXG5cdFx0bGV0IGkgPSAweDAwMDAwMDAwMDtcblx0XHRjb25zdCBsID0gY29kZS5sZW5ndGg7XG5cblx0XHRsZXQgd29yZCA9ICcnLCB0b2tlbiwgYztcblxuX19sMDpcdHdoaWxlKGkgPCBsKVxuXHRcdHtcblx0XHRcdGMgPSBjb2RlLmNoYXJBdCgwKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBDT1VOVCBMSU5FUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihjID09PSAnXFxuJylcblx0XHRcdHtcblx0XHRcdFx0bGluZSsrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBTUEFDRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHNwYWNlcy5pbmRleE9mKGMpID49IDApXG5cdFx0XHR7XG5cdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW52YWxpZCB0b2tlbiBgJyArIHdvcmQgKyAnYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKC0xKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRUdFWEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcihjb25zdCBqIGluIHRva2VuRGVmcylcblx0XHRcdHtcblx0XHRcdFx0dG9rZW4gPSB0aGlzLl9tYXRjaChjb2RlLCB0b2tlbkRlZnNbal0pO1xuXG5cdFx0XHRcdGlmKHRva2VuKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYod29yZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2godG9rZW4pO1xuXHRcdFx0XHRcdHJlc3VsdF90eXBlcy5wdXNoKHRva2VuVHlwZXNbal0pO1xuXHRcdFx0XHRcdHJlc3VsdF9saW5lcy5wdXNoKGxpbmUpO1xuXG5cdFx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKHRva2VuLmxlbmd0aCk7XG5cdFx0XHRcdFx0aSArPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRUFUIFJFTUFJTklORyBDSEFSQUNURVJFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0d29yZCArPSBjO1xuXG5cdFx0XHRjb2RlID0gY29kZS5zdWJzdHJpbmcoMSk7XG5cdFx0XHRpICs9IDE7XG5cbi8qXHRcdFx0Y29udGludWUgX19sMDtcbiAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0aWYod29yZClcblx0XHR7XG5cdFx0XHRpZihlcnJvcilcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHRfdG9rZW5zLnB1c2god29yZCk7XG5cdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcbi8qXHRcdFx0d29yZCA9ICcnO1xuICovXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0b2tlbnM6IHJlc3VsdF90b2tlbnMsXG5cdFx0XHR0eXBlczogcmVzdWx0X3R5cGVzLFxuXHRcdFx0bGluZXM6IHJlc3VsdF9saW5lcyxcblx0XHR9O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X21hdGNoOiBmdW5jdGlvbihzLCBzdHJpbmdPclJlZ0V4cClcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0aWYoc3RyaW5nT3JSZWdFeHAgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0e1xuXHRcdFx0bSA9IHMubWF0Y2goc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSAhPT0gbnVsbCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIC8qLSovbVswXS8qLSovKSA/IC8qLSovbVswXS8qLSovIDogbnVsbDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdG0gPSBzLmluZGV4T2Yoc3RyaW5nT3JSZWdFeHApO1xuXG5cdFx0XHRyZXR1cm4gbSA9PT0gMHgwMCAmJiB0aGlzLl9jaGVja05leHRDaGFyKHMsIHN0cmluZ09yUmVnRXhwKSA/IHN0cmluZ09yUmVnRXhwIDogbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfYWxwaGFudW06IFtcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMSxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRdLFxuXG5cdF9jaGVja05leHRDaGFyOiBmdW5jdGlvbihzLCB0b2tlbilcblx0e1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRva2VuLmxlbmd0aDtcblxuXHRcdGNvbnN0IGNoYXJDb2RlMiA9IHMuY2hhckNvZGVBdChsZW5ndGggLSAwKTtcblx0XHRjb25zdCBjaGFyQ29kZTEgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gaXNOYU4oY2hhckNvZGUyKVxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbHBoYW51bVtjaGFyQ29kZTJdID09PSAwXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHRoaXMuX2FscGhhbnVtW2NoYXJDb2RlMV0gPT09IDBcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwciA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci50b2tlbnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci50b2tlbnMgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBDT01QT1NJVEUgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5JU19YWFggPSBbXG5cdFx0XHR0aGlzLkRFRklORUQsXG5cdFx0XHR0aGlzLk5VTEwsXG5cdFx0XHR0aGlzLkVNUFRZLFxuXHRcdFx0dGhpcy5JVEVSQUJMRSxcblx0XHRcdHRoaXMuRVZFTixcblx0XHRcdHRoaXMuT0RELFxuXHRcdF07XG5cblx0XHR0aGlzLlhYWF9XSVRIID0gW1xuXHRcdFx0dGhpcy5TVEFSVFNfV0lUSCxcblx0XHRcdHRoaXMuRU5EU19XSVRILFxuXHRcdF07XG5cblx0XHR0aGlzLlBMVVNfTUlOVVMgPSBbXG5cdFx0XHR0aGlzLkNPTkNBVCxcblx0XHRcdHRoaXMuUExVUyxcblx0XHRcdHRoaXMuTUlOVVMsXG5cdFx0XTtcblxuXHRcdHRoaXMuTVVMX0ZMRElWX0RJVl9NT0QgPSBbXG5cdFx0XHR0aGlzLk1VTCxcblx0XHRcdHRoaXMuRkxESVYsXG5cdFx0XHR0aGlzLkRJVixcblx0XHRcdHRoaXMuTU9ELFxuXHRcdF07XG5cblx0XHR0aGlzLlJYID0gW1xuXHRcdFx0dGhpcy5SUCxcblx0XHRcdHRoaXMuUkIxLFxuXHRcdF07XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkVBTCBUT0tFTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRMT0dJQ0FMX09SOiAxMDAsXG5cdExPR0lDQUxfQU5EOiAxMDEsXG5cdEJJVFdJU0VfT1I6IDEwMixcblx0QklUV0lTRV9YT1I6IDEwMyxcblx0QklUV0lTRV9BTkQ6IDEwNCxcblx0Tk9UOiAxMDUsXG5cdElTOiAxMDYsXG5cdERFRklORUQ6IDEwNyxcblx0TlVMTDogMTA4LFxuXHRFTVBUWTogMTA5LFxuXHRJVEVSQUJMRTogMTEwLFxuXHRFVkVOOiAxMTEsXG5cdE9ERDogMTEyLFxuXHRDTVBfT1A6IDExMyxcblx0U1RBUlRTX1dJVEg6IDExNCxcblx0RU5EU19XSVRIOiAxMTUsXG5cdE1BVENIRVM6IDExNixcblx0SU46IDExNyxcblx0UkFOR0U6IDExOCxcblx0Q09OQ0FUOiAxMTksXG5cdFBMVVM6IDEyMCxcblx0TUlOVVM6IDEyMSxcblx0UE9XRVI6IDEyMixcblx0TVVMOiAxMjMsXG5cdEZMRElWOiAxMjQsXG5cdERJVjogMTI1LFxuXHRNT0Q6IDEyNixcbiBcdERPVUJMRV9RVUVTVElPTjogMTI3LFxuIFx0UVVFU1RJT046IDEyOCxcblx0Q09MT046IDEyOSxcblx0RE9UOiAxMzAsXG5cdENPTU1BOiAxMzEsXG5cdFBJUEU6IDEzMixcblx0TFA6IDEzMyxcblx0UlA6IDEzNCxcblx0TEIxOiAxMzUsXG5cdFJCMTogMTM2LFxuXHRMQjI6IDEzNyxcblx0UkIyOiAxMzgsXG5cdFNJRDogMTM5LFxuXHRURVJNSU5BTDogMTQwLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZJUlRVQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TFNUOiAyMDAsXG5cdERJQzogMjAxLFxuXHRGVU46IDIwMixcblx0VkFSOiAyMDMsXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zLiRpbml0KCk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLlRva2VuaXplciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLlRva2VuaXplciA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpIHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl9zcGFjZXMgPSBbJyAnLCAnXFx0JywgJ1xcbicsICdcXHInXTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuX3Rva2VuRGVmcyA9IFtcblx0XHQnb3InLFxuXHRcdCdhbmQnLFxuXHRcdCdiLW9yJyxcblx0XHQnYi14b3InLFxuXHRcdCdiLWFuZCcsXG5cdFx0J25vdCcsXG5cdFx0J2lzJyxcblx0XHQnZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCdlbXB0eScsXG5cdFx0J2l0ZXJhYmxlJyxcblx0XHQnZXZlbicsXG5cdFx0J29kZCcsXG5cdFx0Jz09PScsXG5cdFx0Jz09Jyxcblx0XHQnIT09Jyxcblx0XHQnIT0nLFxuXHRcdCc8PScsXG5cdFx0Jz49Jyxcblx0XHQnPCcsXG5cdFx0Jz4nLFxuXHRcdC9ec3RhcnRzXFxzK3dpdGgvLFxuXHRcdC9eZW5kc1xccyt3aXRoLyxcblx0XHQnbWF0Y2hlcycsXG5cdFx0J2luJyxcblx0XHQnLi4nLFxuXHRcdCd+Jyxcblx0XHQnKycsXG5cdFx0Jy0nLFxuXHRcdCcqKicsXG5cdFx0JyonLFxuXHRcdCcvLycsXG5cdFx0Jy8nLFxuXHRcdCclJyxcblx0XHQnPz8nLFxuXHRcdCc/Jyxcblx0XHQnOicsXG5cdFx0Jy4nLFxuXHRcdCcsJyxcblx0XHQnfCcsXG5cdFx0JygnLFxuXHRcdCcpJyxcblx0XHQnWycsXG5cdFx0J10nLFxuXHRcdCd7Jyxcblx0XHQnfScsXG5cdFx0J3RydWUnLFxuXHRcdCdmYWxzZScsXG5cdFx0L15bMC05XStcXC5bMC05XSsvLFxuXHRcdC9eWzAtOV0rLyxcblx0XHQvXicoXFxcXCd8W14nXSkqJy8sXG5cdFx0L15cIihcXFxcXCJ8W15cIl0pKlwiLyxcblx0XHQvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKi8sXG5cdF07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlblR5cGVzID0gW1xuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OT1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5OVUxMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFksXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JVEVSQUJMRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5PREQsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DTVBfT1AsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5TVEFSVFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5JTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUExVUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1JTlVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NVUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5GTERJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRJVixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLk1PRCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlFVRVNUSU9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5DT01NQSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJQLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIxLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTEIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuUkIyLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU0lELFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdCA9IGZ1bmN0aW9uKGNvZGUsIGxpbmUpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCByZXN1bHQgPSBhbWlUd2lnLnRva2VuaXplci50b2tlbml6ZShcblx0XHRcdGNvZGUsXG5cdFx0XHRsaW5lLFxuXHRcdFx0dGhpcy5fc3BhY2VzLFxuXHRcdFx0dGhpcy5fdG9rZW5EZWZzLFxuXHRcdFx0dGhpcy5fdG9rZW5UeXBlcyxcblx0XHRcdHRydWVcblx0XHQpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbnMgPSByZXN1bHQudG9rZW5zO1xuXHRcdHRoaXMudHlwZXMgPSByZXN1bHQudHlwZXM7XG5cblx0XHR0aGlzLmkgPSAwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5uZXh0ID0gZnVuY3Rpb24obiA9IDEpXG5cdHtcblx0XHR0aGlzLmkgKz0gbjtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuaXNFbXB0eSA9IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmkgPj0gdGhpcy50b2tlbnMubGVuZ3RoO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5wZWVrVG9rZW4gPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1R5cGUgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50eXBlc1t0aGlzLmldO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKVxuXHR7XG5cdFx0aWYodGhpcy5pIDwgdGhpcy50b2tlbnMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGNvbnN0IFRZUEUgPSB0aGlzLnR5cGVzW3RoaXMuaV07XG5cblx0XHRcdHJldHVybiAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/ICh0eXBlLmluZGV4T2YoVFlQRSkgPj0gMCkgOiAodHlwZSA9PT0gVFlQRSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuQ29tcGlsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cblx0dGhpcy4kaW5pdChjb2RlLCBsaW5lKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuQ29tcGlsZXIucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy50b2tlbml6ZXIgPSBuZXcgYW1pVHdpZy5leHByLlRva2VuaXplcihcblx0XHRcdHRoaXMuY29kZSA9IGNvZGUsXG5cdFx0XHR0aGlzLmxpbmUgPSBsaW5lXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucm9vdE5vZGUgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmlzRW1wdHkoKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB1bmV4cGVjdGVkIHRva2VuIGAnICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgKyAnYCc7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucm9vdE5vZGUuZHVtcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VOdWxsQ29hbGVzY2luZzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE51bGxDb2FsZXNjaW5nIDogTG9naWNhbE9yICgnPz8nIExvZ2ljYWxPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VMb2dpY2FsT3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbE9yOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VMb2dpY2FsQW5kKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxPciA6IExvZ2ljYWxBbmQgKCdvcicgTG9naWNhbEFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VMb2dpY2FsQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VCaXR3aXNlT3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTG9naWNhbEFuZCA6IEJpdHdpc2VPciAoJ2FuZCcgQml0d2lzZU9yKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZVhvcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlT3IgOiBCaXR3aXNlWG9yICgnYi1vcicgQml0d2lzZVhvcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQml0d2lzZVhvcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlWG9yIDogQml0d2lzZUFuZCAoJ2IteG9yJyBCaXR3aXNlQW5kKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlQW5kKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VBbmQ6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU5vdCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBCaXR3aXNlQW5kIDogTm90ICgnYi1hbmQnIE5vdCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9BTkQpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOb3QoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTm90OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTm90IDogJ25vdCcgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUNvbXAoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgIHwgQ29tcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcCgpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VDb21wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VBZGRTdWIoKSwgcmlnaHQsIG5vZGUsIHN3YXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ29tcCA6IEFkZFN1YiAnaXMnICdub3QnPyAoJ2RlZmluZWQnIHwgJ251bGwnIHwgLi4uKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8qKi8gaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cdFx0XHRzd2FwID0gbm9kZTtcblx0XHRcdC8qIHN3YXAgJ2lzJyBhbmQgJ25vdCcgKi9cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSBzd2FwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5JU19YWFgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRzd2FwLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0c3dhcC5ub2RlUmlnaHQgPSByaWdodDtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBrZXl3b3JkIGBkZWZpbmVkYCwgYG51bGxgLCBgZW1wdHlgLCBgaXRlcmFibGVgLCBgZXZlbmAgb3IgYG9kZGAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAoJz09PScgfCAnPT0nIHwgLi4uKSBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCdzdGFydHMnIHwgJ2VuZHMnKSBgd2l0aGAgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlhYWF9XSVRIKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ21hdGNoZXMnIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1BVENIRVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAnaW4nIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGVsc2UgaWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSU4pKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VBZGRTdWIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICB8IEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBZGRTdWI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZU11bERpdigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBZGRTdWIgOiBNdWxEaXYgKCgnKycgfCAnLScpIE11bERpdikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUExVU19NSU5VUykpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZU11bERpdigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VNdWxEaXY6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZVBsdXNNaW51cygpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBNdWxEaXYgOiBQbHVzTWludXMgKCgnKicgfCAnLy8nIHwgJy8nIHwgJyUnKSBQbHVzTWludXMpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTVVMX0ZMRElWX0RJVl9NT0QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQbHVzTWludXMoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUGx1c01pbnVzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogUGx1c01pbnVzIDogKCctJyB8ICcrJykgUG93ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VQb3dlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbnVsbDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgICAgICAgfCBEb3QxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHRoaXMucGFyc2VQb3dlcigpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VQb3dlcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRmlsdGVyKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBvd2VyIDogRmlsdGVyICgnKionIEZpbHRlcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUZpbHRlcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZURvdDEoKSwgbm9kZSwgdGVtcDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBGaWx0ZXIgOiBEb3QxICgnfCcgRG90MSkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUElQRSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZURvdDEodHJ1ZSk7XG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG5cblx0XHRcdHRlbXAubGlzdC51bnNoaWZ0KGxlZnQpO1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MTogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRjb25zdCBub2RlID0gdGhpcy5wYXJzZURvdDIoaXNGaWx0ZXIpO1xuXG5cdFx0aWYobm9kZSlcblx0XHR7XG5cdFx0XHRsZXQgdGVtcDtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGZvcih0ZW1wID0gbm9kZTsgdGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5ET1Q7IHRlbXAgPSB0ZW1wLm5vZGVMZWZ0KSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0ZW1wLnEpXG5cdFx0XHR7XG5cdFx0XHRcdC8qKi8gaWYodGVtcC5ub2RlVHlwZSA9PT0gYW1pVHdpZy5leHByLnRva2Vucy5GVU4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZih0ZW1wLm5vZGVWYWx1ZSBpbiBhbWlUd2lnLnN0ZGxpYilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9ICdhbWlUd2lnLnN0ZGxpYi4nICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0ZW1wLm5vZGVWYWx1ZSA9IC8qLS0tKi8nXy4nLyotLS0qLyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuVkFSKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRlbXAucSA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MiA6IERvdDMgKCcuJyBEb3QzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCAnLicpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VEb3QzKGlzRmlsdGVyKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRG90MzogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VYKGlzRmlsdGVyKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRG90MyA6IFggKCdbJyBOdWxsQ29hbGVzY2luZyAnXScpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRPVCwgJ1tdJyk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYF1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICB8IFggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VYOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFggOiBHcm91cCB8IEFycmF5IHwgT2JqZWN0IHwgRnVuVmFyIHwgVGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VHcm91cCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlQXJyYXkoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZU9iamVjdCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlRnVuVmFyKGlzRmlsdGVyKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZVRlcm1pbmFsKCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogU1lOVEFYIEVSUk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgc3ludGF4IGVycm9yIG9yIHRydW5jYXRlZCBleHByZXNzaW9uJztcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlR3JvdXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIEdyb3VwIDogJygnIE51bGxDb2FsZXNjaW5nICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRub2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGApYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUFycmF5OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZSwgbGlzdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBBcnJheSA6ICdbJyBTaW5nbGV0cyAnXScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTEIxKSlcblx0XHR7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKGFtaVR3aWcuZXhwci50b2tlbnMuTFNULCAnQXJyYXknKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSBsaXN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU9iamVjdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGRpY3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogT2JqZWN0IDogJ3snIERvdWJsZXRzICd9JyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMikpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRkaWN0ID0gdGhpcy5fcGFyc2VEb3VibGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjIpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkRJQywgJ09iamVjdCcpO1xuXG5cdFx0XHRcdG5vZGUuZGljdCA9IGRpY3Q7XG5cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYH1gIGV4cGVjdGVkJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRnVuVmFyOiBmdW5jdGlvbihpc0ZpbHRlcilcblx0e1xuXHRcdGxldCBub2RlO1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuU0lEKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKDAsIGlzRmlsdGVyID8gJ2ZpbHRlcl8nICsgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkgOiB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cblx0XHRcdG5vZGUucSA9IHRydWU7XG5cblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGdW5WYXIgOiBTSUQgJygnIFNpbmdsZXRzICcpJyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxQKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IHRoaXMuX3BhcnNlU2luZ2xldHMoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVUeXBlID0gYW1pVHdpZy5leHByLnRva2Vucy5GVU47XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogICAgICAgIHwgU0lEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlLm5vZGVUeXBlID0gaXNGaWx0ZXIgPyBhbWlUd2lnLmV4cHIudG9rZW5zLkZVTlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgOiBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUlxuXHRcdFx0XHQ7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gW107XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJYKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VTaW5nbGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldHM6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IHt9O1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSA9PT0gZmFsc2UpXG5cdFx0e1xuXHRcdFx0dGhpcy5fcGFyc2VEb3VibGV0KHJlc3VsdCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNPTU1BKSA9PT0gdHJ1ZSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlU2luZ2xldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0cmVzdWx0LnB1c2godGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3BhcnNlRG91YmxldDogZnVuY3Rpb24ocmVzdWx0KVxuXHR7XG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwpKVxuXHRcdHtcblx0XHRcdGNvbnN0IGtleSA9IHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT0xPTikpXG5cdFx0XHR7XG4vKlx0XHRcdFx0Y29uc3QgY29sb24gPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcbiAqL1x0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0W2tleV0gPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGA6YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHRlcm1pbmFsIGV4cGVjdGVkJztcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVRlcm1pbmFsOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogVGVybWluYWwgOiBURVJNSU5BTCB8IFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRsZWZ0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpKVxuXHRcdFx0e1xuXHRcdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJpZ2h0ID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGxlZnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLk5vZGUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUgPSBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKSB7XG5cblx0dGhpcy4kaW5pdChub2RlVHlwZSwgbm9kZVZhbHVlKTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuTm9kZS5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKG5vZGVUeXBlLCBub2RlVmFsdWUpXG5cdHtcblx0XHR0aGlzLm5vZGVUeXBlID0gbm9kZVR5cGU7XG5cdFx0dGhpcy5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG5cdFx0dGhpcy5ub2RlTGVmdCA9IG51bGw7XG5cdFx0dGhpcy5ub2RlUmlnaHQgPSBudWxsO1xuXHRcdHRoaXMubGlzdCA9IG51bGw7XG5cdFx0dGhpcy5kaWN0ID0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9kdW1wOiBmdW5jdGlvbihub2RlcywgZWRnZXMsIHBDbnQpXG5cdHtcblx0XHRsZXQgQ05UO1xuXG5cdFx0Y29uc3QgY250ID0gcENudFswXTtcblxuXHRcdG5vZGVzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyBbbGFiZWw9XCInICsgdGhpcy5ub2RlVmFsdWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiXTsnKTtcblxuXHRcdGlmKHRoaXMubm9kZUxlZnQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZUxlZnQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm5vZGVSaWdodClcblx0XHR7XG5cdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnOycpO1xuXHRcdFx0dGhpcy5ub2RlUmlnaHQuX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHR9XG5cblx0XHRpZih0aGlzLmxpc3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5saXN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmxpc3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZih0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGkgaW4gdGhpcy5kaWN0KVxuXHRcdFx0e1xuXHRcdFx0XHRDTlQgPSArK3BDbnRbMF07XG5cdFx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICcgW2xhYmVsPVwiWycgKyBpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICddXCJdOycpO1xuXHRcdFx0XHR0aGlzLmRpY3RbaV0uX2R1bXAobm9kZXMsIGVkZ2VzLCBwQ250KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkdW1wOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCBub2RlcyA9IFtdO1xuXHRcdGNvbnN0IGVkZ2VzID0gW107XG5cblx0XHR0aGlzLl9kdW1wKG5vZGVzLCBlZGdlcywgWzBdKTtcblxuXHRcdHJldHVybiAnZGlncmFwaCBhc3Qge1xcblxcdHJhbmtkaXI9VEI7XFxuJyArIG5vZGVzLmpvaW4oJ1xcbicpICsgJ1xcbicgKyBlZGdlcy5qb2luKCdcXG4nKSArICdcXG59Jztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsID0ge307XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50bXBsLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyID0gZnVuY3Rpb24odG1wbCkge1xuXG5cdHRoaXMuJGluaXQodG1wbCk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50bXBsLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRTVEFURU1FTlRfUkU6IC97JVxccyooW2EtekEtWl0rKVxccyooKD86LnxcXG4pKj8pXFxzKiV9LyxcblxuXHRDT01NRU5UX1JFOiAveyNcXHMqKCg/Oi58XFxuKSo/KVxccyojfS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2NvdW50OiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0bGV0IHJlc3VsdCA9IDA7XG5cblx0XHRjb25zdCBsID0gcy5sZW5ndGg7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbDsgaSsrKVxuXHRcdHtcblx0XHRcdGlmKHNbaV0gPT09ICdcXG4nKSByZXN1bHQrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0JGluaXQ6IGZ1bmN0aW9uKHRtcGwpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgbGluZSA9IDE7XG5cblx0XHRsZXQgY29sdW1uO1xuXHRcdGxldCBDT0xVTU47XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0ge1xuXHRcdFx0bGluZTogbGluZSxcblx0XHRcdGtleXdvcmQ6ICdAcm9vdCcsXG5cdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0ZXhwcmVzc2lvbjogJ0B0cnVlJyxcblx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHR9XSxcblx0XHRcdHZhbHVlOiAnJyxcblx0XHR9O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3Qgc3RhY2sxID0gW3RoaXMucm9vdE5vZGVdO1xuXHRcdGNvbnN0IHN0YWNrMiA9IFsweDAwMDAwMDAwMDAwXTtcblxuXHRcdGxldCBpdGVtO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Zm9yKHRtcGwgPSB0bXBsLnJlcGxhY2UodGhpcy5DT01NRU5UX1JFLCAnJyk7OyB0bXBsID0gdG1wbC5zdWJzdHIoQ09MVU1OKSlcblx0XHR7XG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y29uc3QgY3VyciA9IHN0YWNrMVtzdGFjazEubGVuZ3RoIC0gMV07XG5cdFx0XHQgbGV0ICBpbmR4ID0gc3RhY2syW3N0YWNrMi5sZW5ndGggLSAxXTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG0gPSB0bXBsLm1hdGNoKHRoaXMuU1RBVEVNRU5UX1JFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKG0gPT09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGluZSArPSB0aGlzLl9jb3VudCh0bXBsKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaCh7XG5cdFx0XHRcdFx0bGluZTogbGluZSxcblx0XHRcdFx0XHRrZXl3b3JkOiAnQHRleHQnLFxuXHRcdFx0XHRcdGV4cHJlc3Npb246ICcnLFxuXHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0dmFsdWU6IHRtcGwsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZXJyb3JzID0gW107XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gc3RhY2sxLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvKiovIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGlmYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmKHN0YWNrMVtpXS5rZXl3b3JkID09PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0IFx0ZXJyb3JzLnB1c2goJ21pc3Npbmcga2V5d29yZCBgZW5kZm9yYCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGVycm9ycy5sZW5ndGggPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgJyArIGVycm9ycy5qb2luKCcsICcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IG1hdGNoID0gbVswXTtcblx0XHRcdGNvbnN0IGtleXdvcmQgPSBtWzFdO1xuXHRcdFx0Y29uc3QgZXhwcmVzc2lvbiA9IG1bMl07XG5cblx0XHRcdGNvbHVtbiA9IG0uaW5kZXggKyAweDAwMDAwMDAwMDA7XG5cdFx0XHRDT0xVTU4gPSBtLmluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuXG5cdFx0XHRjb25zdCB2YWx1ZSA9IHRtcGwuc3Vic3RyKDAsIGNvbHVtbik7XG5cdFx0XHRjb25zdCBWQUxVRSA9IHRtcGwuc3Vic3RyKDAsIENPTFVNTik7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRsaW5lICs9IHRoaXMuX2NvdW50KFZBTFVFKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHZhbHVlKVxuXHRcdFx0e1xuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHN3aXRjaChrZXl3b3JkKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2ZsdXNoJzpcblx0XHRcdFx0Y2FzZSAnYXV0b2VzY2FwZSc6XG5cdFx0XHRcdGNhc2UgJ3NwYWNlbGVzcyc6XG5cdFx0XHRcdGNhc2UgJ3ZlcmJhdGltJzpcblxuXHRcdFx0XHRcdC8qIElHTk9SRSAqL1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdkbyc6XG5cdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdGJsb2NrczogW10sXG5cdFx0XHRcdFx0XHR2YWx1ZTogJycsXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGN1cnIuYmxvY2tzW2luZHhdLmxpc3QucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0XHRjYXNlICdmb3InOlxuXG5cdFx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0XHRrZXl3b3JkOiBrZXl3b3JkLFxuXHRcdFx0XHRcdFx0YmxvY2tzOiBbe1xuXHRcdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRzdGFjazEucHVzaChpdGVtKTtcblx0XHRcdFx0XHRzdGFjazIucHVzaCgweDAwKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZWlmJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbHNlJzpcblxuXHRcdFx0XHRcdGlmKGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2lmJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgY3Vyclsna2V5d29yZCddICE9PSAnZm9yJ1xuXHRcdFx0XHRcdCApIHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZWxzZWAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGluZHggPSBjdXJyLmJsb2Nrcy5sZW5ndGg7XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrcy5wdXNoKHtcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdFx0XHRsaXN0OiBbXSxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV0gPSBpbmR4O1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbmRpZmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2VuZGZvcic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdmb3InKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kZm9yYCc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c3RhY2sxLnBvcCgpO1xuXHRcdFx0XHRcdHN0YWNrMi5wb3AoKTtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0ZGVmYXVsdDpcblxuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVua25vd24ga2V5d29yZCBgJyArIGtleXdvcmQgKyAnYCc7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMucm9vdE5vZGUsIG51bGwsIDIpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmVuZ2luZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmVuZ2luZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRWQVJJQUJMRV9SRTogL3t7XFxzKiguKj8pXFxzKn19L2csXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcmVuZGVyOiBmdW5jdGlvbihyZXN1bHQsIGl0ZW0sIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGxldCBtO1xuXG5cdFx0bGV0IGV4cHJlc3Npb247XG5cblx0XHR0aGlzLmRpY3QgPSBkaWN0O1xuXHRcdHRoaXMudG1wbHMgPSB0bXBscztcblxuXHRcdHN3aXRjaChpdGVtLmtleXdvcmQpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBETyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdkbyc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YW1pVHdpZy5leHByLmNhY2hlLmV2YWwoaXRlbS5leHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU0VUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnc2V0Jzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRtID0gaXRlbS5leHByZXNzaW9uLm1hdGNoKC8oKD86W2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFwuKSpbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKj1cXHMqKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBpbnZhbGlkIGBzZXRgIHN0YXRlbWVudCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IHBhcnRzID0gbVsxXS5zcGxpdCgnLicpLCBsID0gcGFydHMubGVuZ3RoIC0gMTtcblxuXHRcdFx0XHRsZXQgcGFyZW50LCBqO1xuXG5cdFx0XHRcdGlmKHBhcnRzWzBdID09PSAnd2luZG93J1xuXHRcdFx0XHQgICB8fFxuXHRcdFx0XHQgICBwYXJ0c1swXSA9PT0gJ2dsb2JhbCdcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdC8qKi8gaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHdpbmRvdztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cGFyZW50ID0gZ2xvYmFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aiA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cGFyZW50ID0gZGljdDtcblxuXHRcdFx0XHRcdGogPSAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgaTtcblxuXHRcdFx0XHRmb3IoaSA9IGo7IGkgPCBsOyBpKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZihwYXJlbnRbcGFydHNbaV1dKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudFtwYXJ0c1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBgJyArIG1bMV0gKyAnYCBub3QgZGVjbGFyZWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cGFyZW50W3BhcnRzW2ldXSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKG1bMl0sIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBAVEVYVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdAdGV4dCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbS52YWx1ZS5yZXBsYWNlKHRoaXMuVkFSSUFCTEVfUkUsIGZ1bmN0aW9uKG1hdGNoLCBleHByZXNzaW9uKSB7XG5cblx0XHRcdFx0XHRsZXQgdmFsdWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6ICcnO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJRiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdpZic6XG5cdFx0XHRjYXNlICdAcm9vdCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aXRlbS5ibG9ja3MuZXZlcnkoKGJsb2NrKSA9PiB7XG5cblx0XHRcdFx0XHRleHByZXNzaW9uID0gYmxvY2suZXhwcmVzc2lvbjtcblxuXHRcdFx0XHRcdGlmKGV4cHJlc3Npb24gPT09ICdAdHJ1ZScgfHwgYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBibG9jay5saXN0KVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBibG9jay5saXN0W2ldLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlICdmb3InOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBzeW0xO1xuXHRcdFx0XHRsZXQgc3ltMjtcblx0XHRcdFx0bGV0IGV4cHI7XG5cblx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzKixcXHMqKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKilcXHMraW5cXHMrKC4rKS8pO1xuXG5cdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bSA9IGl0ZW0uYmxvY2tzWzBdLmV4cHJlc3Npb24ubWF0Y2goLyhbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRcdGlmKCFtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgZm9yYCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0XHRzeW0yID0gbnVsbDtcblx0XHRcdFx0XHRcdGV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRzeW0xID0gbVsxXTtcblx0XHRcdFx0XHRzeW0yID0gbVsyXTtcblx0XHRcdFx0XHRleHByID0gbVszXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwciwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcmlnVmFsdWUpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGl0ZXJWYWx1ZTtcblxuXHRcdFx0XHRpZih0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBzeW0yID8gT2JqZWN0LmVudHJpZXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcmlnVmFsdWUpXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGl0ZXJWYWx1ZSA9IG9yaWdWYWx1ZTtcblxuXHRcdFx0XHRcdGlmKHR5cGVOYW1lICE9PSAnW29iamVjdCBBcnJheV0nXG5cdFx0XHRcdFx0ICAgJiZcblx0XHRcdFx0XHQgICB0eXBlTmFtZSAhPT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmQgbm90IGl0ZXJhYmxlJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgcmlnaHQgb3BlcmFuZCBub3QgYW4gb2JqZWN0Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGwgPSBpdGVyVmFsdWUubGVuZ3RoO1xuXG5cdFx0XHRcdGlmKGwgPiAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGsgPSAweDAwMDAwMDAwMDAwMDAwO1xuXG5cdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzBdLmxpc3Q7XG5cblx0XHRcdFx0XHRpZihzeW0yKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjb25zdCBvbGQxID0gZGljdFsoc3ltMSldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMiA9IGRpY3RbKHN5bTIpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDMgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSAvKi0tLS0tKi8oaSk7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMl0gPSBpdGVyVmFsdWVbaV07XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDM7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0yKV0gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0Wydsb29wJ107XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Lmxvb3AgPSB7bGVuZ3RoOiBsLCBwYXJlbnQ6IGRpY3RbJ2xvb3AnXX07XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRmb3IoY29uc3QgaSBpbiBpdGVyVmFsdWUpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpY3Rbc3ltMV0gPSBpdGVyVmFsdWVbaV07XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmZpcnN0ID0gKGsgPT09ICgwIC0gMCkpO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AubGFzdCA9IChrID09PSAobCAtIDEpKTtcblxuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXgwID0gbCAtIGs7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5pbmRleDAgPSBrO1xuXHRcdFx0XHRcdFx0XHRrKys7XG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5yZXZpbmRleCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXggPSBrO1xuXG5cdFx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBsaXN0W2pdLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGRpY3RbJ2xvb3AnXSA9IG9sZDI7XG5cdFx0XHRcdFx0XHRkaWN0WyhzeW0xKV0gPSBvbGQxO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoaXRlbS5ibG9ja3MubGVuZ3RoID4gMSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ID0gaXRlbS5ibG9ja3NbMV0ubGlzdDtcblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gbGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSU5DTFVERSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaW5jbHVkZSc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IG1fMV8gPSBpdGVtLmV4cHJlc3Npb24sIHdpdGhfc3ViZXhwciwgd2l0aF9jb250ZXh0O1xuXG5cdFx0XHRcdC8qKi8gaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrd2l0aFxccysoLispJC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9IG1bMl07XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccytvbmx5JC8pKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtWzFdO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IG1fMV87XG5cdFx0XHRcdFx0d2l0aF9zdWJleHByID0gJ3t9Jztcblx0XHRcdFx0XHR3aXRoX2NvbnRleHQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBmaWxlTmFtZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkgfHwgJyc7XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZpbGVOYW1lKSAhPT0gJ1tvYmplY3QgU3RyaW5nXScpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCBzdHJpbmcgZXhwZWN0ZWQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbCh3aXRoX3N1YmV4cHIsIGl0ZW0ubGluZSwgZGljdCkgfHwge307XG5cblx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhcmlhYmxlcykgIT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgb2JqZWN0IGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmVzdWx0LnB1c2goYW1pVHdpZy5zdGRsaWIuaW5jbHVkZShcblx0XHRcdFx0XHRmaWxlTmFtZSxcblx0XHRcdFx0XHR2YXJpYWJsZXMsXG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0LFxuXHRcdFx0XHRcdGZhbHNlXG5cdFx0XHRcdCkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHJlbmRlcjogZnVuY3Rpb24odG1wbCwgZGljdCA9IHt9LCB0bXBscyA9IHt9KVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHRzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRtcGwpKVxuXHRcdHtcblx0XHRcdGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIG5ldyBhbWlUd2lnLnRtcGwuQ29tcGlsZXIodG1wbCkucm9vdE5vZGUsIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG5cdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIC8qLS0tLS0tLS0tLS0tLS0qL3RtcGwvKi0tLS0tLS0tLS0tLS0tKi8sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLmNhY2hlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLmNhY2hlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGRpY3Q6IHt9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwcmVzc2lvbiwgbGluZSwgXylcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBmO1xuXG5cdFx0aWYoZXhwcmVzc2lvbiBpbiB0aGlzLmRpY3QpXG5cdFx0e1xuXHRcdFx0ZiA9IHRoaXMuZGljdFtleHByZXNzaW9uXTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl0gPSBldmFsKFxuXHRcdFx0XHRhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIuZ2V0SlMoXG5cdFx0XHRcdFx0bmV3IGFtaVR3aWcuZXhwci5Db21waWxlcihleHByZXNzaW9uLCBsaW5lKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdF8gPSBfIHx8IHt9O1xuXG5cdFx0cmV0dXJuIGYuY2FsbChfLCBfKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5zdGRsaWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFZBUklBQkxFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzVW5kZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNEZWZpbmVkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ICE9PSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdWxsJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB4ID09PSBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTm90TnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0VtcHR5JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHggPT09IG51bGxcblx0XHQgICB8fFxuXHRcdCAgIHggPT09IGZhbHNlXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSAoKCcnKSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiAodHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID09PSAwKVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc051bWJlcic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RhdGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0l0ZXJhYmxlJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHR5cGVOYW1lID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpO1xuXG5cdFx0cmV0dXJuIHR5cGVOYW1lID09PSAnW29iamVjdCBTdHJpbmddJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFdmVuJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNPZGQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNOdW1iZXIoeCkgJiYgKHggJiAxKSA9PT0gMTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBJVEVSQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luT2JqZWN0JzogZnVuY3Rpb24oeCwgeSlcblx0e1xuXHRcdGlmKHRoaXMuaXNBcnJheSh5KVxuXHRcdCAgIHx8XG5cdFx0ICAgdGhpcy5pc1N0cmluZyh5KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB5LmluZGV4T2YoeCkgPj0gMDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHkpKVxuXHRcdHtcblx0XHRcdHJldHVybiB4IGluIHk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzSW5SYW5nZSc6IGZ1bmN0aW9uKHgsIHgxLCB4Milcblx0e1xuXHRcdGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdHJldHVybiAoLyotLS0qL3gvKi0tLSovID49IC8qLS0tKi94MS8qLS0tKi8pXG5cdFx0XHQgICAgICAgJiZcblx0XHRcdCAgICAgICAoLyotLS0qL3gvKi0tLSovIDw9IC8qLS0tKi94Mi8qLS0tKi8pXG5cdFx0XHQ7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKHguY2hhckNvZGVBdCgwKSA+PSB4MS5jaGFyQ29kZUF0KDApKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKHguY2hhckNvZGVBdCgwKSA8PSB4Mi5jaGFyQ29kZUF0KDApKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdyYW5nZSc6IGZ1bmN0aW9uKHgxLCB4Miwgc3RlcCA9IDEpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdC8qKi8gaWYodGhpcy5pc051bWJlcih4MSlcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzTnVtYmVyKHgyKVxuXHRcdCApIHtcblx0XHRcdGZvcihsZXQgaSA9IC8qLS0tKi94MS8qLS0tKi87IGkgPD0gLyotLS0qL3gyLyotLS0qLzsgaSArPSBzdGVwKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQucHVzaCgvKi0tLS0tLS0tLS0tLS0tLSovKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBpZih0aGlzLmlzU3RyaW5nKHgxKSAmJiB4MS5sZW5ndGggPT09IDFcblx0XHQgICAgICAgICYmXG5cdFx0ICAgICAgICB0aGlzLmlzU3RyaW5nKHgyKSAmJiB4Mi5sZW5ndGggPT09IDFcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSB4MS5jaGFyQ29kZUF0KDApOyBpIDw9IHgyLmNoYXJDb2RlQXQoMCk7IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfbGVuZ3RoJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNBcnJheSh4KVxuXHRcdCApIHtcblx0XHRcdHJldHVybiB4Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRpZih0aGlzLmlzT2JqZWN0KHgpKVxuXHRcdHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh4KS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2ZpcnN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbMHgwMDAwMDAwMDAwXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9sYXN0JzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpICYmIHgubGVuZ3RoID4gMCA/IHhbeC5sZW5ndGggLSAxXSA6ICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zbGljZSc6IGZ1bmN0aW9uKHgsIGlkeDEsIGlkeDIpXG5cdHtcblx0XHRyZXR1cm4gKHRoaXMuaXNTdHJpbmcoeCkgfHwgdGhpcy5pc0FycmF5KHgpKSA/IHguc2xpY2UoaWR4MSwgaWR4MikgOiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9tZXJnZSc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGlmKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTdHJpbmcoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0TC5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gTC5qb2luKCcnKTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYXJndW1lbnRzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdFx0XHRcdGlmKCF0aGlzLmlzQXJyYXkoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgTC5wdXNoKGl0ZW1bal0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc09iamVjdCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NvbHVtbic6IGZ1bmN0aW9uKHgsIGtleSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4Lm1hcCgodmFsKSA9PiB2YWxba2V5XSkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYmF0Y2gnOiBmdW5jdGlvbih4LCBuLCBtaXNzaW5nID0gJycpXG5cdHtcblx0ICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKG4pXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgbCA9IHgubGVuZ3RoO1xuXG5cdFx0XHRpZihsID4gMClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGxhc3Q7XG5cblx0XHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IG4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gbDsgaSA8IG07IGkgKz0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhc3QucHVzaChtaXNzaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPT0gbilcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuX19sMDpcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb1N0cmluZ1gnOiBbJ1xcXFwnICAsICdcXG4nICwgJ1wiJyAgLCAnXFwnJyAgXSxcblx0J190ZXh0VG9TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInLCAnXFxcXFxcJyddLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J190ZXh0VG9Kc29uU3RyaW5nWCc6IFsnXFxcXCcgICwgJ1xcbicgLCAnXCInICBdLFxuXHQnX3RleHRUb0pzb25TdHJpbmdZJzogWydcXFxcXFxcXCcsICdcXFxcbicsICdcXFxcXCInXSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZXNjYXBlJzogZnVuY3Rpb24ocywgbW9kZSlcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcocykpXG5cdFx0e1xuXHRcdFx0c3dpdGNoKG1vZGUgfHwgJ2h0bWwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0Y2FzZSAnaHRtbF9hdHRyJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9IdG1sWCwgdGhpcy5fdGV4dFRvSHRtbFkpO1xuXG5cdFx0XHRcdGNhc2UgJ2pzJzpcblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9TdHJpbmdYLCB0aGlzLl90ZXh0VG9TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICdqc29uJzpcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fcmVwbGFjZShzLCB0aGlzLl90ZXh0VG9Kc29uU3RyaW5nWCwgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1kpO1xuXG5cdFx0XHRcdGNhc2UgJ3VybCc6XG5cdFx0XHRcdFx0cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzKTtcblxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdXJsX2VuY29kZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IGVuY29kZVVSSUNvbXBvbmVudChzKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX25sMmJyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy5yZXBsYWNlKC9cXG4vZywgJzxici8+Jylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9yYXcnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIGRpY3QpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSAmJiB0aGlzLmlzT2JqZWN0KGRpY3QpID8gdGhpcy5fcmVwbGFjZShzLCBPYmplY3Qua2V5cyhkaWN0KSwgT2JqZWN0LnZhbHVlcyhkaWN0KSlcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NwbGl0JzogZnVuY3Rpb24ocywgc2VwLCBtYXgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMuc3BsaXQoc2VwLCBtYXgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiBbXVxuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBOVU1CRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYWJzJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiBNYXRoLmFicyh4KTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcm91bmQnOiBmdW5jdGlvbih4LCBtb2RlKVxuXHR7XG5cdFx0c3dpdGNoKG1vZGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnY2VpbCc6XG5cdFx0XHRcdHJldHVybiBNYXRoLmNlaWwoeCk7XG5cblx0XHRcdGNhc2UgJ2Zsb29yJzpcblx0XHRcdFx0cmV0dXJuIE1hdGguZmxvb3IoeCk7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKHgpO1xuXHRcdH1cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtaW4nOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0ID4gYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21heCc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgJiYgKHRoaXMuaXNBcnJheShhcmd1bWVudHNbMF0pIHx8IHRoaXMuaXNPYmplY3QoYXJndW1lbnRzWzBdKSkgPyBhcmd1bWVudHNbMF1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXJndW1lbnRzXG5cdFx0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHJlc3VsdCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuXHRcdGZvcihjb25zdCBpIGluIGFyZ3MpXG5cdFx0e1xuXHRcdFx0aWYoIXRoaXMuaXNOdW1iZXIoYXJnc1tpXSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBOdW1iZXIuTmFOO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihyZXN1bHQgPCBhcmdzW2ldKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgPSBhcmdzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogUkFORE9NICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZG9tJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpO1xuXG5cdFx0aWYoeClcblx0XHR7XG5cdFx0XHRpZih0aGlzLmlzQXJyYXkoeClcblx0XHRcdCAgIHx8XG5cdFx0XHQgICB0aGlzLmlzT2JqZWN0KHgpXG5cdFx0XHQgKSB7XG5cdFx0XHQgXHRjb25zdCBYID0gT2JqZWN0LmtleXMoeCk7XG5cblx0XHRcdFx0cmV0dXJuIHhbXG5cdFx0XHRcdFx0WFtNYXRoLmZsb29yKFgubGVuZ3RoICogeSldXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB4W01hdGguZmxvb3IoeC5sZW5ndGggKiB5KV07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuaXNOdW1iZXIoeCkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHggKiB5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR4ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG5cblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogREFURSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RhdGUnOiBmdW5jdGlvbihkYXRlLCBmb3JtYXQsIHRpbWV6b25lKVxuXHR7XG5cdFx0aWYodHlwZW9mIG1vbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgKHRoaXMuaXNEYXRlKGRhdGUpIHx8IHRoaXMuaXNTdHJpbmcoZGF0ZSkpICYmIHRoaXMuaXNTdHJpbmcoZm9ybWF0KSlcblx0XHR7XG5cdFx0XHRpZih0eXBlb2YgbW9tZW50LnR6ICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmlzU3RyaW5nKHRpbWV6b25lKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG1vbWVudChkYXRlKS50eih0aW1lem9uZSkuZm9ybWF0KGZvcm1hdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIEpTT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9qc29uX2VuY29kZSc6IGZ1bmN0aW9uKHgsIGluZGVudClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBudWxsLCB0aGlzLmlzTnVtYmVyKGluZGVudCkgPyBpbmRlbnQgOiAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9qc3BhdGgnOiBmdW5jdGlvbih4LCBwYXRoKVxuXHR7XG5cdFx0cmV0dXJuIHR5cGVvZiBKU1BhdGggIT09ICd1bmRlZmluZWQnID8gSlNQYXRoLmFwcGx5KHBhdGgsIHgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogVEVNUExBVEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaW5jbHVkZSc6IGZ1bmN0aW9uKGZpbGVOYW1lLCB2YXJpYWJsZXMgPSB7fSwgd2l0aENvbnRleHQgPSB0cnVlLCBpZ25vcmVNaXNzaW5nID0gZmFsc2UpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZihmaWxlTmFtZSBpbiBhbWlUd2lnLmVuZ2luZS50bXBscylcblx0XHR7XG5cdFx0XHRjb25zdCB0ZW1wID0ge307XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih3aXRoQ29udGV4dClcblx0XHRcdHtcblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYW1pVHdpZy5lbmdpbmUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXBbaV0gPSBhbWlUd2lnLmVuZ2luZS5kaWN0W2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YXJpYWJsZXMpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIC8qLSovdmFyaWFibGVzLyotKi8pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gLyotKi92YXJpYWJsZXMvKi0qL1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIGFtaVR3aWcuZW5naW5lLnJlbmRlcihhbWlUd2lnLmVuZ2luZS50bXBsc1tmaWxlTmFtZV0sIHRlbXApO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZighaWdub3JlTWlzc2luZylcblx0XHR7XG5cdFx0XHR0aHJvdyAncnVudGltZSBlcnJvciwgY291bGQgbm90IG9wZW4gYCcgKyBmaWxlTmFtZSArICdgJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZSA9IGFtaVR3aWcuc3RkbGliLmZpbHRlcl9lc2NhcGU7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5pbnRlcnByZXRlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5pbnRlcnByZXRlciA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZ2V0SlM6IGZ1bmN0aW9uKG5vZGUpXG5cdHtcblx0XHRsZXQgTDtcblx0XHRsZXQgeDtcblx0XHRsZXQgbGVmdDtcblx0XHRsZXQgcmlnaHQ7XG5cdFx0bGV0IG9wZXJhdG9yO1xuXG5cdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBMU1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTFNUOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goLyotLS0tLSovIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gJ1snICsgTC5qb2luKCcsJykgKyAnXSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRElDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRJQzpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5kaWN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKGkgKyAnOicgKyB0aGlzLl9nZXRKUyhub2RlLmRpY3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICd7JyArIEwuam9pbignLCcpICsgJ30nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZVTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GVU46XG5cdFx0IFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2godGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0IFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gbm9kZS5ub2RlVmFsdWUgKyAnKCcgKyBMLmpvaW4oJywnKSArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBWQVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVkFSOlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBub2RlLmxpc3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRMLnB1c2goJ1snICsgdGhpcy5fZ2V0SlMobm9kZS5saXN0W2ldKSArICddJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiBMLmxlbmd0aCA+IDAgPyBub2RlLm5vZGVWYWx1ZSArIEwuam9pbignJykgOiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBURVJNSU5BTCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUw6XG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVJpZ2h0Lm5vZGVUeXBlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRFRklORUQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRGVmaW5lZCgnICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5OVUxMOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc051bGwoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU1QVFk6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRW1wdHkoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEU6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSXRlcmFibGUoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRVZFTjpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNFdmVuKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLk9ERDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNPZGQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludGVybmFsIGVycm9yJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5JTjpcblxuXHRcdFx0XHRpZihub2RlLm5vZGVSaWdodC5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJbk9iamVjdCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHggPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblxuXHRcdFx0XHRcdGxlZnQgPSBub2RlLm5vZGVSaWdodC5ub2RlTGVmdC5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0cmlnaHQgPSBub2RlLm5vZGVSaWdodC5ub2RlUmlnaHQubm9kZVZhbHVlO1xuXG5cdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0luUmFuZ2UoJyArIHggKyAnLCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBTVEFSVFNfV0lUSCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEg6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnN0YXJ0c1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFTkRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRU5EU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5lbmRzV2l0aCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIE1BVENIRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5tYXRjaCgnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFJBTkdFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5SQU5HRTpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIucmFuZ2UoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlVmFsdWVbMF0gPT09ICcuJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJy4nICsgcmlnaHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIGxlZnQgKyAnWycgKyByaWdodCArICddJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEZMRElWICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5GTERJVjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5mbG9vcignICsgbGVmdCArICcvJyArIHJpZ2h0ICsgJyknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFBPV0VSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5QT1dFUjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnTWF0aC5wb3coJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBET1VCTEVfUVVFU1RJT04gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICcoKCcgKyBsZWZ0ICsgJykgfHwgKCcgKyByaWdodCArICcpKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBVTkFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgPT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yICsgJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCA9PT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0b3BlcmF0b3IgPSAobm9kZS5ub2RlVHlwZSAhPT0gYW1pVHdpZy5leHByLnRva2Vucy5OT1QpID8gbm9kZS5ub2RlVmFsdWUgOiAnISc7XG5cblx0XHRcdFx0XHRyZXR1cm4gJygnICsgdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCkgKyAnKScgKyBvcGVyYXRvcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdC8qIEJJTkFSWSBPUEVSQVRPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0aWYobm9kZS5ub2RlTGVmdCAhPT0gbnVsbFxuXHRcdFx0XHQgICAmJlxuXHRcdFx0XHQgICBub2RlLm5vZGVSaWdodCAhPT0gbnVsbFxuXHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubm9kZVR5cGUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8fCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ3wnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnXic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcmJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQ09OQ0FUOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICcrJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIGxlZnQgKyBvcGVyYXRvciArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGdldEpTOiBmdW5jdGlvbihleHByKVxuXHR7XG5cdFx0cmV0dXJuICcoZnVuY3Rpb24oXykgeyByZXR1cm4gJyArIHRoaXMuX2dldEpTKGV4cHIucm9vdE5vZGUpICsgJzsgfSknO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZXZhbDogZnVuY3Rpb24oZXhwciwgXylcblx0e1xuXHRcdF8gPSBfIHx8IHt9O1xuXG5cdFx0cmV0dXJuIGV2YWwodGhpcy5nZXRKUyhleHByKSkuY2FsbChfLCBfKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59KSgpOyJdfQ==
