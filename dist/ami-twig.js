'use strict';

/*!
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {};

/*-------------------------------------------------------------------------*/
/* exports.amiTwig                                                         */
/*-------------------------------------------------------------------------*/

if (typeof exports !== 'undefined') {
	amiTwig.fs = require('fs');

	module.exports.amiTwig = amiTwig;
}

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.tokenizer                                                       */
/*-------------------------------------------------------------------------*/

amiTwig.tokenizer = {
	/*-----------------------------------------------------------------*/

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
		    token = void 0,
		    c = void 0;

		__l0: while (i < l) {
			c = code.charAt(0);

			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if (c === '\n') {
				line++;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* EAT REGEXES                                     */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                       */
			/*-------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

			/*			continue __l0;
    */
			/*-------------------------------------------------*/
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

	/*-----------------------------------------------------------------*/

	_match: function _match(s, stringOrRegExp) {
		var m = void 0;

		if (stringOrRegExp instanceof RegExp) {
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, /*-*/m[0] /*-*/) ? /*-*/m[0] /*-*/ : null;
		} else {
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*-----------------------------------------------------------------*/

	_alnum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	_checkNextChar: function _checkNextChar(s, token) {
		var length = token.length;

		var charCode2 = s.charCodeAt(length - 0);
		var charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2) || this._alnum[charCode2] === 0 || this._alnum[charCode1] === 0;
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.expr = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.tokens                                                     */
/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens = {
	/*-----------------------------------------------------------------*/

	$init: function $init() {
		/*---------------------------------------------------------*/
		/* COMPOSITE TOKENS                                        */
		/*---------------------------------------------------------*/

		this.IS_XXX = [this.DEFINED, this.NULL, this.EMPTY, this.ITERABLE, this.EVEN, this.ODD];

		this.XXX_WITH = [this.STARTS_WITH, this.ENDS_WITH];

		this.PLUS_MINUS = [this.CONCAT, this.PLUS, this.MINUS];

		this.MUL_FLDIV_DIV_MOD = [this.MUL, this.FLDIV, this.DIV, this.MOD];

		this.RX = [this.RP, this.RB1];

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
	/* REAL TOKENS                                                     */
	/*-----------------------------------------------------------------*/

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
	COLON: 127,
	DOT: 128,
	COMMA: 129,
	PIPE: 130,
	LP: 131,
	RP: 132,
	LB1: 133,
	RB1: 134,
	LB2: 135,
	RB2: 136,
	SID: 137,
	TERMINAL: 138,

	/*-----------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                  */
	/*-----------------------------------------------------------------*/

	LST: 200,
	DIC: 201,
	FUN: 202,
	VAR: 203

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                  */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function (code, line) {
	/*-----------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*-----------------------------------------------------------------*/

	this._tokenDefs = ['or', 'and', 'b-or', 'b-xor', 'b-and', 'not', 'is', 'defined', 'null', 'empty', 'iterable', 'even', 'odd', '===', '==', '!==', '!=', '<=', '>=', '<', '>', /^starts\s+with/, /^ends\s+with/, 'matches', 'in', '..', '~', '+', '-', '**', '*', '//', '/', '%', ':', '.', ',', '|', '(', ')', '[', ']', '{', '}', 'true', 'false', /^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^'])*'/, /^"(\\"|[^"])*"/, /^[a-zA-Z_$][a-zA-Z0-9_$]*/];

	/*-----------------------------------------------------------------*/

	this._tokenTypes = [amiTwig.expr.tokens.LOGICAL_OR, amiTwig.expr.tokens.LOGICAL_AND, amiTwig.expr.tokens.BITWISE_OR, amiTwig.expr.tokens.BITWISE_XOR, amiTwig.expr.tokens.BITWISE_AND, amiTwig.expr.tokens.NOT, amiTwig.expr.tokens.IS, amiTwig.expr.tokens.DEFINED, amiTwig.expr.tokens.NULL, amiTwig.expr.tokens.EMPTY, amiTwig.expr.tokens.ITERABLE, amiTwig.expr.tokens.EVEN, amiTwig.expr.tokens.ODD, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.CMP_OP, amiTwig.expr.tokens.STARTS_WITH, amiTwig.expr.tokens.ENDS_WITH, amiTwig.expr.tokens.MATCHES, amiTwig.expr.tokens.IN, amiTwig.expr.tokens.RANGE, amiTwig.expr.tokens.CONCAT, amiTwig.expr.tokens.PLUS, amiTwig.expr.tokens.MINUS, amiTwig.expr.tokens.POWER, amiTwig.expr.tokens.MUL, amiTwig.expr.tokens.FLDIV, amiTwig.expr.tokens.DIV, amiTwig.expr.tokens.MOD, amiTwig.expr.tokens.COLON, amiTwig.expr.tokens.DOT, amiTwig.expr.tokens.COMMA, amiTwig.expr.tokens.PIPE, amiTwig.expr.tokens.LP, amiTwig.expr.tokens.RP, amiTwig.expr.tokens.LB1, amiTwig.expr.tokens.RB1, amiTwig.expr.tokens.LB2, amiTwig.expr.tokens.RB2, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.TERMINAL, amiTwig.expr.tokens.SID];

	/*-----------------------------------------------------------------*/

	this.$init = function (code, line) {
		/*---------------------------------------------------------*/

		var result = amiTwig.tokenizer.tokenize(code, line, this._spaces, this._tokenDefs, this._tokenTypes, true);

		/*---------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.next = function () {
		var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

		this.i += n;
	};

	/*-----------------------------------------------------------------*/

	this.isEmpty = function () {
		return this.i >= this.tokens.length;
	};

	/*-----------------------------------------------------------------*/

	this.peekToken = function () {
		return this.tokens[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.peekType = function () {
		return this.types[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.checkType = function (type) {
		if (this.i < this.tokens.length) {
			var TYPE = this.types[this.i];

			return type instanceof Array ? type.indexOf(TYPE) >= 0 : type === TYPE;
		}

		return false;
	};

	/*-----------------------------------------------------------------*/

	this.$init(code, line);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Compiler                                                   */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Compiler = function (code, line) {

	this.$init(code, line);
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.Compiler.prototype = {
	/*-----------------------------------------------------------------*/

	$init: function $init(code, line) {
		/*---------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(this.code = code, this.line = line);

		/*---------------------------------------------------------*/

		this.rootNode = this.parseFilter();

		/*---------------------------------------------------------*/

		if (this.tokenizer.isEmpty() === false) {
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	dump: function dump() {
		return this.rootNode.dump();
	},

	/*-----------------------------------------------------------------*/

	parseFilter: function parseFilter() {
		var left = this.parseLogicalOr(),
		    node = void 0,
		    temp = void 0;

		/*---------------------------------------------------------*/
		/* Filter : LogicalOr ('|' Dot1)*                          */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.PIPE)) {
			this.tokenizer.next();

			node = this.parseDot1(true);

			for (temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {}

			temp.list.unshift(left);

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseLogicalOr: function parseLogicalOr() {
		var left = this.parseLogicalAnd(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*               */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseLogicalAnd: function parseLogicalAnd() {
		var left = this.parseBitwiseOr(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*               */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseOr: function parseBitwiseOr() {
		var left = this.parseBitwiseXor(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*             */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseXor: function parseBitwiseXor() {
		var left = this.parseBitwiseAnd(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*           */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseBitwiseAnd: function parseBitwiseAnd() {
		var left = this.parseNot(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Not ('b-and' Not)*                         */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseNot();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseNot: function parseNot() {
		var right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* Not : 'not' Comp                                        */
		/*---------------------------------------------------------*/

		if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseComp();

			node.nodeLeft = right;
			node.nodeRight = null;

			return node;
		}

		/*---------------------------------------------------------*/
		/*     | Comp                                              */
		/*---------------------------------------------------------*/

		return this.parseComp();
	},

	/*-----------------------------------------------------------------*/

	parseComp: function parseComp() {
		var left = this.parseAddSub(),
		    right = void 0,
		    node = void 0,
		    swap = void 0;

		/*---------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)    */
		/*---------------------------------------------------------*/

		/**/if (this.tokenizer.checkType(amiTwig.expr.tokens.IS)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			swap = node;
			/* swap 'is' and 'not' */

			if (this.tokenizer.checkType(amiTwig.expr.tokens.NOT)) {
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = swap;
				node.nodeRight = null;
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

		/*---------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub               */
		/*---------------------------------------------------------*/

		else if (this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP)) {
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				right = this.parseAddSub();

				node.nodeLeft = left;
				node.nodeRight = right;

				left = node;
			}

			/*---------------------------------------------------------*/
			/*      | AddSub ('starts' | 'ends') `with` AddSub         */
			/*---------------------------------------------------------*/

			else if (this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH)) {
					node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					right = this.parseAddSub();

					node.nodeLeft = left;
					node.nodeRight = right;

					left = node;
				}

				/*---------------------------------------------------------*/
				/*      | AddSub 'matches' AddSub                          */
				/*---------------------------------------------------------*/

				else if (this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES)) {
						node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
						this.tokenizer.next();

						right = this.parseAddSub();

						node.nodeLeft = left;
						node.nodeRight = right;

						left = node;
					}

					/*---------------------------------------------------------*/
					/*      | AddSub 'in' AddSub                               */
					/*---------------------------------------------------------*/

					else if (this.tokenizer.checkType(amiTwig.expr.tokens.IN)) {
							node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
							this.tokenizer.next();

							right = this.parseAddSub();

							node.nodeLeft = left;
							node.nodeRight = right;

							left = node;
						}

		/*---------------------------------------------------------*/
		/*      | AddSub                                           */
		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseAddSub: function parseAddSub() {
		var left = this.parseMulDiv(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseMulDiv: function parseMulDiv() {
		var left = this.parsePlusMinus(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)**/
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePlusMinus();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parsePlusMinus: function parsePlusMinus() {
		var left = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* PlusMinus : ('-' | '+') Power                           */
		/*---------------------------------------------------------*/

		if (this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			left = this.parsePower();

			node.nodeLeft = left;
			node.nodeRight = null;

			return node;
		}

		/*---------------------------------------------------------*/
		/*              | Dot1                                     */
		/*---------------------------------------------------------*/

		return this.parsePower();
	},

	/*-----------------------------------------------------------------*/

	parsePower: function parsePower() {
		var left = this.parseDot1(),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* Power : Dot1 ('**' Dot1)*                               */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.POWER)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseDot1();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseDot1: function parseDot1(isFilter) {
		var node = this.parseDot2(isFilter);

		if (node) {
			/*-------------------------------------------------*/

			var temp = node;

			for (; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft) {}

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
		}

		return node;
	},

	/*-----------------------------------------------------------------*/

	parseDot2: function parseDot2(isFilter) {
		var left = this.parseDot3(isFilter),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                 */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.DOT)) {
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot3(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseDot3: function parseDot3(isFilter) {
		var left = this.parseX(isFilter),
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* parseDot3 : X ('[' Filter ']')*                         */
		/*---------------------------------------------------------*/

		while (this.tokenizer.checkType(amiTwig.expr.tokens.LB1)) {
			this.tokenizer.next();

			right = this.parseFilter();

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

		/*---------------------------------------------------------*/
		/*         | X                                             */
		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	parseX: function parseX(isFilter) {
		var node = void 0;

		/*---------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal          */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/
		/* SYNTAX ERROR                                            */
		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	parseGroup: function parseGroup() {
		var node = void 0;

		/*---------------------------------------------------------*/
		/* Group : '(' Filter ')'                                  */
		/*---------------------------------------------------------*/

		if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
			this.tokenizer.next();

			node = this.parseFilter();

			if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
				this.tokenizer.next();

				return node;
			} else {
				throw 'syntax error, line `' + this.line + '`, `)` expected';
			}
		}

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	parseArray: function parseArray() {
		var node = void 0,
		    list = void 0;

		/*---------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	parseObject: function parseObject() {
		var node = void 0,
		    dict = void 0;

		/*---------------------------------------------------------*/
		/* Object : '{' Doublets '}'                               */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	},

	/*-----------------------------------------------------------------*/

	parseFunVar: function parseFunVar(isFilter) {
		var node = void 0;

		if (this.tokenizer.checkType(amiTwig.expr.tokens.SID)) {
			node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());

			node.q = true;

			this.tokenizer.next();

			/*-------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                   */
			/*-------------------------------------------------*/

			/**/if (this.tokenizer.checkType(amiTwig.expr.tokens.LP)) {
				this.tokenizer.next();

				node.list = this._parseSinglets();

				if (this.tokenizer.checkType(amiTwig.expr.tokens.RP)) {
					this.tokenizer.next();

					node.nodeType = amiTwig.expr.tokens.FUN;
				} else {
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}
			}

			/*-------------------------------------------------*/
			/*        | SID                                    */
			/*-------------------------------------------------*/

			else {
					node.nodeType = isFilter ? amiTwig.expr.tokens.FUN : amiTwig.expr.tokens.VAR;

					node.list = [];
				}

			/*-------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	_parseSinglet: function _parseSinglet(result) {
		result.push(this.parseFilter());
	},

	/*-----------------------------------------------------------------*/

	_parseDoublet: function _parseDoublet(result) {
		if (this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL)) {
			var key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if (this.tokenizer.checkType(amiTwig.expr.tokens.COLON)) {
				/*				const colon = this.tokenizer.peekToken();
     */this.tokenizer.next();

				/*-----------------------------------------*/

				result[key] = this.parseFilter();

				/*-----------------------------------------*/
			} else {
				throw 'syntax error, line `' + this.line + '`, `:` expected';
			}
		} else {
			throw 'syntax error, line `' + this.line + '`, terminal expected';
		}
	},

	/*-----------------------------------------------------------------*/

	parseTerminal: function parseTerminal() {
		var left = void 0,
		    right = void 0,
		    node = void 0;

		/*---------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                             */
		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		return null;
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Node                                                      */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Node = function (nodeType, nodeValue) {

	this.$init(nodeType, nodeValue);
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.Node.prototype = {
	/*-----------------------------------------------------------------*/

	$init: function $init(nodeType, nodeValue) {
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	},

	/*-----------------------------------------------------------------*/

	_dump: function _dump(nodes, edges, pCnt) {
		var CNT = void 0;

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

	/*-----------------------------------------------------------------*/

	dump: function dump() {
		var nodes = [];
		var edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl.Compiler                                                   */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler = function (tmpl) {

	this.$init(tmpl);
};

/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler.prototype = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s+(.*?)\s*%\}/m,

	COMMENT_RE: /\{#\s*(.*?)\s*#\}/g,

	/*-----------------------------------------------------------------*/

	_count: function _count(s) {
		var result = 0;

		var l = s.length;

		for (var i = 0; i < l; i++) {
			if (s[i] === '\n') result++;
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	$init: function $init(tmpl) {
		/*---------------------------------------------------------*/

		var line = 1;

		var column = void 0;
		var COLUMN = void 0;

		/*---------------------------------------------------------*/

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

		/*---------------------------------------------------------*/

		var stack1 = [this.rootNode];
		var stack2 = [0x00000000000];

		var item = void 0;

		/*---------------------------------------------------------*/

		for (tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN)) {
			/*-------------------------------------------------*/

			var curr = stack1[stack1.length - 1];
			var indx = stack2[stack2.length - 1];

			/*-------------------------------------------------*/

			var m = tmpl.match(this.STATEMENT_RE);

			/*-------------------------------------------------*/

			if (m === null) {
				/*-----------------------------------------*/

				line += this._count(tmpl);

				/*-----------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: tmpl
				});

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/

			var match = m[0];
			var keyword = m[1];
			var expression = m[2];

			column = m.index + 0x0000000000;
			COLUMN = m.index + match.length;

			var value = tmpl.substr(0, column);
			var VALUE = tmpl.substr(0, COLUMN);

			/*-------------------------------------------------*/

			line += this._count(VALUE);

			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

			switch (keyword) {
				/*-----------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

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

				/*-----------------------------------------*/

				case 'else':

					if (curr['keyword'] !== 'if') {
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@true',
						list: []
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*-----------------------------------------*/

				case 'endif':

					if (curr['keyword'] !== 'if') {
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				case 'endfor':

					if (curr['keyword'] !== 'for') {
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	dump: function dump() {
		return JSON.stringify(this.rootNode, null, 2);
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.engine                                                          */
/*-------------------------------------------------------------------------*/

amiTwig.engine = {
	/*-----------------------------------------------------------------*/

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	/*-----------------------------------------------------------------*/

	_render: function _render(result, item) {
		var _this = this;

		var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		var m = void 0;

		var expression = void 0;

		this.dict = dict;

		switch (item.keyword) {
			/*-------------------------------------------------*/
			/* DO                                              */
			/*-------------------------------------------------*/

			case 'do':
				{
					/*-----------------------------------------*/

					amiTwig.expr.cache.eval(item.expression, item.line, dict);

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
			/* SET                                             */
			/*-------------------------------------------------*/

			case 'set':
				{
					/*-----------------------------------------*/

					m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

					if (!m) {
						throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
					}

					/*-----------------------------------------*/

					dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
			/* @TEXT                                           */
			/*-------------------------------------------------*/

			case '@text':
				{
					/*-----------------------------------------*/

					result.push(item.value.replace(this.VARIABLE_RE, function (match, expression) {

						var value = amiTwig.expr.cache.eval(expression, item.line, dict);

						return value !== null && value !== undefined ? value : '';
					}));

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
			/* IF                                              */
			/*-------------------------------------------------*/

			case 'if':
			case '@root':
				{
					/*-----------------------------------------*/

					item.blocks.every(function (block) {

						expression = block.expression;

						if (expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict)) {
							block.list.forEach(function (item) {

								_this._render(result, item, dict);
							});

							return false;
						}

						return true;
					});

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
			/* FOR                                             */
			/*-------------------------------------------------*/

			case 'for':
				{
					/*-----------------------------------------*/

					m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

					if (!m) {
						throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
					}

					/*-----------------------------------------*/

					var symb = m[1];
					var expr = m[2];

					/*-----------------------------------------*/

					var value = amiTwig.expr.cache.eval(expr, item.line, dict);

					/*-----------------------------------------*/

					var typeName = Object.prototype.toString.call(value);

					if (typeName === '[object Object]') {
						value = Object.keys(value);
					} else {
						if (typeName !== '[object Array]' && typeName !== '[object String]') {
							throw 'syntax error, line `' + item.line + '`, right operande not iterable';
						}
					}

					/*-----------------------------------------*/

					var old1 = dict[symb];
					var old2 = dict['loop'];

					/*-----------------------------------------*/

					var k = 0x0000000000;
					var l = value.length;

					dict.loop = { length: l };

					var list = item.blocks[0].list;

					for (var i in value) {
						dict[symb] = value[i];

						dict.loop.first = k === 0 - 0;
						dict.loop.last = k === l - 1;

						dict.loop.index0 = k;
						k++;
						dict.loop.index = k;

						for (var j in list) {
							this._render(result, list[j], dict);
						}
					}

					/*-----------------------------------------*/

					dict['loop'] = old2;
					dict[symb] = old1;

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
			/* INCLUDE                                         */
			/*-------------------------------------------------*/

			case 'include':
				{
					/*-----------------------------------------*/

					var m_1_ = item.expression,
					    with_subexpr = void 0,
					    with_context = void 0;

					/**/if (m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)) {
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

					/*-----------------------------------------*/

					var fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

					if (Object.prototype.toString.call(fileName) !== '[object String]') {
						throw 'runtime error, line `' + item.line + '`, string expected';
					}

					/*-----------------------------------------*/

					var variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

					if (Object.prototype.toString.call(variables) !== '[object Object]') {
						throw 'runtime error, line `' + item.line + '`, object expected';
					}

					/*-----------------------------------------*/

					result.push(amiTwig.stdlib.include(fileName, variables, with_context, false));

					/*-----------------------------------------*/

					break;
				}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function render(tmpl) {
		var dict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var result = [];

		switch (Object.prototype.toString.call(tmpl)) {
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl /*--------------*/, dict);
				break;
		}

		return result.join('');
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.cache                                                      */
/*-------------------------------------------------------------------------*/

amiTwig.expr.cache = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	eval: function _eval(expression, line, _) {
		/*---------------------------------------------------------*/

		var f = void 0;

		if (expression in this.dict) {
			f = this.dict[expression];
		} else {
			f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler(expression, line)));
		}

		/*---------------------------------------------------------*/

		if (!_) _ = {};

		return f.call(_, _);

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.date                                                            */
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.ajax                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.ajax = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	get: function get(url, done, fail) {
		var txt = void 0;

		/*---------------------------------------------------------*/

		if (url in this.dict) {
			if (done) {
				done(this.dict[url]);
			}

			return;
		}

		/*---------------------------------------------------------*/

		if (amiTwig.fs) {
			/*-------------------------------------------------*/
			/* NODEJS                                          */
			/*-------------------------------------------------*/

			try {
				txt = this.dict[url] = amiTwig.fs.readFileSync(url, 'utf8');

				if (done) {
					done(txt);
				}
			} catch (err) {
				if (fail) {
					fail(err);
				}
			}

			/*-------------------------------------------------*/
		} else {
			/*-------------------------------------------------*/
			/* BROWSER                                         */
			/*-------------------------------------------------*/

			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open('GET', url, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------*/

			if (xmlHttpRequest.status === 200) {
				txt = this.dict[url] = xmlHttpRequest.responseText;

				if (done) {
					done(txt);
				}
			} else {
				txt = /**************/xmlHttpRequest.responseText;

				if (fail) {
					fail(txt);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

amiTwig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isUndefined': function isUndefined(x) {
		return x === undefined;
	},

	/*-----------------------------------------------------------------*/

	'isDefined': function isDefined(x) {
		return x !== undefined;
	},

	/*-----------------------------------------------------------------*/

	'isNull': function isNull(x) {
		return x === null;
	},

	/*-----------------------------------------------------------------*/

	'isNotNull': function isNotNull(x) {
		return x !== null;
	},

	/*-----------------------------------------------------------------*/

	'isEmpty': function isEmpty(x) {
		if (x === null || x === false || x === '') {
			return true;
		}

		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object Array]' && x.length === 0 || typeName === '[object Object]' && Object.keys(x).length === 0;
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function isNumber(x) {
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*-----------------------------------------------------------------*/

	'isString': function isString(x) {
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*-----------------------------------------------------------------*/

	'isArray': function isArray(x) {
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*-----------------------------------------------------------------*/

	'isObject': function isObject(x) {
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*-----------------------------------------------------------------*/

	'isIterable': function isIterable(x) {
		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]' || typeName === '[object Array]' || typeName === '[object Object]';
	},

	/*-----------------------------------------------------------------*/

	'isEven': function isEven(x) {
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*-----------------------------------------------------------------*/

	'isOdd': function isOdd(x) {
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isInObject': function isInObject(x, y) {
		if (this.isArray(y) || this.isString(y)) {
			return y.indexOf(x) >= 0;
		}

		if (this.isObject(y)) {
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'range': function range(x1, x2) {
		var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

		var result = [];

		/**/if (this.isNumber(x1) && this.isNumber(x2)) {
			for (var i = /*---*/x1 /*---*/; i <= /*---*/x2 /*---*/; i += step) {
				result.push( /*---------------*/i);
			}
		} else if (this.isString(x1) && x1.length === 1 && this.isString(x2) && x2.length === 1) {
			for (var _i2 = x1.charCodeAt(0); _i2 <= x2.charCodeAt(0); _i2 += step) {
				result.push(String.fromCharCode(_i2));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	'filter_length': function filter_length(x) {
		if (this.isString(x) || this.isArray(x)) {
			return x.length;
		}

		if (this.isObject(x)) {
			return Object.keys(x).length;
		}

		return 0;
	},

	/*-----------------------------------------------------------------*/

	'filter_first': function filter_first(x) {
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_last': function filter_last(x) {
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_slice': function filter_slice(x, idx1, idx2) {
		return this.isString(x) || this.isArray(x) ? x.slice(idx1, idx2) : null;
	},

	/*-----------------------------------------------------------------*/

	'filter_merge': function filter_merge() {
		if (arguments.length > 1) {
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/

			if (this.isArray(arguments[0])) {
				var _L = [];

				for (var _i3 in arguments) {
					var _item = arguments[_i3];

					if (!this.isArray(_item)) {
						return null;
					}

					for (var j in _item) {
						_L.push(_item[j]);
					}
				}

				return _L;
			}

			/*-------------------------------------------------*/

			if (this.isObject(arguments[0])) {
				var D = {};

				for (var _i4 in arguments) {
					var _item2 = arguments[_i4];

					if (!this.isObject(_item2)) {
						return null;
					}

					for (var _j in _item2) {
						D[_j] = _item2[_j];
					}
				}

				return D;
			}

			/*-------------------------------------------------*/
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	'filter_sort': function filter_sort(x) {
		return this.isArray(x) ? x.sort() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_reverse': function filter_reverse(x) {
		return this.isArray(x) ? x.reverse() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_join': function filter_join(x, sep) {
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_keys': function filter_keys(x) {
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	'startsWith': function startsWith(s1, s2) {
		if (this.isString(s1) && this.isString(s2)) {
			var base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'endsWith': function endsWith(s1, s2) {
		if (this.isString(s1) && this.isString(s2)) {
			var base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'filter_default': function filter_default(s1, s2) {
		return s1 || s2 || '';
	},

	/*-----------------------------------------------------------------*/

	'filter_lower': function filter_lower(s) {
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_upper': function filter_upper(s) {
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_capitalize': function filter_capitalize(s) {
		if (this.isString(s)) {
			return s.trim().toLowerCase().replace(/^\S/g, function (c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_title': function filter_title(s) {
		if (this.isString(s)) {
			return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function (c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_trim': function filter_trim(s) {
		return this.isString(s) ? s.trim() : '';
	},

	/*-----------------------------------------------------------------*/

	'_replace': function _replace(s, oldStrs, newStrs) {
		var result = [];

		var l = s.length;

		__l0: for (var i = 0; i < l;) {
			for (var j in oldStrs) {
				if (s.substring(i).indexOf(oldStrs[j]) === 0) {
					result.push(newStrs[j]);

					i += oldStrs[j].length;

					continue __l0;
				}
			}

			result.push(s.charAt(i++));
		}

		return result.join('');
	},

	/*-----------------------------------------------------------------*/

	'_textToHtmlX': ['&', '"', '<', '>'],
	'_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*-----------------------------------------------------------------*/

	'_textToStringX': ['\\', '\n', '"', '\''],
	'_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

	/*-----------------------------------------------------------------*/

	'filter_escape': function filter_escape(s, mode) {
		if (this.isString(s)) {
			switch (mode || 'html') {
				case 'html':
				case 'html_attr':
					return this._replace(s, this._textToHtmlX, this._textToHtmlY);

				case 'js':
				case 'string':
					return this._replace(s, this._textToStringX, this._textToStringY);

				case 'url':
					return encodeURIComponent(s);

				default:
					return s;
			}
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_url_encode': function filter_url_encode(s) {
		return this.isString(s) ? encodeURIComponent(s) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_nl2br': function filter_nl2br(s) {
		return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_raw': function filter_raw(s) {
		return this.isString(s) ? s : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_replace': function filter_replace(s, dict) {
		var result = [];

		if (this.isString(s) && this.isObject(dict)) {
			var i = 0x000000;
			var l = s.length;

			__l0: while (i < l) {
				for (var name in dict) {
					if (s.substring(i).indexOf(name) === 0) {
						result.push(dict[name]);

						i += name.length;

						continue __l0;
					}
				}

				result.push(s.charAt(i++));
			}
		}

		return result.join('');
	},

	/*-----------------------------------------------------------------*/

	'filter_split': function filter_split(s, sep, max) {
		return this.isString(s) ? s.split(sep, max) : [];
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'filter_abs': function filter_abs(x) {
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/

	'min': function min() {
		/*---------------------------------------------------------*/

		var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;

		/*---------------------------------------------------------*/

		var result = Number.POSITIVE_INFINITY;

		for (var i in args) {
			if (!this.isNumber(args[i])) {
				return Number.NaN;
			}

			if (result > args[i]) {
				result = args[i];
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	'max': function max() {
		/*---------------------------------------------------------*/

		var args = arguments.length === 1 && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0] : arguments;

		/*---------------------------------------------------------*/

		var result = Number.NEGATIVE_INFINITY;

		for (var i in args) {
			if (!this.isNumber(args[i])) {
				return Number.NaN;
			}

			if (result < args[i]) {
				result = args[i];
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* RANDOM                                                          */
	/*-----------------------------------------------------------------*/

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

	/*-----------------------------------------------------------------*/
	/* JSON                                                            */
	/*-----------------------------------------------------------------*/

	'filter_json_encode': function filter_json_encode(x) {
		return JSON.stringify(x, null, 2);
	},

	/*-----------------------------------------------------------------*/

	'filter_json_jspath': function filter_json_jspath(x, path) {
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* TEMPLATES                                                       */
	/*-----------------------------------------------------------------*/

	'include': function include(fileName) {
		var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var withContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
		var ignoreMissing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		var temp = {};

		/*---------------------------------------------------------*/

		if (withContext) {
			for (var i in amiTwig.engine.dict) {
				temp[i] = amiTwig.engine.dict[i];
			}
		}

		if (variables) {
			for (var _i5 in /*-*/variables /*-*/) {
				temp[_i5] = /*-*/variables /*-*/[_i5];
			}
		}

		/*---------------------------------------------------------*/

		var result = '';

		amiTwig.ajax.get(fileName, function (data) {
			result = amiTwig.engine.render(data, temp);
		}, function () /**/{
			if (!ignoreMissing) {
				throw 'runtime error, could not open `' + fileName + '`';
			}
		});

		/*---------------------------------------------------------*/

		return result;
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*-------------------------------------------------------------------------*/

/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2017 The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.interpreter                                                */
/*-------------------------------------------------------------------------*/

amiTwig.expr.interpreter = {
	/*-----------------------------------------------------------------*/

	_getJS: function _getJS(node) {
		var L = void 0;
		var x = void 0;
		var left = void 0;
		var right = void 0;
		var operator = void 0;

		switch (node.nodeType) {
			/*-------------------------------------------------*/
			/* LST                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*-----------------------------------------*/

				L = [];

				for (var i in node.list) {
					L.push( /*-----*/this._getJS(node.list[i]));
				}

				/*-----------------------------------------*/

				return '[' + L.join(',') + ']';

			/*-------------------------------------------------*/
			/* DIC                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*-----------------------------------------*/

				L = [];

				for (var _i6 in node.dict) {
					L.push(_i6 + ':' + this._getJS(node.dict[_i6]));
				}

				/*-----------------------------------------*/

				return '{' + L.join(',') + '}';

			/*-------------------------------------------------*/
			/* FUN                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
				/*-----------------------------------------*/

				L = [];

				for (var _i7 in node.list) {
					L.push(this._getJS(node.list[_i7]));
				}

				/*-----------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*-------------------------------------------------*/
			/* VAR                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*-----------------------------------------*/

				L = [];

				for (var _i8 in node.list) {
					L.push('[' + this._getJS(node.list[_i8]) + ']');
				}

				/*-----------------------------------------*/

				return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

			/*-------------------------------------------------*/
			/* TERMINAL                                        */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.TERMINAL:

				return node.nodeValue;

			/*-------------------------------------------------*/
			/* IS                                              */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* IN                                              */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/* STARTS_WITH                                     */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.STARTS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* ENDS_WITH                                       */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.ENDS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* MATCHES                                         */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.MATCHES:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* RANGE                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.RANGE:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

			/*-------------------------------------------------*/
			/* DOT                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.DOT:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				if (node.nodeValue[0] === '.') {
					return left + '.' + right;
				} else {
					return left + '[' + right + ']';
				}

			/*-------------------------------------------------*/
			/* FLDIV                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.FLDIV:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.floor(' + left + '/' + right + ')';

			/*-------------------------------------------------*/
			/* POWER                                           */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.POWER:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.pow(' + left + ',' + right + ')';

			/*-------------------------------------------------*/

			default:
				/*-----------------------------------------*/
				/* UNIARY OPERATOR                         */
				/*-----------------------------------------*/

				if (node.nodeLeft !== null && node.nodeRight === null) {
					operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeLeft) + ')';
				}

				if (node.nodeLeft === null && node.nodeRight !== null) {
					operator = node.nodeType !== amiTwig.expr.tokens.NOT ? node.nodeValue : '!';

					return '(' + this._getJS(node.nodeRight) + ')' + operator;
				}

				/*-----------------------------------------*/
				/* BINARY OPERATOR                         */
				/*-----------------------------------------*/

				if (node.nodeLeft !== null && node.nodeRight !== null) {
					switch (node.nodeType) {
						/*-------------------------*/

						case amiTwig.expr.tokens.LOGICAL_OR:
							operator = '||';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.LOGICAL_AND:
							operator = '&&';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_OR:
							operator = '|';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_XOR:
							operator = '^';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.BITWISE_AND:
							operator = '&';
							break;

						/*-------------------------*/

						case amiTwig.expr.tokens.CONCAT:
							operator = '+';
							break;

						/*-------------------------*/

						default:
							operator = node.nodeValue;
							break;

						/*-------------------------*/
					}

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + operator + right + ')';
				}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	getJS: function getJS(expr) {
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
	},

	/*-----------------------------------------------------------------*/

	eval: function _eval(expr, _) {
		if (!_) _ = {};

		return eval(this.getJS(expr)).call(_, _);
	}

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
