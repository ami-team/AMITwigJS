/*!
 * AMI TWIG Engine
 *
 * Version: 0.1.0
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami.twig                                                                */
/*-------------------------------------------------------------------------*/

var ami = (Object.prototype.toString.call(ami) === '[object Object]') ? ami : {};

/*-------------------------------------------------------------------------*/

ami.twig = {};

/*-------------------------------------------------------------------------*/
/* exports.ami                                                             */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	ami.fs = require('fs');

	exports.ami = ami;
}

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.tokenizer                                                      */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG tokenizer
 * @namespace ami/twig/tokenizer
 */

ami.twig.tokenizer = {
	/*-----------------------------------------------------------------*/

	/**
	  * Tokenize a string
	  * @param {String} code the code
	  * @param {Number} line the line
	  * @param {Array<String>} spaces the array of spaces
	  * @param {Array<String>|Array<RegExp>} tokenDefs the array of token defs
	  * @param {Array<Number>}               tokenTypes the array of token types
	  * @param {Boolean} [error=false] throw an exception on invalid tokens
	  * @throws {String} The error description
	  * @return {Object} The resulting object
	  * @example
	  * var PLUS = 0;
	  * var EQUAL = 1;
	  * var NUMBER = 2;
	  *
	  * var result = ami.twig.tokenizer.tokenize(
	  * 	'1+2=3',
	  *	1,
	  *	[' ', '\t'],
	  *	['+', '-', '=', /[0-9]+/],
	  *	[PLUS, MINUS, EQUAL, NUMBER],
	  *	true
	  * );
	  *
	  * console.debug(result.tokens); // ['1', '+', '2', '=', '3']
	  * console.debug(result.types); // [ 2 ,  0 ,  2 ,  1 ,  2 ]
	  * console.debug(result.lines); // [ 1 ,  1 ,  1 ,  1 ,  1 ]
	  */

	tokenize: function(code, line, spaces, tokenDefs, tokenTypes, error)
	{
		if(tokenDefs.length !== tokenTypes.length)
		{
			throw '`tokenDefs.length != tokenTypes.length`';
		}

		var result_tokens = [];
		var result_types = [];
		var result_lines = [];

		var i = 0x000000000;
		var l = code.length;

		var word = '', c;

		var found;
		var token;
		var type;
		var idx;

		while(i < l)
		{
			c = code.charAt(0);

			/*-------------------------------------------------*/
			/* COUNT LINES                                     */
			/*-------------------------------------------------*/

			if(c === '\n')
			{
				line++;
			}

			/*-------------------------------------------------*/
			/* EAT SPACES                                      */
			/*-------------------------------------------------*/

			if(spaces.indexOf(c) >= 0)
			{
				if(word)
				{
					if(error)
					{
						throw 'invalid token `' + word + '`';
					}

					result_tokens.push(word);
					result_types.push((-1));
					result_lines.push(line);
					word = '';
				}

				code = code.substring(1);
				i += 1;

				continue;
			}

			/*-------------------------------------------------*/
			/* EAT REGEXES                                     */
			/*-------------------------------------------------*/

			found = false;

			for(idx in tokenDefs)
			{
				token = this._match(code, tokenDefs[idx]);

				if(token)
				{
					if(word)
					{
						if(error)
						{
							throw 'invalid token `' + word + '`';
						}

						result_tokens.push(word);
						result_types.push((-1));
						result_lines.push(line);
						word = '';
					}

					type = tokenTypes[idx];

					result_tokens.push(token);
					result_types.push(type);
					result_lines.push(line);

					code = code.substring(token.length);
					i += token.length;
					found = true;

					break;
				}
			}

			if(found)
			{
				continue;
			}

			/*-------------------------------------------------*/
			/* EAT REMAINING CHARACTERES                       */
			/*-------------------------------------------------*/

			word += c;

			code = code.substring(1);
			i += 1;

			/*-------------------------------------------------*/
		}

		if(word)
		{
			if(error)
			{
				throw 'invalid token `' + word + '`';
			}

			result_tokens.push(word);
			result_types.push((-1));
			result_lines.push(line);
			word = '';
		}

		return {
			tokens: result_tokens,
			types: result_types,
			lines: result_lines,
		};
	},

	/*-----------------------------------------------------------------*/

	_match: function(s, stringOrRegExp)
	{
		var m;

		if(stringOrRegExp instanceof RegExp)
		{
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, (((((m[0])))))) ? (((((m[0]))))) : null;
		}
		else
		{
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*-----------------------------------------------------------------*/

	_alnum: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	],

	_checkNextChar: function(s, token)
	{
		var length = token.length;

		var charCode2 = s.charCodeAt(length - 0);
		var charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2)
		       ||
		       this._alnum[charCode2] === 0
		       ||
		       this._alnum[charCode1] === 0
		;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.expr                                                           */
/*-------------------------------------------------------------------------*/

ami.twig.expr = {};

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.tokens                                                    */
/*-------------------------------------------------------------------------*/

ami.twig.expr.tokens = {
	/*-----------------------------------------------------------------*/

	$init: function()
	{
		/*---------------------------------------------------------*/
		/* COMPOSITE TOKENS                                        */
		/*---------------------------------------------------------*/

		this.IS_XXX = [
			this.DEFINED,
			this.NULL,
			this.EMPTY,
			this.ITERABLE,
			this.EVEN,
			this.ODD,
		];

		this.XXX_WITH = [
			this.STARTS_WITH,
			this.ENDS_WITH,
		];

		this.PLUS_MINUS = [
			this.PLUS,
			this.MINUS,
		];

		this.MUL_FLDIV_DIV_MOD = [
			this.MUL,
			this.FLDIV,
			this.DIV,
			this.MOD,
		];

		this.NOT_PLUS_MINUS = [
			this.NOT,
			this.PLUS,
			this.MINUS,
		];

		this.RX = [
			this.RP,
			this.RB1,
		];

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
	IS: 105,
	DEFINED: 106,
	NULL: 107,
	EMPTY: 108,
	ITERABLE: 109,
	EVEN: 110,
	ODD: 111,
	CMP_OP: 112,
	STARTS_WITH: 113,
	ENDS_WITH: 114,
	MATCHES: 115,
	IN: 116,
	RANGE: 117,
	PLUS: 118,
	MINUS: 119,
	POWER: 120,
	MUL: 121,
	FLDIV: 122,
	DIV: 123,
	MOD: 124,
	NOT: 125,
	COLON: 126,
	DOT: 127,
	COMMA: 128,
	PIPE: 129,
	LP: 130,
	RP: 131,
	LB1: 132,
	RB1: 133,
	LB2: 134,
	RB2: 135,
	TERMINAL: 136,
	SID: 137,

	/*-----------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                  */
	/*-----------------------------------------------------------------*/

	LST: 200,
	DIC: 201,
	FUN: 202,
	VAR: 203,

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

ami.twig.expr.tokens.$init();

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.Tokenizer                                                 */
/*-------------------------------------------------------------------------*/

ami.twig.expr.Tokenizer = function(code, line) {
	/*-----------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*-----------------------------------------------------------------*/

	this._tokenDefs = [
		'or',
		'and',
		'b-or',
		'b-xor',
		'b-and',
		'is',
		'defined',
		'null',
		'empty',
		'iterable',
		'even',
		'odd',
		'===',
		'==',
		'!==',
		'!=',
		'<=',
		'>=',
		'<',
		'>',
		/^starts\s+with/,
		/^ends\s+with/,
		'matches',
		'in',
		'..',
		'+',
		'-',
		'**',
		'*',
		'//',
		'/',
		'%',
		'not',
		':',
		'.',
		',',
		'|',
		'(',
		')',
		'[',
		']',
		'{',
		'}',
		/^[0-9]+\.[0-9]+/,
		/^[0-9]+/,
		/^'(\\'|[^\'])*'/,
		/^"(\\"|[^\"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*-----------------------------------------------------------------*/

	this._tokenTypes = [
		ami.twig.expr.tokens.LOGICAL_OR,
		ami.twig.expr.tokens.LOGICAL_AND,
		ami.twig.expr.tokens.BITWISE_OR,
		ami.twig.expr.tokens.BITWISE_XOR,
		ami.twig.expr.tokens.BITWISE_AND,
		ami.twig.expr.tokens.IS,
		ami.twig.expr.tokens.DEFINED,
		ami.twig.expr.tokens.NULL,
		ami.twig.expr.tokens.EMPTY,
		ami.twig.expr.tokens.ITERABLE,
		ami.twig.expr.tokens.EVEN,
		ami.twig.expr.tokens.ODD,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.STARTS_WITH,
		ami.twig.expr.tokens.ENDS_WITH,
		ami.twig.expr.tokens.MATCHES,
		ami.twig.expr.tokens.IN,
		ami.twig.expr.tokens.RANGE,
		ami.twig.expr.tokens.PLUS,
		ami.twig.expr.tokens.MINUS,
		ami.twig.expr.tokens.POWER,
		ami.twig.expr.tokens.MUL,
		ami.twig.expr.tokens.FLDIV,
		ami.twig.expr.tokens.DIV,
		ami.twig.expr.tokens.MOD,
		ami.twig.expr.tokens.NOT,
		ami.twig.expr.tokens.COLON,
		ami.twig.expr.tokens.DOT,
		ami.twig.expr.tokens.COMMA,
		ami.twig.expr.tokens.PIPE,
		ami.twig.expr.tokens.LP,
		ami.twig.expr.tokens.RP,
		ami.twig.expr.tokens.LB1,
		ami.twig.expr.tokens.RB1,
		ami.twig.expr.tokens.LB2,
		ami.twig.expr.tokens.RB2,
		ami.twig.expr.tokens.TERMINAL,
		ami.twig.expr.tokens.TERMINAL,
		ami.twig.expr.tokens.TERMINAL,
		ami.twig.expr.tokens.TERMINAL,
		ami.twig.expr.tokens.SID,
	];

	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		var result = ami.twig.tokenizer.tokenize(
			code,
			line,
			this._spaces,
			this._tokenDefs,
			this._tokenTypes,
			true
		);

		/*---------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.next = function(n)
	{
		this.i += n || 1;
	};

	/*-----------------------------------------------------------------*/

	this.isEmpty = function()
	{
		return this.i >= this.tokens.length;
	};

	/*-----------------------------------------------------------------*/

	this.peekToken = function()
	{
		return this.tokens[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.peekType = function()
	{
		return this.types[this.i];
	};

	/*-----------------------------------------------------------------*/

	this.checkType = function(type)
	{
		if(this.i < this.tokens.length)
		{
			var TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
		}

		return false;
	};

	/*-----------------------------------------------------------------*/

	this.$init(code, line);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.Compiler                                                  */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class ami/twig/expr/Compiler
 * @param {String} code the code
 * @param {Number} line the line
 * @throws {String} The error description
 */

ami.twig.expr.Compiler = function(code, line) {
	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		this.tokenizer = new ami.twig.expr.Tokenizer(
			this.code = code,
			this.line = line
		);

		/*---------------------------------------------------------*/

		this.rootNode = this.parseFilter();

		if(!this.tokenizer.isEmpty())
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	/**
	  * Dump the abstract abstract syntax tree to a dot diagram
	  * @returns {String} The dot diagram
	  */

	this.dump = function()
	{
		return this.rootNode.dump();
	};

	/*-----------------------------------------------------------------*/

	this.parseFilter = function()
	{
		var left = this.parseLogicalOr(), node, temp;

		/*---------------------------------------------------------*/
		/* Filter : LogicalOr '|' FunVar                           */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(ami.twig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseFunVar(true);

			for(temp = node; temp.nodeType === ami.twig.expr.tokens.DOT; temp = temp.nodeRight); temp.list.unshift(left);

			left = node;
		}

		/*---------------------------------------------------------*/
		/*        | LogicalOr                                      */
		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	this.parseLogicalOr = function()
	{
		var left = this.parseLogicalAnd(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd 'or' LogicalOr                   */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_OR))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*           | LogicalAnd                                  */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseLogicalAnd = function()
	{
		var left = this.parseBitwiseOr(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr 'and' LogicalAnd                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_AND))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*            | BitwiseOr                                  */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseOr = function()
	{
		var left = this.parseBitwiseXor(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor 'b-or' BitwiseOr                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_OR))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*           | BitwiseXor                                  */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseXor = function()
	{
		var left = this.parseBitwiseAnd(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd 'b-xor' parseBitwiseXor         */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_XOR))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*            | BitwiseAnd                                 */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseAnd = function()
	{
		var left = this.parseComp(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp 'b-and' BitwiseAnd                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_AND))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*            | Comp                                       */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseComp = function()
	{
		var left = this.parseAddSub(), right, node, swap;

		/*---------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)    */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(ami.twig.expr.tokens.IS))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			swap = node;
			/* swap 'is' and 'not' */

			if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT))
			{
				node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = null;
				node.nodeRight = swap;
			}

			if(this.tokenizer.checkType(ami.twig.expr.tokens.IS_XXX))
			{
				right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				swap.nodeLeft = left;
				swap.nodeRight = right;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, keyword `defined`, `null`, `empty`, `iterable`, `even` or `odd` expected';
			}

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub               */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.CMP_OP))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub         */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.XXX_WITH))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                          */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.MATCHES))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'in' X                                    */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.IN))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseX();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub                                           */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseAddSub = function()
	{
		var left = this.parseMulDiv(), right, node;

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv ('+' | '-') AddSub                      */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.PLUS_MINUS))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*        | MulDiv                                         */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseMulDiv = function()
	{
		var left = this.parsePower(), right, node;

		/*---------------------------------------------------------*/
		/* MulDiv : Power ('*' | '//' | '/' | '%') MulDiv          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*        | Power                                          */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parsePower = function()
	{
		var left = this.parseNotPlusMinus(), right, node;

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus '**' Power                         */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.POWER))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePower();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*       | NotPlusMinus                                    */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNotPlusMinus = function()
	{
		var left = null, right, node;

		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('not' | '-' | '+') Y                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT_PLUS_MINUS))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseY();

			node.nodeLeft = left;
			node.nodeRight = right;

			return node;
		}

		/*---------------------------------------------------------*/
		/*              | Y                                        */
		/*---------------------------------------------------------*/

		return this.parseY();
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function()
	{
		var node;

		/*---------------------------------------------------------*/
		/* X : Array | Object | FunVar | Terminal                  */
		/*---------------------------------------------------------*/

		if((node = this.parseArray())) {
			return node;
		}

		if((node = this.parseObject())) {
			return node;
		}

		if((node = this.parseFunVar())) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*---------------------------------------------------------*/
		/* SYNTAX ERROR                                            */
		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseY = function()
	{
		var node;

		/*---------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal          */
		/*---------------------------------------------------------*/

		if((node = this.parseGroup())) {
			return node;
		}

		if((node = this.parseArray())) {
			return node;
		}

		if((node = this.parseObject())) {
			return node;
		}

		if((node = this.parseFunVar())) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*---------------------------------------------------------*/
		/* SYNTAX ERROR                                            */
		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function()
	{
		var node;

		/*---------------------------------------------------------*/
		/* Group : '(' Filter ')'                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseFilter();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
			{
				this.tokenizer.next();

				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `)` expected';
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseArray = function()
	{
		var node, L;

		/*---------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			L = this._parseSinglets();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.LST, 'Array');
				node.list = L;
				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `]` expected';
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseObject = function()
	{
		var node, D;

		/*---------------------------------------------------------*/
		/* Object : '{' Doublets '}'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LB2))
		{
			this.tokenizer.next();

			D = this._parseDoublets();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RB2))
			{
				this.tokenizer.next();

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.DIC, 'Object');
				node.dict = D;
				return node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `}` expected';
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.parseFunVar = function(isFilter)
	{
		var node = this._parseFunVar(isFilter);

		if(node)
		{
			/*-------------------------------------------------*/

			var temp = (node.nodeType === ami.twig.expr.tokens.DOT) ? node.nodeLeft : node;

			/*-------------------------------------------------*/

			if(temp.nodeValue in ami.twig.stdlib)
			{
				temp.nodeValue = 'ami.twig.stdlib.' + temp.nodeValue;
			}
			else
			{
				temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
			}

			/*-------------------------------------------------*/
		}

		return node;
	},

	/*-----------------------------------------------------------------*/

	this._parseFunVar = function(isFilter)
	{
		var left = this.parseFoo(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* FunVar : Foo '.' FunVar                                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.DOT))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this._parseFunVar(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*        | Foo                                            */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseFoo = function(isFilter)
	{
		var node;

		if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(node.nodeValue === 'true'
			   ||
			   node.nodeValue === 'false'
			 ) {
				node.nodeType = ami.twig.expr.tokens.TERMINAL;

				return node;
			}

			/**/ if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
			{
				this.tokenizer.next();

				node.list = this._parseSinglets();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
				{
					this.tokenizer.next();

					node.nodeType = ami.twig.expr.tokens.FUN;
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}
			}
			else if(this.tokenizer.checkType(ami.twig.expr.tokens.LB1))
			{
				this.tokenizer.next();

				node.list = this._parseSinglets();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RB1))
				{
					this.tokenizer.next();

					node.nodeType = ami.twig.expr.tokens.VAR;

				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `]` expected';
				}
			}
			else
			{
				node.nodeType = isFilter ? ami.twig.expr.tokens.FUN
				                         : ami.twig.expr.tokens.VAR
				;

				node.list = [];
			}

			return node;
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	this._parseSinglets = function()
	{
		var result = [];

		while(this.tokenizer.checkType(ami.twig.expr.tokens.RX) === false)
		{
			this._parseSinglet(result);

			if(this.tokenizer.checkType(ami.twig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				break;
			}
		}

		return result;
	};

	/*-----------------------------------------------------------------*/

	this._parseDoublets = function()
	{
		var result = {};

		while(this.tokenizer.checkType(ami.twig.expr.tokens.RB2) === false)
		{
			this._parseDoublet(result);

			if(this.tokenizer.checkType(ami.twig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				break;
			}
		}

		return result;
	};

	/*-----------------------------------------------------------------*/

	this._parseSinglet = function(result)
	{
		result.push(this.parseFilter());
	},

	/*-----------------------------------------------------------------*/

	this._parseDoublet = function(result)
	{
		if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
		{
			var key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.COLON))
			{
/*				var colon = this.tokenizer.peekToken();
 */				this.tokenizer.next();

				/*-----------------------------------------*/

				result[key] = this.parseFilter();

				/*-----------------------------------------*/
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `:` expected';
			}
		}
		else
		{
			throw 'syntax error, line `' + this.line + '`, terminal expected';
		}
	},

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function()
	{
		var left, right, node;

		/*---------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                             */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
		{
			left = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RANGE))
			{
				node = new ami.twig.expr.Node(((ami.twig.expr.tokens.RANGE)), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
				{
					right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
					this.tokenizer.next();

					node.nodeLeft = left;
					node.nodeRight = right;

					return node;
				}
			}
			else
			{
				return left;
			}
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this.$init(code, line);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.Node                                                      */
/*-------------------------------------------------------------------------*/

ami.twig.expr.Node = function(nodeType, nodeValue) {
	/*-----------------------------------------------------------------*/

	this.$init = function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	};

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt)
	{
		var i, cnt = pCnt[0], CNT;

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

		if(this.nodeLeft)
		{
			CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeLeft._dump(nodes, edges, pCnt);
		}

		if(this.nodeRight)
		{
			CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeRight._dump(nodes, edges, pCnt);
		}

		if(this.list)
		{
			for(i in this.list)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.list[i]._dump(nodes, edges, pCnt);
			}
		}

		if(this.dict)
		{
			for(i in this.dict)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.dict[i]._dump(nodes, edges, pCnt);
			}
		}
	};

	/*-----------------------------------------------------------------*/

	this.dump = function()
	{
		var nodes = [];
		var edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	};

	/*-----------------------------------------------------------------*/

	this.$init(nodeType, nodeValue);

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.ajax                                                           */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Ajax
 * @namespace ami/twig/ajax
 */

