/*!
 * AMI TWIG Engine
 *
 * Version: 0.1.0
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami                                                                     */
/*-------------------------------------------------------------------------*/

if(!window.ami)
{
	window.ami = {};
}

/*-------------------------------------------------------------------------*/
/* ami.twig                                                                */
/*-------------------------------------------------------------------------*/

ami.twig = {};

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

			for(var idx in tokenDefs)
			{
				var token = this._match(code, tokenDefs[idx]);

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

					var type = tokenTypes[idx];

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
		if(stringOrRegExp instanceof RegExp)
		{
			var m = s.match(stringOrRegExp);

			return m !== null && this._checkNextChar(s, (((((m[0])))))) ? (((((m[0]))))) : null;
		}
		else
		{
			var m = s.indexOf(stringOrRegExp);

			return m === 0x00 && this._checkNextChar(s, stringOrRegExp) ? stringOrRegExp : null;
		}
	},

	/*-----------------------------------------------------------------*/

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
			this.RB,
		];
	},

	/*-----------------------------------------------------------------*/
	/* REAL TOKENS                                                     */
	/*-----------------------------------------------------------------*/

	LOGICAL_OR: 100,
	LOGICAL_AND: 101,
	BITWISE_OR: 102,
	BITWISE_XOR: 103,
	BITWISE_AND: 104,
	CMP_OP: 105,
	IS: 106,
	IS_XXX: 107,
	XXX_WITH: 108,
	WITH: 109,
	MATCHES: 110,
	IN: 111,
	RANGE: 112,
	PLUS: 113,
	MINUS: 114,
	POWER: 115,
	MUL: 116,
	FLDIV: 117,
	DIV: 118,
	MOD: 119,
	NOT: 120,
	DOT: 121,
	COMMA: 122,
	LP: 123,
	RP: 124,
	LB: 125,
	RB: 126,
	TERMINAL: 127,
	SID: 128,

	/*-----------------------------------------------------------------*/
	/* VIRTUAL TOKENS                                                  */
	/*-----------------------------------------------------------------*/

	FUN: 200,
	VAR: 201,

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
		'or', 'and',
		'b-or', 'b-xor', 'b-and',
		'is',
		'defined', 'null', 'empty', 'iterable', 'even', 'odd',
		'===', '==', '!==', '!=', '<=', '>=', '<', '>',
		'starts', 'ends',
		'with',
		'matches',
		'in',
		'+', '-', '**', '*', '//', '/', '%',
		'not',
		'..', '.', ',',
		'(', ')', '[', ']',
		/^[0-9]+\.[0-9]+/, /^[0-9]+/, /^'(\\'|[^\'])*'/, /^"(\\"|[^\"])*"/,
		/^[a-zA-Z_$][a-zA-Z0-9_$]*/,
	];

	/*-----------------------------------------------------------------*/

	this._tokenTypes = [
		ami.twig.expr.tokens.LOGICAL_OR, ami.twig.expr.tokens.LOGICAL_AND,
		ami.twig.expr.tokens.BITWISE_OR, ami.twig.expr.tokens.BITWISE_XOR, ami.twig.expr.tokens.BITWISE_AND,
		ami.twig.expr.tokens.IS,
		ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX, ami.twig.expr.tokens.IS_XXX,
		ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP, ami.twig.expr.tokens.CMP_OP,
		ami.twig.expr.tokens.XXX_WITH, ami.twig.expr.tokens.XXX_WITH,
		ami.twig.expr.tokens.WITH,
		ami.twig.expr.tokens.MATCHES,
		ami.twig.expr.tokens.IN,
		ami.twig.expr.tokens.PLUS, ami.twig.expr.tokens.MINUS, ami.twig.expr.tokens.POWER, ami.twig.expr.tokens.MUL, ami.twig.expr.tokens.FLDIV, ami.twig.expr.tokens.DIV, ami.twig.expr.tokens.MOD,
		ami.twig.expr.tokens.NOT,
		ami.twig.expr.tokens.RANGE, ami.twig.expr.tokens.DOT, ami.twig.expr.tokens.COMMA,
		ami.twig.expr.tokens.LP, ami.twig.expr.tokens.RP, ami.twig.expr.tokens.LB, ami.twig.expr.tokens.RB,
		ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL, ami.twig.expr.tokens.TERMINAL,
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

		this.rootNode = this.parseLogicalOr();

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

	this.parseLogicalOr = function()
	{
		var left = this.parseLogicalAnd();

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd 'or' LogicalOr                   */
		/*           | LogicalAnd                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_OR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseLogicalOr();

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
		var left = this.parseBitwiseOr();

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr 'and' LogicalAnd                 */
		/*            | BitwiseOr                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LOGICAL_AND))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseLogicalAnd();

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
		var left = this.parseBitwiseXor();

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor 'b-or' BitwiseOr                 */
		/*           | BitwiseXor                                  */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_OR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseOr();

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
		var left = this.parseBitwiseAnd();

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd 'b-xor' parseBitwiseXor         */
		/*            | BitwiseAnd                                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_XOR))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseXor();

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
		var left = this.parseComp();

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp 'b-and' BitwiseAnd                    */
		/*            | Comp                                       */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.BITWISE_AND))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseBitwiseAnd();

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
		var left = this.parseAddSub();

		/*---------------------------------------------------------*/
		/* Comp : AddSub 'is' 'not'? ('defined' | 'null' | ...)    */
		/*---------------------------------------------------------*/

		/**/ if(this.tokenizer.checkType(ami.twig.expr.tokens.IS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			/* swap 'is' and 'not' */
			var swap = node;
			/* swap 'is' and 'not' */

			if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT))
			{
				node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				node.nodeLeft = swap;
				node.nodeRight = null;
			}

			if(this.tokenizer.checkType(ami.twig.expr.tokens.IS_XXX))
			{
				var right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
				this.tokenizer.next();

				swap.nodeLeft = left;
				swap.nodeRight = right;
			}
			else
			{
				throw 'syntax error, line `' + this.line + '`, keyword `defined` or `null` or `empty` or `iterable` or `even` or `odd` expected';
			}

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('===' | '==' | ...) AddSub               */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.CMP_OP))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub ('starts' | 'ends') `with` AddSub         */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.XXX_WITH))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next(2);

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'matches' AddSub                          */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.MATCHES))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | AddSub 'in' X                                    */
		/*---------------------------------------------------------*/

		else if(this.tokenizer.checkType(ami.twig.expr.tokens.IN))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseX();

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
		var left = this.parseMulDiv();

		/*---------------------------------------------------------*/
		/* AddSub : MulDiv ('+' | '-') AddSub                      */
		/*        | MulDiv                                         */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.PLUS_MINUS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseAddSub();

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
		var left = this.parsePower();

		/*---------------------------------------------------------*/
		/* MulDiv : Power ('*' | '//' | '/' | '%') MulDiv          */
		/*        | Power                                          */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.MUL_FLDIV_DIV_MOD))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parseMulDiv();

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
		var left = this.parseNotPlusMinus();

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus '**' Power                         */
		/*       | NotPlusMinus                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.POWER))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var right = this.parsePower();

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
		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('not' | '-' | '+') Y                    */
		/*              | Y                                        */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT_PLUS_MINUS))
		{
			var node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			var left = this.parseY();

			node.nodeLeft = left;
			node.nodeRight = null;

			return node;
		}

		/*---------------------------------------------------------*/

		return this.parseY();
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function()
	{
		/*---------------------------------------------------------*/
		/* X : FunVar | Terminal                                   */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseFunVar())) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseY = function()
	{
		/*---------------------------------------------------------*/
		/* X : Group | FunVar | Terminal                           */
		/*---------------------------------------------------------*/

		var node;

		if((node = this.parseGroup())) {
			return node;
		}

		if((node = this.parseFunVar())) {
			return node;
		}

		if((node = this.parseTerminal())) {
			return node;
		}

		/*---------------------------------------------------------*/

		throw 'syntax error, line `' + this.line + '`, syntax error or tuncated expression';

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	this.parseGroup = function()
	{
		/*---------------------------------------------------------*/
		/* Group : '(' LogicalOr ')'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
		{
			this.tokenizer.next();

			var node = this.parseLogicalOr();

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

	this.parseFunVar = function()
	{
		/*---------------------------------------------------------*/
		/* FunVar : SID ('.' SID)* '(' Params ')'                  */
		/*        | SID ('.' SID)* '[' Params ']'                  */
		/*        | SID ('.' SID)*                                 */
		/*---------------------------------------------------------*/

		var qid = '.';

		if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
		{
			qid += this.tokenizer.peekToken();
			this.tokenizer.next();

			while(this.tokenizer.checkType(ami.twig.expr.tokens.DOT))
			{
				qid += this.tokenizer.peekToken();
				this.tokenizer.next();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
				{
					qid += this.tokenizer.peekToken();
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, id expected';
				}
			}

			/*-------------------------------------------------*/
			/* FUNCTION                                        */
			/*-------------------------------------------------*/

			if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
			{
				this.tokenizer.next();

				var L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}

				var result = new ami.twig.expr.Node(ami.twig.expr.tokens.FUN, 'ami.twig.stdlib' + qid);
				result.list = L;
				return result;
			}

			/*-------------------------------------------------*/
			/* VARIABLE                                        */
			/*-------------------------------------------------*/

			if(this.tokenizer.checkType(ami.twig.expr.tokens.LB))
			{
				this.tokenizer.next();

				var L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RB))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `]` expected';
				}

				var result = new ami.twig.expr.Node(ami.twig.expr.tokens.VAR, ((((((('_'))))))) + qid);
				result.list = L;
				return result;
			}

			/*-------------------------------------------------*/

			return new ami.twig.expr.Node(ami.twig.expr.tokens.VAR, ((((((('_'))))))) + qid);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/

		return null;
	};

	/*-----------------------------------------------------------------*/

	this._parseParams = function()
	{
		var result = [];

		while(this.tokenizer.checkType(ami.twig.expr.tokens.RX) === false)
		{
			result.push(this.parseLogicalOr());

			if(this.tokenizer.checkType(ami.twig.expr.tokens.COMMA) === true)
			{
				this.tokenizer.next();
			}
			else
			{
				return result;
			}
		}

		return result;
	};

	/*-----------------------------------------------------------------*/

	this.parseTerminal = function()
	{
		/*---------------------------------------------------------*/
		/* Terminal : TERMINAL | RANGE                             */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
		{
			var left = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
			this.tokenizer.next();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RANGE))
			{
				var node = new ami.twig.expr.Node(((ami.twig.expr.tokens.RANGE)), this.tokenizer.peekToken());
				this.tokenizer.next();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.TERMINAL))
				{
					var right = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		this.list = [];
	};

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt)
	{
		var cnt = pCnt[0];

		nodes.push('\tnode' + cnt + ' [label="' + this.nodeValue.replace(/"/g, '\\"') + '"];');

		if(this.nodeLeft)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeLeft._dump(nodes, edges, pCnt);
		}

		if(this.nodeRight)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.nodeRight._dump(nodes, edges, pCnt);
		}

		for(var i in this.list)
		{
			var CNT = ++pCnt[0];
			edges.push('\tnode' + cnt + ' -> node' + CNT + ';');
			this.list[i]._dump(nodes, edges, pCnt);
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

	/*-----------------------------------------------------------------*/

	STACK_ITEM_IF_TRY_AGAIN: 0,
	STACK_ITEM_IF_TRUE_DONE: 1,
	STACK_ITEM_IF_TRUE_TODO: 2,
	STACK_ITEM_FOR: 3,
	STACK_ITEM_FILTER: 4,
	STACK_ITEM_0: 5,

	/*-----------------------------------------------------------------*/

	_newStackItem: function(type, symb, iter)
	{
		if(!symb) {
			symb = (null);
		}

		if(!iter) {
			iter = [null];
		}

		return {
			type: type,
			symb: symb,
			iter: iter,
		};
	},

	/*-----------------------------------------------------------------*/

	_hasToBeShown: function(stack)
	{
		/*---------------------------------------------------------*/

		var lastIndex = stack.length - 1;

		/*---------------------------------------------------------*/

		if(stack[lastIndex].type === this.STACK_ITEM_IF_TRY_AGAIN
		   ||
		   stack[lastIndex].type === this.STACK_ITEM_IF_TRUE_DONE
		 ) {
			return false;
		}

		/*---------------------------------------------------------*/

		for(var i = 0; i < lastIndex; i++)
		{
			if(stack[i].type === this.STACK_ITEM_IF_TRY_AGAIN)
			{
				return false;
			}
		}

		/*---------------------------------------------------------*/

		return true;
	},

	/*-----------------------------------------------------------------*/

	render: function(s, dict)
	{
		var result = '';

		var stack = [];

		var line = 1;

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		stack.push(this._newStackItem(this.STACK_ITEM_0));

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		for(;; s = s.substr(COLUMN_NR))
		{
			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var lastStackItem = stack[stack.length - 1];

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			var m = s.match(this.STATEMENT_RE);

			/*-------------------------------------------------*/

			if(m === null)
			{
				/*-----------------------------------------*/
				/* GET LINE NUMBER                         */
				/*-----------------------------------------*/

				for(var i in s)
				{
					if(s[i] === '\n')
					{
						line++;
					}
				}

				/*-----------------------------------------*/
				/* GENERATE HTML                           */
				/*-----------------------------------------*/

				if(this._hasToBeShown(stack))
				{
					result += s.replace(this.VARIABLE_RE, function(match, expression) {

						var EXPRESSION = new ami.twig.expr.Compiler(expression, line);

						return ami.twig.expr.interpreter.eval(EXPRESSION, dict);
					});
				}

				/*-----------------------------------------*/
				/* CHECK FOR NON-CLOSED BLOCKS             */
				/*-----------------------------------------*/

				var msg = [];

				for(var i = 1; i < stack.length; i++)
				{
					var x = stack[i].type;

					/**/ if(x === this.STACK_ITEM_IF_TRY_AGAIN
					        ||
					        x === this.STACK_ITEM_IF_TRUE_DONE
					        ||
					        x === this.STACK_ITEM_IF_TRUE_TODO
					 ) {
					 	msg.push('missing keyword `endif`');
					 }
					 else if(x === this.STACK_ITEM_FOR)
					 {
					 	msg.push('missing keyword `endfor`');
					 }
					 else if(x === this.STACK_ITEM_FILTER)
					 {
					 	msg.push('missing keyword `endfilter`');
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

			/*-------------------------------------------------*/
			/* GET POSITION AND LINE NUMBER                    */
			/*-------------------------------------------------*/

			var column_nr = m.index + 0x0000000000;
			var COLUMN_NR = m.index + match.length;

			for(var i in match)
			{
				if(match[i] === '\n')
				{
					line++;
				}
			}

			/*-------------------------------------------------*/
			/* GENERATE HTML                                   */
			/*-------------------------------------------------*/

			if(this._hasToBeShown(stack))
			{
				var SYMB = lastStackItem.symb;
				var ITER = lastStackItem.iter;

				if(SYMB)
				{
					var DICT = {};

					for(var symb in dict)
					{
						DICT[symb] = dict[symb];
					}

					for(var i in ITER)
					{
						DICT[SYMB] = ITER[i];

						result += s.substr(0, column_nr).replace(this.VARIABLE_RE, function(match, expression) {

							var EXPRESSION = new ami.twig.expr.Compiler(expression, line);

							return ami.twig.expr.interpreter.eval(EXPRESSION, DICT);
						});
					}
				}
				else
				{
					result += s.substr(0, column_nr).replace(this.VARIABLE_RE, function(match, expression) {

						var EXPRESSION = new ami.twig.expr.Compiler(expression, line);

						return ami.twig.expr.interpreter.eval(EXPRESSION, dict);
					});
				}
			}

			/*-------------------------------------------------*/
			/* IF KEYWORD                                      */
			/*-------------------------------------------------*/

			/**/ if(keyword === 'if')
			{
				stack.push(this._newStackItem(ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expression, line), dict) ? this.STACK_ITEM_IF_TRUE_TODO : this.STACK_ITEM_IF_TRY_AGAIN));
			}

			/*-------------------------------------------------*/
			/* ELSEIF KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'elseif')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				/**/ if(lastStackItem.type === this.STACK_ITEM_IF_TRY_AGAIN)
				{
					lastStackItem.type = ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expression, line), dict) ? this.STACK_ITEM_IF_TRUE_TODO : this.STACK_ITEM_IF_TRY_AGAIN;
				}
				else if(lastStackItem.type === this.STACK_ITEM_IF_TRUE_TODO)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_DONE;
				}
			}

			/*-------------------------------------------------*/
			/* ELSE KEYWORD                                    */
			/*-------------------------------------------------*/

			else if(keyword === 'else')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				/**/ if(lastStackItem.type === this.STACK_ITEM_IF_TRY_AGAIN)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_TODO;
				}
				else if(lastStackItem.type === this.STACK_ITEM_IF_TRUE_TODO)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_DONE;
				}
			}

			/*-------------------------------------------------*/
			/* ENDIF KEYWORD                                   */
			/*-------------------------------------------------*/

			else if(keyword === 'endif')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* FILTER KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'for')
			{
				/*-----------------------------------------*/

				var parts = expression.split('in');

				/*-----------------------------------------*/

				var symb = parts[0].trim();
				var expr = parts[1].trim();

				var iter = ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expr, line), dict);

				/*-----------------------------------------*/

				if(!(iter instanceof Array)
				   &&
				   !(iter instanceof Object)
			           &&
				   !(typeof(iter) === 'string')
				 ) {
					throw 'runtime error, line `' + line + '`, `' + symb + '` must be iterable';
				}

				/*-----------------------------------------*/

				stack.push(this._newStackItem(this.STACK_ITEM_FOR, symb, iter));

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* ENDFOR KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'endfor')
			{
				if(lastStackItem.type !== this.STACK_ITEM_FOR)
				{
					throw 'syntax error, line `' + line + '`, missing keyword `for`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* FILTER KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'filter')
			{
				stack.push(this._newStackItem(this.STACK_ITEM_FILTER));
			}

			/*-------------------------------------------------*/
			/* ENDFILTER KEYWORD                               */
			/*-------------------------------------------------*/

			else if(keyword === 'endfilter')
			{
				if(lastStackItem.type !== this.STACK_ITEM_FILTER)
				{
					throw 'syntax error, line `' + line + '`, missing keyword `filter`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* UNKNOWN KEYWORD                                 */
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

	isEmpty: function(x)
	{
		return x === null || x === false || x === '' || x === [] || x === {};
	},

	/*-----------------------------------------------------------------*/

	isIterable: function(x)
	{
		return (x instanceof Array)
		       ||
		       (x instanceof Object)
		       ||
		       (typeof(x) === 'string')
		;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	isInObject: function(x, y)
	{
		if(y instanceof Array
		   ||
		   typeof(y) === 'string'
		 ) {
		 	return y.indexOf(x) >= 0;
		}
		
		if(x instanceof Object)
		{
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	isInRange: function(x, x1, x2)
	{

		/**/ if(typeof(x1) === 'number'
		        &&
		        typeof(x2) === 'number'
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}
		else if(typeof(x1) === 'string' && x1.length === 1
		        &&
		        typeof(x2) === 'string' && x2.length === 1
		 ) {
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	range: function(x1, x2, step)
	{
		var result = [];

		if(!step)
		{
			step = 1;
		}

		/**/ if(typeof(x1) === 'number'
		        &&
		        typeof(x2) === 'number'
		 ) {
			for(var i = (((((((x1))))))); i <= (((((((x2))))))); i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(typeof(x1) === 'string' && x1.length === 1
		        &&
		        typeof(x2) === 'string' && x2.length === 1
		 ) {
			for(var i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	startsWith: function(s1, s2)
	{
		var base = 0x0000000000000000000;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	endsWith: function(s1, s2)
	{
		var base = s1.length - s2.length;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	match: function(s, regex)
	{
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
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	min: function()
	{
		return Math.min(arguments);
	},

	/*-----------------------------------------------------------------*/

	max: function()
	{
		return Math.max(arguments);
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
		/*---------------------------------------------------------*/
		/* FUNCTIONS, VARIABLES, TERMINALS                         */
		/*---------------------------------------------------------*/

		if(node.nodeLeft === null
		   &&
		   node.nodeRight === null
		 ) {
			if(node.list.length > 0)
			{
				var L = [];

				for(var i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

				/**/ if(node.nodeType === ami.twig.expr.tokens.FUN)
				{
					return node.nodeValue + '(' + L.join(',') + ')';
				}
				else if(node.nodeType === ami.twig.expr.tokens.VAR)
				{
					return node.nodeValue + '[' + L.join(',') + ']';
				}

				throw 'internal error';
			}

			return node.nodeValue;
		}

		/*---------------------------------------------------------*/
		/* UNIARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight === null
		 ) {
			var operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeLeft) + ')';
		}

		/*---------------------------------------------------------*/
		/* BINARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight !== null
		 ) {
			var left;
			var right;

			var operator;

			switch(node.nodeType)
			{
				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IS:

					left = this._getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case ami.twig.expr.tokens.DEFINED:
							return '((' + left + ')!==undefined)';

						case ami.twig.expr.tokens.NULL:
							return '((' + left + ')===null)';

						case ami.twig.expr.tokens.EMPTY:
							return 'ami.twig.stdlib.isEmpty(' + left + ')';

						case ami.twig.expr.tokens.ITERABLE:
							return 'ami.twig.stdlib.isIterable(' + left + ')';

						case ami.twig.expr.tokens.EVEN:
							return '((' + left + ')&1===0)';

						case ami.twig.expr.tokens.ODD:
							return '((' + left + ')&1===1)';
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
					 	var x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return 'ami.twig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
					}

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.STARTS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.startsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.ENDS:

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
		return this._getJS(expr.rootNode);
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

		return eval(this._getJS(expr.rootNode));
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
