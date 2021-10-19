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

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

const amiTwig = {
	version: '1.2.0'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/**/ if(typeof module === 'object' && typeof module.exports === 'object')
{
	module.exports.amiTwig = amiTwig;
}
else if(typeof window !== 'undefined')
{
	window.amiTwig = amiTwig;
}
else if(typeof global !== 'undefined')
{
	global.amiTwig = amiTwig;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default amiTwig;

/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.tokenizer                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tokenizer = {
	/*----------------------------------------------------------------------------------------------------------------*/

	tokenize: function(code, line, spaces, tokenDefs, tokenTypes, error)
	{
		if(tokenDefs.length !== tokenTypes.length)
		{
			throw '`tokenDefs.length != tokenTypes.length`';
		}

		const result_tokens = [];
		const result_types = [];
		const result_lines = [];

		let i = 0x000000000;
		const l = code.length;

		let word = '', token, c;

__l0:	while(i < l)
		{
			c = code.charAt(0);

			/*--------------------------------------------------------------------------------------------------------*/
			/* COUNT LINES                                                                                            */
			/*--------------------------------------------------------------------------------------------------------*/

			if(c === '\n')
			{
				line++;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* EAT SPACES                                                                                             */
			/*--------------------------------------------------------------------------------------------------------*/

			if(spaces.indexOf(c) >= 0)
			{
				if(word)
				{
					if(error)
					{
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

			for(const j in tokenDefs)
			{
				token = this._match(code, tokenDefs[j]);

				if(token)
				{
					if(word)
					{
						if(error)
						{
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

		if(word)
		{
			if(error)
			{
				throw 'invalid token `' + word + '`';
			}

			result_tokens.push(word);
			result_types.push(-1);
			result_lines.push(line);
/*			word = '';
 */		}

		return {
			tokens: result_tokens,
			types: result_types,
			lines: result_lines,
		};
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_match: function(s, stringOrRegExp)
	{
		let m;

		if(stringOrRegExp instanceof RegExp)
		{
			m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, /*-*/m[0]/*-*/) ? /*-*/m[0]/*-*/ : null;
		}
		else
		{
			m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_alphanum: [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
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
		const length = token.length;

		const charCode2 = s.charCodeAt(length - 0);
		const charCode1 = s.charCodeAt(length - 1);

		return isNaN(charCode2)
		       ||
		       this._alphanum[charCode2] === 0
		       ||
		       this._alphanum[charCode1] === 0
		;
	},

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

	$init: function()
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* COMPOSITE TOKENS                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

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

		this.RX = [
			this.RP,
			this.RB1,
		];

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
	VAR: 203,

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.tokens.$init();

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.Tokenizer                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Tokenizer = function(code, line) {
	/*----------------------------------------------------------------------------------------------------------------*/

	this._spaces = [' ', '\t', '\n', '\r'];

	/*----------------------------------------------------------------------------------------------------------------*/

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
		'??',
		'?',
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
		/^'(\\'|[^'])*'/,
		/^"(\\"|[^"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*----------------------------------------------------------------------------------------------------------------*/

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
		amiTwig.expr.tokens.DOUBLE_QUESTION,
		amiTwig.expr.tokens.QUESTION,
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

	/*----------------------------------------------------------------------------------------------------------------*/

	this.$init = function(code, line)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const result = amiTwig.tokenizer.tokenize(
			code,
			line,
			this._spaces,
			this._tokenDefs,
			this._tokenTypes,
			true
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.tokens = result.tokens;
		this.types = result.types;

		this.i = 0;

		/*------------------------------------------------------------------------------------------------------------*/
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.next = function(n = 1)
	{
		this.i += n;
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.isEmpty = function()
	{
		return this.i >= this.tokens.length;
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.peekToken = function()
	{
		return this.tokens[this.i];
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.peekType = function()
	{
		return this.types[this.i];
	};

	/*----------------------------------------------------------------------------------------------------------------*/

	this.checkType = function(type)
	{
		if(this.i < this.tokens.length)
		{
			const TYPE = this.types[this.i];

			return (type instanceof Array) ? (type.indexOf(TYPE) >= 0) : (type === TYPE);
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

amiTwig.expr.Compiler = function(code, line) {

	this.$init(code, line);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Compiler.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(code, line)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		this.tokenizer = new amiTwig.expr.Tokenizer(
			this.code = code,
			this.line = line
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.rootNode = this.parseNullCoalescing();

		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.isEmpty() === false)
		{
			throw 'syntax error, line `' + this.line + '`, unexpected token `' + this.tokenizer.peekToken() + '`';
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dump: function()
	{
		return this.rootNode.dump();
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseNullCoalescing: function()
	{
		let left = this.parseLogicalOr(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* NullCoalescing : LogicalOr ('??' LogicalOr)*                                                               */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOUBLE_QUESTION))
		{
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

	parseLogicalOr: function()
	{
		let left = this.parseLogicalAnd(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* LogicalOr : LogicalAnd ('or' LogicalAnd)*                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_OR))
		{
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

	parseLogicalAnd: function()
	{
		let left = this.parseBitwiseOr(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr ('and' BitwiseOr)*                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LOGICAL_AND))
		{
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

	parseBitwiseOr: function()
	{
		let left = this.parseBitwiseXor(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor ('b-or' BitwiseXor)*                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_OR))
		{
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

	parseBitwiseXor: function()
	{
		let left = this.parseBitwiseAnd(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd ('b-xor' BitwiseAnd)*                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_XOR))
		{
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

	parseBitwiseAnd: function()
	{
		let left = this.parseNot(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* BitwiseAnd : Not ('b-and' Not)*                                                                            */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.BITWISE_AND))
		{
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

	parseNot: function()
	{
		let right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Not : 'not' Comp                                                                                           */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.NOT))
		{
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

	parseComp: function()
	{
		let left = this.parseAddSub(), right, node, swap;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)                                                       */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.CMP_OP))
		{
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.XXX_WITH))
		{
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.MATCHES))
		{
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

		else if(this.tokenizer.checkType(amiTwig.expr.tokens.IN))
		{
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

	parseAddSub: function()
	{
		let left = this.parseMulDiv(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* AddSub : MulDiv (('+' | '-') MulDiv)*                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
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

	parseMulDiv: function()
	{
		let left = this.parsePlusMinus(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* MulDiv : PlusMinus (('*' | '//' | '/' | '%') PlusMinus)*                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
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

	parsePlusMinus: function()
	{
		let right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* PlusMinus : ('-' | '+') Power                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.PLUS_MINUS))
		{
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

	parsePower: function()
	{
		let left = this.parseFilter(), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Power : Filter ('**' Filter)*                                                                              */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.POWER))
		{
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

	parseFilter: function()
	{
		let left = this.parseDot1(), node, temp;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Filter : Dot1 ('|' Dot1)*                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.PIPE))
		{
			this.tokenizer.next();

			node = this.parseDot1(true);

			for(temp = node; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			temp.list.unshift(left);

			left = node;
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseDot1: function(isFilter)
	{
		const node = this.parseDot2(isFilter);

		if(node)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			let temp = node;

			for(; temp.nodeType === amiTwig.expr.tokens.DOT; temp = temp.nodeLeft);

			/*--------------------------------------------------------------------------------------------------------*/

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
						temp.nodeValue = /*---*/'_.'/*---*/ + temp.nodeValue;
					}
				}
				else if(temp.nodeType === amiTwig.expr.tokens.VAR)
				{
					temp.nodeValue = /*---*/'_.'/*---*/ + temp.nodeValue;
				}

				temp.q = false;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		return node;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseDot2: function(isFilter)
	{
		let left = this.parseDot3(isFilter), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Dot2 : Dot3 ('.' Dot3)*                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.DOT))
		{
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

	parseDot3: function(isFilter)
	{
		let left = this.parseX(isFilter), right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Dot3 : X ('[' NullCoalescing ']')*                                                                         */
		/*------------------------------------------------------------------------------------------------------------*/

		while(this.tokenizer.checkType(amiTwig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			right = this.parseNullCoalescing();

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

		/*------------------------------------------------------------------------------------------------------------*/
		/*         | X                                                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

		return left;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseX: function(isFilter)
	{
		let node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* X : Group | Array | Object | FunVar | Terminal                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/
		/* SYNTAX ERROR                                                                                               */
		/*------------------------------------------------------------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or truncated expression';

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseGroup: function()
	{
		let node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Group : '(' NullCoalescing ')'                                                                             */
		/*------------------------------------------------------------------------------------------------------------*/

		if(this.tokenizer.checkType(amiTwig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseNullCoalescing();

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseArray: function()
	{
		let node, list;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                                                                   */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseObject: function()
	{
		let node, dict;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Object : '{' Doublets '}'                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	parseFunVar: function(isFilter)
	{
		let node;

		if(this.tokenizer.checkType(amiTwig.expr.tokens.SID))
		{
			node = new amiTwig.expr.Node(0, isFilter ? 'filter_' + this.tokenizer.peekToken() : this.tokenizer.peekToken());

			node.q = true;

			this.tokenizer.next();

			/*--------------------------------------------------------------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                                                                          */
			/*--------------------------------------------------------------------------------------------------------*/

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

			/*--------------------------------------------------------------------------------------------------------*/
			/*        | SID                                                                                           */
			/*--------------------------------------------------------------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? amiTwig.expr.tokens.FUN
				                         : amiTwig.expr.tokens.VAR
				;

				node.list = [];
			}

			/*--------------------------------------------------------------------------------------------------------*/

			return node;
		}

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseSinglets: function()
	{
		const result = [];

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
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseDoublets: function()
	{
		const result = {};

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
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseSinglet: function(result)
	{
		result.push(this.parseNullCoalescing());
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_parseDoublet: function(result)
	{
		if(this.tokenizer.checkType(amiTwig.expr.tokens.TERMINAL))
		{
			const key = this.tokenizer.peekToken();
			this.tokenizer.next();

			if(this.tokenizer.checkType(amiTwig.expr.tokens.COLON))
			{
/*				const colon = this.tokenizer.peekToken();
 */				this.tokenizer.next();

				/*----------------------------------------------------------------------------------------------------*/

				result[key] = this.parseNullCoalescing();

				/*----------------------------------------------------------------------------------------------------*/
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

	/*----------------------------------------------------------------------------------------------------------------*/

	parseTerminal: function()
	{
		let left, right, node;

		/*------------------------------------------------------------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                                                                                */
		/*------------------------------------------------------------------------------------------------------------*/

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

		/*------------------------------------------------------------------------------------------------------------*/

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.expr.Node                                                                                                  */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Node = function(nodeType, nodeValue) {

	this.$init(nodeType, nodeValue);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.expr.Node.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(nodeType, nodeValue)
	{
		this.nodeType = nodeType;
		this.nodeValue = nodeValue;
		this.nodeLeft = null;
		this.nodeRight = null;
		this.list = null;
		this.dict = null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	_dump: function(nodes, edges, pCnt)
	{
		let CNT;

		const cnt = pCnt[0];

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
			for(const i in this.list)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.list[i]._dump(nodes, edges, pCnt);
			}
		}

		if(this.dict)
		{
			for(const i in this.dict)
			{
				CNT = ++pCnt[0];
				edges.push('\tnode' + cnt + ' -> node' + CNT + ' [label="[' + i.replace(/"/g, '\\"') + ']"];');
				this.dict[i]._dump(nodes, edges, pCnt);
			}
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	dump: function()
	{
		const nodes = [];
		const edges = [];

		this._dump(nodes, edges, [0]);

		return 'digraph ast {\n\trankdir=TB;\n' + nodes.join('\n') + '\n' + edges.join('\n') + '\n}';
	},

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

amiTwig.tmpl.Compiler = function(tmpl) {

	this.$init(tmpl);
};

/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler.prototype = {
	/*----------------------------------------------------------------------------------------------------------------*/

	STATEMENT_RE: /{%\s*([a-zA-Z]+)\s*((?:.|\n)*?)\s*%}/,

	COMMENT_RE: /{#\s*((?:.|\n)*?)\s*#}/g,

	/*----------------------------------------------------------------------------------------------------------------*/

	_count: function(s)
	{
		let result = 0;

		const l = s.length;

		for(let i = 0; i < l; i++)
		{
			if(s[i] === '\n') result++;
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	$init: function(tmpl)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let line = 1;

		let column;
		let COLUMN;

		/*------------------------------------------------------------------------------------------------------------*/

		this.rootNode = {
			line: line,
			keyword: '@root',
			expression: '',
			blocks: [{
				expression: '@true',
				list: [],
			}],
			value: '',
		};

		/*------------------------------------------------------------------------------------------------------------*/

		const stack1 = [this.rootNode];
		const stack2 = [0x00000000000];

		let item;

		/*------------------------------------------------------------------------------------------------------------*/

		for(tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN))
		{
			/*--------------------------------------------------------------------------------------------------------*/

			const curr = stack1[stack1.length - 1];
			 let  indx = stack2[stack2.length - 1];

			/*--------------------------------------------------------------------------------------------------------*/

			const m = tmpl.match(this.STATEMENT_RE);

			/*--------------------------------------------------------------------------------------------------------*/

			if(m === null)
			{
				/*----------------------------------------------------------------------------------------------------*/

				line += this._count(tmpl);

				/*----------------------------------------------------------------------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: tmpl,
				});

				/*----------------------------------------------------------------------------------------------------*/

				const errors = [];

				for(let i = stack1.length - 1; i > 0; i--)
				{
					/**/ if(stack1[i].keyword === 'if')
					{
						errors.push('missing keyword `endif`');
					}
					else if(stack1[i].keyword === 'for')
					{
					 	errors.push('missing keyword `endfor`');
					}
				}

				if(errors.length > 0)
				{
					throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
				}

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			const match = m[0];
			const keyword = m[1];
			const expression = m[2];

			column = m.index + 0x0000000000;
			COLUMN = m.index + match.length;

			const value = tmpl.substr(0, column);
			const VALUE = tmpl.substr(0, COLUMN);

			/*--------------------------------------------------------------------------------------------------------*/

			line += this._count(VALUE);

			/*--------------------------------------------------------------------------------------------------------*/

			if(value)
			{
				item = {
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: value,
				}

				curr.blocks[indx].list.push(item);
			}

			/*--------------------------------------------------------------------------------------------------------*/

			switch(keyword)
			{
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
						value: '',
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
							list: [],
						}],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					stack1.push(item);
					stack2.push(0x00);

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'elseif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `elseif`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: expression,
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if'
					   &&
					   curr['keyword'] !== 'for'
					 ) {
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@true',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*----------------------------------------------------------------------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
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

	dump: function()
	{
		return JSON.stringify(this.rootNode, null, 2);
	},

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

	_render: function(result, item, dict = {}, tmpls = {})
	{
		let m;

		let expression;

		this.dict = dict;
		this.tmpls = tmpls;

		switch(item.keyword)
		{
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

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const parts = m[1].split('.'), l = parts.length - 1;

				let parent, j;

				if(parts[0] === 'window'
				   ||
				   parts[0] === 'global'
				 ) {
					/**/ if(typeof window !== 'undefined') {
						parent = window;
					}
					else if(typeof global !== 'undefined') {
						parent = global;
					}
					else {
						throw 'internal error';
					}

					j = 1;
				}
				else
				{
					parent = dict;

					j = 0;
				}

				/*----------------------------------------------------------------------------------------------------*/

				let i;

				for(i = j; i < l; i++)
				{
					if(parent[parts[i]])
					{
						parent = parent[parts[i]];
					}
					else
					{
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

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					let value = amiTwig.expr.cache.eval(expression, item.line, dict);

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

				item.blocks.every((block) => {

					expression = block.expression;

					if(expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						for(const i in block.list)
						{
							this._render(result, block.list[i], dict, tmpls);
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

				let sym1;
				let sym2;
				let expr;

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

				if(!m)
				{
					m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

					if(!m)
					{
						throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
					}
					else
					{
						sym1 = m[1];
						sym2 = null;
						expr = m[2];
					}
				}
				else
				{
					sym1 = m[1];
					sym2 = m[2];
					expr = m[3];
				}

				/*----------------------------------------------------------------------------------------------------*/

				const origValue = amiTwig.expr.cache.eval(expr, item.line, dict);

				const typeName = Object.prototype.toString.call(origValue);

				/*----------------------------------------------------------------------------------------------------*/

				let iterValue;

				if(typeName === '[object Object]')
				{
					iterValue = sym2 ? Object.entries(origValue)
					                 : Object.keys(origValue)
					;
				}
				else
				{
					iterValue = origValue;

					if(typeName !== '[object Array]'
					   &&
					   typeName !== '[object String]'
					 ) {
						throw 'syntax error, line `' + item.line + '`, right operand not iterable';
					}

					if(sym2)
					{
						throw 'syntax error, line `' + item.line + '`, right operand not an object';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				const l = iterValue.length;

				if(l > 0)
				{
					let k = 0x00000000000000;

					const list = item.blocks[0].list;

					if(sym2)
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict[(sym2)];
						const old3 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const [key, val] of iterValue)
						{
							dict[sym1] = key;
							dict[sym2] = val;

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old3;
						dict[(sym2)] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
					else
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const val of iterValue)
						{
							dict[sym1] = val;

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
				}
				else
				{
					if(item.blocks.length > 1)
					{
						const list = item.blocks[1].list;

						for(const j in list)
						{
							this._render(result, list[j], dict, tmpls);
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

				let m_1_ = item.expression, with_subexpr, with_context;

				/**/ if((m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = false;
				}
				else if((m = m_1_.match(/(.+)\s+with\s+(.+)$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = true;
				}
				else if((m = m_1_.match(/(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = '{}';
					with_context = false;
				}
				else
				{
					expression = m_1_;
					with_subexpr = '{}';
					with_context = true;
				}

				/*----------------------------------------------------------------------------------------------------*/

				const fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(fileName) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(variables) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.push(amiTwig.stdlib.include(
					fileName,
					variables,
					with_context,
					false
				));

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(tmpl, dict = {}, tmpls = {})
	{
		const result = [];

		switch(Object.prototype.toString.call(tmpl))
		{
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict, tmpls);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl/*--------------*/, dict, tmpls);
				break;
		}

		return result.join('');
	},

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

	eval: function(expression, line, _)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		let f;

		if(expression in this.dict)
		{
			f = this.dict[expression];
		}
		else
		{
			f = this.dict[expression] = eval(
				amiTwig.expr.interpreter.getJS(
					new amiTwig.expr.Compiler(expression, line)
				)
			);
		}

		/*------------------------------------------------------------------------------------------------------------*/

		_ = _ || {};

		return f.call(_, _);

		/*------------------------------------------------------------------------------------------------------------*/
	},

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

	'isUndefined': function(x)
	{
		return x === undefined;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return x !== undefined;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNotNull': function(x)
	{
		return x !== null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

		const typeName = Object.prototype.toString.call(x);

		return (typeName === '[object Array]' && x.length === 0)
		       ||
		       (typeName === '[object Object]' && Object.keys(x).length === 0)
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isIterable': function(x)
	{
		const typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* ITERABLES                                                                                                      */
	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		if(this.isNumber(x1)
		   &&
		   this.isNumber(x2)
		 ) {
			return (/*---*/x/*---*/ >= /*---*/x1/*---*/)
			       &&
			       (/*---*/x/*---*/ <= /*---*/x2/*---*/)
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

	/*----------------------------------------------------------------------------------------------------------------*/

	'range': function(x1, x2, step = 1)
	{
		const result = [];

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(let i = /*---*/x1/*---*/; i <= /*---*/x2/*---*/; i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(let i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_merge': function()
	{
		if(arguments.length > 1)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			if(this.isString(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isString(item))
					{
						return null;
					}

					L.push(arguments[i]);
				}

				return L.join('');
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(this.isArray(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isArray(item))
					{
						return null;
					}

					for(const j in item) L.push(item[j]);
				}

				return L;
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(this.isObject(arguments[0]))
			{
				const D = {};

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isObject(item))
					{
						return null;
					}

					for(const j in item) D[j] = item[j];
				}

				return D;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		return null;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_column': function(x, key)
	{
		return this.isArray(x) ? x.map((val) => val[key]) : [];
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_batch': function(x, n, missing = '')
	{
	    const result = [];

		if(this.isArray(x)
		   &&
		   this.isNumber(n)
		 ) {
			const l = x.length;

			if(l > 0)
			{
				let last;

				const m = Math.ceil(l / n) * n;

				for(let i = 0; i < l; i += n)
				{
					result.push(last = x.slice(i, i + n));
				}

				for(let i = l; i < m; i += 1)
				{
					last.push(missing);
				}
			}
		}

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* STRINGS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	'startsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			const base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'endsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			const base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'match': function(s, regex)
	{
		if(this.isString(((s)))
		   &&
		   this.isString(regex)
		 ) {
			const idx1 = regex.  indexOf  ('/');
			const idx2 = regex.lastIndexOf('/');

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_default': function(s1, s2)
	{
		return s1 || s2 || '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

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

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim()
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'_replace': function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = (((s))).length;
		const m = oldStrs.length;
		const n = newStrs.length;

		if(m !== n)
		{
			throw 'internal error';
		}

__l0:	for(let i = 0; i < l; i += 0)
		{
			const p = s.substring(i);

			for(let j = 0; j < m; j += 1)
			{
				if(p.indexOf(oldStrs[j]) === 0)
				{
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

	'_textToHtmlX': ['&'    , '"'     , '<'   , '>'   ],
	'_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToStringX': ['\\'  , '\n' , '"'  , '\''  ],
	'_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

	/*----------------------------------------------------------------------------------------------------------------*/

	'_textToJsonStringX': ['\\'  , '\n' , '"'  ],
	'_textToJsonStringY': ['\\\\', '\\n', '\\"'],

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			switch(mode || 'html')
			{
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

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s)
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>')
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s
		                        : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict))
		                                               : ''
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max)
		                        : []
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* NUMBERS                                                                                                        */
	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_round': function(x, mode)
	{
		switch(mode)
		{
			case 'ceil':
				return Math.ceil(x);

			case 'floor':
				return Math.floor(x);

			default:
				return Math.round(x);
		}
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'min': function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*------------------------------------------------------------------------------------------------------------*/

		let result = Number.POSITIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result > args[i])
			{
				result = args[i];
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'max': function()
	{
		/*------------------------------------------------------------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*------------------------------------------------------------------------------------------------------------*/

		let result = Number.NEGATIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result < args[i])
			{
				result = args[i];
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/

		return result;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* RANDOM                                                                                                         */
	/*----------------------------------------------------------------------------------------------------------------*/

	'random': function(x)
	{
		const y = Math.random();

		if(x)
		{
			if(this.isArray(x)
			   ||
			   this.isObject(x)
			 ) {
			 	const X = Object.keys(x);

				return x[
					X[Math.floor(X.length * y)]
				];
			}

			if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}

			if(this.isNumber(x))
			{
				return Math.floor(x * y);
			}
		}

		x = Number.MAX_SAFE_INTEGER;

		return Math.floor(x * y);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* JSON                                                                                                           */
	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_json_encode': function(x, indent)
	{
		return JSON.stringify(x, null, this.isNumber(indent) ? indent : 2);
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x)
		                                     : []
		;
	},

	/*----------------------------------------------------------------------------------------------------------------*/
	/* TEMPLATES                                                                                                      */
	/*----------------------------------------------------------------------------------------------------------------*/

	'include': function(fileName, variables = {}, withContext = true, ignoreMissing = false)
	{
		/*------------------------------------------------------------------------------------------------------------*/

		if(fileName in amiTwig.engine.tmpls)
		{
			const temp = {};

			/*--------------------------------------------------------------------------------------------------------*/

			if(withContext)
			{
				for(const i in amiTwig.engine.dict)
				{
					temp[i] = amiTwig.engine.dict[i];
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			if(variables)
			{
				for(const i in /*-*/variables/*-*/)
				{
					temp[i] = /*-*/variables/*-*/[i];
				}
			}

			/*--------------------------------------------------------------------------------------------------------*/

			return amiTwig.engine.render(amiTwig.engine.tmpls[fileName], temp);

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/

		if(!ignoreMissing)
		{
			throw 'runtime error, could not open `' + fileName + '`';
		}

		return '';

		/*------------------------------------------------------------------------------------------------------------*/
	},

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

	_getJS: function(node)
	{
		let L;
		let x;
		let left;
		let right;
		let operator;

		switch(node.nodeType)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* LST                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(/*-----*/ this._getJS(node.list[i]));
				}

				/*----------------------------------------------------------------------------------------------------*/

				return '[' + L.join(',') + ']';

			/*--------------------------------------------------------------------------------------------------------*/
			/* DIC                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*----------------------------------------------------------------------------------------------------*/

				return '{' + L.join(',') + '}';

			/*--------------------------------------------------------------------------------------------------------*/
			/* FUN                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*----------------------------------------------------------------------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*--------------------------------------------------------------------------------------------------------*/
			/* VAR                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*----------------------------------------------------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
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

			/*--------------------------------------------------------------------------------------------------------*/
			/* IN                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

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

				if(node.nodeValue[0] === '.')
				{
					return left + '.' + right;
				}
				else
				{
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

				if(node.nodeLeft === null
				   &&
				   node.nodeRight !== null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeRight) + ')';
				}

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight === null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return '(' + this._getJS(node.nodeLeft) + ')' + operator;
				}

				/*----------------------------------------------------------------------------------------------------*/
				/* BINARY OPERATOR                                                                                    */
				/*----------------------------------------------------------------------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
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

	getJS: function(expr)
	{
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	eval: function(expr, _)
	{
		_ = _ || {};

		return eval(this.getJS(expr)).call(_, _);
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