ami.twig.ajax = {
	/*-----------------------------------------------------------------*/

	get: function(fileName, done, fail)
	{
		if(typeof exports !== 'undefined')
		{
			/*-------------------------------------------------*/
			/* NODEJS                                          */
			/*-------------------------------------------------*/

			try
			{
				var txt = ami.fs.readFileSync(fileName, 'utf8');

				if(done) {
					done(txt);
				}
			}
			catch(err)
			{
				if(fail) {
					fail(err);
				}
			}

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/
			/* BROWSER                                         */
			/*-------------------------------------------------*/

			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open('GET', fileName, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------*/

			if(xmlHttpRequest.status === 200)
			{
				if(done) {
					done(xmlHttpRequest.responseText);
				}
			}
			else
			{
				if(fail) {
					fail(xmlHttpRequest.responseText);
				}
			}

			/*-------------------------------------------------*/
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.engine                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Engine
 * @namespace ami/twig
 */

ami.twig.engine = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{\%\s*([a-zA-Z]+)\s*(.*?)\s*\%\}/m,

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	COMMENT_RE: /\{\#\s*(.*?)\s*\#\}/g,

	/*-----------------------------------------------------------------*/
/*
	track: function(s)
	{
		var currentdate = new Date();

		console.log(s + ' ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds());
	},
 */
	/*-----------------------------------------------------------------*/

	parse: function(s)
	{
		/*---------------------------------------------------------*/

		var result = {
			line: line,
			keyword: 'if',
			expression: '',
			blocks: [{
				expression: '@else',
				list: [],
			}],
			value: '',
		};

		/*---------------------------------------------------------*/

		var stack1 = [result];
		var stack2 = [0x0000];

		var item;

		/*---------------------------------------------------------*/

		var column_nr = 0;
		var COLUMN_NR = 0;

		var line = 1;

		var i;

		/*---------------------------------------------------------*/

		s = s.replace(this.COMMENT_RE, '');

		/*---------------------------------------------------------*/

		for(;; s = s.substr(COLUMN_NR))
		{
			/*-------------------------------------------------*/

			var curr = stack1[stack1.length - 1];
			var indx = stack2[stack2.length - 1];

			/*-------------------------------------------------*/

			var m = s.match(this.STATEMENT_RE);

			if(m === null)
			{
				/*-----------------------------------------*/

				for(i in s)
				{
					if(s[i] === '\n')
					{
						line++;
					}
				}

				/*-----------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: (([])),
					value: s,
				});

				/*-----------------------------------------*/

				var msg = [];

				for(i = stack1.length - 1; i > 0; i--)
				{
					/**/ if(stack1[i].keyword === 'if')
					{
					 	msg.push('missing keyword `endif`');
					}
					else if(stack1[i].keyword === 'for')
					{
					 	msg.push('missing keyword `endfor`');
					}
				}

				if(msg.length > 0)
				{
					throw 'syntax error, line `' + line + '`, ' + msg.join(', ');
				}

				/*-----------------------------------------*/

				return result;
			}

			/*-------------------------------------------------*/

			var match = m[0];
			var keyword = m[1];
			var expression = m[2];

			column_nr = m.index + 0x0000000000;
			COLUMN_NR = m.index + match.length;

			var value = s.substr(0, column_nr);
			var VALUE = s.substr(0, COLUMN_NR);

			for(i in VALUE)
			{
				if(VALUE[i] === '\n')
				{
					line++;
				}
			}

			/*-------------------------------------------------*/

			if(value)
			{
				item = {
					line: line,
					keyword: '@text',
					expression: (('')),
					blocks: (([])),
					value: value,
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------*/

			/**/ if(keyword === 'do'
			        ||
			        keyword === 'set'
			        ||
				keyword === 'include'
			 ) {
				item = {
					line: line,
					keyword: keyword,
					expression: expression,
					blocks: (([])),
					value: (('')),
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------*/

			else if(keyword === 'if'
			        ||
			        keyword === 'for'
			 ) {
				item = {
					line: line,
					keyword: keyword,
					blocks: [{
						expression: expression,
						list: [],
					}],
					value: '',
				}

				curr.blocks[indx].list.push(item);

				stack1.push(item);
				stack2.push(0x00);
			}

			/*-------------------------------------------------*/

			else if(keyword === 'elseif')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				indx = curr.blocks.length;

				curr.blocks.push({
					expression: expression,
					list: [],
				});

				stack2[stack2.length - 1] = indx;
			}

			/*-------------------------------------------------*/

			else if(keyword === 'else')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				indx = curr.blocks.length;

				curr.blocks.push({
					expression: '@else',
					list: [],
				});

				stack2[stack2.length - 1] = indx;
			}
			
			/*-------------------------------------------------*/

			else if(keyword === 'endif')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				stack1.pop();
				stack2.pop();
			}

			/*-------------------------------------------------*/

			else if(keyword === 'endfor')
			{
				if(curr['keyword'] !== 'for')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `for`';
				}

				stack1.pop();
				stack2.pop();
			}

			/*-------------------------------------------------*/

			else
			{
				throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_render: function(result, item, dict)
	{
		var i, j, k, l;

		var expression, list;

		var m, symb, expr, DICT;

		/*---------------------------------------------------------*/
		/* do                                                      */
		/*---------------------------------------------------------*/

		/**/ if(item.keyword === 'do')
		{
			ami.twig.expr.cache.eval(item.expression, item.line, dict);
		}

		/*---------------------------------------------------------*/
		/* SET                                                     */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'set')
		{
			/*-------------------------------------------------*/

			m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+=\s+(.+)/)

			if(!m)
			{
				throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			var value = ami.twig.expr.cache.eval(expr, item.line, dict);

			/*-------------------------------------------------*/

			dict[symb] = value;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* @TEXT                                                   */
		/*---------------------------------------------------------*/

		else if(item.keyword === '@text')
		{
			result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

				return ami.twig.expr.cache.eval(expression, item.line, dict);

			}));
		}

		/*---------------------------------------------------------*/
		/* IF                                                      */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'if')
		{
			for(i in item.blocks)
			{
				expression = item.blocks[i].expression;

				if(expression === '@else' || ami.twig.expr.cache.eval(expression, item.line, dict) === true)
				{
					list = item.blocks[i].list;

					for(j in list)
					{
						this._render(result, list[j], dict);
					}

					break;
				}
			}
		}

		/*---------------------------------------------------------*/
		/* FOR                                                     */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'for')
		{
			/*-------------------------------------------------*/

			m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

			if(!m)
			{
				throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			var iter = ami.twig.expr.cache.eval(expr, item.line, dict);

			/*-------------------------------------------------*/

			var typeName = Object.prototype.toString.call(iter);

			if(typeName !== '[object Array]'
			   &&
			   typeName !== '[object Object]'
			   &&
			   typeName !== '[object String]'
			 ) {
				throw 'syntax error, line `' + item.line + '`, right operande not iterable';
			}

			/*-------------------------------------------------*/

			if(typeName === '[object Object]')
			{
				iter = Object.keys(iter);
			}

			/*-------------------------------------------------*/

			DICT = {loop: {}}; for(i in dict) DICT[i] = dict[i];

			/*-------------------------------------------------*/

			k = 0x000000000;
			l = iter.length;

			list = item.blocks[0].list;

			for(i in iter)
			{
				DICT[symb] = iter[i];

				DICT['loop'].first = (k === (0 - 0));
				DICT['loop'].last  = (k === (l - 1));

				DICT['loop'].index  = k;
				DICT['loop'].length = l;

				k++;

				for(j in list)
				{
					this._render(result, list[j], DICT);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* INCLUDE                                                 */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'include')
		{
			/*-------------------------------------------------*/

			expression = item.expression;

			/*-------------------------------------------------*/

			var only_subexpr = null;

			expression = expression.trim();

			if((m = expression.match(/only$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				only_subexpr = true;
			}

			/*-------------------------------------------------*/

			var with_subexpr = null;

			expression = expression.trim();

			if((m = expression.match(/with\s+(([a-zA-Z_$]|{).*)$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				with_subexpr = m[1];
			}

			/*-------------------------------------------------*/

			var FILENAME = ami.twig.expr.cache.eval(expression, item.line, dict);

			if(Object.prototype.toString.call(FILENAME) !== '[object String]')
			{
				throw 'runtime error, line `' + item.line + '`, string expected';
			}

			/*-------------------------------------------------*/

			if(with_subexpr)
			{
				DICT = ami.twig.expr.cache.eval(with_subexpr, item.line, dict);

				if(Object.prototype.toString.call(DICT) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}
			}
			else
			{
				DICT = {};
			}

			if(!only_subexpr)
			{
				for(i in dict) DICT[i] = dict[i];
			}

			/*-------------------------------------------------*/

			ami.twig.ajax.get(
				FILENAME,
				function(data) {
					result.push(ami.twig.engine.render(data, DICT));
				},
				function(/**/) {
					throw 'runtime error, line `' + item.line + '`, could not open `' + FILENAME + '`';
				}
			);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(s, dict)
	{
		var result = [];

		this._render(result, this.parse(s), dict);

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.cache                                                     */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG cache interpreter
 * @namespace ami/twig/expr/cache
 */

ami.twig.expr.cache = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		var js;

		if(expression in this.dict)
		{
			js = this.dict[expression];
		}
		else
		{
			js = this.dict[expression] = ami.twig.expr.interpreter.getJS(
							new ami.twig.expr.Compiler(expression, line)
			);
		}

		/*---------------------------------------------------------*/

		if(!_) _ = {};

		return eval(js);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG StdLib
 * @namespace ami/twig/stdlib
 */

ami.twig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return typeof x !== 'undefined';
	},

	/*-----------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*-----------------------------------------------------------------*/

	'isEmpty': function(x)
	{
		return (x === null || x === false) || (x === '' || x === [] || x === {});
	},

	/*-----------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*-----------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*-----------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*-----------------------------------------------------------------*/

	'isIterable': function(x)
	{
		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
		       ||
		       typeName === '[object String]'
		;
	},

	/*-----------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*-----------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isInObject': function(x, y)
	{
		if(this.isArray(y)
		   ||
		   this.isString(y)
		 ) {
		 	return y.indexOf(x) >= 0;
		}

		if(this.isObject(y))
		{
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'range': function(x1, x2, step)
	{
		var i;

		var result = [];

		if(!step)
		{
			step = 1;
		}

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(i = (((((((x1))))))); i <= (((((((x2))))))); i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	'length': function(x)
	{
		if(this.isArray(x)
		   ||
		   this.isString(x)
		 ) {
		 	return x.length;
		}

		if(this.isObject(x))
		{
			return Object.keys(x).length;
		}

		return 0;
	},

	/*-----------------------------------------------------------------*/

	'first': function(x)
	{
		return this.isIterable(x) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'last': function(x)
	{
		return this.isIterable(x) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/

	'keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	'default': function(s1, s2)
	{
		/**/ if(s1)
		{
			return s1;
		}
		else if(s2)
		{
			return s2;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'startsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'endsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'match': function(s, regex)
	{
		if(this.isString(s)
		   &&
		   this.isString(regex)
		 ) {
			var len = regex.     length     ;
			var idx = regex.lastIndexOf('/');

			if(len < 2
			   ||
			   idx < 0
			   ||
			   regex.charAt(0) !== '/'
			 ) {
				throw 'invalid regular expression `' + regex + '`';
			}

			return new RegExp(
				regex.substring(0x1, idx + 0)
				,
				regex.substring(idx + 1, len)
			).test(s);
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'capitalize': function(s)
	{
		if(this.isString(s))
		{
			return s.toLowerCase().replace(/(?:^|\s)\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'trim': function(s)
	{
		return this.isString(s) ? s.trim() : '';
	},

	/*-----------------------------------------------------------------*/

	'escape': function(s, mode)
	{
		if(this.isString(s))
		{
			/**/ if(!mode
			        ||
				mode === 'html'
				||
				mode === 'html_attr'
			 ) {
				s = s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			else if(mode === 'js')
			{
				s = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\\"').replace(/'/g, '\\\'');
			}
			else if(mode === 'url')
			{
				s = encodeURIComponent(s);
			}
		}

		return s;
	},

	/*-----------------------------------------------------------------*/

	'raw': function(s)
	{
		return s;
	},

	/*-----------------------------------------------------------------*/

	'replace': function(s, dict)
	{
		if(this.isString(s) && this.isObject(dict))
		{
			var t = '';

			var i = 0x000000;
			var l = s.length;

			while(i < l)
			{
				for(var key in dict)
				{
					if(s.substring(i).indexOf(key) === 0)
					{
						t += dict[key];

						i += key.length;

						continue;
					}
				}

				t += s.charAt(i++);
			}

			return t;
		}

		return s;
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'abs': function(x)
	{
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

	'min': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                   : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.POSITIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result > arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	'max': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                   : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.NEGATIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result < arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.interpreter                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace ami/twig/expr/interpreter
 */

ami.twig.expr.interpreter = {
	/*-----------------------------------------------------------------*/

	_getJS: function(node)
	{
		var i;
		var x;
		var s;

		var left;
		var right;

		var operator;

		/*---------------------------------------------------------*/
		/* LST                                                     */
		/*---------------------------------------------------------*/

		if(node.nodeType === ami.twig.expr.tokens.LST)
		{
		 	/*-------------------------------------------------*/

			s = '';

			for(i in node.list)
			{
				s += ',' + this._getJS(node.list[i]);
			}

			if(s)
			{
				s = s.substr(1);
			}

		 	/*-------------------------------------------------*/

			return '[' + s + ']';

		 	/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* DIC                                                     */
		/*---------------------------------------------------------*/

		if(node.nodeType === ami.twig.expr.tokens.DIC)
		{
		 	/*-------------------------------------------------*/

			s = '';

			for(i in node.dict)
			{
				s += ',' + i + ':' + this._getJS(node.dict[i]);
			}

			if(s)
			{
				s = s.substr(1);
			}

			/*-------------------------------------------------*/

			return '{' + s + '}';

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* FUN                                                     */
		/*---------------------------------------------------------*/

		if(node.nodeType === ami.twig.expr.tokens.FUN)
		{
			/*-------------------------------------------------*/

			s = '';

			for(i in node.list)
			{
				s += ',' + this._getJS(node.list[i]);
			}

			if(s)
			{
				s = s.substr(1);
			}

		 	/*-------------------------------------------------*/

			return node.nodeValue + '(' + s + ')';

		 	/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* VAR                                                     */
		/*---------------------------------------------------------*/

		if(node.nodeType === ami.twig.expr.tokens.VAR)
		{
			/*-------------------------------------------------*/

			s = '';

			for(i in node.list)
			{
				s += ',' + this._getJS(node.list[i]);
			}

			if(s)
			{
				s = s.substr(1);
			}

		 	/*-------------------------------------------------*/

			if(s)
			{
				return node.nodeValue + '[' + s + ']';
			}
			else
			{
				return node.nodeValue;
			}

		 	/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* TERMINAL                                                */
		/*---------------------------------------------------------*/

		if(node.nodeType === ami.twig.expr.tokens.TERMINAL)
		{
			return node.nodeValue;
		}

		/*---------------------------------------------------------*/
		/* UNIARY OPERATOR                                         */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight === null
		 ) {
			operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeLeft) + ')';
		}

		if(node.nodeLeft === null
		   &&
		   node.nodeRight !== null
		 ) {
			operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeRight) + ')';
		}

		/*---------------------------------------------------------*/
		/* BINARY OPERATOR                                         */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight !== null
		 ) {
			switch(node.nodeType)
			{
				/*-----------------------------------------*/

				case ami.twig.expr.tokens.DOT:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return left + '.' + right;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IS:

					left = this._getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case ami.twig.expr.tokens.DEFINED:
							return 'ami.twig.stdlib.isDefined(' + left + ')';

						case ami.twig.expr.tokens.NULL:
							return 'ami.twig.stdlib.isNull(' + left + ')';

						case ami.twig.expr.tokens.EMPTY:
							return 'ami.twig.stdlib.isEmpty(' + left + ')';

						case ami.twig.expr.tokens.ITERABLE:
							return 'ami.twig.stdlib.isIterable(' + left + ')';

						case ami.twig.expr.tokens.EVEN:
							return 'ami.twig.stdlib.isEven(' + left + ')';

						case ami.twig.expr.tokens.ODD:
							return 'ami.twig.stdlib.isOdd(' + left + ')';
					}

					throw 'internal error';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IN:

					if(node.nodeRight.nodeType !== ami.twig.expr.tokens.RANGE)
					{
						left = this._getJS(node.nodeLeft);
						right = this._getJS(node.nodeRight);

						return 'ami.twig.stdlib.isInObject(' + left + ',' + right + ')';
					}
					else
					{
						x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return 'ami.twig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
					}

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.STARTS_WITH:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.startsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.ENDS_WITH:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.endsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.MATCHES:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.match(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.RANGE:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.range(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.FLDIV:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.floor(' + left + '/' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.POWER:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.pow(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_OR:
					operator = '||';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_AND:
					operator = '&&';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_OR:
					operator = '|';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_XOR:
					operator = '^';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_AND:
					operator = '&';
					break;

				/*-----------------------------------------*/

				default:
					operator = node.nodeValue;
					break;

				/*-----------------------------------------*/
			}

			left = this._getJS(node.nodeLeft);
			right = this._getJS(node.nodeRight);

			return '(' + left + operator + right + ')';
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Convert a compiled TWIG expression to JavaScript
	  * @param {String} expr the compiled expression
	  * @returns {String} The JavaScript result
	  */

	getJS: function(expr)
	{
		return '(function() { return ' + this._getJS(expr.rootNode) + '; }())';
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Evaluate the compiled TWIG expression
	  * @param {String} expr the compiled expression
	  * @param {Object} [dict] the dictionary of definitions
	  * @returns {?} The evaluated result
	  */

	eval: function(expr, _)
	{
		if(!_) _ = {};

		return eval(this.getJS(expr));
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
