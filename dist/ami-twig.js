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
/* amiTwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {};

/*-------------------------------------------------------------------------*/
/* exports.amiTwig                                                         */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	amiTwig.fs = require('fs');

	exports.amiTwig = amiTwig;
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
/* amiTwig.tokenizer                                                       */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG tokenizer
 * @namespace ami/twig/tokenizer
 */

amiTwig.tokenizer = {
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
	  * var result = amiTwig.tokenizer.tokenize(
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
/* amiTwig.expr                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.expr = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.tokens                                                     */
/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens = {
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
			this.CONCAT,
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
	VAR: 203,

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                  */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function(code, line) {
	/*-----------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*-----------------------------------------------------------------*/

	this._tokenDefs = [
		'or',
		'and',
		'b-or',
		'b-xor',
		'b-and',
		'not',
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
		'~',
		'+',
		'-',
		'**',
		'*',
		'//',
		'/',
		'%',
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
		'true',
		'false',
		/^[0-9]+\.[0-9]+/,
		/^[0-9]+/,
		/^'(\\'|[^\'])*'/,
		/^"(\\"|[^\"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*-----------------------------------------------------------------*/

	this._tokenTypes = [
		amiTwig.expr.tokens.LOGICAL_OR,
		amiTwig.expr.tokens.LOGICAL_AND,
		amiTwig.expr.tokens.BITWISE_OR,
		amiTwig.expr.tokens.BITWISE_XOR,
		amiTwig.expr.tokens.BITWISE_AND,
		amiTwig.expr.tokens.NOT,
		amiTwig.expr.tokens.IS,
		amiTwig.expr.tokens.DEFINED,
		amiTwig.expr.tokens.NULL,
		amiTwig.expr.tokens.EMPTY,
		amiTwig.expr.tokens.ITERABLE,
		amiTwig.expr.tokens.EVEN,
		amiTwig.expr.tokens.ODD,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.CMP_OP,
		amiTwig.expr.tokens.STARTS_WITH,
		amiTwig.expr.tokens.ENDS_WITH,
		amiTwig.expr.tokens.MATCHES,
		amiTwig.expr.tokens.IN,
		amiTwig.expr.tokens.RANGE,
		amiTwig.expr.tokens.CONCAT,
		amiTwig.expr.tokens.PLUS,
		amiTwig.expr.tokens.MINUS,
		amiTwig.expr.tokens.POWER,
		amiTwig.expr.tokens.MUL,
		amiTwig.expr.tokens.FLDIV,
		amiTwig.expr.tokens.DIV,
		amiTwig.expr.tokens.MOD,
		amiTwig.expr.tokens.COLON,
		amiTwig.expr.tokens.DOT,
		amiTwig.expr.tokens.COMMA,
		amiTwig.expr.tokens.PIPE,
		amiTwig.expr.tokens.LP,
		amiTwig.expr.tokens.RP,
		amiTwig.expr.tokens.LB1,
		amiTwig.expr.tokens.RB1,
		amiTwig.expr.tokens.LB2,
		amiTwig.expr.tokens.RB2,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.TERMINAL,
		amiTwig.expr.tokens.SID,
	];

	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		var result = amiTwig.tokenizer.tokenize(
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
/* amiTwig.expr.Compiler                                                   */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression compiler
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @class ami/twig/expr/Compiler
 * @param {String} code the code
 * @param {Number} line the line
 * @throws {String} The error description
 */

amiTwig.expr.Compiler = function(code, line) {
	/*-----------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*---------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(
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
		/* Filter : LogicalOr ('|' Dot1)*                          */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseDot1(true);

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			temp.list.unshift(left);

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	},

	/*-----------------------------------------------------------------*/

	this.parseLogicalOr = function()
	{
		var left = this.parseLogicalAnd(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseLogicalAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseLogicalAnd = function()
	{
		var left = this.parseBitwiseOr(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseOr();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseOr = function()
	{
		var left = this.parseBitwiseXor(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*             */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseXor();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseXor = function()
	{
		var left = this.parseBitwiseAnd(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*           */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseBitwiseAnd();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseAnd = function()
	{
		var left = this.parseComp(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp ('b-and' Comp)*                       */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseComp();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

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

		/**/ if(this.tokenizer.checkType(amiTwig.expr.tokens.IS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			swap = node;
			/* swap 'is' and 'not' */

			if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
			{
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = null;
				node.nodeRight = swap;
			}

			if(this.tokenizer.checkType(amiTwig.expr.tokens.IS_XXX))
			{
				right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP))
		{
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH))
		{
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'in' X                                    */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.IN))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                   */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseMulDiv();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseMulDiv = function()
	{
		var left = this.parsePower(), right, node;

		/*---------------------------------------------------------*/
		/* MulDiv : Power (('*' | '//' | '/' | '%') Power)*        */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parsePower();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parsePower = function()
	{
		var left = this.parseNotPlusMinus(), right, node;

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus ('**' NotPlusMinus)*               */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.POWER))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseNotPlusMinus();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNotPlusMinus = function()
	{
		var right, node;

		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('not' | '-' | '+') Dot1                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT_PLUS_MINUS))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			right = this.parseDot1();

			node.nodeLeft = null;
			node.nodeRight = right;

			return node;
		}

		/*---------------------------------------------------------*/
		/*              | Dot1                                     */
		/*---------------------------------------------------------*/

		return this.parseDot1();
	};

	/*-----------------------------------------------------------------*/

	this.parseDot1 = function(isFilter)
	{
		var node = this.parseDot2(isFilter), temp;

		if(node)
		{
			/*-------------------------------------------------*/

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			/*-------------------------------------------------*/

			if(temp.q)
			{
				/**/ if(temp.nodeType === amiTwig.expr.tokens.FUN)
				{
					if(temp.nodeValue in amiTwig.stdlib)
					{
						temp.nodeValue = 'amiTwig.stdlib.' + temp.nodeValue;
					}
					else
					{
						temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
					}
				}
				else if(temp.nodeType === amiTwig.expr.tokens.VAR)
				{
					temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
				}

				temp.q = false;
			}

			/*-------------------------------------------------*/
		}

		return node;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot2 = function(isFilter)
	{
		var left = this.parseDot3(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                 */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOT))
		{
			node = new amiTwig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot3(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot3 = function(isFilter)
	{
		var left = this.parseX(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* parseDot3 : X ('[' Filter ']')*                         */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			right = this.parseFilter();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.DOT, '[]');

				node.nodeLeft = left;
				node.nodeRight = right;

				left = node;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, `]` expected';
			}
		}

		/*---------------------------------------------------------*/
		/*         | X                                             */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function(isFilter)
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

		if((node = this.parseFunVar(isFilter))) {
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

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseFilter();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RP))
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
		var node, list;

		/*---------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			list = this._parseSinglets();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.LST, 'Array');

				node.list = list;

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
		var node, dict;

		/*---------------------------------------------------------*/
		/* Object : '{' Doublets '}'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LB2))
		{
			this.tokenizer.next();

			dict = this._parseDoublets();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RB2))
			{
				this.tokenizer.next();

				node = new amiTwig.expr.Node(amiTwig.expr.tokens.DIC, 'Object');

				node.dict = dict;

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
		var node;

		if(this.tokenizer.checkType(amiTwig.expr.tokens.SID))
		{
			node = isFilter ? new amiTwig.expr.Node(0, 'filter_' + this.tokenizer.peekToken())
			                : new amiTwig.expr.Node(0,             this.tokenizer.peekToken())
			;

			node.q = true;

			this.tokenizer.next();

			/*-------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                   */
			/*-------------------------------------------------*/

			/**/ if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
			{
				this.tokenizer.next();

				node.list = this._parseSinglets();

				if(this.tokenizer.checkType(amiTwig.expr.tokens.RP))
				{
					this.tokenizer.next();

					node.nodeType = amiTwig.expr.tokens.FUN;
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}
			}

			/*-------------------------------------------------*/
			/*        | SID                                    */
			/*-------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? amiTwig.expr.tokens.FUN
				                         : amiTwig.expr.tokens.VAR
				;

				node.list = [];
			}

			/*-------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	this._parseSinglets = function()
	{
		var result = [];

		while(this.tokenizer.checkType(amiTwig.expr.tokens.RX) === false)
		{
			this._parseSinglet(result);

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true)
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

		while(this.tokenizer.checkType(amiTwig.expr.tokens.RB2) === false)
		{
			this._parseDoublet(result);

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COMMA) === true)
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
		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			var key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COLON))
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

		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			left = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.RANGE))
			{
				node = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
				{
					right = new amiTwig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
/* amiTwig.expr.Node                                                      */
/*-------------------------------------------------------------------------*/

amiTwig.expr.Node = function(nodeType, nodeValue) {
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
/* amiTwig.ajax                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Ajax
 * @namespace ami/twig/ajax
 */

amiTwig.ajax = {
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
/* amiTwig.engine                                                          */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Engine
 * @namespace ami/twig
 */

amiTwig.engine = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{\%\s*([a-zA-Z]+)\s*(.*?)\s*\%\}/m,

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	COMMENT_RE: /\{\#\s*(.*?)\s*\#\}/g,

	/*-----------------------------------------------------------------*/

	compile: function(s)
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

		for(s = s.replace(this.COMMENT_RE, '');; s = s.substr(COLUMN_NR))
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

			switch(keyword)
			{
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
						blocks: (([])),
						value: (('')),
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
							list: [],
						}],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					stack1.push(item);
					stack2.push(0x00);

					break;

				/*-----------------------------------------*/

				case 'elseif':

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

					break;

				/*-----------------------------------------*/

				case 'else':

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

					break;

				/*-----------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, missing keyword `if`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, missing keyword `for`';
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

	_render: function(result, item, dict)
	{
		var i, j, k, l;

		var expression, list;

		var m, symb, expr, value;

		switch(item.keyword)
		{
			/*-------------------------------------------------*/
			/* DO                                              */
			/*-------------------------------------------------*/

			case 'do':

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				break;

			/*-------------------------------------------------*/
			/* SET                                             */
			/*-------------------------------------------------*/

			case 'set':
				/*-----------------------------------------*/

				m = item.expression.match(/^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				symb = m[1].trim();
				expr = m[2].trim();

				/*-----------------------------------------*/

				value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*-----------------------------------------*/

				dict[symb] = value;

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* @TEXT                                           */
			/*-------------------------------------------------*/

			case '@text':

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return (typeof value !== 'undefined' && value !== null) ? value : '';
				}));

				break;

			/*-------------------------------------------------*/
			/* IF                                              */
			/*-------------------------------------------------*/

			case 'if':

				for(i in item.blocks)
				{
					expression = item.blocks[i].expression;

					if(expression === '@else' || amiTwig.expr.cache.eval(expression, item.line, dict) === true)
					{
						list = item.blocks[i].list;

						for(j in list)
						{
							this._render(result, list[j], dict);
						}

						break;
					}
				}

				break;

			/*-------------------------------------------------*/
			/* FOR                                             */
			/*-------------------------------------------------*/

			case 'for':
				/*-----------------------------------------*/

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
				}

				symb = m[1].trim();
				expr = m[2].trim();

				/*-----------------------------------------*/

				value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*-----------------------------------------*/

				var typeName = Object.prototype.toString.call(value);

				if(typeName !== '[object Array]'
				   &&
				   typeName !== '[object Object]'
				   &&
				   typeName !== '[object String]'
				 ) {
					throw 'syntax error, line `' + item.line + '`, right operande not iterable';
				}

				/*-----------------------------------------*/

				if(typeName === '[object Object]')
				{
					value = Object.keys(value);
				}

				/*-----------------------------------------*/

				var old1 = dict[(symb)];
				var old2 = dict['loop'];

				/*-----------------------------------------*/

				k = 0x0000000000;
				l = value.length;

				dict.loop = {length: l};

				list = item.blocks[0].list;

				for(i in value)
				{
					dict[symb] = value[i];

					dict.loop.first = (k === (0 - 0));
					dict.loop.index = k;
					dict.loop.last = (k === (l - 1));

					k++;

					for(j in list)
					{
						this._render(result, list[j], dict);
					}
				}

				/*-----------------------------------------*/

				if(old2) {
					dict['loop'] = old2;
				}

				if(old1) {
					dict[(symb)] = old1;
				}

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* INCLUDE                                         */
			/*-------------------------------------------------*/

			case 'include':
				/*-----------------------------------------*/

				expression = item.expression;

				/*-----------------------------------------*/

				var with_context = true;

				expression = expression.trim();

				if((m = expression.match(/only$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_context = false;
				}

				/*-----------------------------------------*/

				var with_subexpr = '{}';

				expression = expression.trim();

				if((m = expression.match(/with\s+(([a-zA-Z_$]|{).*)$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_subexpr = m[1];
				}

				/*-----------------------------------------*/

				var FILENAME = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(FILENAME) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*-----------------------------------------*/

				var VARIABLES = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(VARIABLES) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*-----------------------------------------*/

				result.push(amiTwig.stdlib.include(
					FILENAME,
					VARIABLES,
					with_context,
					false
				));

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(tmpl, dict)
	{
		var result = [];

if (! ('console' in window) || !('firebug' in console)) {
    var names = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
    window.console = {};
    for (var i = 0; i < names.length; ++i) window.console[names[i]] = function() {};
}

		this._render(result, Object.prototype.toString.call(tmpl) === '[object String]' ? this.compile(tmpl) : tmpl, dict || {});

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
/* amiTwig.expr.cache                                                      */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG cache interpreter
 * @namespace ami/twig/expr/cache
 */

amiTwig.expr.cache = {
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
			js = this.dict[expression] = amiTwig.expr.interpreter.getJS(
							new amiTwig.expr.Compiler(expression, line)
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
/* amiTwig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG StdLib
 * @namespace ami/twig/stdlib
 */

amiTwig.stdlib = {
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
		if(x === null
		   ||
		   x === false
		   ||
		   x === ((''))
		 ) {
		 	return true;
		}
		else
		{
			var typeName = Object.prototype.toString.call(x);

			return (typeName === '[object Array]' && x.length === 0)
			       ||
			       (typeName === '[object Object]' && Object.keys(x).length === 0)
			;
		}
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*-----------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
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

	'isIterable': function(x)
	{
		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
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
		if(this.isNumber(x1)
		   &&
		   this.isNumber(x2)
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}

		if(this.isString(x1) && x1.length === 1
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

	'filter_length': function(x)
	{
		if(this.isString(x)
		   ||
		   this.isArray(x)
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

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*-----------------------------------------------------------------*/

	'filter_merge': function()
	{
		var i, j;

		if(arguments.length > 1)
		{
			if(this.isString(arguments[0]))
			{
				var s = '';

				for(i in arguments)
				{
					s += arguments[i];
				}

				return s;
			}

			if(this.isArray(arguments[0]))
			{
				var L = []

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						L.push(arguments[i][j]);
					}
				}

				return L;
			}

			if(this.isObject(arguments[0]))
			{
				var D = {}

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						D[j] = arguments[i][j];
					}
				}

				return D;
			}
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
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
		if(this.isString(((s)))
		   &&
		   this.isString(regex)
		 ) {
			var idx1 = regex.  indexOf  ('/');
			var idx2 = regex.lastIndexOf('/');

			if(idx1 === 0 || idx1 < idx2)
			{
				try
				{
					return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
				}
				catch(err)
				{
					/* IGNORE */
				}
			}
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'filter_default': function(s1, s2)
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

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_capitalize': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/^\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_title': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim() : '';
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map1': {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'&': '&amp;',
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map2': {
		'\\': '\\\\',
		'\n': '\\n',
		'\"': '\\\"',
		'\'': '\\\'',
	},

	/*-----------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			var _map;

			/**/ if(!
			        mode
			        ||
				mode === 'html'
				||
				mode === 'html_attr'
			 ) {
			 	_map = this._internal_escape_map1;

			 	return s.replace(/[<>"&]/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'js')
			{
			 	_map = this._internal_escape_map2;

				return s.replace(/[\\\n"']/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'url')
			{
				return encodeURIComponent(s);
			}
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		if(this.isString(s) && this.isObject(dict))
		{
			var q;

			var t = '';

			var i = 0x000000;
			var l = s.length;

			while(i < l)
			{
				q = true;

				for(var name in dict)
				{
					if(s.substring(i).indexOf(name) === 0)
					{
						t += dict[name];

						i += name.length;

						q = false;

						break;
					}
				}

				if(q)
				{
					t += s.charAt(i++);
				}
			}

			return t;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max) : [];
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

	'filter_round': function(x, mode)
	{
		/**/ if(mode === 'ceil')
		{
			return Math.ceil(x);
		}
		else if(mode === 'floor')
		{
			return Math.floor(x);
		}
		else
		{
			return Math.round(x);
		}
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
	/* RANDOM                                                          */
	/*-----------------------------------------------------------------*/

	'random': function(x)
	{
		var y = Math.random();

		if(x)
		{
			/**/ if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isArray(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isNumber(x))
			{
				return Math.floor(x * y);
			}
		}

		x = Number.MAX_SAFE_INTEGER;

		return Math.floor(x * y);
	},

	/*-----------------------------------------------------------------*/
	/* JSON                                                            */
	/*-----------------------------------------------------------------*/

	'filter_json_encode': function(x)
	{
		return JSON.stringify(x, null, 2);
	},

	/*-----------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* TEMPLATES                                                       */
	/*-----------------------------------------------------------------*/

	'include': function(fileName, variables, withContext, ignoreMissing)
	{
		/*---------------------------------------------------------*/

		variables = variables || {};

		if(withContext)
		{
			/* for(var i in dict) variables[i] = dict[i]; */
		}

		/*---------------------------------------------------------*/

		amiTwig.ajax.get(
			fileName,
			function(data)
			{
				return amiTwig.engine.render(data, variables);
			},
			function(/**/)
			{
				if(ignoreMissing)
				{
					return '';
				}
			}
		);

		/*---------------------------------------------------------*/

		throw 'runtime error, could not open `' + fileName + '`';

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*-------------------------------------------------------------------------*/
/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.interpreter                                                */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace ami/twig/expr/interpreter
 */

amiTwig.expr.interpreter = {
	/*-----------------------------------------------------------------*/

	_getJS: function(node)
	{
		var L;
		var i;
		var x;

		var left;
		var right;

		var operator;

		switch(node.nodeType)
		{
			/*-------------------------------------------------*/
			/* LST                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
		 		/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push(/* (i) */ this._getJS(node.list[i]));
				}

		 		/*-----------------------------------------*/

				return '[' + L.join(',') + ']';

			/*-------------------------------------------------*/
			/* DIC                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
		 		/*-----------------------------------------*/

				L = [];
	
				for(i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*-----------------------------------------*/

				return '{' + L.join(',') + '}';

			/*-------------------------------------------------*/
			/* FUN                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*-----------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*-------------------------------------------------*/
			/* VAR                                             */
			/*-------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
		 		/*-----------------------------------------*/

				L = [];

				for(i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
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

				switch(node.nodeRight.nodeType)
				{
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

				if(node.nodeRight.nodeType !== amiTwig.expr.tokens.RANGE)
				{
					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'amiTwig.stdlib.isInObject(' + left + ',' + right + ')';
				}
				else
				{
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

				if(node.nodeValue[0] === '.')
				{
					return left + '.' + right;
				}
				else
				{
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

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight === null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeLeft) + ')';
				}

				if(node.nodeLeft === null
				   &&
				   node.nodeRight !== null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeRight) + ')';
				}

				/*-----------------------------------------*/
				/* BINARY OPERATOR                         */
				/*-----------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
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
