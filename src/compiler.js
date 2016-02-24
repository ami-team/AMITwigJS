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
		var left = this.parseLogicalAnd(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalOr : LogicalAnd 'or' LogicalOr                   */
		/*           | LogicalAnd                                  */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseLogicalAnd = function()
	{
		var left = this.parseBitwiseOr(), right, node;

		/*---------------------------------------------------------*/
		/* LogicalAnd : BitwiseOr 'and' LogicalAnd                 */
		/*            | BitwiseOr                                  */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseOr = function()
	{
		var left = this.parseBitwiseXor(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseOr : BitwiseXor 'b-or' BitwiseOr                 */
		/*           | BitwiseXor                                  */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseXor = function()
	{
		var left = this.parseBitwiseAnd(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseXor : BitwiseAnd 'b-xor' parseBitwiseXor         */
		/*            | BitwiseAnd                                 */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseBitwiseAnd = function()
	{
		var left = this.parseComp(), right, node;

		/*---------------------------------------------------------*/
		/* BitwiseAnd : Comp 'b-and' BitwiseAnd                    */
		/*            | Comp                                       */
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
				throw 'syntax error, line `' + this.line + '`, keyword `defined` or `null` or `empty` or `iterable` or `even` or `odd` expected';
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
			node = new ami.twig.expr.Node(this.tokenizer.peekType(), this.tokenizer.peekToken() + 'with');
			this.tokenizer.next(2);

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
		/*        | MulDiv                                         */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseMulDiv = function()
	{
		var left = this.parsePower(), right, node;

		/*---------------------------------------------------------*/
		/* MulDiv : Power ('*' | '//' | '/' | '%') MulDiv          */
		/*        | Power                                          */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parsePower = function()
	{
		var left = this.parseNotPlusMinus(), right, node;

		/*---------------------------------------------------------*/
		/* Power : NotPlusMinus '**' Power                         */
		/*       | NotPlusMinus                                    */
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

		return left;
	};

	/*-----------------------------------------------------------------*/

	this.parseNotPlusMinus = function()
	{
		var left = null, right, node;

		/*---------------------------------------------------------*/
		/* NotPlusMinus : ('not' | '-' | '+') Y                    */
		/*              | Y                                        */
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

		return this.parseY();
	};

	/*-----------------------------------------------------------------*/

	this.parseX = function()
	{
		var node;

		/*---------------------------------------------------------*/
		/* X : FunVar | Terminal                                   */
		/*---------------------------------------------------------*/

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
		var node;

		/*---------------------------------------------------------*/
		/* X : Group | FunVar | Terminal                           */
		/*---------------------------------------------------------*/

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
		var node;

		/*---------------------------------------------------------*/
		/* Group : '(' LogicalOr ')'                               */
		/*---------------------------------------------------------*/

		if(this.tokenizer.checkType(ami.twig.expr.tokens.LP))
		{
			this.tokenizer.next();

			node = this.parseLogicalOr();

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
		var L, qid, node;

		/*---------------------------------------------------------*/
		/* FunVar : SID ('.' SID)* '(' Params ')'                  */
		/*        | SID ('.' SID)* '[' Params ']'                  */
		/*        | SID ('.' SID)*                                 */
		/*---------------------------------------------------------*/

		qid = '.';

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

				L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RP))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `)` expected';
				}

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.FUN, 'ami.twig.stdlib' + qid);
				node.list = L;
				return node;
			}

			/*-------------------------------------------------*/
			/* VARIABLE                                        */
			/*-------------------------------------------------*/

			if(this.tokenizer.checkType(ami.twig.expr.tokens.LB))
			{
				this.tokenizer.next();

				L = this._parseParams();

				if(this.tokenizer.checkType(ami.twig.expr.tokens.RB))
				{
					this.tokenizer.next();
				}
				else
				{
					throw 'syntax error, line `' + this.line + '`, `]` expected';
				}

				node = new ami.twig.expr.Node(ami.twig.expr.tokens.VAR, ((((((('_'))))))) + qid);
				node.list = L;
				return node;
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
		this.list = [];
	};

	/*-----------------------------------------------------------------*/

	this._dump = function(nodes, edges, pCnt)
	{
		var cnt = pCnt[0], CNT;

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

		for(var i in this.list)
		{
			CNT = ++pCnt[0];
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
