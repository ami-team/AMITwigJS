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
	CONCAT: 118,
	PLUS: 119,
	MINUS: 120,
	POWER: 121,
	MUL: 122,
	FLDIV: 123,
	DIV: 124,
	MOD: 125,
	NOT: 126,
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
		'~',
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
		ami.twig.expr.tokens.CONCAT,
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

			node = this.parseDot1(true);

			var temp; for(temp = node; temp.nodeType === ami.twig.expr.tokens.DOT; temp = temp.nodeLeft);

			temp.list.unshift(left);

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
		var right, node;

		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('not' | '-' | '+') Dot1                 */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.NOT_PLUS_MINUS))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
		var node = this.parseDot2(isFilter);

		if(node)
		{
			/*-------------------------------------------------*/

			var temp; for(temp = node; temp.nodeType === ami.twig.expr.tokens.DOT; temp = temp.nodeLeft);

			/*-------------------------------------------------*/

			if(temp.q)
			{
				/**/ if(temp.nodeType === ami.twig.expr.tokens.FUN)
				{
					if(temp.nodeValue in ami.twig.stdlib)
					{
						temp.nodeValue = 'ami.twig.stdlib.' + temp.nodeValue;
					}
					else
					{
						temp.nodeValue = ((((((('_.'))))))) + temp.nodeValue;
					}
				}
				else if(temp.nodeType === ami.twig.expr.tokens.VAR)
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
		/* Dot1 : Dot2 '.' Dot1                                    */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.DOT))
		{
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), '.');
			this.tokenizer.next();

			right = this.parseDot2(isFilter);

			node.nodeLeft = left;
			node.nodeRight = right;

			left = node;
		}

		/*---------------------------------------------------------*/
		/*      | Dot2                                             */
		/*---------------------------------------------------------*/

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseDot3 = function(isFilter)
	{
		var left = this.parseX(isFilter), right, node;

		/*---------------------------------------------------------*/
		/* parseDot3 : X '[' Filter ']'                            */
		/*---------------------------------------------------------*/

		while(this.tokenizer.checkType(ami.twig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			right = this.parseFilter();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.DOT, '[]');

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
		var node, list;

		/*---------------------------------------------------------*/
		/* Array : '[' Singlets ']'                                */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LB1))
		{
			this.tokenizer.next();

			list = this._parseSinglets();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RB1))
			{
				this.tokenizer.next();

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.LST, 'Array');

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

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LB2))
		{
			this.tokenizer.next();

			dict = this._parseDoublets();

			if(this.tokenizer.checkType(ami.twig.expr.tokens.RB2))
			{
				this.tokenizer.next();

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.DIC, 'Object');

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

		if(this.tokenizer.checkType(ami.twig.expr.tokens.SID))
		{
			node = isFilter ? new ami.twig.expr.Node(0, 'filter_' + this.tokenizer.peekToken())
			                : new ami.twig.expr.Node(0,             this.tokenizer.peekToken())
			;

			node.q = true;

			this.tokenizer.next();

			/*-------------------------------------------------*/
			/* FunVar : SID '(' Singlets ')'                   */
			/*-------------------------------------------------*/

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

			/*-------------------------------------------------*/
			/*        | SID                                    */
			/*-------------------------------------------------*/

			else
			{
				node.nodeType = isFilter ? ami.twig.expr.tokens.FUN
				                         : ami.twig.expr.tokens.VAR
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
				node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken());
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
