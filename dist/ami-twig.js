/*!
 * AMI Twig Engine 1.2.0
 *
 * Copyright © 2014-2023 CNRS/LPSC
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
        return m !== null && this._checkNextChar(s, /*-*/m[0] /*-*/) ? /*-*/m[0] /*-*/ : null;
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
      /*------------------------------------------------------------------------------------------------------------*/else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      /*------------------------------------------------------------------------------------------------------------*/
      /*      | AddSub ('starts' | 'ends') `with` AddSub                                                            */
      /*------------------------------------------------------------------------------------------------------------*/else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      /*------------------------------------------------------------------------------------------------------------*/
      /*      | AddSub 'matches' AddSub                                                                             */
      /*------------------------------------------------------------------------------------------------------------*/else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
        node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
        this.tokenizer.next();
        right = this.parseAddSub();
        node.nodeLeft = left;
        node.nodeRight = right;
        left = node;
      }

      /*------------------------------------------------------------------------------------------------------------*/
      /*      | AddSub 'in' AddSub                                                                                  */
      /*------------------------------------------------------------------------------------------------------------*/else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
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
          /**/if (temp.nodeType === amiTwig.expr.tokens.FUN) {
            if (temp.nodeValue in amiTwig.stdlib) {
              temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
            } else {
              temp.nodeValue = /*---*/'_.' /*---*/ + temp.nodeValue;
            }
          } else if (temp.nodeType === amiTwig.expr.tokens.VAR) {
            temp.nodeValue = /*---*/'_.' /*---*/ + temp.nodeValue;
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
        /*--------------------------------------------------------------------------------------------------------*/else {
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
            /**/if (stack1[i].keyword === 'if') {
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
              /**/if (typeof window !== 'undefined') {
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
          this._render(result, /*--------------*/tmpl /*--------------*/, dict, tmpls);
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
        return (/*---*/x /*---*/ >= /*---*/x1 /*---*/ && /*---*/x /*---*/ <= /*---*/x2 /*---*/
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
        for (var i = /*---*/x1 /*---*/; i <= /*---*/x2 /*---*/; i += step) {
          result.push( /*---------------*/i);
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
            _item.forEach(function (x) {
              return _L.push(x);
            });
          }
          return _L;
        }

        /*--------------------------------------------------------------------------------------------------------*/

        if (this.isSet(arguments[0])) {
          var _L2 = [];
          for (var _i7 in arguments) {
            var _item2 = arguments[_i7];
            if (!this.isSet(_item2)) {
              return null;
            }
            _item2.forEach(function (x) {
              return _L2.add(x);
            });
          }
          return _L2;
        }

        /*--------------------------------------------------------------------------------------------------------*/

        if (this.isObject(arguments[0])) {
          var D = {};
          for (var _i8 in arguments) {
            var _item3 = arguments[_i8];
            if (!this.isObject(_item3)) {
              return null;
            }
            for (var j in _item3) D[j] = _item3[j];
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

    '_textToStringX': ['\\', '\r', '\n', '"', '\''],
    '_textToStringY': ['\\\\', '\\r', '\\n', '\\"', '\\\''],
    /*----------------------------------------------------------------------------------------------------------------*/

    '_textToJsonStringX': ['\\', '\r', '\n', '"'],
    '_textToJsonStringY': ['\\\\', '\\r', '\\n', '\\"'],
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

    'filter_format_number': function filter_format_number(x) {
      return parseFloat(x);
    },
    /*----------------------------------------------------------------------------------------------------------------*/

    'filter_format_decimal_number': function filter_format_decimal_number(x) {
      return parseInt(x);
    },
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
          for (var _i10 in /*-*/variables /*-*/) {
            temp[_i10] = /*-*/variables /*-*/[_i10];
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
            L.push( /*-----*/this._getJS(node.list[i]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhbWlUd2lnIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJ3aW5kb3ciLCJnbG9iYWwiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImNvZGUiLCJsaW5lIiwic3BhY2VzIiwidG9rZW5EZWZzIiwidG9rZW5UeXBlcyIsImVycm9yIiwibGVuZ3RoIiwicmVzdWx0X3Rva2VucyIsInJlc3VsdF90eXBlcyIsInJlc3VsdF9saW5lcyIsImkiLCJsIiwid29yZCIsInRva2VuIiwiYyIsIl9fbDAiLCJjaGFyQXQiLCJpbmRleE9mIiwicHVzaCIsInN1YnN0cmluZyIsImoiLCJfbWF0Y2giLCJ0b2tlbnMiLCJ0eXBlcyIsImxpbmVzIiwicyIsInN0cmluZ09yUmVnRXhwIiwibSIsIlJlZ0V4cCIsIm1hdGNoIiwiX2NoZWNrTmV4dENoYXIiLCJfYWxwaGFudW0iLCJjaGFyQ29kZTIiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGUxIiwiaXNOYU4iLCJleHByIiwiJGluaXQiLCJJU19YWFgiLCJERUZJTkVEIiwiTlVMTCIsIkVNUFRZIiwiSVRFUkFCTEUiLCJFVkVOIiwiT0REIiwiWFhYX1dJVEgiLCJTVEFSVFNfV0lUSCIsIkVORFNfV0lUSCIsIlBMVVNfTUlOVVMiLCJDT05DQVQiLCJQTFVTIiwiTUlOVVMiLCJNVUxfRkxESVZfRElWX01PRCIsIk1VTCIsIkZMRElWIiwiRElWIiwiTU9EIiwiUlgiLCJSUCIsIlJCMSIsIkxPR0lDQUxfT1IiLCJMT0dJQ0FMX0FORCIsIkJJVFdJU0VfT1IiLCJCSVRXSVNFX1hPUiIsIkJJVFdJU0VfQU5EIiwiTk9UIiwiSVMiLCJDTVBfT1AiLCJNQVRDSEVTIiwiSU4iLCJSQU5HRSIsIlBPV0VSIiwiRE9VQkxFX1FVRVNUSU9OIiwiUVVFU1RJT04iLCJDT0xPTiIsIkRPVCIsIkNPTU1BIiwiUElQRSIsIkxQIiwiTEIxIiwiTEIyIiwiUkIyIiwiU0lEIiwiVEVSTUlOQUwiLCJMU1QiLCJESUMiLCJGVU4iLCJWQVIiLCJUb2tlbml6ZXIiLCJfc3BhY2VzIiwiX3Rva2VuRGVmcyIsIl90b2tlblR5cGVzIiwicmVzdWx0IiwibmV4dCIsIm4iLCJpc0VtcHR5IiwicGVla1Rva2VuIiwicGVla1R5cGUiLCJjaGVja1R5cGUiLCJ0eXBlIiwiVFlQRSIsIkFycmF5IiwiQ29tcGlsZXIiLCJwcm90b3R5cGUiLCJyb290Tm9kZSIsInBhcnNlTnVsbENvYWxlc2NpbmciLCJkdW1wIiwibGVmdCIsInBhcnNlTG9naWNhbE9yIiwicmlnaHQiLCJub2RlIiwiTm9kZSIsIm5vZGVMZWZ0Iiwibm9kZVJpZ2h0IiwicGFyc2VMb2dpY2FsQW5kIiwicGFyc2VCaXR3aXNlT3IiLCJwYXJzZUJpdHdpc2VYb3IiLCJwYXJzZUJpdHdpc2VBbmQiLCJwYXJzZU5vdCIsInBhcnNlQ29tcCIsInBhcnNlQWRkU3ViIiwic3dhcCIsInBhcnNlTXVsRGl2IiwicGFyc2VQbHVzTWludXMiLCJwYXJzZVBvd2VyIiwicGFyc2VGaWx0ZXIiLCJwYXJzZURvdDEiLCJ0ZW1wIiwibm9kZVR5cGUiLCJsaXN0IiwidW5zaGlmdCIsImlzRmlsdGVyIiwicGFyc2VEb3QyIiwicSIsIm5vZGVWYWx1ZSIsInN0ZGxpYiIsInBhcnNlRG90MyIsInBhcnNlWCIsInBhcnNlR3JvdXAiLCJwYXJzZUFycmF5IiwicGFyc2VPYmplY3QiLCJwYXJzZUZ1blZhciIsInBhcnNlVGVybWluYWwiLCJfcGFyc2VTaW5nbGV0cyIsImRpY3QiLCJfcGFyc2VEb3VibGV0cyIsIl9wYXJzZVNpbmdsZXQiLCJfcGFyc2VEb3VibGV0Iiwia2V5IiwiX2R1bXAiLCJub2RlcyIsImVkZ2VzIiwicENudCIsIkNOVCIsImNudCIsInJlcGxhY2UiLCJqb2luIiwidG1wbCIsIlNUQVRFTUVOVF9SRSIsIkNPTU1FTlRfUkUiLCJfY291bnQiLCJjb2x1bW4iLCJDT0xVTU4iLCJrZXl3b3JkIiwiZXhwcmVzc2lvbiIsImJsb2NrcyIsInZhbHVlIiwic3RhY2sxIiwic3RhY2syIiwiaXRlbSIsInN1YnN0ciIsImN1cnIiLCJpbmR4IiwiZXJyb3JzIiwiaW5kZXgiLCJWQUxVRSIsInBvcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmdpbmUiLCJWQVJJQUJMRV9SRSIsIl9yZW5kZXIiLCJ0bXBscyIsIl90aGlzIiwiY2FjaGUiLCJldmFsIiwicGFydHMiLCJzcGxpdCIsInBhcmVudCIsInVuZGVmaW5lZCIsImV2ZXJ5IiwiYmxvY2siLCJzeW0xIiwic3ltMiIsIm9yaWdWYWx1ZSIsInR5cGVOYW1lIiwiT2JqZWN0IiwidG9TdHJpbmciLCJjYWxsIiwiaXRlclZhbHVlIiwiZW50cmllcyIsImtleXMiLCJrIiwib2xkMSIsIm9sZDIiLCJvbGQzIiwibG9vcCIsImZpcnN0IiwibGFzdCIsInJldmluZGV4MCIsImluZGV4MCIsInJldmluZGV4IiwibV8xXyIsIndpdGhfc3ViZXhwciIsIndpdGhfY29udGV4dCIsImZpbGVOYW1lIiwidmFyaWFibGVzIiwiaW5jbHVkZSIsInJlbmRlciIsIl9ldmFsIiwiXyIsImYiLCJpbnRlcnByZXRlciIsImdldEpTIiwiaXNVbmRlZmluZWQiLCJ4IiwiaXNEZWZpbmVkIiwiaXNOdWxsIiwiaXNOb3ROdWxsIiwic2l6ZSIsImlzTnVtYmVyIiwiaXNTdHJpbmciLCJpc0RhdGUiLCJpc0FycmF5IiwiaXNPYmplY3QiLCJpc1NldCIsImlzTWFwIiwiaXNJdGVyYWJsZSIsImlzRXZlbiIsImlzT2RkIiwiaXNJbk9iamVjdCIsInkiLCJoYXMiLCJoYXNPd25Qcm9wZXJ0eSIsImlzSW5SYW5nZSIsIngxIiwieDIiLCJyYW5nZSIsInN0ZXAiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJmaWx0ZXJfbGVuZ3RoIiwiZmlsdGVyX2ZpcnN0IiwiZmlsdGVyX2xhc3QiLCJmaWx0ZXJfc2xpY2UiLCJpZHgxIiwiaWR4MiIsInNsaWNlIiwiZmlsdGVyX21lcmdlIiwiYXJndW1lbnRzIiwiTCIsImZvckVhY2giLCJhZGQiLCJEIiwiZmlsdGVyX3NvcnQiLCJzb3J0IiwiZmlsdGVyX3JldmVyc2UiLCJyZXZlcnNlIiwiZmlsdGVyX2pvaW4iLCJzZXAiLCJmaWx0ZXJfa2V5cyIsImZpbHRlcl9jb2x1bW4iLCJtYXAiLCJ2YWwiLCJmaWx0ZXJfYmF0Y2giLCJtaXNzaW5nIiwiTWF0aCIsImNlaWwiLCJzdGFydHNXaXRoIiwiczEiLCJzMiIsImJhc2UiLCJlbmRzV2l0aCIsInJlZ2V4IiwibGFzdEluZGV4T2YiLCJ0ZXN0IiwiZXJyIiwiZmlsdGVyX2RlZmF1bHQiLCJmaWx0ZXJfbG93ZXIiLCJ0b0xvd2VyQ2FzZSIsImZpbHRlcl91cHBlciIsInRvVXBwZXJDYXNlIiwiZmlsdGVyX2NhcGl0YWxpemUiLCJ0cmltIiwiZmlsdGVyX3RpdGxlIiwiZmlsdGVyX3RyaW0iLCJfcmVwbGFjZSIsIm9sZFN0cnMiLCJuZXdTdHJzIiwicCIsImZpbHRlcl9lc2NhcGUiLCJtb2RlIiwiX3RleHRUb0h0bWxYIiwiX3RleHRUb0h0bWxZIiwiX3RleHRUb1N0cmluZ1giLCJfdGV4dFRvU3RyaW5nWSIsIl90ZXh0VG9Kc29uU3RyaW5nWCIsIl90ZXh0VG9Kc29uU3RyaW5nWSIsImVuY29kZVVSSUNvbXBvbmVudCIsImZpbHRlcl91cmxfZW5jb2RlIiwiZmlsdGVyX25sMmJyIiwiZmlsdGVyX3JhdyIsImZpbHRlcl9yZXBsYWNlIiwidmFsdWVzIiwiZmlsdGVyX3NwbGl0IiwibWF4IiwiZmlsdGVyX2Zvcm1hdF9udW1iZXIiLCJwYXJzZUZsb2F0IiwiZmlsdGVyX2Zvcm1hdF9kZWNpbWFsX251bWJlciIsInBhcnNlSW50IiwiZmlsdGVyX2FicyIsImFicyIsImZpbHRlcl9yb3VuZCIsImZsb29yIiwicm91bmQiLCJtaW4iLCJhcmdzIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJOYU4iLCJORUdBVElWRV9JTkZJTklUWSIsInJhbmRvbSIsIlgiLCJNQVhfU0FGRV9JTlRFR0VSIiwiZmlsdGVyX2RhdGUiLCJkYXRlIiwiZm9ybWF0IiwidGltZXpvbmUiLCJtb21lbnQiLCJ0eiIsImZpbHRlcl9qc29uX2VuY29kZSIsImluZGVudCIsImZpbHRlcl9qc29uX2pzcGF0aCIsInBhdGgiLCJKU1BhdGgiLCJhcHBseSIsIndpdGhDb250ZXh0IiwiaWdub3JlTWlzc2luZyIsImZpbHRlcl9lIiwiX2dldEpTIiwib3BlcmF0b3IiXSwic291cmNlcyI6WyJhbWktdHdpZy5lczYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBBTUkgVHdpZyBFbmdpbmUgMS4yLjBcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC0yMDIzIENOUlMvTFBTQ1xuICpcbiAqIEF1dGhvcjogSsOpcsO0bWUgT0RJRVIgKGplcm9tZS5vZGllckBscHNjLmluMnAzLmZyKVxuICpcbiAqIFJlcG9zaXRvcmllczogaHR0cHM6Ly9naXRsYWIuaW4ycDMuZnIvYW1pLXRlYW0vQU1JVHdpZ0pTL1xuICogICAgICAgICAgICAgICBodHRwczovL3d3dy5naXRodWIuY29tL2FtaS10ZWFtL0FNSVR3aWdKUy9cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGEgY29tcHV0ZXIgcHJvZ3JhbSB3aG9zZSBwdXJwb3NlIGlzIHRvIHByb3ZpZGUgYVxuICogSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2Vuc2lvTGFicydzIFRXSUcgdGVtcGxhdGUgZW5naW5lLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgZ292ZXJuZWQgYnkgdGhlIENlQ0lMTC1DIGxpY2Vuc2UgdW5kZXIgRnJlbmNoIGxhdyBhbmRcbiAqIGFiaWRpbmcgYnkgdGhlIHJ1bGVzIG9mIGRpc3RyaWJ1dGlvbiBvZiBmcmVlIHNvZnR3YXJlLiBZb3UgY2FuIHVzZSxcbiAqIG1vZGlmeSBhbmQvb3IgcmVkaXN0cmlidXRlIHRoZSBzb2Z0d2FyZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIENlQ0lMTC1DXG4gKiBsaWNlbnNlIGFzIGNpcmN1bGF0ZWQgYnkgQ0VBLCBDTlJTIGFuZCBJTlJJQSBhdCB0aGUgZm9sbG93aW5nIFVSTFxuICogXCJodHRwOi8vd3d3LmNlY2lsbC5pbmZvXCIuXG4gKlxuICogVGhlIGZhY3QgdGhhdCB5b3UgYXJlIHByZXNlbnRseSByZWFkaW5nIHRoaXMgbWVhbnMgdGhhdCB5b3UgaGF2ZSBoYWRcbiAqIGtub3dsZWRnZSBvZiB0aGUgQ2VDSUxMLUMgbGljZW5zZSBhbmQgdGhhdCB5b3UgYWNjZXB0IGl0cyB0ZXJtcy5cbiAqXG4gKi9cbihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBhbWlUd2lnID0ge1xuXHR2ZXJzaW9uOiAnMS4yLjAnXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqLyBpZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKVxue1xuXHRtb2R1bGUuZXhwb3J0cy5hbWlUd2lnID0gYW1pVHdpZztcbn1cbmVsc2UgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdHdpbmRvdy5hbWlUd2lnID0gYW1pVHdpZztcbn1cbmVsc2UgaWYodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpXG57XG5cdGdsb2JhbC5hbWlUd2lnID0gYW1pVHdpZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8vZXhwb3J0IGRlZmF1bHQgYW1pVHdpZztcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy50b2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy50b2tlbml6ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dG9rZW5pemU6IGZ1bmN0aW9uKGNvZGUsIGxpbmUsIHNwYWNlcywgdG9rZW5EZWZzLCB0b2tlblR5cGVzLCBlcnJvcilcblx0e1xuXHRcdGlmKHRva2VuRGVmcy5sZW5ndGggIT09IHRva2VuVHlwZXMubGVuZ3RoKVxuXHRcdHtcblx0XHRcdHRocm93ICdgdG9rZW5EZWZzLmxlbmd0aCAhPSB0b2tlblR5cGVzLmxlbmd0aGAnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdF90b2tlbnMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfdHlwZXMgPSBbXTtcblx0XHRjb25zdCByZXN1bHRfbGluZXMgPSBbXTtcblxuXHRcdGxldCBpID0gMHgwMDAwMDAwMDA7XG5cdFx0Y29uc3QgbCA9IGNvZGUubGVuZ3RoO1xuXG5cdFx0bGV0IHdvcmQgPSAnJywgdG9rZW4sIGM7XG5cbl9fbDA6XHR3aGlsZShpIDwgbClcblx0XHR7XG5cdFx0XHRjID0gY29kZS5jaGFyQXQoMCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQ09VTlQgTElORVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYoYyA9PT0gJ1xcbicpXG5cdFx0XHR7XG5cdFx0XHRcdGxpbmUrKztcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgU1BBQ0VTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihzcGFjZXMuaW5kZXhPZihjKSA+PSAwKVxuXHRcdFx0e1xuXHRcdFx0XHRpZih3b3JkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ2ludmFsaWQgdG9rZW4gYCcgKyB3b3JkICsgJ2AnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3VsdF90b2tlbnMucHVzaCh3b3JkKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCgtMSk7XG5cdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0d29yZCA9ICcnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0XHRpICs9IDE7XG5cblx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBFQVQgUkVHRVhFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IoY29uc3QgaiBpbiB0b2tlbkRlZnMpXG5cdFx0XHR7XG5cdFx0XHRcdHRva2VuID0gdGhpcy5fbWF0Y2goY29kZSwgdG9rZW5EZWZzW2pdKTtcblxuXHRcdFx0XHRpZih0b2tlbilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKHdvcmQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0XHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG5cdFx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHRva2VuKTtcblx0XHRcdFx0XHRyZXN1bHRfdHlwZXMucHVzaCh0b2tlblR5cGVzW2pdKTtcblx0XHRcdFx0XHRyZXN1bHRfbGluZXMucHVzaChsaW5lKTtcblxuXHRcdFx0XHRcdGNvZGUgPSBjb2RlLnN1YnN0cmluZyh0b2tlbi5sZW5ndGgpO1xuXHRcdFx0XHRcdGkgKz0gdG9rZW4ubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y29udGludWUgX19sMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIEVBVCBSRU1BSU5JTkcgQ0hBUkFDVEVSRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHdvcmQgKz0gYztcblxuXHRcdFx0Y29kZSA9IGNvZGUuc3Vic3RyaW5nKDEpO1xuXHRcdFx0aSArPSAxO1xuXG4vKlx0XHRcdGNvbnRpbnVlIF9fbDA7XG4gKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdGlmKHdvcmQpXG5cdFx0e1xuXHRcdFx0aWYoZXJyb3IpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdpbnZhbGlkIHRva2VuIGAnICsgd29yZCArICdgJztcblx0XHRcdH1cblxuXHRcdFx0cmVzdWx0X3Rva2Vucy5wdXNoKHdvcmQpO1xuXHRcdFx0cmVzdWx0X3R5cGVzLnB1c2goLTEpO1xuXHRcdFx0cmVzdWx0X2xpbmVzLnB1c2gobGluZSk7XG4vKlx0XHRcdHdvcmQgPSAnJztcbiAqL1x0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9rZW5zOiByZXN1bHRfdG9rZW5zLFxuXHRcdFx0dHlwZXM6IHJlc3VsdF90eXBlcyxcblx0XHRcdGxpbmVzOiByZXN1bHRfbGluZXMsXG5cdFx0fTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9tYXRjaDogZnVuY3Rpb24ocywgc3RyaW5nT3JSZWdFeHApXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGlmKHN0cmluZ09yUmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwKVxuXHRcdHtcblx0XHRcdG0gPSBzLm1hdGNoKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gIT09IG51bGwgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCAvKi0qL21bMF0vKi0qLykgPyAvKi0qL21bMF0vKi0qLyA6IG51bGw7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRtID0gcy5pbmRleE9mKHN0cmluZ09yUmVnRXhwKTtcblxuXHRcdFx0cmV0dXJuIG0gPT09IDB4MDAgJiYgdGhpcy5fY2hlY2tOZXh0Q2hhcihzLCBzdHJpbmdPclJlZ0V4cCkgPyBzdHJpbmdPclJlZ0V4cCA6IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2FscGhhbnVtOiBbXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxuXHRcdDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDAsIDEsXG5cdFx0MCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSxcblx0XHQxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XHQwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLFxuXHRcdDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsXG5cdFx0MCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCxcblx0XSxcblxuXHRfY2hlY2tOZXh0Q2hhcjogZnVuY3Rpb24ocywgdG9rZW4pXG5cdHtcblx0XHRjb25zdCBsZW5ndGggPSB0b2tlbi5sZW5ndGg7XG5cblx0XHRjb25zdCBjaGFyQ29kZTIgPSBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMCk7XG5cdFx0Y29uc3QgY2hhckNvZGUxID0gcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDEpO1xuXG5cdFx0cmV0dXJuIGlzTmFOKGNoYXJDb2RlMilcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdGhpcy5fYWxwaGFudW1bY2hhckNvZGUyXSA9PT0gMFxuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0aGlzLl9hbHBoYW51bVtjaGFyQ29kZTFdID09PSAwXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIgPSB7fTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIudG9rZW5zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIudG9rZW5zID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQ09NUE9TSVRFIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMuSVNfWFhYID0gW1xuXHRcdFx0dGhpcy5ERUZJTkVELFxuXHRcdFx0dGhpcy5OVUxMLFxuXHRcdFx0dGhpcy5FTVBUWSxcblx0XHRcdHRoaXMuSVRFUkFCTEUsXG5cdFx0XHR0aGlzLkVWRU4sXG5cdFx0XHR0aGlzLk9ERCxcblx0XHRdO1xuXG5cdFx0dGhpcy5YWFhfV0lUSCA9IFtcblx0XHRcdHRoaXMuU1RBUlRTX1dJVEgsXG5cdFx0XHR0aGlzLkVORFNfV0lUSCxcblx0XHRdO1xuXG5cdFx0dGhpcy5QTFVTX01JTlVTID0gW1xuXHRcdFx0dGhpcy5DT05DQVQsXG5cdFx0XHR0aGlzLlBMVVMsXG5cdFx0XHR0aGlzLk1JTlVTLFxuXHRcdF07XG5cblx0XHR0aGlzLk1VTF9GTERJVl9ESVZfTU9EID0gW1xuXHRcdFx0dGhpcy5NVUwsXG5cdFx0XHR0aGlzLkZMRElWLFxuXHRcdFx0dGhpcy5ESVYsXG5cdFx0XHR0aGlzLk1PRCxcblx0XHRdO1xuXG5cdFx0dGhpcy5SWCA9IFtcblx0XHRcdHRoaXMuUlAsXG5cdFx0XHR0aGlzLlJCMSxcblx0XHRdO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJFQUwgVE9LRU5TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0TE9HSUNBTF9PUjogMTAwLFxuXHRMT0dJQ0FMX0FORDogMTAxLFxuXHRCSVRXSVNFX09SOiAxMDIsXG5cdEJJVFdJU0VfWE9SOiAxMDMsXG5cdEJJVFdJU0VfQU5EOiAxMDQsXG5cdE5PVDogMTA1LFxuXHRJUzogMTA2LFxuXHRERUZJTkVEOiAxMDcsXG5cdE5VTEw6IDEwOCxcblx0RU1QVFk6IDEwOSxcblx0SVRFUkFCTEU6IDExMCxcblx0RVZFTjogMTExLFxuXHRPREQ6IDExMixcblx0Q01QX09QOiAxMTMsXG5cdFNUQVJUU19XSVRIOiAxMTQsXG5cdEVORFNfV0lUSDogMTE1LFxuXHRNQVRDSEVTOiAxMTYsXG5cdElOOiAxMTcsXG5cdFJBTkdFOiAxMTgsXG5cdENPTkNBVDogMTE5LFxuXHRQTFVTOiAxMjAsXG5cdE1JTlVTOiAxMjEsXG5cdFBPV0VSOiAxMjIsXG5cdE1VTDogMTIzLFxuXHRGTERJVjogMTI0LFxuXHRESVY6IDEyNSxcblx0TU9EOiAxMjYsXG4gXHRET1VCTEVfUVVFU1RJT046IDEyNyxcbiBcdFFVRVNUSU9OOiAxMjgsXG5cdENPTE9OOiAxMjksXG5cdERPVDogMTMwLFxuXHRDT01NQTogMTMxLFxuXHRQSVBFOiAxMzIsXG5cdExQOiAxMzMsXG5cdFJQOiAxMzQsXG5cdExCMTogMTM1LFxuXHRSQjE6IDEzNixcblx0TEIyOiAxMzcsXG5cdFJCMjogMTM4LFxuXHRTSUQ6IDEzOSxcblx0VEVSTUlOQUw6IDE0MCxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWSVJUVUFMIFRPS0VOUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdExTVDogMjAwLFxuXHRESUM6IDIwMSxcblx0RlVOOiAyMDIsXG5cdFZBUjogMjAzLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLnRva2Vucy4kaW5pdCgpO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ub2tlbml6ZXIgPSBmdW5jdGlvbihjb2RlLCBsaW5lKSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fc3BhY2VzID0gWycgJywgJ1xcdCcsICdcXG4nLCAnXFxyJ107XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLl90b2tlbkRlZnMgPSBbXG5cdFx0J29yJyxcblx0XHQnYW5kJyxcblx0XHQnYi1vcicsXG5cdFx0J2IteG9yJyxcblx0XHQnYi1hbmQnLFxuXHRcdCdub3QnLFxuXHRcdCdpcycsXG5cdFx0J2RlZmluZWQnLFxuXHRcdCdudWxsJyxcblx0XHQnZW1wdHknLFxuXHRcdCdpdGVyYWJsZScsXG5cdFx0J2V2ZW4nLFxuXHRcdCdvZGQnLFxuXHRcdCc9PT0nLFxuXHRcdCc9PScsXG5cdFx0JyE9PScsXG5cdFx0JyE9Jyxcblx0XHQnPD0nLFxuXHRcdCc+PScsXG5cdFx0JzwnLFxuXHRcdCc+Jyxcblx0XHQvXnN0YXJ0c1xccyt3aXRoLyxcblx0XHQvXmVuZHNcXHMrd2l0aC8sXG5cdFx0J21hdGNoZXMnLFxuXHRcdCdpbicsXG5cdFx0Jy4uJyxcblx0XHQnficsXG5cdFx0JysnLFxuXHRcdCctJyxcblx0XHQnKionLFxuXHRcdCcqJyxcblx0XHQnLy8nLFxuXHRcdCcvJyxcblx0XHQnJScsXG5cdFx0Jz8/Jyxcblx0XHQnPycsXG5cdFx0JzonLFxuXHRcdCcuJyxcblx0XHQnLCcsXG5cdFx0J3wnLFxuXHRcdCcoJyxcblx0XHQnKScsXG5cdFx0J1snLFxuXHRcdCddJyxcblx0XHQneycsXG5cdFx0J30nLFxuXHRcdCd0cnVlJyxcblx0XHQnZmFsc2UnLFxuXHRcdC9eWzAtOV0rXFwuWzAtOV0rLyxcblx0XHQvXlswLTldKy8sXG5cdFx0L14nKFxcXFwnfFteJ10pKicvLFxuXHRcdC9eXCIoXFxcXFwifFteXCJdKSpcIi8sXG5cdFx0L15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSovLFxuXHRdO1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dGhpcy5fdG9rZW5UeXBlcyA9IFtcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxPR0lDQUxfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX1hPUixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5ELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTk9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSVRFUkFCTEUsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FVkVOLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuT0RELFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ01QX09QLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuU1RBUlRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5FTkRTX1dJVEgsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuSU4sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SQU5HRSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVMsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NSU5VUyxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlBPV0VSLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTVVMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ESVYsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5NT0QsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5ET1VCTEVfUVVFU1RJT04sXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5RVUVTVElPTixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkNPTE9OLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuRE9ULFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuQ09NTUEsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5QSVBFLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuTFAsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5SUCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMSxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLkxCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlJCMixcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMLFxuXHRcdGFtaVR3aWcuZXhwci50b2tlbnMuVEVSTUlOQUwsXG5cdFx0YW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCxcblx0XHRhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCxcblx0XTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQgPSBmdW5jdGlvbihjb2RlLCBsaW5lKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgcmVzdWx0ID0gYW1pVHdpZy50b2tlbml6ZXIudG9rZW5pemUoXG5cdFx0XHRjb2RlLFxuXHRcdFx0bGluZSxcblx0XHRcdHRoaXMuX3NwYWNlcyxcblx0XHRcdHRoaXMuX3Rva2VuRGVmcyxcblx0XHRcdHRoaXMuX3Rva2VuVHlwZXMsXG5cdFx0XHR0cnVlXG5cdFx0KTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5zID0gcmVzdWx0LnRva2Vucztcblx0XHR0aGlzLnR5cGVzID0gcmVzdWx0LnR5cGVzO1xuXG5cdFx0dGhpcy5pID0gMDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMubmV4dCA9IGZ1bmN0aW9uKG4gPSAxKVxuXHR7XG5cdFx0dGhpcy5pICs9IG47XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pID49IHRoaXMudG9rZW5zLmxlbmd0aDtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMucGVla1Rva2VuID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaV07XG5cdH07XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR0aGlzLnBlZWtUeXBlID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMudHlwZXNbdGhpcy5pXTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSlcblx0e1xuXHRcdGlmKHRoaXMuaSA8IHRoaXMudG9rZW5zLmxlbmd0aClcblx0XHR7XG5cdFx0XHRjb25zdCBUWVBFID0gdGhpcy50eXBlc1t0aGlzLmldO1xuXG5cdFx0XHRyZXR1cm4gKHR5cGUgaW5zdGFuY2VvZiBBcnJheSkgPyAodHlwZS5pbmRleE9mKFRZUEUpID49IDApIDogKHR5cGUgPT09IFRZUEUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5leHByLkNvbXBpbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyID0gZnVuY3Rpb24oY29kZSwgbGluZSkge1xuXG5cdHRoaXMuJGluaXQoY29kZSwgbGluZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQkaW5pdDogZnVuY3Rpb24oY29kZSwgbGluZSlcblx0e1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMudG9rZW5pemVyID0gbmV3IGFtaVR3aWcuZXhwci5Ub2tlbml6ZXIoXG5cdFx0XHR0aGlzLmNvZGUgPSBjb2RlLFxuXHRcdFx0dGhpcy5saW5lID0gbGluZVxuXHRcdCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnJvb3ROb2RlID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5pc0VtcHR5KCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgdW5leHBlY3RlZCB0b2tlbiBgJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpICsgJ2AnO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnJvb3ROb2RlLmR1bXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTnVsbENvYWxlc2Npbmc6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUxvZ2ljYWxPcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBOdWxsQ29hbGVzY2luZyA6IExvZ2ljYWxPciAoJz8/JyBMb2dpY2FsT3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuRE9VQkxFX1FVRVNUSU9OKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTG9naWNhbE9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUxvZ2ljYWxPcjogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlTG9naWNhbEFuZCgpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBMb2dpY2FsT3IgOiBMb2dpY2FsQW5kICgnb3InIExvZ2ljYWxBbmQpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUikpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUxvZ2ljYWxBbmQoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTG9naWNhbEFuZDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQml0d2lzZU9yKCksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIExvZ2ljYWxBbmQgOiBCaXR3aXNlT3IgKCdhbmQnIEJpdHdpc2VPcikqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUJpdHdpc2VPcigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlT3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VYb3IoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZU9yIDogQml0d2lzZVhvciAoJ2Itb3InIEJpdHdpc2VYb3IpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfT1IpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VCaXR3aXNlWG9yKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUJpdHdpc2VYb3I6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUJpdHdpc2VBbmQoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZVhvciA6IEJpdHdpc2VBbmQgKCdiLXhvcicgQml0d2lzZUFuZCkqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfWE9SKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQml0d2lzZUFuZCgpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBsZWZ0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VCaXR3aXNlQW5kOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VOb3QoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQml0d2lzZUFuZCA6IE5vdCAoJ2ItYW5kJyBOb3QpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkJJVFdJU0VfQU5EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTm90KCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZU5vdDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE5vdCA6ICdub3QnIENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5OT1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VDb21wKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBudWxsO1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICB8IENvbXAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbXAoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQ29tcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlQWRkU3ViKCksIHJpZ2h0LCBub2RlLCBzd2FwO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIENvbXAgOiBBZGRTdWIgJ2lzJyAnbm90Jz8gKCdkZWZpbmVkJyB8ICdudWxsJyB8IC4uLikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvKiovIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0Lyogc3dhcCAnaXMnIGFuZCAnbm90JyAqL1xuXHRcdFx0c3dhcCA9IG5vZGU7XG5cdFx0XHQvKiBzd2FwICdpcycgYW5kICdub3QnICovXG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkpXG5cdFx0XHR7XG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gc3dhcDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuSVNfWFhYKSlcblx0XHRcdHtcblx0XHRcdFx0cmlnaHQgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0c3dhcC5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdHN3YXAubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwga2V5d29yZCBgZGVmaW5lZGAsIGBudWxsYCwgYGVtcHR5YCwgYGl0ZXJhYmxlYCwgYGV2ZW5gIG9yIGBvZGRgIGV4cGVjdGVkJztcblx0XHRcdH1cblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgKCc9PT0nIHwgJz09JyB8IC4uLikgQWRkU3ViICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkNNUF9PUCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICgnc3RhcnRzJyB8ICdlbmRzJykgYHdpdGhgIEFkZFN1YiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5YWFhfV0lUSCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdHJpZ2h0ID0gdGhpcy5wYXJzZUFkZFN1YigpO1xuXG5cdFx0XHRub2RlLm5vZGVMZWZ0ID0gbGVmdDtcblx0XHRcdG5vZGUubm9kZVJpZ2h0ID0gcmlnaHQ7XG5cblx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiAgICAgIHwgQWRkU3ViICdtYXRjaGVzJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0ZWxzZSBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5NQVRDSEVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgJ2luJyBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRlbHNlIGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLklOKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlQWRkU3ViKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgfCBBZGRTdWIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlQWRkU3ViOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VNdWxEaXYoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQWRkU3ViIDogTXVsRGl2ICgoJysnIHwgJy0nKSBNdWxEaXYpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBMVVNfTUlOVVMpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VNdWxEaXYoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlTXVsRGl2OiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VQbHVzTWludXMoKSwgcmlnaHQsIG5vZGU7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogTXVsRGl2IDogUGx1c01pbnVzICgoJyonIHwgJy8vJyB8ICcvJyB8ICclJykgUGx1c01pbnVzKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLk1VTF9GTERJVl9ESVZfTU9EKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUGx1c01pbnVzKCk7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZVBsdXNNaW51czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFBsdXNNaW51cyA6ICgnLScgfCAnKycpIFBvd2VyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5QTFVTX01JTlVTKSlcblx0XHR7XG5cdFx0XHRub2RlID0gbmV3IGFtaVR3aWcuZXhwci5Ob2RlKHRoaXMudG9rZW5pemVyLnBlZWtUeXBlKCksIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlUG93ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IG51bGw7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogICAgICAgICAgIHwgRG90MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiB0aGlzLnBhcnNlUG93ZXIoKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlUG93ZXI6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBsZWZ0ID0gdGhpcy5wYXJzZUZpbHRlcigpLCByaWdodCwgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBQb3dlciA6IEZpbHRlciAoJyoqJyBGaWx0ZXIpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0d2hpbGUodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVIpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRyaWdodCA9IHRoaXMucGFyc2VGaWx0ZXIoKTtcblxuXHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRsZWZ0ID0gbm9kZTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlRmlsdGVyOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbGVmdCA9IHRoaXMucGFyc2VEb3QxKCksIG5vZGUsIHRlbXA7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogRmlsdGVyIDogRG90MSAoJ3wnIERvdDEpKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlBJUEUpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VEb3QxKHRydWUpO1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxuXG5cdFx0XHR0ZW1wLmxpc3QudW5zaGlmdChsZWZ0KTtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDE6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZSA9IHRoaXMucGFyc2VEb3QyKGlzRmlsdGVyKTtcblxuXHRcdGlmKG5vZGUpXG5cdFx0e1xuXHRcdFx0bGV0IHRlbXA7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRmb3IodGVtcCA9IG5vZGU7IHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRE9UOyB0ZW1wID0gdGVtcC5ub2RlTGVmdCkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGVtcC5xKVxuXHRcdFx0e1xuXHRcdFx0XHQvKiovIGlmKHRlbXAubm9kZVR5cGUgPT09IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYodGVtcC5ub2RlVmFsdWUgaW4gYW1pVHdpZy5zdGRsaWIpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAnYW1pVHdpZy5zdGRsaWIuJyArIHRlbXAubm9kZVZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGVtcC5ub2RlVmFsdWUgPSAvKi0tLSovJ18uJy8qLS0tKi8gKyB0ZW1wLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0ZW1wLm5vZGVUeXBlID09PSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUilcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRlbXAubm9kZVZhbHVlID0gLyotLS0qLydfLicvKi0tLSovICsgdGVtcC5ub2RlVmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0ZW1wLnEgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDI6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDIgOiBEb3QzICgnLicgRG90MykqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QpKVxuXHRcdHtcblx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUodGhpcy50b2tlbml6ZXIucGVla1R5cGUoKSwgJy4nKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlRG90Myhpc0ZpbHRlcik7XG5cblx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0bGVmdCA9IG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZURvdDM6IGZ1bmN0aW9uKGlzRmlsdGVyKVxuXHR7XG5cdFx0bGV0IGxlZnQgPSB0aGlzLnBhcnNlWChpc0ZpbHRlciksIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIERvdDMgOiBYICgnWycgTnVsbENvYWxlc2NpbmcgJ10nKSogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjEpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0cmlnaHQgPSB0aGlzLnBhcnNlTnVsbENvYWxlc2NpbmcoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIxKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ET1QsICdbXScpO1xuXG5cdFx0XHRcdG5vZGUubm9kZUxlZnQgPSBsZWZ0O1xuXHRcdFx0XHRub2RlLm5vZGVSaWdodCA9IHJpZ2h0O1xuXG5cdFx0XHRcdGxlZnQgPSBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGBdYCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qICAgICAgICAgfCBYICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gbGVmdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHBhcnNlWDogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBYIDogR3JvdXAgfCBBcnJheSB8IE9iamVjdCB8IEZ1blZhciB8IFRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoKG5vZGUgPSB0aGlzLnBhcnNlR3JvdXAoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUFycmF5KCkpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VPYmplY3QoKSkpIHtcblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH1cblxuXHRcdGlmKChub2RlID0gdGhpcy5wYXJzZUZ1blZhcihpc0ZpbHRlcikpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9XG5cblx0XHRpZigobm9kZSA9IHRoaXMucGFyc2VUZXJtaW5hbCgpKSkge1xuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFNZTlRBWCBFUlJPUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIHN5bnRheCBlcnJvciBvciB0cnVuY2F0ZWQgZXhwcmVzc2lvbic7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUdyb3VwOiBmdW5jdGlvbigpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHQvKiBHcm91cCA6ICcoJyBOdWxsQ29hbGVzY2luZyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuTFApKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0bm9kZSA9IHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgKWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VBcnJheTogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IG5vZGUsIGxpc3Q7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0LyogQXJyYXkgOiAnWycgU2luZ2xldHMgJ10nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLkxCMSkpXG5cdFx0e1xuXHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRsaXN0ID0gdGhpcy5fcGFyc2VTaW5nbGV0cygpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SQjEpKVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZShhbWlUd2lnLmV4cHIudG9rZW5zLkxTVCwgJ0FycmF5Jyk7XG5cblx0XHRcdFx0bm9kZS5saXN0ID0gbGlzdDtcblxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgXWAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VPYmplY3Q6IGZ1bmN0aW9uKClcblx0e1xuXHRcdGxldCBub2RlLCBkaWN0O1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIE9iamVjdCA6ICd7JyBEb3VibGV0cyAnfScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MQjIpKVxuXHRcdHtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0ZGljdCA9IHRoaXMuX3BhcnNlRG91YmxldHMoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUkIyKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdG5vZGUgPSBuZXcgYW1pVHdpZy5leHByLk5vZGUoYW1pVHdpZy5leHByLnRva2Vucy5ESUMsICdPYmplY3QnKTtcblxuXHRcdFx0XHRub2RlLmRpY3QgPSBkaWN0O1xuXG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgdGhpcy5saW5lICsgJ2AsIGB9YCBleHBlY3RlZCc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwYXJzZUZ1blZhcjogZnVuY3Rpb24oaXNGaWx0ZXIpXG5cdHtcblx0XHRsZXQgbm9kZTtcblxuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlNJRCkpXG5cdFx0e1xuXHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSgwLCBpc0ZpbHRlciA/ICdmaWx0ZXJfJyArIHRoaXMudG9rZW5pemVyLnBlZWtUb2tlbigpIDogdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCkpO1xuXG5cdFx0XHRub2RlLnEgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRnVuVmFyIDogU0lEICcoJyBTaW5nbGV0cyAnKScgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0LyoqLyBpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5MUCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRub2RlLmxpc3QgPSB0aGlzLl9wYXJzZVNpbmdsZXRzKCk7XG5cblx0XHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuUlApKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGFtaVR3aWcuZXhwci50b2tlbnMuRlVOO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyB0aGlzLmxpbmUgKyAnYCwgYClgIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qICAgICAgICB8IFNJRCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0bm9kZS5ub2RlVHlwZSA9IGlzRmlsdGVyID8gYW1pVHdpZy5leHByLnRva2Vucy5GVU5cblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgIDogYW1pVHdpZy5leHByLnRva2Vucy5WQVJcblx0XHRcdFx0O1xuXG5cdFx0XHRcdG5vZGUubGlzdCA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfcGFyc2VTaW5nbGV0czogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHR3aGlsZSh0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5SWCkgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlU2luZ2xldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXRzOiBmdW5jdGlvbigpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSB7fTtcblxuXHRcdHdoaWxlKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJCMikgPT09IGZhbHNlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3BhcnNlRG91YmxldChyZXN1bHQpO1xuXG5cdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5DT01NQSkgPT09IHRydWUpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZVNpbmdsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdHJlc3VsdC5wdXNoKHRoaXMucGFyc2VOdWxsQ29hbGVzY2luZygpKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9wYXJzZURvdWJsZXQ6IGZ1bmN0aW9uKHJlc3VsdClcblx0e1xuXHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMKSlcblx0XHR7XG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKTtcblx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0aWYodGhpcy50b2tlbml6ZXIuY2hlY2tUeXBlKGFtaVR3aWcuZXhwci50b2tlbnMuQ09MT04pKVxuXHRcdFx0e1xuLypcdFx0XHRcdGNvbnN0IGNvbG9uID0gdGhpcy50b2tlbml6ZXIucGVla1Rva2VuKCk7XG4gKi9cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5wYXJzZU51bGxDb2FsZXNjaW5nKCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCBgOmAgZXhwZWN0ZWQnO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIHRoaXMubGluZSArICdgLCB0ZXJtaW5hbCBleHBlY3RlZCc7XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cGFyc2VUZXJtaW5hbDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0bGV0IGxlZnQsIHJpZ2h0LCBub2RlO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdC8qIFRlcm1pbmFsIDogVEVSTUlOQUwgfCBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0e1xuXHRcdFx0bGVmdCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHR0aGlzLnRva2VuaXplci5uZXh0KCk7XG5cblx0XHRcdGlmKHRoaXMudG9rZW5pemVyLmNoZWNrVHlwZShhbWlUd2lnLmV4cHIudG9rZW5zLlJBTkdFKSlcblx0XHRcdHtcblx0XHRcdFx0bm9kZSA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdHRoaXMudG9rZW5pemVyLm5leHQoKTtcblxuXHRcdFx0XHRpZih0aGlzLnRva2VuaXplci5jaGVja1R5cGUoYW1pVHdpZy5leHByLnRva2Vucy5URVJNSU5BTCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyaWdodCA9IG5ldyBhbWlUd2lnLmV4cHIuTm9kZSh0aGlzLnRva2VuaXplci5wZWVrVHlwZSgpLCB0aGlzLnRva2VuaXplci5wZWVrVG9rZW4oKSk7XG5cdFx0XHRcdFx0dGhpcy50b2tlbml6ZXIubmV4dCgpO1xuXG5cdFx0XHRcdFx0bm9kZS5ub2RlTGVmdCA9IGxlZnQ7XG5cdFx0XHRcdFx0bm9kZS5ub2RlUmlnaHQgPSByaWdodDtcblxuXHRcdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBsZWZ0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5Ob2RlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5Ob2RlID0gZnVuY3Rpb24obm9kZVR5cGUsIG5vZGVWYWx1ZSkge1xuXG5cdHRoaXMuJGluaXQobm9kZVR5cGUsIG5vZGVWYWx1ZSk7XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5leHByLk5vZGUucHJvdG90eXBlID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbihub2RlVHlwZSwgbm9kZVZhbHVlKVxuXHR7XG5cdFx0dGhpcy5ub2RlVHlwZSA9IG5vZGVUeXBlO1xuXHRcdHRoaXMubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuXHRcdHRoaXMubm9kZUxlZnQgPSBudWxsO1xuXHRcdHRoaXMubm9kZVJpZ2h0ID0gbnVsbDtcblx0XHR0aGlzLmxpc3QgPSBudWxsO1xuXHRcdHRoaXMuZGljdCA9IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRfZHVtcDogZnVuY3Rpb24obm9kZXMsIGVkZ2VzLCBwQ250KVxuXHR7XG5cdFx0bGV0IENOVDtcblxuXHRcdGNvbnN0IGNudCA9IHBDbnRbMF07XG5cblx0XHRub2Rlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgW2xhYmVsPVwiJyArIHRoaXMubm9kZVZhbHVlLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIl07Jyk7XG5cblx0XHRpZih0aGlzLm5vZGVMZWZ0KVxuXHRcdHtcblx0XHRcdENOVCA9ICsrcENudFswXTtcblx0XHRcdGVkZ2VzLnB1c2goJ1xcdG5vZGUnICsgY250ICsgJyAtPiBub2RlJyArIENOVCArICc7Jyk7XG5cdFx0XHR0aGlzLm5vZGVMZWZ0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5ub2RlUmlnaHQpXG5cdFx0e1xuXHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0ZWRnZXMucHVzaCgnXFx0bm9kZScgKyBjbnQgKyAnIC0+IG5vZGUnICsgQ05UICsgJzsnKTtcblx0XHRcdHRoaXMubm9kZVJpZ2h0Ll9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5saXN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMubGlzdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5saXN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGZvcihjb25zdCBpIGluIHRoaXMuZGljdClcblx0XHRcdHtcblx0XHRcdFx0Q05UID0gKytwQ250WzBdO1xuXHRcdFx0XHRlZGdlcy5wdXNoKCdcXHRub2RlJyArIGNudCArICcgLT4gbm9kZScgKyBDTlQgKyAnIFtsYWJlbD1cIlsnICsgaS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXVwiXTsnKTtcblx0XHRcdFx0dGhpcy5kaWN0W2ldLl9kdW1wKG5vZGVzLCBlZGdlcywgcENudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZHVtcDogZnVuY3Rpb24oKVxuXHR7XG5cdFx0Y29uc3Qgbm9kZXMgPSBbXTtcblx0XHRjb25zdCBlZGdlcyA9IFtdO1xuXG5cdFx0dGhpcy5fZHVtcChub2RlcywgZWRnZXMsIFswXSk7XG5cblx0XHRyZXR1cm4gJ2RpZ3JhcGggYXN0IHtcXG5cXHRyYW5rZGlyPVRCO1xcbicgKyBub2Rlcy5qb2luKCdcXG4nKSArICdcXG4nICsgZWRnZXMuam9pbignXFxuJykgKyAnXFxufSc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbCA9IHt9O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcudG1wbC5Db21waWxlciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlciA9IGZ1bmN0aW9uKHRtcGwpIHtcblxuXHR0aGlzLiRpbml0KHRtcGwpO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcudG1wbC5Db21waWxlci5wcm90b3R5cGUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0U1RBVEVNRU5UX1JFOiAveyVcXHMqKFthLXpBLVpdKylcXHMqKCg/Oi58XFxuKSo/KVxccyolfS8sXG5cblx0Q09NTUVOVF9SRTogL3sjXFxzKigoPzoufFxcbikqPylcXHMqI30vZyxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdF9jb3VudDogZnVuY3Rpb24ocylcblx0e1xuXHRcdGxldCByZXN1bHQgPSAwO1xuXG5cdFx0Y29uc3QgbCA9IHMubGVuZ3RoO1xuXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IGw7IGkrKylcblx0XHR7XG5cdFx0XHRpZihzW2ldID09PSAnXFxuJykgcmVzdWx0Kys7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCRpbml0OiBmdW5jdGlvbih0bXBsKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IGxpbmUgPSAxO1xuXG5cdFx0bGV0IGNvbHVtbjtcblx0XHRsZXQgQ09MVU1OO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5yb290Tm9kZSA9IHtcblx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRrZXl3b3JkOiAnQHJvb3QnLFxuXHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRibG9ja3M6IFt7XG5cdFx0XHRcdGV4cHJlc3Npb246ICdAdHJ1ZScsXG5cdFx0XHRcdGxpc3Q6IFtdLFxuXHRcdFx0fV0sXG5cdFx0XHR2YWx1ZTogJycsXG5cdFx0fTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGNvbnN0IHN0YWNrMSA9IFt0aGlzLnJvb3ROb2RlXTtcblx0XHRjb25zdCBzdGFjazIgPSBbMHgwMDAwMDAwMDAwMF07XG5cblx0XHRsZXQgaXRlbTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGZvcih0bXBsID0gdG1wbC5yZXBsYWNlKHRoaXMuQ09NTUVOVF9SRSwgJycpOzsgdG1wbCA9IHRtcGwuc3Vic3RyKENPTFVNTikpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNvbnN0IGN1cnIgPSBzdGFjazFbc3RhY2sxLmxlbmd0aCAtIDFdO1xuXHRcdFx0IGxldCAgaW5keCA9IHN0YWNrMltzdGFjazIubGVuZ3RoIC0gMV07XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtID0gdG1wbC5tYXRjaCh0aGlzLlNUQVRFTUVOVF9SRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZihtID09PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxpbmUgKz0gdGhpcy5fY291bnQodG1wbCk7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goe1xuXHRcdFx0XHRcdGxpbmU6IGxpbmUsXG5cdFx0XHRcdFx0a2V5d29yZDogJ0B0ZXh0Jyxcblx0XHRcdFx0XHRleHByZXNzaW9uOiAnJyxcblx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdHZhbHVlOiB0bXBsLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IGVycm9ycyA9IFtdO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IHN0YWNrMS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyoqLyBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2lmJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcnMucHVzaCgnbWlzc2luZyBrZXl3b3JkIGBlbmRpZmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZihzdGFjazFbaV0ua2V5d29yZCA9PT0gJ2ZvcicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdCBcdGVycm9ycy5wdXNoKCdtaXNzaW5nIGtleXdvcmQgYGVuZGZvcmAnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihlcnJvcnMubGVuZ3RoID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsICcgKyBlcnJvcnMuam9pbignLCAnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjb25zdCBtYXRjaCA9IG1bMF07XG5cdFx0XHRjb25zdCBrZXl3b3JkID0gbVsxXTtcblx0XHRcdGNvbnN0IGV4cHJlc3Npb24gPSBtWzJdO1xuXG5cdFx0XHRjb2x1bW4gPSBtLmluZGV4ICsgMHgwMDAwMDAwMDAwO1xuXHRcdFx0Q09MVU1OID0gbS5pbmRleCArIG1hdGNoLmxlbmd0aDtcblxuXHRcdFx0Y29uc3QgdmFsdWUgPSB0bXBsLnN1YnN0cigwLCBjb2x1bW4pO1xuXHRcdFx0Y29uc3QgVkFMVUUgPSB0bXBsLnN1YnN0cigwLCBDT0xVTU4pO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0bGluZSArPSB0aGlzLl9jb3VudChWQUxVRSk7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih2YWx1ZSlcblx0XHRcdHtcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdGtleXdvcmQ6ICdAdGV4dCcsXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbjogJycsXG5cdFx0XHRcdFx0YmxvY2tzOiBbXSxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRzd2l0Y2goa2V5d29yZClcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdmbHVzaCc6XG5cdFx0XHRcdGNhc2UgJ2F1dG9lc2NhcGUnOlxuXHRcdFx0XHRjYXNlICdzcGFjZWxlc3MnOlxuXHRcdFx0XHRjYXNlICd2ZXJiYXRpbSc6XG5cblx0XHRcdFx0XHQvKiBJR05PUkUgKi9cblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0XHRjYXNlICdzZXQnOlxuXHRcdFx0XHRjYXNlICdpbmNsdWRlJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGV4cHJlc3Npb246IGV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHRibG9ja3M6IFtdLFxuXHRcdFx0XHRcdFx0dmFsdWU6ICcnLFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjdXJyLmJsb2Nrc1tpbmR4XS5saXN0LnB1c2goaXRlbSk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2lmJzpcblx0XHRcdFx0Y2FzZSAnZm9yJzpcblxuXHRcdFx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdFx0XHRsaW5lOiBsaW5lLFxuXHRcdFx0XHRcdFx0a2V5d29yZDoga2V5d29yZCxcblx0XHRcdFx0XHRcdGJsb2NrczogW3tcblx0XHRcdFx0XHRcdFx0ZXhwcmVzc2lvbjogZXhwcmVzc2lvbixcblx0XHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0XHR9XSxcblx0XHRcdFx0XHRcdHZhbHVlOiAnJyxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3NbaW5keF0ubGlzdC5wdXNoKGl0ZW0pO1xuXG5cdFx0XHRcdFx0c3RhY2sxLnB1c2goaXRlbSk7XG5cdFx0XHRcdFx0c3RhY2syLnB1c2goMHgwMCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNhc2UgJ2Vsc2VpZic6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZicpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGxpbmUgKyAnYCwgdW5leHBlY3RlZCBrZXl3b3JkIGBlbHNlaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiBleHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZWxzZSc6XG5cblx0XHRcdFx0XHRpZihjdXJyWydrZXl3b3JkJ10gIT09ICdpZidcblx0XHRcdFx0XHQgICAmJlxuXHRcdFx0XHRcdCAgIGN1cnJbJ2tleXdvcmQnXSAhPT0gJ2Zvcidcblx0XHRcdFx0XHQgKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVsc2VgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbmR4ID0gY3Vyci5ibG9ja3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0Y3Vyci5ibG9ja3MucHVzaCh7XG5cdFx0XHRcdFx0XHRleHByZXNzaW9uOiAnQHRydWUnLFxuXHRcdFx0XHRcdFx0bGlzdDogW10sXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRzdGFjazJbc3RhY2syLmxlbmd0aCAtIDFdID0gaW5keDtcblxuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y2FzZSAnZW5kaWYnOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnaWYnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBsaW5lICsgJ2AsIHVuZXhwZWN0ZWQga2V5d29yZCBgZW5kaWZgJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzdGFjazEucG9wKCk7XG5cdFx0XHRcdFx0c3RhY2syLnBvcCgpO1xuXG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjYXNlICdlbmRmb3InOlxuXG5cdFx0XHRcdFx0aWYoY3Vyclsna2V5d29yZCddICE9PSAnZm9yJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmV4cGVjdGVkIGtleXdvcmQgYGVuZGZvcmAnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHN0YWNrMS5wb3AoKTtcblx0XHRcdFx0XHRzdGFjazIucG9wKCk7XG5cblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cblx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgbGluZSArICdgLCB1bmtub3duIGtleXdvcmQgYCcgKyBrZXl3b3JkICsgJ2AnO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdH1cblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGR1bXA6IGZ1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnJvb3ROb2RlLCBudWxsLCAyKTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyogYW1pVHdpZy5lbmdpbmUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5lbmdpbmUgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0VkFSSUFCTEVfUkU6IC97e1xccyooLio/KVxccyp9fS9nLFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X3JlbmRlcjogZnVuY3Rpb24ocmVzdWx0LCBpdGVtLCBkaWN0ID0ge30sIHRtcGxzID0ge30pXG5cdHtcblx0XHRsZXQgbTtcblxuXHRcdGxldCBleHByZXNzaW9uO1xuXG5cdFx0dGhpcy5kaWN0ID0gZGljdDtcblx0XHR0aGlzLnRtcGxzID0gdG1wbHM7XG5cblx0XHRzd2l0Y2goaXRlbS5rZXl3b3JkKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZG8nOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGl0ZW0uZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIFNFVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHR7XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bSA9IGl0ZW0uZXhwcmVzc2lvbi5tYXRjaCgvKCg/OlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcLikqW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyo9XFxzKiguKykvKTtcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdzeW50YXggZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgaW52YWxpZCBgc2V0YCBzdGF0ZW1lbnQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBwYXJ0cyA9IG1bMV0uc3BsaXQoJy4nKSwgbCA9IHBhcnRzLmxlbmd0aCAtIDE7XG5cblx0XHRcdFx0bGV0IHBhcmVudCwgajtcblxuXHRcdFx0XHRpZihwYXJ0c1swXSA9PT0gJ3dpbmRvdydcblx0XHRcdFx0ICAgfHxcblx0XHRcdFx0ICAgcGFydHNbMF0gPT09ICdnbG9iYWwnXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHQvKiovIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSB3aW5kb3c7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IGdsb2JhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGogPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHBhcmVudCA9IGRpY3Q7XG5cblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0bGV0IGk7XG5cblx0XHRcdFx0Zm9yKGkgPSBqOyBpIDwgbDsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYocGFyZW50W3BhcnRzW2ldXSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnRbcGFydHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgYCcgKyBtWzFdICsgJ2Agbm90IGRlY2xhcmVkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHBhcmVudFtwYXJ0c1tpXV0gPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChtWzJdLCBpdGVtLmxpbmUsIGRpY3QpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogQFRFWFQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnQHRleHQnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUucmVwbGFjZSh0aGlzLlZBUklBQkxFX1JFLCBmdW5jdGlvbihtYXRjaCwgZXhwcmVzc2lvbikge1xuXG5cdFx0XHRcdFx0bGV0IHZhbHVlID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwoZXhwcmVzc2lvbiwgaXRlbS5saW5lLCBkaWN0KTtcblxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiAnJztcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogSUYgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnaWYnOlxuXHRcdFx0Y2FzZSAnQHJvb3QnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGl0ZW0uYmxvY2tzLmV2ZXJ5KChibG9jaykgPT4ge1xuXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IGJsb2NrLmV4cHJlc3Npb247XG5cblx0XHRcdFx0XHRpZihleHByZXNzaW9uID09PSAnQHRydWUnIHx8IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHJlc3Npb24sIGl0ZW0ubGluZSwgZGljdCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gYmxvY2subGlzdClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgYmxvY2subGlzdFtpXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRk9SICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSAnZm9yJzpcblx0XHRcdHtcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRsZXQgc3ltMTtcblx0XHRcdFx0bGV0IHN5bTI7XG5cdFx0XHRcdGxldCBleHByO1xuXG5cdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccyosXFxzKihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopXFxzK2luXFxzKyguKykvKTtcblxuXHRcdFx0XHRpZighbSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG0gPSBpdGVtLmJsb2Nrc1swXS5leHByZXNzaW9uLm1hdGNoKC8oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qKVxccytpblxccysoLispLyk7XG5cblx0XHRcdFx0XHRpZighbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIGludmFsaWQgYGZvcmAgc3RhdGVtZW50Jztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHN5bTEgPSBtWzFdO1xuXHRcdFx0XHRcdFx0c3ltMiA9IG51bGw7XG5cdFx0XHRcdFx0XHRleHByID0gbVsyXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0c3ltMSA9IG1bMV07XG5cdFx0XHRcdFx0c3ltMiA9IG1bMl07XG5cdFx0XHRcdFx0ZXhwciA9IG1bM107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGNvbnN0IG9yaWdWYWx1ZSA9IGFtaVR3aWcuZXhwci5jYWNoZS5ldmFsKGV4cHIsIGl0ZW0ubGluZSwgZGljdCk7XG5cblx0XHRcdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3JpZ1ZhbHVlKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBpdGVyVmFsdWU7XG5cblx0XHRcdFx0aWYodHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aXRlclZhbHVlID0gc3ltMiA/IE9iamVjdC5lbnRyaWVzKG9yaWdWYWx1ZSlcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMob3JpZ1ZhbHVlKVxuXHRcdFx0XHRcdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpdGVyVmFsdWUgPSBvcmlnVmFsdWU7XG5cblx0XHRcdFx0XHRpZih0eXBlTmFtZSAhPT0gJ1tvYmplY3QgQXJyYXldJ1xuXHRcdFx0XHRcdCAgICYmXG5cdFx0XHRcdFx0ICAgdHlwZU5hbWUgIT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdFx0dGhyb3cgJ3N5bnRheCBlcnJvciwgbGluZSBgJyArIGl0ZW0ubGluZSArICdgLCByaWdodCBvcGVyYW5kIG5vdCBpdGVyYWJsZSc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0aHJvdyAnc3ludGF4IGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIHJpZ2h0IG9wZXJhbmQgbm90IGFuIG9iamVjdCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRjb25zdCBsID0gaXRlclZhbHVlLmxlbmd0aDtcblxuXHRcdFx0XHRpZihsID4gMClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBrID0gMHgwMDAwMDAwMDAwMDAwMDtcblxuXHRcdFx0XHRcdGNvbnN0IGxpc3QgPSBpdGVtLmJsb2Nrc1swXS5saXN0O1xuXG5cdFx0XHRcdFx0aWYoc3ltMilcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y29uc3Qgb2xkMSA9IGRpY3RbKHN5bTEpXTtcblx0XHRcdFx0XHRcdGNvbnN0IG9sZDIgPSBkaWN0WyhzeW0yKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQzID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gaXRlclZhbHVlW2ldWzBdO1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTJdID0gaXRlclZhbHVlW2ldWzFdO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQzO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMildID0gb2xkMjtcblx0XHRcdFx0XHRcdGRpY3RbKHN5bTEpXSA9IG9sZDE7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNvbnN0IG9sZDEgPSBkaWN0WyhzeW0xKV07XG5cdFx0XHRcdFx0XHRjb25zdCBvbGQyID0gZGljdFsnbG9vcCddO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGljdC5sb29wID0ge2xlbmd0aDogbCwgcGFyZW50OiBkaWN0Wydsb29wJ119O1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gaXRlclZhbHVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaWN0W3N5bTFdID0gaXRlclZhbHVlW2ldO1xuXG5cdFx0XHRcdFx0XHRcdGRpY3QubG9vcC5maXJzdCA9IChrID09PSAoMCAtIDApKTtcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmxhc3QgPSAoayA9PT0gKGwgLSAxKSk7XG5cblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLnJldmluZGV4MCA9IGwgLSBrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AuaW5kZXgwID0gaztcblx0XHRcdFx0XHRcdFx0aysrO1xuXHRcdFx0XHRcdFx0XHRkaWN0Lmxvb3AucmV2aW5kZXggPSBsIC0gaztcblx0XHRcdFx0XHRcdFx0ZGljdC5sb29wLmluZGV4ID0gaztcblxuXHRcdFx0XHRcdFx0XHRmb3IoY29uc3QgaiBpbiBsaXN0KVxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fcmVuZGVyKHJlc3VsdCwgbGlzdFtqXSwgZGljdCwgdG1wbHMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRkaWN0Wydsb29wJ10gPSBvbGQyO1xuXHRcdFx0XHRcdFx0ZGljdFsoc3ltMSldID0gb2xkMTtcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGl0ZW0uYmxvY2tzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IGl0ZW0uYmxvY2tzWzFdLmxpc3Q7XG5cblx0XHRcdFx0XHRcdGZvcihjb25zdCBqIGluIGxpc3QpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbmRlcihyZXN1bHQsIGxpc3Rbal0sIGRpY3QsIHRtcGxzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIElOQ0xVREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgJ2luY2x1ZGUnOlxuXHRcdFx0e1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGxldCBtXzFfID0gaXRlbS5leHByZXNzaW9uLCB3aXRoX3N1YmV4cHIsIHdpdGhfY29udGV4dDtcblxuXHRcdFx0XHQvKiovIGlmKChtID0gbV8xXy5tYXRjaCgvKC4rKVxccyt3aXRoXFxzKyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKG0gPSBtXzFfLm1hdGNoKC8oLispXFxzK3dpdGhcXHMrKC4rKSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSBtWzJdO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigobSA9IG1fMV8ubWF0Y2goLyguKylcXHMrb25seSQvKSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRleHByZXNzaW9uID0gbVsxXTtcblx0XHRcdFx0XHR3aXRoX3N1YmV4cHIgPSAne30nO1xuXHRcdFx0XHRcdHdpdGhfY29udGV4dCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSBtXzFfO1xuXHRcdFx0XHRcdHdpdGhfc3ViZXhwciA9ICd7fSc7XG5cdFx0XHRcdFx0d2l0aF9jb250ZXh0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgZmlsZU5hbWUgPSBhbWlUd2lnLmV4cHIuY2FjaGUuZXZhbChleHByZXNzaW9uLCBpdGVtLmxpbmUsIGRpY3QpIHx8ICcnO1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmaWxlTmFtZSkgIT09ICdbb2JqZWN0IFN0cmluZ10nKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGxpbmUgYCcgKyBpdGVtLmxpbmUgKyAnYCwgc3RyaW5nIGV4cGVjdGVkJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gYW1pVHdpZy5leHByLmNhY2hlLmV2YWwod2l0aF9zdWJleHByLCBpdGVtLmxpbmUsIGRpY3QpIHx8IHt9O1xuXG5cdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YXJpYWJsZXMpICE9PSAnW29iamVjdCBPYmplY3RdJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93ICdydW50aW1lIGVycm9yLCBsaW5lIGAnICsgaXRlbS5saW5lICsgJ2AsIG9iamVjdCBleHBlY3RlZCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFtaVR3aWcuc3RkbGliLmluY2x1ZGUoXG5cdFx0XHRcdFx0ZmlsZU5hbWUsXG5cdFx0XHRcdFx0dmFyaWFibGVzLFxuXHRcdFx0XHRcdHdpdGhfY29udGV4dCxcblx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHQpKTtcblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRyZW5kZXI6IGZ1bmN0aW9uKHRtcGwsIGRpY3QgPSB7fSwgdG1wbHMgPSB7fSlcblx0e1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0c3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0bXBsKSlcblx0XHR7XG5cdFx0XHRjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCBuZXcgYW1pVHdpZy50bXBsLkNvbXBpbGVyKHRtcGwpLnJvb3ROb2RlLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuXHRcdFx0XHR0aGlzLl9yZW5kZXIocmVzdWx0LCAvKi0tLS0tLS0tLS0tLS0tKi90bXBsLyotLS0tLS0tLS0tLS0tLSovLCBkaWN0LCB0bXBscyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuZXhwci5jYWNoZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuZXhwci5jYWNoZSA9IHtcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRkaWN0OiB7fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHJlc3Npb24sIGxpbmUsIF8pXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgZjtcblxuXHRcdGlmKGV4cHJlc3Npb24gaW4gdGhpcy5kaWN0KVxuXHRcdHtcblx0XHRcdGYgPSB0aGlzLmRpY3RbZXhwcmVzc2lvbl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmID0gdGhpcy5kaWN0W2V4cHJlc3Npb25dID0gZXZhbChcblx0XHRcdFx0YW1pVHdpZy5leHByLmludGVycHJldGVyLmdldEpTKFxuXHRcdFx0XHRcdG5ldyBhbWlUd2lnLmV4cHIuQ29tcGlsZXIoZXhwcmVzc2lvbiwgbGluZSlcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRfID0gXyB8fCB7fTtcblxuXHRcdHJldHVybiBmLmNhbGwoXywgXyk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qIGFtaVR3aWcuc3RkbGliICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmFtaVR3aWcuc3RkbGliID0ge1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBWQVJJQUJMRVMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1VuZGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRGVmaW5lZCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCAhPT0gdW5kZWZpbmVkO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzTnVsbCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4geCA9PT0gbnVsbDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc05vdE51bGwnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHggIT09IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNFbXB0eSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih4ID09PSBudWxsXG5cdFx0ICAgfHxcblx0XHQgICB4ID09PSBmYWxzZVxuXHRcdCAgIHx8XG5cdFx0ICAgeCA9PT0gKCgnJykpXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gKCh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJykgJiYgeC5sZW5ndGggPT09IDApXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgICgodHlwZU5hbWUgPT09ICdbb2JqZWN0IFNldF0nIHx8IHR5cGVOYW1lID09PSAnW29iamVjdCBXZWFrU2V0XScpICYmIHguc2l6ZSA9PT0gMClcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgKCh0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE1hcF0nIHx8IHR5cGVOYW1lID09PSAnW29iamVjdCBXZWFrTWFwXScpICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA9PT0gMClcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNOdW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0Y29uc3QgdHlwZU5hbWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0XHRyZXR1cm4gdHlwZU5hbWUgPT09ICdbb2JqZWN0IE51bWJlcl0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBCaWdJbnRdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1N0cmluZyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0RhdGUnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzQXJyYXknOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc09iamVjdCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc1NldCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU2V0XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IFdlYWtTZXRdJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc01hcCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE1hcF0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBXZWFrTWFwXSdcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJdGVyYWJsZSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB0eXBlTmFtZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KTtcblxuXHRcdHJldHVybiB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IEFycmF5XSdcblx0XHQgICAgICAgfHxcblx0XHQgICAgICAgdHlwZU5hbWUgPT09ICdbb2JqZWN0IE9iamVjdF0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBTZXRdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgV2Vha1NldF0nXG5cdFx0ICAgICAgIHx8XG5cdFx0ICAgICAgIHR5cGVOYW1lID09PSAnW29iamVjdCBNYXBdJ1xuXHRcdCAgICAgICB8fFxuXHRcdCAgICAgICB0eXBlTmFtZSA9PT0gJ1tvYmplY3QgV2Vha01hcF0nXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzRXZlbic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc051bWJlcih4KSAmJiAoeCAmIDEpID09PSAwO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2lzT2RkJzogZnVuY3Rpb24oeClcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzTnVtYmVyKHgpICYmICh4ICYgMSkgPT09IDE7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogSVRFUkFCTEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnaXNJbk9iamVjdCc6IGZ1bmN0aW9uKHgsIHkpXG5cdHtcblx0XHRpZih0aGlzLmlzQXJyYXkoeSlcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNTdHJpbmcoeSlcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geS5pbmRleE9mKHgpID49IDA7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1NldCh5KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4geS5oYXMoeCk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc01hcCh5KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHksIHgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdpc0luUmFuZ2UnOiBmdW5jdGlvbih4LCB4MSwgeDIpXG5cdHtcblx0XHRpZih0aGlzLmlzTnVtYmVyKHgxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4gKC8qLS0tKi94LyotLS0qLyA+PSAvKi0tLSoveDEvKi0tLSovKVxuXHRcdFx0ICAgICAgICYmXG5cdFx0XHQgICAgICAgKC8qLS0tKi94LyotLS0qLyA8PSAvKi0tLSoveDIvKi0tLSovKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNTdHJpbmcoeDEpICYmIHgxLmxlbmd0aCA9PT0gMVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0cmV0dXJuICh4LmNoYXJDb2RlQXQoMCkgPj0geDEuY2hhckNvZGVBdCgwKSlcblx0XHRcdCAgICAgICAmJlxuXHRcdFx0ICAgICAgICh4LmNoYXJDb2RlQXQoMCkgPD0geDIuY2hhckNvZGVBdCgwKSlcblx0XHRcdDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQncmFuZ2UnOiBmdW5jdGlvbih4MSwgeDIsIHN0ZXAgPSAxKVxuXHR7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cblx0XHQvKiovIGlmKHRoaXMuaXNOdW1iZXIoeDEpXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc051bWJlcih4Milcblx0XHQgKSB7XG5cdFx0XHRmb3IobGV0IGkgPSAvKi0tLSoveDEvKi0tLSovOyBpIDw9IC8qLS0tKi94Mi8qLS0tKi87IGkgKz0gc3RlcClcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0LnB1c2goLyotLS0tLS0tLS0tLS0tLS0qLyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYodGhpcy5pc1N0cmluZyh4MSkgJiYgeDEubGVuZ3RoID09PSAxXG5cdFx0ICAgICAgICAmJlxuXHRcdCAgICAgICAgdGhpcy5pc1N0cmluZyh4MikgJiYgeDIubGVuZ3RoID09PSAxXG5cdFx0ICkge1xuXHRcdFx0Zm9yKGxldCBpID0geDEuY2hhckNvZGVBdCgwKTsgaSA8PSB4Mi5jaGFyQ29kZUF0KDApOyBpICs9IHN0ZXApXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xlbmd0aCc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHgpXG5cdFx0ICAgfHxcblx0XHQgICB0aGlzLmlzQXJyYXkoeClcblx0XHQgICB8fFxuXHRcdCAgIHRoaXMuaXNTZXQoeClcblx0XHQgKSB7XG5cdFx0XHRyZXR1cm4geC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5pc1NldCh4KSlcblx0XHR7XG5cdFx0XHRyZXR1cm4geC5zaXplO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMuaXNNYXAoeCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHgpLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfZmlyc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFsweDAwMDAwMDAwMDBdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xhc3QnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuICh0aGlzLmlzU3RyaW5nKHgpIHx8IHRoaXMuaXNBcnJheSh4KSkgJiYgeC5sZW5ndGggPiAwID8geFt4Lmxlbmd0aCAtIDFdIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NsaWNlJzogZnVuY3Rpb24oeCwgaWR4MSwgaWR4Milcblx0e1xuXHRcdHJldHVybiAodGhpcy5pc1N0cmluZyh4KSB8fCB0aGlzLmlzQXJyYXkoeCkpID8geC5zbGljZShpZHgxLCBpZHgyKSA6IG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX21lcmdlJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0aWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0e1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGlmKHRoaXMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgTCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFyZ3VtZW50cylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGl0ZW0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRcdFx0XHRpZighdGhpcy5pc1N0cmluZyhpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRMLnB1c2goYXJndW1lbnRzW2ldKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBMLmpvaW4oJycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNBcnJheShpdGVtKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpdGVtLmZvckVhY2goeCA9PiBMLnB1c2goeCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzU2V0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEwgPSBbXTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNTZXQoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aXRlbS5mb3JFYWNoKHggPT4gTC5hZGQoeCkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIEw7XG5cdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRpZih0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IEQgPSB7fTtcblxuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiBhcmd1bWVudHMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdCBpdGVtID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNPYmplY3QoaXRlbSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yKGNvbnN0IGogaW4gaXRlbSkgRFtqXSA9IGl0ZW1bal07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gRDtcblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3NvcnQnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHguc29ydCgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JldmVyc2UnOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNBcnJheSh4KSA/IHgucmV2ZXJzZSgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pvaW4nOiBmdW5jdGlvbih4LCBzZXApXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc0FycmF5KHgpID8geC5qb2luKHNlcCkgOiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfa2V5cyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc01hcCh4KSA/IE9iamVjdC5rZXlzKHgpIDogW107XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NvbHVtbic6IGZ1bmN0aW9uKHgsIGtleSlcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzQXJyYXkoeCkgPyB4Lm1hcCgodmFsKSA9PiB2YWxba2V5XSkgOiBbXTtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfYmF0Y2gnOiBmdW5jdGlvbih4LCBuLCBtaXNzaW5nID0gJycpXG5cdHtcblx0ICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzTnVtYmVyKG4pXG5cdFx0ICkge1xuXHRcdFx0Y29uc3QgbCA9IHgubGVuZ3RoO1xuXG5cdFx0XHRpZihsID4gMClcblx0XHRcdHtcblx0XHRcdFx0bGV0IGxhc3Q7XG5cblx0XHRcdFx0Y29uc3QgbSA9IE1hdGguY2VpbChsIC8gbikgKiBuO1xuXG5cdFx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IG4pXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChsYXN0ID0geC5zbGljZShpLCBpICsgbikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKGxldCBpID0gbDsgaSA8IG07IGkgKz0gMSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhc3QucHVzaChtaXNzaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogU1RSSU5HUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnc3RhcnRzV2l0aCc6IGZ1bmN0aW9uKHMxLCBzMilcblx0e1xuXHRcdGlmKHRoaXMuaXNTdHJpbmcoczEpXG5cdFx0ICAgJiZcblx0XHQgICB0aGlzLmlzU3RyaW5nKHMyKVxuXHRcdCApIHtcblx0XHRcdGNvbnN0IGJhc2UgPSAweDAwMDAwMDAwMDAwMDAwMDAwMDA7XG5cblx0XHRcdHJldHVybiBzMS5pbmRleE9mKHMyLCBiYXNlKSA9PT0gYmFzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZW5kc1dpdGgnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMxKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhzMilcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBiYXNlID0gczEubGVuZ3RoIC0gczIubGVuZ3RoO1xuXG5cdFx0XHRyZXR1cm4gczEuaW5kZXhPZihzMiwgYmFzZSkgPT09IGJhc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J21hdGNoJzogZnVuY3Rpb24ocywgcmVnZXgpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKCgocykpKVxuXHRcdCAgICYmXG5cdFx0ICAgdGhpcy5pc1N0cmluZyhyZWdleClcblx0XHQgKSB7XG5cdFx0XHRjb25zdCBpZHgxID0gcmVnZXguICBpbmRleE9mICAoJy8nKTtcblx0XHRcdGNvbnN0IGlkeDIgPSByZWdleC5sYXN0SW5kZXhPZignLycpO1xuXG5cdFx0XHRpZihpZHgxID09PSAwIHx8IGlkeDEgPCBpZHgyKVxuXHRcdFx0e1xuXHRcdFx0XHR0cnlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnN1YnN0cmluZyhpZHgxICsgMSwgaWR4MiksIHJlZ2V4LnN1YnN0cmluZyhpZHgyICsgMSkpLnRlc3Qocyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXJyKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0LyogSUdOT1JFICovXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2RlZmF1bHQnOiBmdW5jdGlvbihzMSwgczIpXG5cdHtcblx0XHRyZXR1cm4gczEgfHwgczIgfHwgJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2xvd2VyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b0xvd2VyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VwcGVyJzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gcy50b1VwcGVyQ2FzZSgpIDogJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2NhcGl0YWxpemUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0aWYodGhpcy5pc1N0cmluZyhzKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gcy50cmltKCkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9eXFxTL2csIGZ1bmN0aW9uKGMpIHtcblxuXHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl90aXRsZSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHJldHVybiBzLnRyaW0oKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyg/Ol58XFxzKVxcUy9nLCBmdW5jdGlvbihjKSB7XG5cblx0XHRcdFx0cmV0dXJuIGMudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfdHJpbSc6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMudHJpbSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdfcmVwbGFjZSc6IGZ1bmN0aW9uKHMsIG9sZFN0cnMsIG5ld1N0cnMpXG5cdHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblxuXHRcdGNvbnN0IGwgPSAoKChzKSkpLmxlbmd0aDtcblx0XHRjb25zdCBtID0gb2xkU3Rycy5sZW5ndGg7XG5cdFx0Y29uc3QgbiA9IG5ld1N0cnMubGVuZ3RoO1xuXG5cdFx0aWYobSAhPT0gbilcblx0XHR7XG5cdFx0XHR0aHJvdyAnaW50ZXJuYWwgZXJyb3InO1xuXHRcdH1cblxuX19sMDpcdGZvcihsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDApXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IHMuc3Vic3RyaW5nKGkpO1xuXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgbTsgaiArPSAxKVxuXHRcdFx0e1xuXHRcdFx0XHRpZihwLmluZGV4T2Yob2xkU3Ryc1tqXSkgPT09IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChuZXdTdHJzW2pdKTtcblxuXHRcdFx0XHRcdGkgKz0gb2xkU3Ryc1tqXS5sZW5ndGg7XG5cblx0XHRcdFx0XHRjb250aW51ZSBfX2wwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdC5wdXNoKHMuY2hhckF0KGkrKykpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQuam9pbignJyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0h0bWxYJzogWycmJyAgICAsICdcIicgICAgICwgJzwnICAgLCAnPicgICBdLFxuXHQnX3RleHRUb0h0bWxZJzogWycmYW1wOycsICcmcXVvdDsnLCAnJmx0OycsICcmZ3Q7J10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb1N0cmluZ1gnOiBbJ1xcXFwnICAsICdcXHInICwgJ1xcbicgLCAnXCInICAsICdcXCcnICBdLFxuXHQnX3RleHRUb1N0cmluZ1knOiBbJ1xcXFxcXFxcJywgJ1xcXFxyJywgJ1xcXFxuJywgJ1xcXFxcIicsICdcXFxcXFwnJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnX3RleHRUb0pzb25TdHJpbmdYJzogWydcXFxcJyAgLCAnXFxyJyAsICdcXG4nICwgJ1wiJyAgXSxcblx0J190ZXh0VG9Kc29uU3RyaW5nWSc6IFsnXFxcXFxcXFwnLCAnXFxcXHInLCAnXFxcXG4nLCAnXFxcXFwiJ10sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2VzY2FwZSc6IGZ1bmN0aW9uKHMsIG1vZGUpXG5cdHtcblx0XHRpZih0aGlzLmlzU3RyaW5nKHMpKVxuXHRcdHtcblx0XHRcdHN3aXRjaChtb2RlIHx8ICdodG1sJylcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnaHRtbCc6XG5cdFx0XHRcdGNhc2UgJ2h0bWxfYXR0cic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSHRtbFgsIHRoaXMuX3RleHRUb0h0bWxZKTtcblxuXHRcdFx0XHRjYXNlICdqcyc6XG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvU3RyaW5nWCwgdGhpcy5fdGV4dFRvU3RyaW5nWSk7XG5cblx0XHRcdFx0Y2FzZSAnanNvbic6XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JlcGxhY2UocywgdGhpcy5fdGV4dFRvSnNvblN0cmluZ1gsIHRoaXMuX3RleHRUb0pzb25TdHJpbmdZKTtcblxuXHRcdFx0XHRjYXNlICd1cmwnOlxuXHRcdFx0XHRcdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRyZXR1cm4gcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3VybF9lbmNvZGUnOiBmdW5jdGlvbihzKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBlbmNvZGVVUklDb21wb25lbnQocylcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9ubDJicic6IGZ1bmN0aW9uKHMpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5pc1N0cmluZyhzKSA/IHMucmVwbGFjZSgvXFxuL2csICc8YnIvPicpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgOiAnJ1xuXHRcdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfcmF3JzogZnVuY3Rpb24ocylcblx0e1xuXHRcdHJldHVybiB0aGlzLmlzU3RyaW5nKHMpID8gc1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogJydcblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JlcGxhY2UnOiBmdW5jdGlvbihzLCBkaWN0KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgJiYgdGhpcy5pc01hcChkaWN0KSA/IHRoaXMuX3JlcGxhY2UocywgT2JqZWN0LmtleXMoZGljdCksIE9iamVjdC52YWx1ZXMoZGljdCkpXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9zcGxpdCc6IGZ1bmN0aW9uKHMsIHNlcCwgbWF4KVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaXNTdHJpbmcocykgPyBzLnNwbGl0KHNlcCwgbWF4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIDogW11cblx0XHQ7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0LyogTlVNQkVSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Zvcm1hdF9udW1iZXInOiBmdW5jdGlvbih4KVxuXHR7XG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Zvcm1hdF9kZWNpbWFsX251bWJlcic6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2Ficyc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeCk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX3JvdW5kJzogZnVuY3Rpb24oeCwgbW9kZSlcblx0e1xuXHRcdHN3aXRjaChtb2RlKVxuXHRcdHtcblx0XHRcdGNhc2UgJ2NlaWwnOlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKHgpO1xuXG5cdFx0XHRjYXNlICdmbG9vcic6XG5cdFx0XHRcdHJldHVybiBNYXRoLmZsb29yKHgpO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCh4KTtcblx0XHR9XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnbWluJzogZnVuY3Rpb24oKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Y29uc3QgYXJncyA9IChhcmd1bWVudHMubGVuZ3RoID09PSAxKSAmJiAodGhpcy5pc0FycmF5KGFyZ3VtZW50c1swXSkgfHwgdGhpcy5pc09iamVjdChhcmd1bWVudHNbMF0pKSA/IGFyZ3VtZW50c1swXVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcmd1bWVudHNcblx0XHQ7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcmVzdWx0ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuXG5cdFx0Zm9yKGNvbnN0IGkgaW4gYXJncylcblx0XHR7XG5cdFx0XHRpZighdGhpcy5pc051bWJlcihhcmdzW2ldKSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIE51bWJlci5OYU47XG5cdFx0XHR9XG5cblx0XHRcdGlmKHJlc3VsdCA+IGFyZ3NbaV0pXG5cdFx0XHR7XG5cdFx0XHRcdHJlc3VsdCA9IGFyZ3NbaV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdtYXgnOiBmdW5jdGlvbigpXG5cdHtcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRjb25zdCBhcmdzID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpICYmICh0aGlzLmlzQXJyYXkoYXJndW1lbnRzWzBdKSB8fCB0aGlzLmlzT2JqZWN0KGFyZ3VtZW50c1swXSkpID8gYXJndW1lbnRzWzBdXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFyZ3VtZW50c1xuXHRcdDtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCByZXN1bHQgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cblx0XHRmb3IoY29uc3QgaSBpbiBhcmdzKVxuXHRcdHtcblx0XHRcdGlmKCF0aGlzLmlzTnVtYmVyKGFyZ3NbaV0pKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTnVtYmVyLk5hTjtcblx0XHRcdH1cblxuXHRcdFx0aWYocmVzdWx0IDwgYXJnc1tpXSlcblx0XHRcdHtcblx0XHRcdFx0cmVzdWx0ID0gYXJnc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFJBTkRPTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J3JhbmRvbSc6IGZ1bmN0aW9uKHgpXG5cdHtcblx0XHRjb25zdCB5ID0gTWF0aC5yYW5kb20oKTtcblxuXHRcdGlmKHgpXG5cdFx0e1xuXHRcdFx0aWYodGhpcy5pc0FycmF5KHgpXG5cdFx0XHQgICB8fFxuXHRcdFx0ICAgdGhpcy5pc01hcCh4KVxuXHRcdFx0ICkge1xuXHRcdFx0IFx0Y29uc3QgWCA9IE9iamVjdC5rZXlzKHgpO1xuXG5cdFx0XHRcdHJldHVybiB4W1xuXHRcdFx0XHRcdFhbTWF0aC5mbG9vcihYLmxlbmd0aCAqIHkpXVxuXHRcdFx0XHRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzU3RyaW5nKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4geFtNYXRoLmZsb29yKHgubGVuZ3RoICogeSldO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLmlzTnVtYmVyKHgpKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gTWF0aC5mbG9vcih4ICogeSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0eCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCAqIHkpO1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIERBVEUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2ZpbHRlcl9kYXRlJzogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0LCB0aW1lem9uZSlcblx0e1xuXHRcdGlmKHR5cGVvZiBtb21lbnQgIT09ICd1bmRlZmluZWQnICYmICh0aGlzLmlzRGF0ZShkYXRlKSB8fCB0aGlzLmlzU3RyaW5nKGRhdGUpKSAmJiB0aGlzLmlzU3RyaW5nKGZvcm1hdCkpXG5cdFx0e1xuXHRcdFx0aWYodHlwZW9mIG1vbWVudC50eiAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5pc1N0cmluZyh0aW1lem9uZSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBtb21lbnQoZGF0ZSkudHoodGltZXpvbmUpLmZvcm1hdChmb3JtYXQpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvKiBKU09OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdCdmaWx0ZXJfanNvbl9lbmNvZGUnOiBmdW5jdGlvbih4LCBpbmRlbnQpXG5cdHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoeCwgbnVsbCwgdGhpcy5pc051bWJlcihpbmRlbnQpID8gaW5kZW50IDogMik7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQnZmlsdGVyX2pzb25fanNwYXRoJzogZnVuY3Rpb24oeCwgcGF0aClcblx0e1xuXHRcdHJldHVybiB0eXBlb2YgSlNQYXRoICE9PSAndW5kZWZpbmVkJyA/IEpTUGF0aC5hcHBseShwYXRoLCB4KVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdXG5cdFx0O1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8qIFRFTVBMQVRFUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0J2luY2x1ZGUnOiBmdW5jdGlvbihmaWxlTmFtZSwgdmFyaWFibGVzID0ge30sIHdpdGhDb250ZXh0ID0gdHJ1ZSwgaWdub3JlTWlzc2luZyA9IGZhbHNlKVxuXHR7XG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoZmlsZU5hbWUgaW4gYW1pVHdpZy5lbmdpbmUudG1wbHMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgdGVtcCA9IHt9O1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYod2l0aENvbnRleHQpXG5cdFx0XHR7XG5cdFx0XHRcdGZvcihjb25zdCBpIGluIGFtaVR3aWcuZW5naW5lLmRpY3QpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZW1wW2ldID0gYW1pVHdpZy5lbmdpbmUuZGljdFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0aWYodmFyaWFibGVzKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IoY29uc3QgaSBpbiAvKi0qL3ZhcmlhYmxlcy8qLSovKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGVtcFtpXSA9IC8qLSovdmFyaWFibGVzLyotKi9baV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdHJldHVybiBhbWlUd2lnLmVuZ2luZS5yZW5kZXIoYW1pVHdpZy5lbmdpbmUudG1wbHNbZmlsZU5hbWVdLCB0ZW1wKTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0fVxuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0aWYoIWlnbm9yZU1pc3NpbmcpXG5cdFx0e1xuXHRcdFx0dGhyb3cgJ3J1bnRpbWUgZXJyb3IsIGNvdWxkIG5vdCBvcGVuIGAnICsgZmlsZU5hbWUgKyAnYCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHR9LFxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuYW1pVHdpZy5zdGRsaWIuZmlsdGVyX2UgPSBhbWlUd2lnLnN0ZGxpYi5maWx0ZXJfZXNjYXBlO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKiBhbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5hbWlUd2lnLmV4cHIuaW50ZXJwcmV0ZXIgPSB7XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0X2dldEpTOiBmdW5jdGlvbihub2RlKVxuXHR7XG5cdFx0bGV0IEw7XG5cdFx0bGV0IHg7XG5cdFx0bGV0IGxlZnQ7XG5cdFx0bGV0IHJpZ2h0O1xuXHRcdGxldCBvcGVyYXRvcjtcblxuXHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdHtcblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogTFNUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkxTVDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKC8qLS0tLS0qLyB0aGlzLl9nZXRKUyhub2RlLmxpc3RbaV0pKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuICdbJyArIEwuam9pbignLCcpICsgJ10nO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdC8qIERJQyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ESUM6XG5cdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0TCA9IFtdO1xuXG5cdFx0XHRcdGZvcihjb25zdCBpIGluIG5vZGUuZGljdClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdEwucHVzaChpICsgJzonICsgdGhpcy5fZ2V0SlMobm9kZS5kaWN0W2ldKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdHJldHVybiAneycgKyBMLmpvaW4oJywnKSArICd9JztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGVU4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRlVOOlxuXHRcdCBcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdCBcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0cmV0dXJuIG5vZGUubm9kZVZhbHVlICsgJygnICsgTC5qb2luKCcsJykgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVkFSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlZBUjpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRMID0gW107XG5cblx0XHRcdFx0Zm9yKGNvbnN0IGkgaW4gbm9kZS5saXN0KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0TC5wdXNoKCdbJyArIHRoaXMuX2dldEpTKG5vZGUubGlzdFtpXSkgKyAnXScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRyZXR1cm4gTC5sZW5ndGggPiAwID8gbm9kZS5ub2RlVmFsdWUgKyBMLmpvaW4oJycpIDogbm9kZS5ub2RlVmFsdWU7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogVEVSTUlOQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlRFUk1JTkFMOlxuXG5cdFx0XHRcdHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSVM6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXG5cdFx0XHRcdHN3aXRjaChub2RlLm5vZGVSaWdodC5ub2RlVHlwZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5ERUZJTkVEOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0RlZmluZWQoJyArIGxlZnQgKyAnKSc7XG5cblx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTlVMTDpcblx0XHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNOdWxsKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVNUFRZOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0VtcHR5KCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLklURVJBQkxFOlxuXHRcdFx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5pc0l0ZXJhYmxlKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVWRU46XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzRXZlbignICsgbGVmdCArICcpJztcblxuXHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5PREQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzT2RkKCcgKyBsZWZ0ICsgJyknO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRocm93ICdpbnRlcm5hbCBlcnJvcic7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBJTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuSU46XG5cblx0XHRcdFx0aWYobm9kZS5ub2RlUmlnaHQubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0UpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLmlzSW5PYmplY3QoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR4ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cblx0XHRcdFx0XHRsZWZ0ID0gbm9kZS5ub2RlUmlnaHQubm9kZUxlZnQubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHJpZ2h0ID0gbm9kZS5ub2RlUmlnaHQubm9kZVJpZ2h0Lm5vZGVWYWx1ZTtcblxuXHRcdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuaXNJblJhbmdlKCcgKyB4ICsgJywnICsgbGVmdCArICcsJyArIHJpZ2h0ICsgJyknO1xuXHRcdFx0XHR9XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogU1RBUlRTX1dJVEggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLlNUQVJUU19XSVRIOlxuXG5cdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0cmlnaHQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVSaWdodCk7XG5cblx0XHRcdFx0cmV0dXJuICdhbWlUd2lnLnN0ZGxpYi5zdGFydHNXaXRoKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRU5EU19XSVRIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkVORFNfV0lUSDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIuZW5kc1dpdGgoJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBNQVRDSEVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTUFUQ0hFUzpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnYW1pVHdpZy5zdGRsaWIubWF0Y2goJyArIGxlZnQgKyAnLCcgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBSQU5HRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUkFOR0U6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ2FtaVR3aWcuc3RkbGliLnJhbmdlKCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9UICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVDpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZVZhbHVlWzBdID09PSAnLicpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZXR1cm4gbGVmdCArICcuJyArIHJpZ2h0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJldHVybiBsZWZ0ICsgJ1snICsgcmlnaHQgKyAnXSc7XG5cdFx0XHRcdH1cblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBGTERJViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuRkxESVY6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGguZmxvb3IoJyArIGxlZnQgKyAnLycgKyByaWdodCArICcpJztcblxuXHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdFx0XHQvKiBQT1dFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuUE9XRVI6XG5cblx0XHRcdFx0bGVmdCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpO1xuXHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRyZXR1cm4gJ01hdGgucG93KCcgKyBsZWZ0ICsgJywnICsgcmlnaHQgKyAnKSc7XG5cblx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0LyogRE9VQkxFX1FVRVNUSU9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkRPVUJMRV9RVUVTVElPTjpcblxuXHRcdFx0XHRsZWZ0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlTGVmdCk7XG5cdFx0XHRcdHJpZ2h0ID0gdGhpcy5fZ2V0SlMobm9kZS5ub2RlUmlnaHQpO1xuXG5cdFx0XHRcdHJldHVybiAnKCgnICsgbGVmdCArICcpIHx8ICgnICsgcmlnaHQgKyAnKSknO1xuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHRcdFx0LyogVU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRpZihub2RlLm5vZGVMZWZ0ID09PSBudWxsXG5cdFx0XHRcdCAgICYmXG5cdFx0XHRcdCAgIG5vZGUubm9kZVJpZ2h0ICE9PSBudWxsXG5cdFx0XHRcdCApIHtcblx0XHRcdFx0XHRvcGVyYXRvciA9IChub2RlLm5vZGVUeXBlICE9PSBhbWlUd2lnLmV4cHIudG9rZW5zLk5PVCkgPyBub2RlLm5vZGVWYWx1ZSA6ICchJztcblxuXHRcdFx0XHRcdHJldHVybiBvcGVyYXRvciArICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KSArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgPT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdG9wZXJhdG9yID0gKG5vZGUubm9kZVR5cGUgIT09IGFtaVR3aWcuZXhwci50b2tlbnMuTk9UKSA/IG5vZGUubm9kZVZhbHVlIDogJyEnO1xuXG5cdFx0XHRcdFx0cmV0dXJuICcoJyArIHRoaXMuX2dldEpTKG5vZGUubm9kZUxlZnQpICsgJyknICsgb3BlcmF0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHQvKiBCSU5BUlkgT1BFUkFUT1IgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdGlmKG5vZGUubm9kZUxlZnQgIT09IG51bGxcblx0XHRcdFx0ICAgJiZcblx0XHRcdFx0ICAgbm9kZS5ub2RlUmlnaHQgIT09IG51bGxcblx0XHRcdFx0ICkge1xuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5vZGVUeXBlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuTE9HSUNBTF9PUjpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnfHwnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5MT0dJQ0FMX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJiYnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX09SOlxuXHRcdFx0XHRcdFx0XHRvcGVyYXRvciA9ICd8Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0XHRcdFx0XHRjYXNlIGFtaVR3aWcuZXhwci50b2tlbnMuQklUV0lTRV9YT1I6XG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yID0gJ14nO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRcdFx0XHRcdGNhc2UgYW1pVHdpZy5leHByLnRva2Vucy5CSVRXSVNFX0FORDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnJic7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0Y2FzZSBhbWlUd2lnLmV4cHIudG9rZW5zLkNPTkNBVDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSAnKyc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0b3BlcmF0b3IgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxlZnQgPSB0aGlzLl9nZXRKUyhub2RlLm5vZGVMZWZ0KTtcblx0XHRcdFx0XHRyaWdodCA9IHRoaXMuX2dldEpTKG5vZGUubm9kZVJpZ2h0KTtcblxuXHRcdFx0XHRcdHJldHVybiAnKCcgKyBsZWZ0ICsgb3BlcmF0b3IgKyByaWdodCArICcpJztcblx0XHRcdFx0fVxuXG5cdFx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XHR9XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRnZXRKUzogZnVuY3Rpb24oZXhwcilcblx0e1xuXHRcdHJldHVybiAnKGZ1bmN0aW9uKF8pIHsgcmV0dXJuICcgKyB0aGlzLl9nZXRKUyhleHByLnJvb3ROb2RlKSArICc7IH0pJztcblx0fSxcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGV2YWw6IGZ1bmN0aW9uKGV4cHIsIF8pXG5cdHtcblx0XHRfID0gXyB8fCB7fTtcblxuXHRcdHJldHVybiBldmFsKHRoaXMuZ2V0SlMoZXhwcikpLmNhbGwoXywgXyk7XG5cdH0sXG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xufSkoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFlBQVc7RUFDWixZQUFZOztF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QUMsT0FBTSxHQUFHLEtBQUtBLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUSxJQUFJO01BQ3BGLENBQUMsTUFFRDtRQUNDQSxDQUFDLEdBQUdGLENBQUMsQ0FBQ1IsT0FBTyxDQUFDUyxjQUFjLENBQUM7UUFFN0IsT0FBT0MsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUNHLGNBQWMsQ0FBQ0wsQ0FBQyxFQUFFQyxjQUFjLENBQUMsR0FBR0EsY0FBYyxHQUFHLElBQUk7TUFDcEY7SUFDRCxDQUFDO0lBRUQ7O0lBRUFLLFNBQVMsRUFBRSxDQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDOUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzlDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDOUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzlDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDOUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzlDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDOUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzlDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDOUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUM5QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQzlDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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
